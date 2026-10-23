# Roadmap nach den beiden Impuls-Durchläufen

Stand: 23. Oktober 2026 · Regelbasis: 0.12.0

Diese Liste ersetzt die vorherige Priorisierung; ältere Stände bleiben über Git
nachvollziehbar. Implementierte Regeln, kurze Regelproben und längere menschliche
Spielerfahrungen sind unterschiedliche Nachweise.

## 1. Erste spielbare Version

Der erzählerische Unterbau bleibt erhalten. Fünf Einstiege mit Impulsen wurden
mit **6 / 8,5 / 7 / 9 / 8** bewertet. Zwei weitergespielte Verläufe blieben
interessant und erlaubten nachvollziehbare Abschlüsse und Entwicklung. Die
alleinige Wirkung der Impulse und beliebig lange Vielfalt sind damit nicht bewiesen.

| Bereich | Beobachtung | Verbleibende Grenze |
| --- | --- | --- |
| Erzählung und Weltinitiative | Seegefecht, korrupte Amtsträger, Anschlag und Flucht; Gegner verfolgen Interessen | Nicht jede Kampagne wird dadurch gut |
| Abschluss und Fortsetzung | Übergabe/Delegation möglich; danach eigenständiger Nebelpass-Konflikt | Beide kurzen Starts erzeugten zuvor große Hauptbedrohungen; das Folgeabenteuer ist noch nicht vollständig abgeschlossen |
| Entwicklung | Unterwasserperle, persönliche Geschenke und Quellfrostsegen sind reizvoll | Unzulässiger Talentbonus +3 und überflüssige Verbesserung einer vorhandenen Fähigkeit wurden angeboten |
| Kampf und Magie | Sichtbare LP, weitgehend feste Reihenfolge, kostenlose Frostsplitter tatsächlich eingesetzt | Zufallswerkzeug wurde widersprüchlich behauptet; Langzeitbalance offen |
| Ressourcen | Regeneration in Nummer 4 funktioniert | Nach der ruhigen Nacht in Nummer 2 nicht sauber berücksichtigt |
| Vielfalt | Neue Bedingungen und unterschiedliche Konflikte | Brücken, Wächter, Glocken, Siegel und bedeutungsvolle Zahlen wiederholen sich |

## 2. Paket 0.11: Umfang, Fortschritt und Spielübersicht

### Regeln und Unterbau

- [x] Kurz: zentrales Problem innerhalb eines eigenständigen begrenzten Abenteuers
  abschließen, keine bloße erste Etappe einer größeren Hauptbedrohung.
- [x] Mittel/lang: größere verbundene Bögen und nutzbare Zwischenentwicklung,
  nicht nur häufigere Überschriften, Proben oder Schlussbelohnungen.
- [x] Offene Kampagne von Umfang trennen: gleiche Figur/Welt, keine automatisch
  übergeordnete Hauptgeschichte. Wiederkehrende Personen und Folgen bleiben möglich.
- [x] Plugin und ausgewählte Generatorvorgaben widerspruchsfrei anpassen,
  einschließlich kurz mit wiederkehrenden Verbindungen.
- [x] Besondere Gaben, Gegenstände, Fähigkeiten, Werte, Kontakte und Zugang als
  praktische Entwicklung behandeln. Questobjekte können neue Optionen eröffnen.
- [x] Bereits belohnte Leistungen berücksichtigen; eigenständige Erfolge können
  weitere Entwicklung rechtfertigen. Bezahlung bleibt davon unabhängig.
- [x] Talentbonus +2 erhalten; Meisterschaften erweitern Möglichkeiten. Bestehende
  Fähigkeiten nicht als neue Verbesserung verkaufen. Änderungen vorher abstimmen.

### Charakterübersicht und Notizen

- [x] Eigener lesbarer Spieltab aus vorhandenem JSON, ohne KI-Aufruf oder Chat-Zugriff.
- [x] Werte, Fähigkeiten/Kosten/Grenzen, Ressourcen, Ausrüstung und Entwicklung
  nachschlagen; Dialog für manuelle Aktualisierungen.
- [x] Startbogen beim Weiterführen erhalten; aktuellen Bogen und Bestätigung anzeigen.
- [x] Freitextnotizen, Wiederherstellung beim Neuladen im Tab, bewusstes
  Gerätespeichern und gemeinsamer JSON-Export/-Import.
- [x] Speichergrenzen und manuellen Abgleich erklären; keine automatische Chat-
  oder Geräte-Synchronisierung und keine vollständige Kampagnensicherung behaupten.

[Bedienung und Regeländerungen 0.11](umfang-fortschritt-spieltab-0.11.md)

## Layoutkorrektur 0.12 vor dem nächsten Durchlauf

- [x] Nur noch Plugin-Ausgabe in der UI; direkt anwählbare Vorbereitungsschritte.
- [x] Weltzusammenfassung am Ende, übersichtlichere Spielvorgaben und sichtbares Neuauslosen.
- [x] Charakterbereiche, Template/Import in Dialogen, wachsende Textfelder, erkennbare Tasten.
- [x] Übernahme des gültigen Bogens ohne zusätzlichen Bestätigungshaken.
- [x] Getrennte Fähigkeitstexte für Reichweite, Ziele/Fläche und Schaden; bisherige Angaben erhalten.
- [x] Vollständige Ausrüstungsfelder mit Tragplätzen, Bonus und Funktion erhalten.
- [x] Spielübersicht mit Fähigkeiten und Notizen; Aktualisierung im Dialog, gemeinsamer Export/Import.
- [x] Plugin und Template um die Bedeutung explizit leerer Reichweite und fehlender Altangaben ergänzen.

[Bedienung und Grenzen 0.12](layout-und-faehigkeiten-0.12.md)

## 3. Nächster menschlicher Durchlauf: Spielen statt Pflichtprüfung

- [ ] Spieler wählt Figur, Welt und Umfang nach eigener Lust.
- [ ] Ziel ist ein längerer unterhaltsamer Verlauf; Notizen zu Generator,
  Spielübersicht, Neuerungen und Spielgefühl entstehen nebenbei.
- [ ] Keine erzwungenen Kämpfe, Mindestspielzeit oder vorgeschriebenen Entscheidungen.
  Ein schlechter oder ermüdender Verlauf darf jederzeit beendet werden.
- [ ] Prüfen, ob gewählter Umfang und Fortschritt sich im normalen Spielen bewähren.
  Keine neue Kampagne nach jeder kleinen Korrektur verlangen.

## 4. Nächste mögliche Ausbaupakete

1. **Impuls-Historie:** verwendete Kombinationen lokal merken und zunächst
   ausschließen. Verhalten nach Ausschöpfen festlegen; bewusste Wiederholung
   über Kennung erhalten. Das verhindert keine ähnlichen Geschichten aus
   unterschiedlichen Kombinationen. Ausgangsimpulse bleiben optional.
2. **Optionale Motivimpulse prüfen:** dosierte gestalterische Anregungen statt
   fester Handlungen oder drei verpflichtender Motive. Noch kein festgelegter Katalog.
3. **Charakterablage und Bedienkomfort:** mehrere Figuren wieder auswählen,
   hilfreiche Feldbeschreibungen, Gesamtlayout, Themes und weitere Sprachen nach Nutzen.
   Browser-Sidebar erst erwägen, falls ein separater Tab nicht genügt.

Einzelne Impulsachsen festhalten bleibt eine mögliche spätere Komfortfunktion.
Kein Ausbau ist Voraussetzung für den nächsten normalen Durchlauf.

## 5. Beobachten und bei Gelegenheit erproben

| Thema | Prüfpunkt |
| --- | --- |
| Umfang | Kurz wirklich eigenständig; mittel/lang mit tragenden Wendepunkten und Entwicklung vor dem Finale |
| Handlungsvielfalt | Auch Eigeninteresse, Gewinn oder Entdeckung können tragen; nicht immer andere retten müssen. Keine Verbotsliste für Fantasy-Motive |
| Entwicklung | Gaben praktisch nutzen, Kontakte/Privilegien mit Nutzen und Grenzen; Meisterschaften und spätere Machtzuwächse |
| Kampf | LP, Reihenfolge, Deckung, Bewegung, Rückzug, Kapitulation und 0 LP; kein behauptetes Zufallswerkzeug ohne tatsächlichen Einsatz |
| Ressourcen/Erholung | Wiederholbare einfache Magie, reizvolle bezahlte Kräfte, echte Regeneration; dieselben Grundregeln für NSC |
| Zusatzwürfel | Zunächst gewählte Schadenswürfel und ihr Einfluss auf Tempo und Verständlichkeit |
| Feste Gefährten | Eigenes Handeln, dokumentierte Werte und gemeinsame passende Meilensteine |
| Besondere Bedürfnisse | Etwa Blutdurst: erreichbare Versorgung und vereinbarte Folgen statt unerwarteter Hungermechanik |
| Große Entwicklung | Neue Zauber, legendäre Ausrüstung, Transformationen und bewusst übermächtige Phasen; keine automatische Gegneranpassung |
| Kontinuität | Wissen, Namen, Positionen, Zeit und Finanzen nach Spielauswirkung beurteilen. Hareks Vermutung über Iven ist akzeptable erzählerische Verkürzung |
| Erzählfluss | Reparaturketten, Antwortlänge und wiederkehrende Zahlen/Motive beobachten, ohne immer neue Einschränkungen anzuhängen |

Bilder und folgenlose Darstellungsfehler bleiben niedrig priorisiert. Der
Spielspaß entscheidet mit, nicht allein eine möglichst strenge Regelauslegung.

## Versionsdokumente

- [Geführtes Layout und Fähigkeiten 0.12](layout-und-faehigkeiten-0.12.md)
- [Umfang, Fortschritt und Spieltab 0.11](umfang-fortschritt-spieltab-0.11.md)
- [Ausgangsimpulse und Wissensgrenzen 0.10](ausgangsimpulse-0.10.md)
- [Kampf, Erholung und Übersicht 0.9](kampf-und-erholung-0.9.md)
- [Weltinitiative und wirksame Kräfte 0.8](weltinitiative-0.8.md)
- [Gemeinsamer Erzählauftrag 0.7](erzaehlauftrag-0.7.md)
- [Stand nach Jack 0.6](spielbarer-prototyp-0.6.md)
- [Weltvorlagen und Kurzabenteuer 0.5](welten-und-kurzabenteuer-0.5.md)
