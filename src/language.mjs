// Shared play-language default; independent of the German editor interface.
export const PLAY_LANGUAGE = 'German';
export const languageDirective = `language = ${PLAY_LANGUAGE}`;
export const localizationPolicy = 'Use language for narration, dialogue, displayed rule terms and command names. Keep schema keys in English. Preserve user-provided names and text.';
export const pluginLocalizationPolicy = localizationPolicy+' Translate every visible attribute and rule label consistently, including tables, choices, button messages and dice arithmetic; English rule identifiers are internal, not exceptions to the selected language.';
export const ruleAttributes = {strength:'Strength', dexterity:'Dexterity', intellect:'Intellect', insight:'Insight'};
export const optionNames = {setting:'World',tone:'Tone',scope:'Adventure scope',continuation:'Campaign structure',creation:'Character creation',death:'Death and rewind',roller:'Dice responsibility',frequency:'Check frequency',visibility:'Roll display',companions:'NPC companions'};
