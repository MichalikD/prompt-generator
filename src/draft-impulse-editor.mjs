import {drawDraftImpulse} from './draft-impulses.mjs';

export function mountDraftImpulse(before,kind,onChange){
 const group=document.createElement('fieldset');
 group.innerHTML='<legend>Entwurfsimpuls · optional</legend><label><input type="checkbox"> Impuls verwenden</label><div class="actions" hidden><span role="status"></span><button type="button" class="small">Neu auslosen</button></div><p class="field-help">Eine Anregung für den Entwurf. Deine Vorgaben haben Vorrang.</p>';
 before.before(group);
 const enabled=group.querySelector('input'),controls=group.querySelector('.actions'),preview=group.querySelector('span');
 let current=null;
 function update(){
  controls.hidden=!enabled.checked;
  preview.textContent=current?.label??'';
  onChange();
 }
 function draw(){
  try{current=drawDraftImpulse(kind,current?.id);}
  catch{current=null;enabled.checked=false;preview.textContent='';group.querySelector('.field-help').textContent='Zufall ist in diesem Browser nicht verfügbar.';}
  update();
 }
 enabled.addEventListener('change',()=>{if(enabled.checked&&!current)draw();else update();});
 group.querySelector('button').addEventListener('click',draw);
 return {get id(){return enabled.checked?current?.id:undefined;},reset(){current=null;enabled.checked=false;update();}};
}
