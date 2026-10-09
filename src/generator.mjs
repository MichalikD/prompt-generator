import { coopCore, coopOptions, cooperation } from './coop.mjs';
import { groups, core, powers, dice, pacing, probePolicy, savePolicy } from './modules.mjs';
export { groups, dice };
// UTF-16 length is conservative for supplementary Unicode characters.
export const LIMIT = 8000;
export const defaults = { ...Object.fromEntries(groups.map(g => [g.id, g.options[0].id])), roller: 'player' };
export function buildPrompt(config = defaults) {
  const selected = {};
  for (const g of groups) {
    const option = g.options.find(o => o.id === config[g.id]);
    if (!option) throw new Error(`Ungültige Einstellung: ${g.id}`);
    selected[g.id] = option.text;
  }
  const isCoop = config.players !== 'solo';
  const rules = isCoop ? coopCore : core;
  if (isCoop) for (const [group, options] of Object.entries(coopOptions)) {
    selected[group] = options[config[group]] ?? selected[group];
  }
  const sections = [
    ['AUFTRAG', selected.players, rules.intro],
    ['START', selected.setting, selected.tone, selected.scope, rules.start],
    ['FIGUR', selected.creation, rules.character, powers[config.setting]],
    ['ABENTEUER', rules.world],
    ['SPIELWEISE', rules.play, pacing],
    ['W20-PROBEN', rules.checks, selected.frequency, probePolicy, isCoop ? cooperation : '', selected.roller, selected.visibility, diceText(config)],
    ['LOGIK', rules.puzzles],
    ['KAMPF', rules.combat],
    ['INVENTAR', rules.inventory],
    ['ENTWICKLUNG', rules.progress, selected.companions],
    ['SPIELSTAND', selected.death, rules.save, savePolicy]
  ];
  const prompt = sections.map(([heading, ...texts]) => `${heading}\n${texts.filter(Boolean).join('\n')}`).join('\n\n');
  if (prompt.length >= LIMIT) throw new Error(`Prompt zu lang: ${prompt.length} Zeichen. Bitte Textmodule kürzen; es wurde nichts abgeschnitten.`);
  return prompt;
}
export function* allConfigs(index = 0, config = {}) {
  if (index === groups.length) { for (let mask=0; mask<64; mask++) { const extras=dice.filter((d,i)=>mask & (1<<i)).map(d=>d.id); if(extras.includes('dpercent')&&!extras.includes('d10')) continue; yield {...config, extras}; } return; }
  const g = groups[index];
  for (const o of g.options) yield* allConfigs(index + 1, { ...config, [g.id]: o.id });
}

export function diceText(config) {
 const extras = config.extras ?? [];
 if (!Array.isArray(extras) || extras.some(x=>!dice.some(d=>d.id===x))) throw new Error('Ungültige Zusatzwürfel');
 if(extras.includes('dpercent')&&!extras.includes('d10')) throw new Error('D% benötigt D10');
 if(!extras.length)return '';
 const parts=['Zusatzwürfe: Zweck/Tabelle vorab; Bedienung/Anzeige wie Proben, ohne Boni. Sonst Festwerte; Proben W20.'];
 if(extras.some(x=>['d4','d6','d8'].includes(x))) parts.push('Schaden nur mit gewähltem W4/leicht,W6/gewöhnlich,W8/schwer, beide Seiten: Wurf ≤ ⌊W/4⌋: Grundwert−1; > W−⌊W/4⌋: Grundwert+1; sonst Grundwert.');
 if(extras.includes('d10'))parts.push('W10: zehn gleichwertige Funde; 0=10.');
 if(extras.includes('d12'))parts.push('W12: zwölf Weltereignisse ohne Pflichtumwege.');
 if(extras.includes('dpercent'))parts.push('D%: Zehner 00–90 + D10-Einer 0–9, 00+0=100. Chance vorab; Ergebnis ≤ Chance: Ereignis.');
 return 'Verfügbar: '+extras.map(x=>dice.find(d=>d.id===x).label).join(', ')+'. '+parts.join(' ');
}
