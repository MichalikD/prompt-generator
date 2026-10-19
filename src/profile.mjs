// Gemeinsame narrative Daten; beide Ausgabewege verwenden dieselbe Quelle.
export const profileIds = ['setting', 'tone', 'scope', 'continuation'];
export const focuses = [
 {id:'discovery', label:'Entdeckung', text:'Discover new places, connections and possibilities.'},
 {id:'mystery', label:'Ermittlung und Rätsel', text:'Investigate coherent clues and reliable puzzles.'},
 {id:'social', label:'Beziehungen und Verhandlung', text:'Develop interests, relationships and workable agreements.'},
 {id:'action', label:'Action und Gefahr', text:'Face real danger through combat, tricks, flight or other suitable approaches.'},
];
export const narrativePolicy = 'Play in German. Give my involvement a credible stake and useful role. My job and talents do not define every adventure. Unknown history may be discovered consistently; confirmed facts and explicit exclusions bind. Do not decide my present feelings, speech or choices. NPCs have their own motives and may disagree or act without me. Accept refusal and offer different opportunities if I still want adventure. Vary challenges and relationships; action includes real opposition and combat when appropriate, not only technical obstacles. Develop medium adventures beyond one rescue or repair through consequential choices, not additional checks. Campaign links must not postpone every answer or invalidate resolved conflicts. Compress agreed routine; resume meaningful events after rest without forcing decisions. No images or image tools unless requested.';

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
  'ABENTEUERPROFIL',
  'These choices define this run and override conflicting defaults.',
  ...groups.filter(g=>profileIds.includes(g.id)).map(g=>`${g.label}: ${selected[g.id].text}`),
  profile.worldDescription && `Weltbeschreibung (meine Vorgaben):\n${profile.worldDescription}`,
  profile.focus.length ? 'Spielschwerpunkte: '+profile.focus.map(id=>focuses.find(f=>f.id===id).text).join(' ') : 'Spielschwerpunkte: varied according to the situation, no fixed weighting.',
  profile.wishes && `Eigene Vorgaben und Ausschlüsse:\n${profile.wishes}`,
  'Add compatible world details freely; preserve confirmed specifications. Clarify only essential gaps or contradictions before starting, not another configuration questionnaire.',
  narrativePolicy,
 ].filter(Boolean).join('\n\n');
}
