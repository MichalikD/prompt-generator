import {languageDirective,pluginLocalizationPolicy} from './language.mjs';
import {resolveWorld,worldText,worldRules} from './worlds.mjs';
import {groups} from './generator.mjs';

// Drafting may precede a complete world. Placeholders here never enter the actual
// start package: the normal world validation still runs before that is produced.
function worldContext(config) {
 const world=resolveWorld({...config,
  worldDescription:config.worldDescription?.trim()||'[No additional description supplied; propose compatible details.]',
  worldReference:config.worldReference?.trim()||'[Reference missing: ask for the intended work/universe before using its canon.]'});
 return [worldText(world),worldRules(world,{legacy:false}),config.wishes?.trim()&&`Player wishes and exclusions: ${config.wishes.trim()}`].filter(Boolean).join('\n\n');
}
export function worldDraftTemplate(config,idea='') {
 return [languageDirective,pluginLocalizationPolicy,
  'Create an editable world proposal for a free text RPG, not an adventure or a running game. No tools or API required. A short idea is enough: invent coherent missing details instead of returning an empty outline or a questionnaire. Preserve explicit specifications and exclusions; ask only about an essential contradiction or a missing named canon. The player reviews the proposal before adoption.',
  `WORLD SPECIFICATIONS\n${worldContext(config)}`,
  `ADDITIONAL IDEA\n${idea.trim()||'Develop the selected world into an interesting place to play.'}`,
  'Return compact readable Markdown, without a preamble or instructions to the player. Describe one playable region: its cultural identity and naming conventions, everyday life, institutions and competing interests, several distinctive places, and the current situation offering different kinds of opportunity. Explain how the selected technology and any supernatural powers actually affect life, access, danger and possibility. Distinguish beliefs from established supernatural facts. Respect a non-supernatural world. Make room for personal gain, discovery, conflict and relationships, not only people needing rescue.',
  'Provide useful foundations, not a fixed plot: no opening scene, mandatory quest chain, predetermined resolution, chosen-one destiny or automatic world-ending threat. Do not create the player character or assign their history or decisions. Leave room for later invention. Do not override the selected era, technology or power choices to make the draft more spectacular. Keep the proposal around 300–500 words, with concrete connected details rather than a catalogue of lore.',
 ].join('\n\n');
}
export function crewDraftTemplate(config,idea='',document=null) {
 const hero=document?.character;
 const companionOption=groups.find(g=>g.id==='companions').options.find(o=>o.id===config.companions);
 return [languageDirective,pluginLocalizationPolicy,
  'Create an optional, editable crew or companion-group proposal for a free text RPG. It is a separate document, not part of the main character JSON. Do not start play or generate a mandatory adventure. No tools or API required. Expand a short idea creatively; ask only about essential contradictions. All additions are proposals until the player adopts them.',
  `WORLD SPECIFICATIONS\n${worldContext(config)}`,
  `GROUP IDEA\n${idea.trim()||'Propose a small distinctive group fitting this world and the main character, if supplied.'}`,
  companionOption&&`Selected companion availability: ${companionOption.text}. The optional crew does not override that choice or require everyone to travel or fight together.`,
  hero&&`MAIN CHARACTER DRAFT / SPECIFICATIONS (preserve, do not rewrite)\n${JSON.stringify({identity:hero.identity,background:hero.background},null,2)}`,
  'Return compact readable Markdown: a group identity and shared reason to associate; by default 2–4 distinct people with name, role/competence, personality, own motive, a meaningful relationship and a boundary; then the starting affiliation, vessel/home or base and who is actually present. Where useful, distinguish acquaintances, members and visitors. Propose relationships without dictating the player character\'s feelings, speech, past decisions or consent. Preserve explicitly open or excluded history.',
  'Give members independent purposes and practical competence, not just services or equipment for the hero. Relationships can include affection, humour, friction or divided loyalties without a compulsory betrayal. No required party composition, full numerical sheets, new combat subsystem, guaranteed loyalty or automatic extra actions. Establish consequential combat values before their first use under the normal game rules. Avoid replacing the hero\'s abilities or adding crew members to inventory. Keep this around 250–400 words unless the group idea calls for another size.',
 ].filter(Boolean).join('\n\n');
}
