import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {defaults} from '../src/generator.mjs';
import {buildOutput,PLUGIN} from '../src/outputs.mjs';
import {characterTemplate,characterText,validateCharacterDocument} from '../src/character.mjs';
import {languageDirective,PLAY_LANGUAGE,ruleAttributes} from '../src/language.mjs';
const example=JSON.parse(readFileSync(new URL('../examples/vesper-start.json',import.meta.url),'utf8'));
const manifest=JSON.parse(readFileSync(new URL('../plugins/freie-spielleitung-02/plugin.json',import.meta.url),'utf8'));

test('Spielsprache ist von englischen Regeln, Ausgabebezeichnungen und Pluginname getrennt',()=>{
 assert.equal(languageDirective,`language = ${PLAY_LANGUAGE}`);
 for(const mode of ['compact','plugin']) {
  const o=buildOutput({...defaults,worldDescription:'Weltvorgabe bleibt äöü.',wishes:'Keine Könige.'},mode,example);
  assert.ok(o.projectInstructions.includes(languageDirective));
  if(mode==='plugin')assert.ok(o.startMessage.includes(languageDirective));
  assert.ok(o.startMessage.includes('World description (user specifications):\nWeltvorgabe bleibt äöü.'));
  assert.ok(o.startMessage.includes('User wishes and exclusions:\nKeine Könige.'));
  assert.ok(o.startMessage.includes('Confirmed starting sheet: Vesper'));
  assert.equal(o.startMessage.split('Confirmed starting sheet: Vesper').length-1,1);
  assert.doesNotMatch(o.projectInstructions+'\n'+o.startMessage,/AUFTRAG|ABENTEUERPROFIL|Regelsatz|Würfelanzeige|Kraft|Geschick|Verstand|Gespür|\bSG\b|\bLP\b|\bW20\b/);
 }
 assert.ok(!/\d/.test(PLUGIN.name));
 assert.equal(manifest.extensions['com.openai'].interface.displayName,PLUGIN.name);
 assert.ok(manifest.extensions['com.openai'].interface.defaultPrompt.startsWith(languageDirective+'\n'));
});

test('Template und Figurenformat verwenden englische Struktur, Nutzerdaten bleiben erhalten',()=>{
 const template=characterTemplate('Eine Zwergin namens Rika.','Eine Welt ohne Könige.');
 assert.equal(template.split(languageDirective).length-1,1);
 assert.ok(template.includes('Eine Zwergin namens Rika.'));
 assert.ok(template.includes('Eine Welt ohne Könige.'));
 const doc=JSON.parse(template.slice(template.indexOf('{\n')));
 assert.deepEqual(validateCharacterDocument(doc),[]);
 assert.deepEqual(Object.keys(doc.character.attributes),Object.keys(ruleAttributes));
 assert.equal(doc.version,3);
 assert.ok(characterText(example).includes('Dexterity: +3'));
 const old=structuredClone(example);old.version=1;
 assert.ok(validateCharacterDocument(old).length);
});
