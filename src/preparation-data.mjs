import {validateCharacterDocument} from './character.mjs';

const definitions={
 world:{fields:{name:'Name',premise:'Grundlage',society:'Kultur, Gesellschaft und Namensraum',features:'Technik, Magie und Besonderheiten',situation:'Aktuelle Lage'},lists:{factions:{label:'Macht / Gruppe',fields:{name:'Name',description:'Interessen und Einfluss'}},places:{label:'Ort',fields:{name:'Name',description:'Beschreibung'}}}},
 crew:{fields:{name:'Name / Bezeichnung',connection:'Gemeinsamer Zusammenhang',base:'Stützpunkt / Ausgangslage'},lists:{members:{label:'Person',fields:{name:'Name',ancestry:'Spezies / Herkunft',role:'Rolle und Können',personality:'Persönlichkeit',motive:'Eigenes Ziel',relationship:'Beziehung zur Hauptfigur / Gruppe',boundary:'Grenzen',affiliation:'Zugehörigkeit',whereabouts:'Aufenthalt zu Spielbeginn',present:'Zu Spielbeginn bei der Hauptfigur'}}}},
};
export const draftDefinitions=definitions;
export function newDraft(kind) {
 const def=definitions[kind];if(!def)throw new Error('Unbekannte Entwurfsart.');
 return {format:`open-game-master-${kind}`,version:1,confirmed:false,[kind]:{...Object.fromEntries(Object.keys(def.fields).map(k=>[k,''])),...Object.fromEntries(Object.keys(def.lists).map(k=>[k,[]]))}};
}
export function newDraftEntry(kind,list) {return Object.fromEntries(Object.keys(definitions[kind].lists[list].fields).map(k=>[k,k==='present'?false:'']));}
const object=v=>v!==null&&typeof v==='object'&&!Array.isArray(v);
function exact(value,keys,path,errors){
 if(!object(value)){errors.push(`${path}: Objekt erwartet.`);return false;}
 for(const key of keys)if(!Object.hasOwn(value,key))errors.push(`${path}: Feld „${key}“ fehlt.`);
 for(const key of Object.keys(value))if(!keys.includes(key))errors.push(`${path}: Unbekanntes Feld „${key}“.`);
 return true;
}
function plain(value,path,errors,required=false){
 if(typeof value!=='string'){errors.push(`${path}: Text erwartet.`);return;}
 if(required&&!value.trim())errors.push(`${path}: Bitte ausfüllen.`);
 if(/https?:\/\/|data:|\*\*|__|~~|`|!?\[[^\]]*\]\([^)]*\)|<[^>]+>|^\s*(?:#{1,6}\s|[-*+]\s|```)|[\u0000-\u0008\u000b\u000c\u000e-\u001f]/im.test(value))errors.push(`${path}: Nur Klartext ohne Bilder, Links, HTML oder Markdown-Formatierung verwenden.`);
}
export function validateDraft(doc,kind){
 const errors=[],def=definitions[kind];if(!def)return ['Unbekannte Entwurfsart.'];
 if(!exact(doc,['format','version','confirmed',kind],kind,errors))return errors;
 if(doc.format!==`open-game-master-${kind}`||doc.version!==1)errors.push('Unpassendes Entwurfsformat oder unbekannte Version.');
 if(typeof doc.confirmed!=='boolean')errors.push('confirmed muss true oder false sein.');
 const body=doc[kind];if(!exact(body,[...Object.keys(def.fields),...Object.keys(def.lists)],kind,errors))return errors;
 for(const [key,label]of Object.entries(def.fields))plain(body[key],label,errors,['name','premise','connection'].includes(key));
 for(const [key,list]of Object.entries(def.lists)){
  if(!Array.isArray(body[key])){errors.push(`${list.label}: Liste erwartet.`);continue;}
  if(key==='members'&&!body[key].length)errors.push('Crew: Mindestens eine Person angeben.');
  body[key].forEach((entry,i)=>{
   const path=`${list.label} ${i+1}`;if(!exact(entry,Object.keys(list.fields),path,errors))return;
   for(const [field,label]of Object.entries(list.fields)){
    if(field==='present'){if(typeof entry[field]!=='boolean')errors.push(`${path}: Anwesenheit muss true oder false sein.`);}
    else plain(entry[field],`${path} · ${label}`,errors,['name','role','whereabouts'].includes(field));
   }
  });
 }
 return errors;
}
export function parseDraft(value,kind){
 let doc;
 try {const text=typeof value==='string'?value:JSON.stringify(value);if(typeof text!=='string'||new TextEncoder().encode(text).length>1000000)throw new Error();doc=JSON.parse(text);}
 catch{throw new Error('Bitte gültiges JSON bis 1 MB einfügen; ohne Codeblock, Bilder oder Begleittext.');}
 const errors=validateDraft(doc,kind);if(errors.length)throw new Error(errors.slice(0,4).join(' '));return doc;
}
export function draftText(value,kind){
 const doc=parseDraft(value,kind),body=doc[kind],def=definitions[kind];
 return [kind==='world'?'WORLD FOUNDATION':'CREW AND CONTACTS',...Object.entries(def.fields).filter(([k])=>body[k].trim()).map(([k])=>`${k}: ${body[k].trim()}`),...Object.entries(def.lists).flatMap(([key,list])=>body[key].map(entry=>[`${key==='members'?'Person':key==='factions'?'Faction':'Place'}: ${entry.name.trim()}`,...Object.keys(list.fields).filter(k=>k!=='name'&&(typeof entry[k]==='boolean'||entry[k].trim())).map(k=>`${k}: ${typeof entry[k]==='boolean'?(entry[k]?'present with the main character':'not present with the main character'):entry[k].trim()}`)].join('\n')))].join('\n\n');
}
const stable=value=>JSON.stringify(value,(_,v)=>object(v)?Object.fromEntries(Object.keys(v).sort().map(k=>[k,v[k]])):v);
const worldFields=['setting','worldSource','worldReference','worldEra','worldTechnology','worldPowers','worldSociety','worldMythology','worldPlayerKind','worldDescription','worldMixConfirmed','wishes'];
export function worldBaseKey(config){return stable(Object.fromEntries(worldFields.map(k=>[k,typeof config[k]==='string'?config[k].trim():config[k]??''])));}
export function worldKey(config){return stable({base:worldBaseKey(config),draft:config.worldDocument?parseDraft(config.worldDocument,'world').world:null});}
export function characterKey(doc){return stable({kind:doc?.kind,character:doc?.character,startCharacter:doc?.startCharacter});}
export function crewKey(config,doc){return stable({world:worldKey(config),character:characterKey(doc),companions:config.companions});}
export function worldReviewError(config){
 if(!config.worldDocument)return '';
 const doc=parseDraft(config.worldDocument,'world');
 return !doc.confirmed||config.worldDraftBasis!==worldBaseKey(config)?'Weltentwurf nach den Änderungen prüfen und erneut übernehmen.':'';
}
export function characterReviewError(config){return config.characterSource==='prepared'&&config.characterWorld&&config.characterWorld!==worldKey(config)?'Welt geändert: Charakterbogen prüfen und erneut übernehmen.':'';}
export function crewPrerequisite(config,doc){
 if(config.characterSource!=='prepared')return 'Crew erst nach einem hier vorbereiteten und übernommenen Charakterbogen erstellen.';
 if(!doc||validateCharacterDocument(doc).length||!doc.confirmed||config.characterWorld!==worldKey(config))return 'Zuerst den gültigen Charakterbogen für diese Welt übernehmen.';
 return '';
}
export function crewReviewError(config,doc){
 if(!config.crewDocument)return '';
 const crew=parseDraft(config.crewDocument,'crew'),prerequisite=crewPrerequisite(config,doc);
 if(prerequisite)return prerequisite+' Vorhandene Crew bleibt erhalten; bei Bedarf entfernen.';
 return !crew.confirmed||config.crewDraftBasis!==crewKey(config,doc)?'Crew nach den Änderungen an Welt, Figur oder Gefährtenwahl prüfen und erneut übernehmen.':'';
}
