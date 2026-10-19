import { optionNames } from './language.mjs';
// Gemeinsame narrative Daten; beide Ausgabewege verwenden dieselbe Quelle.
export const profileIds = ['setting', 'tone', 'scope', 'continuation'];
export const focuses = [
 {id:'discovery', label:'Entdeckung', tooltip:'Neue Orte, Zusammenhänge und Möglichkeiten entdecken.', text:'Discover new places, connections and possibilities.'},
 {id:'mystery', label:'Ermittlung und Rätsel', tooltip:'Nachvollziehbare Spuren und verlässliche Rätsel untersuchen.', text:'Investigate coherent clues and reliable puzzles.'},
 {id:'social', label:'Beziehungen und Verhandlung', tooltip:'Interessen, Beziehungen und Vereinbarungen gestalten.', text:'Develop interests, relationships and workable agreements.'},
 {id:'action', label:'Action und Gefahr', tooltip:'Gefahren durch Kampf, List, Flucht oder andere passende Mittel begegnen.', text:'Face real danger through combat, tricks, flight or other suitable approaches.'},
];
export const narrativePolicy = 'Give my involvement a credible stake and useful role. My job and talents do not define every adventure. Unknown history may be discovered consistently; confirmed facts and explicit exclusions bind. Do not decide my present feelings, speech or choices. NPCs have their own motives and may disagree or act without me. Accept refusal and offer different opportunities if I still want adventure. Vary challenges and relationships; action includes real opposition and combat when appropriate, not only technical obstacles. Develop medium adventures beyond one rescue or repair through consequential choices, not additional checks. Campaign links must not postpone every answer or invalidate resolved conflicts. Compress agreed routine; resume meaningful events after rest without forcing decisions. No images or image tools unless requested.';

export function createProfile(config) {
 const worldDescription = readText(config.worldDescription, 'Weltbeschreibung');
 const wishes = readText(config.wishes, 'Eigene Vorgaben');
 if (config.setting === 'custom' && !worldDescription) throw new Error('Bitte beschreibe deine eigene Welt. Ein kurzer Satz genügt.');
 const focus = config.focus ?? [];
 if (!Array.isArray(focus) || focus.length > 2 || new Set(focus).size !== focus.length || focus.some(id=>!focuses.some(f=>f.id===id))) throw new Error('Bitte höchstens zwei unterschiedliche Spielschwerpunkte wählen.');
 return {version:1, ...Object.fromEntries(profileIds.map(id=>[id,config[id]])), worldDescription, wishes, focus:[...focus]};
}
function readText(value, label) {
 if (value === undefined) return '';
 if (typeof value !== 'string') throw new Error(`${label} muss Text sein.`);
 return value.trim();
}
export function profileText(profile, selected, groups) {
 return [
  'ADVENTURE PROFILE',
  'These choices define this run and override conflicting defaults.',
  ...groups.filter(g=>profileIds.includes(g.id)).map(g=>`${optionNames[g.id]}: ${selected[g.id].text}`),
  profile.worldDescription && `World description (user specifications):\n${profile.worldDescription}`,
  profile.focus.length ? 'Play focus: '+profile.focus.map(id=>focuses.find(f=>f.id===id).text).join(' ') : 'Play focus: varied according to the situation, no fixed weighting.',
  profile.wishes && `User wishes and exclusions:\n${profile.wishes}`,
  'Add compatible world details freely; preserve confirmed specifications. Clarify only essential gaps or contradictions before starting, not another configuration questionnaire.',
  narrativePolicy,
 ].filter(Boolean).join('\n\n');
}
