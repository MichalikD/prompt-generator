import { characterText, validateCharacterDocument } from './character.mjs';
import { createProfile, profileText, profileIds } from './profile.mjs';
import { buildCompactPackage, defaults, groups, selectOptions, diceText } from './generator.mjs';
import { powers } from './modules.mjs';

export const PLUGIN = Object.freeze({
  name: 'Freie Spielleitung 0.2',
  version: '0.3.0',
  url: 'https://chatgpt.com/plugins/plugins_6ad5185c00f481918c6b29c904cfab37',
});

export const outputModes = [
  { id: 'compact', label: 'Projektprompt · unter 8.000 Zeichen' },
  { id: 'plugin', label: 'Plugin-Startpaket' },
];

export function buildPluginPackage(config = defaults, character=null) {
  checkPrepared(config, character);
  const selected = selectOptions(config);
  const profile = createProfile(config);
  const projectInstructions = [
    `This project contains one solo RPG run with the explicitly selected plugin „${PLUGIN.name}“, Regelsatz ${PLUGIN.version}.`,
    'Use its GM instructions and references together with my confirmed setting and play options from the first message. Play in German.',
    'I control my character; you control the world and consequences. Preserve confirmed facts, the starting sheet and agreed deviations. Adopt another rules version only at my explicit request.',
    'New chat = new run unless I provide a save. Never claim unavailable memory, storage or file access.',
    'If the plugin or a required reference is inaccessible, say so before applying dependent rules.',
  ].join('\n');

  const startMessage = [
    `Neuer Solo-Durchgang mit „${PLUGIN.name}“, Regelsatz ${PLUGIN.version}.`,
    'Read the GM skill and “Abenteuer und Welt” first. Briefly confirm actual access in German meta text.',
    'The following choices override conflicting plugin defaults for this run; retain them across chapters.',
    profileText(profile, selected, groups),
    ...groups.filter(group=>!profileIds.includes(group.id) && !(character && group.id==='creation')).map(group => `${group.label}: ${selected[group.id].text}`),
    powers[config.setting],
    diceText(config) || 'Extra dice: none. Use fixed base damage; attribute checks remain W20.',
    'Use a confirmed character sheet as the starting state without recreating it. Otherwise follow the selected creation method and confirm the draft before the opening.',
    ...(character ? [characterText(character), 'Use this confirmed sheet as the starting state and begin the adventure according to the profile. Do not recreate the character.'] : ['Then begin the adventure. Ask only for information essential to starting.']),
  ].filter(Boolean).join('\n\n');

  return {
    mode: 'plugin', profile, projectInstructions, startMessage,
    downloadName: 'plugin-startpaket.md',
    downloadText: [
      `# Startpaket · ${PLUGIN.name}`, `Regelwerksfassung: ${PLUGIN.version}`,
      `Plugin: ${PLUGIN.url}`,
      'Private Testinstallation: Der Link allein gewährt anderen Konten keinen Zugriff. Das Paket installiert das Plugin nicht automatisch.',
      '## 1. Projektanweisungen', projectInstructions,
      '## 2. Erste Chatnachricht',
      'Das Plugin im ersten Spielchat ausdrücklich auswählen. Danach die vollständige gemeinsame Startnachricht senden.',
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
 const selected=selectOptions(config);
 return [selected.setting.text, config.worldDescription?.trim(), powers[config.setting], config.wishes?.trim() && 'Eigene Vorgaben und Ausschlüsse: '+config.wishes.trim()].filter(Boolean).join('\n\n');
}
export function buildOutput(config = defaults, mode = 'compact', character=null) {
  if (!outputModes.some(option => option.id === mode)) throw new Error('Ungültiger Ausgabemodus');
  checkPrepared(config,character);
  if (mode === 'plugin') return buildPluginPackage(config,character);
  const output = buildCompactPackage(config,{prepared:!!character});
  const startMessage=[output.startMessage, ...(character ? [characterText(character),'Use this confirmed sheet as the starting state and begin the adventure according to the profile.'] : [])].filter(Boolean).join('\n\n');
  return {...output, startMessage, downloadName:'projekt-startpaket.md', downloadText:['# Projekt-Startpaket', '## 1. Projektanweisungen', output.projectInstructions, ...(startMessage ? ['## 2. Erste Chatnachricht', startMessage] : [])].join('\n\n')};
}
