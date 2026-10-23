import {parseCharacter, validateCharacterDocument} from './character.mjs';

export const SESSION_KEY='ogm-play-session-v1';
export const DEVICE_KEY='ogm-play-device-v1';
export const HANDOFF_KEY='ogm-play-handoff-v1';
const MAX_BYTES=2000000;
export function createPlayState(document,notes='',updatedAt=new Date().toISOString()) {
 const state={format:'open-game-master-play-notes',version:1,document:structuredClone(document),notes,updatedAt};
 return parsePlayState(JSON.stringify(state));
}
export function parsePlayState(text) {
 if(typeof text!=='string'||new TextEncoder().encode(text).byteLength>MAX_BYTES)throw new Error('Spielübersicht: JSON-Datei bis 2 MB verwenden.');
 let s;try{s=JSON.parse(text);}catch{throw new Error('Ungültiges JSON. Der bisherige Stand bleibt erhalten.');}
 if(!s||typeof s!=='object'||Array.isArray(s)||Object.keys(s).some(k=>!['format','version','document','notes','updatedAt'].includes(k))||s.format!=='open-game-master-play-notes'||s.version!==1)throw new Error('Unbekanntes Format der Spielübersicht.');
 const errors=validateCharacterDocument(s.document);if(errors.length)throw new Error(errors[0]);
 if(typeof s.notes!=='string'||s.notes.length>300000)throw new Error('Notizen dürfen höchstens 300.000 Zeichen enthalten.');
 if(typeof s.updatedAt!=='string'||!Number.isFinite(Date.parse(s.updatedAt)))throw new Error('Ungültiger Zeitstempel.');
 return s;
}
export function importPlayState(text,notes='') {
 if(typeof text!=='string'||new TextEncoder().encode(text).byteLength>MAX_BYTES)throw new Error('Spielübersicht: JSON-Datei bis 2 MB verwenden.');
 // Character-only imports keep the existing notes. Full exports restore both.
 let raw;try{raw=JSON.parse(text);}catch{throw new Error('Ungültiges JSON. Der bisherige Stand bleibt erhalten.');}
 return raw?.format==='open-game-master-character'?createPlayState(parseCharacter(text),notes):parsePlayState(text);
}
export function openPlayTab(document,host=window) {
 if(validateCharacterDocument(document).length)throw new Error('Bitte zuerst einen gültigen Bogen bereitstellen.');
 const value=JSON.stringify(createPlayState(document));
 // sessionStorage is copied to a same-origin child tab at window.open time.
 // Clear the temporary handoff in the source immediately; no sheet goes into a URL.
 host.sessionStorage.setItem(HANDOFF_KEY,value);
 try {
  const child=host.open('./play.html?handoff=1','_blank');
  if(!child)throw new Error('Spieltab blockiert. Pop-up erlauben und erneut öffnen.');
  child.opener=null;
 } finally {host.sessionStorage.removeItem(HANDOFF_KEY);}
}
