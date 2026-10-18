import { allConfigs, buildCompactPackage } from '../src/generator.mjs';
let count = 0, min = Infinity, max = 0, largest, external = 0;
for (const c of allConfigs()) {
  const output = buildCompactPackage(c);
  const n = output.projectInstructions.length;
  count++; if(output.profileExternal) external++;
  min = Math.min(min, n);
  if (n > max) { max = n; largest = c; }
}
console.log(JSON.stringify({ combinations: count, min, max, reserve: 8000 - max, externalProfiles:external, largest }, null, 2));
