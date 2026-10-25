// QA model only. The game chat does not call this script.
import {fileURLToPath} from 'node:url';
import {damageBands} from '../src/weapons.mjs';

export function hitChance(bonus,defense,mode='normal'){
 if(!['normal','advantage','disadvantage'].includes(mode))throw new Error('Unknown roll mode');
 const single=Math.max(0,Math.min(20,21+bonus-defense))/20;
 return mode==='advantage'?1-(1-single)**2:mode==='disadvantage'?single**2:single;
}
export function damageOutcomes(band,selected=false){
 const {base,die}=damageBands[band]??{};if(!base)throw new Error('Unknown damage band');
 if(!selected)return [[base,1]];
 const counts=new Map();
 for(let roll=1;roll<=die;roll++){
  const damage=base+(roll<=Math.floor(die/4)?-1:roll>die-Math.floor(die/4)?1:0);
  counts.set(damage,(counts.get(damage)??0)+1/die);
 }
 return [...counts];
}
function attackStates(attacker,defender,mode='normal'){
 const hit=hitChance(attacker.attack,defender.defense,mode);
 return [[0,1-hit],...damageOutcomes(attacker.damage,attacker.dice).map(([damage,p])=>[damage,p*hit])].filter(([,p])=>p>0);
}

// Exact finite-horizon enumeration: first living foe targeted, no healing or morale.
// Hero then ally (if any), then surviving enemies. No range/terrain/retreat model.
export function duelProbability(hero,foes,{ally=null,surprise=false,rounds=24}={}){
 const memo=new Map();
 function enemiesTurn(hp,remaining){
  let states=new Map([[hp,1]]);
  remaining.forEach((health,i)=>{if(health<=0)return;
   const next=new Map();for(const [h,p]of states){
    if(h<=0){next.set(0,(next.get(0)??0)+p);continue;}
    for(const [damage,q]of attackStates(foes[i],hero)){
     const left=Math.max(0,h-damage);next.set(left,(next.get(left)??0)+p*q);
    }
   }states=next;
  });return states;
 }
 function teamTurn(hp,remaining,turns,opening=false){
  let states=[{hp:remaining,p:1}];
  for(const actor of [hero,...(ally&&!opening?[ally]:[])]){
   const next=[];for(const state of states){const i=state.hp.findIndex(h=>h>0);
    if(i<0){next.push(state);continue;}
    for(const [damage,p]of attackStates(actor,foes[i],opening?'advantage':'normal')){
     const left=[...state.hp];left[i]=Math.max(0,left[i]-damage);next.push({hp:left,p:state.p*p});
    }
   }states=next;
  }
  let win=0;
  for(const state of states){
   if(state.hp.every(h=>h===0)){win+=state.p;continue;}
   if(opening){win+=state.p*resolve(hp,state.hp,turns);continue;}
   for(const [left,p]of enemiesTurn(hp,state.hp))win+=state.p*p*resolve(left,state.hp,turns-1);
  }return win;
 }
 function resolve(hp,remaining,turns){
  if(hp<=0)return 0;if(remaining.every(h=>h===0))return 1;if(turns<=0)return 0;
  const key=[hp,...remaining,turns].join(',');if(memo.has(key))return memo.get(key);
  const win=teamTurn(hp,remaining,turns);memo.set(key,win);return win;
 }
 return surprise?teamTurn(hero.hp,foes.map(f=>f.hp),rounds,true):resolve(hero.hp,foes.map(f=>f.hp),rounds);
}

export function comparisons(){
 const hero={hp:10,attack:4,defense:13,damage:'ordinary',dice:true};
 const guard={hp:6,attack:3,defense:12,damage:'ordinary',dice:true};
 const weak={hp:4,attack:1,defense:11,damage:'light',dice:true};
 const stronger={hp:14,attack:7,defense:16,damage:'heavy',dice:true};
 return [
  ['Novice, 1 trained foe',hero,[guard],{}],
  ['Novice, 3 trained foes',hero,[guard,guard,guard],{}],
  ['Novice, surprise + ally vs 2 trained foes',hero,[guard,guard],{ally:{...hero},surprise:true}],
  ['Novice, isolated 1 of the group',hero,[guard],{surprise:true}],
  ['Novice, 3 weaker foes',hero,[weak,weak,weak],{}],
  ['Experienced specialist, 3 weaker foes',stronger,[weak,weak,weak],{}],
 ].map(([name,h,foes,options])=>({name,hero:h,foes,options,win:duelProbability(h,foes,options)}));
}
if(process.argv[1]&&fileURLToPath(import.meta.url)===process.argv[1]){
 console.log(JSON.stringify({assumptions:'QA only: 24 rounds, hero first, ally unharmed, enemies focus hero, no retreat/morale/terrain. Surprise grants one opening attack with advantage. Conditional cases, not encounter guarantees.',comparisons:comparisons()},null,2));
}
