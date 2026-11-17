# Changelog

Umgesetzte Änderungen, getrennt von [offenen Aufgaben](docs/roadmap.md) und
[Spielerfahrungen](docs/erprobung.md). Generator- und Regelversion können voneinander
abweichen. Diese Übersicht dokumentiert Änderungen, keine garantierte Modellbefolgung.
Für frühere Details bleiben die Versionsdokumente und das
[Roadmap-Archiv](docs/roadmap-archiv-bis-0.24.md) erhalten.

## Generator 0.25.0 · Regelbasis 0.21.0

- K1-Kampfkern: normal / kontrolliert (−2 Angriff, Gleichgewicht stören) / riskant
  (+2 Angriff, −2 eigene Verteidigung); keine Änderung der Schadensbänder oder Würfel.
- Eine Reaktion pro eigenem Zugzyklus für Gelegenheitsangriff, vorbereitete Aktion
  oder bestätigte Technik; konkrete Kosten und Wirkungen für körperliche Manöver,
  Aufstehen als Aktion, richtungsabhängige Teil-/Volldeckung.
- Kurze Aktionsübersicht vor der eigenen Wahl, Reaktionen am Auslöser anbieten,
  Verbündete und Gegner bis zur nächsten Spielerentscheidung abwickeln.
- Dynamischer Abenteuerumfang als Standard: unterschiedlich lange Konflikte mit
  erreichbarem Ende, nutzbarer Zwischenentwicklung und ohne künstliche Verlängerung.
  Feste Umfangswahlen bleiben erhalten; offene Kampagne bedeutet kein endloser Konflikt.
- Weltweite Darstellung Zurückhaltend / Deutlich / Drastisch unabhängig von Atmosphäre,
  Schadensregeln und tatsächlicher Verletzung. Deutlich ist Standard. Ton bleibt
  situationsgerecht, Humor kein globaler Auftrag; Fraktionen behalten ihre Interessen.
- Ergebnisse verändern erkennbare Möglichkeiten, Einfluss und Beziehungen in der Welt.
- Startpaket und alle drei Entwurfstemplates übernehmen die passenden Einstellungen;
  Charaktertemplate vergleicht Techniken mit den neuen Grundhandlungen und verlangt
  ausdrückliche Nutzungs-/Erholungsregeln. Keine automatischen Fähigkeiten oder Resets.
- Aktive Ausgabeprüfungen decken jede Auswahl, Optionspaare, alle gültigen Würfelsets
  sowie die vollständige Ton/Darstellung/Umfang/Verlauf-Matrix gezielt ab.

## Generator 0.24.0 · Regelbasis unverändert 0.20.0

- Fortsetzungsseite mit Template für die Rekonstruktion aus vollständigem Chatexport;
  ergänzende Quellen nachrangig, eigenständiger Save, Prüfbericht und Fortsetzungsnachricht.
- Benannte lokale Kampagnenablage mit Original-Startpaket und gespeichertem Spieltab;
  JSON-Sicherung, Laden und gesonderte Bearbeitung einer Vorbereitung.
- Spieltab mit datierten Sitzungsnotizen, fester Werteübersicht, manuellen Kampfnotizen,
  eingeklappten Abschnitten und gespeicherter Reihenfolge über Auf-/Ab-Schaltflächen.
- Speicheroptionen dauerhaft oben; neue Listeneinträge gezielt öffnen.
- Entwurfsimpulse verdecken, Startimpuls zur Welt und Crew-Erstellung nach dem Bogen;
  verständliche Prozentdarstellung unkalibrierter Modellschätzungen.
- Keine neue Spielmechanik und keine automatische Chat-Synchronisierung.

## Generator 0.23.0 · Regelbasis 0.20.0

- Gesprächsabsicht, Würfelanforderung, Kampfauftakt und Wirkung von Täuschung präzisiert.
- Kurze Abenteuer mit Entdeckung und Rätselsubstanz; folgenreiche Ergebnisse unabhängig
  von Überschrift oder Beute abrechnen.
- Welt, optionale Crew und manuelle Begleiter gemeinsam im Spieltab bearbeiten/exportieren;
  Speicheroptionen oben und Schließwarnung bei nicht gesicherten Änderungen.

## Generator 0.22.0

- Optionale fünf Entwurfsgrundlagen vor dem vollständigen Welt-/Figuren-/Crew-JSON.
- Unkalibrierte Wahrscheinlichkeiten ausdrücklich keine Qualitätsbewertung;
  Einzelentwurf bleibt Standard, Auswahl im externen KI-Chat.

## Generator 0.21.0

- Folgeaufträge nach Zielen und entscheidenden Handlungen vergleichen, Wiederholungen prüfen.
- Figuren-Template, Import und Download in gemeinsamem Dialog.

## Generator 0.20.0

- Unabhängige optionale Entwurfsimpulse für Welt, Figur und Crew.
- Eigene Vorgaben und bestätigte Angaben behalten Vorrang; Startimpuls bleibt getrennt.

## Generator 0.19.0

- Strukturierte Welt-/Crew-JSONs mit Importprüfung, Bearbeitung und Download.
- Reihenfolge Welt → Figur → optionale Crew und erneute Übernahme nach relevanten Änderungen.
- [Format, Bedienung und Grenzen](docs/strukturierte-vorbereitung-0.19.md).

## 0.18.0

- Kampfablauf, NSC-Würfe, Meta-/Figurenwissen und EXP-Abrechnung am Ergebnis präzisiert.
- Kreative Hintergrundvorschläge aus knapper Figurenidee; optionale Welt-/Crewtemplates.
- [Umfang und Prüfgrenzen](docs/abwicklung-und-kreative-vorbereitung-0.18.md).

## 0.17.0

- Umfang/Kampagnenstruktur getrennt, EXP bei entschiedenem Ergebnis, Antwortstandard
  höchstens 250 Wörter mit Ausnahmen.
- Talententwicklung bis +5 oder Meisterschaft; Beschreibung/Hintergrund im Spieltab.
- [Details](docs/abenteuergrenzen-und-spieltempo-0.17.md).

## 0.16.0

- 1/2/3 EXP nach Ergebnis; je 2 EXP persönliche Entwicklung mit sofortiger Auswahl.
- Weltgewinne unabhängig von EXP, kein Pflichttraining vor verdienter Verbesserung.
- Weltvorlagen sprachlich angeglichen, Fortschrittsdaten in Bogen und Export.
- [Details](docs/exp-und-weltprofile-0.16.md).

## 0.15.0

- Gleicher Vorbereitungsauftrag für Einstieg und Folgeabenteuer, erreichbare Abschlüsse,
  praktische Entwicklung, eigenständige Fraktionen und geraffte Routine.
- Versionsanzeige, Ressourcenplatzierung, Hintergrundtemplate und Waffenprofilanzeige.
- [Details](docs/abschluesse-und-fortschritt-0.15.md).

## 0.14.0

- Solobegegnungen, erlebbarer Machtgewinn, Waffenprofile, transparente Kampfabläufe
  und Entwicklung durch Erkundung überarbeitet.
- [Numerische Prüfung und Grenzen](docs/solospiel-und-waffen-0.14.md).

## Frühere Versionen – Detailindex

- [0.13: Fortsetzungen, Ruhe und Weltpräsenz](docs/fortsetzungen-0.13.md)
- [0.12: Geführtes Layout und Fähigkeiten](docs/layout-und-faehigkeiten-0.12.md)
- [0.11: Umfang, Fortschritt und Spieltab](docs/umfang-fortschritt-spieltab-0.11.md)
- [0.10: Ausgangsimpulse und Wissensgrenzen](docs/ausgangsimpulse-0.10.md)
- [0.9: Kampf und Erholung](docs/kampf-und-erholung-0.9.md)
- [0.8: Weltinitiative und Kräfte](docs/weltinitiative-0.8.md)
- [0.7: Gemeinsamer Erzählauftrag](docs/erzaehlauftrag-0.7.md)
- [0.6: Spielbarer Prototyp](docs/spielbarer-prototyp-0.6.md)
- [0.5: Weltvorlagen und Kurzabenteuer](docs/welten-und-kurzabenteuer-0.5.md)
- [0.4: Fortsetzung](docs/fortsetzung-0.4.md)
- [0.3: Rücknahme und Vergleich](docs/rollback-0.3.md)
- [0.2: Allgemeine Regelbasis](docs/regelbasis-0.2.md)

Die jeweiligen Dokumente beschreiben ihren damaligen Stand. Historische Regeln
gelten nicht zusätzlich zu einer später ausdrücklich abgelösten Festlegung.
