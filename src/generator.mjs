import {worldRules} from './worlds.mjs';
import { languageDirective, localizationPolicy } from './language.mjs';
import { createProfile, profileText } from './profile.mjs';
import { groups as legacyGroups, core, dice, pacing, probePolicy, savePolicy } from './modules.mjs';
export { dice };
// Active choices are separate from the archived output's unchanged modules.
export const groups = legacyGroups.flatMap(group => {
 if(group.id==='scope')return [{...group,options:[{id:'dynamic',label:'Dynamisch',text:'Dynamic: vary the length of each conflict according to its substance and player decisions, with a reachable ending and no artificial extension.',tooltip:'Kurze und längere Abenteuer nach Inhalt und Entscheidungen. Jedes hat ein erreichbares Ende; Erfolge führen näher zum Abschluss, nicht zu immer neuen Voraussetzungen.'},...group.options]}];
 if(group.id==='tone')return [group,{id:'depiction',label:'Darstellung der Welt',options:[
  {id:'clear',label:'Deutlich',text:'Clear: concrete injuries, physical consequences and adult settings, without dwelling on graphic detail.',tooltip:'Konkrete Verletzungen und erwachsene Milieus offen beschreiben. Verändert weder Gefahr noch Spielregeln.'},
  {id:'restrained',label:'Zurückhaltend',text:'Restrained: acknowledge injury, death and adult themes without detailed bodily depiction.',tooltip:'Geschehen erkennbar machen, körperliche Details zurücknehmen. Keine automatisch harmlose Welt.'},
  {id:'graphic',label:'Drastisch',text:'Graphic: explicit violence, decay and bodily detail where the actual events and setting support them.',tooltip:'Passende Ereignisse können explizit dargestellt werden, auch außerhalb von Kämpfen. Keine Pflicht zu Gewalt oder geänderte Schadensregeln.'},
 ]}];
 return [group];
});
// UTF-16 length is conservative for supplementary Unicode characters.
export const LIMIT = 8000;
export const defaults = { ...Object.fromEntries(groups.map(g => [g.id, g.options[0].id])), roller: 'player', setting: 'fantasy' };
export function selectOptions(config, {legacy=false}={}) {
  if (config.players !== undefined && config.players !== 'solo') throw new Error('Der Generator unterstützt derzeit nur eine Spielerfigur. Koop wurde entfernt.');
  const selected = {};
  for (const g of legacy?legacyGroups:groups) {
    const option = g.options.find(o => o.id === (config[g.id]??(g.id==='depiction'?'clear':undefined)));
    if (!option) throw new Error(`Ungültige Einstellung: ${g.id}`);
    selected[g.id] = option;
  }
  createProfile(config,{legacy});
  diceText(config); // Gleiche Validierung für beide Ausgaben.
  return selected;
}
export function buildCompactPackage(config = defaults, {prepared=false}={}) {
  config={...config,scope:config.scope==='dynamic'?'short':config.scope};
  const options = selectOptions(config,{legacy:true});
  const profile = createProfile(config,{legacy:true});
  const narrative = profileText(profile, options, legacyGroups);
  const selected = Object.fromEntries(Object.entries(options).map(([key, option]) => [key, option.text]));
  const rules = core;
  const sections = [
    ['ROLE', languageDirective, localizationPolicy, rules.intro],
    ['START', rules.start],
    ['CHARACTER', prepared ? 'Use the confirmed sheet in my first message as the starting state; do not recreate the character.' : selected.creation, rules.character, worldRules(profile.world)],
    ['ADVENTURE', rules.world],
    ['PLAY STYLE', rules.play, pacing],
    ['D20 CHECKS', rules.checks, selected.frequency, probePolicy, selected.roller, selected.visibility, diceText(config)],
    ['LOGIC', rules.puzzles],
    ['COMBAT', rules.combat],
    ['INVENTORY', rules.inventory],
    ['DEVELOPMENT', rules.progress, selected.companions],
    ['SAVE', selected.death, rules.save, savePolicy]
  ];
  const base = sections.map(([heading, ...texts]) => `${heading}\n${texts.filter(Boolean).join('\n')}`).join('\n\n');
  const full = base + '\n\n' + narrative;
  const external = full.length >= LIMIT;
  const projectInstructions = external ? base + '\n\nADVENTURE PROFILE\nThe binding adventure profile follows in my first chat message. Wait for it before starting; it overrides conflicting defaults.' : full;
  if (projectInstructions.length >= LIMIT) throw new Error('Der Regelkern überschreitet das Projektlimit. Es wurde nichts abgeschnitten.');
  return {mode:'compact', profile, projectInstructions, startMessage:external ? narrative : '', profileExternal:external};
}
export function buildPrompt(config = defaults) { return buildCompactPackage(config).projectInstructions; }

export function* allConfigs(index = 0, config = {}) {
  if (index === groups.length) { for (let mask=0; mask<64; mask++) { const extras=dice.filter((d,i)=>mask & (1<<i)).map(d=>d.id); if(extras.includes('dpercent')&&!extras.includes('d10')) continue; yield {...config, extras, ...(config.setting==='custom' ? {worldDescription:'Eigene Welt mit begrenzter Magie und vorindustrieller Technik.'} : {})}; } return; }
  const g = groups[index];
  for (const o of g.options) yield* allConfigs(index + 1, { ...config, [g.id]: o.id });
}

export function diceText(config) {
 const extras = config.extras ?? [];
 if (!Array.isArray(extras) || new Set(extras).size !== extras.length || extras.some(x=>!dice.some(d=>d.id===x))) throw new Error('Ungültige Zusatzwürfel');
 if(extras.includes('dpercent')&&!extras.includes('d10')) throw new Error('D% benötigt D10');
 if(!extras.length)return '';
 const parts=['Extra dice: announce purpose/table first; use selected roller/display rules, no modifiers. Otherwise fixed values; attribute checks use D20.'];
 if(extras.some(x=>['d4','d6','d8'].includes(x))) parts.push('Damage on both sides uses only selected D4/light, D6/ordinary, D8/heavy: roll ≤ ⌊W/4⌋: base−1; > W−⌊W/4⌋: base+1; otherwise base.');
 if(extras.includes('d10'))parts.push('D10: ten equally valuable finds; 0=10.');
 if(extras.includes('d12'))parts.push('D12: twelve world events; no mandatory detours.');
 if(extras.includes('dpercent'))parts.push('D%: tens 00–90 + D10 units 0–9, 00+0=100. Announce chance first; result ≤ chance triggers event.');
 return 'Available: '+extras.map(x=>dice.find(d=>d.id===x).label).join(', ')+'. '+parts.join(' ');
}
