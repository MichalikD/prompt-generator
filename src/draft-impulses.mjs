import {randomUint32} from './random.mjs';

const entry=(id,label,text)=>Object.freeze({id,label,text});
const catalog=Object.freeze({
 world:Object.freeze([
  entry('resource','Macht durch eine knappe Ressource','Explore who controls access to a scarce resource and what gives others bargaining power. Choose a resource that fits the world.'),
  entry('authority','Überlappende Zuständigkeiten','Explore how two institutions with legitimate but overlapping responsibilities shape everyday choices.'),
  entry('cooperation','Abhängigkeit trotz Rivalität','Give competing communities a concrete reason to rely on each other, even when their interests diverge.'),
  entry('custom','Ein Brauch mit Folgen','Develop an everyday custom that opens doors for some people and creates obligations for others.'),
  entry('mobility','Einfluss durch Beweglichkeit','Explore how people who can move, carry news or cross boundaries gain influence over those who cannot.'),
  entry('recognition','Ansehen durch Können','Explore a route to public standing based on a demonstrated skill or contribution, where the setting allows it.'),
 ]),
 character:Object.freeze([
  entry('bond','Eine Bindung abseits des Berufs','Suggest a meaningful connection outside the character’s occupation, where relationships are open to invention.'),
  entry('comfort','Ein Ort, an den es die Figur zurückzieht','Suggest an ordinary place or community the character has reason to return to, if compatible with their history.'),
  entry('curiosity','Eine Neugier ohne Auftrag','Suggest something the character might want to learn or understand for their own reasons, without prescribing a quest.'),
  entry('habit','Eine unerwartete Alltagsgewohnheit','Give the character a distinctive everyday habit or interest that adds texture without changing their abilities.'),
  entry('choice','Zwei Werte, die sich reiben','Explore two compatible aspects of the character’s values that might pull in different directions, without deciding their actions.'),
  entry('skill','Ein Können mit anderer Herkunft','If the origin of an existing skill is open, suggest how it grew from a different part of the character’s life.'),
 ]),
 crew:Object.freeze([
  entry('phases','Bekannt aus verschiedenen Lebensphasen','Where their shared histories are open, let companions know the protagonist from different periods or settings.'),
  entry('purpose','Ein eigenes Vorhaben','Give a companion a worthwhile independent pursuit that can matter even when the protagonist chooses not to join.'),
  entry('exchange','Hilfe in beide Richtungen','Explore what companions can offer each other in everyday life and where they need help themselves.'),
  entry('perspectives','Verschiedene Gründe für dieselbe Verbindung','Let companions value a shared bond for different reasons without manufacturing a betrayal or forcing agreement.'),
  entry('distance','Verbunden, auch wenn getrennt','Explore how a relationship continues when a companion is elsewhere or has obligations of their own. Preserve specified starting presence.'),
  entry('ordinary','Ein gemeinsames Stück Alltag','Suggest an ordinary practice or interest that gives the group a connection beyond its roles in dangerous situations.'),
 ]),
});

export function drawDraftImpulse(kind,previous='') {
 const choices=catalog[kind].filter(item=>item.id!==previous);
 return choices[randomUint32()%choices.length];
}

export function draftImpulseText(kind,id) {
 if(!id)return '';
 const impulse=catalog[kind].find(item=>item.id===id);
 if(!impulse)throw new Error('Unbekannter Entwurfsimpuls.');
 return `OPTIONAL DRAFT IMPULSE\n${impulse.text}\nUse this only as inspiration for unspecified details. Explicit choices, exclusions, confirmed facts and details deliberately left open take precedence. Omit the impulse if incompatible. Do not turn it into a mandatory quest, a future plot or a separate field in the JSON.`;
}
