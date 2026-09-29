import { allConfigs, buildPrompt } from '../src/generator.mjs';
let count = 0, min = Infinity, max = 0, largest;
for (const c of allConfigs()) {
  const n = buildPrompt(c).length;
  count++; min = Math.min(min, n);
  if (n > max) { max = n; largest = c; }
}
console.log(JSON.stringify({ combinations: count, min, max, reserve: 8000 - max, largest }, null, 2));
