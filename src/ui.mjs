export function autoGrow(root) {
 const resize=field=>{if(!field.getClientRects().length)return;field.style.height='auto';field.style.height=Math.max(44,field.scrollHeight+2)+'px';};
 root.querySelectorAll('textarea[data-grow]').forEach(resize);
}
export function watchGrow(root) {
 root.addEventListener('input',e=>{if(e.target.matches('textarea[data-grow]'))autoGrow(root);});
 root.addEventListener('toggle',()=>autoGrow(root),true);
}
export function openDialog(dialog) {
 if(!dialog.open)dialog.showModal();
 requestAnimationFrame(()=>autoGrow(dialog));
}
export function downloadFile(text,name,type) {
 const url=URL.createObjectURL(new Blob([text],{type})),a=document.createElement('a');
 a.href=url;a.download=name;document.body.append(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(url),1000);
}
export async function copyText(text,feedback,field=null) {
 try{if(!navigator.clipboard?.writeText)throw new Error();await navigator.clipboard.writeText(text);feedback.textContent='Kopiert.';}
 catch{feedback.textContent='Zwischenablage nicht verfügbar. Text anzeigen und manuell kopieren.';if(field&&!field.hidden){field.focus();field.select();}}
}
