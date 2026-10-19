// Gemeinsame narrative Daten; beide Ausgabewege verwenden dieselbe Quelle.
export const profileIds = ['setting', 'tone', 'scope', 'continuation'];
export const focuses = [
 {id:'discovery', label:'Entdeckung', text:'Neue Orte, Zusammenhänge und Möglichkeiten entdecken.'},
 {id:'mystery', label:'Ermittlung und Rätsel', text:'Nachvollziehbare Spuren und verlässliche Rätselmechanismen untersuchen.'},
 {id:'social', label:'Beziehungen und Verhandlung', text:'Interessen, Beziehungen und tragfähige Vereinbarungen gestalten.'},
 {id:'action', label:'Action und Gefahr', text:'Gefahren mit Kampf, List, Flucht oder anderen passenden Mitteln begegnen.'},
];
export const narrativePolicy = 'Begründe meine Beteiligung durch ein verständliches Anliegen und einen konkreten Beitrag meiner Figur. Unbekannte Herkunft verhindert keine Abenteuer in der Gegenwart. Ich darf Angebote ablehnen; entwickle bei weiterem Abenteuerwunsch andere passende Möglichkeiten, ohne mich zu bestrafen oder die Handlung stillzulegen. Schwerpunkte sind Akzente, keine Pflichtmuster. Variiere Interessen, Entscheidungen und Lösungswege. Ein Kampagnenhintergrund verbindet eigenständig spielbare Abenteuer, ersetzt sie aber nicht durch immer neue Besprechungen und vertagte Antworten. Mittel braucht mehr Konfliktentwicklung als eine einzelne Rettung oder Hindernisbeseitigung; Umfang bestimmt Verflechtung, keine Szenen-, Wort- oder Minutenquote. Akzeptiere eine früher erreichte Lösung und entwerte keinen Abschluss. Raffe ereignislosen Alltag und vereinbarte Routine wie ungefährliche Messungen bis zum Befund oder einer neuen bedeutsamen Entscheidung. Respektiere Freiwilligkeit ohne wiederholte Rückfragen zu bereits angenommenen Aufträgen. Antworte ohne Bilder oder Bildwerkzeuge, außer ich wünsche sie ausdrücklich.';

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
  'Diese Vorgaben bestimmen Welt, Umfang und Verlauf dieses Durchgangs und ersetzen abweichende allgemeine Standardvorgaben.',
  ...groups.filter(g=>profileIds.includes(g.id)).map(g=>`${g.label}: ${selected[g.id].text}`),
  profile.worldDescription && `Weltbeschreibung (meine Vorgaben):\n${profile.worldDescription}`,
  profile.focus.length ? 'Spielschwerpunkte: '+profile.focus.map(id=>focuses.find(f=>f.id===id).text).join(' ') : 'Spielschwerpunkte: situativ vielfältig, keine feste Gewichtung.',
  profile.wishes && `Eigene Vorgaben und Ausschlüsse:\n${profile.wishes}`,
  'Weitere Weltgestaltung: Passende Details frei ergänzen; bestätigte Vorgaben bewahren. Nur wesentliche Lücken oder Widersprüche vor dem Auftakt klären, keine erneute Konfigurationsrunde.',
  narrativePolicy,
 ].filter(Boolean).join('\n\n');
}
