import {draftDefinitions,parseDraft} from './preparation-data.mjs';
import {resolveWorld,worldTemplates,worldFields,worldSources} from './worlds.mjs';

export function playDraftText(value,kind){
 const body=parseDraft(value,kind)[kind],def=draftDefinitions[kind];
 return [...Object.entries(def.fields).filter(([k])=>body[k].trim()).map(([k,label])=>`${label}: ${body[k]}`),
  ...Object.entries(def.lists).flatMap(([k,list])=>body[k].map(entry=>Object.entries(list.fields).map(([f,label])=>`${label}: ${typeof entry[f]==='boolean'?(entry[f]?'Ja':'Nein'):entry[f]}`).join('\n')))].join('\n\n');
}
export function playContextFromConfig(config){
 const world=resolveWorld(config),template=worldTemplates.find(t=>t.id===world.template);
 const parts=[`Weltvorlage: ${template.label}`,`Grundlage: ${worldSources.find(s=>s.id===world.source).label}`];
 for(const f of worldFields)parts.push(`${f.label}: ${f.options.find(o=>o.id===world[f.key]).label}`);
 if(world.reference)parts.push(`Vorbild / Universum: ${world.reference}`);
 if(world.society)parts.push(`Gesellschaft / Region: ${world.society}`);
 if(world.mythology)parts.push(`Mythologie: ${world.mythology}`);
 if(config.worldDescription?.trim())parts.push(`Weitere Weltvorgaben: ${config.worldDescription.trim()}`);
 if(config.worldDocument)parts.push(playDraftText(config.worldDocument,'world'));
 if(config.wishes?.trim())parts.push(`Eigene Spielvorgaben: ${config.wishes.trim()}`);
 return {world:parts.join('\n\n'),crew:config.crewDocument?playDraftText(config.crewDocument,'crew'):'',companions:''};
}
