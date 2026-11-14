import {continuationTemplate} from './continuation.mjs';
import {showRelease} from './release.mjs';
import {copyText,downloadFile,watchGrow,autoGrow} from './ui.mjs';
const $=s=>document.querySelector(s);
showRelease($('#release-info'),'Fortsetzung');
function update(){$('#handoff-template').value=continuationTemplate({point:$('#handoff-point').value,notes:$('#handoff-notes').value});autoGrow(document);}
for(const id of ['handoff-point','handoff-notes'])$('#'+id).addEventListener('input',update);
$('#handoff-copy').addEventListener('click',()=>copyText($('#handoff-template').value,$('#handoff-status'),$('#handoff-template')));
$('#handoff-download').addEventListener('click',()=>downloadFile($('#handoff-template').value,'savepoint-template.md','text/markdown;charset=utf-8'));
watchGrow(document);update();
