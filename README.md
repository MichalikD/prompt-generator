# Abenteuer · Prompt-Generator

Eine statische deutschsprachige Web-App: Einstellungen wählen, Prompt kopieren,
in die Projektanweisungen einfügen. Keine API, Anmeldung, Speicherung oder Synchronisierung.
Die erste Fassung orientiert sich am vorhandenen W20-Regelwerk. Optionen sind redaktionelle Entwürfe.

## Lokal verwenden

Im Projektordner einen statischen Webserver starten, zum Beispiel mit installiertem Python:

```sh
python -m http.server 8080
```

Dann http://localhost:8080 öffnen. Direktes Öffnen über `file://` wird wegen ES-Modulen nicht unterstützt.
Zur Nutzung auf GitHub Pages ist keine lokale Installation nötig.

## GitHub Pages einrichten

1. Ein neues öffentliches Repository `prompt-generator` erstellen, diese Dateien auf `main` pushen.
2. Im Repository unter **Settings → Pages → Build and deployment → Source** die Option **GitHub Actions** wählen.
3. Unter **Actions** den Workflow „Prüfen und veröffentlichen“ starten oder einen neuen Commit pushen.
4. Nach erfolgreicher Veröffentlichung ist die App unter `https://BENUTZER.github.io/prompt-generator/` erreichbar.

Der Workflow prüft vor jeder Veröffentlichung alle Kombinationen. Scheitert eine Prüfung,
wird keine neue Version veröffentlicht. Ein erfolgreiches Deployment ersetzt die vorhandene Website.

## Textmodule und Längengarantie

- `src/modules.mjs`: Kernregeln und auswählbare Textvarianten.
- `src/generator.mjs`: Zusammenstellung, Reihenfolge, harte Längengrenze.
- `src/app.mjs`: Formular und Kopieren.
- `test/`: Vollständige Kombinationsprüfung plus Konfliktprüfungen.

```sh
npm test
npm run check
```

Die aktuelle Fassung enthält 768 Kombinationen. Alle bleiben strikt unter 8.000 Zeichen,
einschließlich Überschriften und LF-Zeilenumbrüchen (konservative JavaScript-UTF-16-Zählung).
Es wird nie abgeschnitten. Bei einer zu langen oder ungültigen Konfiguration bleibt Kopieren gesperrt.
Die Garantie gilt für die geprüften Module; manuelles Ergänzen nach dem Kopieren fällt nicht darunter.

Keine Freitextfelder in dieser ersten Fassung: damit ist die maximale Länge vollständig prüfbar.
Spätere Freitexte brauchen ein festes, in allen Kombinationen reserviertes Budget.

Jede Gruppe liefert genau eine Variante. Standard/Hardcore, Ton und Würfelbedienung werden ersetzt,
nicht zusammen angehängt. Weltabhängige Ressourcen werden separat gewählt. Die Tests prüfen Länge,
Kernvollständigkeit und bekannte Konflikte; sie beweisen keine allgemeine erzählerische Widerspruchsfreiheit.
Neue Module brauchen zusätzlich redaktionelle Prüfung. Die Qualität der KI-Spielleitung ist nicht garantiert.

Bewusst noch nicht umgesetzt: regelfreies Spiel, freie Weltbeschreibung, Import/Export, Spielstände.
„Spielleitung würfelt“ behält das W20-System bei; es bedeutet nicht „ohne Proben“.

## Datenschutz

Alle App-Berechnungen laufen im Browser. Keine Cookies, localStorage, Telemetrie, externen Schriften,
APIs oder automatischen Übertragungen der Auswahl. GitHub verarbeitet als Hoster normale Seitenaufrufe.
Der erzeugte Prompt wird erst durch eigenes Einfügen an den gewählten Chatdienst übergeben.
Repository und ausgelieferte Textmodule sind öffentlich. Keine persönlichen Daten oder Schlüssel einchecken.
