import {worldDraftTemplate,crewDraftTemplate} from './preparation.mjs';
import {openDialog,autoGrow,copyText,downloadFile} from './ui.mjs';

export function mountPreparationTools(form,{getConfig,getCharacter,onChange}) {
 const tools=[];
 const crewField=document.createElement('input');crewField.type='hidden';crewField.name='crewBrief';form.append(crewField);
 for(const kind of ['world','crew']) {
  const isWorld=kind==='world',name=isWorld?'Welt':'Crew',prefix=`${kind}-draft`;
  const row=document.createElement('div');row.className='actions preparation-tools';
  const open=document.createElement('button');open.type='button';open.className='small';open.id=`open-${prefix}`;open.textContent=`${name} mit KI entwerfen · optional`;
  const state=document.createElement('span');state.className='field-help';state.id=`${prefix}-state`;row.append(open,state);
  if(isWorld)form.querySelector('.world-editor').insertBefore(row,form.querySelector('.world-summary'));
  else {row.dataset.step='2';form.append(row);}
  const dialog=document.createElement('dialog');dialog.id=`${prefix}-dialog`;
  dialog.innerHTML=`<div class="dialog-heading"><h2>${name} mit einer KI vorbereiten</h2><button type="button" data-close>Schließen ×</button></div>
   <p class="field-help">Eine kurze Idee genügt. Template in einer KI deiner Wahl senden, den Entwurf hier prüfen und bei Bedarf bearbeiten. Hier erfolgt kein KI-Aufruf.</p>
   <label for="${prefix}-idea">${name}idee · optional</label><textarea id="${prefix}-idea" rows="1" data-grow></textarea>
   <details><summary>Template ansehen</summary><textarea id="${prefix}-template" rows="1" data-grow readonly></textarea></details>
   <div class="actions"><button type="button" class="primary" data-copy-template>Template kopieren</button></div>
   <label for="${prefix}-result">KI-Entwurf hier einfügen und bearbeiten · optional</label><textarea id="${prefix}-result" rows="3" data-grow></textarea>
   <p class="field-help">${isWorld?'Übernehmen ergänzt die weiteren Weltvorgaben. Die ausgewählte Vorlage und ihre Einstellungen bleiben erhalten.':'Die Crew bleibt ein eigenes Dokument. Übernehmen fügt sie dem Startpaket hinzu, nicht dem Hauptfigurenbogen. Sie ist keine Pflichtgruppe und wird nicht automatisch mit dem Spielchat synchronisiert.'}</p>
   <div class="actions"><button type="button" data-adopt>${isWorld?'Zu Weltvorgaben hinzufügen':'Für Startpaket übernehmen'}</button><button type="button" class="small" data-download>Entwurf sichern (.md)</button>${isWorld?'':'<button type="button" class="small subtle" data-remove>Aus Startpaket entfernen</button>'}</div>
   <p role="status" aria-live="polite" data-status></p>`;
  document.body.append(dialog);
  const idea=dialog.querySelector(`#${prefix}-idea`),template=dialog.querySelector(`#${prefix}-template`),result=dialog.querySelector(`#${prefix}-result`),status=dialog.querySelector('[data-status]');
  function refresh(){try{template.value=isWorld?worldDraftTemplate(getConfig(),idea.value):crewDraftTemplate(getConfig(),idea.value,getCharacter());status.textContent='';}catch(e){template.value='';status.textContent=e.message;}dialog.querySelector('[data-copy-template]').disabled=!template.value;autoGrow(dialog);}
  open.addEventListener('click',()=>{refresh();openDialog(dialog);});
  idea.addEventListener('input',refresh);result.addEventListener('input',()=>autoGrow(dialog));
  dialog.querySelector('[data-close]').addEventListener('click',()=>dialog.close());
  dialog.querySelector('[data-copy-template]').addEventListener('click',()=>copyText(template.value,status,template));
  dialog.querySelector('[data-download]').addEventListener('click',()=>{if(!result.value.trim()){status.textContent='Bitte zuerst einen Entwurf einfügen.';return;}downloadFile(result.value,`${isWorld?'welt':'crew'}-entwurf.md`,'text/markdown;charset=utf-8');});
  dialog.querySelector('[data-adopt]').addEventListener('click',()=>{
   const text=result.value.trim();if(!text){status.textContent='Bitte zuerst einen Entwurf einfügen.';return;}
   if(isWorld){const field=form.querySelector('[name=worldDescription]');field.value=[field.value.trim(),text].filter(Boolean).join('\n\n');form.querySelector('.world-details').open=true;field.dispatchEvent(new Event('input',{bubbles:true}));}
   else {crewField.value=text;state.textContent='Crewentwurf im Startpaket';onChange();}
   dialog.close();
  });
  dialog.querySelector('[data-remove]')?.addEventListener('click',()=>{crewField.value='';state.textContent='';onChange();status.textContent='Crew aus dem Startpaket entfernt. Der Entwurf bleibt hier bearbeitbar.';});
  tools.push({dialog,idea,template,result,status,state});
 }
 return {reset(){crewField.value='';for(const t of tools){t.idea.value=t.template.value=t.result.value=t.status.textContent=t.state.textContent='';t.dialog.close();}}};
}
