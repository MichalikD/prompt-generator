import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {defaults,groups} from '../src/generator.mjs';
import {buildOutput,worldForCharacter} from '../src/outputs.mjs';
import {characterTemplate} from '../src/character.mjs';
import {worldDraftTemplate,crewDraftTemplate} from '../src/preparation.mjs';
import {worldKey} from '../src/preparation-data.mjs';
import {parseCampaigns} from '../src/campaigns.mjs';

const choices=id=>groups.find(g=>g.id===id).options.map(o=>o.id);
const hero=JSON.parse(readFileSync(new URL('../examples/vesper-start.json',import.meta.url)));

test('Dynamic and Clear are independent defaults; all tone/depiction/scope/campaign combinations preserve a confirmed hero',()=>{
 assert.equal(defaults.scope,'dynamic');assert.equal(defaults.depiction,'clear');
 const original=JSON.stringify(hero);
 for(const tone of choices('tone'))for(const depiction of choices('depiction'))for(const scope of choices('scope'))for(const continuation of choices('continuation')){
  const config={...defaults,tone,depiction,scope,continuation,characterSource:'prepared'};
  const output=buildOutput(config,'plugin',hero);
  assert.equal(output.profile.scope,scope);assert.equal(output.profile.depiction,depiction);
  assert.equal(output.profile.tone,tone);assert.equal(output.profile.continuation,continuation);
  assert.equal((output.startMessage.match(/World depiction:/g)||[]).length,1);
  assert.equal((output.startMessage.match(/Adventure scope:/g)||[]).length,1);
  assert.equal((output.startMessage.match(/Campaign structure:/g)||[]).length,1);
  assert.match(output.startMessage,/Confirmed starting sheet: Vesper/);
  if(scope==='dynamic')assert.match(output.startMessage,/both brief conflicts and more developed arcs/);
  else assert.ok(!output.startMessage.includes('Dynamic:'));
 }
 assert.equal(JSON.stringify(hero),original);
 assert.throws(()=>buildOutput({...defaults,depiction:'adult'}),/Darstellung|Einstellung/);
});

test('Presentation reaches all draft workflows without granting test techniques or changing world compatibility',()=>{
 for(const depiction of choices('depiction')){
  const config={...defaults,depiction,tone:'dark'};
  const world=worldForCharacter(config);
  const crew=crewDraftTemplate({...config,characterSource:'prepared',characterWorld:worldKey(config)},'Eine unabhängige Gruppe.',hero);
  for(const text of [world,worldDraftTemplate(config),characterTemplate('Ein Kämpfer.',world),crew]){
   assert.match(text,/World depiction:/);assert.match(text,/Dark:/);
   assert.ok(!text.includes('OPENING IMPULSE'));
  }
 }
 const template=characterTemplate('Ein Kämpfer.',worldForCharacter(defaults));
 assert.match(template,/not one use per full rest/);
 assert.match(template,/Do not grant Counterstrike or Trip Hook automatically/);
 assert.match(template,/selected category dice retain their existing band variation/);
});

test('Campaign archives retain explicit scope and depiction instead of silently taking new defaults',()=>{
 const output=buildOutput({...defaults,scope:'short',depiction:'restrained'});
 const campaign={id:'test',name:'Test',updatedAt:'2026-11-17T12:00:00Z',config:{...defaults,scope:'short',depiction:'restrained'},document:null,output};
 const parsed=parseCampaigns(JSON.stringify({format:'open-game-master-campaigns',version:1,campaigns:[campaign]}));
 assert.equal(parsed.campaigns[0].config.scope,'short');
 assert.equal(parsed.campaigns[0].config.depiction,'restrained');
 assert.equal(parsed.campaigns[0].output.startMessage,output.startMessage);
});
