import { characterText, validateCharacterDocument } from './character.mjs';
import { createProfile, profileText, profileIds } from './profile.mjs';
import { buildCompactPackage, defaults, groups, selectOptions, diceText } from './generator.mjs';
import { powers } from './modules.mjs';

export const PLUGIN = Object.freeze({
  name: 'Freie Spielleitung 0.2',
  version: '0.2.1',
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
    `Dieses Projekt enthält einen Solo-Textrollenspiel-Durchgang mit dem ausdrücklich ausgewählten Plugin „${PLUGIN.name}“, Regelsatz ${PLUGIN.version}.`,
    'Verwende dessen Spielleitungsanweisung und Regelreferenzen zusammen mit meinen bestätigten Setting- und Spielvorgaben aus der Startnachricht.',
    'Ich steuere meine Figur, du Welt und Folgen. Bewahre den bestätigten Charakterbogen, etablierte Fakten und vereinbarte Abweichungen. Übernimm keine andere Regelfassung ohne meine ausdrückliche Anweisung.',
    'Neuer Chat = neuer Lauf, sofern ich keinen Spielstand mitbringe. Behaupte keine nicht verfügbare Erinnerung, Speicherung oder gelesene Datei.',
    'Ist das Plugin oder eine benötigte Referenz nicht zugänglich, teile mir das mit, bevor du davon abhängige Regeln anwendest.',
  ].join('\n');

  const startMessage = [
    `Neuer Solo-Durchgang mit „${PLUGIN.name}“, Regelsatz ${PLUGIN.version}.`,
    'Lade zuerst die Spielleitungsanweisung und „Abenteuer und Welt“. Bestätige deren tatsächlichen Zugriff kurz auf der Metaebene.',
    'Für diesen Durchgang gelten die folgenden gewählten Vorgaben; sie ersetzen abweichende Standardvorgaben des Plugins. Bewahre sie über Kapitelwechsel hinweg.',
    profileText(profile, selected, groups),
    ...groups.filter(group=>!profileIds.includes(group.id) && !(character && group.id==='creation')).map(group => `${group.label}: ${selected[group.id].text}`),
    powers[config.setting],
    diceText(config) || 'Zusatzwürfel: keine. Verwende die festen Grundschäden; Attributproben bleiben W20.',
    'Wenn ich einen bestätigten Charakterbogen mitgebe, übernimm ihn unverändert und erstelle die Figur nicht neu. Andernfalls führe die gewählte Charaktererstellung aus und stimme den Bogen vor dem Auftakt ab.',
    ...(character ? [characterText(character), 'Übernimm diesen bestätigten Bogen unverändert und beginne das Abenteuer gemäß dem Profil. Stelle die Figur nicht erneut zusammen.'] : ['Beginne danach das Abenteuer. Frage nur nach Angaben, die für den Start tatsächlich fehlen.']),
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
  const startMessage=[output.startMessage, ...(character ? [characterText(character),'Übernimm diesen bestätigten Bogen unverändert und beginne das Abenteuer gemäß dem Profil.'] : [])].filter(Boolean).join('\n\n');
  return {...output, startMessage, downloadName:'projekt-startpaket.md', downloadText:['# Projekt-Startpaket', '## 1. Projektanweisungen', output.projectInstructions, ...(startMessage ? ['## 2. Erste Chatnachricht', startMessage] : [])].join('\n\n')};
}
