import {worldTemplates,worldFields,worldSources,worldPlayerKinds,resolveWorld} from './worlds.mjs';
const select=(name,label,options,inherit=false)=>{
 const wrapper=document.createElement('div');wrapper.className='text-option';
 const title=document.createElement('label');title.htmlFor=name;title.textContent=label;
 const input=document.createElement('select');input.id=input.name=name;
 for(const option of [...(inherit?[{id:'',label:'Vorgabe der Vorlage'}]:[]),...options]) {
  const el=document.createElement('option');el.value=option.id;el.textContent=option.label;input.append(el);
 }
 wrapper.append(title,input);return wrapper;
};
export function mountWorldEditor(form) {
 const root=document.createElement('div');root.dataset.step='0';root.className='world-editor';
 root.append(select('setting','Weltvorlage',worldTemplates));root.querySelector('[name=setting]').value='fantasy';
 root.append(select('worldSource','Grundlage',worldSources));
 const ref=document.createElement('div');ref.className='text-option';
 ref.innerHTML='<label for="worldReference">Vorbild oder Universum</label><textarea id="worldReference" name="worldReference" rows="1" data-grow placeholder="Name, gewünschte Einflüsse, Zeitraum und Abweichungen"></textarea>';
 root.append(ref);
 const summary=document.createElement('p');summary.className='world-summary';summary.id='world-summary';
 const details=document.createElement('details');details.className='world-details';
 const heading=document.createElement('summary');heading.textContent='Welt anpassen';details.append(heading);
 const help=document.createElement('p');help.textContent='Leere Angaben übernehmen die Vorlage. Eigene Änderungen bleiben beim Vorlagenwechsel erhalten. Bekannte Konflikte werden angezeigt; Freitext kann nicht vollständig automatisch geprüft werden.';details.append(help);
 for(const f of worldFields)details.append(select(f.config,f.label,f.options,true));
 for(const [key,label,placeholder] of [['worldSociety','Schauplatz und Gesellschaft','Eigene Region, Kulturen und gesellschaftliche Verhältnisse'],['worldMythology','Mythologie / Götterwelt','Zum Beispiel griechisch, nordisch oder ein eigenes Pantheon']]) {
  const wrap=document.createElement('div');wrap.className='text-option';
  const title=document.createElement('label');title.htmlFor=key;title.textContent=label;
  const input=document.createElement('textarea');input.id=input.name=key;input.rows=1;input.dataset.grow='';input.placeholder=placeholder;wrap.append(title,input);details.append(wrap);
 }
 details.append(select('worldPlayerKind','Mögliche Spielfigur',worldPlayerKinds));
 const free=document.createElement('div');free.className='text-option';
 free.innerHTML='<label id="world-label" for="world-description">Weitere Weltvorgaben (optional)</label><p id="world-help">Eigene Besonderheiten, genaue Jahreszahl oder bewusst abweichende Annahmen. Beschreibe bei „Eigene Welt“ hier deine Grundlage.</p><textarea id="world-description" name="worldDescription" aria-describedby="world-help" rows="1" data-grow></textarea>';
 details.append(free);
 const clear=document.createElement('button');clear.type='button';clear.className='quiet';clear.textContent='Weltanpassungen zurücksetzen';
 clear.addEventListener('click',()=>{
  // Deliberate reset; switching a template never clears these fields.
  for(const el of details.querySelectorAll('textarea,select'))el.value=el.name==='worldPlayerKind'?'mortal':'';
  confirm.checked=false;form.dispatchEvent(new form.ownerDocument.defaultView.Event('change',{bubbles:true}));
 });details.append(clear);root.append(details);
 const warning=document.createElement('div');warning.className='world-warning';warning.setAttribute('role','status');
 const reasons=document.createElement('p');const label=document.createElement('label');label.className='choice';
 const confirm=document.createElement('input');confirm.type='checkbox';confirm.name='worldMixConfirmed';confirm.value='yes';
 const span=document.createElement('span');span.textContent='Diese abweichende Mischung ist beabsichtigt.';label.append(confirm,span);warning.append(reasons,label);root.append(warning);
 const wishes=document.createElement('div');wishes.className='text-option';wishes.innerHTML='<label for="wishes">Eigene Spielvorgaben und Ausschlüsse (optional)</label><p id="wishes-help">Zum Beispiel: keine verlorene Erinnerung als Aufhänger.</p><textarea id="wishes" name="wishes" aria-describedby="wishes-help" rows="1" data-grow></textarea>';root.append(wishes);root.append(summary);
 form.append(root);
 form.addEventListener('input',event=>{if(root.contains(event.target)&&event.target!==confirm&&event.target.name!=='wishes')confirm.checked=false;});
 form.addEventListener('change',event=>{if(root.contains(event.target)&&event.target!==confirm&&event.target.name!=='wishes')confirm.checked=false;});
 return {update(config){
  ref.hidden=config.worldSource!=='inspired'&&config.worldSource!=='canon';
  // Hidden reference values remain intact but are ignored for an original world.
  root.querySelector('[name=worldReference]').required=!ref.hidden;
  root.querySelector('#world-label').textContent=config.setting==='custom'?'Eigene Welt beschreiben (erforderlich)':'Weitere Weltvorgaben (optional)';
  root.querySelector('#world-description').required=config.setting==='custom';
  if(config.setting==='custom')details.open=true;
  const t=worldTemplates.find(t=>t.id===config.setting);
  if(t)for(const f of worldFields)root.querySelector(`[name=${f.config}] option[value=""]`).textContent='Vorgabe: '+f.options.find(o=>o.id===t[f.key]).label;
  try {
   const world=resolveWorld(config);
   summary.textContent=[t.label,...worldFields.map(f=>f.options.find(o=>o.id===world[f.key]).label),config.worldSociety?.trim(),config.worldMythology?.trim()||(t.id==='mythology'?'Griechische Mythologie als Ausgangspunkt':'')].filter(Boolean).join(' · ');
   warning.hidden=!world.warnings.length;reasons.textContent=world.warnings.join(' ');
   for(const key of ['worldSociety','worldMythology'])root.querySelector(`[name=${key}]`).placeholder=t[key==='worldSociety'?'society':'mythology']||'Optional eigene Angaben';
  }catch(error){summary.textContent=error.message;warning.hidden=true;}
 },focusError(){
  if(!warning.hidden){confirm.focus();return;}
  if(!ref.hidden&&!root.querySelector('[name=worldReference]').value.trim()){root.querySelector('[name=worldReference]').focus();return;}
  details.open=true;
  (summary.textContent.includes('widerspricht')?root.querySelector('[name=worldPlayerKind]'):root.querySelector('#world-description')).focus();
 }};
}
