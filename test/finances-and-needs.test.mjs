import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {validateCharacterDocument,serializeCharacter,parseCharacter,characterText,characterTemplate,continueCharacter} from '../src/character.mjs';
const base=()=>JSON.parse(readFileSync(new URL('../examples/vesper-start.json',import.meta.url),'utf8'));

test('Guthaben hat keinen Spiel-Maximalwert, keine Regeneration und bleibt getrennt von Fähigkeitspunkten',()=>{
 const doc=base();doc.character.finances={funds:[{currency:'Credits',amount:200.5},{currency:'Gold',amount:1_000_000_000}],purchasingPower:'Mahlzeit 5 Credits.',assets:'Ein gemietetes Zimmer.'};
 doc.character.vitals.resources=[{name:'Fokus',current:2,max:3,effect:'Eine Fähigkeit aktivieren.',cost:'Ein Punkt pro Einsatz.',regeneration:'Sichere Ruhe.'}];
 assert.deepEqual(validateCharacterDocument(doc),[]);
 assert.deepEqual(parseCharacter(serializeCharacter(doc)),doc);
 const text=characterText(doc);
 assert.ok(text.includes('Credits: 200.5'));assert.ok(!text.includes('Credits: 200.5/'));
 assert.ok(text.includes('Fokus: 2/3'));assert.ok(text.includes('Mahlzeit 5 Credits.'));
 const current=continueCharacter(doc);current.character.finances.funds[0].amount=450;
 assert.equal(current.startCharacter.finances.funds[0].amount,200.5);
});
test('Unbekanntes Geld und bewusstes Nullguthaben bleiben unterscheidbar; ungültige Beträge werden abgewiesen',()=>{
 const doc=base();assert.ok(characterText(doc).includes('Starting funds unspecified; do not assume zero.'));
 doc.character.finances.funds=[{currency:'Credits',amount:0}];assert.ok(characterText(doc).includes('Credits: 0'));
 for(const amount of [-1,NaN,Infinity,'200']) {const bad=structuredClone(doc);bad.character.finances.funds[0].amount=amount;assert.ok(validateCharacterDocument(bad).length);}
 const bad=structuredClone(doc);bad.character.finances.funds.push({currency:' credits ',amount:5});assert.ok(validateCharacterDocument(bad).length);
});
test('Bedürfnisse sind optional; zusätzliche Mechanik benötigt Auslöser, Wirkung und Versorgung',()=>{
 const doc=base();doc.character.needs=[];
 assert.deepEqual(validateCharacterDocument(doc),[]);assert.ok(!characterText(doc).includes('SPECIAL NEEDS'));
 const need={name:'Blutbedarf',description:'Normale Nahrung reicht nicht.',mechanical:false,trigger:'',effect:'',care:''};doc.character.needs=[need];
 assert.deepEqual(validateCharacterDocument(doc),[]);assert.ok(characterText(doc).includes('Descriptive only'));
 need.mechanical=true;assert.ok(validateCharacterDocument(doc).length);
 need.trigger='Vereinbarte Zeit ohne Blut.';need.effect='Nachteil auf körperliche Anstrengung.';need.care='Blut trinken.';
 assert.deepEqual(validateCharacterDocument(doc),[]);assert.ok(characterText(doc).includes('Agreed mechanic'));
 const old=base();old.version=2;assert.throws(()=>serializeCharacter(old),/Version/);
});
test('Template fordert Startgeld sowie regelkonkrete Ausrüstung und lässt unbenötigte Mechaniken weg',()=>{
 const prompt=characterTemplate('Eine Mechanikerin.','Cyberpunk.');
 for(const text of ['Money belongs in finances','purchasingPower','mechanical:false','bonus:0','disadvantage','weapon base damage'])assert.ok(prompt.includes(text),text);
 const doc=JSON.parse(prompt.slice(prompt.indexOf('{\n')));assert.deepEqual(validateCharacterDocument(doc),[]);assert.equal(doc.confirmed,false);
});
