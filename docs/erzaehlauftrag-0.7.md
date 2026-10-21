# Gemeinsamer Erzählauftrag · 0.7.0

## Anlass und Umfang

Arens Auftakt hatte einen vorbereiteten Konflikt und einen klaren Abschluss.
Danach folgten ein abgelehnter Hafenansatz, Reiseetappen und wiederholte
Hilfssituationen. Erkundung verschob sich hinter weitere Siedlungen. In der
Konfrontation hielt eine Reihe von Annäherungsproben die Situation fest.
Die Korrektur ist eine gemeinsame Überarbeitung von Spielleitung und Startpaket,
kein weiterer Karren-Ausschluss und keine vorgefertigte Kampagne.

## Ein Ablauf für alle Abenteuer

Vor jedem Abenteuer, auch nach einer Auflösung, bereitet die Spielleitung eine
Situation vor: Beteiligte/Interessen, mögliche Beteiligung der Figur, begrenztes
Vorhaben, Entwicklungen ohne Eingreifen und mögliche Ausgänge. Der Spieler
bestimmt durch sein Handeln das tatsächlich verfolgte Ziel. Kein fester Lösungsweg.
Die Spielleitung behält im verfügbaren Kontext, was gerade verfolgt wird, was
sich verändert hat und ob der Ausgang erreicht ist. Journal und Export können
das sichtbar machen; kein Questkasten oder Zustandsschema pro Antwort nötig.

Begegnung, Szene und Abenteuer sind nicht dasselbe. Ein kurzer hilfreicher Griff
bleibt ein Einschub; Weltreisen ist eine Kampagnenmotivation. Ein Abenteuer
besitzt ein begrenztes Vorhaben mit Entscheidungen, Herausforderung und
erkennbarem Ausgang. Auch Entdeckung, Niederlage oder friedliche Lösung können
es tragen. Nach der Auflösung werden Folgen, Geld und Entwicklung abgewickelt;
in offenen Kampagnen wird dann das nächste Abenteuer vorbereitet. Einzelabenteuer
enden weiterhin mit Epilog, verbundene Kapitel tragen zum größeren Finale bei.

## Welt, Erkundung und Szenen

- Personen handeln nach Interessen, Konsequenzen verändern Möglichkeiten,
  Entdeckungen eröffnen neue Richtungen. Wiederkehrende Arbeitgeber und lange
  Beziehungen bleiben möglich; keine feste Rotation von Handlungsarten.
- Die Ablehnung eines Ansatzes darf nicht dauerhaft zu generischen kleinen
  Hilfsangeboten führen. Erklärte Weiterreise überspringt ereignisarme Etappen
  bis zur nächsten relevanten Unsicherheit oder Entscheidung.
- Wildnis bleibt an ihrem etablierten Ort. Entdeckungen sollen Verständnis oder
  Handlungsmöglichkeiten verändern; nicht jede muss eine Gefahr verbergen.
- Aktive Opposition verwendet den bestehenden Handlungsablauf. Bewegung über
  freien Boden ist nicht automatisch eine weitere Probe; Helfer und Gegner
  handeln ebenfalls. Getrennte Würfe bleiben bei unterschiedlichen Risiken möglich.
- Kurze Wechsel und Routine, ausführlichere wichtige Entdeckungen. Änderungen
  zeigen statt bekannte Lage und Optionen immer neu zu erklären. Keine Wortquote.

## Eindeutige Zuständigkeit der Texte

Die allgemeine Spielleitung steht im Plugin mit vier Referenzen. Die neue
`src/plugin-profile.mjs` erzeugt nur die tatsächlich gewählten Vorgaben.
Ein Kurz-Startpaket erläutert keine mittlere Länge mehr. Der lange allgemeine
Erzählabsatz entfällt aus der Plugin-Ausgabe. Das ausgewählte Profil ersetzt
klar bezeichnete Ersatzwerte im Skill; Weltanpassungen ersetzen Vorlagenvorgaben.

Beispiel ohne Figur, mit Kurz/offen/Entdeckung/Action/gelegentlichen Gefährten:
Startnachricht vorher 5.025, jetzt 3.220 Zeichen (JavaScript-Zählung).
Dies ist eine Textlängenmessung, keine Qualitäts- oder Tokenkostenzusage.

Die kompakte Regel-/Profilausgabe nutzt weiterhin ihre alte Formulierung.
Sie erhält die neue allgemeine Spielleitung nicht. Fingerabdrücke repräsentativer
Ausgaben aus dem Stand vor 0.7 schützen den eingefrorenen Generatorpfad.
Gemeinsame Figurenanzeige und Eingabehilfen bleiben gemeinsam genutzt.

## Begleitende Klarstellungen

- **Meta:** an die Spielleitung gerichtet, keine automatische Figurenrede,
  Wissensübertragung oder Zeitfortschritt. Eine Frage ändert keine Regel.
- **Magie:** die Fantasy-Vorlage erlaubt Übernatürliches, ohne dessen weltweite
  Mächtigkeit aus dem Wort „begrenzt“ abzuleiten. Die bestehende Auswahl unterscheidet
  vorhandene Magie mit offener Verbreitung von verbreiteter Magie; keine neue
  Auswahlachse. Individuelle Fähigkeiten bleiben konkret vereinbart.
- **Humor und Ruhe:** Humor ist möglich, nicht Pflicht. HP und Fähigkeitsressourcen
  regenerieren nach ihren vereinbarten Bedingungen; keine automatisch passende Herberge.
- **Entwicklung:** leere Historie bedeutet noch keine erhaltene Verbesserung.
  Der Startbogen bleibt Ausgangspunkt; der vorhandene Schalter führt zum
  aktuellen Bogen mit Entwicklungsfeldern. Bestätigte Bögen verlangen keine
  erneute Bestätigung im ausgegebenen Text.
- **Fähigkeiten:** passende später erlernte Zauber können vom vorhandenen Talent
  profitieren. Das Talent schenkt keine neuen Zauber oder kostenlosen Effekte.
  Sterblichkeit und vereinbarte Startfähigkeiten sind keine ewige Entwicklungssperre.
- **Kosten:** etablierte Ausgaben auch bei geraffter Zeit zusammenfassen.
  Notwendige Schätzungen vorab nennen; keine rückwirkenden Fantasiegebühren.
  Verdiente kostenlose Unterkunft bleibt kostenlos.

## Prüfung und Grenzen

Automatische Prüfungen decken gewählte Einstellungen, Trennung der Ausgaben,
vollständige freie Angaben, Weltkombinationen, Figurenentwicklung, eingefrorene
Ausgaben, Referenzen, Metadaten und reproduzierbare Paketierung ab. Ein DOM-Test
prüft Vorbereitungsschritte, Moduswechsel, Weltvalidierung und Figurenübergabe.

Kurze unabhängige Szenenproben verwenden die neue Spielleitung und minimale
Spielkontexte; sie sind keine vollständige Kampagne und beweisen keine dauerhafte
Vielfalt. Die Waldprobe zeigte eine Entdeckung im abgelegenen Gebiet, aber wieder
eine Rettungssituation. Die Konfrontationsprobe brachte den deklarierten Zauber
ohne erneute Annäherungsschleife zur Anwendung; nach dessen Fehlwurf handelten
Verbündete und Gegner weiter, der Ätherverbrauch blieb bei einem Punkt. Das sind
begrenzte positive Beobachtungen, kein Nachweis vollständiger Regelbefolgung.
Alle 49 automatischen Tests, Paketprüfung und DOM-Durchlauf bestanden.
Die nächste menschliche Auswertung soll insbesondere die Fortsetzung
über einen Abschluss hinaus beurteilen. Ressourcenverbrauch/Mangel/Versorgung,
vollständiger Kampf, Zusatzwürfel und feste Gefährten bleiben offene Prüfbereiche.

Keine neue Modell-API, Datenbank, automatische Kampagnenprüfung oder technische
Versionsbindung. Attribute, SG-Stufen, Schadenswerte, Steigerungsoptionen,
Figurenformat und Ressourcenmechaniken sind unverändert.

Rückkehrpunkt: Commit `df8875c`, Stand vor dieser Änderung mit Plugin 0.6.0.
Git-Revert und private Pluginveröffentlichung sind getrennte Schritte; für einen
Plugin-Rollback alten Inhalt mit einer neuen höheren Paketversion veröffentlichen.
Begonnene Chats werden durch ein Pluginupdate nicht technisch auf ihre alte
Regelfassung festgeschrieben. Für neue Tests ein frisches Startpaket verwenden.
