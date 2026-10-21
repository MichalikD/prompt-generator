import {optionNames} from '../src/language.mjs';
import test from 'node:test';
import assert from 'node:assert/strict';
import { allConfigs, buildPrompt, defaults, groups, LIMIT, diceText } from '../src/generator.mjs';
import { buildOutput, buildPluginPackage, outputModes, PLUGIN } from '../src/outputs.mjs';
import { pluginChoiceText } from '../src/plugin-profile.mjs';

test('Beide Ausgaben verwenden in jeder Kombination dieselbe gültige Auswahl', () => {
  let count = 0;
  for (const config of allConfigs()) {
    const result = buildPluginPackage(config);
    assert.ok(result.projectInstructions.length < LIMIT);
    assert.ok(result.startMessage.includes(PLUGIN.version));
    for (const group of groups) {
      const chosen = group.options.find(option => option.id === config[group.id]);
      assert.ok(result.startMessage.includes(group.id==='setting' ? chosen.text : `${optionNames[group.id]}: ${pluginChoiceText(group.id,chosen)}`));
      for (const option of group.options) {
        if (option !== chosen) assert.ok(!result.startMessage.includes(group.id==='setting' ? option.text : `${optionNames[group.id]}: ${pluginChoiceText(group.id,option)}`));
      }
    }
    assert.ok(!result.projectInstructions.includes('D20+attribute'));
    const extras = diceText(config);
    assert.ok(result.startMessage.includes(extras || 'Extra dice: none.'));
    count++;
  }
  assert.equal(count,48 * groups.reduce((n,g)=>n*g.options.length,1));
});

test('Moduswechsel verändert keine Einstellungen und erhält den kompakten Prompt', () => {
  const config = Object.freeze({...defaults, setting:'cyberpunk', tone:'horror', death:'hardcore', extras:Object.freeze(['d10', 'dpercent'])});
  const snapshot = JSON.stringify(config);
  const compact = buildOutput(config, 'compact');
  const plugin = buildOutput(config, 'plugin');
  assert.equal(compact.projectInstructions, buildPrompt(config));
  assert.ok(compact.startMessage || compact.projectInstructions.includes('ADVENTURE PROFILE'));
  assert.ok(plugin.startMessage.includes('Cyberpunk:'));
  assert.ok(plugin.startMessage.includes('Hardcore:'));
  assert.ok(!plugin.startMessage.includes('Standard:'));
  assert.equal(buildOutput(config, 'compact').projectInstructions, compact.projectInstructions);
  assert.equal(JSON.stringify(config), snapshot);
  assert.deepEqual(outputModes.map(mode => mode.id), ['plugin', 'compact']);
  assert.equal(buildOutput(config).mode, 'plugin');
  assert.match(outputModes.find(mode => mode.id === 'compact').label, /eingefroren/);
});

test('Plugin-Paket trennt Projektanweisungen und Startnachricht im Download', () => {
  const output = buildPluginPackage({...defaults, setting:'modern', creation:'assisted'});
  assert.ok(output.downloadText.includes(output.projectInstructions));
  assert.ok(output.downloadText.includes(output.startMessage));
  assert.ok(output.downloadText.indexOf('## 1. Project instructions') < output.downloadText.indexOf('## 2. First chat message'));
  assert.ok(output.downloadText.includes(PLUGIN.url));
  assert.ok(output.startMessage.includes('confirm the draft, then begin the adventure'));
  assert.ok(!output.projectInstructions.includes('Contemporary world without'));
  assert.match(output.downloadName, /^[a-z-]+\.md$/);
});

test('Beide Modi lehnen ungültige Einstellungen und alte Koop-Auswahlen ab', () => {
  for (const mode of ['compact', 'plugin']) {
    for (const config of [{}, {...defaults, setting:'unbekannt'}, {...defaults, extras:['dpercent']}, {...defaults, extras:['d10', 'd10']}, {...defaults, players:'2'}]) {
      assert.throws(() => buildOutput(config, mode));
    }
    assert.doesNotThrow(() => buildOutput({...defaults, players:'solo'}, mode));
  }
  assert.ok(!groups.some(group => group.id === 'players'));
  assert.throws(() => buildOutput(defaults, 'unbekannt'), /Ausgabemodus/);
});
