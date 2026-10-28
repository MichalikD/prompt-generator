import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {weaponFromPreset,weaponPresetId} from '../src/weapons.mjs';
import {continueCharacter,parseCharacter,serializeCharacter,characterText} from '../src/character.mjs';
import {characterReference} from '../src/character-reference.mjs';
import {createPlayState,parsePlayState} from '../src/play-state.mjs';
import {buildOutput,PLUGIN} from '../src/outputs.mjs';
import {defaults} from '../src/generator.mjs';
import {GENERATOR_VERSION,RULES_VERSION} from '../src/release.mjs';
const start=JSON.parse(readFileSync(new URL('../examples/vesper-start.json',import.meta.url),'utf8'));

test('Weapon selection identifies the entire profile, including after a real edit and restored import',()=>{
 for(const id of ['sword','dagger','bow','pistol','shotgun','rifle','automatic']){
  const profile=weaponFromPreset(id);
  assert.equal(weaponPresetId(JSON.parse(JSON.stringify(profile))),id);
  const custom={...profile,feature:profile.feature+' Einmal je voller Rast ein zusätzlicher Effekt.'};
  assert.equal(weaponPresetId(custom),'');
  assert.equal(weaponPresetId({...profile,range:'Berührung'}),'');
 }
 assert.equal(weaponPresetId(null),'');assert.equal(weaponPresetId({}), '');
});

test('A usable item reward and a learned power survive current-sheet and play exports without rewriting the start',()=>{
 const doc=continueCharacter(start),c=doc.character;
 const sword={name:'Frostschneide',quantity:1,slots:1,bonus:1,description:'Verdienter Lohn für die Befreiung der Passfeste.',weapon:{...weaponFromPreset('sword'),damage:'heavy',feature:'Schaden 4. Gewährt die Fähigkeit Frostgriff nur mit dieser Klinge.'}};
 c.inventory[0]=sword;
 c.abilities.push({name:'Frostgriff',range:'Nahkampf 1–2 m',targets:'Ein Ziel',damage:'Schwer 4; W8 nur wenn ausgewählt',effect:'Benötigt Frostschneide. Als Aktion normaler Angriff gegen Verteidigung. Bei Treffer kann das Ziel bis Ende seines nächsten Zuges nicht laufen.',cost:'Einmal je voller Rast, auch bei Fehlschlag verbraucht.',limits:'Nur mit Frostschneide in der Hand; keine zusätzliche Aktion. Bereits normaler schwerer Waffenschaden, nicht zweimal addieren.'});
 c.abilities.push({name:'Nachtblick',range:'20 m',targets:'Eigene Sicht',damage:'Kein Schaden',effect:'Erlernt: gewöhnliche Dunkelheit sehen.',cost:'Keine',limits:'Keine Sicht durch Hindernisse oder magische Verdunkelung.'});
 c.vitals.resources.push({name:'Fokus',current:5,max:5,effect:'Fähigkeiten speisen',cost:'Je Fähigkeit',regeneration:'Nach acht Stunden sicherer Ruhe vollständig.'});
 c.development.push({milestone:'Passfeste befreit',change:'Frostschneide erhalten und Nachtblick erlernt',benefit:'Schwerer Waffenschaden, itemgebundene Kontrolle und neue Sichtmöglichkeit.',limits:'Frostgriff hängt vom Besitz der Klinge ab; Nachtblick bleibt erlernt.'});
 doc.confirmed=true;
 const restored=parseCharacter(serializeCharacter(doc));
 const play=parsePlayState(JSON.stringify(createPlayState(restored,'Waffeneffekt bereits benutzt.')));
 assert.deepEqual(play.document,doc);assert.deepEqual(doc.startCharacter,start.character);
 assert.equal(start.character.abilities.length,0);
 const text=characterText(restored),overview=characterReference(play.document);
 for(const name of ['Frostschneide','Frostgriff','Nachtblick','Fokus','Passfeste befreit']){
  assert.ok(text.includes(name),name);assert.ok(overview.includes(name),name);
 }
 assert.match(text,/Damage: heavy 4; D8 only if selected/);
 assert.ok(overview.includes('Frostgriff hängt vom Besitz'));
 assert.equal(play.notes,'Waffeneffekt bereits benutzt.');
 // Removing an item does not discard separately learned abilities or the reward record.
 restored.character.inventory=[];
 assert.ok(parseCharacter(serializeCharacter(restored)).character.abilities.some(a=>a.name==='Nachtblick'));
});

test('Generator, plugin manifest and paired outputs agree on their expected version',()=>{
 const manifest=JSON.parse(readFileSync(new URL('../plugins/freie-spielleitung-02/plugin.json',import.meta.url),'utf8'));
 assert.equal(PLUGIN.version,RULES_VERSION);assert.equal(manifest.version,RULES_VERSION);
 const skill=readFileSync(new URL('../plugins/freie-spielleitung-02/skills/freie-spielleitung/SKILL.md',import.meta.url),'utf8');
 assert.ok(skill.includes('rules '+RULES_VERSION));
 for(const scope of ['short','medium','long'])for(const continuation of ['single','open','linked']){
  const output=buildOutput({...defaults,scope,continuation,characterSource:'prepared'},'plugin',start);
  const version=`Generator version: ${GENERATOR_VERSION}. Expected rules version: ${RULES_VERSION}.`;
  assert.ok(output.projectInstructions.includes(version));assert.ok(output.startMessage.includes(version));
  assert.ok(output.downloadText.includes(`Generator version: ${GENERATOR_VERSION}`));
  assert.ok(!output.startMessage.includes('0.14.0'));
  assert.ok(output.downloadText.includes(output.projectInstructions));
  assert.ok(output.downloadText.includes(output.startMessage));
 }
});
