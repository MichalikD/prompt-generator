import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {defaults,LIMIT} from '../src/generator.mjs';
import {buildOutput,worldForCharacter,PLUGIN} from '../src/outputs.mjs';
import {characterTemplate} from '../src/character.mjs';
const figure=JSON.parse(readFileSync(new URL('../examples/vesper-start.json',import.meta.url),'utf8'));

test('Bestätigter Bogen und Profil stehen in beiden Modi vollständig in einer Startnachricht',()=>{
 const config={...defaults,characterSource:'prepared',worldDescription:'Nur Inseln.',wishes:'Keine Bilder.'};
 for(const mode of ['compact','plugin']) {
  const output=buildOutput(config,mode,figure);
  assert.ok(output.projectInstructions.length<LIMIT);
  for(const text of ['ABENTEUERPROFIL','Nur Inseln.','Keine Bilder.','Bestätigter Startbogen: Vesper','Doppelschwertkampf','beginne das Abenteuer']) assert.ok(output.startMessage.includes(text),text);
  assert.ok(!output.startMessage.includes('Ich lege Name/Herkunft'));
  assert.ok(!output.projectInstructions.includes('Ich lege Name/Herkunft'));
  assert.ok(output.downloadText.includes(output.startMessage));
 }
});

test('Vorbereitete Quelle wartet auf einen gültigen bestätigten Bogen; Moduswechsel verändert ihn nicht',()=>{
 const config={...defaults,characterSource:'prepared'}, snapshot=JSON.stringify(figure);
 for(const mode of ['compact','plugin']) {
  assert.throws(()=>buildOutput(config,mode),/Bogen/);
  assert.throws(()=>buildOutput(config,mode,{...figure,confirmed:false}),/bestätigen/);
  assert.throws(()=>buildOutput(config,mode,{...figure,character:{...figure.character,attributes:{kraft:5}}}),/unvollständig/);
  buildOutput(config,mode,figure);
 }
 assert.equal(JSON.stringify(figure),snapshot);
 assert.ok(!buildOutput(defaults,'plugin').startMessage.includes('Bestätigter Startbogen:'));
});

test('Charaktertemplate erhält Weltbeschreibung und eigene Grenzen ohne Abenteuerumfang oder Würfelanzeige',()=>{
 const config={...defaults,setting:'custom',worldDescription:'Superhelden auf einer Raumstation.',wishes:'Keine Gedankenkontrolle.',scope:'long'};
 const world=worldForCharacter(config), prompt=characterTemplate('Ein Mechaniker.',world);
 assert.ok(prompt.includes(config.worldDescription));assert.ok(prompt.includes(config.wishes));
 assert.ok(!world.includes('Ausführlich:'));assert.ok(!world.includes('SG14'));
 assert.ok(prompt.includes('ausschließlich ausdrücklich von mir genannte Ausschlüsse'));
 assert.ok(prompt.includes('beobachtbarem, konkretem Auslöser'));
 assert.ok(prompt.includes('Normale Ressourcenknappheit ist keine zusätzliche individuelle Schwäche'));
});

test('Ausgabefassung und Pluginmanifest sind synchron',()=>{
 const manifest=JSON.parse(readFileSync(new URL('../plugins/freie-spielleitung-02/plugin.json',import.meta.url),'utf8'));
 assert.equal(manifest.version,PLUGIN.version);
 assert.equal(manifest.extensions['com.openai'].interface.displayName,PLUGIN.name);
});
