# Weltinitiative, Gefahr und Fähigkeiten · 0.8.0

## Anlass und resultierendes Verhalten

In den Aren-Tests blieben interessante vorbereitete Auftakte möglich, während
Fortsetzungen wiederholt zu sicheren Reisehilfen, Andeutungen und vernünftig
beilegbaren Streitigkeiten wurden. Auch ein separater Vorbereitungsauftrag
lieferte keine zuverlässig reizvolle offene Fortsetzung. Die Regelbasis 0.8
überarbeitet deshalb den Gesamtauftrag statt eine weitere Szenariovorlage zu liefern.

Der Spieler entscheidet über seine Figur. Die Welt entscheidet über ihre
Handlungen: Ein Gegner darf angreifen, verfolgen, täuschen oder eine Bitte
ablehnen. Seine Reaktion folgt unter anderem Wissen, Persönlichkeit, Angst,
Stolz und Gewaltbereitschaft. Es gibt weder eine Pflicht zum vernünftigen
Kompromiss noch eine Pflicht zum Kampf. Die Möglichkeiten einer Reaktion können
scheitern oder in einer bestimmten Lage fehlen. Überraschung ist möglich;
ein Angriff bedeutet dennoch keine automatische Niederlage ohne Auflösung.

Cozy bleibt bewusst beruhigend. Abenteuerlich erlaubt Wunder, Gefahr und
verlustreiche Entwicklungen ebenso wie Ruhe. Standard und Hardcore erlauben
beide Tod; Standard bietet anschließend den vereinbarten Rücksetzpunkt an.
Eine freundlich gespielte Figur macht die Welt nicht automatisch freundlich.

## Zusammenhängende Änderungen

| Ebene | Verantwortung in 0.8 |
| --- | --- |
| Plugin-Hauptanweisung | Rollen, geladene Referenzen, Priorität expliziter Vorgaben; Weltinitiative statt pauschaler Schonung |
| Abenteuerreferenz | Spielkern und konkrete Erkundung, eigenständige Akteure, tatsächlicher Fantasyanteil, Ende und erneute Vorbereitung |
| Charakterreferenz und Template | Konzept/Macht wirksam abbilden, Reichweite/Ziele/Kosten/Auflösung definieren; Bestätigung und Wachstum |
| Kampfregeln | Eigenständige Angriffe, Überraschung, Wirkung von Schadensmagie und Flächen, kausale Umgebungsfolgen |
| Entwicklung | Sichtbare Fortschritte, soziale Wirkung von Macht/Ruf, keine universelle Gegneranpassung |
| Projektanweisungen | Gewählter Ton und Hoheit über die Figur stehen im Einklang mit einer selbst handelnden Welt |
| Startnachricht und Weltvorgaben | Nur gewählte Optionen, eindeutiges Todesverfahren und konkrete Genreidentität |
| Editor | Fähigkeiten brauchen wirksame Effekte und beschriebene Auflösung, nicht nur Einschränkungen |

Das ist keine starre Rotation von Abenteuerarten und keine Kampfquote. Eine
abgelehnte Aufgabe wird nicht auf jeden Weg verschoben; die fortgesetzte
Spielanfrage verlangt trotzdem passende neue spielbare Substanz. Angriffe und
andere Ereignisse setzen nicht die ausdrückliche Annahme eines Auftrags voraus.

## Grenzen, Schutz und Folgen

Vorbereitung, erfolgreiche Proben und bestätigte Tatsachen behalten Bedeutung.
Sicherheitsmaßnahmen geben ihren tatsächlichen Schutz; neue Ereignisse oder
Gegner können sie aus einem konkreten Grund überwinden. Eine willkürliche
Änderung einer bereits bestätigten Lage oder eines Würfelergebnisses bleibt ein
Fehler. Vorhersehbare Risiken werden vor einer Probe erläutert; das verlangt
keine Offenlegung aller verborgenen Gefahren und keine Zustimmung zu jeder
feindlichen Handlung.

## Fähigkeiten und Zahlen

Das Figurenformat bleibt Version 3. Schadenszauber stehen in den bestehenden
Feldern `effect`, `cost`, `limits`: Wirkung, Reichweite, Zielzahl/Fläche, relevante
Dauer, Ressourcenkosten, Auflösung und Grenzen. Der Standardangriff bleibt
W20 + Attribut + höchstens ein Talent + höchstens ein Ausrüstungsbonus gegen
Verteidigung. Die Standard-Schadenswerte sind 2/3/4 für Waffen und Kräfte;
ausdrücklich vereinbarte außergewöhnliche Kräfte können begründet abweichen.

Ein gewöhnlicher sofortiger Flächenangriff verwendet einen Angriffswurf gegen
die jeweilige Verteidigung exponierter Ziele. Der vereinbarte Preis wird pro
Anwendung gezahlt; Verbündete sind ohne vereinbarte Ausnahme betroffen.
Anders vereinbarte Fähigkeiten behalten ihre Auflösung. Optionale Schadenswürfel
gelten symmetrisch für die jeweilige Schadensklasse.

Beispiel für einen **unbestätigten** einfachen Zauberentwurf: Ein Feuerstoß
kostet 1 Magiepunkt einschließlich Fehlschlag, erreicht ein Ziel in Sichtlinie
bis 15 m und verursacht bei Treffer 3 Schaden mit dem Standardangriff. Er kann
geeignetes trockenes Material am Einschlag entzünden. Ein ganzes Haus brennt
nicht automatisch sofort; Brennstoff, Wetter, Bauweise und verstrichene Zeit
bestimmen die weiteren Folgen. Dieser Entwurf wird keiner Figur hinzugefügt.

Drei Ressourcenpunkte sind eine übliche Ausgangsbasis, nicht ein Verbot starker
Effekte. Macht und Verbreitung sind verschieden. Der Standardeditor prüft
weiterhin Startattribute −1 bis +3/Summe +5, zwei Talente +2, 10 LP und acht
Plätze. Eine Idee darf wirkungsvolle Kräfte mit diesen Werten haben. Benötigt
ein Konzept ausdrücklich andere Zahlen, muss die Erstellung den Konflikt
klären; ungültige JSON-Werte werden nicht als bestätigbarer Bogen ausgegeben.
Eine allgemeine freie Zahlenkonfiguration wird in diesem Schritt nicht eingeführt.

Bestätigte Bögen bleiben erhalten. Die neue Regelbasis schenkt Aren keinen
Feuerball und verändert weder seine Ressourcen noch bisherige Erfolge.
Wachstum kann später neue Aktionen, überlegene Möglichkeiten und vereinbarte
Verwandlungen eröffnen. Gewöhnliche Gegner/Schwierigkeiten wachsen nicht
pauschal mit; auch überzeugende Präsenz kann Unsicherheit beseitigen.

## Validierung und praktische Grenzen

Automatisiert geprüft werden Auswahl/Version, Erhalt bestätigter Fähigkeiten,
Import/Export, Trennung von Todesverfahren und Ton sowie Welt-/Templateausgabe.
Paketprüfung kontrolliert Syntax, Referenzen und reproduzierbare Archive.
Kurze unabhängige Szenen mit minimalem Kontext prüfen exemplarisch die
Erstellung offensiver Magie und die Reaktion eines Piraten auf Zureden sowie
einen angekündigten Zaubereinsatz. Sie ersetzen keinen Test im normalen Chat.

Keine technische Datei garantiert, dass ein Modell alle Anweisungen einhält.
Offen bleiben zuverlässige eigenständige Fortsetzungen, langfristige
Kontinuität und erzählerische Qualität ohne regelmäßige Spielerlenkung.

## Veröffentlichung und Rückkehr

Generator, Pluginquelle und Paketversion gehören zusammen. Das private Plugin
behält Identität und Metadaten. Bereits laufende Kampagnen übernehmen eine
geänderte Regelbasis nur nach ausdrücklicher Entscheidung des Spielers.
Ein Git-Revert des Änderungskommitts stellt die Generatorquelle wieder her;
die gespeicherte private Pluginfassung muss separat aus der entsprechenden
vorherigen Quelle wieder veröffentlicht werden. Ein Revert setzt keine
bereits gespielten Ereignisse zurück.
