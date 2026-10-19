import { mountCharacterEditor } from './character-editor.mjs';
import { focuses } from './profile.mjs';
import { infoButton } from './tooltips.mjs';
import { groups, dice, defaults, LIMIT } from './generator.mjs';
import { buildOutput, outputModes, PLUGIN, worldForCharacter } from './outputs.mjs';
const form = document.querySelector('#options');
const output = document.querySelector('#prompt');
const copy = document.querySelector('#copy');
const status = document.querySelector('#status');
const reset = document.querySelector('#reset');
const modes = document.querySelector('#output-modes');
const startMessage = document.querySelector('#start-message');
const copyStart = document.querySelector('#copy-start');
const startStatus = document.querySelector('#start-status');
const download = document.querySelector('#download');
let currentOutput = null;
let revision = 0;
let editor=null, characterDoc=null, mounting=false;
const source=document.querySelector('#character-source');

for (const [index, mode] of outputModes.entries()) {
 const label = document.createElement('label'); label.className = 'choice';
 const input = document.createElement('input'); input.type = 'radio'; input.name = 'output-mode'; input.value = mode.id; input.checked = index === 0;
 const span = document.createElement('span'); span.textContent = mode.label;
 label.append(input, span); document.querySelector('#mode-choices').append(label);
}
document.querySelector('#plugin-link').href = PLUGIN.url;
document.querySelector('#plugin-name').textContent = PLUGIN.name;
document.querySelector('#plugin-version').textContent = PLUGIN.version;
const selectedMode = () => modes.querySelector('input:checked').value;
function addChoices(group, multi=false) {
 const field=document.createElement('fieldset');field.dataset.group=group.id;
 const legend=document.createElement('legend');legend.textContent=group.label;field.append(legend);
 const row=document.createElement('div');row.className='choices';
 for(const option of group.options) {
  const wrap=document.createElement('div');wrap.className='option-wrap';
  const label=document.createElement('label');label.className='choice';
  const input=document.createElement('input');input.type=multi?'checkbox':'radio';input.name=group.id;input.value=option.id;
  input.checked=!multi && defaults[group.id]===option.id;
  const span=document.createElement('span');span.textContent=option.label;
  label.append(input,span);
  const help=infoButton(option);
  wrap.append(label,help);row.append(wrap);
 }
 field.append(row);form.append(field);
}
for(const group of groups) {
 addChoices(group);
 if(group.id==='setting') {
  const field=document.createElement('div'); field.className='text-option';
  field.innerHTML='<label id="world-label" for="world-description">Welt ergänzen (optional)</label><p id="world-help">Besondere Orte, Magie, Technik oder Kulturen. Ein kurzer Satz genügt.</p><textarea id="world-description" name="worldDescription" aria-describedby="world-help" rows="3"></textarea>';
  form.append(field);
 }
 if(group.id==='continuation') {
  addChoices({id:'focus',label:'Spielschwerpunkte · optional, höchstens zwei',options:focuses.map(f=>({...f,tooltip:f.tooltip}))},true);
  const field=document.createElement('div'); field.className='text-option';
  field.innerHTML='<label for="wishes">Eigene Vorgaben und Ausschlüsse (optional)</label><p id="wishes-help">Zum Beispiel: keine verlorene Erinnerung als Aufhänger. Weltangaben gehören in die Weltbeschreibung.</p><textarea id="wishes" name="wishes" aria-describedby="wishes-help" rows="3"></textarea>';
  form.append(field);
 }
}
addChoices({id:'extras',label:'Zusatzwürfel · D20 bleibt gesetzt',options:dice},true);
function update() {
  revision++;
  const plugin = selectedMode() === 'plugin';
  const prepared=source.querySelector('input:checked').value==='prepared';
  document.querySelector('#prepared-character').hidden=!prepared;
  form.querySelector('[data-group=creation]').hidden=prepared;
  const custom=form.querySelector('input[name=setting]:checked').value==='custom';
  document.querySelector('#world-label').textContent=custom?'Eigene Welt beschreiben (erforderlich)':'Welt ergänzen (optional)';
  document.querySelector('#world-description').required=custom;
  const focusCount=form.querySelectorAll('input[name=focus]:checked').length;
  for(const input of form.querySelectorAll('input[name=focus]')) input.disabled=focusCount>=2 && !input.checked;
  document.querySelector('.output').classList.toggle('is-plugin', plugin);
  for (const id of ['plugin-guide','plugin-step']) document.getElementById(id).hidden = !plugin;
  document.querySelector('#output-name').textContent = plugin ? 'Dein Plugin-Startpaket' : 'Dein Projektprompt';
  document.querySelector('#project-label').textContent = '1 · Projektanweisungen';
  document.querySelector('#mode-help').textContent = plugin
    ? 'Die ausführlichen Regeln liefert das Plugin. Deine Auswahl steht in der separaten Startnachricht.'
    : 'Der kompakte Prompt enthält das eigenständige Regelwerk. Bei Platzmangel folgt das vollständige Profil als erste Chatnachricht.';
  copy.textContent = 'Schritt 1 kopieren';
  try {
    const data = new FormData(form);
    const config={...Object.fromEntries(data), extras:data.getAll('extras'), focus:data.getAll('focus'), characterSource:prepared?'prepared':'chat'};
    const world=worldForCharacter(config);
    if(prepared && !editor) {
      mounting=true;
      editor=mountCharacterEditor(document.querySelector('#character-editor'), {world,worldLocked:true,onChange:doc=>{characterDoc=doc;if(!mounting)update();}});
      mounting=false;
    }
    if(editor) {editor.setWorld(world);characterDoc=editor.getDocument();}
    currentOutput = buildOutput(config, selectedMode(), prepared?characterDoc:null);
    const hasStart=!!currentOutput.startMessage;
    document.querySelector('.output').classList.toggle('is-plugin', plugin || hasStart);
    document.querySelector('#plugin-starter').hidden=!hasStart;
    document.querySelector('#start-label').textContent='2 · Erste Chatnachricht';
    document.querySelector('#starter-help').textContent=prepared?'Profil und bestätigter Charakterbogen sind vollständig enthalten. Sende nur diese gemeinsame Nachricht im Spielchat.':'Diese Nachricht enthält dein vollständiges Abenteuerprofil. Die Figur wird anschließend im Spielchat erstellt.';
    document.querySelector('#download-row').hidden=false;
    const prompt = currentOutput.projectInstructions;
    output.value = prompt;
    startMessage.value = currentOutput.startMessage;
    document.querySelector('#count').textContent = prompt.length.toLocaleString('de-DE');
    document.querySelector('#remaining').textContent = `${LIMIT - prompt.length} Zeichen frei`;
    document.querySelector('#meter').value = prompt.length;
    copy.disabled = false;
    copyStart.disabled = !hasStart; download.disabled = false;
    status.textContent = 'Schritt 1 gehört in die Projektanweisungen, nicht in den Spielchat.';
    startStatus.textContent = prepared?'Der bestätigte Bogen ist enthalten; nicht zusätzlich senden.':'Schritt 2 gehört in den Spielchat. Kein 8.000-Zeichen-Limit.';
  } catch (error) {
    document.querySelector('#plugin-starter').hidden=true;
    currentOutput = null;
    output.value = startMessage.value = ''; copy.disabled = copyStart.disabled = download.disabled = true;
    document.querySelector('#count').textContent = '–';
    document.querySelector('#remaining').textContent = 'Bitte Eingaben prüfen';
    document.querySelector('#meter').value = 0;
    status.textContent = error.message;
  }
}
modes.addEventListener('change', update);
source.addEventListener('change', update);
form.addEventListener('input', event => { if(event.target.matches('textarea')) update(); });
form.addEventListener('change', event => {
 const percent=form.querySelector('input[value="dpercent"]');
 const ten=form.querySelector('input[value="d10"]');
 if(event.target.name==='focus') {
  const chosen=form.querySelectorAll('input[name=focus]:checked');
  if(chosen.length>2) event.target.checked=false;
 }
 if(event.target===percent && percent.checked)ten.checked=true;
 if(event.target===ten && !ten.checked)percent.checked=false;
 update();
});
reset.disabled = false;
reset.addEventListener('click', () => {
  for (const input of form.querySelectorAll('input')) input.checked = defaults[input.name] === input.value;
  for(const field of form.querySelectorAll('textarea')) field.value='';
  update();
});
function enableCopy(button, field, feedback, success) {
 button.addEventListener('click', async () => {
   const current = revision, text = field.value;
   if (button.disabled || !text) return;
   try {
     if (!navigator.clipboard?.writeText) throw new Error('Clipboard unavailable');
     await navigator.clipboard.writeText(text);
     if (revision === current) feedback.textContent = success;
   } catch {
     if (revision !== current) return;
     field.focus(); field.select(); field.setSelectionRange(0, field.value.length);
     feedback.textContent = 'Bitte den markierten Text über das Kopiermenü deines Geräts kopieren.';
   }
 });
}
enableCopy(copy, output, status, 'Kopiert. Jetzt in die Projektanweisungen einfügen.');
enableCopy(copyStart, startMessage, startStatus, 'Kopiert. Als erste Nachricht im Spielchat senden.');
download.addEventListener('click', () => {
 if (!currentOutput?.downloadText) return;
 const url = URL.createObjectURL(new Blob([currentOutput.downloadText], {type:'text/markdown;charset=utf-8'}));
 const link = document.createElement('a'); link.href = url; link.download = currentOutput.downloadName;
 document.body.append(link); link.click(); link.remove();
 setTimeout(() => URL.revokeObjectURL(url), 1000);
});
update();
