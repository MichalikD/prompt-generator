import test from 'node:test';
import assert from 'node:assert/strict';
import { allConfigs, buildPrompt, defaults, groups, LIMIT, diceText } from '../src/generator.mjs';
import { buildOutput, buildPluginPackage, outputModes, PLUGIN } from '../src/outputs.mjs';
import { powers } from '../src/modules.mjs';

test('Beide Ausgaben verwenden in jeder Kombination dieselbe gültige Auswahl', () => {
  let count = 0;
  for (const config of allConfigs()) {
    const result = buildPluginPackage(config);
    assert.ok(result.projectInstructions.length < LIMIT);
    assert.ok(result.startMessage.includes(PLUGIN.version));
    for (const group of groups) {
      const chosen = group.options.find(option => option.id === config[group.id]);
      assert.ok(result.startMessage.includes(`${group.label}: ${chosen.text}`));
      for (const option of group.options) {
        if (option !== chosen) assert.ok(!result.startMessage.includes(`${group.label}: ${option.text}`));
      }
    }
    if (powers[config.setting]) assert.ok(result.startMessage.includes(powers[config.setting]));
    assert.ok(!result.projectInstructions.includes('W20+Attribut'));
    const extras = diceText(config);
    assert.ok(result.startMessage.includes(extras || 'Extra dice: none.'));
    count++;
  }
  assert.equal(count, 663552);
});

test('Moduswechsel verändert keine Einstellungen und erhält den kompakten Prompt', () => {
  const config = Object.freeze({...defaults, setting:'cyberpunk', tone:'horror', death:'hardcore', extras:Object.freeze(['d10', 'dpercent'])});
  const snapshot = JSON.stringify(config);
  const compact = buildOutput(config, 'compact');
  const plugin = buildOutput(config, 'plugin');
  assert.equal(compact.projectInstructions, buildPrompt(config));
  assert.ok(compact.startMessage || compact.projectInstructions.includes('ABENTEUERPROFIL'));
  assert.ok(plugin.startMessage.includes('Cyberpunk:'));
  assert.ok(plugin.startMessage.includes('Hardcore:'));
  assert.ok(!plugin.startMessage.includes('Standard:'));
  assert.equal(buildOutput(config, 'compact').projectInstructions, compact.projectInstructions);
  assert.equal(JSON.stringify(config), snapshot);
  assert.deepEqual(outputModes.map(mode => mode.id), ['compact', 'plugin']);
});

test('Plugin-Paket trennt Projektanweisungen und Startnachricht im Download', () => {
  const output = buildPluginPackage({...defaults, setting:'modern', creation:'assisted'});
  assert.ok(output.downloadText.includes(output.projectInstructions));
  assert.ok(output.downloadText.includes(output.startMessage));
  assert.ok(output.downloadText.indexOf('## 1. Projektanweisungen') < output.downloadText.indexOf('## 2. Erste Chatnachricht'));
  assert.ok(output.downloadText.includes(PLUGIN.url));
  assert.ok(output.startMessage.includes('confirmed character sheet'));
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
