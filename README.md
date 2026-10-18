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
Charaktereditor und exportierbares Abenteuerprofil folgen separat.

## Zwei Ausgaben aus einer Auswahl

- **Projektprompt · unter 8.000 Zeichen:** enthält die bisherigen kompakten
  Regeln vollständig und benötigt kein Plugin. Den Text in die Projektanweisungen
  kopieren; die Figurenidee oder den bestätigten Bogen beim Start separat senden.
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
- `src/outputs.mjs`: Moduswahl, Pluginverweis und getrennte Startpaket-Texte.
- `src/generator.mjs`: Zusammenstellung, Reihenfolge, harte Längengrenze.
- `src/app.mjs`: Formular und Kopieren.
- `test/`: Vollständige Kombinationsprüfung plus Konfliktprüfungen.

```sh
npm test
npm run check
```

Die aktuelle Solo-Fassung enthält 221.184 Kombinationen. Die kompakten Prompts bleiben strikt unter 8.000 Zeichen,
einschließlich Überschriften und LF-Zeilenumbrüchen (konservative JavaScript-UTF-16-Zählung).
Es wird nie abgeschnitten. Bei einer zu langen oder ungültigen Konfiguration bleibt Kopieren gesperrt.
Die Garantie gilt für die geprüften Module; manuelles Ergänzen nach dem Kopieren fällt nicht darunter.

Keine Freitextfelder in dieser ersten Fassung: damit ist die maximale Länge vollständig prüfbar.
Spätere Freitexte brauchen ein festes, in allen Kombinationen reserviertes Budget.

Jede Gruppe liefert genau eine Variante. Standard/Hardcore, Ton und Würfelbedienung werden ersetzt,
nicht zusammen angehängt. Weltabhängige Ressourcen werden separat gewählt. Die Tests prüfen Länge,
Kernvollständigkeit und bekannte Konflikte; sie beweisen keine allgemeine erzählerische Widerspruchsfreiheit.
Neue Module brauchen zusätzlich redaktionelle Prüfung. Die Qualität der KI-Spielleitung ist nicht garantiert.

Bewusst noch nicht umgesetzt: regelfreies Spiel, freie Weltbeschreibung,
Charaktereditor, strukturiertes Abenteuerprofil, Konfigurationsimport und Spielstände.
Der Download im Plugin-Modus speichert ausschließlich die erzeugten Starttexte.
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
