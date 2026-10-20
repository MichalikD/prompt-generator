# Abenteuerfortsetzung · 0.4.0

## Anlass und Umfang

Nara und Jaros Auftakt zeigen brauchbare Figuren, sinnvolle Proben und gute
Beziehungen. Jaro verliert danach seinen Abenteuerfokus: Zeit verstreicht,
Einladungen wiederholen sich, und eine weitere Lieferung bietet nur harmlose
Zwischenfälle. Ein technisches Rätsel ohne passenden Beteiligungsgrund ist kein
ausreichender nächster Handlungsanlass.

0.4.0 präzisiert diese drei zusammenhängenden Aufgaben der Spielleitung:

- Eine laufende Kampagne nach Ruhe und Abschluss mit einer spielbaren Situation
  fortsetzen; Spieler müssen nicht selbst eine neue Aufgabe konstruieren.
- Passende Konflikte und Herausforderungen trotz freundlicher Spielweise oder
  sozialem Schwerpunkt erhalten. Lösungen, Ablehnung und Rückzug gelten weiter.
- Erreichte Ziele erkennen, Bezahlung abwickeln und verdiente Entwicklung anbieten,
  ohne auf Kapitelüberschriften oder die Auflösung aller Hintergrundfragen zu warten.

Beide Generatorausgaben verwenden dasselbe Abenteuerprofil. Der kompakte Modus
enthält die Kernregeln weiterhin vollständig; ein zu langes Profil steht ohne
Kürzung in der ersten Chatnachricht. Das ausführliche Plugin beschreibt dieselben
Leitlinien mit mehr Raum. Keine neue Spielmechanik, Würfelquote oder Pflichteskalation.

## Prüfsituationen für die redaktionelle Prüfung

Dies sind Abnahmekriterien, keine festgelegten Plots oder vorgeschriebenen Antworten.

| Situation | Erwartete Eigenschaft | Zu vermeiden |
| --- | --- | --- |
| Offene Kampagne, ein Konflikt ist beendet; Spieler lässt Routine weiterlaufen | Zeit bis zu einem passenden Anlass mit Einsatz, eigener Beteiligung und offener Entscheidung raffen | Wieder nur freier Nachmittag, gewöhnliche Lieferung oder dieselbe Einladung |
| Spieler möchte eine Feier oder Freundschaft bewusst ausspielen | Die gewählte Szene darf ohne Katastrophe stattfinden; erst danach angeforderte Übergänge fortsetzen | Jede Beziehungsszene zum Abenteuerauftrag machen |
| Sozialer Schwerpunkt, abenteuerlicher Ton, freundliche Figur | Interessengegensätze, glaubhafte Grenzen und passende Risiken; erfolgreiche Verhandlung kann lösen | Automatischer Wechsel zu Cozy oder künstliches Scheitern guter Argumente |
| Unpassendes Angebot wird abgelehnt | Ablehnung respektieren, Welt glaubhaft weiterentwickeln und bei fortbestehendem Abenteuerwunsch andere Möglichkeiten eröffnen | Derselbe Auftrag unter neuem Namen, Strafe für Ablehnung oder Übernahme einer Spielerentscheidung |
| Eine lokale Rettung ist abgeschlossen; Behörden untersuchen die Ursache weiter | Lokalen Abschluss und Folgen würdigen; passende Entwicklung vor dem nächsten Abenteuer anbieten | Auflösung sämtlicher Geheimnisse zur Belohnungsvoraussetzung machen |
| Eine Routinezustellung bringt vereinbarte Bezahlung | Bezahlung korrekt abwickeln, ohne automatische Attributsteigerung für jede Lieferung | Fehlende Bezahlung mit einer Verbesserung ersetzen oder verdiente Entwicklung mit Honorar verrechnen |
| Einzelabenteuer endet, oder Spieler pausiert bzw. wünscht ausdrücklich Alltag | Gewünschtes Ende, Pause oder Alltag respektieren | Automatisch den nächsten Auftrag eröffnen |
| Charakter wird mit dem KI-Template erstellt | Bestätigte Hintergrundfelder enthalten nur fiktionale Fakten; Entwurfsstatus steht im Bestätigungsfeld | Einen dauerhaft widersprüchlichen Bestätigungsvorbehalt in den Bogen schreiben |

Automatisierte Prüfungen sichern Auswahl, Erhalt der Regeln/Profile, Zeichenlimit,
Versionsgleichheit, Referenzpfade und reproduzierbare Paketierung. Sie beweisen
keine Erzählqualität. Es wurden für diesen PR keine kostenpflichtigen Modellläufe
oder neuen menschlichen Spieltests durchgeführt. Ob die Anweisungen den zweiten
Abenteuerabschnitt verlässlich verbessern, ist der nächste gebündelte Spieltest.

## Rückkehrpunkt

Repository vor dieser Überarbeitung: `6c8c897` (Merge von PR #8), Plugin-Regeln 0.3.1.
Vorherige private Pluginrelease: `pluginrel_6ad630c920ec81919e383aec4f913554`.

Ein GitHub-Revert dieses PR mit anschließendem Merge nimmt den Generator zurück.
Das installierte Plugin wird davon nicht zurückgesetzt. Für dessen inhaltliche
Rückkehr die damaligen Skill-/Referenztexte verwenden, aktuelle Metadaten und
Pluginidentität bewahren, eine höhere Semver vergeben und beide Manifeste sowie
Generatorverweis und Workflow synchronisieren. Keine niedrigere Versionsnummer
über eine neuere Release veröffentlichen. Der Versionshinweis sperrt laufende
Chats technisch nicht; Regeln nicht stillschweigend während eines Runs wechseln.

Die alte Vesper-Spielleitung und die eingefrorene API-App bleiben unberührt.
