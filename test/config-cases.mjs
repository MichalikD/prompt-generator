import {defaults,groups,dice} from '../src/generator.mjs';

// Exercise every choice and every pair of choices without millions of identical
// frozen-output combinations. Additional rules-specific matrices live in tests.
export function representativeConfigs() {
 const cases=new Map();
 function add(overrides={}) {
  const c={...defaults,...overrides};
  if(c.setting==='custom')c.worldDescription='Eine eigene Welt mit klaren Vorgaben.';
  cases.set(JSON.stringify(c),c);
 }
 add();
 for(const [i,a]of groups.entries())for(const option of a.options){
  add({[a.id]:option.id});
  for(const b of groups.slice(i+1))for(const other of b.options)add({[a.id]:option.id,[b.id]:other.id});
 }
 for(let mask=0;mask<64;mask++){
  const extras=dice.filter((_,i)=>mask&(1<<i)).map(d=>d.id);
  if(extras.includes('dpercent')&&!extras.includes('d10'))continue;
  add({extras});
 }
 return [...cases.values()];
}
