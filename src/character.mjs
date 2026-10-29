import {damageBands, weaponProfileText} from './weapons.mjs';
import { languageDirective, pluginLocalizationPolicy, ruleAttributes } from './language.mjs';
export const CHARACTER_VERSION = 3;
export const attributeLabels = {strength:'Kraft', dexterity:'Geschick', intellect:'Verstand', insight:'Gespür'};
export function emptyCharacter() {
 return {
  identity:{name:'',pronouns:'',ancestry:'',origin:'',role:'',description:''},
  attributes:{strength:0,dexterity:3,intellect:2,insight:0},
  talents:[{name:'',description:'',bonus:2},{name:'',description:'',bonus:2}],
  abilities:[], weaknesses:[],
  vitals:{hp:10,maxHp:10,resources:[],injuries:''},
  inventory:[], finances:{funds:[],purchasingPower:'',assets:''}, needs:[],
  background:{confirmed:'',open:'',excluded:''}, development:[], progression:{xp:0,available:0},
 };
}
export function newCharacterDocument() {
 return {format:'open-game-master-character',version:CHARACTER_VERSION,kind:'start',confirmed:false,character:emptyCharacter(),startCharacter:null};
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
 if(!keys(c,['identity','attributes','talents','abilities','weaknesses','vitals','inventory','finances','needs','background','development','progression'],path,errors)) return;
 if(keys(c.identity,['name','pronouns','ancestry','origin','role','description'],`${path} · Identität`,errors)) {
  for(const field of ['name','pronouns','ancestry','origin','role','description']) string(c.identity[field],`${path} · ${field}`,errors,['name','description'].includes(field));
 }
 if(keys(c.attributes,Object.keys(attributeLabels),`${path} · Attribute`,errors)) {
  for(const [key,label] of Object.entries(attributeLabels)) number(c.attributes[key],`${path} · ${label}`,errors,-1,kind==='start'?3:5);
  if(kind==='start' && Object.values(c.attributes).reduce((sum,n)=>sum+n,0)!==5) errors.push(`${path}: Startattribute müssen zusammen +5 ergeben.`);
 }
 rows(c.talents,['name','description','bonus'],`${path} · Talent`,errors,(r,p)=>{string(r.name,p+' · Name',errors,true);string(r.description,p+' · Beschreibung',errors,true);number(r.bonus,p+' · Bonus',errors,2,2);});
 if(kind==='start' && Array.isArray(c.talents) && c.talents.length!==2) errors.push(`${path}: Genau zwei Starttalente sind erforderlich.`);
 rows(c.abilities,['name','range','targets','damage','effect','cost','limits'],`${path} · Fähigkeit`,errors,(r,p)=>{for(const f of ['name','effect','cost','limits']) string(r[f],p+' · '+f,errors,true);for(const f of ['range','targets','damage'])if(Object.hasOwn(r,f))string(r[f],p+' · '+f,errors,f!=='range');});
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
 rows(c.inventory,['name','quantity','slots','bonus','description','weapon'],`${path} · Ausrüstung`,errors,(r,p)=>{string(r.name,p+' · Name',errors,true);string(r.description,p+' · Funktion',errors,true);number(r.quantity,p+' · Anzahl',errors,1,1000000);number(r.slots,p+' · Plätze pro Einheit',errors,0,1000000);number(r.bonus,p+' · Bonus',errors,0,2);
  if(Object.hasOwn(r,'weapon')&&keys(r.weapon,['damage','range','handling','feature','limits'],p+' · Waffenprofil',errors)) {
   if(!Object.hasOwn(damageBands,r.weapon.damage))errors.push(p+' · Schadensklasse: light, ordinary oder heavy erwartet.');
   for(const f of ['range','handling','feature','limits'])string(r.weapon[f],p+' · Waffenprofil '+f,errors,true);
   if(typeof r.weapon.range==='string'&&r.weapon.range.trim()==='0')errors.push(p+' · Waffenreichweite: 0 ist keine unbegrenzte Reichweite; wirksame Distanz angeben.');
  }
 });
 if(Array.isArray(c.inventory)) {
  const used=c.inventory.reduce((sum,r)=>sum+(isObject(r)?r.quantity*r.slots:0),0);
  if(used>8) errors.push(`${path}: ${used} Tragplätze belegt; maximal acht. Extern gelagerte Gegenstände nicht als getragen eintragen.`);
 }
 if(keys(c.finances,['funds','purchasingPower','assets'],`${path} · Geld und Vermögen`,errors)) {
  rows(c.finances.funds,['currency','amount'],`${path} · Geld`,errors,(r,p)=>{
   string(r.currency,p+' · Währung',errors,true);
   if(typeof r.amount!=='number'||!Number.isFinite(r.amount)||r.amount<0||r.amount>Number.MAX_SAFE_INTEGER) errors.push(p+' · Betrag: Nichtnegative, sicher darstellbare Zahl erwartet.');
  });
  if(Array.isArray(c.finances.funds)) {
   const names=c.finances.funds.filter(isObject).map(r=>typeof r.currency==='string'?r.currency.trim().toLowerCase():'');
   if(new Set(names).size!==names.length) errors.push(path+' · Geld: Jede Währung nur einmal eintragen.');
  }
  string(c.finances.purchasingPower,path+' · Kaufkraft',errors);
  string(c.finances.assets,path+' · Weiteres Vermögen',errors);
 }
 rows(c.needs,['name','description','mechanical','trigger','effect','care'],`${path} · Besonderes Bedürfnis`,errors,(r,p)=>{
  string(r.name,p+' · Name',errors,true);string(r.description,p+' · Beschreibung',errors,true);
  if(typeof r.mechanical!=='boolean') errors.push(p+' · Mechanik muss true oder false sein.');
  for(const key of ['trigger','effect','care']) string(r[key],p+' · '+key,errors,r.mechanical===true);
 });
 if(keys(c.background,['confirmed','open','excluded'],`${path} · Hintergrund`,errors)) for(const f of ['confirmed','open','excluded']) string(c.background[f],path+' · Hintergrund '+f,errors);
 if(c.progression!==undefined&&keys(c.progression,['xp','available'],path+' · EXP',errors)){number(c.progression.xp,path+' · EXP',errors,0,1);number(c.progression.available,path+' · Verfügbare Verbesserungen',errors,0,1000000);if(kind==='start'&&(c.progression.xp!==0||c.progression.available!==0))errors.push('Neue Startfigur: EXP und verfügbare Verbesserungen beginnen bei 0.');}
 rows(c.development,['milestone','change','benefit','limits'],`${path} · Entwicklung`,errors,(r,p)=>{for(const f of ['milestone','change','benefit','limits']) string(r[f],p+' · '+f,errors,['milestone','change','benefit'].includes(f));});
 if(kind==='start' && Array.isArray(c.development) && c.development.length) errors.push(`${path}: Entwicklung gehört in den aktuellen Bogen; der Startbogen bleibt der Ausgangspunkt.`);
}
export function validateCharacterDocument(doc) {
 const errors=[];
 if(!keys(doc,['format','version','kind','confirmed','character','startCharacter'],'Figurenbogen',errors)) return errors;
 if(doc.format!=='open-game-master-character'||doc.version!==CHARACTER_VERSION) errors.push('Unbekanntes Figurenformat oder nicht unterstützte Version.');
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
export function abilityRange(ability) {
 if(!Object.hasOwn(ability,'range'))return 'Siehe Wirkung / Grenzen';
 return !ability.range.trim()||ability.range.trim()==='0'?'Ohne Reichweitenbeschränkung':ability.range;
}
export function abilityFieldsText(ability) {
 return [Object.hasOwn(ability,'range')?'Range: '+(!ability.range.trim()||ability.range.trim()==='0'?'No distance limit; other conditions still apply.':ability.range):'',Object.hasOwn(ability,'targets')?'Targets / area: '+ability.targets:'',Object.hasOwn(ability,'damage')?'Damage: '+ability.damage:''].filter(Boolean).map(s=>s+'\n').join('');
}
export function characterText(doc) {
 const errors=validateCharacterDocument(doc);if(errors.length) throw new Error(errors.join('\n'));
 const c=doc.character;
 const list=(items,fn)=>items.length?items.map(fn).join('\n'):'None recorded.';
 return [
  `${doc.confirmed?'Confirmed':'Unconfirmed draft'} ${doc.kind==='start'?'starting sheet':'current character sheet'}: ${c.identity.name}`,
  `${doc.confirmed?'Use this confirmed sheet':'After player confirmation, use this sheet'} as the ${doc.kind==='start'?'starting':'current'} state; change it only through agreed rules and recorded development. Open history and goals may emerge in play consistently with confirmed facts and explicit exclusions. Do not assign my decisions or feelings.`,
  'IDENTITY',...Object.entries(c.identity).filter(([,v])=>v).map(([k,v])=>`${({name:'Name',pronouns:'Pronouns',ancestry:'Ancestry',origin:'Origin',role:'Role',description:'Description'})[k]}: ${v}`),
  'ATTRIBUTES',Object.entries(ruleAttributes).map(([k,v])=>`${v}: ${c.attributes[k]>=0?'+':''}${c.attributes[k]}`).join(' · '),
  'TALENTS',list(c.talents,r=>`${r.name} (+${r.bonus}, not stackable): ${r.description}`),
  'ABILITIES',list(c.abilities,r=>`${r.name}: ${r.effect}\n${abilityFieldsText(r)}Cost: ${r.cost} · Limits: ${r.limits}`),
  'WEAKNESSES',list(c.weaknesses,r=>`${r.name}\nTrigger: ${r.trigger}\nEffect: ${r.effect}\nMitigation: ${r.mitigation||'unspecified'}`),
  'CONDITION',`${c.vitals.hp}/${c.vitals.maxHp} HP`, `Injuries: ${c.vitals.injuries||'none recorded'}`,
  'ABILITY RESOURCES',list(c.vitals.resources,r=>`${r.name}: ${r.current}/${r.max}\nEffect: ${r.effect}\nCost: ${r.cost}\nRegeneration: ${r.regeneration}`),
  'CARRIED EQUIPMENT',list(c.inventory,r=>`${r.name} ×${r.quantity}: ${r.description} · ${r.slots} slots per unit · Bonus +${r.bonus}${r.weapon?"\n"+weaponProfileText(r.weapon,{english:true}):""}`),
  `Used: ${c.inventory.reduce((n,r)=>n+r.quantity*r.slots,0)}/8 carrying slots.`,
  'MONEY AND ASSETS',
  c.finances.funds.length?c.finances.funds.map(r=>`${r.currency}: ${r.amount}`).join('\n'):'Starting funds unspecified; do not assume zero.',
  ...(c.finances.purchasingPower?[`Purchasing power / price anchors: ${c.finances.purchasingPower}`]:[]),
  ...(c.finances.assets?[`Other assets: ${c.finances.assets}`]:[]),
  ...(c.needs.length?['SPECIAL NEEDS',list(c.needs,r=>`${r.name}: ${r.description}\n${r.mechanical?`Agreed mechanic — Trigger: ${r.trigger}\nEffect: ${r.effect}\nCare / recovery: ${r.care}`:'Descriptive only; no additional counters or mechanical penalties agreed.'}`)]:[]),
  'BACKGROUND',`Confirmed: ${c.background.confirmed||'unspecified'}\nOpen: ${c.background.open||'unspecified'}\nExcluded: ${c.background.excluded||'unspecified'}`,
  'EXPERIENCE',`EXP: ${c.progression?.xp??0}/2; available personal improvements: ${c.progression?.available??0}. Award 1/2/3 EXP for qualifying outcomes, including defeat; every 2 unlock an improvement with three choices offered immediately. Loot is independent.`,
  'DEVELOPMENT',c.development.length?list(c.development,r=>`${r.milestone}: ${r.change}\nBenefit: ${r.benefit}\nLimits: ${r.limits||'not recorded'}`):'No advancement recorded yet. Award outcome EXP and offer unlocked personal improvements immediately: new abilities, stronger applications or numerical improvements as fitting; equipment is an independent world gain. Record later improvements in the current sheet; the starting sheet remains the original baseline.',
  ...(doc.kind==='current'?[doc.startCharacter?'ORIGINAL STARTING SHEET\n'+characterText({...newCharacterDocument(),confirmed:true,character:doc.startCharacter}):'Original starting sheet unavailable; do not invent starting values.']:[]),
 ].join('\n\n');
}
export function characterTemplate(idea='',world='') {
 const example=newCharacterDocument();
 example.character.identity.name='Name';example.character.identity.description='Character description';
 example.character.talents=[{name:'Talent 1',description:'Useful domain matching the talent name',bonus:2},{name:'Talent 2',description:'Different useful domain',bonus:2}];
 example.character.weaknesses=[{name:'Situational weakness',trigger:'Observable trigger',effect:'Concrete effect',mitigation:'Possible mitigation'}];
 example.character.inventory=[
  {name:'Example weapon',quantity:1,slots:1,bonus:0,description:'General function; replace or remove to fit the character and world.',weapon:{damage:'ordinary',range:'Melee 1–2 m.',handling:'One hand; room to swing.',feature:'Usable with one free hand for holding an object, not an extra action.',limits:'No ranged attack or additional attack from a second weapon.'}},
  {name:'Example non-weapon tool',quantity:1,slots:1,bonus:0,description:'A useful ordinary tool; replace or remove to fit the idea. No weapon object.'},
 ];
 return [
  languageDirective, pluginLocalizationPolicy,
  `JSON FORMAT: schema keys AND fixed code values remain in English, even when language is German or another language. Translate descriptive text only. In inventory[].weapon.damage use exactly one string from ${JSON.stringify(Object.keys(damageBands))}. These are machine-readable codes, not visible rule labels: never translate them or append numbers, dice, units or explanations. Use "light" for base damage 2, "ordinary" for 3 and "heavy" for 4. Write "damage":"heavy", never "damage":"schwer", "damage":"heavy 4", "damage":"W8" or "damage":4. Ability damage remains descriptive text; this enum applies only to weapon.damage. Preserve format/kind codes and boolean values as shown in the JSON template.`,
  'Create a starting sheet for a free D20 roleplaying game from my idea. Do not start the story. Return one JSON object, no Markdown or extra fields, matching the template. If an essential contradiction requires agreement first, ask one focused question instead of producing incompatible JSON. Keep format, version, kind and confirmed unchanged. No API or tools required.',
  `CHARACTER IDEA\n${idea.trim()||'[Insert your character idea]'}`,
  `WORLD SPECIFICATIONS\n${world.trim()||'[Insert the world specifications from the adventure profile]'}`,
  'Preserve my specifications. Ancestry, origin, personal goals and relationships may remain unknown or open. identity.description describes the character; background.confirmed contains only additional established events, relationships or origin facts, not a near-copy of that description. Leave it empty when there are no additional facts. Do not invent confirmed history during creation. Open history may emerge in play; it is not a prohibition. background.excluded contains only exclusions I explicitly requested; otherwise empty. Do not invent bans on future revelations, relationships or missions. Fill missing values and equipment without job stereotypes. Ask about essential contradictions instead of silently changing them.',
  'Strength = strength, endurance and forceful weapons; Dexterity = precision, movement and stealth; Intellect = knowledge, analysis, planning and technology; Insight = perception, insight and intuition. Integer starting values −1 to +3, sum +5. Exactly two distinct useful talents with bonus:2; never stack. Define recognizable domains matching their names across plausible uses, not one task, surface or tool. Do not lock a talent to one attribute when another fits the approach. No universal bonuses. Choose a situational weakness with an observable trigger and clear effect, not constant impairment or an invented feeling. Ordinary resource scarcity is not an extra personal weakness. Add further weaknesses only if my idea explicitly requires them. 10/10 HP; at most eight carried slots. quantity multiplies slots per unit; clothing/trifles may use 0. Equipment bonus 0 to 2, justified and situational.',
  'abilities: {name,range,targets,damage,effect,cost,limits}. Express the requested identity and power scale with capabilities worth using, not only harmless conveniences. Offensive or otherwise dangerous powers are valid when they fit the world and idea; do not silently reduce a powerful concept to a novice or add a ban on collateral effects. Mortality does not imply weak magic. No single ability solves every kind of problem. Even a novice needs worthwhile capabilities now, not only promises of later growth. This is a starting state, not a ceiling: later development can grant new actions, stronger effects, mastery and exceptional equipment, not only attribute increases. Preserve confirmed abilities; agree changes explicitly.',
  'For each power put range/reach into range, target count or area into targets, and damage (or explicitly None) into damage. These are descriptive strings, allowing touch, conditional ranges, radii, dice and exceptional scales. Use effect for action/resolution/duration and limits for remaining conditions; do not duplicate conflicting values. An explicitly empty range or string 0 means no distance limit, not exemption from sight, line of effect or other conditions. Write touch explicitly; it is not range 0. Never omit range for a new ability. Existing abilities without separate fields retain their original effect/limits; absence does not mean unlimited range. Damaging powers normally use the standard D20 check against target defense and light 2 / ordinary 3 / heavy 4 damage. Explicitly agree and justify exceptional scale or damage before confirmation; do not invent universal bonuses. For an instantaneous area attack, one attack roll is compared with each exposed target defense, including allies unless explicitly exempt; cost is per use, not per victim. Describe any ignition or persistence and its conditions. Potential collateral consequences create meaningful choices; they are neither automatically excluded nor guaranteed on every use.',
  'For a combat caster, propose a resource-free magical attack or comparably useful repeatable combat option. The default simple magical attack targets one visible creature within 15 m, uses one action and the normal attack check, and deals light damage 2. Define element and limits; no automatic hit or extra attack. Stronger and area powers spend resources. Respect an explicitly different player design and never add this ability automatically to an existing confirmed sheet.',
  'weaknesses: {name,trigger,effect,mitigation}. vitals.resources: {name,current,max,effect,cost,regeneration}. Magic users normally start with three resource points, independently of ability count or potency. Define spending, failure cost and regeneration. For a new three-point pool, propose +1 after a safe uninterrupted one-hour short rest, once between full rests, and full after a safe eight-hour rest, unless the concept calls for an agreed different schedule. If a requested scale conflicts with the standard creation rules, clarify and agree a deviation rather than weakening the idea silently. This generator validates standard numerical starting values; do not return incompatible JSON and pretend it is valid. Supernatural abilities require a suitable world and idea. Leave unused lists empty. Explain new mechanics before play.',
  'inventory: {name,quantity,slots,bonus,description,weapon?}. For newly created weapons include weapon:{damage,range,handling,feature,limits}; omit weapon entirely for other items. damage is light/ordinary/heavy (base 2/3/4; D4/D6/D8 only when that die was selected, with the rules’ +/-1 mapping, never full raw die damage). range, handling, feature and limits are nonempty descriptive strings. Define normal and maximum effective reach, hands/space, a useful trait and an actual limitation; 0 or empty is not unlimited weapon range. Differentiate a compact one-handed pistol, close heavy shotgun, distant two-handed rifle, and an automatic weapon’s ammunition-intensive suppressive option rather than giving every gun the same effect. Suppression is an explicitly agreed alternative action, not automatic hits or extra attacks; state ammo, area, duration and disadvantage effect before confirmation. Keep description for general function and avoid conflicting duplicate damage/range values. Preserve existing confirmed items without adding a profile or reading properties from their names. For an item-granted activated ability, also record its full usable power in abilities and name the required item and shared uses in effect/limits; it is not independent permanent learning. Passive item properties belong in description/weapon.feature; update weapon.damage only with its fixed enum codes. Do not invent special starting loot unless the idea warrants it. background.confirmed: additional established fictional facts only, not a duplicate of identity.description; never include draft/proposal/confirmation instructions or sheet status. The top-level confirmed flag alone records player approval. background.open: open areas; background.excluded: explicit exclusions. Keep development empty for a starting character. Talent bonuses remain +2 during development; mastery adds useful actions or applications rather than increasing the bonus. Talents can later expand, change or be replaced through agreed development; retain the original sheet. confirmed:false: the player reviews and confirms the draft.',
  'progression is {xp:0,available:0} at creation. During play xp is the remainder 0 or 1 towards threshold 2; available counts unlocked unchosen improvements. Outcome EXP and loot are independent. Never invent past EXP. Three improvement choices are offered immediately on unlocking.',
  'development records improvements already received, including useful items, blessings and concrete contacts, not a future advancement plan. Empty at creation does not forbid later growth. Describe talent domains so fitting abilities learned later can benefit; a spellcasting talent does not itself grant extra spells or bypass costs and limits.',
  'Money belongs in finances, never vitals.resources. finances.funds contains {currency,amount} with no artificial maximum, costs or regeneration. Preserve an explicit amount; otherwise propose modest, plausible starting funds for the world and idea, or explicit zero if the idea requires poverty. Do not silently omit money or assume unspecified funds mean zero. Add optional purchasingPower with one or two ordinary price anchors, and assets only if appropriate. These are a draft for player review, not invented confirmed history.',
  'vitals.resources contains ability pools only: current/max, effect, spending cost and regeneration. Leave it empty if unnecessary; ammunition and supplies remain inventory. needs is optional: {name,description,mechanical,trigger,effect,care}. Omit ordinary human food, water and sleep. Describe special needs without new penalties by default (mechanical:false). Set mechanical:true only when the player explicitly requests a mechanic; then specify observable trigger, exact effect and care/recovery. Avoid duplicating a tracked ability resource; refer to it instead. Do not invent an unannounced hunger system.',
  'Default HP recovery is the same for players, companions and enemies: +2 after a safe uninterrupted one-hour short rest once between full rests; full after a safe eight-hour rest. At 0 HP a living creature needs stabilization before resting; 0 alone does not mean death. Do not add lasting injury penalties or different NPC recovery. Lasting injuries require a separately agreed mechanic before play.',
  'Stay within the existing rules: use disadvantage or a concrete situational limitation for weaknesses, not invented flat penalty types. Equipment bonus applies only to checks, not armor. Appropriate light armor provides +1 defense, recorded clearly in its description with bonus:0. State weapon base damage using light 2, ordinary 3 or heavy 4 where relevant. Use the same damage defaults for spells. Two weapons alone give no extra attack; exceptional powers need explicitly defined resolution before confirmation. Define powers and costs before play, not after their first use.',
  'JSON TEMPLATE (replace or remove example inventory entries to match the idea; they demonstrate a weapon with a profile and an ordinary item without one, not mandatory equipment. Add entries only to the described lists. Before returning, check every weapon.damage against the exact code list above):',JSON.stringify(example,null,2),
 ].join('\n\n');
}
