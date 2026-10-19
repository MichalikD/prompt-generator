import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {defaults} from '../src/generator.mjs';
import {setupErrors,stepForGroup} from '../src/setup.mjs';
import {buildOutput} from '../src/outputs.mjs';
const figure=JSON.parse(readFileSync(new URL('../examples/vesper-start.json',import.meta.url),'utf8'));
const config={...defaults,characterSource:'prepared'};

test('Eigene Welt blockiert den ersten Schritt, ein fehlender Bogen erst den Figurenschritt',()=>{
 const custom={...config,setting:'custom',worldDescription:''};
 assert.match(setupErrors(0,custom)[0],/beschreibe/);
 assert.deepEqual(setupErrors(0,{...custom,worldDescription:'Eine Welt im ewigen Winter.'}),[]);
 assert.deepEqual(setupErrors(1,config),[]);
 assert.match(setupErrors(2,config)[0],/Bogen/);
 assert.deepEqual(setupErrors(2,{...config,characterSource:'chat'}),[]);
});
test('Ausgabe verlangt gültige Welt, Optionen und ausdrücklich bestätigte Figur',()=>{
 assert.deepEqual(setupErrors(3,config,figure),[]);
 assert.match(setupErrors(3,config,{...figure,confirmed:false})[0],/bestätigen/);
 const bad=structuredClone(figure);bad.character.finances.funds=[{currency:'Credits',amount:-1}];
 assert.ok(setupErrors(3,config,bad).length);
 assert.ok(setupErrors(3,{...config,focus:['social','action','mystery']},figure).length);
 for(const mode of ['compact','plugin']) {
  const output=buildOutput(config,mode,figure);
  assert.equal(output.startMessage.split('Confirmed starting sheet: Vesper').length-1,1);
 }
});
test('Einstellungen werden den passenden Vorbereitungsschritten zugeordnet',()=>{
 assert.equal(stepForGroup('setting'),0);assert.equal(stepForGroup('creation'),2);
 for(const id of ['tone','scope','continuation','focus','death','extras','roller'])assert.equal(stepForGroup(id),1);
});
