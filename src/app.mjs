import { groups, defaults, buildPrompt, LIMIT } from './generator.mjs';
const form = document.querySelector('#options');
const output = document.querySelector('#prompt');
const copy = document.querySelector('#copy');
const status = document.querySelector('#status');
const reset = document.querySelector('#reset');
let revision = 0;
for (const group of groups) {
  const field = document.createElement('fieldset');
  const legend = document.createElement('legend');
  legend.textContent = group.label;
  field.append(legend);
  const row = document.createElement('div'); row.className = 'choices';
  for (const option of group.options) {
    const label = document.createElement('label'); label.className = 'choice';
    const input = document.createElement('input');
    input.type = 'radio'; input.name = group.id; input.value = option.id;
    input.checked = defaults[group.id] === option.id;
    const span = document.createElement('span'); span.textContent = option.label;
    label.append(input, span); row.append(label);
  }
  field.append(row); form.append(field);
}
function update() {
  revision++;
  try {
    const prompt = buildPrompt(Object.fromEntries(new FormData(form)));
    output.value = prompt;
    document.querySelector('#count').textContent = prompt.length.toLocaleString('de-DE');
    document.querySelector('#remaining').textContent = `${LIMIT - prompt.length} Zeichen frei`;
    document.querySelector('#meter').value = prompt.length;
    copy.disabled = false;
    status.textContent = 'Bereit für deine Projektanweisungen.';
  } catch (error) {
    output.value = ''; copy.disabled = true;
    document.querySelector('#count').textContent = '–';
    document.querySelector('#remaining').textContent = 'Bitte Module prüfen';
    document.querySelector('#meter').value = 0;
    status.textContent = error.message;
  }
}
form.addEventListener('change', update);
reset.disabled = false;
reset.addEventListener('click', () => {
  for (const input of form.querySelectorAll('input')) input.checked = defaults[input.name] === input.value;
  update();
});
copy.addEventListener('click', async () => {
  const current = revision, text = output.value;
  if (!text || text.length >= LIMIT) return;
  try {
    if (!navigator.clipboard?.writeText) throw new Error('Clipboard unavailable');
    await navigator.clipboard.writeText(text);
    if (revision === current) status.textContent = 'Kopiert. Jetzt in die Projektanweisungen einfügen.';
  } catch {
    output.focus(); output.select(); output.setSelectionRange(0, output.value.length);
    status.textContent = 'Bitte den markierten Text über das Kopiermenü deines Geräts kopieren.';
  }
});
update();
