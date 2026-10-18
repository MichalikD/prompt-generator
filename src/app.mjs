import { infoButton } from './tooltips.mjs';
import { groups, dice, defaults, LIMIT } from './generator.mjs';
import { buildOutput, outputModes, PLUGIN } from './outputs.mjs';
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

for (const [index, mode] of outputModes.entries()) {
 const label = document.createElement('label'); label.className = 'choice';
 const input = document.createElement('input'); input.type = 'radio'; input.name = 'output-mode'; input.value = mode.id; input.checked = index === 0;
 const span = document.createElement('span'); span.textContent = mode.label;
 label.append(input, span); document.querySelector('#mode-choices').append(label);
}
document.querySelector('#plugin-link').href = PLUGIN.url;
const selectedMode = () => modes.querySelector('input:checked').value;
function addChoices(group, multi=false) {
 const field=document.createElement('fieldset');
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
for(const group of groups)addChoices(group);
addChoices({id:'extras',label:'Zusatzwürfel · D20 bleibt gesetzt',options:dice},true);
function update() {
  revision++;
  const plugin = selectedMode() === 'plugin';
  document.querySelector('.output').classList.toggle('is-plugin', plugin);
  for (const id of ['plugin-guide', 'plugin-starter']) document.getElementById(id).hidden = !plugin;
  document.querySelector('#output-name').textContent = plugin ? 'Dein Plugin-Startpaket' : 'Dein Projektprompt';
  document.querySelector('#project-label').textContent = plugin ? 'Projektanweisungen' : 'Projektprompt';
  document.querySelector('#mode-help').textContent = plugin
    ? 'Die ausführlichen Regeln liefert das Plugin. Deine Auswahl steht in der separaten Startnachricht.'
    : 'Der kompakte Prompt enthält das vollständige bisherige Regelwerk. Du benötigst kein Plugin.';
  copy.textContent = plugin ? 'Projektanweisungen kopieren' : 'Prompt kopieren ↗';
  try {
    const data = new FormData(form);
    currentOutput = buildOutput({...Object.fromEntries(data), extras:data.getAll('extras')}, selectedMode());
    const prompt = currentOutput.projectInstructions;
    output.value = prompt;
    startMessage.value = currentOutput.startMessage;
    document.querySelector('#count').textContent = prompt.length.toLocaleString('de-DE');
    document.querySelector('#remaining').textContent = `${LIMIT - prompt.length} Zeichen frei`;
    document.querySelector('#meter').value = prompt.length;
    copy.disabled = false;
    copyStart.disabled = download.disabled = !plugin;
    status.textContent = plugin ? 'Diese Anweisungen gehören in dein neues Projekt.' : 'Bereit für deine Projektanweisungen.';
    startStatus.textContent = 'Die Startnachricht hat kein Projektanweisungs-Limit.';
  } catch (error) {
    currentOutput = null;
    output.value = startMessage.value = ''; copy.disabled = copyStart.disabled = download.disabled = true;
    document.querySelector('#count').textContent = '–';
    document.querySelector('#remaining').textContent = 'Bitte Module prüfen';
    document.querySelector('#meter').value = 0;
    status.textContent = error.message;
  }
}
modes.addEventListener('change', update);
form.addEventListener('change', event => {
 const percent=form.querySelector('input[value="dpercent"]');
 const ten=form.querySelector('input[value="d10"]');
 if(event.target===percent && percent.checked)ten.checked=true;
 if(event.target===ten && !ten.checked)percent.checked=false;
 update();
});
reset.disabled = false;
reset.addEventListener('click', () => {
  for (const input of form.querySelectorAll('input')) input.checked = defaults[input.name] === input.value;
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
enableCopy(copyStart, startMessage, startStatus, 'Kopiert. Plugin im ersten Spielchat auswählen und die Startnachricht dort senden.');
download.addEventListener('click', () => {
 if (!currentOutput?.downloadText || selectedMode() !== 'plugin') return;
 const url = URL.createObjectURL(new Blob([currentOutput.downloadText], {type:'text/markdown;charset=utf-8'}));
 const link = document.createElement('a'); link.href = url; link.download = currentOutput.downloadName;
 document.body.append(link); link.click(); link.remove();
 setTimeout(() => URL.revokeObjectURL(url), 1000);
});
update();
