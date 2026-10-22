import {newCharacterDocument, validateCharacterDocument, parseCharacter, serializeCharacter, characterText, continueCharacter, characterTemplate, attributeLabels} from './character.mjs';
import {characterMarkup} from './character-view.mjs';
import {mountCharacterReference} from './character-reference.mjs';
export function mountCharacterEditor(root, {onChange=()=>{}, world='', worldLocked=false}={}) {
root.innerHTML=characterMarkup;
const reference=mountCharacterReference(root.querySelector('.character-reference'));
root.classList.toggle('embedded-editor',worldLocked);
if(worldLocked) {
 for(const id of ['copy-character','download-character-text'])root.querySelector('#'+id).hidden=true;
 const preview=root.querySelector('[aria-labelledby=character-preview-title]');
 const details=document.createElement('details'), summary=document.createElement('summary');
 summary.textContent='Bogenvorschau und JSON prüfen'; details.append(summary);
 for(const child of [...preview.children])if(!['character-status','character-errors'].includes(child.id))details.append(child);
 preview.append(details);
}
let doc=newCharacterDocument();
let textRevision=0;
const $=selector=>root.querySelector(selector);
const form=$('#character-fields');
form.addEventListener('submit',event=>event.preventDefault());
const labels={currency:'Währung',amount:'Verfügbarer Betrag',mechanical:'Eine Mechanik für dieses Bedürfnis vereinbaren',care:'Versorgung / Erholung',name:'Name',description:'Beschreibung / Funktion',bonus:'Bonus',effect:'Wirkung',cost:'Kosten (ggf. „keine“)',limits:'Grenzen',trigger:'Auslöser',mitigation:'Abmilderung',quantity:'Anzahl',slots:'Tragplätze pro Einheit',current:'Aktuell',max:'Maximum',regeneration:'Regeneration',milestone:'Meilenstein',change:'Änderung',benefit:'Konkreter Nutzen'};
function field(parent,path,label,type='text') {
 const wrap=document.createElement('div');wrap.className='character-field';
 if(path[0]==='talents'&&path.at(-1)==='bonus') {
  const value=document.createElement('p');value.className='field-help';value.textContent='Bonus: +2 · fest, nicht stapelbar';wrap.append(value);parent.append(wrap);return;
 }
 const caption=document.createElement('label');caption.textContent=label;caption.htmlFor='cf-'+path.join('-');
 const input=document.createElement(type==='textarea'?'textarea':'input');
 input.id=caption.htmlFor;input.name=path.join('.');
 if(type==='textarea') input.rows=3;
 else input.type=type;
 if(type==='number') input.step=path.at(-1)==='amount'?'any':'1';
 const value=path.reduce((object,key)=>object[key],doc.character);
 if(type==='checkbox')input.checked=value;else input.value=value;
 if(path[0]==='needs'&&['trigger','effect','care'].includes(path.at(-1)))wrap.hidden=!doc.character.needs[path[1]].mechanical;
 input.addEventListener('input',()=>{
  const object=path.slice(0,-1).reduce((object,key)=>object[key],doc.character);
  object[path.at(-1)]=type==='checkbox'?input.checked:type==='number'?(input.value===''?NaN:Number(input.value)):input.value;
  doc.confirmed=false;$('#character-confirmed').checked=false;if(type==='checkbox')render();else update();
 });
 wrap.append(caption,input);parent.append(wrap);
}
function section(title) {
 const el=document.createElement('fieldset'), legend=document.createElement('legend');legend.textContent=title;el.append(legend);form.append(el);return el;
}
function list(title,path,defaults,numbers=[]) {
 const parent=section(title), rows=path.reduce((o,k)=>o[k],doc.character);
 rows.forEach((row,index)=>{
  const box=document.createElement('div');box.className='character-row';
  const heading=document.createElement('h3');heading.textContent=`${title} ${index+1}`;box.append(heading);
  for(const key of Object.keys(defaults)) field(box,[...path,index,key],labels[key],typeof defaults[key]==='boolean'?'checkbox':numbers.includes(key)?'number':['description','effect','limits','trigger','mitigation','benefit','regeneration','care'].includes(key)?'textarea':'text');
  const remove=document.createElement('button');remove.type='button';remove.className='quiet';remove.textContent=`${title} ${index+1} entfernen`;
  remove.addEventListener('click',()=>{rows.splice(index,1);doc.confirmed=false;render();});box.append(remove);parent.append(box);
 });
 const add=document.createElement('button');add.type='button';add.className='quiet';add.textContent=`${title} hinzufügen`;
 add.addEventListener('click',()=>{rows.push(structuredClone(defaults));doc.confirmed=false;render();});parent.append(add);
}
function render() {
 form.replaceChildren();
 const identity=section('Identität');
 for(const [key,label] of Object.entries({name:'Name',pronouns:'Pronomen (optional)',ancestry:'Spezies / Abstammung',origin:'Herkunft (darf offen bleiben)',role:'Rolle / Beruf',description:'Figurenbeschreibung'})) field(identity,['identity',key],label,key==='description'?'textarea':'text');
 const attributes=section('Vier Attribute');
 for(const [key,label] of Object.entries(attributeLabels)) field(attributes,['attributes',key],label,'number');
 list('Talent',['talents'],{name:'',description:'',bonus:2},['bonus']);
 list('Fähigkeit',['abilities'],{name:'',effect:'',cost:'',limits:''});
 const powerHelp=document.createElement('p');powerHelp.className='field-help';powerHelp.textContent='Wirkung einschließlich Schaden, Reichweite, Ziele oder Fläche und Auflösung festlegen. Kosten und Grenzen machen auch mächtige Kräfte berechenbar; gefährliche Wirkungen und mögliche Umgebungsfolgen dürfen dazugehören.';form.lastElementChild.insertBefore(powerHelp,form.lastElementChild.children[1]??null);
 list('Schwäche',['weaknesses'],{name:'',trigger:'',effect:'',mitigation:''});
 const vitals=section('LP und Verletzungen');field(vitals,['vitals','hp'],'Aktuelle LP','number');field(vitals,['vitals','maxHp'],'Maximale LP','number');field(vitals,['vitals','injuries'],'Verletzungen (optional)','textarea');
 list('Fähigkeitsressource (optional)',['vitals','resources'],{name:'',current:3,max:3,effect:'',cost:'',regeneration:''},['current','max']);
 const resourceHelp=document.createElement('p');resourceHelp.className='field-help';resourceHelp.textContent='Nur Punkte für Fähigkeiten, etwa Magie oder Fokus. Geld gehört unter Geld und Vermögen, Munition zur Ausrüstung. Ohne solche Fähigkeiten bleibt die Liste leer.';form.lastElementChild.insertBefore(resourceHelp,form.lastElementChild.children[1]??null);
 list('Ausrüstung',['inventory'],{name:'',quantity:1,slots:1,bonus:0,description:''},['quantity','slots','bonus']);
 const money=section('Geld und Vermögen');
 const moneyHelp=document.createElement('p');moneyHelp.className='field-help';moneyHelp.textContent='Geld hat keinen Maximalwert und regeneriert nicht. Kein Eintrag bedeutet unbekannt, nicht mittellos. Für einen bewussten Start ohne Geld 0 eintragen.';money.append(moneyHelp);
 list('Guthaben',['finances','funds'],{currency:'',amount:0},['amount']);
 money.append(form.lastElementChild);
 field(money,['finances','purchasingPower'],'Kaufkraft / Preisanker (optional)','textarea');
 field(money,['finances','assets'],'Weiteres Vermögen (optional)','textarea');
 const needHelp=section('Besondere Bedürfnisse (optional)');
 const hint=document.createElement('p');hint.className='field-help';hint.textContent='Normales Essen, Trinken und Schlafen muss hier nicht stehen. Besondere Bedürfnisse können rein beschreibend bleiben. Eine zusätzliche Mechanik braucht vor dem Spiel einen Auslöser, eine konkrete Wirkung und Versorgung / Erholung.';needHelp.append(hint);
 list('Besonderes Bedürfnis',['needs'],{name:'',description:'',mechanical:false,trigger:'',effect:'',care:''});
 needHelp.append(form.lastElementChild);
 const background=section('Hintergrund');for(const [key,label] of Object.entries({confirmed:'Bestätigte Fakten',open:'Bewusst offen',excluded:'Ausgeschlossene Zuschreibungen'})) field(background,['background',key],label,'textarea');
 if(doc.kind==='current') list('Entwicklung',['development'],{milestone:'',change:'',benefit:'',limits:''});
 $('#character-confirmed').checked=doc.confirmed;
 $('#character-title').textContent=doc.kind==='start'?'Startbogen bearbeiten':'Aktuellen Figurenbogen bearbeiten';
 $('#character-kind-help').textContent=doc.kind==='start'?'Start: Attribute −1 bis +3, Summe +5; zwei Talente, situative Schwäche, 10 LP und acht Tragplätze. Entwicklung entsteht im Spiel. Nach Bestätigung kannst du mit „Als aktuellen Bogen weiterführen“ erhaltene Verbesserungen dokumentieren.':'Aktueller Bogen: Attribute bis +5. Bereits erhaltene Entwicklung mit Nutzen dokumentieren, keinen Pflichtplan für künftige Steigerungen. Der ursprüngliche Startbogen bleibt unverändert; dies ist kein vollständiger Kampagnenspielstand.';
 $('#character-original-panel').hidden=doc.kind!=='current';
 $('#character-original').value=doc.startCharacter?characterText({...newCharacterDocument(),character:doc.startCharacter,confirmed:true}):'Ursprünglicher Startbogen nicht verfügbar; nicht erfinden.';
 update();
}
function update() {
 textRevision++;
 const errors=validateCharacterDocument(doc);
 reference.setDocument(doc);
 $('#character-errors').replaceChildren(...errors.map(message=>{const li=document.createElement('li');li.textContent=message;return li;}));
 for(const id of ['copy-character','download-character-text','download-character-json']) $('#'+id).disabled=errors.length>0;
 $('#character-continue').disabled=errors.length>0||doc.kind!=='start'||!doc.confirmed;
 $('#character-confirmed').disabled=errors.length>0;
 $('#character-status').textContent=errors.length?`${errors.length} Angaben bitte prüfen. Ausgabe erst nach gültigem Bogen.`:doc.confirmed?(worldLocked?'Bogen bestätigt. Er wird am Ende automatisch in die erste Chatnachricht übernommen.':'Bogen bestätigt. Für den Spielchat kopieren oder im Generator importieren.'):'Bogen formal gültig. Entwurf prüfen und vor dem Spielstart bestätigen.';
 $('#character-preview').value=errors.length?'':characterText(doc);
 $('#character-json').value=errors.length?'':serializeCharacter(doc);
 onChange(structuredClone(doc));
}
$('#character-confirmed').addEventListener('change',()=>{doc.confirmed=$('#character-confirmed').checked;update();});
$('#character-new').addEventListener('click',()=>{if(!window.confirm('Den bearbeiteten Bogen ersetzen? Sichere ihn vorher als JSON, wenn du ihn behalten möchtest.'))return;doc=newCharacterDocument();render();});
$('#character-continue').addEventListener('click',()=>{doc=continueCharacter(doc);render();});
function importText(text) {
 try {
  const next=parseCharacter(text);
  if(!window.confirm('Den bearbeiteten Bogen durch den geprüften Import ersetzen?'))return;
  doc=next;render();$('#import-status').textContent='Import erfolgreich. Angaben prüfen; importierte Entwürfe selbst bestätigen.';
 } catch(error) {$('#import-status').textContent=error.message;}
}
$('#import-character').addEventListener('click',()=>importText($('#character-import').value));
$('#character-file').addEventListener('change',async()=>{
 const file=$('#character-file').files[0];if(!file)return;
 if(file.size>1000000){$('#import-status').textContent='Bitte eine JSON-Datei bis 1 MB verwenden.';return;}
 try {importText(await file.text());}catch{$('#import-status').textContent='Datei konnte nicht gelesen werden. Bisheriger Bogen bleibt erhalten.';}
 $('#character-file').value='';
});
async function copy(field) {
 const value=field.value,revision=textRevision;
 try {if(!navigator.clipboard?.writeText)throw new Error();await navigator.clipboard.writeText(value);if(revision===textRevision)$('#character-status').textContent='Kopiert.';}
 catch {if(revision!==textRevision)return;field.focus();field.select();$('#character-status').textContent='Bitte den markierten Text manuell kopieren.';}
}
$('#copy-character').addEventListener('click',()=>copy($('#character-preview')));
$('#copy-template').addEventListener('click',()=>copy($('#character-template')));
function download(text,name,type) {
 const url=URL.createObjectURL(new Blob([text],{type})),link=document.createElement('a');link.href=url;link.download=name;document.body.append(link);link.click();link.remove();setTimeout(()=>URL.revokeObjectURL(url),1000);
}
$('#download-character-json').addEventListener('click',()=>{if(!validateCharacterDocument(doc).length)download(serializeCharacter(doc),'charakterbogen.json','application/json');});
$('#download-character-text').addEventListener('click',()=>{if(!validateCharacterDocument(doc).length)download(characterText(doc),'charakterbogen.md','text/markdown;charset=utf-8');});
function template() {textRevision++;$('#character-template').value=characterTemplate($('#character-idea').value,$('#character-world').value);}
for(const id of ['character-idea','character-world']) $('#'+id).addEventListener('input',template);
$('#character-world').value=world;
$('#character-world').readOnly=worldLocked;
if(worldLocked) $('#character-world').setAttribute('aria-label','Weltvorgaben aus dem Abenteuerprofil (automatisch übernommen)');
template();render();
return {
 getDocument:()=>structuredClone(doc),
 setWorld(value) {
  if($('#character-world').value===value)return;
  $('#character-world').value=value;template();
  doc.confirmed=false;$('#character-confirmed').checked=false;update();
 }
};
}
