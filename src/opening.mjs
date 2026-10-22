import {validateWorld} from './worlds.mjs';

export const OPENING_CATALOG = 1;
const place=(id,label,text)=>({id,label,text});
export const openingPlaces=Object.freeze([
 place('sea','Auf einem Schiff auf See','Aboard a ship at sea.'),
 place('coast','An einer Küste','At a coast.'),
 place('forest','In einem Wald','In a forest.'),
 place('mountains','Im Gebirge','In mountainous terrain.'),
 place('city','In einer größeren Siedlung','In a larger inhabited settlement appropriate to the world.'),
 place('frontier','In einer abgelegenen Gegend','In a remote inhabited region.'),
 place('underground','An einem unterirdischen Ort','In an accessible underground place.'),
 place('river','An einem Fluss oder See','At a river or lake.'),
 place('spacecraft','An Bord eines Raumfahrzeugs','Aboard a spacecraft.'),
 place('habitat','In einem Raumhabitat','In an inhabited space habitat.'),
]);
export const openingSituations=Object.freeze([
 place('travelling','Unterwegs','The character is travelling when a concrete playable situation develops.'),
 place('arrival','Gerade angekommen','The character has just arrived at a place suitable for this world.'),
 place('invited','Eingeladen','Someone has invited the character; establish a credible reason without inventing a past obligation or accepted mission.'),
 place('appeal','Um Hilfe gebeten','Someone asks the character for help; acceptance and the approach remain the player’s choice.'),
 place('witness','Zeuge eines Ereignisses','The character witnesses a consequential event and can respond freely.'),
 place('stranded','Am Weiterkommen gehindert','The character’s intended onward journey is interrupted by a concrete circumstance.'),
 place('pursued','Verfolgt','A person or force is actively pursuing the character; do not invent the character’s guilt, past choices or hidden identity.'),
 place('captive','Gefangen','At the opening, the character is held captive. Establish the captors and circumstances without inventing past player choices; the player chooses their response and objective.'),
]);
const neutralSituations=Object.freeze([
 place('discovery','Unerwartete Entdeckung','An unexpected discovery within the supplied world opens a concrete playable situation.'),
 place('change','Veränderte Umstände','An observable change in the character’s immediate circumstances opens a concrete playable situation within the supplied world.'),
]);

export function openingEnabled(config) {
 if(![undefined,false,true,'yes'].includes(config.openingEnabled))throw new Error('Ungültige Auswahl für den Ausgangsimpuls.');
 return config.openingEnabled===true||config.openingEnabled==='yes';
}
function readText(config,key) {
 const value=config[key];if(value===undefined)return '';
 if(typeof value!=='string')throw new Error('Angaben zum Ausgangsimpuls müssen Text sein.');return value.trim();
}
// The seed is a portable 32-bit random identifier, not a promise of AI determinism.
export function newOpeningSeed() {
 if(!globalThis.crypto?.getRandomValues)throw new Error('Zufall ist hier nicht verfügbar. Bitte eine gültige Kennung eingeben.');
 const words=new Uint32Array(1);globalThis.crypto.getRandomValues(words);
 return `ogm${OPENING_CATALOG}-${words[0].toString(16).padStart(8,'0')}`;
}
function hash(text) {
 let n=2166136261;for(let i=0;i<text.length;i++)n=Math.imul(n^text.charCodeAt(i),16777619);return n>>>0;
}
function random(seed) {
 let n=seed;return ()=>{n+=0x6D2B79F5;let t=n;t=Math.imul(t^(t>>>15),t|1);t^=t+Math.imul(t^(t>>>7),t|61);return ((t^(t>>>14))>>>0)/4294967296;};
}

export function resolveOpening(config) {
 if(!openingEnabled(config))return null;
 const seed=readText(config,'openingSeed');
 if(!/^ogm1-[0-9a-f]{8}$/.test(seed))throw new Error('Bitte eine gültige Impulskennung eingeben (ogm1- und acht kleine Hexadezimalzeichen) oder neu auslosen.');
 const world=validateWorld(config),tone=config.tone??'adventure';
 if(!['cozy','adventure','dark','horror'].includes(tone))throw new Error('Ungültige Atmosphäre für den Ausgangsimpuls.');
 const wishes=readText(config,'wishes');
 // Free text can exclude oceans, other people or travel. Do not pretend to parse it.
 const conservative=world.template==='custom'||world.source!=='original'||!!world.description||!!wishes||
  !!readText(config,'worldSociety')||!!readText(config,'worldMythology')||
  [world.era,world.technology,world.powers].includes('other');
 // Validation notices and a remembered confirmation checkbox are not world facts.
 const context={world:{...world,warnings:[],mixed:false,mixConfirmed:false},tone,companions:config.companions??null,scope:config.scope??null,continuation:config.continuation??null,wishes};
 const fingerprint=hash(JSON.stringify(context)).toString(16).padStart(8,'0');
 const pick=random(hash(`${OPENING_CATALOG}:${seed}:${fingerprint}`));
 const places=conservative?[]:openingPlaces.filter(p=>world.technology==='space'?['city','spacecraft','habitat'].includes(p.id):!['spacecraft','habitat'].includes(p.id));
 const situations=conservative?neutralSituations:openingSituations.filter(s=>tone!=='cozy'||!['captive','pursued','stranded'].includes(s.id));
 const environment=places.length?places[Math.floor(pick()*places.length)]:null;
 const situation=situations[Math.floor(pick()*situations.length)];
 return {catalog:OPENING_CATALOG,seed,fingerprint,conservative,environment,situation};
}

export function openingText(opening) {
 if(!opening)return '';
 return [
  'OPTIONAL OPENING IMPULSE',
  `Generator metadata only: catalog ${opening.catalog}; seed ${opening.seed}; context ${opening.fingerprint}. These identifiers are not world facts.`,
  opening.environment?`Environment: ${opening.environment.text}`:'Environment: leave location and geography to the supplied world; do not introduce an incompatible new place.',
  `Starting situation: ${opening.situation.text}`,
  'Use these only as opening conditions. Explicit user/world specifications, the confirmed character and agreed exclusions take priority: adapt or omit an incompatible element rather than changing them. Develop the people, causes, interests and secrets yourself before play; no fixed objective, solution, player feelings or later sequence is supplied. Do not treat the seed as a puzzle, reveal a loading report or reroll ongoing events. Continue from the resulting world and player choices.',
 ].join('\n\n');
}
