import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {abilityRange,validateCharacterDocument,serializeCharacter,parseCharacter,characterText,characterTemplate,continueCharacter} from '../src/character.mjs';
import {characterReference} from '../src/character-reference.mjs';
import {createPlayState,parsePlayState} from '../src/play-state.mjs';
const figure=JSON.parse(readFileSync(new URL('../examples/vesper-start.json',import.meta.url),'utf8'));
const legacy={name:'Frost',effect:'Ein sichtbares Ziel in 15 m; 2 Schaden, eine Aktion.',cost:'Kostenfrei.',limits:'Keine Wirkung durch Wände.'};
test('Zusätzliche Fähigkeitsfelder sind optional; alte Aussagen und Originalbogen bleiben erhalten',()=>{
 const doc=structuredClone(figure);doc.character.abilities=[legacy];
 assert.deepEqual(validateCharacterDocument(doc),[]);
 assert.equal(abilityRange(legacy),'Siehe Wirkung / Grenzen');
 assert.deepEqual(parseCharacter(serializeCharacter(doc)),doc);
 const current=continueCharacter(doc);current.character.abilities[0].range='20 m';
 assert.equal(current.startCharacter.abilities[0].range,undefined);
 assert.equal(current.startCharacter.abilities[0].effect,legacy.effect);
 assert.deepEqual(parsePlayState(JSON.stringify(createPlayState(current,'Notiz'))).document,current);
 assert.match(characterReference(doc),/Reichweite: Siehe Wirkung \/ Grenzen/);
 assert.match(characterText(doc),/15 m; 2 Schaden/);
});
test('Explizit leere oder 0-Reichweite bedeutet unbegrenzt; Berührung und bedingte Bereiche bleiben Text',()=>{
 for(const range of ['', '0',' 0 '])assert.equal(abilityRange({...legacy,range}),'Ohne Reichweitenbeschränkung');
 for(const range of ['Berührung','5 m, verstärkt 10 m'])assert.equal(abilityRange({...legacy,range}),range);
 const doc=structuredClone(figure);doc.character.abilities=[{...legacy,range:'15 m',targets:'3 m Radius, einschließlich Verbündeter',damage:'2, einmal je getroffenem Ziel'}];
 assert.deepEqual(validateCharacterDocument(doc),[]);
 const text=characterText(doc),reference=characterReference(doc);
 for(const value of ['15 m','3 m Radius, einschließlich Verbündeter','2, einmal je getroffenem Ziel',legacy.cost,legacy.limits]){assert.ok(text.includes(value));assert.ok(reference.includes(value));}
 assert.deepEqual(parseCharacter(serializeCharacter(doc)),doc);
 for(const [key,value]of [['range',0],['targets',''],['damage',''],['damage',3]]){const bad=structuredClone(doc);bad.character.abilities[0][key]=value;assert.ok(validateCharacterDocument(bad).length);}
});
test('Template verlangt getrennte Angaben, Standardregeln und explizite Grenzen',()=>{
 const text=characterTemplate('Eine Frostmagierin','Fantasy');
 assert.match(text,/name,range,targets,damage,effect,cost,limits/);
 assert.match(text,/Touch|touch/);assert.match(text,/absence does not mean unlimited/);
 assert.match(text,/light 2 \/ ordinary 3 \/ heavy 4/);
});
