import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { newCharacterDocument, validateCharacterDocument, serializeCharacter, parseCharacter, characterText, continueCharacter, characterTemplate } from '../src/character.mjs';
const example=JSON.parse(readFileSync(new URL('../examples/vesper-start.json',import.meta.url),'utf8'));
const valid=()=>structuredClone(example);

test('Bestätigter Vesper-Startbogen exportiert alle vereinbarten Angaben und bleibt unverändert',()=>{
 const doc=valid(), before=JSON.stringify(doc);
 assert.deepEqual(validateCharacterDocument(doc),[]);
 assert.deepEqual(parseCharacter(serializeCharacter(doc)),doc);
 const text=characterText(doc);
 for(const value of ['Vesper','Vampir','Doppelschwertkampf','Lautloser Hinterhalt','Zwei Kurzschwerter','Dolch','10/10 LP','3/8 Tragplätze','gewöhnliche Nahrung','Grelles Sonnenlicht','Herkunft und persönliche Ziele bleiben offen.']) assert.ok(text.includes(value),value);
 assert.equal(JSON.stringify(doc),before);
});

test('Start- und aktueller Bogen trennen Entwicklung und ursprüngliche Werte',()=>{
 const start=valid(), current=continueCharacter(start);
 current.character.attributes.geschick=4;current.character.vitals.hp=6;current.character.vitals.maxHp=12;
 current.character.development.push({milestone:'Kapitel 1',change:'Geschick +1',benefit:'Präzisere Bewegungen',limits:'Maximum +5'});
 assert.deepEqual(validateCharacterDocument(current),[]);
 assert.deepEqual(current.startCharacter,start.character);
 assert.equal(current.confirmed,false);
 assert.equal(start.character.attributes.geschick,3);
 assert.deepEqual(parseCharacter(serializeCharacter(current)),current);
 assert.ok(characterText(current).includes('URSPRÜNGLICHER STARTBOGEN'));
 const unknown=valid();unknown.kind='current';unknown.startCharacter=null;
 assert.ok(characterText(unknown).includes('nicht verfügbar'));
 start.confirmed=false;assert.throws(()=>continueCharacter(start),/bestätigen/);
});

test('Ungültige Werte, unvollständige Fähigkeiten, Überladung und fehlende Schwächen verhindern Export',()=>{
 const mutations=[
  d=>{d.character.attributes.kraft=4;},d=>{d.character.attributes.geschick=2;},
  d=>{d.character.attributes.kraft=NaN;},d=>{d.character.talents.pop();},d=>{d.character.talents[0].bonus=4;},
  d=>{d.character.weaknesses=[];},d=>{d.character.vitals.hp=9;},
  d=>{d.character.inventory[0].quantity=5;},d=>{d.character.inventory[0].bonus=3;},
  d=>{d.character.abilities=[{name:'Magie',effect:'Alles',cost:'',limits:''}];},
  d=>{d.character.vitals.resources=[{name:'Fokus',current:4,max:3,effect:'Magie',cost:'1',regeneration:'Rast'}];},
  d=>{d.character.development=[{milestone:'Vor Start',change:'Bonus',benefit:'Bonus',limits:''}];},
  d=>{d.character.identity.description='';},d=>{d.version=2;},d=>{d.character.secret='Nicht verlieren';},
 ];
 for(const mutate of mutations){const d=valid();mutate(d);assert.ok(validateCharacterDocument(d).length);assert.throws(()=>serializeCharacter(d));}
});

test('Fehlerhafte Strukturen und unbekannte Felder werden ohne unbehandelte Ausnahmen erkannt',()=>{
 for(const doc of [null,[],{}, {format:'x'}, {...valid(),character:null}, {...valid(),character:{...valid().character,inventory:[null]}}]) {
  assert.ok(validateCharacterDocument(doc).length);assert.throws(()=>parseCharacter(JSON.stringify(doc)));
 }
 assert.throws(()=>parseCharacter('{'),/Ungültiges JSON/);
 assert.throws(()=>parseCharacter('x'.repeat(1000001)),/1 MB/);
 assert.throws(()=>parseCharacter('🦇'.repeat(260000)),/1 MB/);
 const large=valid();large.character.background.confirmed='🦇'.repeat(260000);assert.throws(()=>serializeCharacter(large),/1 MB/);
 const doc=valid();doc.futureField='erhalten';assert.throws(()=>parseCharacter(JSON.stringify(doc)),/Unbekanntes Feld/);
});

test('KI-Template enthält das importierbare Format und verlangt Prüfung statt automatischer Bestätigung',()=>{
 const prompt=characterTemplate('Eine Mechanikerin ohne Magie.','Gegenwart ohne Übernatürliches.');
 assert.ok(prompt.includes('Eine Mechanikerin ohne Magie.'));
 assert.ok(prompt.includes('Gegenwart ohne Übernatürliches.'));
 const template=JSON.parse(prompt.slice(prompt.indexOf('{\n')));
 assert.deepEqual(validateCharacterDocument(template),[]);
 assert.equal(template.confirmed,false);
 assert.ok(prompt.includes('Summe +5'));
 assert.ok(prompt.includes('Spezies/Abstammung, Herkunft, persönliche Ziele und Beziehungen dürfen unbekannt oder offen bleiben'));
 assert.ok(validateCharacterDocument(newCharacterDocument()).length>0);
});

test('Nicht unterstützte Altformate werden abgewiesen',()=>{
 assert.throws(()=>parseCharacter(JSON.stringify({name:'Alt',attributes:{},max_hp:10,hp:10})),/Format|Feld|format/);
});
