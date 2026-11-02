# Strukturierte Vorbereitung · Generator 0.19.0

Spielregeln und Plugin bleiben **0.18.0**. Dieses Paket verbessert Datenformate,
Bedienung und Übergaben; es ändert weder Kampf noch Fortschritt oder Erzählregeln.

## Vorbereitung

1. **Welt:** Vorlage und eigene Vorgaben festlegen. Optional über den Weltbutton
   ein KI-Template kopieren. Die Antwort muss genau ein JSON-Objekt sein.
   Datei oder Text importieren, die einzelnen Felder bearbeiten und übernehmen.
2. **Figur:** Das Charaktertemplate enthält die gültigen Weltangaben einschließlich
   des übernommenen Weltentwurfs. Bogen importieren/bearbeiten. Für eine Crew den
   Button **Bogen übernehmen** nutzen. Ohne Crew übernimmt **Weiter zur Ausgabe**
   einen gültigen Bogen weiterhin direkt.
3. **Crew, optional:** Erst nach Übernahme einer gültigen Figur für die aktuelle
   Welt wird das Crewtemplate freigegeben. JSON importieren, Personen bearbeiten,
   Zugehörigkeit, Aufenthalt und tatsächliche Anwesenheit prüfen und übernehmen.
   Bei Figurenerstellung im Spielchat gibt es vorher kein Crewtemplate.
4. **Ausgabe:** Der Generator erzeugt lesbare Welt- und Crewtexte aus den geprüften
   Feldern. JSON-Metadaten, Bild-Markdown und Entwurfsstatus werden nicht übernommen.
   Die Crew verändert weder Hauptbogen noch Gefährtenwahl.

KI-Templates laufen in einer KI nach Wahl; im Generator erfolgt kein KI-Aufruf.
Die Entwürfe können auch direkt in den Feldern angelegt werden. Weltentwurf und
weitere freie Weltvorgaben bleiben getrennt; erneute Übernahme ersetzt den Entwurf,
statt ihn erneut anzuhängen. Speichern über die jeweiligen JSON-Downloads und das
vollständige Startpaket; keine automatische Speicherung oder Chatsynchronisierung.

## Neue Datenformate

- `open-game-master-world`, Version 1: Name, Grundlage, Gesellschaft/Namensraum,
  Besonderheiten, aktuelle Lage, Mächte und Orte.
- `open-game-master-crew`, Version 1: Name, Zusammenhang, Stützpunkt/Ausgangslage;
  je Person Name, Spezies/Herkunft, Rolle, Persönlichkeit, Motiv, Beziehung, Grenzen,
  Zugehörigkeit, Aufenthalt und Anwesenheit zu Spielbeginn.

Beide verwenden `confirmed:false` für neue Entwürfe. Import bestätigt nichts
stillschweigend. Unbekannte Felder, falsche Typen und unpassende Versionen werden
abgewiesen, ebenso Bilder, Links, HTML und Markdown-Formatierung innerhalb der
Textfelder. Daten werden nicht still bereinigt oder verworfen. Ein fehlerhafter
Import lässt vorhandene Eingaben und die zuletzt übernommenen Daten bestehen.
Dateien sind auf 1 MB begrenzt. Beispiele liegen unter
`examples/world-draft.json` und `examples/crew-draft.json`.

Die Prüfung sichert Struktur und Textformat, nicht die semantische Vereinbarkeit
aller frei beschriebenen Tatsachen. Diese bleibt Teil der sichtbaren Prüfung.
Die Feldtexte sollen reine Fakten enthalten, keine zusätzlichen Spielregeln oder
Bearbeitungsanweisungen. Der bisherige freie Crewtext wird nicht weiter importiert.

## Änderungen und erneute Prüfung

Der Generator merkt sich, auf welcher Grundlage etwas übernommen wurde:

- Änderungen an Weltvorgaben/Ausschlüssen verlangen eine erneute Prüfung eines
  bereits übernommenen Weltentwurfs. Danach wird ein zuvor übernommener Bogen für
  diese geänderte Welt erneut geprüft und übernommen.
- Eine geänderte Welt, Figur oder Gefährtenwahl macht eine übernommene Crew erneut
  prüfpflichtig. Der Generator passt weder Biografien noch Beziehungen automatisch an.
- Entwürfe und Charakterdaten bleiben erhalten. Die Ausgabe bleibt gesperrt,
  bis die betroffenen Schritte erneut übernommen oder optionale Entwürfe entfernt
  sind. Eine vorhandene Crew kann auch bei gesperrter Erstellung angesehen oder
  entfernt werden. Das ermöglicht den Wechsel zur Figurenerstellung im Spielchat.
- Unabhängige Einstellungen wie Würfelanzeige oder Zusatzwürfel verlangen keine
  erneute Übernahme der Crew. Ohne optionale Entwürfe bleibt der bisherige Ablauf
  verfügbar.

Diese Zuordnung prüft Änderungen innerhalb der Vorbereitung, nicht das Gedächtnis
des späteren Spielchats. Es entsteht kein neues Kampagnengedächtnis.

## Prüfungen und Grenzen

Automatische Tests prüfen JSON-Formate, fehlerhafte Inhalte, vollständige Übergabe,
Vorlagen und Datenabhängigkeiten. DOM-Prüfungen kontrollieren Import, Bearbeitung,
Übernahme, Sperren, erneute Übernahme in Reihenfolge, Entfernung, Rücksetzen und
bestehende Generator-/Spieltab-Funktionen. Ein nicht erneut übernommener Entwurf
wird nicht als neue gültige Grundlage ausgegeben.

Die Inhalte der Templates bleiben kreativ angeleitet. Weder strukturiertes JSON
noch diese Prüfungen garantieren interessante neue Namen, Weltideen oder eine
gelungene Kampagne. Für diese Wirkung folgt die erneute Prüfung durch den Spieler.

Durchgeführt: 94/94 Node-Tests, Konfigurationsprüfung sowie Pluginprüfung/-bau;
drei DOM-Prüfungen für neuen Ablauf, bisherige Navigation und Spieltab. Die neuen
Abhängigkeitstests verwenden absichtliche Änderungen und fehlerhafte Importe,
nicht einen behaupteten Live-Spielverlauf. Eine visuelle Browserprüfung und ein
neuer KI-Durchlauf sind damit nicht abgedeckt.
