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
  assert.equal(count, 48 * groups.reduce((n,g)=>n*g.options.length,1));
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
  assert.ok(!buildPrompt({...defaults,roller:'gm'}).includes('Rohwürfe abwarten'));
  assert.equal(defaults.roller, 'player');
});
test('Ungültige oder unvollständige Auswahl wird abgewiesen', () => {
  assert.throws(()=>buildPrompt({}), /Ungültige/);
  assert.throws(()=>buildPrompt({...defaults,setting:'<script>'}), /Ungültige/);
});

test('Zusatzwürfel sind optional und D% setzt D10 voraus', () => {
 assert.ok(!buildPrompt(defaults).includes('Zusatzwürfe:'));
 assert.throws(()=>buildPrompt({...defaults,extras:['dpercent']}), /benötigt D10/);
 const p=buildPrompt({...defaults,extras:['d10','dpercent']});
 assert.ok(p.includes('00+0=100'));
 assert.ok(!p.includes('Schaden nur mit'));
});

test('Erstellung aus Kurzbeschreibung ersetzt die manuelle Pflichtliste', () => {
 const assisted=buildPrompt({...defaults,creation:'assisted',setting:'cyberpunk'});
 assert.ok(assisted.includes('Kurzbeschreibung genügt'));
 assert.ok(assisted.includes('Vorgaben bewahren'));
 assert.ok(!assisted.includes('Ich lege Name/Herkunft'));
 assert.ok(assisted.includes('Vorhandene Figuren nicht neu generieren'));
 assert.ok(buildPrompt({...defaults,creation:'manual'}).includes('Ich lege Name/Herkunft'));
});
