import {validateWorld} from './worlds.mjs';
import {createProfile} from './profile.mjs';
import {groups,selectOptions} from './generator.mjs';
import {validateCharacterDocument} from './character.mjs';
import {resolveOpening} from './opening.mjs';

export const setupSteps = ['Welt','Spielvorgaben','Figur','Ausgabe'];
export const stepForGroup = id => id==='setting'?0:id==='creation'?2:1;
export function setupErrors(step,config,character=null) {
 if(step===0) {
  if(!groups.find(g=>g.id==='setting').options.some(o=>o.id===config.setting))return ['Bitte eine Welt auswählen.'];
  try {validateWorld(config);return [];}catch(error){return [error.message];}
 }
 if(step===1) {
  try {selectOptions(config);createProfile(config);resolveOpening(config);return [];}catch(error){return [error.message];}
 }
 if(step===2) {
  if(!['chat','prepared'].includes(config.characterSource))return ['Bitte auswählen, wo die Figur erstellt wird.'];
  if(config.characterSource==='chat')return [];
  if(!character)return ['Bitte einen Bogen erstellen oder importieren.'];
  const errors=validateCharacterDocument(character);
  if(errors.length)return ['Bitte die markierten Angaben im Charakterbogen vervollständigen.',...errors];
  return [];
 }
 return [0,1,2].flatMap(i=>setupErrors(i,config,character));
}
