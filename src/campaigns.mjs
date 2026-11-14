import {parsePlayState} from './play-state.mjs';
import {validateCharacterDocument} from './character.mjs';
export const CAMPAIGNS_KEY='ogm-campaigns-v1';
export function newCampaignId(){return globalThis.crypto?.randomUUID?.()??`run-${Date.now()}-${Math.random().toString(36).slice(2)}`;}
export function parseCampaigns(text){
 if(typeof text!=='string'||new TextEncoder().encode(text).byteLength>8000000)throw new Error('Kampagnenablage: höchstens 8 MB verwenden.');
 let value;try{value=JSON.parse(text);}catch{throw new Error('Kampagnenablage ist kein gültiges JSON.');}
 if(value?.format!=='open-game-master-campaigns'||value.version!==1||!Array.isArray(value.campaigns)||value.campaigns.length>100)throw new Error('Unbekannte Kampagnenablage.');
 const ids=new Set();
 for(const c of value.campaigns){
  if(!c||typeof c.id!=='string'||c.id.length>100||ids.has(c.id)||typeof c.name!=='string'||c.name.length>200||typeof c.updatedAt!=='string'||!Number.isFinite(Date.parse(c.updatedAt))||!c.config||typeof c.config!=='object'||Array.isArray(c.config)||!c.output||['projectInstructions','startMessage','downloadText','downloadName'].some(k=>typeof c.output[k]!=='string'))throw new Error('Ungültiger Kampagneneintrag.');
  if(c.document!==null&&validateCharacterDocument(c.document).length)throw new Error('Ungültige vorbereitete Figur.');
  if(c.playState)parsePlayState(JSON.stringify(c.playState));
  ids.add(c.id);
 }
 return value;
}
export function readCampaigns(storage){const text=storage.getItem(CAMPAIGNS_KEY);return text?parseCampaigns(text):{format:'open-game-master-campaigns',version:1,campaigns:[]};}
export function saveCampaign(storage,campaign){
 const value=readCampaigns(storage),index=value.campaigns.findIndex(c=>c.id===campaign.id);
 if(index<0)value.campaigns.unshift(structuredClone(campaign));else value.campaigns[index]=structuredClone(campaign);
 const text=JSON.stringify(value);parseCampaigns(text);storage.setItem(CAMPAIGNS_KEY,text);return campaign;
}
export function updateCampaignPlayState(storage,state){
 if(!state.campaignId)return false;
 const value=readCampaigns(storage),entry=value.campaigns.find(c=>c.id===state.campaignId);if(!entry)return false;
 entry.playState=structuredClone(state);entry.updatedAt=state.updatedAt;
 const text=JSON.stringify(value);parseCampaigns(text);storage.setItem(CAMPAIGNS_KEY,text);return true;
}
export function removeCampaign(storage,id){const value=readCampaigns(storage);value.campaigns=value.campaigns.filter(c=>c.id!==id);storage.setItem(CAMPAIGNS_KEY,JSON.stringify(value));}
