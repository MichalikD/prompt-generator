import test from 'node:test';
import assert from 'node:assert/strict';
import { groups, allConfigs, buildPrompt, defaults, LIMIT, buildCompactPackage } from '../src/generator.mjs';
import { core, pacing, probePolicy, savePolicy } from '../src/modules.mjs';

test('Jede Kombination bleibt unter 8000 Zeichen und enthält den vollständigen Kern', () => {
  let count = 0;
  for (const config of allConfigs()) {
    const result = buildCompactPackage(config);
    const prompt = result.projectInstructions+'\n'+result.startMessage;
    assert.ok(result.projectInstructions.length < LIMIT, JSON.stringify(config));
    for (const block of Object.values(core)) assert.ok(prompt.includes(block));
    for (const group of groups) for (const option of group.options) {
      const text = option.text;
      if (text) assert.equal(prompt.includes(text), config[group.id] === option.id);
    }
    for (const policy of [pacing, probePolicy, savePolicy]) assert.ok(prompt.includes(policy));
    assert.ok(!prompt.includes('250'));
    assert.ok(prompt.includes('Respect refusal, explicit downtime, pauses and single-adventure endings'));
    assert.ok(prompt.includes('Rules/dice/HP/bonuses'));
    assert.ok(prompt.includes('never NPC knowledge/dialogue'));
    assert.ok(prompt.includes('Explain new mechanics before use'));
    assert.ok(!/undefined|null/.test(prompt));
    count++;
  }
  assert.equal(count, 48 * groups.reduce((n,g)=>n*g.options.length,1));
});
test('Hardcore, Horror und Cyberpunk ersetzen widersprüchliche Regeln', () => {
  const result = buildCompactPackage({...defaults, death:'hardcore',tone:'horror',setting:'cyberpunk'});
  const prompt = result.projectInstructions+'\n'+result.startMessage;
  assert.ok(prompt.includes('no rewind'));
  assert.ok(!prompt.includes('Standard:'));
  assert.ok(!prompt.includes('no horror focus'));
  assert.ok(!prompt.includes('three resource points'));
  assert.ok(prompt.includes('Cyberware:'));
});
test('Benutzerwürfe werden angefordert, automatische Proben nicht', () => {
  assert.ok(buildPrompt({...defaults,roller:'player'}).includes('wait for raw rolls'));
  assert.ok(!buildPrompt({...defaults,roller:'gm'}).includes('wait for raw rolls'));
  assert.equal(defaults.roller, 'player');
});
test('Ungültige oder unvollständige Auswahl wird abgewiesen', () => {
  assert.throws(()=>buildPrompt({}), /Ungültige/);
  assert.throws(()=>buildPrompt({...defaults,setting:'<script>'}), /Ungültige/);
});

test('Zusatzwürfel sind optional und D% setzt D10 voraus', () => {
 assert.ok(!buildPrompt(defaults).includes('Extra dice:'));
 assert.throws(()=>buildPrompt({...defaults,extras:['dpercent']}), /benötigt D10/);
 const p=buildPrompt({...defaults,extras:['d10','dpercent']});
 assert.ok(p.includes('00+0=100'));
 assert.ok(!p.includes('Damage on both sides'));
});

test('Erstellung aus Kurzbeschreibung ersetzt die manuelle Pflichtliste', () => {
 const assisted=buildPrompt({...defaults,creation:'assisted',setting:'cyberpunk'});
 assert.ok(assisted.includes('New character from a short description'));
 assert.ok(assisted.includes('ask only for my character idea'));
 assert.ok(assisted.includes('Preserve my specifications'));
 assert.ok(!assisted.includes('I choose name, origin'));
 assert.ok(assisted.includes('Preserve confirmed characters'));
 assert.ok(buildPrompt({...defaults,creation:'manual'}).includes('I choose name, origin'));
});

test('Probenhäufigkeit bleibt unabhängig von Atmosphäre, Würfelbedienung und Zahlenregeln', () => {
 assert.equal(defaults.frequency, 'balanced');
 {
  const rules = core;
  for (const frequency of ['story', 'balanced', 'play']) {
   const r = buildCompactPackage({...defaults, frequency, tone:'cozy'});
   const p = r.projectInstructions+'\n'+r.startMessage;
   assert.ok(p.includes('Cozy:'));
   assert.ok(p.includes(rules.checks));
   assert.ok(p.includes(rules.combat));
   assert.ok(p.includes(rules.progress));
   assert.ok(p.includes('wait for raw rolls'));
   assert.ok(p.includes('no quotas, routine rolls or artificial substeps'));
   assert.ok(p.includes('Export without a word limit or chat references'));
   assert.ok(p.includes('numbered parts'));
   assert.ok(p.includes('Mark missing or uncertain facts; never invent them'));
  }
 }
 assert.throws(()=>buildPrompt({...defaults,frequency:'action'}), /Ungültige/);
});
