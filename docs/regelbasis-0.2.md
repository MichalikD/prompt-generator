# Freie Spielleitung 0.2

Diese eigenständige Plugin-Testfassung entwickelt das Vesper-Regelwerk weiter.
Sie enthält Anweisungen und vier Referenzen, keinen Spielserver und keine eigene
Modellanbindung. Der vorhandene Generator mit seiner 8.000-Zeichen-Grenze wird
durch diese Regelbasis nicht geändert. Seine Texte sind weiterhin die bisherige
kompakte Fassung. Inzwischen steht daneben ein Plugin-Ausgabemodus zur Verfügung;
beide Ausgaben verwenden dieselben gewählten Einstellungen.

## Verwendung

Die private ChatGPT-Testinstallation ist [Freie Spielleitung 0.2](https://chatgpt.com/plugins/plugins_6ad5185c00f481918c6b29c904cfab37).
Dieser Link gewährt anderen Konten keinen Zugriff; eine öffentliche
Pluginveröffentlichung ist noch nicht erfolgt. Die bearbeitbare Quelle
liegt in `plugins/freie-spielleitung-02/`. Der Paketname ist
`freie-spielleitung-02`, der enthaltene Skill heißt `freie-spielleitung`.

1. Ein neues ChatGPT-Projekt für den Durchgang erstellen.
2. Das Plugin **Freie Spielleitung 0.2** installieren und im ersten Spielchat
   ausdrücklich auswählen. Nicht gleichzeitig die alte Vesper-Spielleitung wählen.
3. Setting, Ton und Umfang nennen. Einen bestätigten Bogen mitgeben oder die
   gewünschte Figur kurz beschreiben und den daraus erstellten Entwurf bestätigen.
4. Im selben Chat normal weiterspielen. Bei einem neuen Chat einen Spielstand
   mitgeben, wenn es derselbe Durchgang sein soll.

Kurze Projektanweisungen:

```text
Dieses Projekt enthält einen Textrollenspiel-Durchgang mit dem ausdrücklich
ausgewählten Plugin „Freie Spielleitung 0.2“, Regelsatz 0.3.0.
Verwende dessen Anweisungen und Regelreferenzen sowie meine bestätigten
Setting- und Spielvorgaben. Ich steuere meine Figur, du die Welt und Folgen.
Bewahre den bestätigten Bogen und etablierte Fakten. Übernimm keine andere
Regelfassung ohne meine ausdrückliche Anweisung. Behaupte keine nicht
verfügbare Erinnerung, gelesene Datei oder Speicherung.
```

Eine passende erste Nachricht ist etwa:

```text
Neuer Durchgang. Setting: [gewünschte Welt und ihre Grenzen].
Ton: [gewünschte Atmosphäre]. Umfang: [Kurzabenteuer oder Kampagne].
Ich würfle für meine Figur; zeige die Rechnungen offen. Schaden bleibt fest.
Meine Figurenidee beziehungsweise mein bestätigter Bogen: [hier einsetzen].
Lade zuerst die Spielleitungsanweisung und „Abenteuer und Welt“.
Bestätige deren tatsächlichen Zugriff kurz auf der Metaebene.
Übernimm einen bestätigten Bogen unverändert; stimme einen neuen Entwurf ab.
Beginne anschließend das Abenteuer.
```

Diese Vorlagen lassen sich auch manuell nutzen. Der Plugin-Modus des Generators
erzeugt entsprechende Projektanweisungen und eine Startnachricht aus der Auswahl.
Fehlende Angaben werden bei Bedarf geklärt. Die neue Spielleitung ist nicht auf
Fantasy, einen bestimmten Charakter oder eine vorgefertigte Welt festgelegt.
Der bisherige kompakte Projektprompt sollte nicht zusätzlich vollständig in
dasselbe Projekt kopiert werden: Er ist eine eigenständige kompakte Ausgabe derselben Grundsätze; doppeltes Einfügen erzeugt unnötige Wiederholungen.

## Überarbeitete Verhaltensregeln

- **Erzählung:** Dialoge konzentrieren sich auf neue Reaktionen und Erkenntnisse.
  Untersuchungen grenzen Fragen ein; ein Finale bekommt keine weiteren
  Bedingungen allein zur Verlängerung. Interessante Reiseabschnitte dürfen Raum
  erhalten. Es gibt weder Wortquoten noch vorgeschriebene Szenenzahlen.
- **Rätsel:** Ursachen, Eingaben, Reaktionen und Abschlussbedingungen werden
  vor ihrer Verwendung festgelegt. Zugängliche Hinweise ermöglichen begründete
  Versuche. Alternative Lösungen werden gegen diese Funktion geprüft.
- **Vergangenheit:** Ausdrücklich offene Biografie darf persönlich ausgestaltet
  werden. Bestätigte Angaben und heutige Spielerentscheidungen bleiben gewahrt.
  Eine Enthüllung erzeugt keine erzwungene emotionale Bindung.
- **Figuren:** Eigenständige NSC benötigen für gewöhnliche Hilfe nicht ständig
  eine Erlaubnis. Wissenszugänge und erklärte Grenzen bleiben nachvollziehbar.
  Eine Verständnisfrage wird nicht automatisch als Fehlerkorrektur ausgelegt.
- **Kontinuität:** Relevante Verluste, Verletzungen, Ortsverbindungen, Zähler
  und Erkenntnisse werden weiter berücksichtigt. Das sind Arbeitsanweisungen
  für den zugänglichen Chat, kein automatisch gespeichertes Kampagnengedächtnis.
- **Entwicklung:** Belohnungen werden vor dem nächsten Kapitel geprüft und vor
  der Auswahl konkret beschrieben. Geschenke und Kapitelbelohnungen werden
  eindeutig zugeordnet, damit ein Abschluss nicht doppelt oder gar nicht zählt.

## Zahlenregeln und bewusste Klärungen

Attribute, Startbudget, LP, Tragplätze, Talentboni, SG-Stufen und die Formel der
Schadensvariation bleiben erhalten. Die folgende Tabelle kennzeichnet die
inhaltlichen Ergänzungen gegenüber der Vesper-Testfassung 0.1.0:

| Bereich | Festlegung in 0.2.0 |
| --- | --- |
| Initiative | Lage entscheidet; andernfalls W20 + Geschick, höher zuerst, Gleichstände unter Betroffenen neu würfeln. Dies schließt eine offene Regelstelle. |
| Schaden ohne Auswahl | Feste Grundwerte. Optionale Schadenswürfel gelten nur nach Auswahl, für beide Seiten. |
| Unterstützung | Konkrete Hilfe kann Vorteil mit 2W20 geben. Kein zusätzlicher pauschaler Situationsbonus. Festgelegte Ausrüstungseffekte bleiben möglich. |
| Kampf | Gegnerwerte werden vor ihrer Verwendung festgelegt und auf der Metaebene gezeigt. Angriffe, Schaden und verbleibende LP werden abgewickelt. Ein Fehlschlag erzeugt keinen kostenlosen Gegenangriff. |
| Zwei Waffen | Keine automatische zusätzliche Aktion; Nutzen durch Talent, Ausrüstung und ausdrücklich definierte Manöver. |
| Tod | Lageabhängig möglich, auch bei wichtigen NSC. Keine automatische Todesfolge einer natürlichen 1, keine Rettung allein wegen Sympathie. |
| Versorgung | Standardmäßig abstrakt und plausibel. Exakte Verwaltung nur nach vereinbarter Dauer, Einheit und Folgen; keine rückwirkenden Mangelstrafen. |
| Setting | Keine fest eingebaute Fantasywelt. Mitgebrachte Vorgaben gelten für Technik, Magie und besondere Fähigkeiten. |

## Quellen und Paketierung

Das Repository ist die bearbeitbare Quelle dieser Pluginfassung:

- `skills/freie-spielleitung/SKILL.md`: Kern, Start und Referenznavigation.
- `references/abenteuer-und-welt.md`: Welt, Verlauf, Rätsel und Figurenwissen.
- `references/figur-und-inventar.md`: Figuren, Kräfte und Gegenstände.
- `references/proben-und-kampf.md`: Proben, Würfel und Kampf.
- `references/entwicklung-und-spielstand.md`: Meilensteine, Zustand und Export.

Die Pfade der Referenzen sind relativ zum Skillordner. Die Dateien lassen sich
in einem gewöhnlichen Texteditor ändern. Für die Paketierung werden Python 3.9+
und für die Repositorytests Node.js 22 verwendet, keine API-Schlüssel oder
zusätzlichen Python-Pakete.

```sh
npm test
npm run check
npm run plugin:check
npm run plugin:build
```

Das ZIP entsteht unter `dist/freie-spielleitung-02-0.3.0.zip`. Es enthält nur
Manifest, Skill und Referenzen. Es kann über Plugin Creator als privates Plugin
gespeichert werden. Ein Git-Commit oder Pages-Deployment aktualisiert ein
ChatGPT-Plugin nicht automatisch. Die Paketprüfung kontrolliert Struktur und
Verweise; sie beweist keine Erzählqualität oder zuverlässige Modellbefolgung.
Auf Pull Requests stellt GitHub Actions das geprüfte ZIP als Workflow-Artefakt
bereit. Die statische Website bleibt ein separates Deployment.

## Versionen und nächste Schritte

Die bestehende **Vesper Spielleitung 0.1.0** bleibt unverändert für laufende
Durchgänge. Die **Freie Spielleitung 0.2** ist eine eigene private Installation.
Ein anderes Setting benötigt keine weitere Plugininstanz. Verwendete Fassung
und individuelle Abweichungen gehören in jeden Spielstand.

Die private Freie Spielleitung wird während des Prototyps unter derselben
Paketidentität aktualisiert. Aktuell ist Regelsatz 0.3.0. Ein Versionsfeld im
Projekt ist keine technische Sperre gegen geänderte Pluginanweisungen. Für einen
neuen Test einen neuen Chat und frisch erzeugte Starttexte verwenden. Alte
Spielstände oder Eingabeformate müssen im Prototyp nicht kompatibel bleiben.
Die alte Vesper-Spielleitung wird durch diese Aktualisierung nicht geändert.

Beide Generator-Ausgabemodi, das gemeinsame Abenteuerprofil und der eingebundene
Charaktereditor sind vorhanden. Der Editor bietet ein abgestimmtes Figurenformat,
JSON-Import/-Export und eine frei nutzbare Charakteranfrage zum Kopieren in
beliebige KI-Chats. Eine optionale eigene API-Anbindung ist weiterhin nicht gebaut.
[Charakterbogen verwenden](charakterbogen.md).

## 0.2.1: Erzählführung nach dem Mason-Test

- Spielbare Beteiligung aus bekannten Fähigkeiten und der aktuellen Lage ableiten;
  unbekannte Vergangenheit ist kein Hindernis für den Auftakt.
- Spielerfreiheit durch echte Angebote und Entscheidungen wahren, statt die
  Figur wiederholt nur zu informieren, untersuchen oder nach Hause zu schicken.
- Vereinbarte gefahrlose Routinen bis zu Befund oder echter Entscheidung raffen.
- Eigenständige Abenteuer vom Kampagnenhintergrund unterscheiden; mittlerer Umfang
  braucht Konfliktentwicklung, keine künstlichen Zusatzschritte.
- Keine Bilder oder Bildwerkzeuge ohne ausdrücklichen Wunsch.
- Bei neuen Figuren offene Biografie nicht in erfundene Verbote verwandeln;
  Schwächen mit beobachtbaren Auslösern und verständlichen Folgen formulieren.

Die Wirkung auf die Erzählqualität muss in einem neuen Durchlauf geprüft werden;
Paket- und Quellprüfungen ersetzen diesen Test nicht.


## 0.3.0: Vereinfachte Regelbasis

Die ausführlichen Referenzen wurden als englische interne Anleitung neu
formuliert und gekürzt. Die Spielausgabe bleibt ausdrücklich Deutsch. Beide
Generatorausgaben und das Charaktertemplate wurden gleichzeitig angeglichen.
Die Erweiterungen betreffen Folgen, Wiederholungsversuche, Vorbereitung,
brauchbare Talente und Entwicklung sowie abwechslungsreichere Konflikte.
Es wurde kein neues Würfel-, Level- oder Verletzungssystem eingeführt.

Gleiche Methode ist bei laufendem Spiel erlaubt, solange Zeit, Lage und
Konsequenzen weitere Versuche zulassen. Die Beibehaltung identischer Würfe gilt
weiterhin beim Zurückspulen nach Tod; sie verbietet keine neuen Live-Versuche.
Eine getragene Sicherheitsmaßnahme wird nicht nachträglich unwirksam, nur um
einen Fehlschlag zu erklären. Eine endende Gelegenheit kann endgültig scheitern.

[Quellstand, Pluginfassung und Rückkehr](rollback-0.3.md).
