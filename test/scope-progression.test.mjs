import test from 'node:test';
import assert from 'node:assert/strict';
import {defaults} from '../src/generator.mjs';
import {buildOutput} from '../src/outputs.mjs';

test('Kurzer Umfang bleibt bei allen Kampagnenstrukturen eigenständig; größere Bögen entwickeln zwischendurch',()=>{
 for(const continuation of ['single','open','linked']) {
  const short=buildOutput({...defaults,scope:'short',continuation},'plugin').startMessage;
  assert.match(short,/one self-contained conflict/);assert.match(short,/unfinished larger threat/);
  assert.ok(!short.includes('Medium:'));assert.ok(!short.includes('Extended:'));
  if(continuation==='linked')assert.ok(!short.includes('larger conflict towards a reachable overall finale'));
  for(const scope of ['medium','long']) {
   const text=buildOutput({...defaults,scope,continuation},'plugin').startMessage;
   assert.match(text,/intermediate achievements/);assert.ok(!text.includes('Short:'));
  }
 }
 const open=buildOutput({...defaults,scope:'long',continuation:'open'},'plugin').startMessage;
 assert.match(open,/not an instruction to invent an overarching main plot/);
});
