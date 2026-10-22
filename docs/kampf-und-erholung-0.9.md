# Kampf, Erholung und Charakterübersicht · 0.9.0

Mariks Durchlauf wurde als einer der besten Auftakte bewertet. Fantasy,
gefährliche Gegner und Folgen eigener Entscheidungen funktionieren innerhalb
dieses Handlungsbogens deutlich besser. Die Überarbeitung erhält diesen Auftrag
und behebt die dabei sichtbaren Regel- und Bedienungslücken. Sie erklärt weder
den Handlungsbogen für abgeschlossen noch erzählerische Fortsetzungen für gelöst.

## Gemeinsame Regeln

- Sichtbare Kämpfer erhalten vor Verwendung feste LP, Verteidigung, Angriff,
  Schaden, Bewegung und besondere Effekte. Offene Anzeige zeigt auch verbleibende
  gegnerische und verbündete LP. Neu entworfene gewöhnliche Gegner können sich an
  4/6/10 LP orientieren; das ist kein universeller Wert oder automatisches Leveln.
- Die Initiative bleibt pro Runde erhalten. Vor dem Spieler handeln frühere,
  danach spätere Beteiligte, jeweils einmal. Unterbrechungen behalten den Stand.
- Normale Bewegung: bis 10 m, Sprint mit der Aktion weitere 10 m. Abweichende
  Kreaturen und Gelände können andere Werte haben. Keine zusätzlichen freien
  Gelegenheitsangriffe ohne vereinbarte Fähigkeit. Teildeckung gibt Nachteil;
  vollständig blockierte Wirkungslinie verhindert den Angriff. Bewusste Abwehr
  kostet die Aktion und gibt Nachteil auf wahrgenommene Angriffe bis zum nächsten
  Zug. Bloß erzähltes Ausweichen ist bereits in der Verteidigung enthalten.
- Ein bestätigter Treffer zählt bei Gleichstand. Karten, Reichweiten, Flächen
  und Deckung müssen dieselbe Lage verwenden; Unklarheiten kosten keine Aktion.

## Magische Ausdauer und bestehende Figuren

Für neue Kampfmagier schlägt die Erstellung mindestens eine einfache magische
Angriffsmöglichkeit ohne Fokusverbrauch oder eine vergleichbar brauchbare
wiederholbare Kampfoption vor. Der Standardvorschlag: eine Aktion, ein sichtbares
Ziel bis 15 m, normaler Angriffswurf, leichter Schaden 2; Element und Grenzen
werden im Bogen festgelegt. Der Angriff kann verfehlen. Stärkere Wirkungen und
Flächen verbrauchen weiterhin ihre vereinbarten Ressourcen. Eine absichtlich
anders gestaltete Figur bleibt möglich.

Drei Ressourcenpunkte bleiben ein Vorschlag. Für neue solche Pools wird +1 nach
sicherer einstündiger kurzer Rast einmal zwischen vollständigen Ruhephasen und
vollständige Regeneration nach acht Stunden vorgeschlagen. Eine ausdrücklich
vereinbarte andere Regeneration gilt unverändert. Mariks bestätigter Bogen
bekommt keinen ungefragten vierten Zauber; eine Ergänzung braucht seine Zustimmung.
Das JSON-Format bleibt Version 3. Die Übersicht leitet keine neuen Fähigkeiten
ab und verändert weder Startbogen noch aktuelle Werte.

## Erholung und Verletzungen

0 LP bedeuten Handlungsunfähigkeit, nicht automatisch Tod. Ein tatsächlicher
Tod ergibt sich aus der Verletzung und der Lage; er bleibt möglich. Erst dann
greift Standard/Hardcore. Lebende handlungsunfähige Wesen benötigen Stabilisierung
und sichere Versorgung vor der Rast. Routine-Ersthilfe mit geeigneten Mitteln
gelingt ohne Wurf; unsichere Rettung bekommt klare Folgen.

Danach gelten dieselben Standards für Spieler, Begleiter und Gegner: sichere
ungestörte einstündige kurze Rast +2 LP einmal zwischen vollen Ruhephasen;
sichere ungestörte achtstündige Ruhe volle LP, auch von stabilisierten 0 LP aus.
Ressourcen folgen ihrem Bogen. Normale Wunden begründen keine versteckten weiteren
Nachteile. Längerfristige Verletzungen bleiben eine ausdrücklich vereinbarte
Zusatzregel mit Auslöser, Wirkung, Versorgung und Erholung. Die neue Version
führt kein zusätzliches Blutungs-, Infektions- oder Operationssystem ein.

## Meta, Wiederholungen und Spielerhoheit

Eine Rückfrage ist kein Fehlerbeweis. Die Spielleitung erklärt eine gültige Lage,
darf schlechte NSC-Vorschläge bestehen lassen und korrigiert nur echte Widersprüche.
Sie reagiert auf Spielerrede statt sie auszuschmücken oder neue Dialoge zuzuteilen.

Vorbereitung und tatsächlich nachlassender Widerstand ändern Unsicherheit oder
Folgen. Phasen eines Rituals benötigen verschiedene Entscheidungen oder Risiken;
ein Fehlschlag darf nicht endlos neue Voraussetzungen für dasselbe Ziel erzeugen.
Wiederholungen mit fortlaufenden Kosten und Folgen bleiben möglich. Kurze lokale
Abenteuer dürfen enden, während ein größerer Hintergrund noch ungelöst ist.

## Separate Spielübersicht

Die Übersicht ist im Charaktereditor und beim fertigen Startpaket verfügbar:
kopieren, Markdown herunterladen oder ein Druckfenster öffnen. Der Inhalt bleibt
reiner Text, auch bei HTML in Namen oder Beschreibungen. Kosten, Wirkung und
Grenzen werden vollständig übernommen statt automatisch gekürzt. Biografie und
ursprünglicher Bogen werden nicht jedes Mal mit ausgegeben.

Da Rüstung und Sonderregeln bisher freie Beschreibungen sind, zeigt die Übersicht
die berechnete Grundverteidigung und die Rüstungsregel getrennt. Sie erfindet
keinen aus Text geratenen Endwert. Die Übersicht ist statisch, kein automatischer
Abgleich mit dem Spielchat. Bei Erstellung erst im Chat kann ein später
exportierter Bogen in den Editor importiert werden. Die Kontrolle über die Figur
und die Speicherung des vollständigen Bogens bleiben beim Spieler.

## Validierung und Grenzen

Automatisierte Prüfungen decken unveränderte Figuren, vollständige Effekte,
aktuelle gegenüber ursprünglichen Werten, ungültige Eingaben, Versionsgleichheit
und Paketierung ab. DOM-Prüfungen kontrollieren beide Stellen der Übersicht,
Kopieren/Download/Druck und das Ausblenden ungültiger Ausgaben. Zwei unabhängige
kurze Regelanwendungen prüfen einen Kampfzug bei leerem Fokus und eine Meta-Frage
zu NSC-Erholung und Unterkunft. Das ersetzt weder einen Spieltest im ChatGPT-Host
noch eine statistisch belastbare Balancebewertung.

Der nächste Übergangstest sollte mit einer abgeschlossenen kurzen Ausgangslage
beginnen, nicht mit sieben vorbereiteten Sammelzielen. Solch ein Test wurde in
dieser Änderung nicht als neue Kampagne angelegt oder als bestanden gewertet.
