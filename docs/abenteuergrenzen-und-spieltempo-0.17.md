# Abenteuergrenzen und Spieltempo · 0.17.0

## Gemeinsamer Vertrag

| Auswahl | Zuständigkeit |
| --- | --- |
| Kurz | Ein begrenzter Konflikt mit entscheidender Herausforderung und eigenem Ausgang |
| Mittel | Ein größerer Konflikt mit mehreren verbundenen Wendepunkten und gemeinsamem Ende |
| Lang | Mehrere substanzielle Abschnitte eines größeren Konflikts mit erreichbarem Finale |
| Einzelabenteuer | Nach Abrechnung Epilog; Fortsetzung nur auf Wunsch |
| Offen | Weitere Abenteuer derselben Figur/Welt, ohne Pflicht zur großen Hauptgeschichte |
| Verbunden | Wiederkehrende Figuren/Folgen; kurze Abenteuer bleiben unabhängig abgeschlossen |
| Ton | Atmosphäre und Gefahr, keine Umfangsänderung |
| Schwerpunkt | Arten von Herausforderungen, keine Änderung von Ton oder Umfang |

Die ausgewählte Umfangsdefinition steht im Startpaket; der allgemeine Ablauf steht
im Plugin. Kein Profil kann ein anderes durch eine stillschweigende Annahme aushebeln.
Ziel, Widerstand und Abschlussbedingung werden vorbereitet. Jeder qualifizierte Ausgang
wird sofort abgerechnet, unabhängig von Hintergrundfragen. 1/2/3 EXP und die Schwelle 2
bleiben. Ein späteres neues Finale erhält EXP für sein neues Ergebnis, ohne frühere
Teilergebnisse nochmals zu zählen. Reine Routine und unabgeschlossene Versuche bleiben 0.

## Tempo und Figuren

Die 250-Wörter-Grenze zählt normale Erzählung, Dialog und sichtbare Regelangaben.
Keine Zielwortzahl; kurze Antworten dürfen sehr kurz bleiben. Notwendige entscheidende
Szenen, umfangreiche Regelabrechnungen und ausdrücklich lange Antworten/Exporte dürfen
sie überschreiten. Wichtige Regelangaben dürfen nicht entfallen. Eine feste Wortzahl
kann im Chat nur angewiesen, nicht technisch erzwungen werden.

Starttalente +2; aktuelle Talente 2 bis 5, je Verbesserung +1. Alternativ neue
Meisterschaftsanwendung. Ein Talent pro Probe; keine zusätzliche Aktion/Schadenssteigerung.
+1 entspricht fünf Prozentpunkten bei einer noch offenen W20-Schwelle; ein bereits
sicheres oder unmögliches Vorhaben wird dadurch nicht automatisch unsicher/möglich.
Originalbogen bleibt unverändert. Bestehende akzeptierte Abweichungen nicht still umschreiben.

Beschreibung und bestätigter/offener/ausgeschlossener Hintergrund erscheinen im Spieltab.
EXP und Entwicklung bleiben im Bearbeitungsdialog, vollständiger Textkopie und JSON-Export,
aber nicht in der normalen Übersicht. Kein automatischer Abgleich mit dem Chat.

## Gezielte Prüffälle

1. Kurz + offen/verbunden/einzeln: jeweiliger lokaler Konflikt erreicht einen eigenen
   Ausgang; ein unbekannter Sponsor allein verschiebt Abschluss und EXP nicht.
2. Mittel/lang: abgeschlossene Zwischenergebnisse werden sofort vergütet; der noch
   offene Gesamtbogen wird dabei nicht als abgeschlossen ausgegeben.
3. Gescheiterte Bergung mit erfolgreicher Rettung: Rettung zählt, Bergung bleibt
   gescheitert. Ein späterer anderer entscheidender Erfolg bleibt vergütbar.
4. Finale nach bezahlten Teilergebnissen: neuer Ausgang erhält EXP und sofort drei
   Optionen, keine erneute Vergütung desselben Ergebnisses, kein Warten auf Nachfrage.
5. Dialog: Frage beantworten, eigene Worte nicht nochmals wiederholen; klare
   Anweisung ausführen bis zu echter neuer Entscheidung, keine Kleinstbestätigung.
6. Technik: normale Infrastruktur folgt dem Weltprofil; besondere Apparatur braucht
   etablierte Verfügbarkeit/Grenzen. Eigene bewusste Weltabweichungen haben Vorrang.

Automatische Prüfungen kontrollieren Daten und Integration. Diese Szenarien sind
Akzeptanzkriterien für beobachtete Modellantworten, kein behaupteter erfolgreicher
Live-Test. Reale Langzeitwirkung und Erhalt des Spielspaßes bleiben zu prüfen.

## Durchgeführte technische Prüfung

82/82 Node-Tests, Konfigurationsprüfung, Plugin-Paketprüfung/-bau und Skillvalidierung
bestanden. DOM-Prüfungen des geführten Generators und Spieltabs bestätigen das Bearbeiten
von Talent +3, unveränderten Originalbogen/Notizen, die ausgeblendeten Fortschrittsbereiche
und die neue Hintergrundanzeige. Diese Prüfungen ersetzen keinen längeren Spielverlauf.
