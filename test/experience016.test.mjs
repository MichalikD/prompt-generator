import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {continueCharacter,serializeCharacter,parseCharacter,validateCharacterDocument,characterText,characterTemplate} from '../src/character.mjs';
import {characterReference} from '../src/character-reference.mjs';
import {createPlayState,parsePlayState} from '../src/play-state.mjs';
const base=JSON.parse(readFileSync(new URL('../examples/vesper-start.json',import.meta.url)));
test('EXP and unlocked choices survive current sheet, overview and notes without rewriting the start',()=>{
 const current=continueCharacter(base);current.character.progression={xp:1,available:2};
 const next=parseCharacter(serializeCharacter(current));
 assert.deepEqual(next.character.progression,{xp:1,available:2});assert.deepEqual(next.startCharacter,base.character);
 assert.match(characterText(next),/EXP: 1\/2; available personal improvements: 2/);
 assert.match(characterReference(next),/EXP: 1\/2 · Verfügbare Verbesserungen: 2/);
 assert.deepEqual(parsePlayState(JSON.stringify(createPlayState(next,'Gewonnene Klinge bleibt unabhängig.'))).document,next);
 for(const value of [{xp:2,available:0},{xp:0,available:-1},{xp:.5,available:0},{xp:0,available:1,extra:true}]){next.character.progression=value;assert.ok(validateCharacterDocument(next).length);}
 const start=structuredClone(base);start.character.progression={xp:1,available:0};assert.ok(validateCharacterDocument(start).length);
 const template=characterTemplate();const proposed=JSON.parse(template.slice(template.indexOf('{\n')));assert.deepEqual(proposed.character.progression,{xp:0,available:0});assert.deepEqual(validateCharacterDocument(proposed),[]);
});
