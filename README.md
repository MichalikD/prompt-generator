# Abenteuer · Prompt-Generator

Eine statische deutschsprachige Web-App: Einstellungen wählen und entweder einen
kompakten Projektprompt oder ein Plugin-Startpaket ausgeben. Keine API, Anmeldung,
Speicherung oder Synchronisierung.
Die erste Fassung orientiert sich am vorhandenen W20-Regelwerk. Optionen sind redaktionelle Entwürfe.

## Neue Plugin-Regelbasis 0.2

Unter `plugins/freie-spielleitung-02/` liegt eine eigenständige, allgemeine
Spielleitung mit vier ausführlichen Regelreferenzen. Sie verbessert Erzähltempo,
Rätsellogik, Kampftransparenz, Entwicklung und Zustandsführung. Mitgebrachte
Setting- und Figurenangaben erlauben unterschiedliche Durchgänge mit derselben
Pluginfassung. Eine eigene Modell-API ist nicht enthalten.

[Verwendung, Regeländerungen und Paketierung](docs/regelbasis-0.2.md)

Die Moduswahl ändert die Ausgabe, nicht die gewählten Einstellungen. Die alte
private Vesper-Spielleitung bleibt für begonnene Durchgänge unverändert.
Das gemeinsame Abenteuerprofil ist im Generator enthalten; der Charaktereditor folgt separat.

## Zwei Ausgaben aus einer Auswahl

- **Projektprompt · unter 8.000 Zeichen:** enthält die bisherigen kompakten
  Regeln vollständig und benötigt kein Plugin. Den Text in die Projektanweisungen
  kopieren. Passt das vollständige Abenteuerprofil nicht mehr hinein, zeigt die App
  einen klar gekennzeichneten zweiten Text für die erste Chatnachricht an. Beide
  Teile vor dem Auftakt verwenden; die Figurenidee oder den bestätigten Bogen separat senden.
- **Plugin-Startpaket:** liefert kurze Projektanweisungen und eine separate erste
  Chatnachricht mit allen gewählten Vorgaben. Die ausführlichen Regeln kommen aus
  der Freien Spielleitung 0.2. Im neuen Spielchat das Plugin ausdrücklich wählen.
  Beide Texte lassen sich einzeln kopieren oder zusammen als Markdown speichern.

Die 8.000-Zeichen-Grenze gilt für Projektanweisungen, nicht für die separate
Startnachricht. Die Ausgabe installiert kein Plugin und erzeugt noch keinen
Charakterbogen. Die verlinkte Pluginfassung ist eine private Testinstallation;
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
- `src/profile.mjs`: gemeinsames Abenteuerprofil, Weltbeschreibung, Schwerpunkte und Erzählvorgaben.
- `src/outputs.mjs`: Moduswahl, Pluginverweis und getrennte Startpaket-Texte.
- `src/generator.mjs`: Zusammenstellung, Reihenfolge, harte Längengrenze.
- `src/app.mjs`: Formular und Kopieren.
- `test/`: Vollständige Kombinationsprüfung plus Konfliktprüfungen.

```sh
npm test
npm run check
```

Die aktuelle Solo-Fassung enthält 663.552 Kombinationen der festen Auswahlschalter
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
nicht zusammen angehängt. Weltabhängige Ressourcen werden separat gewählt. Die Tests prüfen Länge,
Kernvollständigkeit und bekannte Konflikte; sie beweisen keine allgemeine erzählerische Widerspruchsfreiheit.
Neue Module brauchen zusätzlich redaktionelle Prüfung. Die Qualität der KI-Spielleitung ist nicht garantiert.

Bewusst noch nicht umgesetzt: regelfreies Spiel, Charaktereditor,
Konfigurationsimport und Spielstände.
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

„Selbst festlegen“ ist der Standard. „Aus Kurzbeschreibung“ leitet bei neuen Figuren fehlende Angaben aus dem Konzept ab, unter denselben Attribut-, Talent- und Ressourcenregeln. Der Entwurf wird mit dem Spieler abgestimmt. Gilt für alle Settings; vorhandene Figuren und Spielstände werden nicht neu erzeugt. Die Beschreibung wird beim Spielstart im Chat eingegeben, nicht im Generator.

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

Beide Ausgabemodi verwenden dieselben Daten aus `src/profile.mjs` (Profilversion 1).
Die Welt wird vor dem Chatstart festgelegt. „Eigene Welt“ erfordert eine kurze
Weltbeschreibung; bei Fantasy, Cyberpunk und Gegenwart ist sie eine optionale
Ergänzung. Die Spielleitung ergänzt passende Details und klärt nur wesentliche
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
Starttexte herunterladen. Der Charakterbogen bleibt separat. Alte Spielformen
(`campaign`, `chapters`, `short`) werden nicht automatisch in zwei neue Achsen
umgedeutet; es gibt bisher keinen Konfigurationsimport.
