# Abwicklung und kreative Vorbereitung · 0.18.0

## A. Bestehende Kämpfe vollständig auflösen

Der Ablauf liegt gebündelt in **Checks and Combat**: Ziel und Formel ansagen,
Treffer bestimmen, den ausgewählten Schadenswürfel auflösen, LP ändern und erst
dann zum nächsten Akteur wechseln. NSC-Angriff und NSC-Schaden werden ohne
Spieleraufforderung abgeschlossen; auf eigene Rohwürfe des Spielers wird weiterhin
gewartet. Grund-SG, Schadensklassen, Würfelabbildung und Aktionszahl bleiben erhalten.

Die allgemeine Grenze zwischen Regelwissen und Figurenrede steht im Skill.
Figuren beschreiben wahrnehmbare Verletzungen oder knappe Situationen, keine LP
oder fehlenden Probepunkte. Echte Spielstände eines Wettbewerbs, Geldbeträge und
Messwerte sind weiterhin mögliche Gesprächsinhalte.

Bei Geschützen und Fahrzeugen werden vor dem relevanten Einsatz Angriff,
Zielwerte, Reichweite und Wirkung vereinbart. Wenn normale Schadensklassen passen,
gilt deren vorhandener Würfelablauf. Andernfalls ist eine überschaubare Abweichung
vor dem Wurf nötig; kein stiller Wechsel zu erfundenen Hüllenprozenten. Das ist
kein neues Fahrzeugkampfsystem und keine automatische Umskalierung persönlicher Waffen.

## B. Ergebnisse statt Verwaltungswege abrechnen

**Development and Saves** bleibt die Quelle für EXP und unabhängige Gewinne.
Eine entschiedene Rettung, Bergung oder Expedition wird in ihrer Ergebnisantwort
abgerechnet. Ein Verkauf, eine Behörde oder ein neuer Auftrag verschiebt diesen
Zeitpunkt nicht. Frühere Ergebnisse werden beim späteren Finale nicht erneut
gezählt; ein neuer eigenständiger Ausgang bleibt vergütbar.

Eigentum mit einsetzbarem Nutzen, geschätzter Wert, vereinbarter Verkaufspreis,
ausstehende Zahlung und tatsächlich verfügbare Mittel sind unterschiedliche Zustände.
Ein wertvoller Fund ist bereits Eigentum, aber nicht automatisch Bargeld. Eine
spätere Zahlung wird mit vereinbarten Anteilen/Kosten einmal verbucht. Sie erzeugt
keine zweite EXP-Vergabe für die bereits abgerechnete Expedition.

## C. Kreative, prüfbare Entwürfe

- **Charakter:** Ein oder zwei Sätze reichen. Das Template ergänzt passende
  Persönlichkeit, Vergangenheit, Beziehungen und Antriebe als zusammenhängenden
  Vorschlag. Explizit offene oder ausgeschlossene Angaben bleiben erhalten.
  `confirmed:false` gilt für den gesamten Entwurf, auch seine vorgeschlagenen
  Hintergrundfakten. Sie werden erst mit Übernahme verbindlich. Das bestehende
  Figurenformat bleibt unverändert; gewöhnliche Handlungen werden nicht als
  besondere Fähigkeiten verkauft. Bestätigte Bögen werden nicht ergänzt oder ersetzt.
- **Welt:** Im Weltschritt öffnet ein optionaler Button ein KI-Template aus den
  aktuellen Weltangaben. Eine kurze Idee ist optional. Das Ergebnis beschreibt
  eine spielbare Region mit Kultur, Institutionen, Interessen und Möglichkeiten,
  keine feste Handlung. Es kann bearbeitet, gesichert und den weiteren Weltvorgaben
  hinzugefügt werden. Auswahlfelder werden nicht umgestellt; die normale
  Weltprüfung bleibt aktiv, auch wenn das Entwerfen vor ihrer Vollständigkeit beginnt.
- **Crew:** Im Figurenschritt gibt es einen eigenen optionalen Dialog. Das Template
  schlägt eine kleine Gruppe mit Rollen, Motiven, Beziehungen, Zugehörigkeit und
  anfänglichen Aufenthalten vor. Der Entwurf bleibt separat und wird erst auf
  ausdrückliche Übernahme Teil der Startnachricht. Er verändert weder Hauptbogen
  noch Gefährtenwahl. Entfernen aus dem Paket lässt den Entwurf bearbeitbar.
  Vollständige Werte werden erst bei spielrelevanter Verwendung festgelegt.

Die Templates sind kopierbare Anweisungen für eine KI nach Wahl; der Generator
ruft keine KI auf. Welt- und Crewentwürfe werden vor dem Schließen über ihre
Downloadbuttons beziehungsweise das vollständige Startpaket gesichert. Kein
automatischer Chat-Abgleich und kein neues Kampagnengedächtnis.

## Akzeptanzfälle für die nächste Spielbeobachtung

Diese Fälle sind Kriterien, keine behaupteten Live-Modelltests:

1. Ein Gegner hat 4 LP. Ein gewöhnlicher Treffer mit ausgewähltem W6 darf erst
   nach dem Schadenswurf als kampfunfähig beschrieben werden: W6=1 bedeutet
   2 Schaden und 2 verbleibende LP; W6=6 bedeutet 4 Schaden und 0 LP. NSC werden
   genauso abgewickelt; verbleibende Verbündeten-/Gegnerzüge gehen nicht verloren.
2. Nach vielen Dialogen gilt dieselbe Würfelzuständigkeit. Eine NSC-Äußerung über
   einen knappen Fehlschlag darf keine Probenschwelle oder Würfelpunkte kennen.
3. Ein zuvor vereinbartes Geschütz bleibt beim vereinbarten Ziel-/Schadensmaßstab;
   die Waffe in der Hand des Bedieners bestimmt nicht den Geschützschaden.
4. Ein kleiner abgeschlossener Auftrag bringt 1 EXP. Eine anschließende normale
   Expedition bringt 2 EXP: zusammen eine sofort angebotene Verbesserung und
   1 EXP Rest, auch wenn der Fund erst später verkauft wird. Verkauf allein bringt
   keine weiteren EXP. Eine neue qualifizierte Rettung ist gesondert zu beurteilen.
5. Eine kurze Figurenidee ohne Hintergrund erhält einen interessanten Vorschlag.
   Dagegen bleibt eine ausdrücklich offene Herkunft offen. Die Übernahme ist
   erforderlich; ein bereits bestätigter Bogen erhält keine ungefragte Vergangenheit.
6. Welt-/Crewvorlagen respektieren eine Welt ohne Magie und explizite Grenzen.
   Ohne Übernahme gibt es keine Crew im Startpaket. Mit Übernahme bleibt sie
   außerhalb des Hauptbogens und die Handlung offen.

Automatische Prüfungen betreffen Daten, Übergaben, Validierung und Paketkonsistenz.
Die erzählerische Qualität und die Regelbefolgung im langen Spiel bleiben gesondert
zu beobachten. Vielfalt, Namenshistorie und ein Kontinuitätsprototyp sind weiter offen.

## Durchgeführte technische Prüfung

87/87 Node-Tests, Konfigurationsprüfung, Plugin-Paketprüfung/-bau und Skillvalidierung
bestanden. DOM-Tests prüfen den bisherigen Ablauf einschließlich Spieltab sowie die
neuen optionalen Dialoge: unvollständige eigene Welt entwerfen, ohne die Startprüfung
zu umgehen; kopieren/übernehmen; Weltfelder und Hauptbogen erhalten; Crew entfernen,
erneut übernehmen und zurücksetzen. Ein Wechsel zur Figurenerstellung im Spielchat
übergibt dem Crewtemplate keinen alten vorbereiteten Bogen. Keine visuelle Browser-
oder Live-Modellprüfung wurde damit behauptet.
