import test from 'node:test';
import assert from 'node:assert/strict';
import { groups, allConfigs, buildPrompt, defaults, LIMIT } from '../src/generator.mjs';
import { core } from '../src/modules.mjs';

test('Jede Kombination bleibt unter 8000 Zeichen und enthält den vollständigen Kern', () => {
  let count = 0;
  for (const config of allConfigs()) {
    const prompt = buildPrompt(config);
    assert.ok(prompt.length < LIMIT, JSON.stringify(config));
    for (const block of Object.values(core)) assert.ok(prompt.includes(block));
    for (const group of groups) for (const option of group.options)
      assert.equal(prompt.includes(option.text), config[group.id] === option.id);
    assert.ok(!/undefined|null/.test(prompt));
    count++;
  }
  assert.equal(count, groups.reduce((n,g)=>n*g.options.length,1));
});
test('Hardcore, Horror und Cyberpunk ersetzen widersprüchliche Regeln', () => {
  const prompt = buildPrompt({...defaults, death:'hardcore',tone:'horror',setting:'cyberpunk'});
  assert.ok(prompt.includes('kein Zurückspulen'));
  assert.ok(!prompt.includes('Standard:'));
  assert.ok(!prompt.includes('kein Horrorfokus'));
  assert.ok(!prompt.includes('drei Ressourcenpunkte'));
  assert.ok(prompt.includes('Cyberware:'));
});
test('Benutzerwürfe werden angefordert, automatische Proben nicht', () => {
  assert.ok(buildPrompt({...defaults,roller:'player'}).includes('Rohwürfe abwarten'));
  assert.ok(!buildPrompt(defaults).includes('Rohwürfe abwarten'));
});
test('Ungültige oder unvollständige Auswahl wird abgewiesen', () => {
  assert.throws(()=>buildPrompt({}), /Ungültige/);
  assert.throws(()=>buildPrompt({...defaults,setting:'<script>'}), /Ungültige/);
});
