export const groups = [
  {
    "id": "setting",
    "label": "Welt",
    "options": [
      {
        "id": "custom",
        "label": "Eigene Welt",
        "text": "Eigene Welt nach meiner Weltbeschreibung; ergänze nur passende Details.",
        "tooltip": "Beschreibe deine Welt vor dem Spielstart. Ein kurzer Satz genügt."
      },
      {
        "id": "fantasy",
        "label": "Fantasy",
        "text": "Fantasywelt mit vielfältigen Spezies/Kulturen, begrenzter Magie und vorindustrieller Technik.",
        "tooltip": "Vorindustrielle Welt mit begrenzter Magie und verschiedenen Spezies."
      },
      {
        "id": "cyberpunk",
        "label": "Cyberpunk",
        "text": "Cyberpunk: vernetzte Megastädte/Konzerne/soziale Gegensätze/Cyberware/Hacking; keine Magie. Plausible Zugänge/Reichweiten/Gegenmaßnahmen.",
        "tooltip": "Konzerne, Hacking und Implantate sind möglich. Magie ist ausgeschlossen."
      },
      {
        "id": "modern",
        "label": "Gegenwart",
        "text": "Gegenwart ohne übernatürliche Kräfte. Technik, Institutionen und Fähigkeiten plausibel; keine Wundergeräte.",
        "tooltip": "Plausible heutige Technik; keine übernatürlichen Kräfte."
      }
    ]
  },
  {
    "id": "tone",
    "label": "Atmosphäre",
    "options": [
      {
        "id": "adventure",
        "label": "Abenteuerlich",
        "text": "Abenteuerlich: Entdeckung, Initiative und echte Gefahren; Raum für Humor und Ruhe, kein Horrorfokus.",
        "tooltip": "Echte Gefahren mit Platz für Humor und Ruhe; kein Horrorfokus."
      },
      {
        "id": "cozy",
        "label": "Cozy",
        "text": "Cozy: geborgen, überschaubare Konflikte, seltene erkennbare Gefahren; keine Grausamkeit/Horrorszenen.",
        "tooltip": "Seltene, erkennbare Gefahren und überschaubare Konflikte."
      },
      {
        "id": "dark",
        "label": "Düster",
        "text": "Düster, moralisch vielschichtig und gefährlich, aber nicht hoffnungslos; kein Horrorfokus.",
        "tooltip": "Gefährliche Situationen und moralische Grauzonen, mit Raum für Hoffnung."
      },
      {
        "id": "horror",
        "label": "Horror",
        "text": "Horror: Ungewissheit/Bedrohung/Beklemmung, Ruhephasen; Logik/Autonomie, keine Willkürtode.",
        "tooltip": "Bedrohung und Beklemmung bestimmen die Atmosphäre. Die Todesregeln bleiben unabhängig davon gültig."
      }
    ]
  },
  {
    "id": "scope",
    "label": "Abenteuerumfang",
    "options": [
      {
        "id": "short",
        "label": "Kurz",
        "text": "Kurz: ein überschaubarer Konflikt mit wenigen Verflechtungen, bedeutsamen Entscheidungen und befriedigendem Abschluss. Keine Pflichtnebenhandlungen.",
        "tooltip": "Überschaubarer Konflikt; keine Vorgabe für Minuten, Textlänge oder Szenenzahl."
      },
      {
        "id": "medium",
        "label": "Mittel",
        "text": "Mittel: ein entwickelter Konflikt mit mehreren zusammenhängenden Wendepunkten und spürbaren Folgen; erreichbarer Abschluss.",
        "tooltip": "Mehr Raum für Entwicklungen und Beziehungen, ohne künstliche Verlängerung."
      },
      {
        "id": "long",
        "label": "Ausführlich",
        "text": "Ausführlich: ein vielschichtiger Konflikt mit Raum für Beziehungen, Entdeckungen und folgenreiche Entwicklungen; erkennbare Fortschritte und erreichbares Finale.",
        "tooltip": "Größere Verflechtung, keine Pflichtumwege oder endlose Eskalation."
      }
    ]
  },
  {
    "id": "continuation",
    "label": "Verlauf",
    "options": [
      {
        "id": "open",
        "label": "Offene Kampagne",
        "text": "Offene Kampagne: eigenständige Abenteuer in derselben fortlaufenden Welt. Nach Abschlüssen entwickeln sich neue Gelegenheiten aus Folgen, Beziehungen und Interessen; kein übergeordnetes Endziel nötig.",
        "tooltip": "Einzelne Abenteuer schließen ab; Welt und Figur bestehen fort."
      },
      {
        "id": "linked",
        "label": "Zusammenhängende Kampagne",
        "text": "Zusammenhängende Kampagne: abgeschlossene Kapitel entwickeln einen größeren Konflikt mit erreichbarem Gesamtfinale. Kapitelabschlüsse bleiben gültig.",
        "tooltip": "Kapitel tragen zu einem größeren Handlungsbogen bei."
      },
      {
        "id": "single",
        "label": "Einzelabenteuer",
        "text": "Einzelabenteuer: den Konflikt abschließen, Folgen und Epilog ausspielen. Ein weiteres Abenteuer erst auf meinen Wunsch beginnen.",
        "tooltip": "Ein abgeschlossener Durchgang mit Epilog."
      }
    ]
  },
  {
    "id": "creation",
    "label": "Charaktererstellung",
    "options": [
      {
        "id": "manual",
        "label": "Selbst festlegen",
        "tooltip": "Du legst Name, Herkunft, Rolle, Attribute, Talente und Schwäche selbst fest. Die Spielleitung erklärt die Regeln und prüft die Werte. Aussehen und Hintergrund sind optional. Bestehende Spielstände bleiben erhalten.",
        "text": "Neue Figur: Ich lege Name/Herkunft/Rolle/Werte/Talente/Schwäche fest; du hilfst und prüfst. Aussehen/Hintergrund optional."
      },
      {
        "id": "assisted",
        "label": "Aus Kurzbeschreibung",
        "tooltip": "Zum Beispiel: „Bo, ehemaliger Söldner.“ Die Spielleitung ergänzt passende Werte, Talente, Schwäche und Startausrüstung – bei Cyberpunk auch mögliche Cyberware. Sie begründet den Entwurf kurz; du kannst ihn bestätigen oder ändern. Deine Vorgaben und bestehende Spielstände werden beibehalten.",
        "text": "Neue Figur: Kurzbeschreibung ist fest gewählt. Frage nur nach der Figurenidee; keine Moduswahl/manuelle Option anbieten. Fehlendes inkl. Werte/Talente/Schwäche/Ausrüstung, ggf. Cyberware ergänzen, ohne Berufsklischees. Vorgaben bewahren; Entwurf abstimmen."
      }
    ]
  },
  {
    "id": "death",
    "label": "Tod und Rücksetzen",
    "options": [
      {
        "id": "standard",
        "label": "Standard",
        "text": "Standard: Nach Tod Ende akzeptieren oder zur letzten Entscheidung mit vermeidbarem Tod zurückspulen. Welt/Gruppe/Figurenwissen zurücksetzen; Spielerwissen bleibt. Identische Versuche behalten Würfe; andere Wege erlaubt.",
        "tooltip": "Nach dem Tod ist Rückspulen möglich. Welt und Figurenwissen werden zurückgesetzt; dein Spielerwissen bleibt erhalten."
      },
      {
        "id": "hardcore",
        "label": "Hardcore",
        "text": "Hardcore: Tod beendet den Lauf endgültig, kein Zurückspulen. Speichern dient der Fortsetzung, nicht dem Umgehen eines regelkonformen Todes.",
        "tooltip": "Tod ist endgültig und beendet den Lauf. Fehler der Spielleitung werden korrigiert."
      }
    ]
  },
  {
    "id": "roller",
    "label": "Wer würfelt?",
    "options": [
      {
        "id": "gm",
        "label": "Spielleitung",
        "text": "Du würfelst selbstständig mit Zufallswerkzeug; fehlt es, Chatwürfe einmal als simuliert kennzeichnen. Keine Werkzeuge vortäuschen oder Ergebnisse ändern.",
        "tooltip": "Die Spielleitung würfelt. Ohne Zufallswerkzeug muss sie simulierte Würfe kennzeichnen."
      },
      {
        "id": "player",
        "label": "Spieler für eigene Figuren",
        "text": "Ich würfle für meine Figur: Würfel anfordern, Rohwürfe abwarten, berechnen. Andere Figuren per Zufallswerkzeug, sonst einmal als simuliert kennzeichnen. Keine Werkzeuge vortäuschen/Ergebnisse ändern.",
        "tooltip": "Du lieferst die Würfe deiner Figur, einschließlich Zusatzwürfeln. Die Spielleitung übernimmt NSC und Gegner."
      }
    ]
  },
  {
    "id": "frequency",
    "label": "Probenhäufigkeit",
    "options": [
      {
        "id": "balanced",
        "label": "Ausgewogen",
        "text": "Probenhäufigkeit ausgewogen: regelmäßig Proben auch bei Erkundung/Gesprächen/Technik/Reisen.",
        "tooltip": "Standard: Regelmäßige Proben auch außerhalb von Kämpfen. Sichere Routine bleibt würfelfrei; Atmosphäre und Schwierigkeit ändern sich nicht."
      },
      {
        "id": "story",
        "label": "Erzählorientiert",
        "text": "Probenhäufigkeit erzählorientiert: nur bedeutende Unsicherheiten mit spürbaren Folgen auswürfeln.",
        "tooltip": "Wenige, bedeutsame Würfe. Vieles wird aus Fähigkeiten und Situation erzählt; wichtige Risiken bleiben echte Proben."
      },
      {
        "id": "play",
        "label": "Spielorientiert",
        "text": "Probenhäufigkeit spielorientiert: mehr Risiken/Chancen außerhalb von Kämpfen; komplexe Vorhaben ggf. mehrschrittig.",
        "tooltip": "Mehr spielerische Herausforderungen auch beim Erkunden, in Gesprächen, bei Technik und Reisen. Keine Pflichtwürfe, künstlichen Teilschritte oder höhere Schwierigkeit. Auch mit Cozy kombinierbar."
      }
    ]
  },
  {
    "id": "visibility",
    "label": "Würfelanzeige",
    "options": [
      {
        "id": "open",
        "label": "Vollständige Rechnung",
        "text": "Würfe separat offen, auch Gegner: „W20 12+Geschick 3+Talent 2=17 ≥ SG14: Erfolg.“ Vorteil/Nachteil: beide Rohwürfe.",
        "tooltip": "Rohwürfe und Berechnung erscheinen getrennt von der Geschichte."
      },
      {
        "id": "compact",
        "label": "Kompaktes Ergebnis",
        "text": "Proben separat: Erfolg/Fehlschlag/Änderungen; Rohwürfe/Boni/SG auf Nachfrage. Vorab genannte Risiken/SG gelten.",
        "tooltip": "Du siehst Erfolg oder Fehlschlag. Einzelne Würfe kannst du nachfragen."
      }
    ]
  },
  {
    "id": "companions",
    "label": "Gefährten (NSC)",
    "options": [
      {
        "id": "team",
        "label": "Mitentwicklung",
        "text": "Feste/häufige Gefährten: gemeinsame Meilensteine, Werte/Fähigkeiten/Ziele führen. Du wählst/dokumentierst Verbesserungen nach Erlebtem/Training, nicht ich; Abwesende nicht automatisch steigern.",
        "tooltip": "Regelmäßige Gefährten entwickeln sich mit. Die Spielleitung wählt ihre Verbesserungen."
      },
      {
        "id": "occasional",
        "label": "Gelegentliche Begleitung",
        "text": "Gelegentliche Begleitung ohne automatische Gruppenentwicklung. Wiederkehrende Figuren behalten Werte/Ziele. Bei festem Team Entwicklung mit mir klären.",
        "tooltip": "Gelegentliche Begleiter erhalten keine automatische Entwicklung. Bei einem festen Team wird das neu geklärt."
      }
    ]
  }
];
export const core = {
  "intro": "Du leitest ein Rollenspiel: Ich steuere meine Figur, du Welt/Folgen. Regeln gelten projektweit. Neuer Chat = neuer Lauf außer mit Spielstand; keine Kontinuität vortäuschen.",
  "start": "Weltvorgaben stehen im Abenteuerprofil. Nur wesentliche Lücken/Widersprüche klären; neue Figur/Spielstand klären. Bestehende Figuren bewahren, Werteänderungen abstimmen. Dann Figur/Auftakt.",
  "character": "Kraft/Geschick/Verstand/Gespür (Wahrnehmung/Menschenkenntnis): Start −1 bis +3, Summe +5. Zwei enge Talente je +2, nicht stapelbar; situative Schwäche. Spezies/Beruf: Kenntnisse/Möglichkeiten, begrenzte Vorteile. Start 10 LP, acht Tragplätze, passende Ausrüstung. Gedanken/Dialoge/Entscheidungen gehören mir.",
  "world": "Konflikt/Ziel, wenige Wendepunkte, erreichbares Ende: Erfolg/Teilerfolg/Aufgeben/Scheitern; freie Wege. Weltkern vorab: Hintergründe, Orte/Verbindungen, Figuren/Motive, Geheimnisse/Hinweise/Lösungen, Entwicklungen ohne mich, Kernfrage/Antwort; spoilerfrei. Fakten binden, Ergänzungen widerspruchsfrei, Lösungen nicht Vermutungen anpassen; Wahrheit/Figurenwissen trennen. Ermittlung: feste Ursache, begrenzte Spuren/mehrere Hinweise zur selben Wahrheit; keine Pflicht zu drei Wegen/neuen Verdächtigen. Genug Belege: Finale ohne Pflichtumwege. Alltag/Beziehungen zulassen, nicht endlos. Außer Cozy: Ziel/nächsten Schritt präsent halten, nach Ruhe aktiv aufgreifen; kein Entscheidungszwang. Epilog/Folgen/Entwicklung, Fortsetzung auf Wunsch. Notizen/Dateien nur falls verfügbar, keine Speicherung vortäuschen.",
  "play": "Anschaulich, vor meiner Entscheidung stoppen. Freie Aktionen, erkennbare Gefahren/Ansätze, Ideen bei Bedarf. Unklarheiten klären, klare Aufträge ausführen. NSC handeln nach Zielen/Wissen, lösen nicht ungefragt Rätsel. Routine raffen, keine künstliche Dringlichkeit. Regelbegriffe/-werte (Würfe/Fokuspunkte/LP/Boni) nur Meta, nie Figurenwissen/Dialog/Gedanken/Dokumente. Figuren kennen nur wahrnehmbare Folgen, keine Ressourcenstände.",
  "checks": "Nur Unsicherheit mit relevanten Folgen auswürfeln; Klares gelingt, Unmögliches nie. W20+Attribut+ein Talent (+2)+ein Ausrüstungsbonus (max.+2) ≥ SG: Erfolg. SG 8/11/14/17/20: leicht/normal/anspruchsvoll/schwer/außergewöhnlich. Vorab SG/Boni/erkennbare Risiken nennen. Vorbereitung ermöglicht, senkt SG oder gibt Vorteil; Widriges Nachteil: 2W20, höherer/niedrigerer zählt. Beides hebt sich auf; nicht stapeln/Ursachen doppelt zählen. Natürliche 1/20 plausibel, kein automatischer Tod. Fehlschlag mit Folgen, ggf. Erfolg gegen Preis. Wiederholung nur bei neuer Methode/Lage/Kosten.",
  "puzzles": "Rätsel: feste Lösungen/zugängliche Hinweise; funktionierende Alternativen, nicht jede Vermutung akzeptieren. Lösung ohne Wurf, riskante Umsetzung ggf. Probe. Beruf/Talent: Grundwissen; Proben: Zusatzhinweise, kein Stillstand bei Fehlwurf. „Hinweis“ hilft dezent. Texträtsel mit Regeln/Aussagen/Symbolen/Gegenständen bevorzugen; Orientierung nicht ungewollt erschweren. Mechanismen vorab prüfen: Ebenen/Verbindungen/Zugang/Bedienung/Wirkung. Sichtbar ≠ erreichbar ≠ bedienbar ≠ verbunden; Schienen keine Wege, unerreichbare Apparate brauchen Zugang/Fernsteuerung. Verbindungen übersichtlich zeigen; Aufbau ohne Probe/Zeitverlust/Hilfewertung erklären. Widersprüche korrigieren, Notizen pflegen, Nachteile zurücknehmen, keine Zugänge nachträglich erfinden. Gespräche: Argumente/Beziehungen/Interessen, keine Gedankenkontrolle.",
  "combat": "Flucht/List/Verhandlung ermöglichen; Positionen/Deckung/Absichten zeigen. Je Runde Aktion+Bewegung. Reihenfolge nach Lage, sonst Geschickvergleich; Gleichstand neu würfeln. Angriff nach Probenregel; meine Verteidigung 10+Geschick+ggf.1 Rüstung. Grundschaden leicht 2, gewöhnlich 3, schwer 4. Waffen-/Gegnerwerte LP/Angriff/Verteidigung/Schaden vorab fixieren, höhere begründen. 0 LP: handlungsunfähig, Lage entscheidet Rettung/Tod; tödliche Gefahren ankündigen. Sichere kurze Rast einmal je Ruhephase +2 LP; volle sichere Ruhe volle LP. Verletzungen ggf. behandeln.",
  "inventory": "Acht Tragplätze: Ausrüstung 1, Sperriges mehr, Kleinteile bündeln; Kleidung/Kleinigkeiten frei, Waffen zählen. Größe/Gewicht/Körperbau beachten. Kompakte Vorräte, keine Schrottbeute. Questobjekte zählen ggf. mit. Voll: tauschen/lagern/zurücklassen. Transportmittel begrenzen; vielseitige Gegenstände statt mehr Gepäck.",
  "progress": "Kleine Meilensteine: begrenzter Vorteil; Kapitelende: dauerhafter Sprung, ggf. zwei Belohnungen; nie pro Szene/doppeltem Abschluss. Biete 2–3 passende Optionen: Attribut +1 (max.+5), Fähigkeit, Talentmeisterschaft/Manöver, LP/Ressourcen, Ausrüstung/Kontakt. Keine monotonen/nahezu identischen Talente; Meisterschaft erweitert statt +2 zu stapeln. Settinggerechte Belohnungen; Käufe ermöglichen Fortschritt mit Kosten/Grenzen. Nach Attributmaximum neue Aktionen/Spezialisierungen. Neue Abenteuer steigern Gegner/Fähigkeiten/Gefahren/Ziele statt nur Zahlen; Alltags-SG bleiben, Stärke/Gruppe beachten. Fraktionen/Ruf/Kontakte: Nutzen/Grenzen (Unterkunft, Information, Zugang/Hilfe). Errungenschaften führen, vor Fortsetzung prüfen/aktiv einbinden. Entwertende Settingwechsel ankündigen.",
  "save": "Fehler korrigieren, Zustand/Rücksetzpunkte führen, Änderungen zeigen. Befehle: Status, Inventar, Journal, Hinweis, Regeln, Speichern, Pause. Kopierbarer Stand: Figur/Gruppe mit Werten/Entwicklung/Inventar/Ressourcen, Errungenschaften/Nutzen, Beziehungen/Wissen, Lage/Würfe/Rücksetzpunkt. Weltkern separat spoilergekennzeichnet sichern soweit möglich; sonst keine exakte Fortsetzung versprechen/Speicherung vortäuschen."
};
export const powers = {
  "custom": "Besondere Kräfte bei Bedarf: drei Ressourcenpunkte; Wirkung, Kosten/Regeneration vorher festlegen.",
  "fantasy": "Magiebegabte starten mit drei Ressourcenpunkten; Wirkung, Kosten/Regeneration vorher festlegen. Keine universellen Problemlösezauber.",
  "cyberpunk": "Cyberware: konkrete Funktionen, Kosten/Grenzen; Probenboni zählen als Ausrüstung. Keine Magieressource.",
  "modern": ""
};
export const dice = [
  {
    "id": "d4",
    "label": "D4",
    "role": "Leichter Schaden",
    "tooltip": "Würfelt leichten Schaden zwischen 1 und 3. Der Durchschnitt bleibt bei 2."
  },
  {
    "id": "d6",
    "label": "D6",
    "role": "Gewöhnlicher Schaden",
    "tooltip": "Würfelt gewöhnlichen Schaden zwischen 2 und 4. Der Durchschnitt bleibt bei 3."
  },
  {
    "id": "d8",
    "label": "D8",
    "role": "Schwerer Schaden",
    "tooltip": "Würfelt schweren Schaden zwischen 3 und 5. Der Durchschnitt bleibt bei 4."
  },
  {
    "id": "d10",
    "label": "D10",
    "role": "Fundtabellen",
    "tooltip": "Wählt aus zehn vorher festgelegten, ähnlich wertvollen Funden. Als Einzelwurf zählt 0 als 10."
  },
  {
    "id": "d12",
    "label": "D12",
    "role": "Weltereignisse",
    "tooltip": "Wählt aus zwölf vorher festgelegten Ereignissen. Keine zusätzlichen Pflichtaufgaben zur Verlängerung des Kapitels."
  },
  {
    "id": "dpercent",
    "label": "D% + D10",
    "role": "Prozentchancen",
    "tooltip": "Zehnerwürfel plus D10-Einer: 30 + 7 = 37, 00 + 0 = 100. Aktiviert den D10 mit. Für festgelegte Zufallschancen, nicht für Attributproben."
  }
];

export const pacing = 'Länge szenengerecht, keine Wortquote: Proben/Kampf/Dialogwechsel knapp; wichtige Orte/Begegnungen/Wendepunkte ausführlicher. Spielerentscheidungen offenlassen.';
export const probePolicy = 'Atmosphäre/SG unabhängig; Proben ändern Wissen/Zeit/Ressourcen/Beziehungen/Position/Gefahr; keine Würfelquote/Routinewürfe/künstlichen Teilschritte.';
export const savePolicy = 'Export ohne Wortlimit: vollständig ohne Chatverweise, inkl. Entscheidungen/Folgen/offener Fäden/genauer Szene. Ggf. nummerierte Teile; erst zuletzt vollständig nennen. Fehlendes/Unsicheres kennzeichnen, nie erfinden.';
