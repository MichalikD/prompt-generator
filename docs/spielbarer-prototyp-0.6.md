# Stand nach Jack · Plugin-Regelbasis 0.6.0

## Was der Durchlauf zeigt

Die Fahndung, das Rennen und die Reiseaufträge ergeben kurze abschließbare
Abschnitte. Das Rennen bietet andere Entscheidungen und Erfolgskriterien als die
Fahndung. Kleine Begegnungen wie der Esel am Markt verdichten die Atmosphäre,
ohne zu weiteren Pflichtaufgaben zu werden. Erworbenes Taktik-Talent wird später
tatsächlich verwendet. Ein misslungener Zieleinlauf darf die Platzierung kosten.

Das ist ein brauchbarer spielbarer Prototyp. Ein guter Lauf beweist keine allgemeine
Erzählqualität. Auch ein vollständig ausgespielter Kampf, Fähigkeitsressourcen,
mechanische besondere Bedürfnisse, Zusatzwürfel und feste Gefährten sind noch
nicht ausreichend erprobt. Die neue Regelwirkung ist mit Quellprüfungen nicht beweisbar.

## Umsetzung

- **Vielfalt:** Neue Arbeitgeber, Fracht oder Orte genügen nicht. Die nächste
  Gelegenheit soll andere relevante Entscheidungen ermöglichen. Direkte Folgen
  dürfen denselben Konflikt fortführen, sollen aber Rolle, Lage oder Interessen
  verändern. Keine vorgeschriebene Rotation und kein Verbot von Reiseaufträgen.
- **Abschlüsse:** Zielannahme und Ausgang verständlich machen. Routineauftrag,
  kurzer Einschub und substanzielles Abenteuer werden nach ihren Entscheidungen
  und Folgen unterschieden, nicht nach Bezahlung oder Kapitelüberschrift.
- **Entwicklung:** Auch kurze oder nur teilweise erfolgreiche Abenteuer würdigen.
  Bei einem Abenteuerabschluss Verbesserung anbieten oder kurz erklären, warum
  noch kein Meilenstein fällig ist. Kleinere bedeutsame Fortschritte gehen bei
  Ortswechseln nicht verloren. Keine Steigerung pro hilfreicher Geste, keine EP.
- **Vorbereitung:** Wirkung vor der Probe benennen: ermöglicht, senkt Schwierigkeit,
  gewährt Vorteil oder beseitigt Unsicherheit. Nicht jede gute Idee braucht Vorteil.
- **Fehlschlag:** Vereinbarten Erfolg gegen Zeit-/Ressourcenkosten zusammenhängend
  abwickeln; sonst nicht automatisch den verbesserten Plan des Spielers erfinden.
- **Angriffe:** Bei Rückzug gelten dieselben Regeln. Ein zweiter gefährlicher
  Schuss verfehlt nicht automatisch; wirkungsloses Feuer nach gelungener Flucht
  braucht keine weiteren Würfe. Dasselbe bereits aufgelöste Risiko nicht doppelt würfeln.

Unverändert: Attribute, SG-Stufen, Schaden, Entwicklungsauswahl, Probenhäufigkeit,
Antwortlängen, Inventar, Figurenformat 3 und Ressourcenmechaniken. Keine Datenbank,
automatische Zustandsprüfung, Modell-API oder technische Versionssperre.

## Kompakte Ausgabe einfrieren

Das Plugin ist die Standardausgabe. Der kompakte Regelsatz bleibt auf Stand 0.5
als gekennzeichnete Alt-Ausgabe verfügbar; 0.6-Regeln werden nicht hineinkomprimiert.
Sein bisheriger Quellstand ist zusätzlich über Git erhalten. Die gemeinsamen
Welt-/Figurendaten und bestehenden Prüfungen bleiben zunächst nutzbar; daraus folgt
keine Zusage, künftig jede Pluginfunktion in der alten Ausgabe abzubilden.

## Ressourcen als nächster gezielter Test

Der Bogen unterscheidet bereits Geld, Fähigkeitsressourcen und besondere Bedürfnisse:

- Mana o. Ä.: `vitals.resources` mit aktuellem/Maximalwert, Wirkung, Kosten und
  Regeneration; konkrete Fähigkeiten mit Wirkung, Kosten und Grenzen.
- Blutdurst o. Ä.: standardmäßig beschreibendes `needs` ohne erfundene Zähler oder
  Nachteile. Für einen ausdrücklich gewünschten mechanischen Test
  `mechanical: true` und eindeutige Auslöser, Wirkung und Versorgung vereinbaren.
- Wenn Blut zugleich Fähigkeiten speist und Versorgung braucht, denselben
  Sachverhalt nicht in zwei widersprüchlichen Zählern führen.

Vor dem Test muss klar sein, wann Verbrauch/Bedarf eintritt, was bei leerem Vorrat
passiert und wie Versorgung tatsächlich erreichbar ist. Vorhandene Mechanik prüfen,
keine automatische Gleichsetzung von Ruhe mit vollem Mana oder gestilltem Blutdurst.
Verbrauch, Mangel und Versorgung sollen im Spiel vorkommen können; der Test muss
dafür keine eigenständige lange Kampagne sein. Keine andere Schwäche ungefragt ersetzen.

## Rückkehrpunkt und Nutzung

Vorheriger Stand: Merge von PR #10, Commit
`2c54066` (Plugin 0.5.0). Die Änderung kann über einen Revert-PR zurückgenommen
werden; ein Git-Revert ändert die private Plugininstallation nicht automatisch.
Für einen Plugin-Rollback den alten Inhalt mit einer neuen höheren Paketversion
veröffentlichen, da der Dienst niedrigere Versionsnummern ablehnt.

Neue Spieltests mit frischem Plugin-Startpaket beginnen. Begonnene Durchläufe
nicht stillschweigend umstellen. Ein Pluginupdate ist keine technische
Versionsbindung an alte Chats; benötigte ältere Regeln müssen dort verfügbar sein.
