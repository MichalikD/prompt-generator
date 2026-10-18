#!/usr/bin/env python3
"""Prüft und paketiert eine Pluginquelle ohne API oder zusätzliche Python-Pakete."""

import argparse
import json
from pathlib import Path, PurePosixPath
import re
import zipfile

REPO = Path(__file__).resolve().parents[1]
DEFAULT_SOURCE = REPO / "plugins" / "freie-spielleitung-02"


def check_source(source):
    source = Path(source)
    if source.is_symlink() or not source.is_dir():
        raise ValueError("Pluginquelle muss ein gewöhnlicher Ordner sein")
    files = []
    for path in sorted(source.rglob("*")):
        relative = path.relative_to(source)
        if path.is_symlink():
            raise ValueError(f"Symlink im Paket: {relative}")
        if path.is_file():
            if any(part.startswith(".") for part in relative.parts):
                raise ValueError(f"Versteckte Datei im Paket: {relative}")
            files.append(path)
    manifest = json.loads((source / "plugin.json").read_text(encoding="utf-8"))
    if manifest.get("$schema") != "https://agent-plugins.org/schemas/1.0.0/plugin.schema.json":
        raise ValueError("Manifest-Schema fehlt oder ist ungültig")
    if manifest.get("name") != source.name or not re.fullmatch(r"[a-z0-9]+(?:-[a-z0-9]+)*", source.name):
        raise ValueError("Pluginname und Quellordner müssen übereinstimmen")
    if len(source.name) > 64 or not re.fullmatch(r"\d+\.\d+\.\d+", manifest.get("version", "")):
        raise ValueError("Name oder Versionsnummer ungültig")
    if set(manifest) & {"skills", "mcpServers", "apps", "interface"}:
        raise ValueError("Nichtportable Manifestfelder")
    interface = manifest["extensions"]["com.openai"]["interface"]
    for key in ("displayName", "shortDescription", "longDescription", "developerName", "category", "defaultPrompt"):
        if not isinstance(interface.get(key), str) or not interface[key].strip():
            raise ValueError(f"Leeres Manifestfeld: {key}")
    if len(interface["shortDescription"]) > 30 or interface.get("capabilities") != []:
        raise ValueError("Untertitel zu lang oder unerwartete Fähigkeiten")
    if "email" in manifest.get("author", {}):
        raise ValueError("Keine privaten Kontaktdaten im öffentlichen Quellpaket")
    skills = sorted(source.glob("skills/*/SKILL.md"))
    if not skills:
        raise ValueError("Kein Skill vorhanden")
    for skill in skills:
        text = skill.read_text(encoding="utf-8")
        # Das Quellformat beschränkt YAML bewusst auf genau diese beiden Skalare.
        # description ist ein JSON-kompatibler, doppelt zitierter YAML-String.
        header = re.match(r'\A---\nname: ([a-z0-9-]+)\ndescription: ("[^\n]+")\n---\n', text)
        if not header or header[1] != skill.parent.name:
            raise ValueError(f"Skill-Frontmatter ungültig: {skill}")
        description = json.loads(header[2])
        if not isinstance(description, str) or not description.strip():
            raise ValueError("Skillbeschreibung fehlt")
        if len(text.encode("utf-8")) > 1024 * 1024:
            raise ValueError("Skill zu groß")
        for path in (skill, *sorted((skill.parent / "references").glob("*.md"))):
            body = path.read_text(encoding="utf-8")
            if "TODO" in body:
                raise ValueError(f"Unfertiger Text: {path}")
            for link in re.findall(r"\]\(([^)]+)\)", body):
                target = PurePosixPath(link)
                if ":" in link or link.startswith(("/", "#")) or ".." in target.parts:
                    raise ValueError(f"Nicht enthaltene Referenz: {link}")
                if not (path.parent / link).is_file():
                    raise ValueError(f"Fehlende Referenz: {link}")
    return manifest, files


def package(source, output):
    source, output = Path(source), Path(output)
    manifest, files = check_source(source)
    if output.resolve().is_relative_to(source.resolve()):
        raise ValueError("Archiv muss außerhalb des Pluginordners liegen")
    output.parent.mkdir(parents=True, exist_ok=True)
    with zipfile.ZipFile(output, "w", zipfile.ZIP_DEFLATED) as archive:
        for path in files:
            # Stabile Eintragsmetadaten ermöglichen reproduzierbare Archive.
            entry = zipfile.ZipInfo(path.relative_to(source).as_posix(), (2026, 1, 1, 0, 0, 0))
            entry.compress_type = zipfile.ZIP_DEFLATED
            entry.external_attr = 0o100644 << 16
            archive.writestr(entry, path.read_bytes())
    with zipfile.ZipFile(output) as archive:
        if archive.testzip() is not None:
            raise ValueError("Archivprüfung fehlgeschlagen")
        if json.loads(archive.read("plugin.json")) != manifest:
            raise ValueError("Archivmanifest stimmt nicht überein")
        if set(archive.namelist()) != {p.relative_to(source).as_posix() for p in files}:
            raise ValueError("Archivinhalt stimmt nicht überein")
    return output


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--source", type=Path, default=DEFAULT_SOURCE)
    parser.add_argument("--output", type=Path)
    parser.add_argument("--check", action="store_true")
    args = parser.parse_args()
    try:
        manifest, files = check_source(args.source)
        if args.check:
            print(f"Plugin {manifest['name']} {manifest['version']}: {len(files)} Dateien geprüft")
        else:
            output = args.output or REPO / "dist" / f"{manifest['name']}-{manifest['version']}.zip"
            print(package(args.source, output))
    except (ValueError, KeyError, OSError) as error:
        parser.exit(1, f"Pluginprüfung fehlgeschlagen: {error}\n")


if __name__ == "__main__":
    main()
