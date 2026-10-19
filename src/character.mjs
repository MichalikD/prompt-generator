export const CHARACTER_VERSION = 1;
export const attributeLabels = {kraft:'Kraft', geschick:'Geschick', verstand:'Verstand', gespuer:'Gespür'};
export function emptyCharacter() {
 return {
  identity:{name:'',pronouns:'',ancestry:'',origin:'',role:'',description:''},
  attributes:{kraft:0,geschick:3,verstand:2,gespuer:0},
  talents:[{name:'',description:'',bonus:2},{name:'',description:'',bonus:2}],
  abilities:[], weaknesses:[],
  vitals:{hp:10,maxHp:10,resources:[],injuries:''},
  inventory:[], nourishment:'',
  background:{confirmed:'',open:'',excluded:''}, development:[],
 };
}
export function newCharacterDocument() {
 return {format:'freie-spielleitung-character',version:CHARACTER_VERSION,kind:'start',confirmed:false,character:emptyCharacter(),startCharacter:null};
}
function isObject(v) { return v!==null && typeof v==='object' && !Array.isArray(v); }
function keys(value, allowed, path, errors) {
 if(!isObject(value)) { errors.push(`${path}: Objekt erwartet.`); return false; }
 for(const key of Object.keys(value)) if(!allowed.includes(key)) errors.push(`${path}: Unbekanntes Feld „${key}“; Import ohne Datenverlust nicht möglich.`);
 return true;
}
function string(v,path,errors,required=false) {
 if(typeof v!=='string') errors.push(`${path}: Text erwartet.`);
 else if(required && !v.trim()) errors.push(`${path}: Bitte ausfüllen.`);
}
function number(v,path,errors,min,max) {
 if(!Number.isInteger(v)||v<min||v>max) errors.push(`${path}: Ganze Zahl von ${min} bis ${max} erwartet.`);
}
function rows(v,fields,path,errors,check) {
 if(!Array.isArray(v)) { errors.push(`${path}: Liste erwartet.`); return; }
 v.forEach((r,i)=>{if(keys(r,fields,`${path} ${i+1}`,errors)) check(r,`${path} ${i+1}`);});
}
function checkCharacter(c,kind,path,errors) {
 if(!keys(c,['identity','attributes','talents','abilities','weaknesses','vitals','inventory','nourishment','background','development'],path,errors)) return;
 if(keys(c.identity,['name','pronouns','ancestry','origin','role','description'],`${path} · Identität`,errors)) {
  for(const field of ['name','pronouns','ancestry','origin','role','description']) string(c.identity[field],`${path} · ${field}`,errors,['name','description'].includes(field));
 }
 if(keys(c.attributes,Object.keys(attributeLabels),`${path} · Attribute`,errors)) {
  for(const [key,label] of Object.entries(attributeLabels)) number(c.attributes[key],`${path} · ${label}`,errors,-1,kind==='start'?3:5);
  if(kind==='start' && Object.values(c.attributes).reduce((sum,n)=>sum+n,0)!==5) errors.push(`${path}: Startattribute müssen zusammen +5 ergeben.`);
 }
 rows(c.talents,['name','description','bonus'],`${path} · Talent`,errors,(r,p)=>{string(r.name,p+' · Name',errors,true);string(r.description,p+' · Beschreibung',errors,true);number(r.bonus,p+' · Bonus',errors,2,2);});
 if(kind==='start' && Array.isArray(c.talents) && c.talents.length!==2) errors.push(`${path}: Genau zwei Starttalente sind erforderlich.`);
 rows(c.abilities,['name','effect','cost','limits'],`${path} · Fähigkeit`,errors,(r,p)=>{for(const f of ['name','effect','cost','limits']) string(r[f],p+' · '+f,errors,true);});
 rows(c.weaknesses,['name','trigger','effect','mitigation'],`${path} · Schwäche`,errors,(r,p)=>{for(const f of ['name','trigger','effect','mitigation']) string(r[f],p+' · '+f,errors,f!=='mitigation');});
 if(kind==='start' && Array.isArray(c.weaknesses) && !c.weaknesses.length) errors.push(`${path}: Mindestens eine situative Schwäche ist erforderlich.`);
 if(keys(c.vitals,['hp','maxHp','resources','injuries'],`${path} · Zustand`,errors)) {
  number(c.vitals.maxHp,path+' · Maximale LP',errors,1,1000000);
  number(c.vitals.hp,path+' · LP',errors,0,c.vitals.maxHp);
  if(kind==='start' && (c.vitals.hp!==10||c.vitals.maxHp!==10)) errors.push(`${path}: Startfigur beginnt mit 10/10 LP.`);
  string(c.vitals.injuries,path+' · Verletzungen',errors);
  rows(c.vitals.resources,['name','current','max','effect','cost','regeneration'],`${path} · Ressource`,errors,(r,p)=>{
   string(r.name,p+' · Name',errors,true);number(r.max,p+' · Maximum',errors,1,1000000);number(r.current,p+' · Aktuell',errors,0,r.max);
   for(const f of ['effect','cost','regeneration']) string(r[f],p+' · '+f,errors,true);
  });
 }
 rows(c.inventory,['name','quantity','slots','bonus','description'],`${path} · Ausrüstung`,errors,(r,p)=>{string(r.name,p+' · Name',errors,true);string(r.description,p+' · Funktion',errors,true);number(r.quantity,p+' · Anzahl',errors,1,1000000);number(r.slots,p+' · Plätze pro Einheit',errors,0,1000000);number(r.bonus,p+' · Bonus',errors,0,2);});
 if(Array.isArray(c.inventory)) {
  const used=c.inventory.reduce((sum,r)=>sum+(isObject(r)?r.quantity*r.slots:0),0);
  if(used>8) errors.push(`${path}: ${used} Tragplätze belegt; maximal acht. Extern gelagerte Gegenstände nicht als getragen eintragen.`);
 }
 string(c.nourishment,path+' · Nahrung und Bedürfnisse',errors);
 if(keys(c.background,['confirmed','open','excluded'],`${path} · Hintergrund`,errors)) for(const f of ['confirmed','open','excluded']) string(c.background[f],path+' · Hintergrund '+f,errors);
 rows(c.development,['milestone','change','benefit','limits'],`${path} · Entwicklung`,errors,(r,p)=>{for(const f of ['milestone','change','benefit','limits']) string(r[f],p+' · '+f,errors,['milestone','change','benefit'].includes(f));});
 if(kind==='start' && Array.isArray(c.development) && c.development.length) errors.push(`${path}: Entwicklung gehört in den aktuellen Bogen; der Startbogen bleibt der Ausgangspunkt.`);
}
export function validateCharacterDocument(doc) {
 const errors=[];
 if(!keys(doc,['format','version','kind','confirmed','character','startCharacter'],'Figurenbogen',errors)) return errors;
 if(doc.format!=='freie-spielleitung-character'||doc.version!==CHARACTER_VERSION) errors.push('Unbekanntes Figurenformat oder nicht unterstützte Version.');
 if(!['start','current'].includes(doc.kind)) errors.push('Bogenart muss start oder current sein.');
 if(typeof doc.confirmed!=='boolean') errors.push('Bestätigung muss true oder false sein.');
 checkCharacter(doc.character,doc.kind,'Figur',errors);
 if(doc.kind==='start' && doc.startCharacter!==null) errors.push('Ein Startdokument hat keinen separaten ursprünglichen Startbogen.');
 if(doc.kind==='current' && doc.startCharacter!==null) checkCharacter(doc.startCharacter,'start','Ursprünglicher Startbogen',errors);
 if(!errors.length && new TextEncoder().encode(JSON.stringify(doc,null,2)).byteLength>1000000) errors.push('Bogen zu groß: maximal 1 MB für einen wieder importierbaren JSON-Export.');
 return errors;
}
export function serializeCharacter(doc) {
 const errors=validateCharacterDocument(doc);
 if(errors.length) throw new Error(errors.join('\n'));
 return JSON.stringify(doc,null,2);
}
export function continueCharacter(doc) {
 const errors=validateCharacterDocument(doc);if(errors.length) throw new Error(errors.join('\n'));
 if(doc.kind==='current') return structuredClone(doc);
 if(!doc.confirmed) throw new Error('Bitte den Startbogen vor der Weiterentwicklung bestätigen.');
 return {...structuredClone(doc),kind:'current',confirmed:false,startCharacter:structuredClone(doc.character)};
}
export function parseCharacter(text) {
 if(typeof text!=='string'||new TextEncoder().encode(text).byteLength>1000000) throw new Error('Bitte eine JSON-Datei bis 1 MB verwenden.');
 let doc;try{doc=JSON.parse(text);}catch{throw new Error('Ungültiges JSON. Der bisherige Bogen bleibt erhalten.');}
 const errors=validateCharacterDocument(doc);
 if(errors.length) throw new Error(errors.join('\n'));
 return doc;
}
export function characterText(doc) {
 const errors=validateCharacterDocument(doc);if(errors.length) throw new Error(errors.join('\n'));
 const c=doc.character;
 const list=(items,fn)=>items.length?items.map(fn).join('\n'):'Keine eingetragen.';
 return [
  `${doc.confirmed?'Bestätigter':'Entwurf · noch nicht bestätigter'} ${doc.kind==='start'?'Startbogen':'aktueller Figurenbogen'}: ${c.identity.name}`,
  'Übernimm diese Angaben unverändert. Offene Herkunft oder Ziele bleiben offen. Änderungen nur nach den vereinbarten Regeln; bestätigte Fakten nicht neu erfinden.',
  'IDENTITÄT',...Object.entries(c.identity).filter(([,v])=>v).map(([k,v])=>`${({name:'Name',pronouns:'Pronomen',ancestry:'Spezies/Abstammung',origin:'Herkunft',role:'Rolle',description:'Beschreibung'})[k]}: ${v}`),
  'ATTRIBUTE',Object.entries(attributeLabels).map(([k,v])=>`${v}: ${c.attributes[k]>=0?'+':''}${c.attributes[k]}`).join(' · '),
  'TALENTE',list(c.talents,r=>`${r.name} (+${r.bonus}, nicht stapelbar): ${r.description}`),
  'FÄHIGKEITEN',list(c.abilities,r=>`${r.name}: ${r.effect}\nKosten: ${r.cost} · Grenzen: ${r.limits}`),
  'SCHWÄCHEN',list(c.weaknesses,r=>`${r.name}\nAuslöser: ${r.trigger}\nAuswirkung: ${r.effect}\nAbmilderung: ${r.mitigation||'nicht festgelegt'}`),
  'ZUSTAND',`${c.vitals.hp}/${c.vitals.maxHp} LP`, `Verletzungen: ${c.vitals.injuries||'keine eingetragen'}`,
  list(c.vitals.resources,r=>`${r.name}: ${r.current}/${r.max}\nWirkung: ${r.effect}\nKosten: ${r.cost}\nRegeneration: ${r.regeneration}`),
  'GETRAGENE AUSRÜSTUNG',list(c.inventory,r=>`${r.name} ×${r.quantity}: ${r.description} · ${r.slots} Plätze pro Einheit · Bonus +${r.bonus}`),
  `Belegt: ${c.inventory.reduce((n,r)=>n+r.quantity*r.slots,0)}/8 Tragplätze.`,
  'NAHRUNG UND BEDÜRFNISSE',c.nourishment||'Keine Besonderheiten eingetragen.',
  'HINTERGRUND',`Bestätigt: ${c.background.confirmed||'nicht festgelegt'}\nOffen: ${c.background.open||'nicht festgelegt'}\nAusgeschlossen: ${c.background.excluded||'nicht festgelegt'}`,
  'ENTWICKLUNG',list(c.development,r=>`${r.milestone}: ${r.change}\nNutzen: ${r.benefit}\nGrenzen: ${r.limits||'nicht eingetragen'}`),
  ...(doc.kind==='current'?[doc.startCharacter?'URSPRÜNGLICHER STARTBOGEN\n'+characterText({...newCharacterDocument(),confirmed:true,character:doc.startCharacter}):'Ursprünglicher Startbogen nicht verfügbar; keine Ausgangswerte erfinden.']:[]),
 ].join('\n\n');
}
export function characterTemplate(idea='',world='') {
 const example=newCharacterDocument();
 example.character.identity.name='Name';example.character.identity.description='Figurenbeschreibung';
 example.character.talents=[{name:'Talent 1',description:'Enge Anwendung',bonus:2},{name:'Talent 2',description:'Andere enge Anwendung',bonus:2}];
 example.character.weaknesses=[{name:'Situative Schwäche',trigger:'Konkreter Auslöser',effect:'Konkrete Einschränkung',mitigation:'Möglicher Umgang'}];
 return [
  'Erstelle einen Startbogen für ein freies W20-Textrollenspiel aus meiner Figurenidee. Keine Geschichte beginnen. Antworte mit einem einzigen JSON-Objekt ohne Markdown-Codeblock, passend zu dem Schema unten. Keine zusätzlichen Felder. format, version, kind und confirmed unverändert lassen. Keine API oder Werkzeuge benötigt.',
  `FIGURENIDEE\n${idea.trim()||'[Hier die eigene Kurzbeschreibung einsetzen]'}`,
  `WELTVORGABEN\n${world.trim()||'[Hier die Weltvorgaben aus dem Abenteuerprofil einsetzen]'}`,
  'Bewahre meine Vorgaben. Spezies/Abstammung, Herkunft, persönliche Ziele und Beziehungen dürfen unbekannt oder offen bleiben. Erfinde bei der Erstellung keine bestätigte Vergangenheit. Offene Angaben dürfen im späteren Spiel entdeckt und ausgestaltet werden; sie sind keine Verbote. Trage in background.excluded ausschließlich ausdrücklich von mir genannte Ausschlüsse ein und lasse das Feld andernfalls leer. Erfinde keine Verbote bestimmter Herkunft, früherer Beziehungen, Missionen oder späterer Enthüllungen. Ergänze fehlende Werte und Ausrüstung ohne Berufsklischees. Frage bei wesentlichen Widersprüchen, statt sie still zu ändern.',
  'Kraft = Stärke, Ausdauer und kraftvoller Waffeneinsatz. Geschick = Präzision, Bewegung und Heimlichkeit. Verstand = Wissen, Analyse, Planung und Technik. Gespür = Wahrnehmung, Menschenkenntnis und Intuition. Ganze Startwerte −1 bis +3, Summe +5. Genau zwei enge Talente mit bonus:2; nicht stapelbar. Eine situative Schwäche mit beobachtbarem, konkretem Auslöser und klarer Wirkung; keine dauernde Einschränkung in praktisch jeder Abenteuerszene. Ihre Anwendung darf nicht voraussetzen, dass die Spielleitung meine Gefühle erfindet. Normale Ressourcenknappheit ist keine zusätzliche individuelle Schwäche. Weitere Schwächen nur, wenn meine Idee sie ausdrücklich verlangt. 10/10 LP, maximal acht getragene Plätze. quantity multipliziert slots (pro Einheit); kleine Kleidung darf 0 Plätze belegen. Ausrüstungsbonus 0 bis 2, nur begründet und situationsbezogen.',
  'abilities: je {name,effect,cost,limits}; Wirkung/Kosten/Grenzen konkret. weaknesses: je {name,trigger,effect,mitigation}. vitals.resources: je {name,current,max,effect,cost,regeneration}. Magiebegabte beginnen normalerweise mit drei Ressourcenpunkten; Wirkung, Kosten und Regeneration konkret festlegen. Keine universellen Problemlösefähigkeiten. Keine übernatürlichen Kräfte ohne passende Welt- und Figurenidee. Keine Fähigkeiten oder Ressourcen erzwingen: unbenötigte Listen leer lassen.',
  'inventory: je {name,quantity,slots,bonus,description}. nourishment: besondere Nahrung/Bedürfnisse. background.confirmed: gesicherte Angaben; background.open: bewusst offene Bereiche; background.excluded: ausgeschlossene Zuschreibungen. development bleibt bei einer Startfigur leer. confirmed:false: Der Spieler prüft und bestätigt den Entwurf später selbst.',
  'JSON-VORLAGE (Beispiele ersetzen; zusätzliche Einträge nur in den beschriebenen Listen):',JSON.stringify(example,null,2),
 ].join('\n\n');
}
