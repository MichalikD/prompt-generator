import test from 'node:test';
import assert from 'node:assert/strict';
import {createHash} from 'node:crypto';
import {readFileSync} from 'node:fs';
import {defaults,buildCompactPackage} from '../src/generator.mjs';
import {buildOutput,worldForCharacter} from '../src/outputs.mjs';
import {characterText,characterTemplate,continueCharacter} from '../src/character.mjs';
import {narrativePolicy} from '../src/profile.mjs';

test('Plugin-Startpaket übergibt nur gewählten Umfang und Verlauf ohne allgemeinen Erzählabsatz',()=>{
 const scopeNames={short:'Short:',medium:'Medium:',long:'Extended:'};
 const campaignNames={open:'Open campaign:',linked:'Linked campaign:',single:'Single adventure:'};
 for(const scope of Object.keys(scopeNames))for(const continuation of Object.keys(campaignNames)) {
  const output=buildOutput({...defaults,scope,continuation},'plugin');
  const start=output.startMessage;
  for(const [id,name]of Object.entries(scopeNames))assert.equal(start.includes(name),id===scope);
  for(const [id,name]of Object.entries(campaignNames))assert.equal(start.includes(name),id===continuation);
  assert.ok(!start.includes(narrativePolicy));
  assert.ok(!start.includes('Medium allows'));
  assert.ok(!start.includes('with humour and rest'));
  assert.equal((start.match(/ADVENTURE PROFILE/g)||[]).length,1);
  assert.equal((start.match(/Powers:/g)||[]).length,1);
  assert.ok(start.includes('plugin fallback values'));
  assert.ok(start.includes('Read the GM skill'));
 }
});

test('Welt und Charaktertemplate unterscheiden Magieverbreitung von Stärke und Start von Entwicklung',()=>{
 for(const worldPowers of ['limited','common']) {
  const config={...defaults,worldPowers};
  const world=worldForCharacter(config),start=buildOutput(config,'plugin').startMessage;
  for(const text of [world,start]) {
   assert.ok(text.includes('agreed effects, costs and limits'));
   assert.ok(!text.includes('Limited supernatural powers;'));
   assert.ok(text.includes('character starts mortal'));
   assert.ok(text.includes('later changes of nature'));
  }
  if(worldPowers==='common')assert.ok(start.includes('powers are widespread'));
  else assert.ok(start.includes('world-scale strength may be established in play'));
  assert.ok(characterTemplate('Eine Magierin.',world).includes(world));
 }
 const mundane=buildOutput({...defaults,worldPowers:'none'},'plugin').startMessage;
 assert.ok(mundane.includes('No supernatural powers.'));
 assert.ok(!mundane.includes('Supernatural powers exist;'));
});

test('Leere Entwicklung bleibt offen und aktuelle Verbesserungen samt Originalbogen bleiben im Startpaket',()=>{
 const start=JSON.parse(readFileSync(new URL('../examples/vesper-start.json',import.meta.url),'utf8'));
 const text=characterText(start);
 assert.ok(text.includes('No advancement recorded yet.'));
 assert.ok(!text.includes('once confirmed'));
 assert.ok(text.includes('Confirmed starting sheet: Vesper'));
 const current=continueCharacter(start);
 current.character.attributes.insight+=1;
 current.character.development.push({milestone:'Erstes Abenteuer',change:'Gespür +1',benefit:'Aufmerksamer auf Reisen',limits:''});
 current.confirmed=true;
 const output=buildOutput({...defaults,characterSource:'prepared'},'plugin',current);
 assert.ok(output.startMessage.includes('Confirmed current character sheet: Vesper'));
 assert.ok(output.startMessage.includes('Erstes Abenteuer: Gespür +1'));
 assert.ok(output.startMessage.includes('ORIGINAL STARTING SHEET'));
 assert.equal(start.character.attributes.insight,0);
 assert.equal(start.character.development.length,0);
});

test('Eingefrorene kompakte Regel- und Profilausgabe bleibt identisch zum Stand vor 0.7',()=>{
 const fixtures=JSON.parse(readFileSync(new URL('./fixtures/compact-0.5-hashes.json',import.meta.url),'utf8'));
 for(const {override,sha256}of fixtures) {
  const actual=buildCompactPackage({...defaults,...override});
  assert.equal(createHash('sha256').update(JSON.stringify(actual)).digest('hex'),sha256,JSON.stringify(override));
 }
});
