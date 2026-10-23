import {newOpeningSeed,resolveOpening} from './opening.mjs';
export function mountOpeningEditor(form) {
 const panel=document.createElement('fieldset');panel.dataset.step='1';panel.dataset.group='opening';panel.className='opening-editor';
 panel.innerHTML='<legend>Zufälliger Ausgangsimpuls · optional</legend><div class="opening-row"><div class="choices"><label class="choice"><input type="radio" name="openingEnabled" value="no" checked><span>Aus</span></label><label class="choice"><input type="radio" name="openingEnabled" value="yes"><span>An</span></label></div><div class="opening-controls" hidden><label for="opening-seed">Kennung</label><div class="seed-row"><input id="opening-seed" name="openingSeed" type="text" maxlength="13" spellcheck="false" autocomplete="off" placeholder="ogm1-0123abcd"><button type="button" class="primary seed-reroll" aria-label="Ausgangsimpuls neu auslosen" title="Neu auslosen">↻</button></div></div></div><p class="field-help">Ein Anstoß für Umgebung und Ausgangslage; eigene Vorgaben und Figur bleiben maßgeblich.</p><div class="opening-extra" hidden><p class="opening-status field-help" role="status" aria-live="polite"></p><details><summary>Ausgangslage aufdecken</summary><p class="opening-preview"></p></details></div>';
 form.append(panel);
 const enabled=panel.querySelector('[value=yes]'),off=panel.querySelector('[value=no]'),seed=panel.querySelector('[name=openingSeed]'),button=panel.querySelector('button'),controls=panel.querySelector('.opening-controls'),extra=panel.querySelector('.opening-extra'),status=panel.querySelector('.opening-status'),details=panel.querySelector('details');let key='';
 enabled.addEventListener('change',()=>{try{if(enabled.checked&&!seed.value)seed.value=newOpeningSeed();}catch(e){status.textContent=e.message;}});
 button.addEventListener('click',()=>{try{seed.value=newOpeningSeed();seed.dispatchEvent(new panel.ownerDocument.defaultView.Event('change',{bubbles:true}));}catch(e){status.textContent=e.message;}});
 return {update(config,active=true){
  panel.hidden=!active;for(const input of [enabled,off,seed,button])input.disabled=!active;
  controls.hidden=extra.hidden=!enabled.checked;
  if(!active||!enabled.checked){key='';details.open=false;return;}
  try{const value=resolveOpening({...config,openingEnabled:true,openingSeed:seed.value}),next=`${value.seed}:${value.fingerprint}`;if(next!==key){details.open=false;key=next;}status.textContent=value.conservative?'Eigene Vorgaben: Der Impuls lässt den Ort offen.':'Kennung bleibt beim Ausfüllen und Kopieren erhalten.';panel.querySelector('.opening-preview').textContent=`Umgebung: ${value.environment?.label??'Aus deinen Weltvorgaben'} · Ausgangslage: ${value.situation.label}`;}catch(e){key='';details.open=false;panel.querySelector('.opening-preview').textContent='';status.textContent=e.message;}
 },reset(){off.checked=true;enabled.checked=false;seed.value='';details.open=false;key='';}};
}
