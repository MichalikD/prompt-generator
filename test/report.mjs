import {buildOutput} from '../src/outputs.mjs';
import {representativeConfigs} from './config-cases.mjs';
const cases=representativeConfigs();
let maxStartLength=0;
for(const config of cases){
 const result=buildOutput(config);
 if(/undefined/.test(result.startMessage))throw new Error('Unvollständiger Starttext');
 maxStartLength=Math.max(maxStartLength,result.startMessage.length);
}
console.log(JSON.stringify({cases:cases.length,coverage:'Every active option, every option pair and every valid extra-dice combination; not exhaustive campaign behaviour.',maxStartLength},null,2));
