# Charaktereditor und Figurenformat 1

Im Generator kann der Spieler zwischen Erstellung im Spielchat und einem
vorbereiteten Bogen wählen. Der Editor erscheint direkt auf derselben Seite und
erhält Weltbeschreibung und eigene Vorgaben automatisch aus dem Abenteuerprofil.
Der Template-Abschnitt zeigt diese Angaben schreibgeschützt. Nach Prüfung und
Bestätigung enthält die erste Chatnachricht Profil und Bogen gemeinsam, in beiden
Ausgabemodi. Eine Änderung der Weltvorgaben hebt die Bestätigung auf, verändert
aber keine Bogenwerte. Unpassende Chat-Erstellungsoptionen werden ausgeblendet.
Die separate Seite `character.html` kann weiterhin ohne Abenteuerprofil verwendet
werden; dort werden die Weltangaben manuell eingegeben.

## Ablauf

1. Manuell ausfüllen oder im aufklappbaren Bereich eine Figurenidee und die
   Weltvorgaben eingeben. Das erzeugte Prompt-Template in einer beliebigen KI
   verwenden; hier gibt es keine Modellanbindung, Schlüssel oder API-Kosten.
2. Deren reine JSON-Antwort einfügen oder eine JSON-Datei importieren (bis 1 MB).
   Ein gültiger Import ersetzt nach Rückfrage den bearbeiteten Bogen. Ungültige
   Daten lassen den bisherigen Stand unverändert. Keine Markdown-Codezäune einfügen.
3. Angaben und Fehlermeldungen prüfen. Der Editor prüft Zahlen und Struktur;
   erzählerische Plausibilität, passende Grenzen und gleichwertige Talente muss
   der Spieler selbst beurteilen. Bogen ausdrücklich bestätigen.
4. Gemeinsame erste Chatnachricht im Generator kopieren oder das Startpaket herunterladen. Alternativ den lesbaren Einzelbogen als Markdown herunterladen. JSON für
   spätere Bearbeitung sichern. Ein formal gültiger, unbestätigter Entwurf lässt
   sich ebenfalls exportieren; die Textausgabe kennzeichnet ihn als Entwurf.

Es gibt keine automatische Speicherung, auch nicht nach Neuladen. Unvollständige
oder formal ungültige Bögen sind noch nicht exportierbar. Kein Export ist ein
vollständiger Welt- oder Kampagnenspielstand. Die JSON-Datei dient ausschließlich
der Figur. Ein Textimport aus frei formulierter Prosa ist nicht enthalten.

## Felder

Das Dokument ist ein JSON-Objekt mit `format: "freie-spielleitung-character"`,
`version: 1`, `kind: "start" | "current"`, `confirmed: boolean`, `character`
und `startCharacter`. Vollständiges Beispiel: [Vesper](../examples/vesper-start.json).

| Bereich in `character` | Inhalt |
|---|---|
| `identity` | `name`, `pronouns`, `ancestry`, `origin`, `role`, `description` |
| `attributes` | `kraft`, `geschick`, `verstand`, `gespuer` |
| `talents` | Liste: `name`, `description`, `bonus` |
| `abilities` | Liste: `name`, `effect`, `cost`, `limits` |
| `weaknesses` | Liste: `name`, `trigger`, `effect`, `mitigation` |
| `vitals` | `hp`, `maxHp`, `resources`, `injuries` |
| `vitals.resources` | Liste: `name`, `current`, `max`, `effect`, `cost`, `regeneration` |
| `inventory` | Liste: `name`, `quantity`, `slots`, `bonus`, `description` |
| `nourishment` | Freitext für Nahrung und besondere Bedürfnisse |
| `background` | Texte: `confirmed`, `open`, `excluded` |
| `development` | Liste: `milestone`, `change`, `benefit`, `limits` |

Leere optionale Texte sind `""`, ungenutzte Listen `[]`. Alle beschriebenen
Schlüssel müssen enthalten sein. Unbekannte Schlüssel oder Formatversionen werden
abgewiesen, damit der Import keine zusätzlichen Angaben still verliert.

- Startattribute: ganze Zahlen −1 bis +3, Summe +5. Aktueller Bogen: −1 bis +5,
  keine feste Summe nach Entwicklung.
- Start: genau zwei Talente, jeweils +2, nicht stapelbar; mindestens eine situative
  Schwäche mit Auslöser und Wirkung; 10/10 LP. Entwicklungsliste zunächst leer.
- Fähigkeiten brauchen konkrete Wirkung, Kosten (ggf. „keine“) und Grenzen.
  Ressourcen brauchen Wirkung, Kosten und Regeneration; aktueller Wert darf ihr
  Maximum nicht überschreiten. Magieressourcen von drei Punkten sind eine Vorgabe
  im Erstellungstemplate; der Editor erkennt Magiebegabung nicht automatisch.
- Ausrüstung: `quantity × slots` zählt zur Belastung. `slots` sind Plätze **pro
  Einheit**; gebündelte Kleinteile als eine Einheit eintragen. Kleidung kann null
  Plätze belegen. Getragene Ausrüstung maximal acht Plätze, Bonus 0 bis +2.
  Externe Lager/Transportmittel sind noch kein eigener Inventarbereich.
- Der Editor prüft keine Stärke von Freitextfähigkeiten oder die Wirkung eines
  Talents im konkreten Spiel. Regelkonformität ist mehr als ein gültiges JSON.

## Startbogen bewahren, aktuellen Bogen führen

Nach Bestätigung eines gültigen Startbogens aktiviert **Als aktuellen Bogen
weiterführen** einen aktuellen Bogen und kopiert den Start nach `startCharacter`.
Im Editor wird nur `character` bearbeitet. Die ursprüngliche Fassung bleibt
unverändert, wird im JSON mitgeführt und ist in der Vorschau separat einsehbar.
Eine Änderung hebt die Bestätigung des aktuellen Bogens auf. Fortschritte werden
mit Meilenstein, Änderung und konkretem Nutzen dokumentiert.

Ist bei einem importierten aktuellen Dokument der ursprüngliche Bogen unbekannt,
steht `startCharacter: null`. Der Export benennt diese Lücke und erfindet keinen
Start. Bei `kind: "start"` ist `startCharacter` immer `null`.

Alte API-Startbögen werden nicht konvertiert. Die bisherige Sonderbehandlung für
Vesper wurde entfernt: Der Prototyp unterstützt nur das aktuelle versionierte
Figurenformat und benötigt keine Altformat-Kompatibilität. Das Beispiel im
Repository verwendet dieses aktuelle Format.

Das Erstellungstemplate lässt unbekannte Spezies und Herkunft zu. Es erfindet
keine zusätzliche Liste verbotener biografischer Enthüllungen; Ausschlüsse stammen
vom Spieler. Die erste situative Schwäche braucht einen beobachtbaren Auslöser
und eine klare Wirkung. Sie setzt keine vom Spielleiter erfundene Angst oder Wut
voraus. Ressourcenknappheit ist keine zusätzliche individuelle Schwäche. Eine
formale JSON-Prüfung kann die Qualität solcher Freitexte weiterhin nicht beweisen.


## Talent- und Entwicklungsvorgaben ab 0.3.0

Das Erstellungstemplate formuliert intern Englisch, verlangt aber deutsche
Beschreibungen. Zwei Talente erhalten nachvollziehbare, brauchbare Bereiche,
die zum Namen passen; keine Beschränkung auf einen einzelnen Handgriff oder
Untergrund und keine pauschalen Boni auf alles. Das verwendete Attribut folgt
dem Ansatz. Spätere Erweiterung oder vereinbarte Umschulung wird im aktuellen
Bogen dokumentiert; das Startoriginal bleibt erhalten. Es gibt kein neues
Datenformat und kein zusätzliches Levelsystem.
