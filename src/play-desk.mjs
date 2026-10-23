import {characterReference} from './character-reference.mjs';
import {mountCharacterEditor} from './character-editor.mjs';
import {abilityRange,attributeLabels,continueCharacter} from './character.mjs';
import {createPlayState,parsePlayState,SESSION_KEY,DEVICE_KEY,HANDOFF_KEY} from './play-state.mjs';
import {openDialog,downloadFile,copyText} from './ui.mjs';

export function mountPlayDesk(root,host=window) {
 root.innerHTML=`<div class="page-heading"><div><p class="eyebrow">DEIN SPIELTAB</p><h1 id="desk-title">Spielübersicht</h1><p>Manuell gepflegt. Änderungen im Spielchat werden nicht automatisch übernommen.</p></div><div class="actions"><button id="desk-import" class="small">Importieren</button><input id="desk-file" type="file" accept=".json,application/json" hidden><button id="desk-export" class="small" disabled>Exportieren</button><button id="desk-copy" class="small" disabled>Kopieren</button></div></div>
 <p id="desk-status" role="status" aria-live="polite"></p>
 <div class="play-layout"><section id="desk-overview" aria-label="Charakterübersicht"></section><section class="panel play-notes"><h2>Deine Notizen</h2><label for="desk-notes">Orte, Kontakte, Aufgaben und offene Fragen</label><textarea id="desk-notes" maxlength="300000" placeholder="Was möchtest du für deinen nächsten Spielabend festhalten?"></textarea><p class="field-help">Bogen und Notizen bleiben in diesem Tab erhalten. Für später gemeinsam exportieren oder unten auf diesem Gerät speichern.</p></section></div>
 <details class="storage-options"><summary>Speicheroptionen</summary><div class="actions"><button id="desk-save" class="small" disabled>Auf diesem Gerät speichern</button><button id="desk-restore" class="small">Gerätestand laden</button><button id="desk-forget" class="small danger">Gerätestand löschen</button></div><p id="desk-storage" class="field-help"></p></details>
 <dialog id="desk-edit-dialog"><div class="dialog-heading"><h2>Bogen aktualisieren</h2><button id="desk-cancel">Abbrechen ×</button></div><p>Vereinbarte Veränderungen eintragen. Der ursprüngliche Startbogen bleibt erhalten.</p><div id="desk-editor"></div><div class="actions"><button id="desk-apply" class="primary">Übernehmen</button></div><p id="desk-edit-status" role="status"></p></dialog>`;
 const $=s=>root.querySelector(s);let state=null,sessionOK=true,savedText=null,editor=null;
 const status=message=>{$('#desk-status').textContent=message;};
 function storageStatus(){$('#desk-storage').textContent=!sessionOK?'Tab-Speicherung nicht verfügbar. Bitte vor dem Neuladen exportieren.':savedText===JSON.stringify(state)?'Dieser Stand ist zusätzlich auf diesem Gerät gespeichert.':'Im aktuellen Tab gesichert. Ein Gerätestand wird nur auf Wunsch aktualisiert. Browserdaten können gelöscht werden; eine exportierte Datei bleibt deine unabhängige Sicherung.';}
 function persist(){if(!state)return;try{host.sessionStorage.setItem(SESSION_KEY,JSON.stringify(state));sessionOK=true;}catch{sessionOK=false;}storageStatus();}
 const node=(tag,text,cls='')=>{const el=document.createElement(tag);el.textContent=text;el.className=cls;return el;};
 function draw(){
  const view=$('#desk-overview');view.replaceChildren();
  for(const id of ['desk-export','desk-copy','desk-save'])$('#'+id).disabled=!state;
  $('#desk-notes').disabled=!state;
  if(!state){view.append(node('p','Noch keine Spielübersicht geladen. Öffne deinen Bogen über die Ausgabe des Generators oder importiere einen gemeinsamen Export aus Bogen und Notizen.','panel empty-state'));return;}
  const c=state.document.character;
  $('#desk-title').textContent=c.identity.name;const heading=node('div','', 'actions');heading.append(node('p',[c.identity.ancestry,c.identity.role].filter(Boolean).join(' · ')));
  const edit=node('button','Bogen aktualisieren','small');edit.id='desk-edit';edit.addEventListener('click',editDocument);heading.append(edit);view.append(heading);
  const stats=node('div','','desk-stats');
  for(const [label,value]of [['LP',`${c.vitals.hp}/${c.vitals.maxHp}`],...c.vitals.resources.map(r=>[r.name,`${r.current}/${r.max}`]),['Gepäck',`${c.inventory.reduce((n,i)=>n+i.quantity*i.slots,0)}/8`]]){const card=node('div','','desk-stat');card.append(node('span',label),node('strong',value));stats.append(card);}view.append(stats);
  view.append(node('h2','Fähigkeiten'));
  if(!c.abilities.length)view.append(node('p','Keine besonderen Fähigkeiten eingetragen.','field-help'));
  for(const a of c.abilities){const card=node('article','','ability-card'),top=node('div','','actions');top.append(node('h3',a.name),node('span',a.cost,'ability-cost'));card.append(top);
   const facts=node('dl','','ability-facts');for(const [key,value]of [['Reichweite',abilityRange(a)],['Ziele / Fläche',a.targets??'Siehe Wirkung / Grenzen'],['Schaden',a.damage??'Siehe Wirkung / Grenzen']]){facts.append(node('dt',key),node('dd',value));}card.append(facts);
   for(const [label,text]of [['Wirkung',a.effect],['Weitere Grenzen',a.limits]]){const p=node('p','','ability-body');p.append(node('strong',label+': '),document.createTextNode(text));card.append(p);}view.append(card);
  }
  const reference=characterReference(state.document);
  // Retain every rule-bearing field in the secondary sections without interpreting it.
  for(const part of reference.split('\n\n## ').slice(1)){
   const split=part.indexOf('\n'),title=part.slice(0,split),text=part.slice(split).trim();
   if(title==='Fähigkeiten')continue;
   const details=node('details','','overview-section');details.open=title==='Talente';details.append(node('summary',title),node('div',text,'play-card-text'));view.append(details);
  }
 }
 function load(next,message){state=structuredClone(next);$('#desk-notes').value=state.notes;persist();draw();status(message);}
 function editDocument(){
  let next=structuredClone(state.document);if(next.kind==='start'){next.confirmed=true;next=continueCharacter(next);}
  if(!editor)editor=mountCharacterEditor($('#desk-editor'),{running:true});
  editor.setDocument(next);$('#desk-edit-status').textContent='';openDialog($('#desk-edit-dialog'));editor.refresh();
 }
 $('#desk-cancel').addEventListener('click',()=>$('#desk-edit-dialog').close());
 $('#desk-apply').addEventListener('click',()=>{try{const next=editor.acceptDocument();load(createPlayState(next,state.notes),'Bogen aktualisiert. Veränderungen auch im Spiel abstimmen.');$('#desk-edit-dialog').close();}catch(e){$('#desk-edit-status').textContent=e.message;}});
 let initial=null;
 try{if(new URL(host.location.href).searchParams.has('handoff')){const text=host.sessionStorage.getItem(HANDOFF_KEY);host.sessionStorage.removeItem(HANDOFF_KEY);if(text)initial=parsePlayState(text);const url=new URL(host.location.href);url.searchParams.delete('handoff');host.history.replaceState(null,'',url.pathname+url.search+url.hash);}if(!initial){const text=host.sessionStorage.getItem(SESSION_KEY);if(text)initial=parsePlayState(text);}}catch{sessionOK=false;status('Tab-Stand konnte nicht geladen werden. Importiere eine Sicherung.');}
 try{savedText=host.localStorage.getItem(DEVICE_KEY);}catch{}
 if(initial)load(initial,'Stand im Spieltab geladen.');else draw();
 $('#desk-notes').addEventListener('input',()=>{if(state){state=createPlayState(state.document,$('#desk-notes').value);persist();}});
 $('#desk-import').addEventListener('click',()=>$('#desk-file').click());
 $('#desk-file').addEventListener('change',async()=>{const file=$('#desk-file').files[0];if(!file)return;try{if(file.size>2000000)throw new Error('JSON-Datei bis 2 MB verwenden.');const next=parsePlayState(await file.text());if(state&&!host.confirm('Aktuellen Stand durch den Import ersetzen? Bei Bedarf vorher exportieren.'))return;load(next,'Bogen und Notizen importiert.');}catch(e){status(e.message);}finally{$('#desk-file').value='';}});
 $('#desk-export').addEventListener('click',()=>{if(state){downloadFile(JSON.stringify(state,null,2)+'\n','spieluebersicht.json','application/json');status('Bogen und Notizen exportiert. Die Datei enthält keinen vollständigen Spielchat.');}});
 $('#desk-copy').addEventListener('click',()=>{if(state)copyText(characterReference(state.document)+'\n\n## Notizen\n\n'+state.notes,$('#desk-status'));});
 $('#desk-save').addEventListener('click',()=>{if(!state)return;try{const previous=host.localStorage.getItem(DEVICE_KEY);if(previous&&previous!==JSON.stringify(state)&&!host.confirm('Gespeicherten Gerätestand ersetzen?'))return;const text=JSON.stringify(state);host.localStorage.setItem(DEVICE_KEY,text);savedText=text;storageStatus();status('Auf diesem Gerät gespeichert.');}catch{status('Gerätespeicherung fehlgeschlagen. Bitte exportieren.');}});
 $('#desk-restore').addEventListener('click',()=>{try{const text=host.localStorage.getItem(DEVICE_KEY);if(!text){status('Kein Gerätestand vorhanden.');return;}const next=parsePlayState(text);if(state&&!host.confirm('Aktuellen Stand durch den Gerätestand ersetzen?'))return;savedText=text;load(next,'Gerätestand geladen.');}catch(e){status(e.message);}});
 $('#desk-forget').addEventListener('click',()=>{if(!host.confirm('Gespeicherten Gerätestand löschen?'))return;try{host.localStorage.removeItem(DEVICE_KEY);savedText=null;storageStatus();status('Gerätestand gelöscht; geöffneter Stand bleibt erhalten.');}catch{status('Löschen fehlgeschlagen.');}});
 host.addEventListener('beforeunload',event=>{if(!sessionOK&&state){event.preventDefault();event.returnValue='';}});
 return {getState:()=>state?structuredClone(state):null};
}
