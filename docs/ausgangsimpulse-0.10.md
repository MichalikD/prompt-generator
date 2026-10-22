# Optionale Ausgangsimpulse · 0.10.0

## Zweck und Umfang

Marik und Iven lieferten spielbare Abenteuer, aber ähnliche Anfänge: schwebende
Inseln, sieben Anker, alte Siegel und ähnliche Namen. Der Generator gibt deshalb
auf Wunsch andere Ausgangsbedingungen mit. Er schreibt keine Handlung, Gegner,
Wahrheit, Wendung, Lösung oder Spielerentscheidung vor. Der Erzählauftrag bleibt
erhalten; ein neuer Motivkatalog wird nicht eingeführt.

## Bedienung

1. Im Plugin-Startpaket unter **Spielvorgaben** den optionalen Ausgangsimpuls
   aktivieren. Er ist standardmäßig ausgeschaltet.
2. Die Kennung wird einmal erzeugt. **Neu auslosen** erzeugt eine andere Kennung.
   Alternativ eine vorhandene Kennung eingeben, etwa `ogm1-00000001`.
3. Bausteine bleiben zunächst zugeklappt. Der vollständige Starttext ist bei
   aktivem Impuls ebenfalls verborgen und kann ohne Anzeigen kopiert werden.
   **Aufdecken** zeigt ihn ausdrücklich; die Download-Datei enthält ihn ebenfalls.
4. Figur wie gewohnt vorbereiten und bestätigen. Ausfüllen, Kopieren und Drucken
   erzeugen keinen neuen Zufall. Welt-/Tonänderungen werden mit derselben Kennung
   neu ausgewertet und schließen eine geöffnete Bausteinansicht wieder.

Scheitert das automatische Kopieren, bleibt der verborgene Text verborgen. Die
Oberfläche erklärt, dass er zum manuellen Kopieren aufgedeckt werden muss.
Die Kennung und Eingaben werden nicht über das Schließen/Neuladen des Tabs hinweg
gespeichert. Für später das Startpaket sichern und dieselben Vorgaben verwenden.

Die Bereiche sind Spoilerschutz in der Oberfläche, keine geheime Speicherung:
Starttext, Download und Seitenquellzustand sind technisch einsehbar. Das
Charaktertemplate enthält keinen Ausgangsimpuls; der Start bestimmt nicht schon
bei der Erstellung, welche Vergangenheit oder Fähigkeiten die Figur erhält.

## Katalog 1: nur zwei Achsen

| Umgebung bei passenden Standardwelten | Ausgangslage |
| --- | --- |
| Schiff auf See | Unterwegs |
| Küste | Gerade angekommen |
| Wald | Eingeladen |
| Gebirge | Um Hilfe gebeten |
| Größere Siedlung | Zeuge eines Ereignisses |
| Abgelegene Gegend | Am Weiterkommen gehindert |
| Unterirdischer Ort | Verfolgt |
| Fluss oder See | Gefangen |

Die Zeilen sind **keine festen Paare**. Die Auswahl kombiniert die Achsen.
Bei Technik Raumfahrt werden die Orte stattdessen aus größerer Siedlung,
Raumfahrzeug und Raumhabitat gewählt. Das setzt weder Geister noch Piraten,
Drachen oder ein bestimmtes Ziel voraus. Ohne solche Technik gibt es keine
Raumhabitate im Ortsvorrat. Cozy zieht weder Gefangenschaft noch Verfolgung
oder die festgelegte Behinderung der Weiterreise; andere Ausgangslagen werden
mit dem gewählten Ton ausgestaltet. Es wird keine Begleitergruppe vorgegeben.
Auch mit verbreiteter Magie muss ein einzelner Einstieg nicht übernatürlich sein.

Geheimnisse und Hintergründe erzeugt die Spielleitung passend zur konkreten
Situation vor deren Ausspielen. Gefangen zu beginnen schreibt nicht Flucht als
Ziel vor; eine Bitte ist kein bereits angenommener Auftrag. Der Impuls wird
nicht für jede weitere Szene oder ein laufendes Abenteuer neu ausgewürfelt.

## Eigene Vorgaben und bestätigte Figuren

Ausdrückliche Welt-/Spielvorgaben, bestätigte Figuren und vereinbarte Grenzen
haben Vorrang. Erst danach kommt der Impuls. Eine unvereinbare Komponente wird
angepasst oder ausgelassen statt die Vorgaben umzuschreiben.

Der lokale Generator versteht Freitext nicht zuverlässig. Sobald eigene
Weltbeschreibungen, Wünsche, Gesellschafts-/Mythologieangaben, eine eigene Welt,
ein Vorbild/Kanon oder unbestimmte eigene Technik/Epoche/Kräfte vorliegen, wird
**kein konkreter Ort** ausgelost. Stattdessen entsteht nur eine abstrakte
unerwartete Entdeckung oder Veränderung der unmittelbaren Umstände, ausdrücklich
innerhalb der beschriebenen Welt. Das ist bewusst konservativ und kann weniger
Vielfalt liefern. Einzelne freie Sätze werden nicht per Schlagwort als verstanden
behandelt. Nicht ausgefüllte Weltanpassungen verwenden weiter die Vorlage.

Auch ein bestätigter Bogen kann freie Einschränkungen enthalten. Deren Bedeutung
prüft die Spielleitung; der Generator interpretiert oder überschreibt diese Texte
nicht. Der Impuls enthält deshalb eine ausdrückliche Anpassungs-/Auslassungsregel.
Die Auswahl selbst bleibt während der Bearbeitung des Bogens stabil.

## Kennung, Katalog und Kontext

`ogm1-` kennzeichnet Katalog 1; danach folgen acht kleine Hexadezimalzeichen.
Neue Kennungen werden mit dem Browser-Zufallsdienst erzeugt. Ein deterministischer
Generator kombiniert die Kennung mit dem aufgelösten Weltprofil, Ton,
Begleiteroption, Abenteuerumfang, Kampagnenstruktur und eigenen Wünschen.
Eine Kontextkennung steht neben dem Seed im Startpaket. Beide sind Metadaten,
keine Prophezeiung, Rätsel oder NSC-Wissen.

Gleiche Kennung, Katalogversion und dieselben maßgeblichen Vorgaben ergeben
dieselben Bausteine. Andere Würfelanzeigen, Figurenbearbeitung und Kopieren ändern
sie nicht. Eine andere Kennung kann trotzdem dasselbe Zweierpaar ergeben;
Zufall ist keine Garantie gegen Wiederholungen. Eine lokale Historie und das
Festhalten einzelner Achsen gehören nicht zur ersten Fassung. Die Kennung
verspricht weder dieselbe KI-Ausgabe noch eine reproduzierbare Kampagne.

## Talentbonus und NSC-Wissen

Der Talentbonus wird als feste +2 angezeigt. Unzulässige importierte Werte werden
weiterhin abgelehnt und nicht still repariert. Entwicklung und Talentmechanik
werden dadurch nicht geändert.

Das Plugin stellt klar: Die Kenntnis des Bogens gehört zur Spielleitung.
Ein Stab kann einen Magier vermuten lassen, aber nicht ohne weitere Anzeichen
seine Frostspezialisierung verraten. Figuren fragen nach möglicher Hilfe oder
reagieren auf tatsächlich gezeigte Kräfte und glaubwürdig erlangtes Wissen.
Eine frühere Vorführung wird nicht nachträglich erfunden, um eine Aussage zu retten.

## Validierung und Grenzen

Automatisierte Prüfungen kontrollieren ausgeschaltete Ausgabe, Kennung,
Reproduzierbarkeit, strukturierte Welt-/Tonfilter, konservativen Freitext,
Übergabe und unveränderte Bögen. Die Stichprobe erweitert nicht die bestehenden
Welt-/Spieloptionen um neue Kombinationsachsen im allgemeinen Prüflauf.
Bedienprüfungen kontrollieren Aktivierung, Bearbeiten, Kopieren, Aufdecken,
Neuauslosen, Profiländerungen, feste Talentanzeige und Zurücksetzen.

Drei unabhängige kurze Einstiege mit demselben Figurenbogen und verschiedenen
Zweierkombinationen lieferten verschiedene konkrete Situationen. Ein bekanntes
Motiv wie schwebende Inseln trat trotzdem auf. Die Probe beweist weder dauerhafte
Vielfalt noch die Qualität späterer Abenteuer und bewertet keinen normalen
ChatGPT-Host-Lauf als bestanden. Ein gebündelter menschlicher Test kann später
zeigen, ob die unterschiedlichen Anfänge spielerisch tragen.
