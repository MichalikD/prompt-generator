# Entwicklungsroadmap des Prompt-Generators

Stand: 29. Oktober 2026 · Aktuelle Regelbasis: 0.16.0 · Paket umgesetzt; längere Spielerprobung steht aus

Diese Roadmap führt die bisherigen Aufgaben und aktuelle Entwicklungsanforderungen
zusammen. Neue Einträge enthalten keine privaten Kampagnenszenen oder Figurenangaben.
Abschnitt 2 dokumentiert die Implementierung von 0.14 und den anschließenden Ausbau 0.15;
abgehakte Einträge bedeuten keine garantierte Regelbefolgung im Spielchat.
Abschnitt 3 erhält die Aufgaben und präzisiert ihre weitere Erprobung. Die Regeln
aus 0.15 sind implementiert; offene spielerische Ziele gelten erst nach Erprobung als bestätigt. Frühere Implementierungen und Prüfungen stehen in den
Versionsdokumenten und in Git. Menschliches Spielgefühl, kurze Szenenprüfungen und
automatische Tests sind unterschiedliche Nachweise.

## 1. Ausgangspunkt und Ziel

Der Stand ist spielbar. Der erzählerische Unterbau und der geführte Generator
bleiben Grundlage; es geht um einen zusammenhängenden Ausbau, nicht um einen Neustart.

| Durchlauf | Was trägt | Verbleibende Grenze |
| --- | --- | --- |
| Impuls-Einstiege und Fortsetzungen | Fünf Starts: 6 / 8,5 / 7 / 9 / 8; zwei interessante Fortsetzungen, besondere Gaben und brauchbare Übergänge | Wiederkehrende Motive; beliebig lange Vielfalt nicht bewiesen |
| Kenji | Vom Spieler ausdrücklich als Erfolg bewertet; kurze Abschlüsse, Besatzung als Bezugspunkt, emotionale Beziehungen und selbst eingebrachte Gedichte | Wiederholte Vermittlung, wenig spielbare Magie und später zu kleinteiliger Alltag |
| Deren | Keine schlechte Kampagne, aber weniger Spaß als Kenji; HELIOS als starker Fund mit eigenständig entwickeltem Geschäft und nutzbarem Eigentum; Szene mit Marek ermöglicht offensives Handeln | Zeitweise eintönig; Gruppen bewaffneter Gegner machen Umwege vernünftiger als Beteiligung; Kampfregeln fehlerhaft angewandt, Fortschritt verspätet ausgegeben |

Derens Ende ist ein bewusst gewählter Erfolg mit Einkommen, kein erzwungenes
Auslaufen in Alltag. Ungereimtheiten waren für den Spieler meist verkraftbar;
die Struktur der angebotenen Handlungsmöglichkeiten wiegt schwerer als folgenlose
Darstellungsfehler. Private Kampagnenexporte werden nicht veröffentlicht.

**Weiterhin geltendes Spielziel:** Eine einzelne Figur findet unterschiedliche, interessante
Herausforderungen mit erkennbaren Chancen. Kämpfen, Schleichen, Vorbereitung,
Erkundung, Verhandeln und Ausweichen können tragfähige Entscheidungen sein.
Offensives Handeln braucht eine nachvollziehbare Erfolgsaussicht und einen
möglichen Gewinn. Eine theoretische Angriffsmöglichkeit genügt nicht.

## 2. Umgesetztes Paket 0.14: Vielfalt und tragfähiges Solospiel

### A. Begegnungen und Machtentwicklung

- [x] Begegnungen an tatsächlichen Möglichkeiten der einzelnen Figur ausrichten,
  ohne jede Begegnung fair zu machen oder alle Gegner automatisch abzuschwächen.
- [x] Unterschiedliche spielbare Kerne anbieten: begrenzte Bergung, Verfolgung,
  gefährliche Entdeckung, einzelne Bedrohung, Umweltproblem, Wettbewerb oder
  persönliches Vorhaben; nicht immer mehrere Bewaffnete oder ein zu schlichtender Streit.
- [x] Bewaffnete Gruppen dürfen getrennte Positionen, Abläufe, Aufgaben und
  Verwundbarkeiten haben. Beobachtung, Deckung, Überraschung, Unterstützung und
  das Isolieren von Gegnern verändern das Kräfteverhältnis tatsächlich.
- [x] Unterstützung wie durch Marek ermöglichen, ohne einen dauerhaften Gefährten
  zur Voraussetzung jeder kämpferischen Handlung zu machen.
- [x] Erfolgreiches Umgehen beendet die betreffende Gefahr. Kein Verschieben
  derselben Sperre auf den Umweg und keine Bestrafung vernünftigen Ausweichens.
  Andere eigenständige Entwicklungen bleiben möglich.
- [x] Gewünschte Stärke der Figur und Zahl gegnerischer Aktionen gemeinsam prüfen.
  Ein erfahrener Kampfspezialist soll mehrere gewöhnliche Gegner bewältigen können,
  wo seine Fähigkeiten und die Situation das tragen. Keine Garantie auf Sieg
  gegen beliebige Gruppen und keine pauschalen freien Mehrfachangriffe für alle.
- [x] Erhaltene Macht eröffnet später neue Wege: frühere Bedrohungen dürfen leichter
  werden. Gegner nicht automatisch mitsteigern, um jeden Fortschritt auszugleichen.
- [x] Fauna als wirkenden Teil passender Welten berücksichtigen: auch harmlose Tiere,
  Spuren, Nahrung, Begleiter und gefährliche Wesen. Keine Tier- oder Monsterquote.
  Fahrbereite Technik und ihre Verfügbarkeit am gewählten Endzeitbild ausrichten;
  vorhandene Wracks sind nicht gleich billige, allgemein verfügbare Mobilität.

### B. Kampf und Würfel verlässlich abwickeln

- [x] Attribut, ein passendes Talent und ein zulässiger Ausrüstungsbonus vollständig
  berechnen; im Deren-Lauf fehlte bei Schüssen wiederholt Geschick.
- [x] Sichtbare Gegnerwerte, insbesondere aktuelle/maximale LP, vor der relevanten
  Entscheidung zeigen. Schaden und verbleibende LP nachvollziehbar weiterführen.
- [x] Gegner und Verbündete mit ihren tatsächlichen Aktionen und ausgewählten
  offenen Würfen auflösen. Kein erzählerisch festgelegter Gegentreffer als Ersatz.
- [x] Auswahl der Schadenswürfel verbindlich anwenden: bei passender Kategorie
  nach einem Treffer den gewählten Würfel anfordern, ohne vorzeitig festen Schaden
  zu verbuchen. Symmetrisch für Spieler, NSC, Waffen und Kräfte.
- [x] Zusatzwürfel für Funde/Ereignisse/Chancen bei passendem Anlass verwenden,
  ohne alle gewählten Würfel in jedes Abenteuer zu zwingen.
- [x] Grund-SG 8/11/14/17/20 von Zielverteidigung unterscheiden. Zwischenwerte
  als erkennbare begründete Abwandlungen erklären, nicht still neu erfinden.
- [x] Deckung, Vorbereitung, Überraschung und Zugfolge widerspruchsfrei halten;
  einen plausiblen Überraschungsauftakt nicht durch unnötige neue Regeln entwerten.
- [x] Fehlschläge eines Angriffs als fehlenden wirksamen Treffer beschreiben:
  Ausweichen, Deckung oder Panzerung können dazu gehören, nicht nur völliges
  Danebenschießen. Kurze Entfernung allein garantiert keinen wirksamen Treffer.

### C. Waffen mit tatsächlichen Unterschieden

- [x] Schlanke Profile mit Schadensklasse/Würfel, brauchbarer Reichweite,
  Handhabung/Platzbedarf und relevanter Besonderheit samt Einschränkung festlegen.
- [x] Pistole, Schrotflinte, Gewehr und automatische Waffe anhand konkreter
  Situationen unterscheiden; dieselbe Grundlage muss Nahkampf- und Fantasywaffen tragen.
- [x] Stärken und Grenzen vor einem relevanten Einsatz erkennbar machen.
  Keine willkürlichen situativen Boni oder neuen Ausnahmearten nach einem Wurf.
- [x] Erstellungstemplate, bestätigter Bogen, Inventar/Spielübersicht und
  Pluginregeln gemeinsam abgleichen. Keine stillen neuen Eigenschaften für
  bereits bestätigte Waffen und keine überladene Waffensimulation.

### D. Erkundung und Entwicklung

- [x] Erreichte Meilensteine eindeutig abwickeln: konkrete Wahl anbieten,
  bereits verdienten praktischen Vorteil benennen oder erklären, warum noch
  kein Meilenstein vorliegt. Nicht nur undefinierten Fortschritt vermerken.
- [x] Erkundung, riskante Bergung, neue Zugänge, Wissen und selbst entwickelte
  Vorhaben gleichwertig zu Aufträgen und Kämpfen beurteilen.
- [x] Bereits gewährte und auf Wunsch aufgeschobene Entwicklung auseinanderhalten;
  später keine überraschende Ansammlung ohne nachvollziehbare Zuordnung.
- [x] Die Stärke von HELIOS erhalten: vielseitig nutzbare Funde, Eigentum,
  Einkommen, Kontakte und neue Handlungsmöglichkeiten als praktische Entwicklung.
  Kein Pflichtverkauf, keine automatisch folgende Hauptquest und keine Verdoppelung
  derselben Belohnung. Geld und Entwicklung bleiben unterscheidbar.
- [x] Verbesserungen über reine Zahlen hinaus nutzbar machen; vorhandene Talente
  nicht unter neuem Namen erneut verkaufen. Attributwahl und besondere Machtentwicklung
  bleiben möglich, Talentbonus bleibt nach bisheriger Grundlage +2.

### Entscheidungen der Umsetzung

Das Paket umfasst Plugin, ausgewählte Generatorvorgaben, Erstellungstemplate und
betroffene Bogen-/Übersichtsangaben zusammen. Layout-Ausbau bleibt getrennt.

Die bestehende D20-Angriffsprobe und die gewählten Schadenswürfel sind zunächst die
Vergleichsbasis. Ein eigenes Trefferqualitätsmodell mit möglichem Schaden 0 bleibt
eine offene Designfrage. Es wird nicht still eingeführt, um fehlerhafte Berechnung
oder fehlende Gegnerwerte zu kompensieren.

Die numerische Prüfung und ihre Annahmen stehen in
[Solospiel und Waffen 0.14](solospiel-und-waffen-0.14.md). Geprüft wurden: Attribut und Talent, Trefferchancen,
Schaden, gegnerische LP, Anzahl der Aktionen, Unterstützung und Vorbereitung.
Die Grundwerte bleiben erhalten. Niederhalten ist eine ausdrücklich gewählte
Waffeneigenschaft oder gelernte Technik, kein freier Mehrfachangriff.
Keine ungeprüfte globale Erhöhung der Spieler-LP oder Abwertung sämtlicher Gegner.

### Woran wir das Paket beurteilen

1. Korrekte Berechnungen und ausgewählte Schadenswürfel funktionieren im ganzen
   Kampf, einschließlich gegnerischer Züge und angezeigter LP.
2. An vorhandenen Stellen aus Deren kurze Varianten prüfen: ein einzelner Gegner,
   eine Gruppe ohne Vorbereitung, vorbereiteter Angriff mit Unterstützung sowie
   eine stärkere Figur gegen mehrere gewöhnliche Gegner. Kein gewünschter Sieg
   oder Musterweg wird den unabhängigen Szenenprüfungen vorgegeben.
3. Gefahr und Chancen bleiben erkennbar. Vorbereitung verändert die tatsächliche
   Lage; Ausweichen führt nicht zur wiederholten gleichen Sperre. Erkundung kann
   ohne Auftraggeber einen greifbaren Erfolg und Entwicklung tragen.
4. Erst danach ein frei gewählter menschlicher Durchlauf nach Interesse. Keine
   vorgeschriebene Stundenzahl, keine Kampagne nach jeder Einzelkorrektur.

Numerische Prüfungen und kurze Szenen zeigen keine langfristige erzählerische
Qualität. Das Spielgefühl bleibt das entscheidende zusätzliche Kriterium.

## 3. Aktuelle offene Aufgaben, priorisiert

### Paket 0.16: Umsetzung nach Bestandsaufnahme und Spielerfahrungen

- [x] Verbindliche 1/2/3 EXP für kleine/gewöhnliche/große abgeschlossene Ergebnisse,
  auch bei Niederlage. Routine, einzelne Gegner und beliebige Wiederholung: 0.
- [x] Je 2 EXP eine persönliche Verbesserung; Rest bleibt, Schwelle steigt nicht.
  Drei unterschiedliche Optionen sofort anbieten, keine spätere Angebotsankündigung.
- [x] Beute, Geschenke, Lohn und andere Weltgewinne unabhängig von EXP führen.
  Die frühere Möglichkeit, damit persönliche Entwicklung zu ersetzen, ist abgelöst.
- [x] EXP und verfügbare Verbesserungen in Bogen, Template, Editor, Übersicht und
  Export führen; Startbogen erhalten. Keine automatische Chat-Synchronisierung.
- [x] Angebotsmischung, Zusatznutzen gegenüber Grundhandlungen und freiwilliges
  Lernen präzisieren; Training ist keine zusätzliche Pflicht vor verdienten Verbesserungen.
- [x] Kampfzuständigkeiten direkt im vorhandenen Ablauf klären; keine neuen Werte.
- [x] Alle zehn Weltvorlagen mit eigenen spielbaren Schwerpunkten und gemeinsamer
  Präsenzregel abgleichen; Anpassungen, Ausschlüsse und freie Handlung bleiben gültig.
- [ ] Lange Spielwirkung bestätigen: konkrete Beute und persönliches Wachstum,
  selbstständig ausgeführte Kämpfe, unterschiedliche Weltpräsenz und echte Abschlüsse.

Die folgenden Einträge bleiben als historische Befunde und Erprobungsziele erhalten.
Wo sie Gegenstände als Ersatz für persönliche Entwicklung behandeln, gilt seit
0.16 die Trennung von Weltgewinn und EXP. Haken belegen Umsetzung, nicht garantierte
Modellbefolgung. Neutrale F-01/F-03/F-05 rechtfertigen keinen neuen Unterbau;
F-02 bleibt Validierungsgrenze, F-04 wird durch Figurenübernahme ohne vorgetäuschte
Kampagnenkontinuität abgegrenzt. Englische Steuertexte bleiben beabsichtigt.

**Historischer Ausgangspunkt 0.15:** Das Paket 0.15 verbindet erreichbare Abschlüsse, greifbaren Machtgewinn,
straffere Abläufe und eigenständige Fraktionen mit unabhängigen Generatorverbesserungen.
Danach folgt ein frei gewählter Lauf nach Interesse; kein weiterer langer Lauf
ist vor diesem Paket nötig. Funktionierende Beziehungen, Eigeninitiative,
Feldzugsplanung und Fantasypräsenz bleiben ausdrücklich erhaltenswert.

**Umgesetzt in 0.15:**

- [x] Erreichbare Auflösung bei Anfang und Folgeabenteuer; Erfolge verändern den
  Konflikt und eröffnen einen entscheidenden Schritt statt endloser Pflichtvoraussetzungen.
- [x] Nutzbare Fähigkeiten, stärkere Anwendungen, besondere Waffen/Gegenstandskräfte,
  Ressourcen und Einfluss als konkrete Entwicklung; nicht nur langsame Attribute.
- [x] Verdiente Entwicklung ohne Nachfrage abrechnen; Forschung kann anwendbares
  Können ergeben, bereits verdiente Belohnung hängt nicht am nächsten Auftrag.
- [x] Routine, Absprachen, Behandlung und delegierte Arbeit zusammenfassen; eigene
  Fraktionen behalten etablierte Interessen und moralische Grenzen.
- [x] Rohwürfe, verbleibende Kampfzüge, Effektende und symmetrische Erholung präzisieren.
- [x] Waffenvorlagen-Anzeige, Ressourcenplatzierung, Hintergrundtemplate und
  sichtbare Generator-/Ziel-Regelversion gemeinsam überarbeiten.

Diese Haken bezeichnen geänderte Regeln und überprüfte Daten-/Bedienabläufe,
keine bewiesene langfristige Erzählqualität. Die nachfolgenden offenen Regelnziele
bleiben als Kriterien für den nächsten Lauf erhalten. Kritische Treffer,
Zufalls-Seltenheit und alternative Todesregeln sind nicht Teil von 0.15.

**Einordnung der weiteren Erprobung:** Längere Kontinuität, fortwirkende Absprachen,
unterschiedliche NSC-Interessen und echte Fantasypräsenz tragen weiterhin.
Einzelne korrigierte Wissens-/Erholungsfehler begründen derzeit keinen großen
Gedächtnisumbau. Eine zeitweise menschlich geprägte Umgebung begründet für sich
ebenfalls keine neue Speziesquote; vorhandene nichtmenschliche Gesellschaften und
Magie bleiben relevant. Diese positiven Befunde sind keine allgemeine Garantie.

| Rang | Schwerpunkt | Präzisierung aus der weiteren Erprobung |
| --- | --- | --- |
| 1 | Erreichbare Abschlüsse und neue Abenteuer | Der bestehende Konflikt weitet sich nach Erfolgen wiederholt aus; eine offene Kampagne braucht abgeschlossene Bögen, nicht nur weitere Untersuchungen desselben Problems |
| 1 | Nutzbarer Fortschritt und Kompetenzgefühl | Nicht nur seltene Belohnungen: bereits verdienter Gewinn wird wiederholt zu Zugang, Forschung oder einer weiteren Aufgabe statt einer anwendbaren Verbesserung |
| 1 | Erzähltempo und abgeschlossene Teilziele | Lange Texte und viele einzeln abgefragte Vorbereitungsschritte können auch nach Erfolgen bremsen; Vorsicht des Spielers bedeutet nicht automatisch kleinteilige Pflichtabwicklung |
| 1 | Eigenständige Fraktionen und begrenzte Abenteuer | Auch die eigene Seite behält Ziele und moralische Grenzen; Freundschaft und einzelne Rettungen machen sie nicht automatisch wohlwollend. Kurzumfang bleibt offen |
| 2 | Weltgeschehen und bestehende Bedienungs-/Regelaufgaben | Relevante Rückmeldungen delegierter Aufgaben rechtzeitig vermitteln; kritische Treffer, Zufallsbelohnungen und Generatoraufgaben bleiben erhalten |
| 3 | Alternative Todes-/Ausschaltungsregeln | Bewusste Schadensbegrenzung weiterhin ergebnisoffen untersuchen, keine neue Regel vorwegnehmen |

Die Reihenfolge ist eine Arbeitspriorisierung für die weitere Erprobung nach 0.15. Neue Befunde präzisieren vorhandene Aufgaben; sie rechtfertigen nicht
automatisch weitere Regeltexte, harte Textlimits oder einen kompletten Neubau.

### Priorität 1: Konflikte entscheiden und Fortsetzung ermöglichen

- [ ] **Erreichbare Abenteuerabschlüsse im längeren Spiel bestätigen.** Die Vorbereitung
  von Anfang und Folgeabenteuer folgt demselben Auftrag. Erfolge verringern tatsächliche
  Gegenwehr und ermöglichen eine entscheidende Handlung. Enthüllungen dürfen vertiefen,
  aber nicht ständig neue Gefangene, Namen, Siegel oder übergeordnete Bedrohungen als
  notwendige Vorstufe derselben Auflösung erzeugen. Fehlwürfe behalten ihre Folgen;
  ein Finale muss weder siegreich noch als Krieg enden. Nicht jedes Geheimnis oder
  jede Behandlung muss vor Abschluss geklärt sein. Freiwillig vergrößerte Ziele von
  automatisch ausgedehnten Konflikten unterscheiden; nach dem Ende Raum für eine
  neue Situation mit neuen Interessen geben. 0.15 enthält die Regelüberarbeitung,
  ihre Zuverlässigkeit im längeren Verlauf ist noch zu prüfen.

### Priorität 1: Spürbarer Fortschritt und verlässliches Kompetenzgefühl

- [ ] **Schnelleren, relevanten Machtgewinn ausarbeiten.** Entwicklung soll sich
  innerhalb einer gewöhnlichen, begrenzten Kampagne lohnen. Nicht voraussetzen,
  dass jemand sehr lange spielt oder alle Attribute maximiert. Langsames Wachstum
  ist kein Selbstzweck für das Balancing. Häufigkeit und Stärke der Gewinne
  gemeinsam betrachten; Zahlenvergleich vor einer neuen verbindlichen Staffelung.
  0.15 ergänzt ausdrücklich neue Fähigkeiten, stärkere bestehende Anwendungen und
  bessere Ausrüstung statt nur Attributspunkte. Ein Gewinn braucht keinen neuen
  Nachteil, der ihn wieder aufhebt. Standardgegner bleiben gewöhnlich; neue passende
  Gegner können stärker sein. Keine feste Stufenleiter oder Seltenheitstabelle eingeführt.
- [ ] **Entwicklung an tatsächlichen Abschlüssen und Zwischenerfolgen auszahlen.**
  Bereits der erste abgeschlossene Konflikt braucht eine bewusste Abrechnung.
  Längere Operationen erhalten nutzbare Zwischenschritte, nicht erst am Gesamtende
  eine kleine Erhöhung. Keine Belohnungsquote für jede Szene oder Wiederholung
  desselben Erfolgs. Bestehende Regeln dafür sind noch nicht ausreichend verlässlich.
  Ausdrücklich abgeschlossene Einsätze müssen ohne Nachfrage des Spielers abgerechnet
  werden. Ein angekündigter Gewinn bleibt diesem Erfolg zugeordnet und wird nicht
  nachträglich von der Erledigung eines neuen Auftrags abhängig gemacht. Bewusst vom
  Spieler aufgeschobene Entscheidungen bleiben davon getrennt.
- [ ] **Belohnungen nach praktischer Wirkung gestalten.** Neue Zauber, bessere
  Anwendungen, Meisterschaften, Ressourcen, besondere Gegenstände und tatsächlicher
  Einfluss sollen neue Wege eröffnen. Ein zusätzlicher Ressourcenpunkt kann passen,
  ist aber nicht automatisch eine angemessene Hauptbelohnung für einen langen
  Feldzug. Bei Kontakten und Wissenszugang den bereits nutzbaren Vorteil ausdrücklich
  benennen. Verdiente Entwicklung und Lohn auseinanderhalten.
  Bei Studienwerken und Archiven zwischen Zugang, Forschungsansatz und tatsächlich
  anwendbarem Können unterscheiden. Ein Buch ohne nutzbare Wirkung ist zunächst eine
  Lerngelegenheit, nicht automatisch eine vollständig ausgezahlte Machtbelohnung.
  Gewollte Forschung kann bleiben; konkrete erreichbare Lernziele und vereinbarte
  Zeit/Leistung sollen zu begrenzten neuen Anwendungen oder Verbesserungen führen,
  statt wiederholt nur theoretische Notizen und neue Voraussetzungen zu erzeugen.
  Einfluss, Vollmachten und Beziehungen als echte Gewinne erhalten, aber den
  gewünschten magischen oder kämpferischen Fortschritt nicht dauerhaft damit ersetzen.
- [ ] **Etabliertes Startniveau ausdrücken.** Anfänger und bereits mächtige Figuren
  brauchen passende tatsächliche Fähigkeiten. Ein größerer Vorrat erhöht Ausdauer,
  aber nicht die Wirkung des einzelnen Zaubers. Figurenidee, Angriffs-/Zauberwirkung,
  verfügbare Optionen, Einfluss und Gegner gemeinsam abstimmen. Template, Validierung,
  Editor, Startpaket und Plugin müssen mögliche Vereinbarungen widerspruchsfrei
  darstellen; keine versteckte Abschwächung zu einem Anfänger. Noch keine neue
  Stufenauswahl, Werteverteilung oder Änderung bestehender Grenzen beschlossen.
- [ ] **Kompetenz bei Proben und Fehlschlägen erhalten.** Passende Talente nicht
  künstlich von Bestandteilen ihres Einsatzes ausschließen; einfache Vorhaben nicht
  durch viele Einzelproben künstlich unsicher machen. Profis dürfen scheitern,
  ohne zur Slapstickfigur zu werden. Bestehende Folgen und echte Gefahr bleiben.
- [ ] **Alle relevanten Kampfteilnehmer und Wirkungsdauern weiterführen.** Angriff,
  Befehl, Rückzug, Wache oder begründetes Abwarten sichtbar halten, wenn es
  die Lage beeinflusst. Verbündete ebenfalls eigenständig handeln lassen;
  aktive Kontrolleffekte, ausstehende Züge, Bewegungen und Entfernungen konsistent abwickeln.
- [ ] **Vorhandene Würfelregeln zuverlässig anwenden.** Spielerwürfe einschließlich
  ihrer Schadenswürfel abwarten; NSC-Würfe nach vereinbarter Zuständigkeit offen
  auflösen. Flächenangriffe müssen unterschiedliche Deckung pro Ziel beachten.
  Fehlerkorrektur bedeutet nicht, automatisch jedem Metaeinwand recht zu geben.
  Bei ausgewählten Spielerwürfen unveränderte Rohwürfe statt selbst berechneter
  Gesamtergebnisse verlangen und angekündigte Boni durch die Spielleitung addieren.
  Unbemerkten Wechsel dieses Ablaufs auch bei längeren friedlichen Abschnitten
  vermeiden; die neue Beobachtung verlangt kein weiteres Würfelsystem.

### Priorität 1: Erzähltempo und erkennbare Teilabschlüsse

- [ ] **Zusammenhängende Vorhaben zusammenhängend abwickeln.** Vereinbarte Vorbereitung,
  Erklärungen, Durchführung und Routinekontrollen bis zur nächsten tatsächlichen
  Entscheidung oder eigenständigen Gefahr zusammenfassen. Nicht jede Handbewegung,
  Freigabe oder Wiederholung zu einer separaten Szene oder Probe machen. Bewusst
  gewünschte Vorsicht respektieren, ohne sie in eine lange Pflichtfolge zu verwandeln.
- [ ] **Erfolge in Ergebnisse überführen.** Erfolgreiche Untersuchung oder Vorbereitung
  muss ihren tatsächlichen Nutzen behalten und ein erkennbares Teilziel abschließen.
  Distinkte neue Risiken rechtfertigen neue Schritte; eine endlose Folge weiterer
  Sicherungen, Prüfungen und Auswertungen ist kein Ersatz für Fortschritt. Begrenzte
  Stabilisierung kann ein echter Erfolg sein, auch wenn vollständige Heilung später
  folgt. Nächste Schritte und Abschlussbedingungen vorher soweit möglich klarhalten.
- [ ] **Antwortlänge nach neuem Entscheidungsnutzen steuern.** Wiederholte Zustimmung,
  Lob, bekannte Vertragsbedingungen und mehrere gleichlautende NSC-Kommentare raffen.
  Begegnungen, Beziehungen und wichtige Wendepunkte dürfen Raum bekommen; keine
  starre Wortgrenze. Ausdrücklich gewünschte Zeitraffung wirksam fortführen und bei
  Routine selbstständig einsetzen, statt immer neue Aufforderungen zu benötigen.

### Priorität 1: Erzählfreiheit und Abenteuerumfang erhalten

- [ ] **Moralisch unterschiedliche Gegenspieler zulassen.** Eine eigennützige oder
  böse Spielerfigur muss nicht durch noch bösere Gegner zur eigentlichen Retterin
  erklärt werden. Ehrenhafte, gewöhnliche, grausame und widersprüchliche Menschen
  können echte Gegeninteressen haben. Verbündete bleiben keine bloßen Bestätiger;
  strategische Vertragstreue macht eine Figur nicht automatisch gut.
  Das gilt ebenso für die eigene Fraktion und ihren Herrscher: Persönliches Vertrauen,
  Humor und Fürsorge für einzelne Personen ersetzen nicht automatisch etablierte
  Machtziele oder eine rücksichtslose Grundhaltung. Strategisches Retten und
  Gefangennahme können eigennützig sein. Weder die Figur durch pauschales Lob zur
  Heldin erklären noch freundliche Beziehungen oder eigenständig gewählte Güte
  verhindern. Freiwillige Entwicklung aus Entscheidungen von automatischer moralischer
  Angleichung der gesamten Umgebung unterscheiden; Konsequenzen grausamen Handelns
  und echte Grenzen einzelner Verbündeter bestehen lassen.
- [ ] **Kurz als begrenzte Aufgabe verlässlich halten.** Den Abschluss eines
  Konflikts von einem größeren Folgefeldzug unterscheiden; offene Kampagne verlangt
  keine fortlaufende Hauptbedrohung. Eigene ausführliche Planung und bewusst gewählte
  Fortsetzung respektieren, ohne kleine Zwischenschritte nachträglich als komplette
  Kurzabenteuer zu deklarieren. Erkennbar machen, wenn ein freiwilliges Vorhaben
  über den ursprünglich gewählten Umfang hinauswächst. Nicht laufenden Spielspaß
  durch ein erzwungenes Ende abbrechen.

### Priorität 2: Kampfgefühl und zufällige besondere Belohnungen entwerfen

- [ ] **Kritische Treffer konkret prüfen.** Natürliche 20 und maximaler
  Schadenswurf sollen sich besonders anfühlen. Verstärkten Schaden oder klar
  begrenzte besondere Effekte vergleichen, einschließlich Folgen auf Gegnerseite.
  Noch keine automatische Tötung, Schadensverdopplung oder weitere Probe festgelegt.
  Ein zusätzlicher D%-Wurf ist eine offene Möglichkeit, keine Pflicht nach jeder 20.
- [ ] **Optionale Beute-/Seltenheitsstufen mit D% entwerfen.** Gewöhnliche, seltene,
  sehr seltene und legendäre Funde als Möglichkeit prüfen. Eine sehr niedrige Chance auf
  legendäre Funde ist eine Designidee, noch keine beschlossene Tabelle.
  Fundort, Gegner, Setting und Machtniveau begrenzen den passenden Inhalt; nicht
  jedes Lager enthält potenziell dieselbe legendäre Waffe. Mächtige Figuren brauchen
  auch passende Chancen auf entsprechend interessante Gewinne.
- [ ] **Zufallsfunde ergänzen verlässliche Belohnungen.** Eine schlechte Zufallszahl
  darf keinen bereits verdienten Fortschritt streichen. Gegenstand, Segen oder
  Wissen nach seinen konkreten Möglichkeiten bewerten, nicht nur nach Farbe/Namen.
  Keine Pflicht zu Ausrüstungsloot nach jeder Handlung und kein reines Beutegrinden.

### Priorität 2: Generator und Figurenbogen, getrennt vom Regelumbau

- [x] **Waffenvorlage korrekt anzeigen.** Nach Übernahme nicht wieder standardmäßig
  „Schwert“ zeigen. Sichtbare Auswahl und tatsächlicher Datenstand müssen
  nachvollziehbar zusammenpassen.
  Angepasste Profile nicht fälschlich als unveränderte Vorlage kennzeichnen.
- [x] **Fähigkeitsressourcen zu Fähigkeiten verschieben.** Im Editor Mana/Dunkle Macht
  dort bearbeiten, Ausrüstung und Geld getrennt halten. Daten und Export nicht durch
  eine reine UI-Umordnung verändern oder verlieren.
- [x] **Doppelte Figurenbeschreibung vermeiden.** Identität beschreibt die Figur;
  bestätigter Hintergrund enthält zusätzliche etablierte Fakten statt einer fast
  identischen Wiederholung, keine allgemeinen Weltregeln. Template und Feldhilfen
  aufeinander abstimmen. Fehlende zusätzliche Fakten dürfen leer bleiben; keine
  Vergangenheit zur Feldfüllung erfinden oder vorhandene Angaben still löschen.
- [x] **Versionen sichtbar und nachvollziehbar machen.** Generatorstand und erwartete
  Regelversion klar anzeigen, Projekt-/Starttexte gemeinsam ausgeben und exportieren.
  Alte kopierte Texte und Browsercache als mögliche Fehlerquellen berücksichtigen.
  Tatsächlich geladenen Pluginstand nur als geprüft ausgeben, wenn er wirklich
  bekannt ist; keine technische Versionssperre oder automatische Chatauslesung behaupten.

Die JSON-Enum-Klarstellung für Waffen aus PR #25 ist bereits umgesetzt. Sie ist
von der noch offenen Vorlagenanzeige zu unterscheiden.

### Priorität 2: Rückmeldungen aus der eigenständig handelnden Welt

- [ ] **Relevante Ergebnisse delegierter Aufgaben von selbst vermitteln.** Boten,
  Berichte und beobachtbare Folgen zu geeigneten Zeitpunkten einbringen, wenn die
  Figur sie plausibel erhalten kann. Fortschritt anderer Truppen, Kontakte oder
  Kundschafter soll nicht erst auf ausdrückliche Nachfrage in die Handlung zurückkehren.
  Keine tägliche Pflichtberichtsrunde, allwissende Echtzeitinformation oder automatische
  Erkenntnis über jeden geheimen Plan behaupten.
- [ ] **Größere Konflikte während lokaler Vorhaben fortführen.** Vergangene Zeit,
  bekannte Fristen und tatsächlich gewonnene Verzögerungen beachten. Neuigkeiten
  unterscheiden gesicherte Fakten und Einschätzungen; kein spontanes Zurücksetzen
  einer Bedrohung oder künstlicher Alarm, nur um sie wieder wichtig zu machen.
  Hintergrundentwicklungen so dosieren, dass sie Entscheidungen ermöglichen und
  nicht jedes ruhige oder persönliche Vorhaben unterbrechen.

### Priorität 3: Offene Regelfrage zu Kampfunfähigkeit, Tod und Zurückhaltung

- [ ] **„1 LP kampfunfähig, 0 LP tot“ später ergebnisoffen untersuchen.** Dahinter
  steht der Wunsch nach bewusster Schadensbegrenzung und zusätzlichen taktischen
  Entscheidungen, nicht nur nach einer anderen Anzeige. Das aktuelle 0-LP-Modell
  bleibt bis zu einer ausdrücklichen Regelentscheidung bestehen.
- [ ] **Gezielte und nichttödliche Angriffe gemeinsam gestalten.** Zum Beispiel
  bewusster Angriff aufs Bein mit höherer Schwierigkeit oder eine andere passende
  Methode, wenn die Figur jemanden weniger stark verletzen will. Wirkung, Risiko,
  Absicht, Widerstand und vorhandene Fähigkeiten vorher klären. Ein Beintreffer ist
  nicht automatisch eine Garantie auf ein harmloses Ergebnis; noch keine generellen
  Zuschläge, Schadensgrenzen oder Ausschaltungsregeln beschlossen.
- [ ] **Schaden über die Schwelle und Gegenwirkungen prüfen.** Treffer können 1 LP
  überspringen. Nichttödliche Absicht, Überwältigung, Heilung/Stabilisierung, kritische
  Treffer sowie Standard/Hardcore und NSC symmetrisch prüfen. Neue Mechaniken nicht
  nebenbei in laufenden Kampagnen einführen.

### Erprobung und Weg zur Beta

- [ ] Nach 0.15 eine frei gewählte Kampagne nach Interesse spielen; Ergebnisse zu
  Abschluss, greifbarem Fortschritt, Tempo und neuen Situationen auswerten. Keine feste Zahl an Testläufen und kein
  Neustart nach jeder Änderung. Tests sollen konkrete offene Fragen beantworten.
- [ ] Eine erste Beta darf bekannte Schwächen haben. Verständlicher Einstieg,
  brauchbare Figuren, zuverlässige grundlegende Abläufe und anhaltender Spielreiz
  wiegen schwerer als ein perfekter Symbolkatalog oder fehlerfreie Darstellung.
- [ ] Kleine externe Testgruppe vorbereiten: unterschiedliche Erfahrungen und freie
  Figuren-/Weltenwahl, Start möglichst ohne Begleitung, niedrige Rückmeldehürde.
  Version/Startpaket, freiwillig geteilter Verlauf, Spielspaß, Korrekturbedarf und
  Fortsetzungs-/Abbruchgrund festhalten; private Inhalte dürfen entfernt werden.
- [ ] Vor Einladungen tatsächlichen Pluginzugang und benötigte Umgebung/Kosten
  klären. Die private Testinstallation ist kein allgemeiner Zugang. Wiederkehrende
  Befunde von Geschmack und einzelnen schwachen Läufen unterscheiden.

## 4. Danach: Vielfalt über mehrere Durchläufe

- [ ] Impuls-Historie: verwendete Kombinationen lokal zunächst ausschließen,
  Ausschöpfung behandeln und bewusste Wiederholung per Kennung erlauben.
- [ ] Optionale Namens-/Kulturimpulse prüfen. Die Wiederverwendung eines bedeutenden
  Namens innerhalb derselben Kampagne (auch nach dem Tod des ersten Trägers) bleibt
  als konkreter Befund erhalten; 0.15 fordert den Kontextabgleich, noch keine Historie.
  Wiederholte Namen wie Varek, Jorek,
  Dornfeld oder Graufurt nicht allein durch immer längere Verbotslisten behandeln.
  Eine lokale Historie kennt nur vorgeschlagene oder zurückgemeldete Namen,
  nicht automatisch sämtliche im Spielchat erfundenen Namen.
- [ ] Dosierte Motivimpulse prüfen; kein verpflichtender Symbolkatalog und keine
  fest vorgegebene Handlung. Wiederkehrende Fantasy-Motive sind nicht grundsätzlich Fehler.
- [ ] Einzelne Impulsachsen festhalten bleibt mögliche spätere Komfortfunktion.

## 5. Komfort, Einstieg und Veröffentlichung

- [ ] Einmalige Willkommenseite: Generator und Spielprinzip kurz erklären;
  genau ein Button **Start** führt in die Vorbereitung. Nur beim ersten Besuch
  automatisch anzeigen, Wiedererkennung lokal merken.
- [ ] Charakterablage für mehrere Figuren und hilfreiche Feldbeschreibungen.
  Browser-Sidebar erst erwägen, falls der Spieltab nicht genügt.
- [ ] Themes mit Hell-/Dunkelmodus und Farbvarianten; Blau/Gold als bisherige Grundlage.
- [ ] Lokalisierung für Oberfläche, Hilfen und Übersicht; verbindliches Wörterbuch
  für Attribute/Regelbegriffe. JSON-Schlüssel stabil halten. In 0.13 sind englische
  Anzeigen reduziert, aber Übersetzungen noch nicht mit der UI vereinheitlicht.
- [ ] Besserer Name sowie durchgängiges Symbol als Favicon und links im Kopfbereich
  von Generator und Spielübersicht.
- [ ] Eventuell Geld in **Währung** umbenennen; weiterhin als Vorschlag vorgemerkt.
- [ ] Ungefragte Bilder beobachten: Textstandard ist bereits geregelt, wird vom
  Spielchat aber nicht durchgehend eingehalten. Keine technische Sperre behaupten.

Diese Punkte bleiben erhalten, sind aber keine Voraussetzung für die nächste
spielerische Verbesserung. Keine zusätzlichen Einrichtungsrunden nur für Komfort.

## 6. Weitere offene Erprobung

- Mittel und lang mit größeren Bögen und brauchbarer Zwischenentwicklung.
- Feste Gefährten, gemeinsame Entwicklung und eigenständiges Handeln.
- Ressourcen/Erholung über längere Zeit, einschließlich Blutdurst und anderer
  ausdrücklich vereinbarter besonderer Bedürfnisse; keine überraschenden Zähler.
- Große Entwicklung, Transformationen und bewusst übermächtige Phasen.
- Kontinuität von Wissen, Namen, Positionen, Zeit und Finanzen nach Spielauswirkung.
  Verletzungen brauchen fortschreitende Erholung nach den geltenden Regeln statt
  nur wiederkehrender Erwähnung. Eine nach wenigen Tagen noch empfindliche Schulter
  ist für sich kein Fehler; verbleibende Einschränkung und Erholung müssen passen.
- Selbstständige Folgeabenteuer, Erzähltempo und wiederkehrende Handlungen weiter
  beobachten. Keine automatischen Rückschlüsse von einem einzelnen gelungenen Lauf.

## Versionsdokumente

- [Abschlüsse, greifbarer Fortschritt und Generator 0.15](abschluesse-und-fortschritt-0.15.md)

- [Solospiel, Waffen und Kampfablauf 0.14](solospiel-und-waffen-0.14.md)

- [Folgeabenteuer, Ruhephasen und Weltpräsenz 0.13](fortsetzungen-0.13.md)
- [Geführtes Layout und Fähigkeiten 0.12](layout-und-faehigkeiten-0.12.md)
- [Umfang, Fortschritt und Spieltab 0.11](umfang-fortschritt-spieltab-0.11.md)
- [Ausgangsimpulse und Wissensgrenzen 0.10](ausgangsimpulse-0.10.md)
- [Kampf, Erholung und Übersicht 0.9](kampf-und-erholung-0.9.md)
- [Weltinitiative und wirksame Kräfte 0.8](weltinitiative-0.8.md)
- [Gemeinsamer Erzählauftrag 0.7](erzaehlauftrag-0.7.md)
- [Stand nach Jack 0.6](spielbarer-prototyp-0.6.md)
- [Weltvorlagen und Kurzabenteuer 0.5](welten-und-kurzabenteuer-0.5.md)

[EXP und Weltprofile 0.16](exp-und-weltprofile-0.16.md)
