import {validateCharacterDocument, attributeLabels} from './character.mjs';
import {openPlayTab} from './play-state.mjs';

// Read the actual sheet. Free-text effects are retained, never interpreted as new rules.
export function characterReference(doc) {
 const errors=validateCharacterDocument(doc);
 if(errors.length)throw new Error('Charakterübersicht benötigt einen gültigen Bogen.');
 const c=doc.character,slots=c.inventory.reduce((n,item)=>n+item.quantity*item.slots,0);
 const entries=(rows,format)=>rows.length?rows.map(format).join('\n\n'):'Keine eingetragen.';
 return [
  `# ${c.identity.name} · Spielübersicht`,
  `${doc.kind==='start'?'Startbogen':'Aktueller Bogen'} · ${doc.confirmed?'bestätigt':'Entwurf, noch nicht bestätigt'}`,
  'Statischer Stand aus dem Editor. Änderungen im Spielchat werden hier nicht automatisch übernommen. Diese Übersicht ersetzt weder den vollständigen Bogen noch einen Spielstand.',
  `## Werte\n\nLP: ${c.vitals.hp}/${c.vitals.maxHp} · Gepäck: ${slots}/8\n`+
  Object.entries(attributeLabels).map(([key,label])=>`${label}: ${c.attributes[key]>=0?'+':''}${c.attributes[key]}`).join(' · '),
  `Grundverteidigung: 10 + Geschick (${c.attributes.dexterity>=0?'+':''}${c.attributes.dexterity}) = ${10+c.attributes.dexterity}, vor Rüstung. Passende Rüstung gibt +1; siehe ihre Beschreibung unten. Weitere vereinbarte Effekte beachten.`,
  'Probe/Angriff: W20 + passendes Attribut + höchstens ein Talent + höchstens ein Ausrüstungsbonus. Angriffe treffen ab gegnerischer Verteidigung einschließlich Gleichstand. Fähigkeiten können ausdrücklich eine andere Auflösung festlegen.',
  '## Talente\n\n'+entries(c.talents,t=>`${t.name} (+${t.bonus}, nicht stapelbar): ${t.description}`),
  '## Fähigkeiten\n\n'+entries(c.abilities,a=>`${a.name}\nWirkung: ${a.effect}\nKosten: ${a.cost}\nGrenzen: ${a.limits}`),
  '## Ressourcen\n\n'+entries(c.vitals.resources,r=>`${r.name}: ${r.current}/${r.max}\nWirkung: ${r.effect}\nVerbrauch: ${r.cost}\nRegeneration: ${r.regeneration}`),
  '## Schwächen und Verletzungen\n\n'+entries(c.weaknesses,w=>`${w.name}\nAuslöser: ${w.trigger}\nWirkung: ${w.effect}\nAbmilderung: ${w.mitigation||'Nicht festgelegt.'}`)+`\n\nVerletzungen: ${c.vitals.injuries||'Keine eingetragen.'}`,
  '## Ausrüstung\n\n'+entries(c.inventory,i=>`${i.name} ×${i.quantity} · ${i.slots} Plätze je Stück · Probenbonus +${i.bonus}\n${i.description}`),
  '## Geld\n\n'+entries(c.finances.funds,f=>`${f.amount} ${f.currency}`)+(c.finances.purchasingPower?'\n\n'+c.finances.purchasingPower:'')+(c.finances.assets?'\n\nWeiteres Vermögen: '+c.finances.assets:''),
  '## Entwicklung und Errungenschaften\n\n'+entries(c.development,d=>`${d.milestone}: ${d.change}\nNutzen: ${d.benefit}\nGrenzen: ${d.limits||'Nicht festgelegt.'}`),
  ...(c.needs?.length?['## Besondere Bedürfnisse\n\n'+entries(c.needs,n=>`${n.name}: ${n.description}`+(n.mechanical?`\nAuslöser: ${n.trigger}\nWirkung: ${n.effect}\nVersorgung: ${n.care}`:''))]:[]),
 ].join('\n\n');
}

export function mountCharacterReference(root) {
 root.innerHTML='<details class="character-panel"><summary>Charakterübersicht für das Spielen</summary><p>Fähigkeiten, Kosten, Werte und Ausrüstung separat bereithalten. Kein automatischer Abgleich mit dem Spielchat.</p><textarea readonly rows="14" aria-label="Charakterübersicht"></textarea><div class="character-actions"><button type="button" class="primary" data-action="open">Im Spieltab öffnen</button><button type="button" class="quiet" data-action="copy">Übersicht kopieren</button><button type="button" class="quiet" data-action="download">Übersicht herunterladen (.md)</button><button type="button" class="quiet" data-action="print">Übersicht drucken</button></div><p role="status" aria-live="polite"></p></details>';
 const field=root.querySelector('textarea'),status=root.querySelector('[role=status]');let revision=0,currentDocument=null;
 root.hidden=true;
 root.querySelector('[data-action=open]').addEventListener('click',()=>{
  if(!currentDocument)return;
  try{openPlayTab(currentDocument);status.textContent='Spieltab geöffnet. Änderungen dort werden unabhängig gepflegt.';}
  catch(error){status.textContent=error.message;}
 });
 root.querySelector('[data-action=copy]').addEventListener('click',async()=>{
  const text=field.value,current=revision;if(!text)return;
  try {if(!navigator.clipboard?.writeText)throw new Error();await navigator.clipboard.writeText(text);if(current===revision)status.textContent='Übersicht kopiert.';}
  catch {if(current!==revision)return;field.focus();field.select();status.textContent='Bitte den markierten Text manuell kopieren.';}
 });
 root.querySelector('[data-action=download]').addEventListener('click',()=>{
  if(!field.value)return;
  const url=URL.createObjectURL(new Blob([field.value],{type:'text/markdown;charset=utf-8'})),a=document.createElement('a');
  a.href=url;a.download='charakter-spieluebersicht.md';document.body.append(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(url),1000);
 });
 root.querySelector('[data-action=print]').addEventListener('click',()=>{
  if(!field.value)return;
  const preview=window.open('about:blank','_blank');
  if(!preview){status.textContent='Druckfenster blockiert. Übersicht herunterladen oder Pop-up erlauben.';return;}
  preview.opener=null;preview.document.title='Charakterübersicht';
  const pre=preview.document.createElement('pre'),style=preview.document.createElement('style');
  pre.textContent=field.value;style.textContent='body{margin:20mm;font:12pt/1.45 sans-serif}pre{white-space:pre-wrap;overflow-wrap:anywhere;font:inherit}@page{margin:15mm}';
  preview.document.head.append(style);preview.document.body.replaceChildren(pre);preview.focus();preview.print();
 });
 return {setDocument(doc){revision++;status.textContent='';
  if(!doc||validateCharacterDocument(doc).length){currentDocument=null;field.value='';root.hidden=true;return;}
  currentDocument=structuredClone(doc);
  field.value=characterReference(doc);root.hidden=false;
 }};
}
