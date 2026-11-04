import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {defaults} from '../src/generator.mjs';
import {worldDraftTemplate,crewDraftTemplate} from '../src/preparation.mjs';
import {characterTemplate} from '../src/character.mjs';
import {worldBaseKey,worldKey,crewKey} from '../src/preparation-data.mjs';
import {worldForCharacter,buildOutput} from '../src/outputs.mjs';
import {drawDraftImpulse} from '../src/draft-impulses.mjs';

const fixture=name=>JSON.parse(readFileSync(new URL(`../examples/${name}.json`,import.meta.url)));
function setup(){
 const config={...defaults,characterSource:'prepared'},world=fixture('world-draft'),hero=fixture('vesper-start'),crew=fixture('crew-draft');
 world.confirmed=hero.confirmed=crew.confirmed=true;
 config.worldDocument=JSON.stringify(world);config.worldDraftBasis=worldBaseKey(config);config.characterWorld=worldKey(config);
 config.crewDocument=JSON.stringify(crew);config.crewDraftBasis=crewKey(config,hero);
 return {config,hero};
}
const json=text=>JSON.parse(text.slice(text.lastIndexOf('\n\n{')+2));
test('optional selection preserves the full direct template and its exact final JSON schema for every draft',()=>{
 const {config,hero}=setup(),world=worldForCharacter(config);
 const factories={world:(impulse,options)=>worldDraftTemplate(config,'Meine Vorgabe',impulse,options),character:(impulse,options)=>characterTemplate('Meine Vorgabe',world,impulse,options),crew:(impulse,options)=>crewDraftTemplate(config,'Meine Vorgabe',hero,impulse,options)};
 for(const [kind,make] of Object.entries(factories)){
  const direct=make(),multiple=make(undefined,{alternatives:true});
  assert.equal(make(undefined,{alternatives:false}),direct);
  assert.ok(!direct.includes('STAGE 1'));assert.ok(multiple.endsWith(direct));
  assert.deepEqual(json(multiple),json(direct));assert.equal(json(multiple).confirmed,false);
  assert.match(multiple,/Generate five possible responses/);assert.match(multiple,/Stop and wait for my selection/);
  assert.match(multiple,/uncalibrated model estimates/);assert.match(multiple,/apply only to Stage 2/);
  const impulse=drawDraftImpulse(kind).id,combined=make(impulse,{alternatives:true});
  assert.match(combined,/OPTIONAL DRAFT IMPULSE/);assert.match(combined,/STAGE 1/);
  assert.match(combined,/Explicit user facts, exclusions, intentionally open areas/);
 }
});
test('character and crew selection retains the adopted context and cannot bypass the crew prerequisite',()=>{
 const {config,hero}=setup(),world=worldForCharacter(config);
 assert.ok(characterTemplate('',world,undefined,{alternatives:true}).includes(world));
 const crew=crewDraftTemplate(config,'',hero,undefined,{alternatives:true});
 assert.ok(crew.includes(hero.character.identity.name));assert.ok(crew.includes('MAIN CHARACTER DRAFT'));
 assert.throws(()=>crewDraftTemplate(config,'',null,undefined,{alternatives:true}),/Figur|Bogen|Charakter/);
 const output=buildOutput(config,'plugin',hero);
 assert.ok(!output.startMessage.includes('STAGE 1'));assert.ok(!output.projectInstructions.includes('VERBALIZED SAMPLING'));
});
