import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {defaults} from '../src/generator.mjs';
import {playContextFromConfig} from '../src/play-context.mjs';
import {createPlayState,parsePlayState,playContent,openPlayTab,HANDOFF_KEY} from '../src/play-state.mjs';
const fixture=name=>JSON.parse(readFileSync(new URL(`../examples/${name}.json`,import.meta.url)));
test('play context preserves adopted world and crew without interpreting the main character background',()=>{
 const world=fixture('world-draft'),crew=fixture('crew-draft');
 const config={...defaults,worldDescription:'Neue Küstenregion.',worldDocument:JSON.stringify(world),crewDocument:JSON.stringify(crew)};
 const context=playContextFromConfig(config);
 for(const text of [world.world.name,world.world.places[0].description,'Neue Küstenregion.'])assert.ok(context.world.includes(text));
 assert.ok(context.crew.includes(crew.crew.members[0].name));assert.ok(context.crew.includes('Zu Spielbeginn bei der Hauptfigur: Nein'));
 assert.equal(context.companions,'');assert.equal(playContextFromConfig(defaults).crew,'');
});
test('world, crew and manually added contacts round-trip with notes and survive handoff',()=>{
 const hero=fixture('vesper-start'),context={world:'Weltwissen',crew:'Crew',companions:'Saelira: derzeit an Bord.'};
 const state=createPlayState(hero,'Notizen',undefined,context);
 assert.deepEqual(parsePlayState(JSON.stringify(state)),state);
 assert.equal(playContent(state),playContent({...state,updatedAt:'2020-01-01T00:00:00Z'}));
 assert.notEqual(playContent(state),playContent({...state,context:{...context,world:'Neu'}}));
 let transfer;const storage=new Map();
 openPlayTab(hero,{sessionStorage:{setItem:(k,v)=>storage.set(k,v),removeItem:k=>storage.delete(k)},open(){transfer=JSON.parse(storage.get(HANDOFF_KEY));return {}; }},context);
 assert.deepEqual(transfer.context,context);assert.equal(storage.size,0);
 const older={...state};delete older.context;assert.deepEqual(parsePlayState(JSON.stringify(older)),older);
 for(const invalid of [null,[],{world:4},{companions:'x'.repeat(300001)},{unknown:'lost'}])assert.throws(()=>createPlayState(hero,'',undefined,invalid));
});
