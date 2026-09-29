import { groups, core, powers, dice } from './modules.mjs';
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
  const sections = [
    ['AUFTRAG', core.intro],
    ['PROJEKT UND START', selected.setting, selected.tone, selected.scope, core.start],
    ['FIGUR', core.character, powers[config.setting]],
    ['WELT UND ABSCHLUSS', core.world],
    ['SPIELWEISE UND IMMERSION', core.play],
    ['W20-PROBEN', core.checks, selected.roller, selected.visibility, diceText(config)],
    ['RÄTSEL UND LOGIK', core.puzzles],
    ['KAMPF UND GEFAHR', core.combat],
    ['INVENTAR', core.inventory],
    ['ENTWICKLUNG UND KONTINUITÄT', core.progress, selected.companions],
    ['TOD UND SPEICHERN', selected.death, core.save]
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
 const parts=['Zusatzwürfe: Zweck/Tabelle vorab, Bedienung/Anzeige wie Proben, keine Boni. Ohne Zusatzwürfel Festwerte; Proben W20.'];
 if(extras.some(x=>['d4','d6','d8'].includes(x))) parts.push('Schaden nur mit gewähltem W4/leicht, W6/gewöhnlich, W8/schwer: Wurf ≤ abgerundet(W/4): Grundwert−1; > W−abgerundet(W/4): +1; sonst Grundwert. Für beide Seiten.');
 if(extras.includes('d10'))parts.push('W10: zehn gleichwertige Funde; 0=10.');
 if(extras.includes('d12'))parts.push('W12: zwölf Weltereignisse, keine Pflichtumwege.');
 if(extras.includes('dpercent'))parts.push('D%: Zehner 00–90 + D10-Einer 0–9, 00+0=100. Zufallschance vorab; Ergebnis ≤ Chance trifft ein.');
 return 'Verfügbar: '+extras.map(x=>dice.find(d=>d.id===x).label).join(', ')+'. '+parts.join(' ');
}
