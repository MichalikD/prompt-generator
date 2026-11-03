import {characterTemplate} from '../src/character.mjs';
import {drawDraftImpulse,draftImpulseText} from '../src/draft-impulses.mjs';
import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {parseDraft,validateDraft,draftText,worldBaseKey,worldKey,crewKey,characterReviewError,crewReviewError} from '../src/preparation-data.mjs';
import {worldDraftTemplate,crewDraftTemplate} from '../src/preparation.mjs';
import {worldForCharacter,buildOutput} from '../src/outputs.mjs';
import {validateWorld} from '../src/worlds.mjs';
import {defaults} from '../src/generator.mjs';
import {setupErrors} from '../src/setup.mjs';
const fixture=name=>JSON.parse(readFileSync(new URL(`../examples/${name}.json`,import.meta.url)));
function setup(){
 const hero=fixture('vesper-start'),world=fixture('world-draft'),crew=fixture('crew-draft'),config={...defaults,characterSource:'prepared'};
 world.confirmed=true;crew.confirmed=true;config.worldDocument=JSON.stringify(world);config.worldDraftBasis=worldBaseKey(config);config.characterWorld=worldKey(config);config.crewDocument=JSON.stringify(crew);config.crewDraftBasis=crewKey(config,hero);
 return {hero,world,crew,config};
}
const templateJSON=template=>JSON.parse(template.slice(template.lastIndexOf('\n\n{')+2));
test('world and crew templates end in valid unconfirmed JSON with editable descriptive fields',()=>{
 const {config,hero}=setup();
 for(const [kind,template]of [['world',worldDraftTemplate(config)],['crew',crewDraftTemplate(config,'Zwei Freunde',hero)]]){
  const example=templateJSON(template);assert.deepEqual(validateDraft(example,kind),[]);assert.equal(example.confirmed,false);
  assert.ok(template.includes('exactly one JSON object'));assert.ok(template.includes('no Markdown'));assert.ok(template.includes('images'));
  assert.deepEqual(parseDraft(JSON.stringify(example),kind),example);
 }
});
test('malformed JSON, unknown fields, wrong shapes and visual content are rejected without changing the source',()=>{
 for(const kind of ['world','crew']){
  const valid=fixture(`${kind}-draft`);assert.deepEqual(parseDraft(valid,kind),valid);
  const key=kind==='world'?'premise':'connection';
  for(const value of ['![Bild](https://example.test/a.png)','https://example.test/','<img src="x">','# Titel','**fett**','```json\n{}\n```']){
   const doc=structuredClone(valid);doc[kind][key]=value;const original=structuredClone(doc);assert.throws(()=>parseDraft(doc,kind),/Klartext/);assert.deepEqual(doc,original);
  }
  for(const invalid of [null,[],{},true,{...valid,unknown:'x'},{...valid,confirmed:'false'},{...valid,[kind]:null}])assert.throws(()=>parseDraft(invalid,kind));
  assert.throws(()=>parseDraft('```json\n'+JSON.stringify(valid)+'\n```',kind),/JSON/);
  assert.throws(()=>parseDraft(fixture(kind==='crew'?'world-draft':'crew-draft'),kind),/Format|Feld/);
 }
});
test('renderer retains facts and starting presence without raw schema or approval notes in the game package',()=>{
 const {hero,world,crew,config}=setup(),before=structuredClone(hero);
 const output=buildOutput(config,'plugin',hero);
 for(const text of [world.world.name,world.world.premise,crew.crew.members[0].name,crew.crew.members[0].whereabouts])assert.ok(output.startMessage.includes(text));
 assert.ok(draftText(crew,'crew').includes('not present with the main character'));
 for(const text of ['open-game-master-world','open-game-master-crew','"confirmed"','Optionaler Gefährtenentwurf','Der gesamte Entwurf'])assert.ok(!output.startMessage.includes(text));
 assert.deepEqual(hero,before);assert.ok(worldForCharacter(config).includes(world.world.name));
});
test('world revision blocks dependent output until world, character and crew have each been reviewed',()=>{
 const {hero,config}=setup();assert.deepEqual(setupErrors(3,config,hero),[]);
 config.worldSociety='Eine veränderte Gesellschaft.';
 assert.throws(()=>validateWorld(config),/Weltentwurf/);assert.throws(()=>buildOutput(config,'plugin',hero),/prüfen|Weltentwurf/);
 config.worldDraftBasis=worldBaseKey(config);assert.ok(characterReviewError(config));
 config.characterWorld=worldKey(config);assert.ok(crewReviewError(config,hero));
 config.crewDraftBasis=crewKey(config,hero);assert.deepEqual(setupErrors(3,config,hero),[]);
 buildOutput(config,'plugin',hero);
});
test('a current character edit or companion choice invalidates crew while unrelated play options do not',()=>{
 const {hero,config}=setup();const original=structuredClone(hero);
 config.visibility=config.visibility==='open'?'compact':'open';config.extras=['d6'];assert.equal(crewReviewError(config,hero),'');
 hero.character.identity.description+=' Zusätzliche Eigenart.';assert.ok(crewReviewError(config,hero));
 config.crewDraftBasis=crewKey(config,hero);assert.equal(crewReviewError(config,hero),'');
 config.companions=config.companions==='team'?'occasional':'team';assert.ok(crewReviewError(config,hero));
 assert.notDeepEqual(hero,original);
});
test('crew template and package require a valid adopted character for the current world',()=>{
 const {hero,config}=setup();
 for(const doc of [null,{...hero,confirmed:false},{...hero,character:{}}])assert.throws(()=>crewDraftTemplate(config,'',doc),/Charakterbogen/);
 assert.throws(()=>crewDraftTemplate({...config,characterSource:'chat'},'',hero),/Charakterbogen/);
 assert.throws(()=>crewDraftTemplate({...config,characterWorld:''},'',hero),/übernehmen/);
 assert.throws(()=>buildOutput({...config,characterSource:'chat'},'plugin'),/Crew|Charakterbogen/);
 const chat={...config,characterSource:'chat',crewDocument:'',worldSociety:'Neu'};chat.worldDraftBasis=worldBaseKey(chat);
 assert.ok(buildOutput(chat).startMessage.includes('Follow the selected character creation method'));
});
test('structured own world can satisfy world foundation; unadopted and stale imports cannot',()=>{
 const world=fixture('world-draft'),config={...defaults,setting:'custom',worldDocument:JSON.stringify(world)};
 config.worldDraftBasis=worldBaseKey(config);assert.throws(()=>validateWorld(config),/übernehmen/);
 world.confirmed=true;config.worldDocument=JSON.stringify(world);assert.equal(validateWorld(config).description.includes(world.world.name),true);
 config.worldDocument=JSON.stringify({...world,world:{...world.world,name:'Anderer Name'}});assert.ok(characterReviewError({...config,characterSource:'prepared',characterWorld:worldKey({...config,worldDocument:JSON.stringify(world)})}));
});

test('draft impulses affect only their own optional template and preserve its schema',()=>{
 const {hero,config}=setup();
 const before=buildOutput(config,'plugin',hero);
 for(const [kind,render] of [
  ['world',id=>worldDraftTemplate(config,'Eine feste Idee.',id)],
  ['character',id=>characterTemplate('Eine feste Idee.',worldForCharacter(config),id)],
  ['crew',id=>crewDraftTemplate(config,'Eine feste Idee.',hero,id)],
 ]){
  const first=drawDraftImpulse(kind),next=drawDraftImpulse(kind,first.id);
  assert.notEqual(next.id,first.id);
  assert.ok(!render().includes('OPTIONAL DRAFT IMPULSE'));
  assert.ok(render(first.id).includes(draftImpulseText(kind,first.id)));
  assert.ok(render(next.id).includes(next.text));
  assert.ok(render(first.id).includes('Eine feste Idee.'));
  assert.deepEqual(templateJSON(render(first.id)),templateJSON(render()));
 }
 assert.deepEqual(buildOutput(config,'plugin',hero),before);
});
