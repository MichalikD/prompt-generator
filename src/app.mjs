import {mountWorldEditor} from './world-editor.mjs';
import {worldText} from './worlds.mjs';
import {createProfile} from './profile.mjs';
import {mountCharacterEditor} from './character-editor.mjs';
import {openPlayTab} from './play-state.mjs';
import {validateCharacterDocument} from './character.mjs';
import {autoGrow,watchGrow} from './ui.mjs';
import {mountOpeningEditor} from './opening-editor.mjs';
import {focuses} from './profile.mjs';
import {infoButton} from './tooltips.mjs';
import {groups,dice,defaults} from './generator.mjs';
import {buildOutput,PLUGIN,worldForCharacter} from './outputs.mjs';
import {setupSteps,stepForGroup,setupErrors} from './setup.mjs';
const $=s=>document.querySelector(s);
const form=$('#options'),output=$('#prompt'),copy=$('#copy'),status=$('#status'),reset=$('#reset');
const source=$('#character-source');
const startMessage=$('#start-message'),copyStart=$('#copy-start'),startStatus=$('#start-status'),download=$('#download');
let currentOutput=null,revision=0,editor=null,characterDoc=null,updating=false,step=0,showErrors=false;
let openingShown='';
let playDocument=null;
const playReference={setDocument(doc){playDocument=doc;$('#play-character-reference').hidden=!doc;}};
$('#open-play-tab').addEventListener('click',()=>{if(!playDocument)return;try{openPlayTab(playDocument);}catch(e){$('#play-open-status').textContent=e.message;}});
$('#play-desk-link a').addEventListener('click',event=>{
 event.preventDefault();
 try {
  const doc=editor?.getDocument()??characterDoc;
  if(doc&&!validateCharacterDocument(doc).length)openPlayTab(doc);
  else {const child=window.open('./play.html','_blank');if(!child)throw new Error('Spieltab blockiert. Pop-up erlauben und erneut öffnen.');child.opener=null;}
  $('#play-desk-status').textContent='';
 }catch(e){$('#play-desk-status').textContent=e.message;}
});
for(const [index,title] of setupSteps.entries()) {
 const button=document.createElement('button');button.type='button';button.textContent=`${index+1} · ${title}`;
 button.addEventListener('click',()=>goTo(index));$('#setup-steps').append(button);
}
$('#plugin-link').href=PLUGIN.url;$('#plugin-name').textContent=PLUGIN.name;$('#plugin-version').textContent=PLUGIN.version;
function addChoices(group,multi=false) {
 const field=document.createElement('fieldset');field.dataset.group=group.id;field.dataset.step=stepForGroup(group.id);
 const legend=document.createElement('legend');legend.textContent=group.label;field.append(legend);
 const row=document.createElement('div');row.className='choices';
 for(const option of [...group.options].sort((a,b)=>Number(b.id===defaults[group.id])-Number(a.id===defaults[group.id]))) {
  const wrap=document.createElement('div');wrap.className='option-wrap';
  const label=document.createElement('label');label.className='choice';
  const input=document.createElement('input');input.type=multi?'checkbox':'radio';input.name=group.id;input.value=option.id;
  input.checked=!multi&&defaults[group.id]===option.id;
  const span=document.createElement('span');span.textContent=option.label;label.append(input,span);
  const tips={scope:{short:'Ein eigenständiger Konflikt mit abschließendem Ergebnis, kein Auftakt einer größeren Hauptbedrohung.',medium:'Ein größerer Handlungsbogen mit verbundenen Wendepunkten und nutzbarer Zwischenentwicklung.',long:'Ein ausgedehnter Handlungsbogen mit mehreren Abschnitten, Entwicklung im Verlauf und erreichbarem Finale.'},continuation:{open:'Weitere Abenteuer mit derselben Figur und Welt. Keine automatische übergeordnete Hauptgeschichte.',linked:'Wiederkehrende Verbindungen. Bei kurz eigenständige Konflikte; bei mittel/lang ein größerer Bogen mit Gesamtfinale.'}};
  wrap.append(label,infoButton({...option,tooltip:tips[group.id]?.[option.id]??option.tooltip}));row.append(wrap);
 }
 field.append(row);form.append(field);
}
const worldEditor=mountWorldEditor(form);
for(const group of groups) {
 if(group.id!=='setting')addChoices(group);
 if(group.id==='continuation')addChoices({id:'focus',label:'Spielschwerpunkte · optional, höchstens zwei',options:focuses},true);
}
addChoices({id:'extras',label:'Zusatzwürfel · D20 bleibt gesetzt',options:dice},true);
const openingEditor=mountOpeningEditor(form);
function configFromForm() {
 const data=new FormData(form);
 return {...Object.fromEntries(data),extras:data.getAll('extras'),focus:data.getAll('focus'),characterSource:source.querySelector('input:checked')?.value??'prepared',
  openingEnabled:form.querySelector('[name=openingEnabled][value=yes]').checked,
  openingSeed:form.querySelector('[name=openingSeed]').value};
}
function clearOutput(message) {
 playReference.setDocument(null);
 $('#opening-output-guard').hidden=true;startMessage.hidden=false;
 currentOutput=null;output.value=startMessage.value='';copy.disabled=copyStart.disabled=download.disabled=true;
 output.placeholder=message;startMessage.placeholder=message;status.textContent=message;

}
function summary(config) {
 const rows=[['Ausgabe','Plugin-Startpaket'],...groups.filter(g=>!(g.id==='creation'&&config.characterSource==='prepared')).map(g=>[g.label,g.options.find(o=>o.id===config[g.id]).label])];
 rows.push(['Weltprofil',worldText(createProfile(config).world)]);
 if(config.wishes?.trim())rows.push(['Eigene Vorgaben',config.wishes.trim()]);
 rows.push(['Schwerpunkte',config.focus.map(id=>focuses.find(f=>f.id===id).label).join(', ')||'Situativ vielfältig']);
 rows.push(['Zusatzwürfel',config.extras.map(id=>dice.find(d=>d.id===id).label).join(', ')||'Keine']);
 rows.push(['Ausgangsimpuls',currentOutput?.opening?`Aktiv · ${currentOutput.opening.seed} · Bausteine im Starttext`:'Ausgeschaltet']);
 if(config.characterSource==='prepared') {
  const c=characterDoc.character;rows.push(['Bestätigte Figur',c.identity.name]);
  rows.push(['Startgeld',c.finances.funds.map(r=>`${r.amount} ${r.currency}`).join(', ')||'Nicht festgelegt; bedeutet nicht mittellos.']);
 }else rows.push(['Figur','Erstellung im Spielchat']);
 $('#setup-summary').replaceChildren(...rows.flatMap(([label,value])=>{
  const dt=document.createElement('dt'),dd=document.createElement('dd');dt.textContent=label;dd.textContent=value;return [dt,dd];
 }));
}
function update() {
 if(updating)return;updating=true;
 try {
  revision++;
  const config=configFromForm(),prepared=config.characterSource==='prepared';
  const worldErrors=setupErrors(0,config);
  if(prepared&&!worldErrors.length) {
   const world=worldForCharacter(config);
   if(!editor)editor=mountCharacterEditor($('#character-editor'),{world,worldLocked:true,onChange:doc=>{characterDoc=doc;update();}});
   else editor.setWorld(world);
   characterDoc=editor.getDocument();
  }else if(editor&&!worldErrors.length)editor.setWorld(worldForCharacter(config));
  worldEditor.update(config);
  openingEditor.update(config);
  for(const el of form.querySelectorAll('[data-step]'))el.hidden=Number(el.dataset.step)!==step||(el.dataset.group==='creation'&&prepared);
  $('#play-desk-link').hidden=step!==0;
  source.hidden=step!==2;$('#prepared-character').hidden=step!==2||!prepared;
  $('.configuration').hidden=step===3;$('#setup-output').hidden=step!==3;
  $('#step-number').textContent=String(step+1);$('#step-title').textContent=setupSteps[step];
  $('#setup-position').textContent=`Schritt ${step+1} von ${setupSteps.length} · ${setupSteps[step]}`;
  for(const [index,button] of [...$('#setup-steps').children].entries()) {
   button.disabled=false;
   if(index===step)button.setAttribute('aria-current','step');else button.removeAttribute('aria-current');
  }
  $('#setup-back').hidden=step===0;$('#setup-back').textContent=step?`Zurück zu ${setupSteps[step-1]}`:'Zurück';
  $('#setup-next').hidden=step===3;$('#setup-next').textContent=step===2?'Weiter zur Ausgabe':`Weiter zu ${setupSteps[step+1]}`;
  const count=config.focus.length;
  for(const input of form.querySelectorAll('input[name=focus]'))input.disabled=count>=2&&!input.checked;

  $('#output-name').textContent='Bereit für dein Abenteuer.';
  $('#mode-help').textContent='Das Plugin liefert die Regeln. Deine Vorgaben und der bestätigte Bogen stehen gemeinsam in der ersten Chatnachricht.';
  copy.textContent='Projektanweisungen kopieren';copyStart.textContent='Erste Chatnachricht kopieren';
  const errors=setupErrors(step,config,characterDoc);
  $('#setup-feedback').textContent=showErrors?errors.slice(0,4).join(' '):'';
  $('#world-description').setAttribute('aria-invalid',String(showErrors&&config.setting==='custom'&&!config.worldDescription?.trim()));
  if(step!==3) {clearOutput('Die Starttexte erscheinen nach Abschluss der Vorbereitung.');return;}
  if(errors.length){clearOutput(errors[0]);$('#setup-feedback').textContent=errors.slice(0,4).join(' ');return;}
  currentOutput=buildOutput(config,'plugin',prepared?characterDoc:null);
  playReference.setDocument(prepared?characterDoc:null);
  summary(config);
  output.value=currentOutput.projectInstructions;startMessage.value=currentOutput.startMessage;
  const openingKey=currentOutput.opening?`${currentOutput.opening.seed}:${currentOutput.opening.fingerprint}`:'';
  if(!openingKey)openingShown='';
  startMessage.hidden=!!openingKey&&openingShown!==openingKey;
  $('#opening-output-guard').hidden=!openingKey;$('#start-text-panel').hidden=!!openingKey&&startMessage.hidden;
  $('#reveal-opening-start').hidden=!startMessage.hidden;
  $('#plugin-starter').hidden=!currentOutput.startMessage;
  $('#starter-help').textContent=prepared?'Profil und bestätigter Bogen sind enthalten. Sende diese Nachricht vollständig; den Bogen nicht zusätzlich senden.':'Das Profil ist enthalten. Deine Figur wird anschließend im Spielchat erstellt.';

  copy.disabled=false;copyStart.disabled=!startMessage.value;download.disabled=false;
  status.textContent='In die Anweisungen eines neuen Projekts einfügen.';
  startStatus.textContent=openingKey?'Der vollständige Starttext kann ohne Aufdecken kopiert werden.':'Danach in einem Chat dieses Projekts senden.';
 }catch(error){clearOutput(error.message);$('#setup-feedback').textContent=error.message;}
 finally{updating=false;requestAnimationFrame(()=>{autoGrow(document);editor?.refresh();});}
}
function goTo(target) {
 if(target>step){
  const config=configFromForm();
  for(let i=0;i<target;i++){
   const errors=setupErrors(i,config,characterDoc);
   if(errors.length){step=i;showErrors=true;update();if(i===0)worldEditor.focusError();return;}
  }
  if(target===3&&config.characterSource==='prepared'){try{characterDoc=editor.acceptDocument();}catch(e){step=2;showErrors=true;update();return;}}
 }
 step=target;showErrors=false;update();
 $('#setup-position').setAttribute('tabindex','-1');$('#setup-position').focus({preventScroll:true});$('#setup-steps').scrollIntoView?.({block:'start'});
}
$('#setup-next').addEventListener('click',()=>goTo(Math.min(step+1,3)));
$('#setup-back').addEventListener('click',()=>goTo(Math.max(step-1,0)));
source.addEventListener('change',update);
form.addEventListener('submit',event=>event.preventDefault());
form.addEventListener('input',event=>{if(event.target.matches('textarea')||event.target.name==='openingSeed')update();});
form.addEventListener('change',event=>{
 const percent=form.querySelector('input[value=dpercent]'),ten=form.querySelector('input[value=d10]');
 if(event.target.name==='focus'&&form.querySelectorAll('input[name=focus]:checked').length>2)event.target.checked=false;
 if(event.target===percent&&percent.checked)ten.checked=true;
 if(event.target===ten&&!ten.checked)percent.checked=false;
 update();
});
reset.disabled=false;reset.addEventListener('click',()=>{
 openingShown='';
 for(const input of form.querySelectorAll('input'))input.checked=defaults[input.name]===input.value;
 for(const field of form.querySelectorAll('textarea'))field.value='';
 for(const field of form.querySelectorAll('select'))field.value=field.name==='setting'?'fantasy':field.name==='worldSource'?'original':field.name==='worldPlayerKind'?'mortal':'';
 openingEditor.reset();form.querySelector('.world-details').open=false;goTo(0);
});
function outputReady() {
 const config=configFromForm();
 return currentOutput&&step===3&&!setupErrors(3,config,characterDoc).length&&(config.characterSource==='chat'||characterDoc?.confirmed===true);
}
function enableCopy(button,field,feedback,success) {
 button.addEventListener('click',async()=>{
  const current=revision,text=field.value;if(button.disabled||!text||!outputReady())return;
  try {
   if(!navigator.clipboard?.writeText)throw new Error('Clipboard unavailable');
   await navigator.clipboard.writeText(text);if(revision===current)feedback.textContent=success;
  }catch{
   if(revision!==current)return;
   if(field.hidden){feedback.textContent='Zwischenablage nicht verfügbar. Bitte den Starttext aufdecken und manuell kopieren.';return;}
   field.focus();field.select();field.setSelectionRange(0,field.value.length);
   feedback.textContent='Bitte den markierten Text manuell kopieren.';
  }
 });
}
enableCopy(copy,output,status,'Kopiert. In die Projektanweisungen einfügen.');
enableCopy(copyStart,startMessage,startStatus,'Kopiert. Als erste Nachricht im Spielchat senden.');
$('#reveal-opening-start').addEventListener('click',()=>{
 if(!currentOutput?.opening)return;
 openingShown=`${currentOutput.opening.seed}:${currentOutput.opening.fingerprint}`;
 startMessage.hidden=false;$('#start-text-panel').hidden=false;$('#start-text-panel').open=true;$('#reveal-opening-start').hidden=true;autoGrow(document);
});
download.addEventListener('click',()=>{
 if(!currentOutput?.downloadText||!outputReady())return;
 const url=URL.createObjectURL(new Blob([currentOutput.downloadText],{type:'text/markdown;charset=utf-8'}));
 const link=document.createElement('a');link.href=url;link.download=currentOutput.downloadName;document.body.append(link);link.click();link.remove();
 setTimeout(()=>URL.revokeObjectURL(url),1000);
});
watchGrow(document);
update();
