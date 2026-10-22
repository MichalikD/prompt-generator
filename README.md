# Abenteuer · Prompt-Generator

Eine statische deutschsprachige Web-App: schrittweise Einstellungen wählen und entweder einen
kompakten Projektprompt oder ein Plugin-Startpaket ausgeben. Keine API, Anmeldung,
Speicherung oder Synchronisierung.
Die erste Fassung orientiert sich am vorhandenen W20-Regelwerk. Optionen sind redaktionelle Entwürfe.

## Plugin-Regelbasis 0.8.0

Unter `plugins/freie-spielleitung-02/` liegt eine eigenständige, allgemeine
Spielleitung mit vier ausführlichen Regelreferenzen. Sie verbessert Erzähltempo,
Rätsellogik, Kampftransparenz, Entwicklung und Zustandsführung. Mitgebrachte
Setting- und Figurenangaben erlauben unterschiedliche Durchgänge mit derselben
Pluginfassung. Eine eigene Modell-API ist nicht enthalten.

[Verwendung, Regeländerungen und Paketierung](docs/regelbasis-0.2.md)

Die aktuelle Regelbasis **0.8.0** trennt die Kontrolle über die eigene Figur von
Schonung durch die Welt. Gegner handeln aus Wissen, Temperament und Zielen,
einschließlich eigener Angriffe und unvereinbarer Absichten. Der gewählte Ton
prägt das Spiel; Standard und Hardcore unterscheiden den Umgang nach einem
Tod, nicht die grundsätzliche Gefahr. Fantasy soll auch in Folgehandlungen
konkrete Möglichkeiten, Wesen und Orte liefern.

Das Charaktertemplate verlangt wirksame Fähigkeiten auf dem gewünschten
Machtniveau, einschließlich passender Schadensmagie. Reichweite, Ziele/Fläche,
Kosten, Schaden und Umgebungsfolgen werden vor Bestätigung definiert. Macht,
Ruf und Entwicklung dürfen gewöhnliche Hindernisse tatsächlich leichter machen.
Bestätigte Figuren werden nicht automatisch verändert. Die Qualität späterer
Abenteuer ist weiterhin offen; technische Prüfung beweist keinen Spielspaß.
[Änderungen, Grenzen und Prüfumfang](docs/weltinitiative-0.8.md).

Die Moduswahl ändert die Ausgabe, nicht die gewählten Einstellungen. Die alte
private Vesper-Spielleitung bleibt für begonnene Durchgänge unverändert.
Das gemeinsame Abenteuerprofil ist im Generator enthalten; der Charaktereditor ist direkt in den Startablauf eingebunden.

## Zwei Ausgaben aus einer Auswahl

- **Projektprompt · eingefrorene Regelbasis 0.5:** wird nicht mehr inhaltlich
  weiterentwickelt und erhält die neuen Plugin-Regeln nicht. Enthält die bisherigen kompakten
  Regeln vollständig und benötigt kein Plugin. Den Text in die Projektanweisungen
  kopieren. Passt das vollständige Abenteuerprofil nicht mehr hinein, zeigt die App
  einen klar gekennzeichneten zweiten Text für die erste Chatnachricht an. Beide
  Teile vor dem Auftakt verwenden; bei vorbereitetem Bogen enthält die Startnachricht die bestätigte Figur automatisch.
- **Plugin-Startpaket (Standard):** liefert kurze Projektanweisungen und eine separate erste
  Chatnachricht mit allen gewählten Vorgaben. Die ausführlichen Regeln kommen aus
  dem Open Game Master. Im neuen Spielchat das Plugin ausdrücklich wählen.
  Beide Texte lassen sich einzeln kopieren oder zusammen als Markdown speichern.

Die 8.000-Zeichen-Grenze gilt für Projektanweisungen, nicht für die separate
Startnachricht. Die Ausgabe installiert kein Plugin. Einen Charakterbogen kannst
du direkt im Generator erstellen, importieren und exportieren. Die verlinkte Pluginfassung ist eine private Testinstallation;
der Link gewährt anderen Konten keinen Zugriff. Der öffentlich lesbare Quellcode
und die Paketierung liegen im Repository.

Das Zurücksetzen stellt die Einstellungen zurück, behält aber den aktuell
gewählten Ausgabemodus bei. Kopierfehler, etwa durch verweigerte Zwischenablage,
führen zur manuellen Textauswahl als Alternative.

## Lokal verwenden

Im Projektordner einen statischen Webserver starten, zum Beispiel mit installiertem Python:

```sh
python -m http.server 8080
```

Dann http://localhost:8080 öffnen. Direktes Öffnen über `file://` wird wegen ES-Modulen nicht unterstützt.
Zur Nutzung auf GitHub Pages ist keine lokale Installation nötig.

## GitHub Pages einrichten

1. Ein neues öffentliches Repository `prompt-generator` erstellen, diese Dateien auf `main` pushen.
2. Im Repository unter **Settings → Pages → Build and deployment → Source** die Option **GitHub Actions** wählen.
3. Unter **Actions** den Workflow „Prüfen und veröffentlichen“ starten oder einen neuen Commit pushen.
4. Nach erfolgreicher Veröffentlichung ist die App unter `https://BENUTZER.github.io/prompt-generator/` erreichbar.

Der Workflow prüft vor jeder Veröffentlichung alle Kombinationen. Scheitert eine Prüfung,
wird keine neue Version veröffentlicht. Ein erfolgreiches Deployment ersetzt die vorhandene Website.

## Textmodule und Längengarantie

- `src/modules.mjs`: Kernregeln und auswählbare Textvarianten.
- `src/profile.mjs`: gemeinsame Profildaten und eingefrorener kompakter Erzähltext.
- `src/plugin-profile.mjs`: ausgewählte Vorgaben für das Plugin, ohne allgemeinen Regelblock.
- `src/worlds.mjs`: Weltvorlagen, wirksame Anpassungen und Konfliktprüfung.
- `src/world-editor.mjs`: eingeklappte Weltanpassungen im ersten Vorbereitungsschritt.
- `src/outputs.mjs`: Moduswahl, Pluginverweis und getrennte Startpaket-Texte.
- `src/generator.mjs`: Zusammenstellung, Reihenfolge, harte Längengrenze.
- `src/app.mjs`: Formular und Kopieren.
- `src/character.mjs`: Figurenformat, Werteprüfung, Import, Export und KI-Template.
- `src/character-editor.mjs` und `src/character-view.mjs`: gemeinsam verwendeter Editor.
- `character.html` und `src/character-page.mjs`: eigenständig nutzbare Editor-Seite.
- `test/`: Vollständige Kombinationsprüfung plus Konfliktprüfungen.

```sh
npm test
npm run check
```

Die aktuelle Solo-Fassung enthält 1.658.880 Kombinationen der festen Auswahlschalter
und Zusatzwürfel. Freitexte und die elf zulässigen Schwerpunktkombinationen kommen
hinzu. Die Projektanweisungen bleiben strikt unter 8.000 Zeichen, einschließlich
Überschriften und LF-Zeilenumbrüchen (konservative JavaScript-UTF-16-Zählung).
Es wird nie abgeschnitten. Bei Platzmangel wird das gesamte Abenteuerprofil in die
erste Chatnachricht ausgelagert. Der Regelkern bleibt unverändert vollständig;
aktuell benötigen alle festen Kombinationen diesen zweiten Teil. Die Oberfläche
kennzeichnet beide Teile und der Markdown-Download enthält sie vollständig.
Ungültige Eingaben sperren Kopieren und Download. Manuelles Ergänzen nach dem
Kopieren wird nicht durch die Längenprüfung erfasst.

Jede Gruppe liefert genau eine Variante. Standard/Hardcore, Ton und Würfelbedienung werden ersetzt,
nicht zusammen angehängt. Kräfteregeln richten sich nach den wirksamen Weltangaben. Die Tests prüfen Länge,
Kernvollständigkeit und bekannte Konflikte; sie beweisen keine allgemeine erzählerische Widerspruchsfreiheit.
Neue Module brauchen zusätzlich redaktionelle Prüfung. Die Qualität der KI-Spielleitung ist nicht garantiert.

Bewusst noch nicht umgesetzt: regelfreies Spiel, Konfigurationsimport und
vollständige Kampagnenspielstände.
Der Download in beiden Modi speichert die erzeugten Starttexte; er ist kein Spielstand.
„Spielleitung würfelt“ behält das W20-System bei; es bedeutet nicht „ohne Proben“.

## Datenschutz

Alle App-Berechnungen laufen im Browser. Keine Cookies, localStorage, Telemetrie, externen Schriften,
APIs oder automatischen Übertragungen der Auswahl. GitHub verarbeitet als Hoster normale Seitenaufrufe.
Der erzeugte Prompt wird erst durch eigenes Einfügen an den gewählten Chatdienst übergeben.
Repository und ausgelieferte Textmodule sind öffentlich. Keine persönlichen Daten oder Schlüssel einchecken.

## Zusatzwürfel und Hilfen

Zusatzwürfel einzeln kombinieren. D% setzt D10 voraus. D4/D6/D8 variieren Schaden symmetrisch um ±1; der Mittelwert bleibt 2/3/4. D10 für Fundtabellen, D12 für Weltereignisse, D% für Prozentchancen. Attributproben bleiben W20. Hilfen beim Hover oder per Info-Symbol öffnen (auch Touch/Tastatur). Ein gemeinsames Overlay verhindert Layoutverschiebungen; Escape, Klick außerhalb oder Scrollen schließt es. Standardmäßig würfelt der Spieler für seine Figur. Keine Regel entfernt wegen eines deaktivierten Schadenswürfels: dann gilt der Grundschaden.

## Charaktererstellung

„Selbst festlegen“ ist der Standard. „Aus Kurzbeschreibung“ leitet bei neuen Figuren fehlende Angaben aus dem Konzept ab, unter denselben Attribut-, Talent- und Ressourcenregeln. Der Entwurf wird mit dem Spieler abgestimmt. Gilt für alle Settings; vorhandene Figuren und Spielstände werden nicht neu erzeugt. Ohne vorbereiteten Bogen wird die Beschreibung beim Spielstart im Chat eingegeben. Alternativ bereitet der eingebundene Editor einen Bogen beziehungsweise ein KI-Erstellungstemplate vor. Bei dieser Auswahl wird die unpassende Chat-Erstellungsoption ausgeblendet.

## Eine Spielerfigur

Die Auswahl „Spielergruppe“ und der separate Koop-Regelkern wurden entfernt.
Der Generator richtet sich vorerst an eine menschliche Person mit einer Figur.
Gefährten bleiben NSC und können weiterhin mitentwickelt werden.
Alte Konfigurationen mit einer Koop-Spielerzahl werden ausdrücklich abgewiesen,
statt stillschweigend als Solo-Spiel ausgegeben zu werden.


## Probenhäufigkeit, Erzähltempo und Spielstandexport

Probenhäufigkeit ist unabhängig von Atmosphäre, Schwierigkeit und Würfelbedienung:
- **Ausgewogen** (Standard): regelmäßige sinnvolle Proben auch außerhalb von Kämpfen.
- **Erzählorientiert**: nur bedeutende Unsicherheiten mit spürbaren Folgen auswürfeln.
- **Spielorientiert**: mehr Gelegenheiten für Risiken und Chancen, ohne Würfelquote, Routinewürfe oder künstliche Teilschritte.

Erzähltexte passen sich der Szene an, ohne starre Wortzahl. Schnelle Wechsel bleiben knapp;
wichtige Schauplätze und Wendepunkte dürfen ausführlicher werden. Spielerentscheidungen bleiben offen.
Spielstandexporte sind von der Erzähltextlänge ausgenommen: eigenständig, vollständig und bei Bedarf
in nummerierten Teilen. Fehlende oder unsichere Angaben werden markiert. Das erweitert weder das
Kontextfenster noch garantiert es die Wiederherstellung bereits vergessener Details.
Die Grenze von 8.000 Zeichen betrifft allein den erzeugten Projekt-Prompt.


## Abenteuerfokus und Figurenwissen

Alltag und Beziehungen bleiben möglich. Außerhalb von Cozy hält die Spielleitung das Ziel
und den nächsten möglichen Schritt präsent und greift sie nach Ruhephasen aktiv wieder auf.
Das erzwingt keine Spielerentscheidung und erzeugt keine künstliche Dringlichkeit.

Regelbegriffe und Zahlen wie Würfe, Fokuspunkte, LP und Boni bleiben in der Metaebene.
Figurendialoge, Gedanken und innerweltliche Dokumente verwenden keine Ressourcenstände.
Figuren dürfen nur wahrnehmbare Folgen wie Erschöpfung oder Verletzungen einschätzen.

## Gemeinsames Abenteuerprofil

Beide Ausgabemodi verwenden dieselben Daten aus `src/profile.mjs` (Profilversion 2).
Die Welt wird vor dem Chatstart festgelegt. „Eigene Welt“ erfordert eine kurze
Weltbeschreibung; alle anderen Vorlagen liefern bearbeitbare Vorgaben. Die Spielleitung ergänzt passende Details und klärt nur wesentliche
Lücken oder Widersprüche, statt die Einrichtung im Chat zu wiederholen.

- **Atmosphäre:** Abenteuerlich, Cozy, Düster oder Horror. Abenteuerlich beginnt
  nicht mehr mit der missverständlichen Vorgabe „Cozy bis abenteuerlich“.
- **Abenteuerumfang:** Kurz, mittel oder ausführlich; betrifft die Verflechtung
  des Konflikts, keine Minuten-, Wort- oder Szenenquote.
- **Verlauf:** Einzelabenteuer, zusammenhängende Kampagne mit Gesamtfinale oder
  offene Kampagne mit eigenständigen Abenteuern in derselben Welt.
- **Spielschwerpunkte:** optional bis zu zwei aus Entdeckung, Ermittlung und
  Rätsel, Beziehungen und Verhandlung sowie Action und Gefahr. Ohne Auswahl
  bleibt das Spiel situativ vielfältig.
- **Eigene Vorgaben und Ausschlüsse:** optionaler Freitext, getrennt von der Welt.

Beteiligung der Figur, Abwechslung, gültige Abschlüsse und organische Fortsetzungen
sind gemeinsame Erzählvorgaben. Das Profil legt keine Handlung oder Lösung vorab
fest. „Kurz + offene Kampagne“ ist ausdrücklich möglich. Nach einem Einzelabenteuer
beginnt eine Fortsetzung nur auf Wunsch. NSC handeln weiterhin eigenständig;
der Spieler muss die nächste Handlung nicht durch eine Auftragssuche erzwingen.

Weltbeschreibung, Schwerpunkte und eigene Vorgaben bleiben beim Moduswechsel
vollständig erhalten. „Zurücksetzen“ löscht auch diese Eingaben, erhält aber den
Ausgabemodus. Es gibt weiterhin keine Speicherung nach dem Neuladen; dafür die
Starttexte herunterladen. Der Bogen bleibt ein eigenständiges JSON-Dokument und wird direkt im Generator bearbeitet. Die Startnachricht enthält Profil und bestätigten Bogen gemeinsam. Alte Spielformen
(`campaign`, `chapters`, `short`) werden nicht automatisch in zwei neue Achsen
umgedeutet; es gibt bisher keinen Konfigurationsimport.

## Charakterbogen-Editor

„Bogen hier vorbereiten oder importieren“ öffnet den Editor direkt im Generator
und funktioniert für beide Ausgabemodi. Die Weltvorgaben werden automatisch
übernommen. Die separate Seite `character.html` bleibt eigenständig nutzbar. Vier Attribute bleiben bestehen. Der Editor umfasst Identität,
Talente, konkrete Fähigkeiten, situative Schwächen, LP/Ressourcen, Ausrüstung,
Bedürfnisse, bestätigten/offenen/ausgeschlossenen Hintergrund und Entwicklung.
Nach Prüfung lässt sich der Bogen ausdrücklich bestätigen; Änderungen heben die
Bestätigung auf. JSON dient der späteren Bearbeitung, Text dem Spielstart. Beim
Weiterführen eines bestätigten Startbogens bleibt das Original separat erhalten.

Das kostenlose Prompt-Template kann in beliebigen KI-Chats aus einer
Kurzbeschreibung einen importierbaren Entwurf erzeugen. Es ruft keine KI auf.
Alte API-Formate werden nicht unterstützt; während der Prototypenphase gibt es keine Kompatibilitätsgarantie. Der Editor speichert nicht
automatisch: Vor Neuladen oder Schließen JSON herunterladen.

[Bedienung, Format und Grenzen](docs/charakterbogen.md)

## Frühere Überarbeitung nach dem Mason-Test (Regelsatz 0.2.1)

Die frühere Fassung 0.2.1 ergänzte die private Freie Spielleitung 0.2 um
aktiver Beteiligung der Spielerfigur, geraffter Routine und eigenständigen
Abenteuern innerhalb einer Kampagne. Der Umfang gilt je Abenteuer. Frühe gute
Lösungen bleiben gültig; es werden keine zusätzlichen Pflichtszenen angehängt.
Bilder erscheinen nur auf ausdrücklichen Wunsch. Das Erstellungstemplate trennt
unbekannte Biografie von tatsächlichen Spielerausschlüssen und fordert konkrete,
beobachtbare Schwächenauslöser statt erfundener Gefühle oder Ressourcenregeln.
Das sind Anweisungen an das Modell, keine garantierte Erzählqualität.

Bei vorbereitetem Bogen ist die gemeinsame Startnachricht erst nach formaler
Prüfung und ausdrücklicher Bestätigung kopierbar. Änderungen an den übergebenen
Weltvorgaben oder Ausschlüssen heben diese Bestätigung auf, erhalten aber alle
Bogenwerte. Umfang und Ton ändern den Bogen nicht. Beide Ausgabemodi verwenden
dieselbe Figur. Ein Quellenwechsel zur Erstellung im Chat entfernt sie nur aus
der Ausgabe, nicht aus dem Editor. „Profil zurücksetzen“ setzt die
Abenteuerauswahl zurück; der Bogen bleibt erhalten und muss bei geänderter Welt
neu bestätigt werden. Keine automatische Speicherung nach Neuladen.

[Prioritäten und bewusst zurückgestellte Punkte](docs/roadmap.md)


## Überarbeitung 0.3.0 nach den Rika-Durchläufen

Die internen Spielleitungsanweisungen, ausgewählten Regeln und das KI-Template
sind auf Englisch formuliert. Spielsprache und Oberfläche bleiben Deutsch;
Attributnamen, LP und SG bleiben erhalten. Englisch ist eine redaktionelle
Entscheidung, kein Nachweis besserer Modellleistung.

Fehlschläge haben konkrete Folgen. Derselbe Ansatz darf erneut versucht werden,
wenn die Lage es erlaubt; Zeit, Kosten und Gefahr laufen weiter. Vorbereitung
muss eine benannte Wirkung haben. Talente beschreiben brauchbare Bereiche statt
einzelner Handgriffe. Entwicklung darf neue Richtungen und vereinbarte
Umschulung eröffnen. Abenteuer sollen Interessen, Beziehungen, Entscheidungen und
passende unterschiedliche Herausforderungen entwickeln, einschließlich Kämpfen.
Die bisherigen Zahlenregeln, Kommandos und Exporte bleiben erhalten.

## Einstieg und Sprachtrennung 0.3.1

Das Plugin heißt **Open Game Master**; Regelsatz **0.3.1** wird separat angezeigt.
Die Oberfläche erklärt zwei Schritte: Projektanweisungen und eine gemeinsame
erste Chatnachricht. Der bestätigte Bogen steht genau einmal in dieser Nachricht.
Der eingebundene Editor klappt seine zusätzliche Vorschau ein und bietet dort
keine zweite Kopieraktion für denselben Spielstart an. Der separate Editor
behält Kopieren und Exportieren.

Alle vorgegebenen Anweisungen, Überschriften, Regelbegriffe und Referenztexte
sind Englisch. `src/language.mjs` legt zentral `language = German` für erzeugte
Spielstarts und Charaktertemplates fest. Die Sprache steuert Erzählung, Dialoge,
sichtbare Regelbegriffe und Kommandos. Eigene Texte/Namen werden nicht übersetzt.
Die deutsche Oberfläche und ihre Hilfen sind davon getrennt. Eine Sprachauswahl
in der Oberfläche ist noch nicht vorhanden.

Die damalige Umstellung führte Figurenformat Version **2** ein, mit englischen
Attributschlüsseln `strength`, `dexterity`, `intellect`, `insight` und Format-ID
`open-game-master-character`. Alte Testbögen werden nicht importiert; bei einem
neuen Test einen neuen Bogen erzeugen. Numerische Regeln bleiben unverändert.
Das vorhandene Vesper-Beispiel ist eine aktualisierte Testdatei, kein Altimport.

[Rückkehr zum Stand vor 0.3.0](docs/rollback-0.3.md).


## Geführter Generator und Bogenformat 3

Beide Ausgabemodi führen jetzt durch vier Vorbereitungsschritte:
**Welt → Spielvorgaben → Figur → Prüfung und Ausgabe**. „Weiter“ prüft den
aktuellen Schritt; „Zurück“ erhält die Eingaben. Starttexte und Kopieraktionen
werden erst am Ende freigegeben. Fehlende Angaben erscheinen als konkrete
Hinweise, nicht als scheinbar laufender Ladevorgang. Ein bestätigter Bogen ist
genau einmal in der Startnachricht enthalten. Die abschließende Übersicht
zeigt auch Startgeld und macht nicht festgelegte Mittel sichtbar.

Format **3** trennt Geld (`finances`), Fähigkeitsressourcen (`vitals.resources`)
und optionale besondere Bedürfnisse (`needs`). Geld hat Währung/Betrag sowie
optionale Kaufkraft- und Vermögensangaben; keinen künstlichen Maximalwert oder
Regeneration. Bedürfnisse bleiben auf Wunsch rein beschreibend. Das kostenlose
KI-Template fordert passende Startmittel und konkretisiert die bestehenden
Ausrüstungs- und Schwächeregeln.

**Unverändert bleiben Plugin-Regelsatz 0.3.1, Erzählvorgaben, Probenhäufigkeit und
Antwortlänge.** Es wird kein Pluginupdate benötigt. Für den nächsten Vergleich
neuen Bogen mit dem aktuellen Template erstellen; der Prototyp übernimmt keine
alten Bogenformate. Nara kann unabhängig davon im bestehenden Chat weiterlaufen.

Prüfungen des geführten Ablaufs liegen in `test/setup.test.mjs`, des neuen
Bogens in `test/finances-and-needs.test.mjs`. Die Website bleibt ohne
Laufzeitabhängigkeiten, API, Anmeldung oder automatische Speicherung.


## Abenteuerfortsetzung und Abschlüsse 0.4.0

Nach dem Jaro-Test wurden beide Ausgaben und das bestehende Plugin gemeinsam
überarbeitet. In laufenden Kampagnen führt eine angeforderte Alltagsraffung bis
zur nächsten spielbaren Situation mit nachvollziehbarer Beteiligung und einer
bedeutsamen Entscheidung. Ausdrücklich gewünschte Alltagsszenen, Ablehnung,
Pause und das Ende eines Einzelabenteuers bleiben erhalten.

Schwerpunkte bestimmen die Art der Herausforderungen, nicht deren Wegfall.
Eine kooperative Figur oder ein sozialer Schwerpunkt überschreibt den gewählten
Gefahrenton nicht. Wirkliche Lösungen bleiben gültig; die Spielleitung soll
keinen Konflikt gegen eine erfolgreiche Lösung erzwingen.

Abschlüsse richten sich nach erreichten, gescheiterten oder aufgegebenen Zielen.
Offene Hintergrundfragen oder Arbeit anderer Figuren verschieben sie nicht
unbegrenzt. Vereinbarte Bezahlung, Kontakte und dauerhafte Entwicklung werden
unterschieden. Entwicklung wird bei einem substanziellen Abschluss angeboten,
nicht nach jeder Routineaufgabe. Die Meilensteinregeln werden im Plugin schon
bei der ersten bedeutsamen Auflösung geladen, auch ohne Kapitelüberschrift.

Das Charaktertemplate hält Entwurfs- und Bestätigungsanweisungen aus den
bestätigten fiktionalen Hintergrundfakten heraus. Vorhandener Freitext wird
nicht automatisch umgeschrieben. Bogenformat 3, Zahlenregeln, Würfelbedienung,
Probenhäufigkeit und Antwortlängenvorgabe bleiben erhalten.

[Prüfsituationen und Grenzen der Verifikation](docs/fortsetzung-0.4.md).


## Weltvorlagen und fokussierte Kurzabenteuer 0.5.0

Zehn Weltvorlagen mit zunächst eingeklappten Anpassungen ersetzen die bisherige
Viererauswahl. Grundlage (eigenständig, inspiriert, bekanntes Universum), Epoche,
Technik, Kräfte, Gesellschaft und Mythologie ergeben ein gemeinsames Weltprofil
für beide Ausgaben und den Charakterbogen. Bewusste Mischungen sind möglich;
erkennbare Konflikte erfordern Bestätigung. Widersprüche zwischen ausdrücklichen
Angaben müssen aufgelöst werden. Freitext wird nicht vollständig semantisch geprüft.
Eigene Änderungen bleiben beim Vorlagenwechsel erhalten, bis sie zurückgesetzt werden.

Kurze Abenteuer lösen ein zentrales Ziel auf, bevor Folgeaufgaben beginnen.
Gegenspieler, Ziele und Lösungen sollen sich stärker unterscheiden; soziale
Lösungen bleiben gültig, andere Vorgehensweisen müssen für die Figur tragfähig sein.
Die Fassung baut auf den Abschlüssen und Übergängen aus 0.4.0 auf.

[Bedienung, Annahmen, Prüfumfang und Rückkehrpunkt](docs/welten-und-kurzabenteuer-0.5.md).
