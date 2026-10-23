import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {createPlayState,parsePlayState,importPlayState,openPlayTab,HANDOFF_KEY} from '../src/play-state.mjs';
import {continueCharacter} from '../src/character.mjs';
import {characterReference} from '../src/character-reference.mjs';
const base=JSON.parse(readFileSync(new URL('../examples/vesper-start.json',import.meta.url),'utf8'));

test('Spieltab-Export erhält aktuellen und ursprünglichen Bogen, Entwicklung und Notizen verlustfrei',()=>{
 const current=continueCharacter(base);current.character.vitals.maxHp=12;current.character.vitals.hp=7;
 current.character.development.push({milestone:'Quellen gerettet',change:'Quellsegen',benefit:'Neue Fähigkeit',limits:'Einmal täglich'});
 const snapshot=JSON.stringify(current),s=createPlayState(current,'# Kontakte\nRaska: Wachhaus. <script>kein HTML</script>');
 const restored=importPlayState(JSON.stringify(s));
 assert.deepEqual(restored,s);assert.equal(JSON.stringify(current),snapshot);
 assert.deepEqual(restored.document.startCharacter,base.character);
 assert.ok(characterReference(restored.document).includes('Quellsegen'));
 assert.ok(characterReference(restored.document).includes('LP: 7/12'));
 assert.equal(importPlayState(JSON.stringify(base),'Notizen behalten').notes,'Notizen behalten');
});
test('Ungültige oder übergroße Übersicht wird abgewiesen statt still Daten zu verlieren',()=>{
 const s=createPlayState(base);
 for(const invalid of [{...s,version:2},{...s,extra:'unbekannt'},{...s,notes:[]},{...s,updatedAt:'keine Zeit'},{...s,document:{...base,character:{}}}])assert.throws(()=>parsePlayState(JSON.stringify(invalid)));
 assert.throws(()=>parsePlayState('{'));
 assert.throws(()=>createPlayState(base,'x'.repeat(300001)));
 assert.throws(()=>parsePlayState(' '.repeat(2000001)));
 assert.throws(()=>importPlayState('null'));
});
test('Tab-Übergabe enthält keine Daten in der URL, erhält Original und räumt auch bei Popupfehler auf',()=>{
 const map=new Map(),source=JSON.stringify(base);let captured,opened;
 const host={sessionStorage:{setItem:(k,v)=>map.set(k,v),removeItem:k=>map.delete(k)},open(url){opened=url;captured=parsePlayState(map.get(HANDOFF_KEY));return {opener:{}};}};
 openPlayTab(base,host);assert.equal(opened,'./play.html?handoff=1');assert.deepEqual(captured.document,base);assert.equal(map.size,0);assert.equal(JSON.stringify(base),source);
 host.open=()=>null;assert.throws(()=>openPlayTab(base,host),/blockiert/);assert.equal(map.size,0);
 host.sessionStorage.setItem=()=>{throw new Error('gesperrt');};assert.throws(()=>openPlayTab(base,host),/gesperrt/);
});
