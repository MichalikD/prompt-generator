import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {defaults} from '../src/generator.mjs';
import {buildOutput,worldForCharacter,PLUGIN} from '../src/outputs.mjs';
import {characterTemplate,validateCharacterDocument,serializeCharacter,parseCharacter} from '../src/character.mjs';

const base=JSON.parse(readFileSync(new URL('../examples/vesper-start.json',import.meta.url),'utf8'));

test('Gewählter Ton und Todesverfahren bleiben unabhängig und eindeutig im aktiven Paket',()=>{
 for(const tone of ['cozy','adventure','dark','horror'])for(const death of ['standard','hardcore']) {
  const {projectInstructions,startMessage}=buildOutput({...defaults,tone,death});
  assert.ok(projectInstructions.includes(`rules version ${PLUGIN.version}`));
  assert.ok(projectInstructions.includes('player control of their character'));
  assert.equal(startMessage.includes('Standard: the world permits'),death==='standard');
  assert.equal(startMessage.includes('Hardcore: the same world danger'),death==='hardcore');
  assert.equal(startMessage.includes('Cozy: a reassuring atmosphere'),tone==='cozy');
  assert.equal(startMessage.includes('Hostile actors may attack'),tone==='adventure');
  assert.ok(!projectInstructions.includes('no forced combat'));
 }
});

test('Aktive Weltvorgaben tragen Fantasy weiter, ohne ausgeschlossene Kräfte einzuschmuggeln',()=>{
 for(const powers of ['limited','common','none']) {
  const config={...defaults,worldPowers:powers};
  const world=worldForCharacter(config),output=buildOutput(config).startMessage;
  if(powers==='none') {
   assert.ok(world.includes('No supernatural abilities.'));
   assert.ok(output.includes('respecting the exclusion of supernatural powers'));
   assert.ok(!world.includes('damaging powers'));
  } else {
   for(const text of [world,output])assert.ok(text.includes('Make fantasy present throughout the campaign'));
   assert.ok(world.includes('effective abilities, including damaging powers'));
   assert.ok(world.includes('not a limit on the potency'));
   assert.ok(!world.includes('Limited supernatural powers;'));
  }
 }
 const mundane=worldForCharacter({...defaults,setting:'modern'});
 assert.ok(!mundane.includes('Make fantasy present'));
 assert.ok(mundane.includes('No supernatural powers.'));
});

test('Schadensfähigkeiten behalten Wirkung und Konsequenzen durch Import, Bestätigung und Startnachricht',()=>{
 const doc=structuredClone(base);
 doc.character.identity.name='Sera';
 doc.character.identity.ancestry='Mensch';
 doc.character.identity.description='Kampferfahrene reisende Feuermagierin.';
 doc.character.abilities=[{name:'Flammenstoß',effect:'15 m; ein Ziel; W20 + Intellekt + Feuerkunst gegen Verteidigung; Schaden 3. Kann trockenes Material am Einschlag entzünden.',cost:'1 Äther, auch bei Fehlschlag',limits:'Eine Aktion; keine automatische Immunität von Verbündeten; keine automatische Entzündung eines ganzen Gebäudes.'}];
 doc.character.vitals.resources=[{name:'Äther',current:3,max:3,effect:'Zauber wirken',cost:'Je Fähigkeit',regeneration:'Nach sicherer Nachtruhe vollständig'}];
 assert.deepEqual(validateCharacterDocument(doc),[]);
 const imported=parseCharacter(serializeCharacter(doc));
 const before=JSON.stringify(imported);
 const output=buildOutput({...defaults,characterSource:'prepared'},'plugin',imported);
 for(const row of imported.character.abilities)for(const value of Object.values(row))assert.ok(output.startMessage.includes(value));
 assert.equal(JSON.stringify(imported),before);
 assert.ok(!output.startMessage.includes('Character creation:'));
 assert.equal(output.startMessage.includes('no direct damage'),false);
});

test('Erstellungsvorgaben definieren Schadensmagie und Standardwerte ohne einen schwachen Magier zu erzwingen',()=>{
 const template=characterTemplate('Mächtige Nekromantin.',worldForCharacter(defaults));
 for(const phrase of ['requested identity and power scale','Damaging powers normally use the standard D20','one attack roll','including allies','independently of ability count or potency','do not return incompatible JSON'])assert.ok(template.includes(phrase),phrase);
 const structure=JSON.parse(template.slice(template.indexOf('{\n')));
 assert.deepEqual(validateCharacterDocument(structure),[]);
 assert.equal(structure.confirmed,false);
});
