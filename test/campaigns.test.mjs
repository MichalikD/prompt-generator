import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {createPlayState,parsePlayState,playContent} from '../src/play-state.mjs';
import {readCampaigns,saveCampaign,updateCampaignPlayState,removeCampaign,parseCampaigns,CAMPAIGNS_KEY} from '../src/campaigns.mjs';
import {buildOutput} from '../src/outputs.mjs';
import {defaults} from '../src/generator.mjs';
const hero=JSON.parse(readFileSync(new URL('../examples/vesper-start.json',import.meta.url)));
const storage=()=>{const m=new Map();return {getItem:k=>m.get(k)??null,setItem:(k,v)=>m.set(k,v),removeItem:k=>m.delete(k)};};
function entry(id){const output=buildOutput({...defaults,characterSource:'chat'},'plugin');return {id,name:id,updatedAt:new Date().toISOString(),config:defaults,document:hero,output,playState:createPlayState(hero,'',undefined,{}, {campaignId:id})};}
test('campaigns retain distinct original packages and update only their linked running desk',()=>{
 const s=storage(),a=entry('a'),b=entry('b');a.output.startMessage='Originale Regeln und Szene A';saveCampaign(s,a);saveCampaign(s,b);
 const current=createPlayState(hero,'neue Notiz',undefined,{world:'Neue Erkenntnis'},{campaignId:'a',sessions:[{id:'one',title:'Erster Abend',text:'Ältere Notiz',createdAt:'2026-11-14T10:00:00Z'}],combat:{defense:'19',attacks:'W20 +9',conditions:'Bestätigt'},sectionOrder:['crew','abilities']});
 assert.equal(updateCampaignPlayState(s,current),true);const data=readCampaigns(s);
 assert.equal(data.campaigns.find(x=>x.id==='a').output.startMessage,'Originale Regeln und Szene A');assert.deepEqual(data.campaigns.find(x=>x.id==='a').playState,current);assert.equal(data.campaigns.find(x=>x.id==='b').playState.notes,'');
 assert.deepEqual(parseCampaigns(JSON.stringify(data)),data);removeCampaign(s,'a');assert.equal(readCampaigns(s).campaigns[0].id,'b');assert.equal(updateCampaignPlayState(s,current),false);
});
test('invalid campaign imports and storage failures do not overwrite retained campaigns',()=>{
 const s=storage();saveCampaign(s,entry('a'));const before=s.getItem(CAMPAIGNS_KEY),data=readCampaigns(s);data.campaigns.push(data.campaigns[0]);assert.throws(()=>parseCampaigns(JSON.stringify(data)));assert.equal(s.getItem(CAMPAIGNS_KEY),before);
 const bad=entry('b');bad.playState.document={};assert.throws(()=>saveCampaign(s,bad));assert.equal(s.getItem(CAMPAIGNS_KEY),before);
 const unavailable={getItem:()=>before,setItem(){throw Error('Quota');}};assert.throws(()=>saveCampaign(unavailable,entry('b')),/Quota/);assert.equal(s.getItem(CAMPAIGNS_KEY),before);
});
test('old play exports load unchanged; new notes, order, combat and original sheet survive later character edits',()=>{
 const old=createPlayState(hero,'alte Notiz');const loaded=parsePlayState(JSON.stringify(old));assert.deepEqual(loaded,old);
 const extras={campaignId:'a',sessions:[{id:'one',title:'Sitzung',text:'<script>nur Text</script>',createdAt:'2026-11-14T10:00:00Z'}],sectionOrder:['world','abilities'],combat:{defense:'19',attacks:'W20 +9',conditions:'Aktiviert'}};
 const state=createPlayState(hero,'Entwurf',undefined,{crew:'An Bord'},extras);const changed=structuredClone(hero);changed.character.identity.name='Späterer Name';const updated=createPlayState(changed,state.notes,undefined,state.context,state);
 for(const key of Object.keys(extras))assert.deepEqual(updated[key],extras[key]);assert.deepEqual(updated.context,state.context);assert.notEqual(playContent(state),playContent({...state,combat:{defense:'20'}}));
 assert.throws(()=>parsePlayState(JSON.stringify({...state,sessions:[extras.sessions[0],extras.sessions[0]]})));assert.throws(()=>parsePlayState(JSON.stringify({...state,combat:{defense:19}})));
});
