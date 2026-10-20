# Weltvorlagen und kurze Abenteuer · 0.5.0

## Welt wählen und bewusst anpassen

Der erste Vorbereitungsschritt enthält zehn Vorlagen: Fantasy, Cyberpunk,
Science-Fiction/Weltraum, historisches Abenteuer, Gegenwart, Wilder Westen,
feudales Japan, mythologische Götterwelt, Endzeit und eigene Welt.

Vorlagen liefern zusammenpassende Vorgaben für Epoche, Technik, besondere Kräfte
und Gesellschaft. Die Zusammenfassung zeigt die wirksamen Annahmen. „Welt anpassen“
bleibt zunächst eingeklappt; bei einer eigenen Welt öffnet es sich für die
notwendige Beschreibung. Andere Vorlagen sind ohne Detailbearbeitung spielbereit.

- Eigenständige Welt, Inspiration und bekanntes Universum sind getrennte Grundlagen.
  Für die letzten beiden ist eine Referenz mit gewünschten Einflüssen oder
  Abweichungen erforderlich. Inspiration übernimmt keinen Kanon automatisch.
- Änderungen an Epoche, Technik, Kräften, Gesellschaft, Mythologie und Figurenart
  bleiben beim Vorlagen- und Moduswechsel erhalten. Leere Anpassungsfelder erben
  die jeweils gewählte Vorlage. Ein ausdrücklicher Reset entfernt Anpassungen;
  die vorhandene Figur wird dabei nicht gelöscht.
- Erkennbare strukturelle Abweichungen benötigen eine bewusste Bestätigung:
  beispielsweise ein Weltraumwestern, historisches Cyberpunk oder göttliche
  Spielfiguren mit vereinbarten Grenzen. Änderungen an Weltfeldern heben die
  Bestätigung auf; eine harmlose Änderung am Ausgabemodus tut das nicht.
- Göttliche Figuren und „keine übernatürlichen Kräfte“ widersprechen einander.
  Dafür reicht die Mischungsbestätigung nicht: eine Angabe muss geändert werden.
- Die Prüfung ist eine lokale Regelprüfung, kein KI-Dienst. Sie erkennt nicht jede
  Widersprüchlichkeit in Freitext. Offene Konflikte zwischen ausdrücklichen
  Vorgaben muss die Spielleitung vor dem Auftakt klären. Bewusste Anpassungen
  ersetzen entgegenstehende Vorlagenannahmen; kompatible Vorgaben bleiben bestehen.
- Götterwelten beginnen standardmäßig mit griechischer Mythologie und sterblichen
  Figuren. Andere Pantheons und begrenzte halbgöttliche/göttliche Figuren sind
  möglich; Fähigkeiten und spielbare Grenzen werden vor dem Start vereinbart.

Die historische Vorlage beginnt im europäischen Industriezeitalter, Japan mit
Sengoku-orientierten Annahmen, Western in einer eigenständigen Grenzgesellschaft
mit Schusswaffen. Das sind bearbeitbare Vorgaben, keine Behauptung exakter
historischer Simulation. Die Fantasyvorlage importiert keine reale Geografie.

## Gemeinsames Weltprofil

`src/worlds.mjs` ist die gemeinsame Quelle. Profilversion **2** enthält die
aufgelöste Welt. Kompakter Projektprompt, Plugin-Startpaket und Charaktertemplate
bekommen identische wirksame Angaben. Fähigkeitsregeln richten sich nach den
gewählten Kräften, nicht nach einem starren Settingnamen: Gegenwart kann Magie
zulassen, Fantasy kann ausdrücklich ohne Magie auskommen. Die alten, widersprechenden
Kräfteverbote werden dann nicht zusätzlich ausgegeben.

Weltänderungen heben die Bestätigung eines vorbereiteten Bogens auf, erhalten
aber dessen Werte und Gegenstände. Der Spieler prüft ihn erneut. Es gibt weiterhin
keine automatische Speicherung und keinen Konfigurationsimport.

## Engere kurze Abenteuer und vielfältigere Handlung

„Kurz“ umfasst ein zentrales Ziel und die entscheidende Herausforderung. Nur
unmittelbar relevante Komplikationen gehören dazu. Nach dessen Auflösung folgen
Abschluss und Entwicklung; eine weitere substanzielle Aufgabe eröffnet ein neues
Abenteuer. Schon der ursprüngliche Auftrag soll nicht mehrere Missionen bündeln.
Keine Wort-, Minuten-, Kampf- oder Szenenquote und keine künstliche Verlängerung.

Die Spielleitung variiert Ziele, Gegenspielerinteressen und Lösungen statt nur
Namen oder Kulissen. Nicht jede Gegenseite handelt aus einem Missverständnis,
nicht jede Aufgabe dreht sich um Reparaturen, Eigentumsrechte oder eingeklemmte
Personen. Persönliche Beteiligung kann aus offenen Hintergründen, Kulturen,
Beziehungen und Entdeckungen wachsen, ohne vorgeschriebene Bestimmung.

Verhandlungen dürfen erfolgreich sein; Gegner können aber bewusst unvereinbare
Ziele verfolgen. Wenn Action gewählt ist, müssen Kampf, List oder Flucht für die
Figur tragfähige Möglichkeiten bieten. Ein alleiniger Nahkämpfer soll dafür
nicht regelmäßig mehrere überlegene Fernkämpfer frontal angreifen müssen.
Gültige Fehlschlagfolgen bleiben bis zu einer glaubhaften Auflösung bestehen.

Die Regeln sichern keine Einzigartigkeit über fremde, unzugängliche Chats hinweg.
Sie geben keine garantierte Erzählqualität. Zahlenregeln, Bogenformat 3,
Würfelbedienung, Probenhäufigkeit und Antwortlängenvorgabe bleiben erhalten.

## Prüfung und nächster Test

Automatisiert: alle festen Vorlagen-/Regel-/Würfelkombinationen, gleiche Profile
beider Ausgaben, lange Freitexte, angepasste Kräfte ohne alte Verbote, bewusste
Mischungen und harte Widersprüche, Kanon/Inspiration und Versionsgleichheit.
Zusätzlich wurde der geführte Ablauf lokal im DOM geprüft: eingeklappte Felder,
Bestätigung, Erhalt von Anpassungen, Moduswechsel, Bogenübergabe und erneute
Bogenbestätigung, eigene Welt und Rücksetzen. Das ist kein vollständiger visueller
Browsertest und kein Modell-Spieltest.

Für den nächsten menschlichen Test eine Welt nach Interesse wählen, mit kurzem
Umfang und offener Kampagne. Wichtig sind ein befriedigender erster Abschluss,
eine erkennbare neue Aufgabe und tatsächlich andere Herausforderungen. Kein
weiterer Fantasy-Pflichtdurchlauf und kein Volltest pro kleinem UI-Detail.

## Rückkehrpunkt

Repository vor diesem Schritt: `1a5fd1a` (Merge von PR #9), Regeln 0.4.0.
Private Pluginrelease vorher: `pluginrel_6ad76546ef348191bc643d2de89c2fed`.
Ein Revert des PR nimmt die Website nach erneutem Merge/Deployment zurück,
ändert aber das installierte Plugin nicht. Eine inhaltliche Plugin-Rückkehr
verwendet die alte Regelquelle unter einer höheren freien Semver und bewahrt
Identität, Metadaten und vollständigen Startvorschlag. Generator und Paketversion
dabei synchronisieren. Keine stille Regelumstellung mitten im laufenden Chat.
