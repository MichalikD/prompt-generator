# Charaktereditor und Figurenformat 1

Im Generator öffnet **Charakterbogen erstellen oder importieren** eine separate
Seite in einem neuen Tab. Die gewählte Abenteuerkonfiguration bleibt im bisherigen
Tab. Bogen und Abenteuerprofil werden getrennt verwendet: Projektanweisungen
hinterlegen, erste Spielnachricht mit Profil senden und den bestätigten Bogen
separat hinzufügen. Das funktioniert mit beiden Ausgabemodi.

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
4. Lesbaren Text für den Chat kopieren oder als Markdown herunterladen. JSON für
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

Der bisherige Vesper-API-Startbogen (mit `hp`, `max_hp`, `resource: null`,
`features`, `weakness` und Ausrüstungs-/Talentlisten) wird konvertiert. Werte und
Beschreibungen bleiben erhalten; technische alte `id`-Felder werden nicht benötigt.
Merkmale bleiben als bestätigte Hintergrundangaben erhalten; Angaben zu
Nahrung/Hunger/Durst zusätzlich unter Bedürfnissen. Die unstrukturierte Schwäche
bleibt im Wortlaut als Auslöser und Wirkung stehen und kann genauer aufgeteilt
werden. Der Import erfindet keine Fähigkeiten, Kosten oder Gegenstände und
verlangt erneute Bestätigung. Andere alte Ressourcenstrukturen werden ausdrücklich
zur manuellen Übertragung zurückgewiesen.
