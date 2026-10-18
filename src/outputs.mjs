import { buildPrompt, defaults, groups, selectOptions, diceText } from './generator.mjs';
import { powers } from './modules.mjs';

export const PLUGIN = Object.freeze({
  name: 'Freie Spielleitung 0.2',
  version: '0.2.0',
  url: 'https://chatgpt.com/plugins/plugins_6ad5185c00f481918c6b29c904cfab37',
});

export const outputModes = [
  { id: 'compact', label: 'Projektprompt · unter 8.000 Zeichen' },
  { id: 'plugin', label: 'Plugin-Startpaket' },
];

export function buildPluginPackage(config = defaults) {
  const selected = selectOptions(config);
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
    ...groups.map(group => `${group.label}: ${selected[group.id].text}`),
    powers[config.setting],
    diceText(config) || 'Zusatzwürfel: keine. Verwende die festen Grundschäden; Attributproben bleiben W20.',
    'Wenn ich einen bestätigten Charakterbogen mitgebe, übernimm ihn unverändert und erstelle die Figur nicht neu. Andernfalls führe die gewählte Charaktererstellung aus und stimme den Bogen vor dem Auftakt ab.',
    'Beginne danach das Abenteuer. Frage nur nach Angaben, die für den Start tatsächlich fehlen.',
  ].filter(Boolean).join('\n\n');

  return {
    mode: 'plugin', projectInstructions, startMessage,
    downloadName: 'plugin-startpaket.md',
    downloadText: [
      `# Startpaket · ${PLUGIN.name}`, `Regelwerksfassung: ${PLUGIN.version}`,
      `Plugin: ${PLUGIN.url}`,
      'Private Testinstallation: Der Link allein gewährt anderen Konten keinen Zugriff. Das Paket installiert das Plugin nicht automatisch.',
      '## 1. Projektanweisungen', projectInstructions,
      '## 2. Erste Chatnachricht',
      'Das Plugin im ersten Spielchat ausdrücklich auswählen. Danach diese Nachricht senden und gegebenenfalls einen bestätigten Charakterbogen separat anhängen.',
      startMessage,
    ].join('\n\n'),
  };
}

export function buildOutput(config = defaults, mode = 'compact') {
  if (!outputModes.some(option => option.id === mode)) throw new Error('Ungültiger Ausgabemodus');
  if (mode === 'plugin') return buildPluginPackage(config);
  return { mode: 'compact', projectInstructions: buildPrompt(config), startMessage: '' };
}
