import { groups, core, powers } from './modules.mjs';
export { groups };
// UTF-16 length is conservative for supplementary Unicode characters.
export const LIMIT = 8000;
export const defaults = Object.fromEntries(groups.map(g => [g.id, g.options[0].id]));
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
    ['W20-PROBEN', core.checks, selected.roller, selected.visibility],
    ['RÄTSEL UND LOGIK', core.puzzles],
    ['KAMPF UND GEFAHR', core.combat],
    ['INVENTAR', core.inventory],
    ['ENTWICKLUNG UND KONTINUITÄT', core.progress, selected.companions],
    ['TOD UND SPEICHERN', selected.death, core.save]
  ];
  const prompt = sections.map(([heading, ...texts], i) => `${i + 1}. ${heading}\n${texts.filter(Boolean).join('\n')}`).join('\n\n');
  if (prompt.length >= LIMIT) throw new Error(`Prompt zu lang: ${prompt.length} Zeichen. Bitte Textmodule kürzen; es wurde nichts abgeschnitten.`);
  return prompt;
}
export function* allConfigs(index = 0, config = {}) {
  if (index === groups.length) { yield config; return; }
  const g = groups[index];
  for (const o of g.options) yield* allConfigs(index + 1, { ...config, [g.id]: o.id });
}
