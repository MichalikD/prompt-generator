# Geführtes Layout und getrennte Fähigkeitsangaben · 0.12

Die Spielregeln aus 0.11 bleiben bestehen. Diese Version ordnet die Bedienung neu
und beschreibt vorhandene Fähigkeiten eindeutiger. Sie ändert weder Tragplätze,
Bonusgrenzen, Schadenswerte noch Ressourcenbudgets.

## Vorbereitung

**Welt → Spielvorgaben → Figur → Ausgabe.** Die Schrittschaltflächen erlauben
Vor- und Zurückspringen. Fehlende Pflichtangaben führen zum betroffenen Schritt;
Eingaben bleiben erhalten. Die Ausgabe entsteht erst am Ende. Das Zurücksetzen
des Profils setzt den Ausgangsimpuls auf Aus und erhält einen bereits eingegebenen
Bogen; Weltänderungen werden im Charaktertemplate übernommen.

Die Weltzusammenfassung steht unter den Eingaben. Spielvorgaben nutzen auf breiten
Bildschirmen zwei Spalten. Standardoptionen stehen links. Der Ausgangsimpuls hat
Aus/An, eine Kennung und eine sichtbare Würfelschaltfläche. Bearbeiten und Kopieren
losen nicht neu aus. Die bisherigen Regeln für eigene Welten bleiben bestehen.

Der Charaktereditor gliedert sich in Identität, Werte & Talente, Fähigkeiten,
Ausrüstung & Mittel, Hintergrund und bei aktuellen Bögen Entwicklung. KI-Template
und JSON-Import öffnen eigene Dialoge. Textbereiche wachsen beim Eingeben;
Ausrüstungsanzahl, Tragplätze je Stück, Bonus und Beschreibung bleiben bearbeitbar.
Ein formal gültiger Bogen wird durch **Weiter zur Ausgabe** übernommen, ohne
zusätzlichen Bestätigungshaken. Die Prüfung von Zahlen und Struktur ersetzt
keine inhaltliche Prüfung des KI-Entwurfs.

Die Ausgabe bietet Projektanweisungen und erste Chatnachricht mit Kopiertasten.
Profil und übernommener Bogen sind gemeinsam enthalten. Ein geheimer Starttext
lässt sich ungesehen kopieren oder bewusst aufdecken. **Im Spieltab öffnen**
übergibt den Bogen an eine separate Übersicht.

## Fähigkeiten und bestehende Bögen

Format 3 erhält drei optionale Textfelder: `range`, `targets`, `damage`.
Neue KI-Entwürfe sollen sie ausfüllen; `effect`, `cost`, `limits` bleiben erhalten.

| Feld | Bedeutung |
| --- | --- |
| Reichweite | Zum Beispiel „Berührung“, „15 m“ oder „5 m, verstärkt 10 m“ |
| Ziele / Fläche | Zum Beispiel „Ein Ziel“ oder „3 m Radius, einschließlich Verbündeter“ |
| Schaden | Zum Beispiel „2“, eine vereinbarte Würfelangabe oder „Kein Schaden“ |
| Wirkung | Aktion, Auflösung, Dauer und weitere tatsächliche Wirkung |
| Kosten | Vereinbarter Verbrauch je Anwendung |
| Weitere Grenzen | Sicht, Hindernisse und sonstige Bedingungen |

Ein **ausdrücklich leeres** Reichweitenfeld oder die Zeichenfolge **`"0"`** heißt
**ohne Reichweitenbeschränkung**. Sicht und andere vereinbarte Bedingungen gelten
weiter. Berührung wird ausdrücklich eingetragen und ist nicht gleich 0.
Reichweite 0 ist eine Beschreibung der Fähigkeit, keine neue allgemeine Kraft.

Bei bestehenden Bögen ohne diese drei Felder bleiben alle Angaben in Wirkung und
Grenzen erhalten. Die Übersicht zeigt **Siehe Wirkung / Grenzen**. Sie nimmt keine
unbegrenzte Reichweite an und extrahiert keine Zahlen aus Freitext. Die getrennten
Felder erscheinen erst im JSON, wenn sie tatsächlich eingegeben wurden. Widersprüche
innerhalb eines Bogens sind vor einer relevanten Anwendung zu klären; es gibt keine
stille Umdeutung oder Verbesserung. Neue Templates vermeiden doppelte Werte.

## Spieltab

Links stehen LP, Ressourcen und Tragplätze, darunter Fähigkeiten mit Kosten,
Reichweite, Zielen/Fläche, Schaden, Wirkung und Grenzen. Weitere Bogenbereiche sind
aufklappbar. Rechts stehen die Notizen. Es gibt keinen Druckknopf und keinen
Charakter-Erstellungsassistenten auf dieser Seite.

**Bogen aktualisieren** öffnet eine manuelle Bearbeitung im Dialog. Abbrechen
verwirft die Änderungen. Übernehmen prüft sie und aktualisiert die Übersicht;
der ursprüngliche Startbogen wird beim ersten Weiterführen kopiert und bleibt
unverändert. Vereinbarte Spieländerungen werden nicht automatisch aus einem Chat gelesen.

**Importieren/Exportieren** verwenden eine gemeinsame JSON-Datei mit Bogen,
Startoriginal und Notizen. Die Übersichtsseite importiert keine einzelnen
Charakterdateien; diese kommen über den Generator. Der letzte gültige Stand bleibt
beim Neuladen in diesem Tab erhalten. Bewusstes Gerätespeichern, Laden und Löschen
stehen eingeklappt unter Speicheroptionen. Browserdaten können gelöscht werden;
eine exportierte Datei ist die unabhängige Sicherung. Die Datei enthält keinen
vollständigen Weltkern und keinen Chatverlauf.

## Prüfung

Automatische Prüfungen decken die bestehenden Regeln, additive Fähigkeitsfelder,
Textausgabe, Erhalt des Startoriginals und Paketkonsistenz ab. Zusätzlich werden
Schrittnavigation, Dialoge, Übernahme ohne Haken, stabile Kennung, verdecktes Kopieren,
Spieltab-Übergabe, verworfene/übernommene Änderungen und Wiederherstellung im DOM geprüft.
Ein längerfristiger menschlicher Spieltest folgt nach Wahl des Spielers; er ist
keine Voraussetzung für diese Layoutkorrektur.

Die browsernahe Bedienprüfung lief mit jsdom. Eine echte Browserdarstellung konnte
in dieser Arbeitsumgebung nicht geprüft werden; responsive CSS und das zuvor
abgestimmte Layout sind umgesetzt, eine Sichtprüfung nach dem Deployment bleibt offen.

## Bedienkorrekturen nach der ersten Sichtprüfung

- „Bogen hier vorbereiten“ steht links und ist Standard. Ohne gültigen Bogen
  bleiben Starttexte gesperrt; nur die ausdrücklich gewählte Erstellung im
  Spielchat erlaubt eine Ausgabe ohne vorbereitete Figur. Kopieren und Download
  prüfen diese Voraussetzung zusätzlich bei der Betätigung.
- „Spielübersicht öffnen“ auf der Weltseite übergibt einen bereits gültigen Bogen
  direkt, auch vor dem Ausgabeschritt. Ohne gültigen Bogen öffnet es die Übersicht
  zum Laden eines vorhandenen Spielstands aus Bogen und Notizen.
- Der zusätzliche Welt-Vorspann entfällt; die Schritte haben ihre normalen Titel.
- Der Geldbereich heißt „Geld“ statt „Guthaben“. Format und Spielregeln bleiben gleich.
- Fähigkeiten lassen sich als Bereich und einzeln einklappen.
- Notizen stehen standardmäßig links, die gesamte Übersicht nutzt mehr Bildschirmbreite.
  Das Notizfeld ist höher. „Spalten tauschen“ wechselt die Anordnung auf breiten
  Bildschirmen und merkt sie im Tab. Auf schmalen Bildschirmen stehen Notizen vor
  dem Bogen; die dort nutzlose Tauschschaltfläche wird ausgeblendet.

Gezielt geprüft: 19 Tests für Vorbereitung, Figur, Fähigkeiten, Geld und Spieltab;
zusätzlicher jsdom-Durchlauf für Standardauswahl, gesperrte Ausgabe, ausdrückliche
Chat-Erstellung, Bogenübergabe von Welt und Ausgabe, einklappbare Fähigkeiten,
Spaltentausch und Wiederherstellung. Eine echte Browser-Sichtprüfung bleibt offen.
