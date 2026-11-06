import {characterReference} from './character-reference.mjs';
import {mountCharacterEditor} from './character-editor.mjs';
import {abilityRange,continueCharacter} from './character.mjs';
import {createPlayState,parsePlayState,normalizePlayContext,playContent,SESSION_KEY,DEVICE_KEY,HANDOFF_KEY} from './play-state.mjs';
import {openDialog,downloadFile,copyText} from './ui.mjs';

export function mountPlayDesk(root,host=window) {
 root.innerHTML=`<div class="page-heading"><div><p class="eyebrow">DEIN SPIELTAB</p><h1 id="desk-title">Spielübersicht</h1><p>Manuell gepflegt. Änderungen im Spielchat werden nicht automatisch übernommen.</p></div><div class="actions"><button id="desk-import" class="small">Importieren</button><input id="desk-file" type="file" accept=".json,application/json" hidden><button id="desk-export" class="small" disabled>Exportieren</button><button id="desk-copy" class="small" disabled>Kopieren</button><button id="desk-swap" class="small" aria-pressed="false">Spalten tauschen</button></div></div>
 <p id="desk-status" role="status" aria-live="polite"></p>
 <details class="storage-options"><summary>Speicheroptionen</summary><div class="actions"><button id="desk-save" class="small" disabled>Auf diesem Gerät speichern</button><button id="desk-restore" class="small">Gerätestand laden</button><button id="desk-forget" class="small danger">Gerätestand löschen</button></div><p id="desk-storage" class="field-help"></p></details>
 <div class="play-layout"><section id="desk-overview" aria-label="Charakterübersicht"></section><section class="panel play-notes"><h2>Deine Notizen</h2><label for="desk-notes">Orte, Kontakte, Aufgaben und offene Fragen</label><textarea id="desk-notes" maxlength="300000" placeholder="Was möchtest du für deinen nächsten Spielabend festhalten?"></textarea><p class="field-help">Figur, Welt, Begleiter und Notizen bleiben in diesem Tab erhalten. Für später gemeinsam exportieren oder oben auf diesem Gerät speichern.</p></section></div>

 <dialog id="desk-context-dialog"><div class="dialog-heading"><h2>Welt und Begleiter aktualisieren</h2><button type="button" id="desk-context-cancel">Abbrechen ×</button></div><p>Ausgangswissen und spätere Erkenntnisse manuell pflegen. Keine automatische Verbindung zum Spielchat.</p><label for="desk-world">Welt, Orte und Fraktionen</label><textarea id="desk-world" rows="3" data-grow maxlength="300000"></textarea><label for="desk-crew">Vorbereitete Crew · optional</label><textarea id="desk-crew" rows="3" data-grow maxlength="300000"></textarea><label for="desk-companions">Weitere Bekanntschaften und Begleiter</label><textarea id="desk-companions" rows="3" data-grow maxlength="300000" placeholder="Name, Beziehung, Wissen und aktueller Aufenthalt – nur soweit bekannt."></textarea><button type="button" id="desk-context-apply" class="primary">Übernehmen</button><p id="desk-context-status" role="status"></p></dialog>
 <dialog id="desk-edit-dialog"><div class="dialog-heading"><h2>Bogen aktualisieren</h2><button id="desk-cancel">Abbrechen ×</button></div><p>Vereinbarte Veränderungen eintragen. Der ursprüngliche Startbogen bleibt erhalten.</p><div id="desk-editor"></div><div class="actions"><button id="desk-apply" class="primary">Übernehmen</button></div><p id="desk-edit-status" role="status"></p></dialog>`;
 const $=s=>root.querySelector(s);let state=null,sessionOK=true,savedText=null,exportedContent='',editor=null,editBaseline='';
 const status=message=>{$('#desk-status').textContent=message;};
 const layout=$('.play-layout');layout.prepend($('.play-notes'));
 function setLayout(characterFirst){layout.classList.toggle('character-first',characterFirst);$('#desk-swap').setAttribute('aria-pressed',String(characterFirst));}
 try{setLayout(host.sessionStorage.getItem('ogm-play-layout-v1')==='character-first');}catch{}
 $('#desk-swap').addEventListener('click',()=>{const first=!layout.classList.contains('character-first');setLayout(first);try{host.sessionStorage.setItem('ogm-play-layout-v1',first?'character-first':'notes-first');}catch{}});
 function safeContent(text){try{return playContent(parsePlayState(text));}catch{return '';}}
 function secured(){let device=null;try{device=host.localStorage.getItem(DEVICE_KEY);}catch{}return !!state&&(playContent(state)===exportedContent||playContent(state)===safeContent(device));}
 function storageStatus(){$('#desk-storage').textContent=!sessionOK?'Tab-Speicherung nicht verfügbar. Bitte exportieren oder auf diesem Gerät speichern.':secured()?'Dieser Stand ist exportiert oder zusätzlich auf diesem Gerät gespeichert.':'Im aktuellen Tab gesichert. Für das Schließen bitte exportieren oder auf diesem Gerät speichern. Browserdaten können gelöscht werden; eine exportierte Datei bleibt deine unabhängige Sicherung.';}
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
  const abilities=node('details','','overview-section abilities-section');abilities.open=true;abilities.append(node('summary','Fähigkeiten'));view.append(abilities);
  if(!c.abilities.length)abilities.append(node('p','Keine besonderen Fähigkeiten eingetragen.','field-help'));
  for(const a of c.abilities){const card=node('details','','ability-card'),top=node('summary');card.open=true;top.append(node('span',a.name),node('span',a.cost,'ability-cost'));card.append(top);
   const facts=node('dl','','ability-facts');for(const [key,value]of [['Reichweite',abilityRange(a)],['Ziele / Fläche',a.targets??'Siehe Wirkung / Grenzen'],['Schaden',a.damage??'Siehe Wirkung / Grenzen']]){facts.append(node('dt',key),node('dd',value));}card.append(facts);
   for(const [label,text]of [['Wirkung',a.effect],['Weitere Grenzen',a.limits]]){const p=node('p','','ability-body');p.append(node('strong',label+': '),document.createTextNode(text));card.append(p);}abilities.append(card);
  }
  const context=normalizePlayContext(state.context);
  for(const [title,text,empty]of [['Welt, Orte und Fraktionen',context.world,'Noch keine Weltangaben übernommen.'],['Crew und weitere Begleiter',[context.crew,context.companions].filter(Boolean).join('\n\n'),'Keine separate Crew vorbereitet. Bekannte Personen können hier ergänzt werden.']]){
   const section=node('details','','overview-section');section.append(node('summary',title),node('div',text||empty,'play-card-text'));view.append(section);
  }
  const editContext=node('button','Welt und Begleiter aktualisieren','small');editContext.id='desk-edit-context';editContext.addEventListener('click',()=>{for(const k of ['world','crew','companions'])$('#desk-'+k).value=context[k];$('#desk-context-status').textContent='';openDialog($('#desk-context-dialog'));});view.append(editContext);
  const reference=characterReference(state.document);
  // Retain every rule-bearing field in the secondary sections without interpreting it.
  for(const part of reference.split('\n\n## ').slice(1)){
   const split=part.indexOf('\n'),title=part.slice(0,split),text=part.slice(split).trim();
   if(['Fähigkeiten','Erfahrung','Entwicklung und Errungenschaften'].includes(title))continue;
   const details=node('details','','overview-section');details.open=title==='Talente';details.append(node('summary',title),node('div',text,'play-card-text'));view.append(details);
  }
 }
 function load(next,message){state=structuredClone(next);$('#desk-notes').value=state.notes;persist();draw();status(message);}
 function editDocument(){
  let next=structuredClone(state.document);if(next.kind==='start'){next.confirmed=true;next=continueCharacter(next);}
  if(!editor)editor=mountCharacterEditor($('#desk-editor'),{running:true});
  editor.setDocument(next);editBaseline=JSON.stringify(editor.getDocument());$('#desk-edit-status').textContent='';openDialog($('#desk-edit-dialog'));editor.refresh();
 }
 $('#desk-cancel').addEventListener('click',()=>$('#desk-edit-dialog').close());
 $('#desk-apply').addEventListener('click',()=>{try{const next=editor.acceptDocument();load(createPlayState(next,state.notes,undefined,state.context),'Bogen aktualisiert. Veränderungen auch im Spiel abstimmen.');$('#desk-edit-dialog').close();}catch(e){$('#desk-edit-status').textContent=e.message;}});
 let initial=null;
 try{if(new URL(host.location.href).searchParams.has('handoff')){const text=host.sessionStorage.getItem(HANDOFF_KEY);host.sessionStorage.removeItem(HANDOFF_KEY);if(text)initial=parsePlayState(text);const url=new URL(host.location.href);url.searchParams.delete('handoff');host.history.replaceState(null,'',url.pathname+url.search+url.hash);}if(!initial){const text=host.sessionStorage.getItem(SESSION_KEY);if(text)initial=parsePlayState(text);}}catch{sessionOK=false;status('Tab-Stand konnte nicht geladen werden. Importiere eine Sicherung.');}
 try{savedText=host.localStorage.getItem(DEVICE_KEY);}catch{}
 if(initial)load(initial,'Stand im Spieltab geladen.');else draw();
 $('#desk-notes').addEventListener('input',()=>{if(state){state=createPlayState(state.document,$('#desk-notes').value,undefined,state.context);persist();}});
 $('#desk-import').addEventListener('click',()=>$('#desk-file').click());
 $('#desk-file').addEventListener('change',async()=>{const file=$('#desk-file').files[0];if(!file)return;try{if(file.size>2000000)throw new Error('JSON-Datei bis 2 MB verwenden.');const next=parsePlayState(await file.text());if(state&&!host.confirm('Aktuellen Stand durch den Import ersetzen? Bei Bedarf vorher exportieren.'))return;load(next,'Figur, Welt, Begleiter und Notizen importiert.');exportedContent=playContent(state);storageStatus();}catch(e){status(e.message);}finally{$('#desk-file').value='';}});
 $('#desk-export').addEventListener('click',()=>{if(state){downloadFile(JSON.stringify(state,null,2)+'\n','spieluebersicht.json','application/json');exportedContent=playContent(state);storageStatus();status('Figur, Welt, Begleiter und Notizen exportiert. Die Datei enthält keinen vollständigen Spielchat.');}});
 $('#desk-copy').addEventListener('click',()=>{if(state)copyText(characterReference(state.document)+'\n\n## Welt\n\n'+normalizePlayContext(state.context).world+'\n\n## Crew und Begleiter\n\n'+[normalizePlayContext(state.context).crew,normalizePlayContext(state.context).companions].filter(Boolean).join('\n\n')+'\n\n## Notizen\n\n'+state.notes,$('#desk-status'));});
 $('#desk-save').addEventListener('click',()=>{if(!state)return;try{const previous=host.localStorage.getItem(DEVICE_KEY);if(previous&&previous!==JSON.stringify(state)&&!host.confirm('Gespeicherten Gerätestand ersetzen?'))return;const text=JSON.stringify(state);host.localStorage.setItem(DEVICE_KEY,text);savedText=text;storageStatus();status('Auf diesem Gerät gespeichert.');}catch{status('Gerätespeicherung fehlgeschlagen. Bitte exportieren.');}});
 $('#desk-restore').addEventListener('click',()=>{try{const text=host.localStorage.getItem(DEVICE_KEY);if(!text){status('Kein Gerätestand vorhanden.');return;}const next=parsePlayState(text);if(state&&!host.confirm('Aktuellen Stand durch den Gerätestand ersetzen?'))return;savedText=text;load(next,'Gerätestand geladen.');}catch(e){status(e.message);}});
 $('#desk-forget').addEventListener('click',()=>{if(!host.confirm('Gespeicherten Gerätestand löschen?'))return;try{host.localStorage.removeItem(DEVICE_KEY);savedText=null;storageStatus();status('Gerätestand gelöscht; geöffneter Stand bleibt erhalten.');}catch{status('Löschen fehlgeschlagen.');}});
 $('#desk-context-cancel').addEventListener('click',()=>$('#desk-context-dialog').close());
 $('#desk-context-apply').addEventListener('click',()=>{try{const context=Object.fromEntries(['world','crew','companions'].map(k=>[k,$('#desk-'+k).value]));load(createPlayState(state.document,state.notes,undefined,context),'Welt und Begleiter aktualisiert.');$('#desk-context-dialog').close();}catch(e){$('#desk-context-status').textContent=e.message;}});
 host.addEventListener('beforeunload',event=>{
  const contextDirty=state&&$('#desk-context-dialog').open&&['world','crew','companions'].some(k=>$('#desk-'+k).value!==normalizePlayContext(state.context)[k]);
  const editorDirty=editor&&$('#desk-edit-dialog').open&&JSON.stringify(editor.getDocument())!==editBaseline;
  if(state&&(!secured()||contextDirty||editorDirty)){event.preventDefault();event.returnValue='';}
 });
 return {getState:()=>state?structuredClone(state):null};
}
