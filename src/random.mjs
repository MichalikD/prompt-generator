export function randomUint32() {
 const words=new Uint32Array(1);
 globalThis.crypto.getRandomValues(words);
 return words[0];
}
