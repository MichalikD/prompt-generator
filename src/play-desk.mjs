import {characterReference} from './character-reference.mjs';
import {mountCharacterEditor} from './character-editor.mjs';
import {validateCharacterDocument} from './character.mjs';
import {createPlayState,importPlayState,parsePlayState,SESSION_KEY,DEVICE_KEY,HANDOFF_KEY} from './play-state.mjs';

export function mountPlayDesk(root,host=window) {
 root.innerHTML=`<h1>Deine Spielübersicht.</h1>
 <p>Manuell gepflegter Bogen und Kampagnennotizen für das Spielen. Kein Zugriff auf deinen Spielchat, keine automatische Übernahme von Ereignissen. Änderungen hier gelten erst nach Absprache auch im Spiel.</p>
 <p>Der letzte gültige Stand bleibt beim Neuladen in diesem Tab erhalten. Für später auf diesem Gerät ausdrücklich speichern oder als JSON sichern. Browserdaten können gelöscht werden; eine JSON-Datei ist deine unabhängige Sicherung.</p>
 <div class="character-actions"><label class="file-button">JSON importieren<input id="desk-file" type="file" accept=".json,application/json"></label><button id="desk-export" type="button" disabled>Bogen + Notizen herunterladen</button><button id="desk-save" type="button" disabled>Auf diesem Gerät speichern</button><button id="desk-restore" type="button">Gerätestand laden</button><button id="desk-forget" type="button">Gerätestand löschen</button><button id="desk-print" type="button">Übersicht drucken</button></div>
 <p id="desk-status" role="status" aria-live="polite"></p><p id="desk-storage" class="field-help"></p>
 <div class="play-layout"><section id="desk-overview" aria-label="Charakterübersicht"></section><section class="character-panel play-notes"><h2>Kampagnennotizen</h2><label for="desk-notes">Orte, Kontakte, Aufgaben, offene Fragen und sonstige Notizen</label><textarea id="desk-notes" rows="18" maxlength="300000"></textarea><div id="desk-print-notes" class="print-notes"></div><p>Freitext für dich. Er verändert keine Werte im Bogen und wird nicht an die Spielleitung übertragen.</p></section></div>
 <details id="desk-edit"><summary>Bogen bearbeiten oder JSON einfügen</summary><p>Für erspielte Veränderungen einen bestätigten Startbogen zuerst als aktuellen Bogen weiterführen. Der ursprüngliche Startbogen bleibt dabei unverändert. Änderungen anschließend prüfen und bestätigen.</p><div id="desk-editor"></div></details>`;
 const $=s=>root.querySelector(s);let state=null,valid=true,sessionOK=true,savedText=null;
 let loading=false,mounting=true,edited=false;
 const status=message=>{$('#desk-status').textContent=message;};
 const storeStatus=()=>{$('#desk-storage').textContent=!sessionOK?'Tab-Speicherung nicht verfügbar. Bitte vor dem Neuladen als JSON sichern.':savedText===JSON.stringify(state)?'Dieser Stand ist zusätzlich auf diesem Gerät gespeichert.':'Nur im aktuellen Tab gesichert; Änderungen seit dem letzten Gerätespeichern sind dort noch nicht enthalten.';};
 function persist() {
  if(!state)return;
  try{host.sessionStorage.setItem(SESSION_KEY,JSON.stringify(state));sessionOK=true;}catch{sessionOK=false;}
  storeStatus();
 }
 function draw() {
  $('#desk-print-notes').textContent=state?.notes??'';
  const view=$('#desk-overview');view.replaceChildren();
  if(!state){const p=document.createElement('p');p.textContent='Noch kein Bogen geladen. JSON importieren oder unten einen Bogen erstellen.';view.append(p);return;}
  const text=characterReference(state.document);
  for(const part of text.split('\n\n## ')) {
   const card=document.createElement('article');card.className='character-panel play-card';
   const lines=part.replace(/^# /,'').split('\n');const heading=document.createElement('h2');heading.textContent=lines.shift();
   const body=document.createElement('div');body.className='play-card-text';body.textContent=lines.join('\n').trim();card.append(heading,body);view.append(card);
  }
 }
 function controls() {
  for(const id of ['desk-export','desk-save'])$('#'+id).disabled=!state||!valid;
 }
 const editor=mountCharacterEditor($('#desk-editor'),{onChange(doc){
  if(loading)return;
  if(!mounting)edited=true;
  valid=validateCharacterDocument(doc).length===0;controls();
  if(!valid){status('Bogenänderungen noch ungültig. Oben steht der letzte gültige Bogen; bitte unten korrigieren.');return;}
  state=createPlayState(doc,state?.notes??$('#desk-notes').value);controls();persist();draw();
  status(doc.confirmed?'Bogen bestätigt.':'Gültiger Entwurf – Änderungen vor Verwendung im Spiel bestätigen.');
 }});
 mounting=false;
 function load(next,message) {
  loading=true;editor.setDocument(next.document);loading=false;
  state=structuredClone(next);valid=true;edited=false;$('#desk-notes').value=state.notes;controls();persist();draw();status(message);
 }
 // An empty editor is not a valid sheet. Restore only after mounting it.
 let initial=null;
 try {
  if(new URL(host.location.href).searchParams.has('handoff')) {
   const text=host.sessionStorage.getItem(HANDOFF_KEY);host.sessionStorage.removeItem(HANDOFF_KEY);
   if(text)initial=parsePlayState(text);
   const url=new URL(host.location.href);url.searchParams.delete('handoff');host.history.replaceState(null,'',url.pathname+url.search+url.hash);
  }
  if(!initial){const text=host.sessionStorage.getItem(SESSION_KEY);if(text)initial=parsePlayState(text);}
 }catch{sessionOK=false;status('Tab-Stand konnte nicht geladen werden. Importiere eine JSON-Sicherung.');}
 if(initial)load(initial,'Stand im Spieltab geladen.');else draw();
 try{savedText=host.localStorage.getItem(DEVICE_KEY);}catch{}
 if(state)storeStatus();
 $('#desk-notes').addEventListener('input',()=>{
  if(!state){status('Bitte zuerst einen gültigen Bogen importieren oder erstellen, damit Bogen und Notizen zusammen gesichert werden können.');return;}
  state=createPlayState(state.document,$('#desk-notes').value);$('#desk-print-notes').textContent=state.notes;persist();
 });
 $('#desk-save').addEventListener('click',()=>{
  if(!valid||!state)return;
  try {
   const previous=host.localStorage.getItem(DEVICE_KEY);
   if(previous&&previous!==JSON.stringify(state)&&!host.confirm('Den auf diesem Gerät gespeicherten Stand ersetzen? Bei Bedarf vorher als JSON sichern.'))return;
   savedText=JSON.stringify(state);host.localStorage.setItem(DEVICE_KEY,savedText);storeStatus();status('Bogen und Notizen auf diesem Gerät gespeichert.');
  }catch{savedText=null;status('Gerätespeicherung fehlgeschlagen. Bitte als JSON herunterladen.');}
 });
 $('#desk-restore').addEventListener('click',()=>{
  try {
   const text=host.localStorage.getItem(DEVICE_KEY);if(!text){status('Auf diesem Gerät ist kein Stand gespeichert.');return;}
   const next=parsePlayState(text);
   if((state||$('#desk-notes').value)&&!host.confirm('Aktuellen Tab-Stand durch den Gerätestand ersetzen? Ungesicherte Änderungen vorher exportieren.'))return;
   savedText=text;load(next,'Gerätestand geladen.');
  }catch(error){status('Gerätestand nicht geladen: '+error.message);}
 });
 $('#desk-forget').addEventListener('click',()=>{
  if(!host.confirm('Gespeicherten Gerätestand löschen? Der geöffnete Tab und heruntergeladene Dateien bleiben erhalten.'))return;
  try{host.localStorage.removeItem(DEVICE_KEY);savedText=null;storeStatus();status('Gerätestand gelöscht.');}catch{status('Gerätestand konnte nicht gelöscht werden.');}
 });
 $('#desk-file').addEventListener('change',async()=>{
  const field=$('#desk-file'),file=field.files[0];if(!file)return;
  try {
   if(file.size>2000000)throw new Error('JSON-Datei bis 2 MB verwenden.');
   const next=importPlayState(await file.text(),state?.notes??$('#desk-notes').value);
   if((state||$('#desk-notes').value)&&!host.confirm('Aktuellen Tab-Stand durch den Import ersetzen? Bei Bedarf vorher exportieren.'))return;
   load(next,'Import erfolgreich. Bogen und Notizen prüfen.');
  }catch(error){status(error.message);}finally{field.value='';}
 });
 $('#desk-export').addEventListener('click',()=>{
  if(!valid||!state)return;
  const url=URL.createObjectURL(new Blob([JSON.stringify(state,null,2)+'\n'],{type:'application/json'})),a=document.createElement('a');a.href=url;a.download='spieluebersicht.json';document.body.append(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(url),1000);status('Export enthält aktuellen Bogen, vorhandenen Startbogen und Notizen; keinen vollständigen Chat-Spielstand.');
 });
 $('#desk-print').addEventListener('click',()=>host.print());
 host.addEventListener('beforeunload',event=>{if((edited&&!valid)||(!sessionOK&&state)||(!state&&$('#desk-notes').value)){event.preventDefault();event.returnValue='';}});
 return {getState:()=>state?structuredClone(state):null};
}
