# Abschlüsse und spürbarer Fortschritt · 0.15.0

Stand: 28. Oktober 2026

## Problem und resultierendes Verhalten

Eine Kampagne kann gute Figuren, Konsequenzen und Kontinuität besitzen und dennoch
an Spielreiz verlieren: Erfolge führen zu weiteren Untersuchungen derselben
Bedrohung, Forschung ergibt immer nur Ansätze und Entwicklung kommt erst nach
Nachfrage. Eine offene Kampagne soll abgeschlossene Bögen verbinden können.

0.15 überarbeitet deshalb die allgemeine Vorbereitung von Anfang und Folgeabenteuer,
das Erreichen eines Endes, die Auszahlung praktisch nutzbarer Belohnungen und die
Abwicklung zusammenhängender Vorhaben. Die Spielleitung entscheidet weiter Welt
und Widerstand; sie entscheidet weder den Weg noch das gewünschte Ende des Spielers.

## Gemeinsames Regelpaket

- Einen Konflikt mit erreichbarer Entscheidung vorbereiten. Erfolge ändern die
  tatsächlichen Möglichkeiten der Gegenseite und eröffnen einen entscheidenden
  Schritt. Neue Enthüllungen verlängern nicht regelmäßig die notwendige Vorbereitung
  zur selben Auflösung. Kein Zwang zum Krieg, Sieg oder vorgegebenen Finale.
- Kurz entscheidet den begrenzten zentralen Konflikt. Mittel und lang dürfen größere
  Bögen tragen, aber mit wirklichen Zwischenergebnissen und nutzbarer Entwicklung
  vor dem Gesamtende. Offen bezeichnet die mögliche Fortsetzung nach Abschlüssen.
- Bedeutende Ergebnisse ohne Erinnerung abrechnen. Einfluss, besondere Gegenstände
  und nutzbares Wissen können selbst Entwicklung sein; normale Bezahlung ersetzt
  sie nicht. Nicht denselben Gewinn doppelt zählen. Aufgeschobene Spielerwahl bleibt
  von bloß angekündigtem Fortschritt getrennt.
- Neue Fähigkeiten, stärkere Anwendungen, Meisterschaften, Ressourcen, bessere
  Waffen und definierte Gegenstandskräfte ausdrücklich anbieten. Nicht jeder Gewinn
  braucht einen neuen Nachteil; die gewöhnliche Welt skaliert nicht automatisch mit.
- Forschung nach erreichbaren Lernzielen und tatsächlicher Arbeit zu Können führen.
  Ein Archivzugang oder ein Buch ohne Anwendung bleibt eine Lerngelegenheit.
  Bereits verdiente Belohnung nicht an den nächsten Einsatz binden.
- Routine, Behandlung, Vorbereitung und wiederholte Einwilligungen innerhalb
  vereinbarter Grenzen bündeln. Delegierte Arbeit darf Ergebnisse liefern und
  Vorhaben abschließen. Neue eigenständige Risiken bleiben Entscheidungen/Proben.
- Eigene Verbündete behalten Motive und moralische Grenzen. Persönliche Fürsorge
  macht einen rücksichtslosen Herrscher nicht allgemein wohlwollend. Weder Güte noch
  Grausamkeit der Spielerfigur wird erzwungen oder pauschal gefeiert.
- Rohwürfe, tatsächlich verbleibende Züge und Wirkungsende beibehalten. Erholung
  auch über geraffte Tage und für NSC anwenden; dauerhafte Verletzungen brauchen
  weiterhin eine ausdrückliche Vereinbarung. Bedeutende Figurennamen vor erneuter
  Vergabe mit vorhandenem Kontext abgleichen.

Die gemeinsamen Verfahren stehen in den Pluginreferenzen. Der Starttext verweist
auf ihre Anwendung, das Profil übergibt nur den tatsächlich gewählten Umfang.
Projektanweisungen bleiben eine kurze Zuständigkeits-/Versionsbeschreibung.
Keine feste Zahl von Szenen, Meilensteinen oder Wörtern; keine garantierten Erfolge.

## Was spürbarer Machtgewinn heißen kann

Diese Beispiele erläutern Möglichkeiten, keine automatische Staffelung:

| Ausgangspunkt | Möglicher verdienter Gewinn | Bereits im weiteren Spiel nutzbar |
| --- | --- | --- |
| Nahkämpfer mit gewöhnlicher Klinge, Schaden 3 | Besondere Klinge mit schwerem Schaden 4 | Ein Gegner mit 4 LP benötigt einen statt zwei Treffern; bei 8 LP zwei statt drei |
| Nahkämpfer mit passendem Talent | Vereinbartes neues Manöver | Eine weitere Handlungsoption statt nur fünf Prozentpunkten mehr Trefferchance |
| Magier mit kleiner Auswahl | Neuer Zauber oder stärkere bestehende Anwendung | Neue Ziele, Wirkung oder ein neuer Lösungsweg; genaue Kosten/Angriffe vor Wahl |
| Erfahrene Figur mit großem Vorrat | Stärkere Wirkung oder neue Anwendung statt nur mehr Vorrat | Machtgewinn im einzelnen Einsatz, nicht ausschließlich mehr Wiederholungen |
| Erkundender Held ohne Auftraggeber | Nutzbarer Fund, erlernte Technik oder reale Unterstützung | Eigentum, Fähigkeit oder Hilfe ohne einen anschließenden Pflichtauftrag |

Für den Vergleich bleibt gewöhnlicher Schaden 3, schwerer 4; die Beispielzahlen
zählen tatsächliche Treffer bei festem Schaden, keine sicheren Angriffe. Bei einer
nicht gesättigten W20-Probe bringt Attribut +1 fünf Prozentpunkte mehr Erfolgschance.
Mit ausgewählten Schadenswürfeln gelten weiter die bestehenden Schwankungen um den
Grundschaden. Das rechtfertigt keine kostenlose Extrattacke oder neue kritische Regel.

## Figurenformat und Generator

Figurenformat 3 bleibt bestehen. Aktuelle Werte dürfen bereits Verbesserungen,
zusätzliche Fähigkeiten, größere Ressourcen und besondere Ausrüstung darstellen:

- Permanentes Können steht in `abilities`; Änderungen ersetzen die aktuelle
  Definition und werden in `development` mit Erfolg, Wirkung und Grenzen dokumentiert.
- Passive Gegenstandswirkungen stehen in Beschreibung/Profil. Eine aktivierte
  Gegenstandskraft erscheint zusätzlich bei Fähigkeiten mit dem ausdrücklich
  benötigten Gegenstand und geteilten Einsätzen. Sie wird dadurch nicht zu einer
  zweiten, unabhängig erlernten Fähigkeit. Der Startbogen bleibt unverändert.
- `weapon.damage` behält light/ordinary/heavy. Besondere vereinbarte Zusatzwirkungen
  gehören in `feature` oder die beschreibenden Fähigkeitsfelder, nicht in neue Codes.
  Ein Profil aktiviert keine nicht ausgewählten Würfel.
- Die Übersicht zeigt die tatsächlichen Texte und Werte, ohne Besitz, Aufladung
  oder Chatentwicklung automatisch zu verwalten. Der Spieler pflegt den aktuellen
  Stand weiterhin manuell; Regelvereinbarungen werden nicht aus Freitext berechnet.

Der Editor erkennt die gesamte unveränderte Waffenvorlage. Nach Anpassung oder
Import eigener Werte zeigt er „Eigenes Profil“, statt immer „Schwert“. Übernehmen
ersetzt weiterhin nur das Profil, nicht Namen, Funktion, Menge oder Tragplätze.
Fähigkeitsressourcen stehen bei Fähigkeiten; Geld und Ausrüstung bleiben getrennt.
Template und Feldhilfe trennen Figurenbeschreibung von zusätzlichen Hintergrundfakten;
fehlende Fakten dürfen leer bleiben.

Generatorversion und erwartete Regelversion stehen auf den Seiten und in beiden
zusammengehörigen Starttexten/Download. Die Anzeige liest den tatsächlich im Chat
aktiven Pluginstand nicht aus. Bestehende laufende Chats und manuelle Bögen werden
nicht automatisch auf neue Regeln umgestellt. Für einen neuen Lauf das vollständige
neu erzeugte Paket zusammen mit dem aktualisierten Plugin verwenden.

## Prüfung und Grenzen

Automatische Prüfungen decken Versionenkonsistenz, Profile und vollständige
Rundwege besonderer Waffen/Fähigkeiten durch aktuellen Bogen, Textausgabe und
Spielübersicht ab. DOM-Prüfungen kontrollieren Vorlage/angepasstes Profil,
Ressourcenplatzierung und Übernehmen/Verwerfen ohne Verlust von Notizen oder Startbogen.
Paket- und Skillvalidator prüfen Quelle, Referenzen und Archiv.

Zusätzlich wurde die Regelbasis anhand folgender Situationen auf widerspruchsfreie
Entscheidungen durchgegangen. Das ist eine Regelprüfung, kein neuer unabhängiger
KI-Durchlauf und kein Nachweis langfristiger Befolgung:

| Situation | Zu prüfende Entscheidung |
| --- | --- |
| Anführer gefangen, Unterlagen gesichert, lokales Ziel erreicht | Ergebnis und Lohn entscheiden; erreichbaren Schlag gegen verbleibende Hauptbedrohung ermöglichen, keine immer neue Pflichtkette |
| Abgeschlossener Einsatz, Belohnung angekündigt | Jetzt nutzbaren Vorteil/Wahl geben; keine neue Rettung als nachträgliche Auszahlungsbedingung |
| Mehrere Tage vereinbarte Forschung mit passenden Mitteln | Erreichbares Lernziel abwickeln; Ergebnis oder angekündigte Fehlschlagsfolge statt ausschließlich weiterer Theorie |
| Behandlung delegiert, Einwilligung und Schutz geklärt | Routine raffen und Ergebnis berichten; neue Entscheidung nur bei verändertem Risiko oder erweitertem Auftrag |
| Eigennützige Figur schont jemanden, Verbündeter ist rücksichtslos | Persönliche Beziehung erhalten, Fraktionsziele nicht allgemein in Menschenfreundlichkeit umschreiben |
| Riskanter Ritualversuch misslingt | Angekündigte Verbindung, Schaden oder Rückzug gelten; kein geschenkter Abschluss und kein Löschen des Fehlschlags |

Kurze Prüfungen ersetzen keine längere Kampagne. Der nächste frei gewählte Lauf
soll vor allem zeigen, ob Erfolge Abschluss, sichtbare Entwicklung und Raum für
etwas Neues schaffen, ohne Figurenbindung und Eigeninitiative zu verlieren.

Kritische Treffer, D%-Seltenheitstabellen, alternative Todesregeln und ein neuer
numerischer Startmodus sind nicht eingeführt; diese Aufgaben bleiben in der Roadmap.
