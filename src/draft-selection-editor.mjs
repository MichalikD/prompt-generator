export function mountDraftSelection(before,kind,onChange){
 const group=document.createElement('fieldset');group.dataset.draftSelection=kind;
 const legend=document.createElement('legend');legend.textContent='Vorschläge zur Auswahl · optional';
 const label=document.createElement('label'),input=document.createElement('input');
 input.type='checkbox';input.id=`${kind}-draft-alternatives`;
 label.append(input,document.createTextNode(' Mehrere Vorschläge zur Auswahl'));
 const help=document.createElement('p');help.className='field-help';
 help.textContent='Die KI schlägt zuerst fünf kurze Varianten vor. Du wählst im KI-Chat eine aus; erst danach entsteht das vollständige JSON für den Import. Ohne Auswahl entsteht direkt ein Entwurf. Mit dem Entwurfsimpuls kombinierbar.';
 group.append(legend,label,help);before.before(group);
 input.addEventListener('change',onChange);
 return {get enabled(){return input.checked;},reset(){input.checked=false;onChange();}};
}
