import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {characterReference} from '../src/character-reference.mjs';
import {continueCharacter,characterTemplate} from '../src/character.mjs';
import {buildOutput} from '../src/outputs.mjs';
import {defaults} from '../src/generator.mjs';
const base=JSON.parse(readFileSync(new URL('../examples/vesper-start.json',import.meta.url),'utf8'));

test('Spielübersicht behält komplexe Fähigkeiten und Ressourcen vollständig und ändert den Bogen nicht',()=>{
 const doc=structuredClone(base),c=doc.character;
 c.abilities=[{name:'Glut',effect:'Ein sichtbares Ziel bis 15 m; W20+Verstand+Feuerkunst gegen Verteidigung; Schaden 2.',cost:'Keine Fokuskosten.',limits:'Eine Aktion; geeignetes Material kann am Einschlag brennen.'}];
 c.vitals.resources=[{name:'Äther',current:3,max:3,effect:'Starke Zauber.',cost:'Je Fähigkeit, auch bei Fehlschlag.',regeneration:'Volle Regeneration nach 8 Stunden sicherer Ruhe.'}];
 const before=JSON.stringify(doc),text=characterReference(doc);
 for(const row of [...c.abilities,...c.vitals.resources])for(const value of Object.values(row))if(typeof value==='string')assert.ok(text.includes(value),value);
 assert.equal(JSON.stringify(doc),before);
 assert.ok(text.includes('3/8'));
 assert.ok(text.includes('nicht automatisch übernommen'));
 assert.ok(text.includes('13, vor Rüstung'));
 assert.ok(!text.includes(c.background.open));
});

test('Aktuelle Spielübersicht verwendet veränderte Werte, nicht den ursprünglichen Bogen',()=>{
 const doc=continueCharacter(base);
 doc.character.attributes.dexterity=4;doc.character.vitals.hp=6;doc.character.vitals.maxHp=12;
 doc.character.abilities=[{name:'Neue Meisterschaft',effect:'Ein weiterer Einsatz.',cost:'Keine.',limits:'Situativ.'}];
 doc.confirmed=true;
 const text=characterReference(doc);
 assert.ok(text.includes('LP: 6/12'));
 assert.ok(text.includes('Geschick: +4'));
 assert.ok(text.includes('14, vor Rüstung'));
 assert.ok(text.includes('Neue Meisterschaft'));
 assert.ok(!text.includes('LP: 10/10'));
 assert.equal(doc.startCharacter.attributes.dexterity,3);
});

test('Ungültige Bögen erzeugen keine scheinbar spielbare Übersicht; gültige Entwürfe sind gekennzeichnet',()=>{
 const doc=structuredClone(base);doc.character.abilities=[{name:'Unvollständig'}];
 assert.throws(()=>characterReference(doc),/gültigen Bogen/);
 doc.character.abilities=[];doc.confirmed=false;
 assert.ok(characterReference(doc).includes('Entwurf, noch nicht bestätigt'));
});

test('Vorhandene bestätigte Fähigkeiten erhalten im neuen Startpaket keine zusätzliche Standardmagie',()=>{
 const before=JSON.stringify(base),text=buildOutput({...defaults,characterSource:'prepared'},'plugin',base).startMessage;
 assert.equal(JSON.stringify(base),before);
 assert.ok(!text.includes('resource-free magical attack'));
 assert.ok(characterTemplate('Eine Kampfmagierin.','Magische Fantasywelt.').includes('resource-free magical attack'));
 assert.ok(characterTemplate('Eine Kampfmagierin.','Magische Fantasywelt.').includes('never add this ability automatically'));
});
