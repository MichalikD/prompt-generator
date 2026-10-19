# Rückkehrpunkt vor Regelsatz 0.3.0

Repository-Baseline: Branch `baseline/pre-rulebase-0-3`, Commit
`4cb7aeed000aeba3024b06608054e9fc534beb6e`.
Dieser Stand enthält die reproduzierbar paketierbaren Pluginquellen 0.2.1.
Der Branch wird durch die Überarbeitung nicht verändert.

Private Plugininstanz: `plugins_6ad5185c00f481918c6b29c904cfab37`.
Vorherige Version: **0.2.1**, Release
`pluginrel_6ad5e643cb548191a6424886c8bf7835`.
Ein vollständiges Archiv der acht Backend-Dateien wurde vor dem Update gesichert;
die Releasehistorie und der Baseline-Branch dokumentieren den Ausgangspunkt.
Private Backend-Metadaten gehören nicht in dieses öffentliche Repository.

## Website zurücknehmen

Nach einem Merge den Merge-Commit dieses PR mit GitHub Revert zurücknehmen und
den Revert mergen. Dadurch wird GitHub Pages neu ausgeliefert. Alternativ den
Baseline-Stand auf einem neuen Branch als Grundlage verwenden. Kein Force-Push
auf main nötig. Ein Website-Revert ändert das bereits installierte Plugin nicht.

## Plugin zurücknehmen

Die bisherige Pluginidentität behalten. Aktuelle Backend-Dateien und Release-ID
lesen, dann die fünf Spielleitungsdateien aus dem Baseline-Branch übernehmen.
Aktuelle Manifestmetadaten inklusive vollständigem defaultPrompt bewahren und
beide vorhandenen Manifeste auf eine **höhere** Semver anheben, etwa 0.3.1, falls
sie noch frei ist. Als bewachte Aktualisierung veröffentlichen und zurücklesen.
Eine niedrigere Versionsnummer kann nicht erneut veröffentlicht werden.

Generator-Verweis, Paketversion und Workflow-Dateiname mit der tatsächlich
veröffentlichten Wiederherstellungsfassung synchronisieren. Das ist eine
inhaltliche Rückkehr zu 0.2.1 unter einer neuen Releaseversion. Die alte
Vesper-Spielleitung und die eingefrorene API-App bleiben unberührt.
