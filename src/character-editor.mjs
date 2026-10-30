import {damageBands,emptyWeapon,weaponPresets,weaponFromPreset,weaponPresetId} from './weapons.mjs';
import {newCharacterDocument,validateCharacterDocument,parseCharacter,serializeCharacter,characterText,continueCharacter,characterTemplate,attributeLabels} from './character.mjs';
import {characterMarkup} from './character-view.mjs';
import {autoGrow,watchGrow,openDialog,downloadFile,copyText} from './ui.mjs';

export function mountCharacterEditor(root,{onChange=()=>{},world='',worldLocked=false,running=false}={}) {
 root.innerHTML=characterMarkup;
 const $=s=>root.querySelector(s);let doc=newCharacterDocument(),active='identity';
 const form=$('#character-fields');form.addEventListener('submit',e=>e.preventDefault());
 const names={identity:'Identität',values:'Werte & Talente',abilities:'Fähigkeiten',inventory:'Ausrüstung & Mittel',background:'Hintergrund',development:'Entwicklung'};
 const labels={name:'Name',range:'Reichweite',targets:'Ziele / Fläche',damage:'Schaden (ggf. „kein Schaden“)',effect:'Wirkung / Auflösung / Dauer',cost:'Kosten',limits:'Weitere Grenzen',description:'Beschreibung / Funktion / besondere Wirkung',bonus:'Probenbonus',trigger:'Auslöser',mitigation:'Abmilderung',quantity:'Anzahl',slots:'Tragplätze je Stück',currency:'Währung',amount:'Betrag',current:'Aktuell',max:'Maximum',regeneration:'Regeneration',care:'Versorgung / Erholung',mechanical:'Vereinbarte Mechanik',milestone:'Meilenstein',change:'Änderung',benefit:'Konkreter Nutzen / einsetzbare Wirkung'};
 function changed(){doc.confirmed=false;update();}
 function field(parent,path,label,type='text') {
  const wrap=document.createElement('div');wrap.className='character-field';
  if(path[0]==='talents'&&path.at(-1)==='bonus'&&doc.kind==='start'){wrap.textContent='Starttalent +2 · nicht stapelbar';wrap.classList.add('field-help');parent.append(wrap);return;}
  const caption=document.createElement('label');caption.htmlFor='cf-'+path.join('-');caption.textContent=label;
  const input=document.createElement(type==='textarea'?'textarea':'input');input.id=caption.htmlFor;input.name=path.join('.');
  if(type==='textarea'){input.rows=1;input.dataset.grow='';}else input.type=type;
  if(type==='number')input.step=path.at(-1)==='amount'?'any':'1';
  if(path[0]==='talents'&&path.at(-1)==='bonus'){input.min='2';input.max='5';caption.textContent='Talentbonus · 2 bis 5, nicht stapelbar';}
  const object=path.slice(0,-1).reduce((o,k)=>o[k],doc.character),key=path.at(-1),value=object[key];
  if(type==='checkbox')input.checked=value;else input.value=value??'';
  if(path[0]==='abilities'&&['range','targets','damage'].includes(key)&&!Object.hasOwn(object,key))input.placeholder='Bisher in Wirkung / Grenzen erfasst';
  if(path[0]==='abilities'&&key==='range')input.setAttribute('aria-description','Leer oder 0 bedeutet ohne Reichweitenbeschränkung. Berührung ausdrücklich eintragen.');
  if(path[0]==='needs'&&['trigger','effect','care'].includes(key))wrap.hidden=!doc.character.needs[path[1]].mechanical;
  input.addEventListener('input',()=>{object[key]=type==='checkbox'?input.checked:type==='number'?(input.value===''?NaN:Number(input.value)):input.value;doc.confirmed=false;if(path[0]==='inventory'&&path[2]==='weapon')syncWeaponPreset(path[1]);if(type==='checkbox')render();else update();});
  wrap.append(caption,input);parent.append(wrap);
 }
 function section(parent,title){const el=document.createElement('fieldset'),legend=document.createElement('legend');legend.textContent=title;el.append(legend);parent.append(el);return el;}
 function list(parent,title,path,defaults,numbers=[]) {
  const box=section(parent,title),rows=path.reduce((o,k)=>o[k],doc.character);
  rows.forEach((row,index)=>{
   const entry=document.createElement('details');entry.className='character-row';entry.open=index===0;
   const summary=document.createElement('summary');summary.textContent=row.name||`${title} ${index+1}`;entry.append(summary);
   const actions=document.createElement('div');actions.className='actions row-actions';const remove=document.createElement('button');remove.type='button';remove.className='danger small';remove.textContent='Entfernen';remove.setAttribute('aria-label',`${title} ${index+1} entfernen`);remove.addEventListener('click',()=>{rows.splice(index,1);doc.confirmed=false;render();});actions.append(remove);entry.append(actions);
   const fields=document.createElement('div');fields.className='field-grid';
   for(const key of Object.keys(defaults)){
    const type=typeof defaults[key]==='boolean'?'checkbox':numbers.includes(key)?'number':['description','effect','limits','trigger','mitigation','benefit','regeneration','care','targets'].includes(key)?'textarea':'text';
    field(fields,[...path,index,key],labels[key]??key,type);
    if(['effect','limits','description','trigger','mitigation','benefit','regeneration','care'].includes(key))fields.lastElementChild.classList.add('full-width');
   }
   entry.append(fields);
   if(path[0]==='inventory')weaponFields(entry,row,index);
   box.append(entry);
  });
  const add=document.createElement('button');add.type='button';add.className='small';add.textContent=`+ ${title} hinzufügen`;add.addEventListener('click',()=>{rows.push(structuredClone(defaults));doc.confirmed=false;render();const target=form.querySelectorAll(`[data-area=${active}] details.character-row`);if(target.length)target[target.length-1].open=true;autoGrow(root);});box.append(add);return box;
 }
 function syncWeaponPreset(index){
  const preset=form.querySelector(`[data-weapon-preset="${index}"]`);if(!preset)return;
  preset.value=weaponPresetId(doc.character.inventory[index].weapon);
  preset.nextElementSibling.disabled=!preset.value;
 }
 function weaponFields(entry,row,index){
  const toggle=document.createElement('button');toggle.type='button';toggle.className='small';toggle.textContent=row.weapon?'Waffenprofil entfernen':'+ Waffenprofil';toggle.setAttribute('aria-label',`${toggle.textContent} · ${row.name||index+1}`);
  toggle.addEventListener('click',()=>{if(row.weapon)delete row.weapon;else row.weapon=emptyWeapon();doc.confirmed=false;render();});entry.append(toggle);
  if(!row.weapon)return;
  const box=section(entry,'Waffenprofil');box.classList.add('field-grid');
  const help=document.createElement('p');help.className='field-help full-width';help.textContent='Die Vorlagenauswahl erkennt nur wortgleiche Profile. Bei einem individuellen Profil gelten die unten eingetragenen Werte; fehlende Pflichtangaben werden beim Prüfen gemeldet. Vorlagen sind Vorschläge für neue Waffen. Übernehmen ersetzt nur das Waffenprofil, nicht Name, Funktion, Tragplätze oder Bonus. Bestätigte Eigenschaften nur nach Absprache ändern. Waffenreichweite immer ausdrücklich angeben; leer oder 0 bedeutet hier nicht unbegrenzt.';box.append(help);
  const choices=document.createElement('div');choices.className='actions full-width';
  const preset=document.createElement('select');preset.setAttribute('aria-label','Waffenvorlage');preset.dataset.weaponPreset=String(index);
  const custom=document.createElement('option');custom.value='';custom.textContent='Individuelles Profil · Werte unten';preset.append(custom);
  for(const [id,w]of Object.entries(weaponPresets)){const option=document.createElement('option');option.value=id;option.textContent=w.label;preset.append(option);}
  const apply=document.createElement('button');apply.type='button';apply.className='small';apply.textContent='Vorlage übernehmen';apply.addEventListener('click',()=>{row.weapon=weaponFromPreset(preset.value);doc.confirmed=false;render();});choices.append(preset,apply);box.append(choices);preset.value=weaponPresetId(row.weapon);apply.disabled=!preset.value;preset.addEventListener('change',()=>{apply.disabled=!preset.value;});
  const wrap=document.createElement('div');wrap.className='character-field';const label=document.createElement('label');label.htmlFor=`weapon-damage-${index}`;label.textContent='Schadensklasse';const select=document.createElement('select');select.id=label.htmlFor;select.name=`inventory.${index}.weapon.damage`;
  for(const [id,b]of Object.entries(damageBands)){const option=document.createElement('option');option.value=id;option.textContent=`${b.label} ${b.base} · W${b.die} nur wenn ausgewählt`;select.append(option);}select.value=row.weapon.damage;select.addEventListener('change',()=>{row.weapon.damage=select.value;syncWeaponPreset(index);changed();});wrap.append(label,select);box.append(wrap);
  for(const [key,label]of Object.entries({range:'Reichweite / wirksame Distanz',handling:'Handhabung / Platzbedarf',feature:'Besonderheit / Auflösung',limits:'Grenzen / Munition'}))field(box,['inventory',index,'weapon',key],label,'textarea');
 }
 function showArea(id){active=id;for(const p of form.children)p.hidden=p.dataset.area!==active;for(const b of root.querySelectorAll('[data-editor-tab]'))b.setAttribute('aria-selected',String(b.dataset.editorTab===active));autoGrow(root);}
 function render(){
  doc.character.progression??={xp:0,available:0};
  form.replaceChildren();$('.editor-tabs').replaceChildren();
  const areas={};for(const [id,name]of Object.entries(names)){
   if(id==='development'&&doc.kind!=='current')continue;
   const panel=document.createElement('div');panel.dataset.area=id;panel.id='editor-area-'+id;panel.setAttribute('role','tabpanel');panel.setAttribute('aria-labelledby','editor-tab-'+id);form.append(panel);areas[id]=panel;
   const tab=document.createElement('button');tab.type='button';tab.id='editor-tab-'+id;tab.textContent=name;tab.dataset.editorTab=id;tab.setAttribute('role','tab');tab.setAttribute('aria-controls',panel.id);tab.addEventListener('click',()=>showArea(id));$('.editor-tabs').append(tab);
  }
  $('.editor-tabs').setAttribute('role','tablist');
  const identity=section(areas.identity,'Identität');identity.classList.add('field-grid');
  for(const [key,label]of Object.entries({name:'Name',pronouns:'Pronomen (optional)',ancestry:'Spezies / Abstammung',origin:'Herkunft (darf offen bleiben)',role:'Rolle / Beruf',description:'Figurenbeschreibung'}))field(identity,['identity',key],label,key==='description'?'textarea':'text');
  const attributes=section(areas.values,'Vier Attribute');attributes.classList.add('attributes-grid');for(const [key,label]of Object.entries(attributeLabels))field(attributes,['attributes',key],label,'number');
  list(areas.values,'Talent',['talents'],{name:'',description:'',bonus:2},['bonus']);
  list(areas.values,'Schwäche',['weaknesses'],{name:'',trigger:'',effect:'',mitigation:''});
  const vitals=section(areas.values,'LP und Verletzungen');vitals.classList.add('field-grid');field(vitals,['vitals','hp'],'Aktuelle LP','number');field(vitals,['vitals','maxHp'],'Maximale LP','number');field(vitals,['vitals','injuries'],'Verletzungen','textarea');
  const help=document.createElement('p');help.className='field-help';help.textContent='Reichweite: ausdrücklich leer oder 0 = ohne Reichweitenbeschränkung. Berührung eintragen. Sicht und weitere Grenzen bleiben gültig. Bei bisherigen Bögen stehen fehlende Einzelangaben weiterhin in Wirkung / Grenzen; sie werden nicht automatisch geändert.';areas.abilities.append(help);
  list(areas.abilities,'Fähigkeit',['abilities'],{name:'',range:'',targets:'',damage:'',effect:'',cost:'',limits:''});
  list(areas.inventory,'Ausrüstung',['inventory'],{name:'',quantity:1,slots:1,bonus:0,description:''},['quantity','slots','bonus']);
  const capacity=document.createElement('p');capacity.id='character-capacity';capacity.className='field-help';areas.inventory.append(capacity);
  list(areas.inventory,'Geld',['finances','funds'],{currency:'',amount:0},['amount']);
  const money=section(areas.inventory,'Geld und Vermögen');field(money,['finances','purchasingPower'],'Kaufkraft / Preisanker','textarea');field(money,['finances','assets'],'Weiteres Vermögen','textarea');
  list(areas.abilities,'Fähigkeitsressource',['vitals','resources'],{name:'',current:3,max:3,effect:'',cost:'',regeneration:''},['current','max']);
  list(areas.inventory,'Besonderes Bedürfnis',['needs'],{name:'',description:'',mechanical:false,trigger:'',effect:'',care:''});
  const background=section(areas.background,'Hintergrund');const backgroundHelp=document.createElement('p');backgroundHelp.className='field-help';backgroundHelp.textContent='Die Figurenbeschreibung gehört zur Identität. Hier nur zusätzliche bereits festgelegte Ereignisse, Beziehungen oder Herkunftsfakten eintragen. Ohne solche Angaben darf das Feld leer bleiben; keine Vergangenheit erfinden.';background.append(backgroundHelp);for(const [key,label]of Object.entries({confirmed:'Zusätzliche bestätigte Hintergrundfakten',open:'Bewusst offen',excluded:'Ausgeschlossene Zuschreibungen'}))field(background,['background',key],label,'textarea');
  if(areas.development){const exp=section(areas.development,'Erfahrung');field(exp,['progression','xp'],'EXP · Rest bis zur nächsten Verbesserung (0–1)','number');field(exp,['progression','available'],'Verfügbare Verbesserungen','number');}
  if(areas.development)list(areas.development,'Entwicklung',['development'],{milestone:'',change:'',benefit:'',limits:''});
  $('#character-title').textContent=doc.kind==='start'?'Startbogen':'Laufender Bogen';
  $('#character-kind-help').textContent=doc.kind==='start'?'Start: vier Attribute −1 bis +3, Summe +5; zwei Talente, situative Schwäche, 10 LP und acht Tragplätze.':'Manuell gepflegter Stand. Der ursprüngliche Startbogen bleibt erhalten; Änderungen gelten im Spiel erst nach Absprache.';
  $('#character-original-panel').hidden=doc.kind!=='current';$('#character-original').value=doc.startCharacter?characterText({...newCharacterDocument(),character:doc.startCharacter,confirmed:true}):'Kein ursprünglicher Startbogen vorhanden.';
  if(!areas[active])active='identity';showArea(active);update();
 }
 function update(){
  const errors=validateCharacterDocument(doc);
  $('#character-errors').replaceChildren(...errors.map(message=>{const li=document.createElement('li');li.textContent=message;return li;}));
  for(const id of ['character-accept','download-character-json'])$('#'+id).disabled=!!errors.length;
  $('#character-continue').hidden=doc.kind!=='start';$('#character-continue').disabled=!!errors.length;
  $('#character-capacity').textContent=`Gepäck: ${doc.character.inventory.reduce((n,i)=>n+i.quantity*i.slots,0)} / 8 Tragplätze. Geld und Fähigkeitsressourcen werden getrennt geführt.`;
  $('#character-status').textContent=errors.length?'Bitte unvollständige Angaben korrigieren.':worldLocked?'Bogen ist formal gültig. „Weiter zur Ausgabe“ übernimmt ihn.':running?'Änderungen mit „Übernehmen“ im Dialog abschließen.':'Bogen ist formal gültig und kann übernommen werden.';
  onChange(structuredClone(doc));
 }
 function acceptDocument(){const errors=validateCharacterDocument(doc);if(errors.length)throw new Error(errors[0]);doc.confirmed=true;update();return structuredClone(doc);}
 $('#character-accept').addEventListener('click',acceptDocument);
 $('#character-continue').addEventListener('click',()=>{if(!validateCharacterDocument(doc).length){doc.confirmed=true;doc=continueCharacter(doc);render();}});
 $('#character-new').addEventListener('click',()=>{if(!window.confirm('Bogen ersetzen? Vorher bei Bedarf als JSON sichern.'))return;doc=newCharacterDocument();render();});
 const templateDialog=$('#character-template-dialog'),importDialog=$('#character-import-dialog');
 $('#open-template').addEventListener('click',()=>openDialog(templateDialog));$('#open-import').addEventListener('click',()=>openDialog(importDialog));
 for(const dialog of [templateDialog,importDialog])dialog.querySelector('[data-close]').addEventListener('click',()=>dialog.close());
 function importText(text){try{const next=parseCharacter(text);if(!window.confirm('Den Bogen durch den geprüften Import ersetzen?'))return;doc=next;render();$('#import-status').textContent='Import erfolgreich.';importDialog.close();}catch(e){$('#import-status').textContent=e.message;}}
 $('#import-character').addEventListener('click',()=>importText($('#character-import').value));
 $('#character-file').addEventListener('change',async()=>{const file=$('#character-file').files[0];if(!file)return;try{if(file.size>1000000)throw new Error('Bitte eine JSON-Datei bis 1 MB verwenden.');importText(await file.text());}catch(e){$('#import-status').textContent=e.message;}finally{$('#character-file').value='';}});
 $('#download-character-json').addEventListener('click',()=>{if(!validateCharacterDocument(doc).length)downloadFile(serializeCharacter(doc),'charakterbogen.json','application/json');});
 function template(){$('#character-template').value=characterTemplate($('#character-idea').value,$('#character-world').value);autoGrow(templateDialog);}
 for(const id of ['character-idea','character-world'])$('#'+id).addEventListener('input',template);
 $('#copy-template').addEventListener('click',()=>copyText($('#character-template').value,$('#template-status'),$('#character-template')));
 $('#character-world').value=world;$('#character-world').readOnly=worldLocked;template();
 if(worldLocked||running)$('.editor-accept').hidden=true;
 if(running){$('.editor-toolbar').hidden=true;templateDialog.remove();importDialog.remove();}
 watchGrow(root);render();
 return {getDocument:()=>structuredClone(doc),acceptDocument,setDocument(value){doc=parseCharacter(JSON.stringify(value));render();},setWorld(value){if($('#character-world').value===value)return;$('#character-world').value=value;template();doc.confirmed=false;update();},refresh(){autoGrow(root);}};
}
