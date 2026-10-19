import {createProfile} from './profile.mjs';
import {groups,selectOptions} from './generator.mjs';
import {validateCharacterDocument} from './character.mjs';

export const setupSteps = ['Welt','Spielvorgaben','Figur','Prüfung und Ausgabe'];
export const stepForGroup = id => id==='setting'?0:id==='creation'?2:1;
export function setupErrors(step,config,character=null) {
 if(step===0) {
  if(!groups.find(g=>g.id==='setting').options.some(o=>o.id===config.setting))return ['Bitte eine Welt auswählen.'];
  if(config.setting==='custom'&&!config.worldDescription?.trim())return ['Bitte beschreibe deine eigene Welt. Ein kurzer Satz genügt.'];
  return [];
 }
 if(step===1) {
  try {selectOptions(config);createProfile(config);return [];}catch(error){return [error.message];}
 }
 if(step===2) {
  if(!['chat','prepared'].includes(config.characterSource))return ['Bitte auswählen, wo die Figur erstellt wird.'];
  if(config.characterSource==='chat')return [];
  if(!character)return ['Bitte einen Bogen erstellen oder importieren.'];
  const errors=validateCharacterDocument(character);
  if(errors.length)return ['Bitte die markierten Angaben im Charakterbogen vervollständigen.',...errors];
  return character.confirmed?[]:['Bitte den geprüften Charakterbogen ausdrücklich bestätigen.'];
 }
 return [0,1,2].flatMap(i=>setupErrors(i,config,character));
}
