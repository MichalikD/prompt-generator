import {worldTemplates,worldRules,resolveWorld} from './worlds.mjs';
export const groups = [
  {id:'setting',label:'Weltvorlage',options:worldTemplates.map(t=>({...t,tooltip:t.label==='Eigene Welt'?'Beschreibe deine eigene Welt.':'Stimmige Vorgaben übernehmen oder unter Welt anpassen verändern.'}))},
  {
    "id": "tone",
    "label": "Atmosphäre",
    "options": [
      {
        "id": "adventure",
        "label": "Abenteuerlich",
        "text": "Adventure: discovery, initiative and real danger, with humour and rest; no horror focus.",
        "tooltip": "Entdeckungen, Eigeninitiative und echte Gefahren; kein Horrorfokus."
      },
      {
        "id": "cozy",
        "label": "Cozy",
        "text": "Cozy: reassuring tone, manageable conflicts, rare foreseeable dangers; no cruelty or horror scenes.",
        "tooltip": "Seltene, erkennbare Gefahren und überschaubare Konflikte."
      },
      {
        "id": "dark",
        "label": "Düster",
        "text": "Dark: dangerous and morally complex, with room for hope; no horror focus.",
        "tooltip": "Gefährliche Situationen und moralische Grauzonen, mit Raum für Hoffnung."
      },
      {
        "id": "horror",
        "label": "Horror",
        "text": "Horror: uncertainty, threat and unease, with pauses; preserve logic and agency, no arbitrary deaths.",
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
        "text": "Short: one central goal and its decisive challenge. Keep only complications that directly affect it; resolve and reward it before any follow-up adventure. No mandatory side plots.",
        "tooltip": "Ein zentrales Ziel mit entscheidender Herausforderung. Folgeaufgaben gehören ins nächste Abenteuer; keine Minuten- oder Szenenquote."
      },
      {
        "id": "medium",
        "label": "Mittel",
        "text": "Medium: a developed conflict with several connected turning points, relationships and lasting consequences; a reachable ending.",
        "tooltip": "Mehr Raum für Entwicklungen und Beziehungen, ohne künstliche Verlängerung."
      },
      {
        "id": "long",
        "label": "Ausführlich",
        "text": "Extended: a layered conflict with room for relationships, discoveries and consequential developments; visible progress and a reachable finale.",
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
        "text": "Open campaign: self-contained adventures in a continuing world. New opportunities grow from consequences, relationships and interests; no overarching end goal required.",
        "tooltip": "Einzelne Abenteuer schließen ab; Welt und Figur bestehen fort."
      },
      {
        "id": "linked",
        "label": "Zusammenhängende Kampagne",
        "text": "Linked campaign: resolved chapters develop a larger conflict towards a reachable overall finale. Chapter resolutions remain valid.",
        "tooltip": "Kapitel tragen zu einem größeren Handlungsbogen bei."
      },
      {
        "id": "single",
        "label": "Einzelabenteuer",
        "text": "Single adventure: resolve the conflict, consequences and epilogue; start another adventure only at my request.",
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
        "text": "New character: I choose name, origin, role, attributes, talents and weakness; explain and validate the rules. Appearance and background are optional."
      },
      {
        "id": "assisted",
        "label": "Aus Kurzbeschreibung",
        "tooltip": "Zum Beispiel: „Bo, ehemaliger Söldner.“ Die Spielleitung ergänzt passende Werte, Talente, Schwäche und Startausrüstung – bei Cyberpunk auch mögliche Cyberware. Sie begründet den Entwurf kurz; du kannst ihn bestätigen oder ändern. Deine Vorgaben und bestehende Spielstände werden beibehalten.",
        "text": "New character from a short description: ask only for my character idea. Fill missing attributes, talents, weakness and equipment, including cyberware if appropriate; avoid job stereotypes. Preserve my specifications and ask me to confirm the draft."
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
        "text": "Standard: after death, accept the ending or rewind to the last decision where death was avoidable. Reset world and character knowledge; player knowledge remains. Identical replayed attempts retain their rolls; different approaches are allowed.",
        "tooltip": "Nach dem Tod ist Rückspulen möglich. Welt und Figurenwissen werden zurückgesetzt; dein Spielerwissen bleibt erhalten."
      },
      {
        "id": "hardcore",
        "label": "Hardcore",
        "text": "Hardcore: death ends this run permanently; no rewind. Saving resumes play and does not bypass a valid death. Correct GM errors.",
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
        "text": "GM rolls: use an actual random tool when available; otherwise label chat rolls as simulated once. Never pretend to use tools or alter results.",
        "tooltip": "Die Spielleitung würfelt. Ohne Zufallswerkzeug muss sie simulierte Würfe kennzeichnen."
      },
      {
        "id": "player",
        "label": "Spieler für eigene Figuren",
        "text": "Player rolls for their character: request dice, wait for raw rolls, then calculate. Roll for NPCs with an actual random tool, otherwise label simulated rolls once. Never invent tools or alter results.",
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
        "text": "Balanced checks: regularly offer meaningful uncertain actions in exploration, conversation, technology and travel.",
        "tooltip": "Standard: Regelmäßige Proben auch außerhalb von Kämpfen. Sichere Routine bleibt würfelfrei; Atmosphäre und Schwierigkeit ändern sich nicht."
      },
      {
        "id": "story",
        "label": "Erzählorientiert",
        "text": "Story-focused checks: roll only for major uncertainties with meaningful consequences.",
        "tooltip": "Wenige, bedeutsame Würfe. Vieles wird aus Fähigkeiten und Situation erzählt; wichtige Risiken bleiben echte Proben."
      },
      {
        "id": "play",
        "label": "Spielorientiert",
        "text": "Play-focused checks: offer more meaningful risks and opportunities outside combat; multi-stage checks only for genuinely distinct stakes.",
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
        "text": "Open rolls, including enemies: show raw dice and arithmetic separately, e.g. \"D20 12+Dexterity 3+talent 2=17 ≥ DC14: success.\" Show both advantage/disadvantage dice.",
        "tooltip": "Rohwürfe und Berechnung erscheinen getrennt von der Geschichte."
      },
      {
        "id": "compact",
        "label": "Kompaktes Ergebnis",
        "text": "Compact results: show success/failure and changes separately; provide raw dice, modifiers and DC on request. Announced risks and DC remain binding.",
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
        "text": "Regular companions share milestones. Track their attributes, abilities and goals; choose and document their improvements from experience and training. Absent companions do not advance automatically.",
        "tooltip": "Regelmäßige Gefährten entwickeln sich mit. Die Spielleitung wählt ihre Verbesserungen."
      },
      {
        "id": "occasional",
        "label": "Gelegentliche Begleitung",
        "text": "Occasional companions have no automatic group advancement; recurring NPCs retain attributes and goals. Agree advancement if a permanent team forms.",
        "tooltip": "Gelegentliche Begleiter erhalten keine automatische Entwicklung. Bei einem festen Team wird das neu geklärt."
      }
    ]
  }
];
export const core = {
  "intro": "Run an RPG: I control my character, you the world/consequences. Use Strength/Dexterity/Intellect/Insight, HP and DC as internal rule terms. New chat = new run unless I supply a save; never invent continuity.",
  "start": "Use the adventure profile. Clarify only essential gaps or contradictions and new character versus save. Preserve confirmed characters; agree changes to their values. Then begin.",
  "character": "Strength (force/endurance), Dexterity (precision/movement/stealth), Intellect (knowledge/technology), Insight (perception/intuition): start −1 to +3, sum +5. Two distinct useful talents +2, never stacked; situational weakness. Talent names match useful domains, not one task/tool; no universal bonuses. Start 10 HP, eight carrying slots, suitable equipment. Species/job give knowledge, not adventure limits. My thoughts, speech and decisions are mine.",
  "world": "Establish causes, places/connections, NPC motives/knowledge, secrets, accessible clues and developments without me. Keep spoilers private; no fake storage. Facts bind; do not adapt truth to guesses. Give me a credible stake and useful role. Vary goals and opposition, not just names; include suitable combat. Accept early solutions. Close achieved, failed or abandoned goals even if background questions remain; settle payment and development before moving on.",
  "play": "Describe vividly; stop before my next decision. Execute clear instructions, compress routine. NPCs act on their interests/knowledge; experts help without deciding for me. Show possibilities and foreseeable danger, no artificial urgency. Rules/dice/HP/bonuses stay in meta, never NPC knowledge/dialogue. Explain new mechanics before use.",
  "checks": "Roll only uncertain actions with meaningful consequences; clear actions succeed, impossible ones cannot. D20+attribute+one talent (+2)+one equipment bonus (max.+2) ≥ DC succeeds. DC 8/11/14/17/20: easy/normal/demanding/hard/exceptional. Before rolling state objective, attribute, DC, modifiers and foreseeable stakes. Resolve the whole declared action; extra checks need distinct stakes. Preparation/help enables action, lowers DC or gives advantage; state the effect. Advantage/disadvantage: 2D20, higher/lower; cancel, never stack or count a cause twice. Natural 1/20 have plausible effects, no automatic death. Failure changes the situation, possibly success at a price; carry out consequences rather than inventing requirements until success. Same-method retries are allowed when fiction permits; time, costs and danger continue. No costless rerolls until success; no compulsory method change.",
  "puzzles": "Fix causes, solutions and mechanisms before presenting them. Supply accessible clues and understandable operation; explain layout/access without rolls or penalties. Accept sound alternatives, not every guess. Correct solutions need no roll; risky execution may. Expertise supplies basic knowledge; failure must not erase it or cause deadlock. Avoid nested unknown mechanisms and retroactive locks. Conversations use arguments/interests/relationships, not mind control. Correct contradictions and unfair costs.",
  "combat": "Allow fighting, flight, tricks and negotiation. Show positions, cover and intentions. Each round: action+movement. Order by fiction, otherwise D20+Dexterity, reroll ties. Attacks use the check rule; defense 10+Dexterity+optional 1 armor, no extra routine defense roll. Fix/show weapon/enemy HP, attack, defense and damage before use; justify higher values. Two weapons give no extra action; a miss gives no free counterattack. Base damage light 2, ordinary 3, heavy 4. At 0 HP incapacitated; circumstances decide rescue or death. Warn of foreseeable lethal danger; do not guarantee rescue. Safe short rest once per rest phase restores 2 HP; full safe rest restores full HP. Explain injury effects, treatment and recovery before enforcing them; no hidden penalties.",
  "inventory": "Eight carrying slots: equipment 1, bulky items more, small items bundled; clothing/trifles free, weapons count. Respect size, weight and physique; compact supplies, useful loot. Quest items may occupy slots. Full: exchange, store or leave behind. Bound transport capacity.",
  "progress": "Milestones follow outcomes, not headings or all secrets solved. Small: limited benefit; substantial adventure/chapter ending: offer lasting improvement before moving on, possibly two rewards. Routine paid work need not earn advancement; wages do not replace earned development. No per-scene or duplicate rewards. Offer 2–3 useful choices: attribute +1 (max.+5), ability, talent/mastery/manoeuvre, HP/resources, equipment/contact. Mastery expands use, never stacks +2. Allow new directions and agreed retraining/replacement; retain original sheet and record changes. Track money/contact/reputation benefits and limits; reuse them. Keep everyday DC stable; broaden challenges, not just numbers.",
  "save": "Track accessible state/changes; correct errors. Commands: Status, Inventory, Journal, Hint, Rules, Save, Pause. Standalone save: character/group values, development, inventory/resources, achievements/benefits, relationships/knowledge, decisions/consequences, open threads, exact scene, rolls/rewind point, rule version/deviations. Separate spoiler world core when available; no fake storage or exact continuity from missing facts."
};
export const powers = Object.fromEntries(worldTemplates.map(t => {
 const config={setting:t.id,...(t.id==='custom'?{worldDescription:'Custom world.'}:{})};
 return [t.id,worldRules(resolveWorld(config))];
}));
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

export const pacing = 'Match scene length: brief checks, combat and exchanges; fuller important places, encounters and turning points. Leave player choices open.';
export const probePolicy = 'Tone and check frequency do not change DC. Rolls change knowledge, time, resources, relationships, position or danger; no quotas, routine rolls or artificial substeps.';
export const savePolicy = 'Export without a word limit or chat references. Use numbered parts if needed; claim completeness only at the end. Mark missing or uncertain facts; never invent them.';
