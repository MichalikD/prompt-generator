# Open Game Master · Regelsatz 0.9.0

Die [private Testinstallation](https://chatgpt.com/plugins/plugins_6ad5185c00f481918c6b29c904cfab37)
behält ihre Pluginidentität. Ihr Anzeigename enthält keine Versionsnummer mehr.


## Verwendung

1. Welt, Spielvorgaben und Charakterquelle im Generator wählen.
2. Schritt 1 in die Anweisungen eines neuen ChatGPT-Projekts kopieren.
3. Einen Chat darin öffnen, bei Plugin-Ausgabe **Open Game Master** auswählen und
   die vollständige Nachricht aus Schritt 2 senden.

Ein bestätigter Bogen ist in Schritt 2 bereits enthalten. Nicht separat noch
mal senden. Ohne vorbereiteten Bogen folgt die gewählte Erstellung im Chat.
Die kompakte Ausgabe funktioniert ohne Plugin. Nicht beide Regelpakete
zusätzlich in dasselbe Projekt einfügen.

Alle Anweisungen sind Englisch. Die Spielsprache steht zentral in
`src/language.mjs` und wird beispielsweise so übergeben:

```text
language = German
```

Sie gilt für Erzählung, Dialoge, angezeigte Regelbegriffe und Kommandos.
Schema-Schlüssel bleiben Englisch. Nutzertexte und Namen bleiben erhalten.
Die Oberfläche bleibt Deutsch. Referenztexte legen keine eigene deutsche
Terminologie mehr fest. Bei direktem Pluginaufruf ohne Profil wird eine fehlende
Sprachangabe einmal geklärt; der Standard-Startvorschlag enthält sie bereits.

## Regeln

Aktuelle Kampf-, Erholungs- und Bedienungsregeln: [Regelbasis 0.9.0](kampf-und-erholung-0.9.md).

Spielauftrag und Fähigkeiten: [Weltinitiative 0.8.0](weltinitiative-0.8.md).
Die folgenden älteren Versionshinweise dokumentieren die Entwicklung.

Die Überarbeitung 0.3.0 bleibt inhaltlich erhalten: konkrete Fehlschlagfolgen,
plausible Wiederholungen derselben Methode mit fortlaufenden Kosten/Gefahren,
wirksame Vorbereitung, brauchbare Talente, neue Entwicklungsrichtungen sowie
abwechslungsreiche Konflikte mit eigenständigen NSC-Interessen. Regelsatz 0.4.0 präzisiert zusätzlich Abenteuerfortsetzung, Konflikte und
Abschlüsse; 0.5.0 ergänzt Weltvorlagen, engere kurze Abenteuer und vielfältigere Handlung,
ohne ein neues Zahlensystem einzuführen. Details: [Weltvorlagen 0.5.0](welten-und-kurzabenteuer-0.5.md).
Die bisherigen Prüfsituationen
stehen in [Abenteuerfortsetzung 0.4.0](fortsetzung-0.4.md).

| Regel | Interne Bezeichnung und unveränderter Wert |
| --- | --- |
| Attribute | Strength / Dexterity / Intellect / Insight, Start −1 bis +3, Summe +5 |
| Talente | Zwei Starttalente, jeweils +2; nicht stapelbar |
| Probe | D20 + Attribut + ein Talent + ein Ausrüstungsbonus (max. +2) ≥ DC |
| Schwierigkeit | DC 8 / 11 / 14 / 17 / 20 |
| Start | 10 HP, acht Tragplätze |
| Initiative | D20 + Dexterity, wenn die Lage keine Reihenfolge vorgibt |
| Verteidigung | 10 + Dexterity, gegebenenfalls +1 Rüstung |
| Schaden | 2 / 3 / 4, optional gewählte D4/D6/D8-Variation um ±1 |
| Entwicklung | Attributmaximum +5; keine neue Levelmechanik |

Neue Regeln und Verletzungsfolgen werden vor Anwendung erklärt. Fehlende
Dateien, Speicherung und Werkzeuge werden nicht vorgetäuscht. Es gibt keine
Datenbank und keine Garantie für Erzählqualität oder exakte Kontinuität.

## Quellen und Paketierung

Quelle: `plugins/freie-spielleitung-02/` (technische Identität bleibt stabil).

- `skills/freie-spielleitung/SKILL.md`
- `references/adventure-and-world.md`
- `references/character-and-inventory.md`
- `references/checks-and-combat.md`
- `references/development-and-saves.md`

Die Referenzpfade liegen relativ zum Skillordner. Die alten deutschen
Referenzdateien wurden bei der englischen Umstellung entfernt.

```sh
npm test
npm run check
npm run plugin:check
npm run plugin:build
```

Das reproduzierbare öffentliche ZIP liegt anschließend unter
`dist/freie-spielleitung-02-0.9.0.zip`. Private Backend-Autormetadaten werden nicht
in das öffentliche Repository übernommen. Regelversion, Paketmanifest,
Generatorverweis und Workflow müssen zusammenpassen.

Ein Merge veröffentlicht den Generator über GitHub Pages. Das Plugin wird
separat unter bestehender Identität aktualisiert. Die Versionsangabe ist keine
technische Sperre für bereits laufende Chats. Neue Tests mit frisch erzeugten
Starttexten beginnen; alte Testbögen haben keine Kompatibilitätsgarantie.

[Rückkehrpunkt und getrenntes Zurücknehmen von Website/Plugin](rollback-0.3.md).
