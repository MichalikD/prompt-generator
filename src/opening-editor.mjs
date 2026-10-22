import {newOpeningSeed,resolveOpening} from './opening.mjs';

export function mountOpeningEditor(form) {
 const panel=document.createElement('fieldset');panel.dataset.step='1';panel.dataset.group='opening';panel.className='opening-editor';
 panel.innerHTML='<legend>Zufälliger Ausgangsimpuls · optional</legend><label class="choice"><input type="checkbox" name="openingEnabled" value="yes"><span>Umgebung und Ausgangslage auslosen</span></label><p class="field-help">Ein kleiner Anstoß für den Anfang, keine fertige Handlung. Eigene Weltvorgaben und dein bestätigter Bogen haben Vorrang.</p><div class="opening-controls" hidden><label>Kennung zum Wiederholen<input name="openingSeed" type="text" spellcheck="false" autocomplete="off" maxlength="13" placeholder="ogm1-0123abcd"></label><button type="button" class="quiet">Neu auslosen</button><p class="opening-status field-help" role="status" aria-live="polite"></p><details><summary>Bausteine aufdecken · kann den Einstieg verraten</summary><p class="opening-preview"></p></details><p class="field-help">Die Kennung bleibt beim Ausfüllen und Kopieren erhalten. Gleiche Kennung und gleiche Vorgaben erzeugen dieselben Bausteine, keine identische KI-Geschichte. Mit eigenen Freitextvorgaben bleiben Ortsannahmen offen.</p></div>';
 form.append(panel);
 const enabled=panel.querySelector('[name=openingEnabled]'),seed=panel.querySelector('[name=openingSeed]'),controls=panel.querySelector('.opening-controls'),button=panel.querySelector('button'),status=panel.querySelector('.opening-status'),details=panel.querySelector('details');
 let lastKey='';
 enabled.addEventListener('change',()=>{try{if(enabled.checked&&!seed.value)seed.value=newOpeningSeed();}catch(error){status.textContent=error.message;}});
 button.addEventListener('click',()=>{try{seed.value=newOpeningSeed();seed.dispatchEvent(new panel.ownerDocument.defaultView.Event('change',{bubbles:true}));}catch(error){status.textContent=error.message;}});
 return {update(config,active=true){
  panel.hidden=!active;for(const input of [enabled,seed,button])input.disabled=!active;
  controls.hidden=!enabled.checked;
  if(!active||!enabled.checked){lastKey='';details.open=false;return;}
  try {
   const value=resolveOpening({...config,openingEnabled:'yes',openingSeed:seed.value});
   const key=`${value.seed}:${value.fingerprint}`;
   if(key!==lastKey){details.open=false;lastKey=key;}
   status.textContent=value.conservative?'Impuls bereit. Wegen eigener Vorgaben wird kein konkreter Ort vorgegeben.':'Impuls bereit. Die Bausteine bleiben bis zum Aufdecken verborgen.';
   panel.querySelector('.opening-preview').textContent=`Umgebung: ${value.environment?.label??'Aus deinen Weltvorgaben'} · Ausgangslage: ${value.situation.label}`;
  }catch(error){lastKey='';details.open=false;panel.querySelector('.opening-preview').textContent='';status.textContent=error.message;}
 },reset(){enabled.checked=false;seed.value='';details.open=false;lastKey='';}};
}
