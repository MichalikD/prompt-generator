import test from 'node:test';
import assert from 'node:assert/strict';
import { defaults, LIMIT } from '../src/generator.mjs';
import { buildOutput } from '../src/outputs.mjs';
import { focuses, narrativePolicy } from '../src/profile.mjs';
const modes=['compact','plugin'];
const combined=o=>o.projectInstructions+'\n'+o.startMessage;

test('Eigene Welt ist erforderlich; Presets erlauben dieselbe optionale Ergänzung',()=>{
 for(const mode of modes) {
  for(const worldDescription of [undefined,'','  ']) assert.throws(()=>buildOutput({...defaults,setting:'custom',worldDescription},mode),/beschreibe/);
  for(const setting of ['custom','fantasy','modern','cyberpunk']) {
   const o=buildOutput({...defaults,setting,worldDescription:'  Auf schwimmenden Inseln.\nKeine Menschen.  '},mode);
   assert.equal(o.profile.worldDescription,'Auf schwimmenden Inseln.\nKeine Menschen.');
   assert.ok(combined(o).includes(o.profile.worldDescription));
   assert.ok(!combined(o).includes('Fehlende Welt/Magie-/Technikangaben klären'));
  }
 }
});

test('Umfang und Verlauf sind unabhängig; beide Modi erhalten identische Profile',()=>{
 for(const scope of ['short','medium','long']) for(const continuation of ['single','linked','open']) {
  const config={...defaults,scope,continuation,focus:['social','action'],wishes:'Keine Amnesie.',worldDescription:'Die Küste ist vereist.'};
  const a=buildOutput(config,'compact'), b=buildOutput(config,'plugin');
  assert.deepEqual(a.profile,b.profile);
  for(const o of [a,b]) {
   const text=combined(o);
   assert.ok(text.includes('Keine Amnesie.'));
   assert.ok(text.includes('Die Küste ist vereist.'));
   assert.ok(text.includes(narrativePolicy));
   assert.equal(o.profile.scope,scope); assert.equal(o.profile.continuation,continuation);
  }
 }
});

test('Kein, ein oder zwei Schwerpunkte sind erlaubt; ungültige Daten werden abgewiesen',()=>{
 const choices=[[],...focuses.map(f=>[f.id]),...focuses.flatMap((f,i)=>focuses.slice(i+1).map(g=>[f.id,g.id]))];
 for(const mode of modes) {
  for(const focus of choices) assert.deepEqual(buildOutput({...defaults,focus},mode).profile.focus,focus);
  for(const focus of [['action','social','mystery'],['action','action'],['unknown'],'action']) assert.throws(()=>buildOutput({...defaults,focus},mode),/schwerpunkte/);
  for(const field of ['worldDescription','wishes']) assert.throws(()=>buildOutput({...defaults,[field]:{}},mode),/Text/);
 }
});

test('Lange freie Angaben bleiben vollständig erhalten und sprengen nur die Startnachricht',()=>{
 const worldDescription='Weltbeschreibung mit Ä, 🦇 und Zeilenumbruch.\n'.repeat(400);
 const wishes='Keine Erinnerungslücken.\n'.repeat(400);
 const config=Object.freeze({...defaults,setting:'custom',worldDescription,wishes,focus:Object.freeze(['discovery','social'])});
 const snapshot=JSON.stringify(config);
 for(const mode of modes) {
  const output=buildOutput(config,mode);
  assert.ok(output.projectInstructions.length<LIMIT);
  assert.ok(output.startMessage.length>LIMIT);
  assert.ok(output.startMessage.includes(worldDescription.trim()));
  assert.ok(output.startMessage.includes(wishes.trim()));
  assert.ok(output.downloadText.includes(output.projectInstructions));
  assert.ok(output.downloadText.includes(output.startMessage));
  if(mode==='compact') {
   assert.equal(output.profileExternal,true);
   assert.ok(output.projectInstructions.includes('Warte mit dem Spielstart darauf'));
  }
 }
 assert.equal(JSON.stringify(config),snapshot);
});
