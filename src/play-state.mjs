import {parseCharacter, validateCharacterDocument} from './character.mjs';

export const SESSION_KEY='ogm-play-session-v1';
export const DEVICE_KEY='ogm-play-device-v1';
export const HANDOFF_KEY='ogm-play-handoff-v1';
const MAX_BYTES=2000000;
export function createPlayState(document,notes='',updatedAt=new Date().toISOString(),context={},extras={}) {
 const state={format:'open-game-master-play-notes',version:1,document:structuredClone(document),notes,updatedAt,context:normalizePlayContext(context)};
 for(const key of ['sessions','sectionOrder','combat','campaignId'])if(extras[key]!==undefined)state[key]=structuredClone(extras[key]);
 return parsePlayState(JSON.stringify(state));
}
export function parsePlayState(text) {
 if(typeof text!=='string'||new TextEncoder().encode(text).byteLength>MAX_BYTES)throw new Error('Spielübersicht: JSON-Datei bis 2 MB verwenden.');
 let s;try{s=JSON.parse(text);}catch{throw new Error('Ungültiges JSON. Der bisherige Stand bleibt erhalten.');}
 if(!s||typeof s!=='object'||Array.isArray(s)||Object.keys(s).some(k=>!['format','version','document','notes','updatedAt','context','sessions','sectionOrder','combat','campaignId'].includes(k))||s.format!=='open-game-master-play-notes'||s.version!==1)throw new Error('Unbekanntes Format der Spielübersicht.');
 const errors=validateCharacterDocument(s.document);if(errors.length)throw new Error(errors[0]);
 if(typeof s.notes!=='string'||s.notes.length>300000)throw new Error('Notizen dürfen höchstens 300.000 Zeichen enthalten.');
 if(typeof s.updatedAt!=='string'||!Number.isFinite(Date.parse(s.updatedAt)))throw new Error('Ungültiger Zeitstempel.');
 if(s.context!==undefined)s.context=normalizePlayContext(s.context);
 if(s.sessions!==undefined){
  if(!Array.isArray(s.sessions)||s.sessions.length>1000)throw new Error('Ungültige Sitzungsnotizen.');
  const ids=new Set();
  for(const entry of s.sessions){if(!entry||Object.keys(entry).some(k=>!['id','title','text','createdAt'].includes(k))||typeof entry.id!=='string'||entry.id.length>100||ids.has(entry.id)||typeof entry.title!=='string'||entry.title.length>200||typeof entry.text!=='string'||entry.text.length>300000||typeof entry.createdAt!=='string'||!Number.isFinite(Date.parse(entry.createdAt)))throw new Error('Ungültige Sitzungsnotiz.');ids.add(entry.id);}
 }
 if(s.sectionOrder!==undefined&&(!Array.isArray(s.sectionOrder)||s.sectionOrder.length>40||s.sectionOrder.some(x=>typeof x!=='string'||x.length>100)||new Set(s.sectionOrder).size!==s.sectionOrder.length))throw new Error('Ungültige Abschnittsreihenfolge.');
 if(s.combat!==undefined&&(!s.combat||typeof s.combat!=='object'||Array.isArray(s.combat)||Object.keys(s.combat).some(k=>!['defense','attacks','conditions'].includes(k))||Object.values(s.combat).some(v=>typeof v!=='string'||v.length>10000)))throw new Error('Ungültige Kampfnotizen.');
 if(s.campaignId!==undefined&&(typeof s.campaignId!=='string'||s.campaignId.length>100))throw new Error('Ungültige Kampagnenkennung.');
 return s;
}
export function importPlayState(text,notes='') {
 if(typeof text!=='string'||new TextEncoder().encode(text).byteLength>MAX_BYTES)throw new Error('Spielübersicht: JSON-Datei bis 2 MB verwenden.');
 // Character-only imports keep the existing notes. Full exports restore both.
 let raw;try{raw=JSON.parse(text);}catch{throw new Error('Ungültiges JSON. Der bisherige Stand bleibt erhalten.');}
 return raw?.format==='open-game-master-character'?createPlayState(parseCharacter(text),notes):parsePlayState(text);
}
export function openPlayTab(document,host=window,context={},extras={}) {
 if(validateCharacterDocument(document).length)throw new Error('Bitte zuerst einen gültigen Bogen bereitstellen.');
 return openPlayStateTab(createPlayState(document,'',undefined,context,extras),host);
}
export function openPlayStateTab(state,host=window) {
 const value=JSON.stringify(parsePlayState(JSON.stringify(state)));
 // sessionStorage is copied to a same-origin child tab at window.open time.
 // Clear the temporary handoff in the source immediately; no sheet goes into a URL.
 host.sessionStorage.setItem(HANDOFF_KEY,value);
 try {
  const child=host.open('./play.html?handoff=1','_blank');
  if(!child)throw new Error('Spieltab blockiert. Pop-up erlauben und erneut öffnen.');
  child.opener=null;
 } finally {host.sessionStorage.removeItem(HANDOFF_KEY);}
}

export function normalizePlayContext(context={}) {
 if(!context||typeof context!=='object'||Array.isArray(context)||Object.keys(context).some(k=>!['world','crew','companions'].includes(k)))throw new Error('Ungültige Welt- oder Begleiterangaben.');
 const result={world:'',crew:'',companions:'',...context};
 for(const value of Object.values(result))if(typeof value!=='string'||value.length>300000)throw new Error('Welt- und Begleitertexte dürfen jeweils höchstens 300.000 Zeichen enthalten.');
 return result;
}
export function playContent(state){
 return state?JSON.stringify({document:state.document,notes:state.notes,context:normalizePlayContext(state.context),sessions:state.sessions??[],sectionOrder:state.sectionOrder??[],combat:state.combat??{},campaignId:state.campaignId??''}):'';
}
