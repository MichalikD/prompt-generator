import { languageDirective, localizationPolicy, optionNames } from './language.mjs';
import { characterText, validateCharacterDocument } from './character.mjs';
import { createProfile, profileText, profileIds } from './profile.mjs';
import { buildCompactPackage, defaults, groups, selectOptions, diceText } from './generator.mjs';
import {worldText,worldRules} from './worlds.mjs';

export const PLUGIN = Object.freeze({
  name: 'Open Game Master',
  version: '0.6.0',
  url: 'https://chatgpt.com/plugins/plugins_6ad5185c00f481918c6b29c904cfab37',
});

export const outputModes = [
  { id: 'plugin', label: 'Plugin-Startpaket' },
  { id: 'compact', label: 'Projektprompt · eingefrorene Regelbasis 0.5' },
];

export function buildPluginPackage(config = defaults, character=null) {
  checkPrepared(config, character);
  const selected = selectOptions(config);
  const profile = createProfile(config);
  const projectInstructions = [
    languageDirective, localizationPolicy,
    `This project contains one solo RPG run with the explicitly selected plugin "${PLUGIN.name}", rules version ${PLUGIN.version}.`,
    'Use its GM instructions and references together with my confirmed setting and play options from the first message. ',
    'I control my character; you control the world and consequences. Preserve confirmed facts, the starting sheet and agreed deviations. Adopt another rules version only at my explicit request.',
    'New chat = new run unless I provide a save. Never claim unavailable memory, storage or file access.',
    'If the plugin or a required reference is inaccessible, say so before applying dependent rules.',
  ].join('\n');

  const startMessage = [
    languageDirective,
    `New solo run with "${PLUGIN.name}", rules version ${PLUGIN.version}.`,
    'Read the GM skill and “Adventure and World” first. Mention access problems only; begin without a loading report.',
    'The following choices override conflicting plugin defaults for this run; retain them across chapters.',
    profileText(profile, selected, groups),
    ...groups.filter(group=>!profileIds.includes(group.id) && !(character && group.id==='creation')).map(group => `${optionNames[group.id]}: ${selected[group.id].text}`),
    worldRules(profile.world),
    diceText(config) || 'Extra dice: none. Use fixed base damage; attribute checks remain D20.',
    ...(character ? [characterText(character), 'Use this confirmed sheet as the starting state and begin the adventure according to the profile.'] : ['Follow the selected character creation method, confirm the draft, then begin the adventure. Ask only for information essential to starting.']),
  ].filter(Boolean).join('\n\n');

  return {
    mode: 'plugin', profile, projectInstructions, startMessage,
    downloadName: 'plugin-startpaket.md',
    downloadText: [
      `# Start package · ${PLUGIN.name}`, `Rules version: ${PLUGIN.version}`,
      `Plugin: ${PLUGIN.url}`,
      'Private test installation: this link does not grant access to other accounts or install the plugin.',
      '## 1. Project instructions', projectInstructions,
      '## 2. First chat message',
      'Select the plugin in the first game chat, then send the complete first message.',
      startMessage,
    ].join('\n\n'),
  };
}

function checkPrepared(config, character) {
  if(config.characterSource!==undefined && !['chat','prepared'].includes(config.characterSource)) throw new Error('Ungültige Charakterquelle.');
  if(config.characterSource==='prepared' && !character) throw new Error('Bitte den vorbereiteten Bogen ausfüllen oder importieren und bestätigen.');
  if(character) {
    const errors=validateCharacterDocument(character);
    if(errors.length) throw new Error('Charakterbogen noch unvollständig: '+errors[0]);
    if(!character.confirmed) throw new Error('Bitte den Charakterbogen nach Prüfung ausdrücklich bestätigen.');
  }
}
export function worldForCharacter(config=defaults) {
 selectOptions(config);
 const world=createProfile(config).world;
 return [worldText(world),worldRules(world), config.wishes?.trim() && 'User wishes and exclusions: '+config.wishes.trim()].filter(Boolean).join('\n\n');
}
export function buildOutput(config = defaults, mode = 'plugin', character=null) {
  if (!outputModes.some(option => option.id === mode)) throw new Error('Ungültiger Ausgabemodus');
  checkPrepared(config,character);
  if (mode === 'plugin') return buildPluginPackage(config,character);
  const output = buildCompactPackage(config,{prepared:!!character});
  const startMessage=[output.startMessage, ...(character ? [characterText(character),'Use this confirmed sheet as the starting state and begin the adventure according to the profile.'] : [])].filter(Boolean).join('\n\n');
  return {...output, startMessage, downloadName:'projekt-startpaket.md', downloadText:['# Project start package', '## 1. Project instructions', output.projectInstructions, ...(startMessage ? ['## 2. First chat message', startMessage] : [])].join('\n\n')};
}
