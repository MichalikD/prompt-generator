import test from 'node:test';
import assert from 'node:assert/strict';
import {defaults,LIMIT,groups} from '../src/generator.mjs';
import {buildOutput,worldForCharacter} from '../src/outputs.mjs';
import {resolveWorld,validateWorld,worldTemplates,worldFields,worldSources} from '../src/worlds.mjs';
import {setupErrors} from '../src/setup.mjs';
const modes=['compact','plugin'];
const text=o=>o.projectInstructions+'\n'+o.startMessage;

test('Zehn Weltvorlagen liefern beiden Modi und dem Charaktertemplate dieselbe aufgelöste Welt',()=>{
 assert.equal(worldTemplates.length,10);
 for(const template of worldTemplates) {
  const config={...defaults,setting:template.id,...(template.id==='custom'?{worldDescription:'Inseln aus Glas. Keine Magie.'}:{})};
  const a=buildOutput(config,'compact'),b=buildOutput(config,'plugin');
  assert.deepEqual(a.profile.world,b.profile.world);
  assert.equal(a.profile.version,2);
  for(const o of [a,b])for(const f of worldFields)assert.ok(text(o).includes(f.options.find(x=>x.id===o.profile.world[f.key]).text));
  for(const f of worldFields)assert.ok(worldForCharacter(config).includes(f.options.find(x=>x.id===a.profile.world[f.key]).text));
  assert.deepEqual(setupErrors(0,config),[]);
 }
});

test('Abweichungen ersetzen Vorgaben, ohne widersprüchliche alte Kräfte in die Ausgaben zu übernehmen',()=>{
 for(const mode of modes) {
  const modern=text(buildOutput({...defaults,setting:'modern',worldPowers:'limited'},mode));
  assert.ok(modern.includes('three resource points'));
  assert.ok(!modern.includes('No supernatural abilities.'));
  assert.ok(!modern.includes('No supernatural powers.'));
  const fantasy=text(buildOutput({...defaults,setting:'fantasy',worldPowers:'none'},mode));
  assert.ok(!fantasy.includes('three resource points'));
  assert.ok(!fantasy.includes('Limited supernatural powers;'));
  assert.ok(fantasy.includes('No supernatural powers.'));
 }
});

test('Erkennbare Mischungen benötigen Bestätigung; ausdrückliche Widersprüche sind damit nicht überstimmbar',()=>{
 const mixed={...defaults,setting:'western',worldEra:'future',worldTechnology:'space'};
 assert.ok(resolveWorld(mixed).warnings.length);
 for(const mode of modes) {
  assert.throws(()=>buildOutput(mixed,mode),/Mischung bestätigen/);
  const o=buildOutput({...mixed,worldMixConfirmed:true},mode);
  assert.ok(text(o).includes('Deliberate hybrid'));
  assert.ok(text(o).includes('Space travel'));
  assert.equal(o.profile.world.era,'future');
  assert.ok(setupErrors(0,mixed).length);
 }
 for(const worldMixConfirmed of [true,'yes']) assert.throws(()=>validateWorld({...defaults,worldPowers:'none',worldPlayerKind:'god',worldMixConfirmed}),/widerspricht/);
 assert.throws(()=>validateWorld({...defaults,worldMixConfirmed:'perhaps'}),/Bestätigung/);
 for(const field of worldFields)assert.throws(()=>validateWorld({...defaults,[field.config]:'invalid'}),/Weltangabe/);
});

test('Vorbild, Kanon und Mythologie bleiben eindeutig; eine versteckte alte Referenz wird nicht übernommen',()=>{
 for(const source of worldSources.filter(s=>s.id!=='original')) {
  const config={...defaults,worldSource:source.id};
  assert.throws(()=>buildOutput(config,'plugin'),/Vorbild/);
  const world=worldForCharacter({...config,worldReference:'Eigenes Vorbild: nur Atmosphäre, keine Figuren.'});
  assert.ok(world.includes(source.text));assert.ok(world.includes('keine Figuren.'));
 }
 assert.ok(!worldForCharacter({...defaults,worldSource:'original',worldReference:'Alte Referenz'}).includes('Alte Referenz'));
 const config={...defaults,setting:'mythology',worldMythology:'Nordische Götterwelt.',worldSociety:'Eine eigene nordische Küstengesellschaft.'};
 for(const mode of modes){const s=text(buildOutput(config,mode));assert.ok(s.includes(config.worldMythology));assert.ok(!s.includes('Greek mythology'));}
 const god={...config,worldPlayerKind:'god',worldMixConfirmed:true};
 assert.ok(worldForCharacter(god).includes('no omnipotence'));
});

test('Auch maximale freie Weltvorgaben und kombinierte Kräfte passen ohne Kürzung in beide Ausgaben',()=>{
 const longest={...defaults,...Object.fromEntries(groups.filter(g=>g.id!=='setting').map(g=>[g.id,g.options.toSorted((a,b)=>b.text.length-a.text.length)[0].id])),extras:['d4','d6','d8','d10','d12','dpercent']};
 const config=Object.freeze({...longest,worldTechnology:'space',worldPowers:'common',worldPlayerKind:'god',worldMixConfirmed:true,worldSociety:'Kulturen 🦊\n'.repeat(1000),worldDescription:'Eigene Angaben\n'.repeat(1000)});
 const before=JSON.stringify(config);
 for(const mode of modes){const o=buildOutput(config,mode);assert.ok(o.projectInstructions.length<LIMIT);assert.ok(o.startMessage.includes(config.worldSociety.trim()));assert.ok(o.startMessage.includes(config.worldDescription.trim()));}
 assert.equal(JSON.stringify(config),before);
});

test('Alle strukturierten Weltmischungen bleiben ausgebbar; göttliche Figuren ohne Kräfte bleiben gesperrt',()=>{
 const longest={...defaults,...Object.fromEntries(groups.filter(g=>g.id!=='setting').map(g=>[g.id,g.options.toSorted((a,b)=>b.text.length-a.text.length)[0].id])),extras:['d4','d6','d8','d10','d12','dpercent']};
 let count=0;
 for(const t of worldTemplates)for(const era of worldFields[0].options)for(const technology of worldFields[1].options)for(const powers of worldFields[2].options)for(const playerKind of ['mortal','demigod','god']) {
  const config={...longest,setting:t.id,worldEra:era.id,worldTechnology:technology.id,worldPowers:powers.id,worldPlayerKind:playerKind,worldMixConfirmed:true,worldDescription:'Eigene Angaben zu den bewusst gewählten Entwicklungsständen und Kräften.'};
  if(powers.id==='none'&&playerKind!=='mortal') {for(const mode of modes)assert.throws(()=>buildOutput(config,mode),/widerspricht/);continue;}
  const a=buildOutput(config,'compact'),b=buildOutput(config,'plugin');
  assert.ok(a.projectInstructions.length<LIMIT);assert.deepEqual(a.profile,b.profile);
  assert.equal(a.profile.world.era,era.id);assert.equal(a.profile.world.technology,technology.id);assert.equal(a.profile.world.powers,powers.id);count++;
 }
 assert.equal(count,6370);
});
