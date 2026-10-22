import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {defaults} from '../src/generator.mjs';
import {resolveOpening,openingText,newOpeningSeed,OPENING_CATALOG} from '../src/opening.mjs';
import {worldTemplates} from '../src/worlds.mjs';
import {buildOutput,worldForCharacter} from '../src/outputs.mjs';
import {setupErrors} from '../src/setup.mjs';
const config={...defaults,openingEnabled:true,openingSeed:'ogm1-00000001'};
const figure=JSON.parse(readFileSync(new URL('../examples/vesper-start.json',import.meta.url),'utf8'));

test('Ausgeschaltet bleibt der freie Start unverändert; Kennungen sind keine implizite Aktivierung',()=>{
 assert.equal(resolveOpening(defaults),null);
 assert.equal(resolveOpening({...defaults,openingSeed:'ungueltig'}),null);
 assert.deepEqual(buildOutput({...defaults,openingEnabled:false,openingSeed:'ungueltig'}),buildOutput(defaults));
 assert.ok(!buildOutput(defaults).startMessage.includes('OPENING IMPULSE'));
 assert.equal(OPENING_CATALOG,1);
});

test('Kennung und Vorgaben erzeugen reproduzierbare zwei Bausteine ohne Handlungsvorgabe',()=>{
 const before=JSON.stringify(config),a=resolveOpening(config);
 assert.deepEqual(resolveOpening({...config}),a);
 assert.deepEqual(resolveOpening({...config,worldMixConfirmed:true}),a);
 assert.equal(a.environment.id,'sea');assert.equal(a.situation.id,'captive');
 const text=openingText(a);
 for(const phrase of ['Environment:','Starting situation:','not world facts','the confirmed character','no fixed objective','secrets yourself'])assert.ok(text.includes(phrase),phrase);
 assert.ok(!/ghost pirates|dragon|seven anchors/i.test(text));
 assert.equal(JSON.stringify(config),before);
 for(const invalid of ['', 'ogm2-00000001','ogm1-zzzzzzzz','ogm1-000000001','<script>','ogm1-ABCDEF12'])assert.throws(()=>resolveOpening({...config,openingSeed:invalid}),/kennung/i);
 assert.match(newOpeningSeed(),/^ogm1-[0-9a-f]{8}$/);
 assert.ok(setupErrors(1,{...config,openingSeed:''}).some(e=>/kennung/i.test(e)));
});

test('Strukturierte Welten und Ton filtern Kombinationen; Raumfahrt wird nicht zum Segelschiff',()=>{
 const combinations=new Set();
 for(const template of worldTemplates.filter(w=>w.id!=='custom'))for(const tone of ['cozy','adventure','dark','horror'])for(let n=0;n<96;n++) {
  const c={...config,setting:template.id,tone,openingSeed:'ogm1-'+n.toString(16).padStart(8,'0')};
  const value=resolveOpening(c);
  assert.equal(value.conservative,false);
  assert.ok(value.environment);
  if(template.technology==='space')assert.ok(['city','spacecraft','habitat'].includes(value.environment.id));
  else assert.ok(!['spacecraft','habitat'].includes(value.environment.id));
  if(tone==='cozy')assert.ok(!['captive','pursued','stranded'].includes(value.situation.id));
  if(template.id==='fantasy'&&tone==='adventure')combinations.add(`${value.environment.id}/${value.situation.id}`);
 }
 assert.ok(combinations.size>40,'Die Stichprobe muss viele unterschiedliche Randbedingungen ergeben.');
 const hybrid=resolveOpening({...config,setting:'western',worldEra:'future',worldTechnology:'space',worldMixConfirmed:true});
 assert.ok(['city','spacecraft','habitat'].includes(hybrid.environment.id));
});

test('Freitext, Kanon und unklare eigene Technik führen zu neutralen, nachrangigen Impulsen',()=>{
 for(const override of [
  {setting:'custom',worldDescription:'Alles spielt in einem geschlossenen Habitat ohne Außenwelt.'},
  {worldDescription:'Diese Welt hat keine Ozeane.'},
  {wishes:'Ich bleibe zunächst in meinem Zimmer.'},
  {worldSociety:'Nur eine Gemeinschaft lebt auf einem Asteroiden.'},
  {worldSource:'canon',worldReference:'Ein Universum mit eigener Geografie.'},
  {worldTechnology:'other',worldDescription:'Eigene Transportregeln.'},
  {worldMythology:'Keine Reisen außerhalb des Tempels.'},
 ]) {
  const value=resolveOpening({...config,...override});
  assert.equal(value.conservative,true);assert.equal(value.environment,null);
  assert.ok(['discovery','change'].includes(value.situation.id));
  assert.ok(openingText(value).includes('adapt or omit an incompatible element'));
 }
});

test('Bogen, Erstellungsauftrag und reine Anzeigeänderungen verändern die Ausgangslage nicht',()=>{
 const before=JSON.stringify(figure),a=buildOutput({...config,characterSource:'prepared'},'plugin',figure);
 const b=buildOutput({...config,characterSource:'prepared',visibility:'compact',roller:'gm',extras:['d4']},'plugin',figure);
 assert.deepEqual(a.opening,b.opening);
 assert.ok(a.startMessage.includes(openingText(a.opening)));
 assert.ok(a.downloadText.includes(openingText(a.opening)));
 assert.ok(!a.projectInstructions.includes('Environment:'));
 assert.ok(!worldForCharacter(config).includes('OPENING IMPULSE'));
 assert.equal(JSON.stringify(figure),before);
 assert.throws(()=>buildOutput(config,'compact'),/nur im Plugin/);
 const changed=resolveOpening({...config,worldDescription:'Andere Welt, keine Küste.'});
 assert.notEqual(a.opening.fingerprint,changed.fingerprint);
 assert.equal(changed.environment,null);
});
