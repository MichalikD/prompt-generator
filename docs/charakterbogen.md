# Charaktereditor und Figurenformat 3

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

Das Dokument ist ein JSON-Objekt mit `format: "open-game-master-character"`,
`version: 3`, `kind: "start" | "current"`, `confirmed: boolean`, `character`
und `startCharacter`. Vollständiges Beispiel: [Vesper](../examples/vesper-start.json).

| Bereich in `character` | Inhalt |
|---|---|
| `identity` | `name`, `pronouns`, `ancestry`, `origin`, `role`, `description` |
| `attributes` | `strength`, `dexterity`, `intellect`, `insight` |
| `talents` | Liste: `name`, `description`, `bonus` |
| `abilities` | Liste: `name`, `effect`, `cost`, `limits` |
| `weaknesses` | Liste: `name`, `trigger`, `effect`, `mitigation` |
| `vitals` | `hp`, `maxHp`, `resources`, `injuries` |
| `vitals.resources` | Liste: `name`, `current`, `max`, `effect`, `cost`, `regeneration` |
| `inventory` | Liste: `name`, `quantity`, `slots`, `bonus`, `description` |
| `finances` | `funds`, `purchasingPower`, `assets` |
| `finances.funds` | Liste: `currency`, `amount` |
| `needs` | Liste: `name`, `description`, `mechanical`, `trigger`, `effect`, `care` |
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
  Fähigkeitsressourcen brauchen Wirkung, Kosten und Regeneration; aktueller Wert darf ihr
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
Bogen dokumentiert; das Startoriginal bleibt erhalten. Es gibt kein zusätzliches Levelsystem.


## Formatänderung 0.3.1

Figurenformat Version 2 verwendet die Format-ID `open-game-master-character`
und englische Attributschlüssel. Die UI-Beschriftungen bleiben Deutsch.
Die erzeugte Bogenstruktur und ihre Überschriften sind Englisch, eigene
Beschreibungen bleiben erhalten. Alte Prototypbögen werden nicht übernommen;
einen neuen Bogen mit dem aktuellen Template erzeugen. Eine erneute ausdrückliche
Bestätigung ist weiterhin nötig.


## Geführte Vorbereitung und Format 3

Der Generator führt in beiden Modi über **Welt → Spielvorgaben → Figur → Prüfung
und Ausgabe**. „Weiter“ prüft den aktuellen Schritt. Zurückgehen erhält alle
Eingaben; fertige Starttexte erscheinen erst am Ende. Änderungen am Bogen
verlangen erneut eine Bestätigung, Änderungen an Weltvorgaben ebenfalls.
Ein Moduswechsel erhält die Auswahl. Die selbstständige Editor-Seite bleibt
nutzbar. Vor dem Schließen weiterhin JSON herunterladen; keine automatische
Speicherung.

### Geld und Vermögen

`finances.funds` enthält je Währung einen nichtnegativen Betrag, auch mit
Nachkommastellen. Kein Spiel-Maximalwert und keine Regeneration. Die technische
Grenze ist JavaScripts sicher darstellbarer Zahlenbereich. Eine Währung wird
nur einmal geführt. `[]` bedeutet **nicht festgelegt**, ein Eintrag mit Betrag
`0` bewusst kein Guthaben in dieser Währung. Kaufkraft/Preisanker und weiteres
Vermögen sind optionale Freitexte.

Das Template schlägt bescheidene, zur Welt passende Startmittel und einfache
Preisanker vor, sofern die Figurenidee nichts anderes festlegt. Der Spieler
prüft den Vorschlag; keine Konto- oder Zahlungsanbindung.

### Fähigkeitsressourcen und Bedürfnisse

`vitals.resources` dient begrenzten Fähigkeitspunkten, etwa Fokus oder Magie:
aktueller Wert, Maximum, Wirkung, Verbrauch und Erholung. Unbenötigt bleibt die
Liste leer. Geld und Munition gehören nicht in diese Liste; Munition und
Vorräte werden als Ausrüstung geführt.

`needs` ist optional. Normales menschliches Essen, Wasser und Schlaf brauchen
keinen eigenen Eintrag. Ein besonderes Bedürfnis kann mit `mechanical:false`
beschreibend bleiben. Mit `mechanical:true` müssen ein beobachtbarer Auslöser,
eine konkrete Wirkung und Versorgung/Erholung angegeben werden. Diese Mechanik
wird mit dem Bogen ausdrücklich bestätigt. Eine bereits geführte Ressource
nicht durch einen zweiten Zähler doppelt verwalten. Beim Abschalten bleiben
etwaige Mechaniktexte im JSON erhalten, werden aber nicht als aktive Regel
in die Spielnachricht übernommen.

Das Template konkretisiert die bestehenden Regeln für Schwächen, Rüstung und
Waffenschaden. Es führt keine weiteren Bonusarten oder Spielregeln ein.
Die Plugin-Regelbasis bleibt **0.3.1**; Figurenformat und Pluginversion sind
unabhängig. Alte Testformate werden nicht konvertiert. Ein neues Template
verwenden, nicht nur die Versionsnummer eines alten Bogens ändern.


## Spielübersicht und Kampagnennotizen ab 0.11

Gültige Bögen lassen sich über **Im Spieltab öffnen** in `play.html` übernehmen.
Dort stehen Übersicht, manueller Editor und Notizen zusammen zur Verfügung.
Der ursprüngliche Startbogen bleibt beim Weiterführen als aktueller Bogen erhalten.
Tab-Wiederherstellung, bewusstes Gerätespeichern und gemeinsamer JSON-Export sind
unter [Spieltab 0.11](umfang-fortschritt-spieltab-0.11.md) beschrieben.
Die Spielübersicht ist kein vollständiger Kampagnenspielstand.
