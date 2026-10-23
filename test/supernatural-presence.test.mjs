import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {defaults} from '../src/generator.mjs';
import {worldTemplates} from '../src/worlds.mjs';
import {buildOutput,worldForCharacter} from '../src/outputs.mjs';
const doc=JSON.parse(readFileSync(new URL('../examples/vesper-start.json',import.meta.url),'utf8'));
test('Übernatürliches bleibt auch in nichtklassischer Fantasy eine wirksame Weltwahl, ohne die Figur zu verändern',()=>{
 for(const setting of worldTemplates.map(w=>w.id).filter(id=>!['fantasy','mythology','custom'].includes(id))){
  for(const worldPowers of ['limited','common','divine','none']){
   const config={...defaults,setting,worldPowers,worldMixConfirmed:'yes',characterSource:'prepared'};
   const before=JSON.stringify(doc),output=buildOutput(config,'plugin',doc),world=worldForCharacter(config);
   for(const text of [output.startMessage,world]){
    assert.equal(text.includes('Give them concrete playable presence'),worldPowers!=='none',setting+' '+worldPowers);
    if(worldPowers==='none')assert.ok(text.includes('No supernatural powers.'));
   }
   assert.equal(JSON.stringify(doc),before);
   assert.equal(output.startMessage.split('Confirmed starting sheet: Vesper').length-1,1);
  }
 }
});
test('Mythologie ohne Kräfte bleibt Glaubenswelt; eigene Festlegungen werden nicht als Magieerlaubnis interpretiert',()=>{
 const mythology=buildOutput({...defaults,setting:'mythology',worldPowers:'none',worldMixConfirmed:'yes'},'plugin').startMessage;
 assert.ok(mythology.includes('do not turn belief into demonstrated divine intervention'));
 assert.ok(!mythology.includes('distinguish divine action, mortal knowledge and belief'));
 const custom=buildOutput({...defaults,setting:'custom',worldDescription:'Ein rein technischer Raum ohne Magie.',worldPowers:'other'},'plugin').startMessage;
 assert.ok(custom.includes('Ein rein technischer Raum ohne Magie.'));
 assert.ok(!custom.includes('Give them concrete playable presence'));
});
