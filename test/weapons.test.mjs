import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {weaponFromPreset,weaponPresets,damageBands,weaponProfileText} from '../src/weapons.mjs';
import {characterText,parseCharacter,serializeCharacter,validateCharacterDocument,continueCharacter,characterTemplate} from '../src/character.mjs';
import {characterReference} from '../src/character-reference.mjs';
import {createPlayState,parsePlayState} from '../src/play-state.mjs';
import {hitChance,damageOutcomes,duelProbability,comparisons} from '../scripts/combat-model.mjs';
const fixture=()=>JSON.parse(readFileSync(new URL('../examples/vesper-start.json',import.meta.url),'utf8'));

test('Creation JSON demonstrates valid weapon codes and non-weapons without losing localization',()=>{
 const prompt=characterTemplate('Eine Magierin.','Fantasy mit Magie.');
 const example=JSON.parse(prompt.slice(prompt.indexOf('{\n')));
 assert.deepEqual(validateCharacterDocument(example),[]);
 assert.deepEqual(parseCharacter(serializeCharacter(example)),example);
 assert.equal(example.confirmed,false);
 const weapon=example.character.inventory.find(i=>i.weapon);
 const tool=example.character.inventory.find(i=>!i.weapon);
 assert.ok(tool);assert.ok(weapon);
 assert.ok(prompt.includes(JSON.stringify(Object.keys(damageBands))));
 for(const code of Object.keys(damageBands)){
  const doc=structuredClone(example);doc.character.inventory[0].weapon.damage=code;
  assert.deepEqual(validateCharacterDocument(doc),[]);
 }
 for(const damage of ['leicht','gewöhnlich','schwer','heavy 4','W8',2,3,4]){
  const doc=structuredClone(example);doc.character.inventory[0].weapon.damage=damage;
  assert.throws(()=>serializeCharacter(doc));
 }
 assert.ok(prompt.includes('schema keys AND fixed code values remain in English'));
 assert.ok(prompt.includes('Ability damage remains descriptive text'));
 assert.ok(prompt.includes('language = German'));
});

test('Weapon profiles survive sheet, advancement, play export and both text outputs',()=>{
 for(const id of Object.keys(weaponPresets)){
  const doc=fixture(),profile=weaponFromPreset(id);doc.character.inventory[0].weapon=profile;
  assert.deepEqual(validateCharacterDocument(doc),[]);
  assert.deepEqual(parseCharacter(serializeCharacter(doc)),doc);
  const current=continueCharacter(doc);current.character.inventory[0].weapon.damage='light';
  assert.deepEqual(current.startCharacter.inventory[0].weapon,profile);
  for(const output of [characterText(doc),characterReference(doc)]){
   for(const key of ['range','handling','feature','limits'])assert.ok(output.includes(profile[key]),key);
  }
  assert.match(characterText(doc),new RegExp(`D${damageBands[profile.damage].die} only if selected`));
  assert.deepEqual(parsePlayState(JSON.stringify(createPlayState(doc,'Test'))).document,doc);
 }
});
test('Missing profiles keep confirmed weapons intact; malformed profiles fail instead of disappearing',()=>{
 const doc=fixture(),before=structuredClone(doc);serializeCharacter(doc);characterText(doc);characterReference(doc);
 assert.deepEqual(doc,before);assert.ok(!characterText(doc).includes('Weapon profile'));
 for(const invalid of [null,[],{}, {...weaponFromPreset('pistol'),damage:'huge'}, {...weaponFromPreset('rifle'),range:''}, {...weaponFromPreset('rifle'),range:'0'},{...weaponFromPreset('bow'),secret:'hidden'}]){
  const next=fixture();next.character.inventory[0].weapon=invalid;assert.throws(()=>serializeCharacter(next));
 }
 const p=weaponFromPreset('pistol');p.range='changed';assert.notEqual(weaponFromPreset('pistol').range,p.range);
 assert.throws(()=>weaponFromPreset('unknown'));assert.equal(weaponProfileText(null),'');
});
test('Hit probabilities include equality and the complete attack bonus',()=>{
 assert.equal(hitChance(4,13),.6);assert.equal(hitChance(2,13),.5);
 assert.equal(hitChance(4,13,'disadvantage'),.36);
 assert.equal(hitChance(4,13,'advantage'),.84);
 assert.equal(hitChance(0,1),1);assert.equal(hitChance(0,21),0);
});
test('Selected damage dice use bounded variation, not raw-die damage or fixed base',()=>{
 for(const [band,{base}]of Object.entries(damageBands)){
  assert.deepEqual(damageOutcomes(band),[[base,1]]);
  const selected=damageOutcomes(band,true);
  assert.deepEqual(selected.map(([d])=>d),[base-1,base,base+1]);
  assert.ok(Math.abs(selected.reduce((sum,[,p])=>sum+p,0)-1)<1e-12);
  assert.ok(Math.abs(selected.reduce((sum,[d,p])=>sum+d*p,0)-base)<1e-12);
 }
 assert.deepEqual(damageOutcomes('ordinary',true).map(([d,p])=>[d,Math.round(p*6)]),[[2,1],[3,4],[4,1]]);
});
test('Action-count comparison separates unfair numbers, real preparation and later power',()=>{
 const all=comparisons();
 assert.ok(all[1].win<all[0].win);
 assert.ok(all[2].win>all[1].win);
 assert.ok(all[3].win>all[0].win);
 assert.ok(all[5].win>all[4].win);
 const hero={hp:1,attack:20,defense:30,damage:'light'};
 assert.equal(duelProbability(hero,[{hp:2,attack:0,defense:10,damage:'light'}]),1);
 assert.equal(duelProbability({...hero,attack:-30},[{hp:2,attack:30,defense:10,damage:'light'}]),0);
});
