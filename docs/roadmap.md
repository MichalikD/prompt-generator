# Entwicklungsstand nach Nara und Jaro

## Aktuell: Priorität 1 umgesetzt, Regelsatz 0.4.0

- Fortsetzung: angeforderte Alltagsraffung führt bis zur nächsten spielbaren,
  zur Figur passenden Situation; keine wiederholten Leerläufe und Einladungen.
- Konflikte: soziale Schwerpunkte und eine entspannte Figur entfernen nicht den
  gewählten Gefahrenton. Eigenständige Interessen bleiben, echte Lösungen gelten.
- Abschlüsse: lokale Ziele können enden, obwohl größere Fragen offen sind.
  Bezahlung, begrenzte Vorteile und dauerhafte Entwicklung getrennt behandeln;
  Meilensteine ohne Kapitelüberschrift erkennen und vor dem nächsten Abenteuer anbieten.
- Beide Ausgaben und bestehendes Plugin gemeinsam aktualisiert. Bogenformat,
  Zahlenregeln, Probenhäufigkeit, Antwortlängenvorgabe und Layout nicht verändert.
- Kleinkorrektur: Charaktertemplate legt Entwurfsstatus ausschließlich im
  Bestätigungsfeld ab, nicht im fiktionalen Hintergrund.

Nächster Schritt nach Merge/Deployment: ein neuer Durchlauf in einem anderen
Setting mit anderer Figur, über den ersten Abschluss hinaus. Beobachten, ob ein
interessanter zweiter Abschnitt ohne Anschieben entsteht. Kein neuer Test pro
Einzeländerung. Bestehende Runs nicht stillschweigend auf neue Regeln umstellen.
Prüfsituationen und Rückkehrpunkt: [Fortsetzung 0.4.0](fortsetzung-0.4.md).

Die folgenden Abschnitte dokumentieren bisherige Schritte und weiterhin offene
Punkte; Aussagen zu unveränderten Regeln beziehen sich auf den jeweiligen Stand.

Maßstab ist das Spielerlebnis. Ein schlechter Run darf beendet werden;
dekorative Fehler werden nicht automatisch Entwicklungsaufträge.

## Schritt 1 umgesetzt: Regelbasis 0.3.0

- Englische interne Regeln mit ausdrücklich deutscher Spielausgabe; kompakter
  Projektprompt, Plugin und Charaktertemplate gleichzeitig angepasst.
- Weniger wiederholte Voraussetzungen: ganze Vorhaben abwickeln, Vorbereitung
  wirksam machen und Fehlschläge mit konkreten Konsequenzen fortführen.
- Gleiche Methode erneut erlaubt, wenn plausibel; Kosten und Gefahr laufen weiter.
  Scheitern und Tod sind möglich. Keine automatische Rettung bis zum Erfolgswurf.
- Eigenständige NSC-Interessen, Beziehungen, Entscheidungen und abwechslungsreiche
  Konflikte; Figur und neue Abenteuer nicht auf den Beruf reduzieren.
- Brauchbare Talente mit passendem Namen; Entwicklung in neue Richtungen und
  vereinbarte Umschulung möglich, Originalbogen bleibt erhalten.
- Neue Mechaniken vor Anwendung erklären; kein zusätzliches Verletzungssystem.
- Zahlenregeln, Inventar, Befehle, Exporte und ausdrückliche Spielergrenzen erhalten.
- Rückkehrpunkt: [Rollback](rollback-0.3.md).

Die Prüfungen sichern Ausgabe, Regelverträge und Paketierung. Ob die gebündelten
Anweisungen das Spielerlebnis verbessern, bleibt im nächsten Run zu prüfen.

## Schritt 2 umgesetzt: Einstieg und Bedienung 0.3.1

- Missverständliche Bezeichnungen und doppelte Ausgaben reduzieren.
- Generischen Plugin-Anzeigenamen und Regelversion getrennt darstellen.
- Einstieg, gemeinsame Startnachricht und Bogenübergabe verständlicher machen.

- Vollständig englische Anweisungen, zentrale Spielsprache und englische
  Attributschlüssel im experimentellen Figurenformat Version 2.
- Zusätzliche Bogenvorschau im eingebundenen Editor eingeklappt; bestätigte Figur
  wird genau einmal in der gemeinsamen Startnachricht übergeben.
- Anzeigename **Open Game Master**, Regelsatz separat; deutsche UI bleibt erhalten.

Beide geplanten Schritte sind umgesetzt. Nach Merge und Deployment ist ein
gebündelter neuer Spieltest mit neuem Bogen möglich.

## Generator und Bogen nach Nara umgesetzt

- Vier geführte Schritte in beiden Modi, Prüfung vor dem Weitergehen und
  vollständige Ausgabe erst am Ende. Rücknavigation erhält Werte.
- Konkrete Hinweise statt Lade-Platzhalter bei unvollständiger Vorbereitung.
- Figurenformat 3: Geld/Vermögen getrennt von Fähigkeitspunkten; Kaufkraft optional.
- Optionale beschreibende Bedürfnisse oder ausdrücklich vereinbarte Mechanik mit
  Auslöser, Wirkung und Versorgung. Kein Pflichtzähler für normalen Alltag.
- Erstellungstemplate mit Startmitteln und regelkonkreter Ausrüstung/Schwäche.

Naras Transport trifft den gewünschten mittleren Umfang. Die wenigen Proben
haben die Verfolgung nicht beeinträchtigt. Daher **keine Änderung an Umfang,
Probenfrequenz, Erzählunterbau oder Antwortlänge**. Das Plugin bleibt 0.3.1.
Nach Merge/Deployment einen anderen Durchlauf mit neuem Bogen vergleichen;
kein weiterer Test pro einzelner UI-Änderung erforderlich.

## Danach gezielt prüfen (Priorität 2)

- Figurenwissen: plausible Kontakt- und Wissensübertragungen; private Überlegungen
  nicht automatisch NSC bekannt machen. Keine nachträglichen Belege zu jeder Theorie.
- Gegenwart nicht zwingend mit Ausschluss übernatürlicher Kräfte koppeln.
- Epoche, Setting und konkretes Universum gegenüber bloßem Vorbild besser trennen.
- Feldbeschreibungen für Identität, Herkunft und Hintergrund vereinfachen.

## Später (Priorität 3)

- Charaktere speichern und wieder auswählen; derzeit nur JSON-Export.
- Pronomenauswahl mit Freitext; aktuell nur Freitext.
- Bogen als übersichtliche Nachschlagehilfe; automatische Chat-Synchronisierung
  wäre ein eigenständiger, technisch ungeklärter Schritt.
- Allgemeine UI-Überarbeitung und Themes.
- Optionales Levelsystem erst bei nachgewiesenem Bedarf; bisher Entwicklung ohne Level.

## Beobachten; kein eigener Entwicklungsauftrag

- Häufig SG 14; keine Würfelquote oder künstlichen zusätzlichen Proben einführen.
- Kampf, gegnerische Würfe und Ressourcenverbrauch sind noch nicht ausreichend getestet.
- Wiederkehrende Namen und Erzählerfloskeln; noch keine zusätzliche Regel.
- Lange Antworten: kürzere Orientierung später erneut bewerten, für den nächsten Vergleich unverändert.
- Cyberware und besondere Ausrüstung als vielfältige Belohnungen; bisher kein nachgewiesenes Kaufproblem.
- Widersprüchliche dekorative Symbole bei ansonsten korrekter Rechnung.

Nächster Spieltest mit dieser gebündelten Fassung nach Merge/Deployment.
Ein neuer Chat mit neu erzeugtem Profil und bestätigtem Bogen genügt; keine
separaten vollständigen Durchläufe pro kleiner Regeländerung. Erzählqualität,
Entscheidungen, Konsequenzen und Umfang gemeinsam bewerten. Die API-Spiel-App
bleibt unberührt und eingefroren.
