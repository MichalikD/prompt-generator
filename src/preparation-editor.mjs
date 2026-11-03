import {mountDraftImpulse} from './draft-impulse-editor.mjs';
import {worldDraftTemplate,crewDraftTemplate} from './preparation.mjs';
import {draftDefinitions,newDraft,newDraftEntry,parseDraft,validateDraft,draftText,worldBaseKey,worldKey,crewKey,worldReviewError,characterReviewError,crewReviewError,crewPrerequisite} from './preparation-data.mjs';
import {validateWorld} from './worlds.mjs';
import {validateCharacterDocument} from './character.mjs';
import {openDialog,autoGrow,copyText,downloadFile} from './ui.mjs';

export function mountPreparationTools(form,{getConfig,getCharacter,onChange,onAcceptCharacter}) {
 const tools={},hidden={};
 for(const name of ['worldDocument','worldDraftBasis','characterWorld','crewDocument','crewDraftBasis']){
  const field=document.createElement('input');field.type='hidden';field.name=name;form.append(field);hidden[name]=field;
 }
 function worldProblem(){try{validateWorld(getConfig());return '';}catch(e){return e.message;}}
 function crewProblem(){try{return worldProblem()||crewPrerequisite(getConfig(),getCharacter());}catch(e){return e.message;}}
 function remove(kind){hidden[kind+'Document'].value=hidden[kind+'DraftBasis'].value='';onChange();}
 for(const kind of ['world','crew']) {
  const isWorld=kind==='world',name=isWorld?'Welt':'Crew',prefix=`${kind}-draft`,def=draftDefinitions[kind];
  const row=document.createElement('div');row.className='actions preparation-tools';
  const open=document.createElement('button');open.type='button';open.className='small';open.id=`open-${prefix}`;open.textContent=`${name} mit KI entwerfen · optional`;
  const state=document.createElement('span');state.className='field-help';state.id=`${prefix}-state`;
  if(!isWorld){const accept=document.createElement('button');accept.type='button';accept.className='small';accept.id='accept-prepared-character';accept.textContent='Bogen übernehmen';accept.addEventListener('click',()=>{try{onAcceptCharacter();}catch(e){state.textContent=e.message;}});row.append(accept);}
  row.append(open,state);
  if(isWorld)form.querySelector('.world-editor').insertBefore(row,form.querySelector('.world-summary'));else{row.dataset.step='2';form.append(row);}
  const dialog=document.createElement('dialog');dialog.id=`${prefix}-dialog`;
  dialog.innerHTML=`<div class="dialog-heading"><h2>${name} vorbereiten</h2><button type="button" data-close>Schließen ×</button></div>
   <p class="field-help">Template in einer KI deiner Wahl senden. JSON-Antwort importieren, die Felder prüfen und übernehmen. Hier erfolgt kein KI-Aufruf.</p>
   <details open><summary>1 · KI-Template</summary><label for="${prefix}-idea">${name}idee · optional</label><textarea id="${prefix}-idea" rows="1" data-grow></textarea><details><summary>Template ansehen</summary><textarea id="${prefix}-template" rows="1" data-grow readonly></textarea></details><div class="actions"><button type="button" class="primary" data-copy-template>Template kopieren</button></div></details>
   <details data-import-panel><summary>2 · JSON importieren</summary><label for="${prefix}-file">JSON-Datei · bis 1 MB</label><input type="file" id="${prefix}-file" accept=".json,application/json"><label for="${prefix}-result">Oder JSON-Antwort einfügen</label><textarea id="${prefix}-result" rows="3" data-grow spellcheck="false"></textarea><button type="button" data-import>JSON prüfen und laden</button></details>
   <details data-edit-panel><summary>3 · Entwurf bearbeiten und übernehmen</summary><div data-fields></div><ul data-errors></ul><details><summary>Starttext-Vorschau</summary><pre data-preview></pre></details></details>
   <p class="field-help">${isWorld?'Der Weltentwurf bleibt getrennt von deinen weiteren Weltvorgaben. Erneutes Übernehmen ersetzt ihn, statt ihn mehrfach anzuhängen.':'Die Crew bleibt außerhalb des Hauptbogens. Anwesenheit und Aufenthalte gelten zu Spielbeginn; eine Crew ist keine Pflichtgruppe.'} Änderungen im Entwurf gelten erst nach Übernahme. Bei geänderten Grundlagen müssen übernommene Entwürfe erneut geprüft werden.</p>
   <div class="actions"><button type="button" data-adopt>${isWorld?'Weltentwurf übernehmen':'Crew übernehmen'}</button><button type="button" class="small" data-download>Entwurf sichern (.json)</button><button type="button" class="small subtle" data-remove>Aus Startpaket entfernen</button></div><p role="status" aria-live="polite" data-status></p>`;
  document.body.append(dialog);
  const $=s=>dialog.querySelector(s),idea=$(`#${prefix}-idea`),template=$(`#${prefix}-template`),result=$(`#${prefix}-result`),status=$('[data-status]');
  let model=newDraft(kind),fieldSerial=0;
  function validate(){
   const errors=validateDraft(model,kind);$('[data-errors]').replaceChildren(...errors.map(text=>{const li=document.createElement('li');li.textContent=text;return li;}));
   $('[data-adopt]').disabled=!!errors.length||(!isWorld&&!!crewProblem());$('[data-download]').disabled=!!errors.length;
   $('[data-preview]').textContent=errors.length?'Nach vollständiger Eingabe verfügbar.':draftText(model,kind);autoGrow(dialog);
  }
  function field(parent,obj,key,label){
   const wrap=document.createElement('div');wrap.className='character-field';const caption=document.createElement('label');caption.textContent=label;
   const input=document.createElement(key==='present'?'input':'textarea');input.id=`${prefix}-field-${fieldSerial++}`;caption.htmlFor=input.id;
   if(key==='present'){input.type='checkbox';input.checked=obj[key];}else{input.rows=1;input.dataset.grow='';input.value=obj[key];}
   input.addEventListener('input',()=>{obj[key]=key==='present'?input.checked:input.value;model.confirmed=false;if(key==='name'){const summary=input.closest('.character-row')?.querySelector('summary');if(summary)summary.textContent=input.value||'Unbenannt';}status.textContent='Entwurf geändert; noch nicht übernommen.';validate();});wrap.append(caption,input);parent.append(wrap);
  }
  function render(){
   const fields=$('[data-fields]');fields.replaceChildren();fieldSerial=0;const body=model[kind];
   for(const [key,label]of Object.entries(def.fields))field(fields,body,key,label);
   for(const [key,list]of Object.entries(def.lists)){
    const box=document.createElement('fieldset'),legend=document.createElement('legend');legend.textContent=list.label;box.append(legend);
    body[key].forEach((entry,i)=>{const details=document.createElement('details');details.className='character-row';details.open=i===0;const summary=document.createElement('summary');summary.textContent=entry.name||`${list.label} ${i+1}`;details.append(summary);for(const [f,label]of Object.entries(list.fields))field(details,entry,f,label);const button=document.createElement('button');button.type='button';button.className='small danger';button.textContent='Entfernen';button.addEventListener('click',()=>{body[key].splice(i,1);model.confirmed=false;render();});details.append(button);box.append(details);});
    const add=document.createElement('button');add.type='button';add.className='small';add.textContent=`+ ${list.label} hinzufügen`;add.addEventListener('click',()=>{body[key].push(newDraftEntry(kind,key));model.confirmed=false;render();});box.append(add);fields.append(box);
   }
   validate();
  }
  const impulse=mountDraftImpulse(template.closest('details'),kind,refresh);
  function refresh(){
   try{template.value=isWorld?worldDraftTemplate(getConfig(),idea.value,impulse.id):crewDraftTemplate(getConfig(),idea.value,getCharacter(),impulse.id);status.textContent='';}catch(e){template.value='';status.textContent=e.message;}
   $('[data-copy-template]').disabled=!template.value;validate();
  }
  function importText(text){try{const next=parseDraft(text,kind);next.confirmed=false;model=next;render();$('[data-edit-panel]').open=true;$('[data-import-panel]').open=false;status.textContent='JSON geladen. Felder prüfen und übernehmen.';}catch(e){status.textContent=e.message+' Vorhandene Eingaben bleiben erhalten.';}}
  open.addEventListener('click',()=>{refresh();openDialog(dialog);});idea.addEventListener('input',refresh);result.addEventListener('input',()=>autoGrow(dialog));
  $('[data-close]').addEventListener('click',()=>dialog.close());
  $('[data-copy-template]').addEventListener('click',()=>{refresh();if(template.value)copyText(template.value,status,template);});
  $('[data-import]').addEventListener('click',()=>importText(result.value));
  $(`#${prefix}-file`).addEventListener('change',async event=>{const file=event.target.files[0];if(!file)return;try{if(file.size>1000000)throw new Error('Bitte eine JSON-Datei bis 1 MB verwenden.');importText(await file.text());}catch(e){status.textContent=e.message;}finally{event.target.value='';}});
  $('[data-download]').addEventListener('click',()=>{if(!validateDraft(model,kind).length)downloadFile(JSON.stringify(model,null,2),`${isWorld?'welt':'crew'}-entwurf.json`,'application/json');});
  $('[data-adopt]').addEventListener('click',()=>{
   try{const next=parseDraft(model,kind);if(!isWorld&&crewProblem())throw new Error(crewProblem());next.confirmed=true;hidden[kind+'Document'].value=JSON.stringify(next);hidden[kind+'DraftBasis'].value=isWorld?worldBaseKey(getConfig()):crewKey(getConfig(),getCharacter());model=next;onChange();dialog.close();}catch(e){status.textContent=e.message;}
  });
  $('[data-remove]').addEventListener('click',()=>{remove(kind);status.textContent='Aus dem Startpaket entfernt. Der Entwurf bleibt bearbeitbar.';});
  tools[kind]={dialog,open,state,refresh,reset(){model=newDraft(kind);impulse.reset();idea.value=template.value=result.value=status.textContent=state.textContent='';render();dialog.close();}};render();
 }
 form.addEventListener('world-draft-remove',()=>remove('world'));
 return {
  setCharacterWorld(key){hidden.characterWorld.value=key;},
  update(){
   const config=getConfig(),doc=getCharacter();
   try{tools.world.state.textContent=worldReviewError(config)||(config.worldDocument?'Weltentwurf übernommen':'');}catch(e){tools.world.state.textContent=e.message;}
   const accept=form.querySelector('#accept-prepared-character');
   const valid=doc&&!validateCharacterDocument(doc).length&&!worldProblem();
   let accepted=false;try{accepted=valid&&doc.confirmed&&config.characterWorld===worldKey(config);}catch{}
   accept.hidden=config.characterSource!=='prepared';accept.disabled=!valid||accepted;accept.textContent=accepted?'Bogen übernommen':'Bogen übernehmen';
   const problem=crewProblem();tools.crew.open.disabled=!!problem&&!config.crewDocument;
   tools.crew.open.textContent=problem&&config.crewDocument?'Crew ansehen / entfernen':'Crew mit KI entwerfen · optional';
   try{tools.crew.state.textContent=crewReviewError(config,doc)||characterReviewError(config)||problem||(config.crewDocument?'Crew übernommen':'');}catch(e){tools.crew.state.textContent=e.message;}
  },
  reset(){for(const field of Object.values(hidden))field.value='';for(const t of Object.values(tools))t.reset();},
 };
}
