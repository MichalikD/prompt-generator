import {drawDraftImpulse} from './draft-impulses.mjs';

export function mountDraftImpulse(before,kind,onChange){
 const group=document.createElement('fieldset');
 group.innerHTML='<legend>Entwurfsimpuls · optional</legend><label><input type="checkbox"> Impuls verwenden</label><div class="impulse-controls" hidden><div class="actions"><span role="status">Verdeckter Impuls ausgewählt</span><button type="button" class="small">Neu auslosen ↻</button></div><details><summary>Entwurfsimpuls aufdecken</summary><p class="impulse-preview"></p></details></div><p class="field-help">Eine verdeckte Anregung für den Entwurf. Deine Vorgaben haben Vorrang; das kopierte Template enthält den Impuls.</p>';
 before.before(group);
 const enabled=group.querySelector('input'),controls=group.querySelector('.impulse-controls'),preview=group.querySelector('.impulse-preview');
 let current=null;
 function update(){
  controls.hidden=!enabled.checked;
  preview.textContent=current?.label??'';
  onChange();
 }
 function draw(){
  group.querySelector('details').open=false;
  try{current=drawDraftImpulse(kind,current?.id);}
  catch{current=null;enabled.checked=false;preview.textContent='';group.querySelector('.field-help').textContent='Zufall ist in diesem Browser nicht verfügbar.';}
  update();
 }
 enabled.addEventListener('change',()=>{if(enabled.checked&&!current)draw();else update();});
 group.querySelector('button').addEventListener('click',draw);
 return {get id(){return enabled.checked?current?.id:undefined;},reset(){current=null;enabled.checked=false;group.querySelector('details').open=false;update();}};
}
