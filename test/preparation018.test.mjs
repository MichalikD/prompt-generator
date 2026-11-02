import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {worldDraftTemplate,crewDraftTemplate} from '../src/preparation.mjs';
import {characterTemplate,validateCharacterDocument} from '../src/character.mjs';
import {defaults} from '../src/generator.mjs';
import {buildOutput} from '../src/outputs.mjs';
import {setupErrors} from '../src/setup.mjs';
import {worldTemplates} from '../src/worlds.mjs';
const hero=JSON.parse(readFileSync(new URL('../examples/vesper-start.json',import.meta.url)));

test('world drafting covers every template before its required description is complete',()=>{
 for(const setting of worldTemplates.map(w=>w.id)){
  const config={...defaults,setting,worldDescription:'',wishes:'Keine Gedankenkontrolle.'},before=structuredClone(config);
  const template=worldDraftTemplate(config,'Eine Region zwischen rivalisierenden Mächten.');
  for(const text of ['language = German',config.wishes,'rivalisierenden Mächten','not a fixed plot','naming conventions'])assert.ok(template.includes(text),text);
  assert.deepEqual(config,before);
 }
 const unfinished={...defaults,setting:'custom',worldDescription:''};
 worldDraftTemplate(unfinished);assert.ok(setupErrors(0,unfinished).length);assert.throws(()=>buildOutput(unfinished),/eigene Welt/);
});
test('drafts retain explicit world constraints and canon gaps without copying hidden opening impulses',()=>{
 const config={...defaults,setting:'scifi',worldPowers:'none',worldSociety:'Isolierte Mondkolonien.',worldSource:'canon',worldReference:'',openingEnabled:true,openingSeed:'ogm1-8356a524',crewBrief:'Bereits vorhandene Crew.'};
 for(const template of [worldDraftTemplate(config),crewDraftTemplate(config)]){
  assert.ok(template.includes('No supernatural powers.'));assert.ok(template.includes(config.worldSociety));assert.ok(template.includes('Reference missing'));
  assert.ok(!template.includes(config.openingSeed));assert.ok(!template.includes(config.crewBrief));
 }
 assert.throws(()=>buildOutput(config),/Vorbild/);
});
test('short character ideas authorize a reviewed rich draft while explicit open facts remain open',()=>{
 const template=characterTemplate('Eine Piratin. Herkunft ausdrücklich offen.','Raumfahrt ohne Magie.');
 assert.ok(template.includes('one- or two-sentence idea'));assert.ok(template.includes('Do not leave background empty merely'));
 assert.ok(template.includes('Explicitly open areas stay open'));assert.ok(template.includes('whole draft'));
 assert.ok(template.includes('do not present climbing, persuasion'));assert.ok(!template.includes('Do not invent confirmed history during creation'));
 const example=JSON.parse(template.slice(template.indexOf('{\n')));
 assert.deepEqual(validateCharacterDocument(example),[]);assert.equal(example.confirmed,false);
});
test('crew draft is an independent optional proposal, not a rewrite of the hero',()=>{
 const before=structuredClone(hero),config={...defaults,companions:'occasional'};
 const template=crewDraftTemplate(config,'Eine kleine Schiffsbesatzung.',hero);
 assert.ok(template.includes(hero.character.identity.description));assert.ok(template.includes('separate document'));
 assert.ok(template.includes('who is actually present'));assert.ok(template.includes('not override that choice'));assert.ok(!template.includes('undefined'));
 assert.deepEqual(hero,before);
});
test('adopted crew text appears once in start package, not in the confirmed sheet or project rules',()=>{
 const brief='Mara befehligt die Morgenröte; Ilya bleibt im Heimathafen.',config={...defaults,crewBrief:brief,characterSource:'prepared'},before=structuredClone(hero);
 const output=buildOutput(config,'plugin',hero);
 assert.equal(output.startMessage.split(brief).length-1,1);assert.ok(output.downloadText.includes(brief));
 assert.ok(!output.projectInstructions.includes(brief));assert.deepEqual(hero,before);
 assert.ok(!buildOutput({...defaults,crewBrief:'  '}).startMessage.includes('SEPARATE CREW'));
 assert.throws(()=>buildOutput({...defaults,crewBrief:{name:'X'}}),/Text/);
});
