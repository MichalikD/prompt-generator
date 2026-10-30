import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {continueCharacter,validateCharacterDocument,serializeCharacter,parseCharacter} from '../src/character.mjs';
import {characterReference} from '../src/character-reference.mjs';
import {createPlayState,parsePlayState} from '../src/play-state.mjs';
const base=JSON.parse(readFileSync(new URL('../examples/vesper-start.json',import.meta.url)));
test('earned talent bonuses round-trip without changing the original or notes',()=>{
 const current=continueCharacter(base);current.character.identity.description='Eine reisende Figur.';current.character.background={confirmed:'Ein alter Schwur.',open:'Herkunft ungeklärt.',excluded:'Keine vorbestimmte Herkunft.'};
 for(const bonus of [2,3,4,5]){
  current.character.talents[0].bonus=bonus;
  const next=parsePlayState(JSON.stringify(createPlayState(parseCharacter(serializeCharacter(current)),'Eigene Notizen.')));
  assert.equal(next.document.character.talents[0].bonus,bonus);assert.deepEqual(next.document.startCharacter,base.character);assert.equal(next.notes,'Eigene Notizen.');
  const ref=characterReference(next.document);for(const text of ['Eine reisende Figur.','Ein alter Schwur.','Herkunft ungeklärt.','Keine vorbestimmte Herkunft.'])assert.ok(ref.includes(text));
 }
 for(const bonus of [1,6,2.5]){current.character.talents[0].bonus=bonus;assert.ok(validateCharacterDocument(current).length);}
 const start=structuredClone(base);start.character.talents[0].bonus=3;assert.ok(validateCharacterDocument(start).length);
});
