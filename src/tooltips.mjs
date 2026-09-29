// One shared overlay: never participates in the form's layout.
const tip = document.createElement('div');
tip.id = 'option-tooltip';
tip.className = 'tooltip';
tip.role = 'tooltip';
tip.hidden = true;
document.body.append(tip);
let active = null;
let timer;
function close() {
  clearTimeout(timer);
  if (active) { active.removeAttribute('aria-describedby'); active.setAttribute('aria-expanded', 'false'); }
  active = null;
  tip.hidden = true;
}
function show(button, text) {
  close();
  active = button;
  tip.textContent = text;
  tip.hidden = false;
  button.setAttribute('aria-describedby', tip.id);
  button.setAttribute('aria-expanded', 'true');
  const anchor = button.getBoundingClientRect();
  const box = tip.getBoundingClientRect();
  tip.style.left = `${Math.max(8, Math.min(anchor.left, window.innerWidth - box.width - 8))}px`;
  const below = anchor.bottom + 8;
  tip.style.top = `${Math.max(8, below + box.height <= window.innerHeight - 8 ? below : anchor.top - box.height - 8)}px`;
}
function deferClose() { clearTimeout(timer); timer = setTimeout(close, 160); }
tip.addEventListener('pointerenter', () => clearTimeout(timer));
tip.addEventListener('pointerleave', deferClose);
document.addEventListener('pointerdown', e => { if (active && !active.contains(e.target) && !tip.contains(e.target)) close(); });
document.addEventListener('keydown', e => { if (e.key === 'Escape') close(); });
window.addEventListener('resize', close);
window.addEventListener('scroll', close, true);
export function infoButton(option) {
  const button = document.createElement('button');
  button.type = 'button'; button.className = 'info'; button.textContent = 'i';
  button.setAttribute('aria-label', `Info: ${option.label}`);
  button.setAttribute('aria-expanded', 'false');
  button.addEventListener('pointerenter', e => { if (e.pointerType === 'mouse') show(button, option.tooltip); });
  button.addEventListener('pointerleave', e => { if (e.pointerType === 'mouse') deferClose(); });
  button.addEventListener('focus', () => { if (button.matches(':focus-visible')) show(button, option.tooltip); });
  button.addEventListener('blur', close);
  button.addEventListener('click', e => {
    if (active === button && !button.matches(':hover')) close();
    else if (active === button && e.pointerType === 'touch') close();
    else show(button, option.tooltip);
  });
  return button;
}
