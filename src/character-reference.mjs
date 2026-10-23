import {validateCharacterDocument, attributeLabels, abilityRange} from './character.mjs';

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
  '## Fähigkeiten\n\n'+entries(c.abilities,a=>`${a.name}\nReichweite: ${abilityRange(a)}\nZiele / Fläche: ${a.targets??'Siehe Wirkung / Grenzen'}\nSchaden: ${a.damage??'Siehe Wirkung / Grenzen'}\nWirkung: ${a.effect}\nKosten: ${a.cost}\nGrenzen: ${a.limits}`),
  '## Ressourcen\n\n'+entries(c.vitals.resources,r=>`${r.name}: ${r.current}/${r.max}\nWirkung: ${r.effect}\nVerbrauch: ${r.cost}\nRegeneration: ${r.regeneration}`),
  '## Schwächen und Verletzungen\n\n'+entries(c.weaknesses,w=>`${w.name}\nAuslöser: ${w.trigger}\nWirkung: ${w.effect}\nAbmilderung: ${w.mitigation||'Nicht festgelegt.'}`)+`\n\nVerletzungen: ${c.vitals.injuries||'Keine eingetragen.'}`,
  '## Ausrüstung\n\n'+entries(c.inventory,i=>`${i.name} ×${i.quantity} · ${i.slots} Plätze je Stück · Probenbonus +${i.bonus}\n${i.description}`),
  '## Geld\n\n'+entries(c.finances.funds,f=>`${f.amount} ${f.currency}`)+(c.finances.purchasingPower?'\n\n'+c.finances.purchasingPower:'')+(c.finances.assets?'\n\nWeiteres Vermögen: '+c.finances.assets:''),
  '## Entwicklung und Errungenschaften\n\n'+entries(c.development,d=>`${d.milestone}: ${d.change}\nNutzen: ${d.benefit}\nGrenzen: ${d.limits||'Nicht festgelegt.'}`),
  ...(c.needs?.length?['## Besondere Bedürfnisse\n\n'+entries(c.needs,n=>`${n.name}: ${n.description}`+(n.mechanical?`\nAuslöser: ${n.trigger}\nWirkung: ${n.effect}\nVersorgung: ${n.care}`:''))]:[]),
 ].join('\n\n');
}
