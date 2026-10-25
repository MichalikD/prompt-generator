# Vielfalt, Solospiel und Waffen · 0.14

## Was sich ändert

Begegnungen müssen einer einzelnen Figur tatsächliche Handlungschancen geben.
Ein erklärbarer Angriff auf drei gemeinsam handelnde Bewaffnete ist noch keine
brauchbare kämpferische Gelegenheit. Vorbereitung soll Sichtlinien, Reihenfolge,
Zugang oder die Zahl gleichzeitig handelnder Gegner verändern. Ein beobachteter
Wachablauf kann einen Gegner isolierbar machen; Unterstützung erhält eigene Züge.
Erfolgreiches Ausweichen beendet die konkrete Bedrohung. Unabhängige Entwicklungen
bleiben möglich, dieselbe Sperre wird aber nicht auf den Umweg verschoben.

Die Welt bleibt gefährlich. Nicht jeder Kampf ist fair, nicht jede Gruppe
überwindbar und nicht jede Begegnung ein Kampf. Unterschiedliche Vorhaben,
brauchbare Entdeckungen, Tiere und eine zur Welt passende Verfügbarkeit von
fahrbereiter Technik verbreitern die Möglichkeiten. Erworbene Stärke kann
gewöhnliche Gegner leichter machen; Gegner steigen nicht automatisch mit.

## Verlässliche Kampfauflösung

Die Spielleitung behält Reihenfolge, Positionen, LP, Verteidigung, vollständige
Angriffsformeln, Schaden, Effekte und relevante Munition im zugänglichen Kontext.
Bei offener Anzeige stehen sichtbare Gegner-LP aktuell/maximal und Verteidigung
vor einer taktischen Entscheidung. Die Abfolge gilt für alle Beteiligten:

1. Ziel, Attribut, ein Talent, einen Ausrüstungsbonus und Umstände ansagen.
2. Rohwurf erhalten und mit Verteidigung vergleichen; Gleichstand trifft.
3. Bei Treffer den ausgewählten Schadenswürfel auflösen, dann LP verändern.
4. Den nächsten tatsächlichen Zug abwickeln; kein kostenloser Gegenangriff.

Die Grundwerte bleiben 10 Start-LP, Verteidigung 10 + Geschick + gegebenenfalls
1 Rüstung und Schaden 2/3/4. Deckung gibt normalerweise Nachteil, keine erfundenen
Verteidigungsboni. Massive Deckung kann einen Schuss ganz verhindern.
Ein Fehlschlag bedeutet keinen wirksamen Treffer; eine Kugel kann an Panzerung
oder Deckung scheitern, statt auf kurze Distanz grotesk danebenzugehen.
Ein neues Trefferqualitätsmodell mit Schaden 0 wurde nicht eingeführt.

Die Grund-SG bleiben 8/11/14/17/20. Abwandlungen werden mit Ursache erklärt;
eine berechnete Verteidigung von 13 ist keine neue SG-Stufe.

| Auswahl | Tatsächlicher Schaden nach Treffer |
| --- | --- |
| W4, leicht | 1 → 1; 2–3 → 2; 4 → 3 |
| W6, gewöhnlich | 1 → 2; 2–5 → 3; 6 → 4 |
| W8, schwer | 1–2 → 3; 3–6 → 4; 7–8 → 5 |
| Kategorie nicht ausgewählt | Fester Grundschaden dieser Kategorie |

Spieler würfeln ihre ausgewählten Schadenswürfel selbst. Die Spielleitung wartet
auf sie, bevor Schaden oder der nächste Zug feststehen. NSC und Kräfte nutzen
dieselbe Zuordnung. Ein Flächeneinsatz würfelt seinen Schaden einmal, soweit
keine andere bestätigte Regel gilt. Gewählte Fund-, Ereignis- und Chancenwürfel
werden bei passendem Anlass mit vorab festgelegter Tabelle/Chance genutzt;
es gibt keine Pflicht, jeden Würfel in jedem Abenteuer einzusetzen.

## Schlanke Waffenprofile

Im Editor kann Ausrüstung ausdrücklich ein Waffenprofil erhalten. Es ergänzt
die bisherigen Angaben und wird nicht aus einem vorhandenen Namen abgeleitet:

```json
{
  "name": "Reisepistole",
  "quantity": 1,
  "slots": 1,
  "bonus": 0,
  "description": "Robuste Handfeuerwaffe.",
  "weapon": {
    "damage": "ordinary",
    "range": "Bis 20 m normal; über 20 bis 40 m Nachteil; darüber kein wirksamer Angriff.",
    "handling": "Eine Hand, in engem Raum nutzbar.",
    "feature": "Die zweite Hand bleibt zum Halten frei; keine zweite Aktion.",
    "limits": "Munition und Lärm; Nachteil bei unmittelbar bedrohlichem Nahkämpfer."
  }
}
```

`damage` ist `light`, `ordinary` oder `heavy`; die anderen vier Felder sind
nichtleere Beschreibungen. Waffenreichweite 0 ist kein unbegrenzter Angriff.
Das davon getrennte bisherige Reichweitenformat für Fähigkeiten bleibt erhalten.

Das Erstellungstemplate enthält gültige JSON-Beispiele für eine Waffe mit Profil
und ein gewöhnliches Werkzeug ohne Profil. Feste Formatcodes wie `heavy` bleiben
auch bei deutscher Spielsprache Englisch; Zahlen, Würfel oder Erläuterungen gehören
nicht in dieses Feld. Die frei beschriebene Schadensangabe einer Fähigkeit ist
davon unabhängig. Beispielgegenstände werden passend zur Figur ersetzt oder entfernt.

Vorlagen für Schwert, Dolch, Bogen, Pistole, Schrotflinte, Gewehr und automatische
Waffe sind ausdrücklich übernommene, anpassbare Vorschläge. Sie ändern weder
Name noch Beschreibung, Plätze, Anzahl oder Bonus. Schrotflinte und Gewehr haben
beispielsweise verschiedene wirksame Distanzen und Handhabung; die automatische
Waffe kann Munition und Aktion für Niederhalten einsetzen. Dieses verursacht
keinen Schaden oder Gratisangriff: Betroffene offene Angriffe durch den vorab
bestimmten Bereich haben bis zum nächsten eigenen Zug Nachteil. Volle Deckung,
Bereich, Verbündete, Verbrauch und Ende sind definiert. Eine bestehende Waffe
erhält diese Technik nicht automatisch; sie kann auch ausdrücklich gelernt werden.

Template, Validierung, JSON, Starttext und Spielübersicht führen das Profil
gemeinsam. Dokumentversion 3 bleibt unverändert: `weapon` ist optional; vorhandene
Dokumente erhalten keine stillen neuen Eigenschaften. In laufenden Bögen bleibt
der ursprüngliche Start getrennt. Die Übersicht zeigt den passenden Würfel als
bedingt ausgewählt, da sie keine automatische Verbindung zur Würfelauswahl oder
zum Spielchat hat.

## Entwicklung aus eigenem Handeln

Nach einem erklärten Meilenstein folgen konkrete Optionen oder der benannte,
bereits nutzbar gewährte Vorteil. Ein bloßes „für später vermerkt“ genügt nicht.
Nur ein ausdrücklich verschobener Spielerentscheid bleibt als zugeordnete Wahl
offen. Bedeutungsvolle Erkundung, riskante Bergung, zugänglich gemachtes Wissen
und selbst entwickelte Vorhaben brauchen keinen Auftraggeber.

Vielseitige Funde dürfen Eigentum bleiben und Einkommen, Nutzung oder Beziehungen
ermöglichen. Weder Pflichtverkauf noch automatische Hauptquest gehören dazu.
Die Spielleitung trennt gewöhnlichen Lohn, praktischen Entwicklungsgewinn und
noch geschuldete Wahl; denselben Vorteil zählt sie nicht doppelt. Talentbonus +2
und Attributmaximum +5 bleiben erhalten; Wachstum kann neue Aktionen eröffnen.

## Zahlenvergleich

`node scripts/combat-model.mjs` enumeriert die möglichen Würfelverläufe bis 24
Runden. Es ist ein Entwicklungswerkzeug, kein Werkzeug, das der Spielchat aufruft.
Annahmen: Held zuerst, dann gegebenenfalls Verbündeter, dann überlebende Gegner;
alle Gegner greifen den Helden an. Kein Rückzug, keine Moral oder Geometrie.
Der Verbündete wird nicht selbst angegriffen. Überraschung bedeutet hier einen
zusätzlichen vorbereiteten Auftakt mit Vorteil, bevor die normale Reihenfolge
beginnt; die Spielleitung muss einen solchen Vorteil aus der tatsächlichen Lage
ableiten. Diese Annahmen begrenzen die Übertragbarkeit.

Startfigur: 10 LP, Angriff +4, Verteidigung 13, gewöhnlicher Schaden mit W6.
Trainierter Gegner: 6 LP, Angriff +3, Verteidigung 12, ebenfalls W6.
Schwächerer Gegner: 4 LP, Angriff +1, Verteidigung 11, leichter Schaden mit W4.
Erfahrener Spezialist: 14 LP, Angriff +7, Verteidigung 16, schwerer Schaden mit W8.
Alle Werte sind Beispielkonstellationen, keine verbindlichen Gegnerklassen.

| Konstellation | Sieg im vereinfachten Modell |
| --- | ---: |
| Startfigur gegen einen trainierten Gegner | 92,43 % |
| Startfigur gegen drei gemeinsam handelnde trainierte Gegner | 1,35 % |
| Startfigur mit Überraschung und gleichwertigem Helfer gegen zwei | 92,65 % |
| Ein trainierter Gegner erfolgreich isoliert, Überraschungsauftakt | 97,72 % |
| Startfigur gegen drei schwächere Gegner | 40,35 % |
| Erfahrener Spezialist gegen dieselben drei schwächeren Gegner | 99,46 % |

Ein guter Angriffswert allein kompensiert also nicht jede gegnerische Aktionszahl.
Die Zahlen begründen keine pauschalen Mehrfachangriffe oder globale LP-Erhöhung.
Neue Waffenreichweiten, Niederhalten und erzählerische Hilfe werden durch dieses
vereinfachte Modell nicht vollständig balanciert.

## Prüfung und Grenzen

- 76 automatische Tests erfolgreich; neue Tests prüfen Profile, verlustfreie
  Übergaben, ursprüngliche Bögen, ungültige Felder, Trefferwahrscheinlichkeit,
  tatsächliche Schadensverteilungen und den Vergleich verschiedener Aktionszahlen.
- Generatorprüfung, Pluginprüfung, Skillvalidator und Paketbau erfolgreich.
- DOM-Prüfungen: bisheriger Vorbereitungsablauf sowie optionales Profil,
  ausdrückliche Vorlagenübernahme, Validierung, Felder, Spieltab, Verwerfen/
  Übernehmen, Notizen und ursprünglicher Bogen. Keine echte Browser-Sichtprüfung.
- Unabhängige Szenen mit dem revidierten Skill: Roboterkampf fordert W20 und W6
  an, rechnet 11 + 2 + 2 = 15 und W6 1 → 2 Schaden, führt LP 6 → 4 und den
  gegnerischen Zug mit Deckung fort. Bergung bietet Entwicklung ohne Erinnerung.
  Beobachtung einer Dreiergruppe eröffnet einen zusammenhängenden Zugang mit
  nachvollziehbar gesenktem SG statt zwingendem Frontalkampf.
- Ein gesonderter Szenenstand mit stärkerer Figur wickelt einen Treffer mit W8,
  einen kampfunfähigen Gegner, die beiden verbleibenden gegnerischen Züge und
  einen gegnerischen W4-Treffer mit verbleibenden Spieler-LP ab.

Das sind lokale Nachweise für Abwicklung und Möglichkeiten, keine Garantie für
fortlaufende Vielfalt. Eine Fortsetzung bot erneut eine Rettung neben einem
Karren an, diesmal mit einem Tier als Gefahr. Das zeigt noch keine breit gelöste
Wiederholung. Langfristiges Spielgefühl, Waffenbalance und konsequente Umsetzung
im normalen Chat brauchen weiterhin menschliches Spielen. Private Quellchats
und rohe Szenenantworten werden nicht ins öffentliche Repository übernommen.
