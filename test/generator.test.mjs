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
    assert.ok(prompt.includes('Außer Cozy: Ziel/nächsten Schritt präsent halten, nach Ruhe aktiv aufgreifen'));
    assert.ok(prompt.includes('kein Entscheidungszwang'));
    assert.ok(prompt.includes('Würfe/Fokuspunkte/LP/Boni'));
    assert.ok(prompt.includes('nie Figurenwissen/Dialog/Gedanken/Dokumente'));
    assert.ok(prompt.includes('Figuren kennen nur wahrnehmbare Folgen, keine Ressourcenstände'));
    assert.ok(!/undefined|null/.test(prompt));
    count++;
  }
  assert.equal(count, 48 * groups.reduce((n,g)=>n*g.options.length,1));
});
test('Hardcore, Horror und Cyberpunk ersetzen widersprüchliche Regeln', () => {
  const result = buildCompactPackage({...defaults, death:'hardcore',tone:'horror',setting:'cyberpunk'});
  const prompt = result.projectInstructions+'\n'+result.startMessage;
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
 assert.ok(assisted.includes('Kurzbeschreibung ist fest gewählt'));
 assert.ok(assisted.includes('Frage nur nach der Figurenidee; keine Moduswahl/manuelle Option anbieten'));
 assert.ok(assisted.includes('Vorgaben bewahren'));
 assert.ok(!assisted.includes('Ich lege Name/Herkunft'));
 assert.ok(assisted.includes('Bestehende Figuren bewahren'));
 assert.ok(buildPrompt({...defaults,creation:'manual'}).includes('Ich lege Name/Herkunft'));
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
   assert.ok(p.includes('Rohwürfe abwarten'));
   assert.ok(p.includes('keine Würfelquote/Routinewürfe/künstlichen Teilschritte'));
   assert.ok(p.includes('Export ohne Wortlimit: vollständig ohne Chatverweise'));
   assert.ok(p.includes('nummerierte Teile'));
   assert.ok(p.includes('Fehlendes/Unsicheres kennzeichnen, nie erfinden'));
  }
 }
 assert.throws(()=>buildPrompt({...defaults,frequency:'action'}), /Ungültige/);
});
