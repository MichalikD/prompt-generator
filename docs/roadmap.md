# Roadmap nach Marik und Iven

Stand: 22. Oktober 2026 · Aktuelle Regelbasis: 0.10.0

Diese Liste ist die aktuelle Priorisierung. Frühere Versionen der Roadmap sind
über Git nachvollziehbar; die unten verlinkten Versionsdokumente erläutern
bereits umgesetzte Entscheidungen. Eine implementierte Anweisung und ihr
beobachtetes Verhalten im Spiel sind unterschiedliche Nachweise.

## 1. Wo wir stehen

Der Stand ist eine spielbare Grundlage. Der erzählerische Auftrag aus 0.8 bleibt
erhalten; die Ergebnisse rechtfertigen keinen weiteren grundlegenden Umbau.

| Bereich | Implementiert | Beobachtung und verbleibende Grenze |
| --- | --- | --- |
| Weltinitiative, wirksame Kräfte und Gefahr | 0.8 | Marik: sehr guter Fantasyauftakt, echte Konfrontationen, Niederlage und Folgen. Noch kein Nachweis für jeden Lauf. |
| Lokaler Abschluss trotz größerem Hintergrund | 0.7–0.9 | Iven: Anlage gesichert, Abschlusserklärung, Verbesserung und Auszahlung; die Inselgeschichte muss dafür nicht gelöst werden. |
| Selbstständiger Beginn einer unabhängigen Folgeaufgabe | 0.7–0.9 | Iven: Flüsterwald nach Aelthar, vermisster Reisender und fremdartige Wesen ohne vom Spieler vorgegebene Handlung. Dieses zweite Abenteuer ist noch nicht abgeschlossen. |
| Sinnvolle Delegation und Entwicklung | 0.7–0.9 | Ivens Entscheidung für Gildenhilfe zählt zum Erfolg. Vorgemerkte Verbesserung wird nach Ruhe angeboten und Fokus auf 4/4 erhöht. |
| Geld und Fähigkeitspunkte getrennt | Figurenformat 3 | Ivens Unterkunft, Frühstück und Gildenbelohnung werden nachvollziehbar abgerechnet. Längere Wirtschaft und besondere Bedürfnisse sind kaum geprüft. |
| Kampf, Erholung und kostenlose einfache Magie | 0.9 | Technisch und in kurzen unabhängigen Regelanwendungen geprüft. Iven kämpft nicht; Ausdauer, Zugfolge und Balance sind im normalen Spiel noch offen. Mariks frühere Kämpfe bleiben die Fehlerbasis. |
| Separate Spielübersicht | 0.9 | Kopieren, Download und Druck vorhanden. Im Einsatz zu umständlich; ein eigener lesbarer Tab ist gewünscht. |

Die wichtigsten verbleibenden Probleme sind ähnliche Einstiege über neue
Durchläufe hinweg, vereinzeltes unbegründetes NSC-Wissen und der Bedienkomfort
des Bogens. Schwebende Inseln, ähnlich klingende alte Reiche, sieben Anker und
Siegelreparaturen wiederholen sich bei Marik und Iven trotz guter Einzelmomente.
Ein guter Übergang löst diese Wiederholung nicht automatisch.

## 2. Umgesetzt: optionale Ausgangsimpulse · 0.10.0

Paket 0.10 ergänzt einen kleinen Startimpuls im Generator, eine gezielte
Klarstellung zum NSC-Wissen und die Korrektur des festen Talentbonus. Der Einstieg bekommt andere
Ausgangsbedingungen, keine vorgefertigte Handlung oder neue Verbotsliste.

### Umfang des Impulses

- [x] Optional und standardmäßig ausgeschaltet. Ohne Aktivierung bleibt der
  bisherige freie Start erhalten.
- [x] Nur zwei Zufallsachsen: **Umgebung** und **Ausgangslage der Figur**.
  Beispiele für Umgebungen: Schiff auf See, Küste, Gebirge, Wald, größere Stadt.
  Beispiele für Ausgangslagen: unterwegs, gefangen, eingeladen, um Hilfe gebeten.
  Vorrat und Verträglichkeit sind in [Ausgangsimpulse 0.10](ausgangsimpulse-0.10.md) dokumentiert.
- [x] Kein Katalog besonderer Motive wie Geisterpiraten, keine zufällig vorgegebene
  Lösung und kein verpflichtendes Spielerziel. Beteiligte, Ursachen, Interessen,
  Geheimnisse und konkrete Handlung entwickelt die Spielleitung.
- [x] Beispiel: Schiff auf See + gefangen + Fantasy kann Geisterpiraten, eine
  feindliche Marine oder andere plausible Umstände hervorbringen. Der Impuls
  schreibt weder diese Ausgestaltung noch Flucht als einziges Ziel vor.
- [x] Keine automatische Neuverlosung laufender Abenteuer oder ihrer Wahrheiten.
  Der Impuls gilt für den Auftakt; spätere Handlung wächst aus Welt und Entscheidungen.

### Verträglichkeit und Dosierung

- [x] Rangfolge: ausdrückliche eigene Vorgaben, bestätigte Figur und vereinbarte
  Grenzen; ausgewähltes Welt-/Spielprofil; erst danach der Zufallsimpuls.
- [x] Welt, Epoche/Technik, Übernatürliches, Ton und zulässige Begleitung bei der
  Auswahl berücksichtigen. Figurengedanken, Entscheidungen und offene Biografie
  nicht durch erfundene Schwüre oder Verpflichtungen ersetzen.
- [x] Eigene Weltbeschreibungen nicht überschreiben. Freitext ist lokal nicht
  zuverlässig semantisch auswertbar: unklare Umgebungen neutral lassen oder
  auslassen statt eine vermeintlich passende konkrete Umgebung zu erzwingen.
- [x] Kleine Auswahl breit auslegbarer Situationen statt großer Motivsammlung.
  Nicht jede Kombination muss erlaubt sein und nicht jede Achse muss belegt sein.
- [x] Startpaket enthält den dosierten Impuls und dessen Rang gegenüber dem
  Profil. Das Plugin verwendet ihn als Ausgangsbedingung, nicht als Ablaufplan.
  Bestätigte Fähigkeiten und Spielregeln bleiben unverändert.

### Bedienung und Reproduzierbarkeit

- [x] Neu auslosen und gewählte Kombination bei späterer Ausgabe stabil halten;
  keine neue Auslosung durch Kopieren, Bogenausfüllen oder Druck.
- [x] Eine Kennung/Seed mit Katalogversion und maßgeblichen Einstellungen erlaubt
  dieselbe Kombination erneut. Derselbe Seed garantiert keine identische KI-Geschichte.
- [x] Die konkreten Bausteine zunächst verborgen anzeigen und auf Wunsch aufdecken.
  Die Übergabe im kopierten/geladenen Starttext bleibt technisch einsehbar:
  Spoilerschutz in der Oberfläche, kein geheimes Speichersystem.
- [x] Ändert sich das relevante Profil, Verträglichkeit erneut prüfen und einen
  nicht mehr passenden alten Impuls nicht unbemerkt übernehmen.
- [ ] Einzelne Bausteine festhalten sowie eine lokale Auslosungshistorie sind
  mögliche spätere Erweiterungen, keine Voraussetzung für die erste Fassung.

### Zwei gezielte Begleitkorrekturen

- [x] Talentbonus +2 im Editor fest anzeigen statt veränderliche Zahlen mit
  anschließender Fehlermeldung anzubieten. Importierte unzulässige Werte weiterhin
  erklären, nicht still korrigieren. Keine Änderung der Talentmechanik.
- [x] Beim NSC-Wissen präzisieren: Der Spielleitung bekannte Fähigkeiten aus dem
  Bogen sind kein automatisch bekanntes Figurenwissen. Unbekannte Spezialisierung
  erfragen oder allgemein um Hilfe bitten. Keine rückwirkend erfundene
  Vorführung; sichtbare Merkmale und gezeigte Kräfte dürfen Rückschlüsse erlauben.

### Fertigkriterien und Testaufwand

- [x] Den kleinen Bausteinvorrat anhand einiger Kombinationen geprüft.
  Unterschiedliche plausible Anfänge ermöglichen, keine fertigen Handlungen schreiben.
- [x] Automatisiert: ausgeschaltet unveränderte Ausgabe; reproduzierbare Kombination;
  Verträglichkeit mit strukturierten Welten und Ton; konservativer Freitextfall;
  stabile Auslosung; keine Änderung des bestätigten Bogens; klare Versionsübergabe.
- [x] Drei unabhängige Einstiegsproben mit verschiedenen Zweierkombinationen
  geprüft: unterschiedliche Beteiligte und Konflikte möglich. Ein Motiv wie
  schwebende Inseln kam trotzdem vor. Nicht nur Ortsnamen vergleichen. Unterschiedliche Randbedingungen sind
  eine Chance für Vielfalt, keine Garantie gegen Modellwiederholungen.
- [ ] Erst danach bei Bedarf ein gebündelter menschlicher Spieltest. Keine fünf
  vollständigen Kampagnen und keine lange Runde pro kleiner Korrektur verlangen.
  Eigene Zusatzwünsche dürfen nicht reguläre Einstellungen für den Test ersetzen.

## 3. Nächster größerer Schritt: Charaktertab und Notizen

- [ ] Eigenen lesbaren Tab für den zweiten Monitor öffnen: Werte, Talente,
  Fähigkeiten, Kosten/Reichweiten, Ausrüstung und Ressourcen übersichtlich halten.
  Ausgangspunkt ist der bestehende bestätigte Bogen, kein neuer KI-Aufruf.
- [ ] Einfache Kampagnennotizen ergänzen. Speicherort, Dauerhaftigkeit und Export
  vorab klar festlegen; lokale Browserdaten sind kein Ersatz für eine Sicherung.
- [ ] Statischen Stand und manuelle Änderungen klar kennzeichnen; keine
  automatische Übernahme von Chatereignissen behaupten. Kein Chat-Zugriff nötig.
- [ ] JSON-Import/-Export und der ursprüngliche Startbogen bleiben verfügbar.
  Eine lokale Charakterablage mit Wiederwahl kann darauf aufbauen, muss aber
  nicht bereits zum ersten Tab gehören.
- [ ] Browsererweiterung/Sidebar nur später prüfen, falls der Tab im Spiel nicht
  genügt. Kein zweites Produkt als Voraussetzung für die Nachschlagehilfe.

Dieses Paket braucht Bedienprüfungen, nicht automatisch einen neuen langen
Spieldurchlauf. Layout des gesamten Generators, Themes und weitere Sprachen
folgen nach erkennbarem Nutzen.

## 4. Gezielte Spieltests, wenn sie ohnehin passen

| Thema | Konkreter Prüfpunkt |
| --- | --- |
| Kampf 0.9 | LP aller sichtbaren Beteiligten, feste Initiative, Bewegung/Deckung, Rückzug, Kapitulation und 0 LP |
| Magische Ausdauer | Einfache Magie bei leerem Vorrat, reizvolle kostenpflichtige Wirkungen, tatsächliche Regeneration |
| Zusatzwürfel | Zunächst die ausgewählten Schadenswürfel; Auswirkungen auf Tempo, Wirkung und Verständlichkeit. Andere Zusatzwürfel später nach Bedarf. |
| Erholung | Gleiche Grundregeln für Spieler, Begleiter und Gegner; Zusatzverletzungen nur nach Vereinbarung |
| Feste Gefährten | Eigenes Handeln, Werte, gemeinsame Meilensteine und dokumentierte Entwicklung |
| Besondere Bedürfnisse | Etwa Blutdurst: erreichbare Versorgung und vorher vereinbarte Folgen, kein unangekündigter Hungerzähler |
| Unabhängige Folgeabenteuer | Den bei Iven gelungenen Beginn später in anderen Läufen bestätigen; Fortsetzung und Abschluss der zweiten Aufgabe beobachten |
| Langfristige Entwicklung | Neue Zauber/Talentmeisterschaften, konkrete Kontakte, Käufe und spürbare Macht statt automatischer Gegneranpassung |

Nicht alles verlangt einen eigenen Testlauf. Spieler sollen frei handeln und
keinen Kampf für eine Checkliste provozieren. Ein schlechter oder ermüdender Lauf
darf beendet werden. Technische Tests belegen keine langfristige Balance.

## 5. Spätere Erweiterungen und Beobachtung

- [ ] Große Aufstiege und Transformationen praktisch erproben: neue Machtformen,
  Einfluss und bewusst übermächtige Phasen. Regelbasis erlaubt sie bereits;
  konkrete Effekte werden jeweils vereinbart. Kein Pflichtlevel-/EP-System.
- [ ] Charaktere speichern/wieder auswählen, bessere Feldhilfen, optionale
  Pronomenauswahl und weitere Sprachen nach Bedarf.
- [ ] Namen, Orte, Zeiten, Besitz, Figurenwissen und Kosten nach tatsächlicher
  Spielauswirkung beobachten. Nicht jeden folgenlosen Darstellungsfehler beheben.
- [ ] Antworten und Reparaturketten weiter beobachten; bestehende Regeln zuerst
  bewerten statt reflexartig noch mehr Einschränkungen hinzuzufügen.
- [ ] Bilder niedrig priorisieren. Der Nutzer akzeptiert sie, sofern Kosten und
  Limits nicht nachteilig sind; der Export belegt diese Frage nicht. Bildverhalten
  ist kein Grund, den sonst gelungenen Lauf als gescheitert zu werten.

## Versionsdokumente

- [Ausgangsimpulse und Wissensgrenzen 0.10](ausgangsimpulse-0.10.md)

- [Kampf, Erholung und Übersicht 0.9](kampf-und-erholung-0.9.md)
- [Weltinitiative und wirksame Kräfte 0.8](weltinitiative-0.8.md)
- [Gemeinsamer Erzählauftrag 0.7](erzaehlauftrag-0.7.md)
- [Stand nach Jack 0.6](spielbarer-prototyp-0.6.md)
- [Weltvorlagen und Kurzabenteuer 0.5](welten-und-kurzabenteuer-0.5.md)

Diese Dokumente beschreiben ihren damaligen Schritt. Aktuelle Beobachtungen und
Prioritäten stehen hier; ältere Aussagen über noch fehlende Tests können durch
die Ergebnisse von Marik und Iven überholt sein.
