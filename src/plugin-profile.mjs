import { optionNames } from './language.mjs';
import { focuses, profileIds } from './profile.mjs';
import { worldText } from './worlds.mjs';

// Run-specific choices only. General GM instructions live in the plugin.
const choices = {
  tone: {
    adventure: 'Adventure: wonder, exploration, initiative and real danger. Hostile actors may attack; defeat, loss and death are possible. Quiet and humour can occur; no horror focus.',
    cozy: 'Cozy: a reassuring atmosphere, manageable conflicts and rare foreseeable dangers; no cruelty or horror scenes.',
    dark: 'Dark: danger, harsh consequences and moral complexity with room for hope. Threats, allies and patrons keep their actual interests and limits; affection or peaceful play does not make the world harmless. No horror focus.',
    horror: 'Horror: threat, uncertainty and unease; preserve coherent consequences and player agency.',
  },
  depiction: {
    restrained: 'Restrained: injury, death and adult themes remain recognizable without detailed bodily depiction. Applies to the whole world, not only combat; does not make actors harmless or alter outcomes.',
    clear: 'Clear: describe concrete injuries, physical consequences and adult settings openly without dwelling on graphic bodily detail. Applies to the whole world, not only combat; no change to mechanics or outcomes.',
    graphic: 'Graphic: where fitting, describe explicit violence, decay and bodily detail throughout the world, not only combat. No compulsory gore or sexual scenes. Description follows actual outcomes; it cannot invent death, mutilation or mechanical penalties.',
  },
  death: {
    standard: 'Standard: the world permits injury, defeat and death. After death, accept the ending or rewind to the last decision where death was avoidable. Reset world and character knowledge; player knowledge remains. Identical replayed attempts retain their rolls; different approaches are allowed.',
    hardcore: 'Hardcore: the same world danger and consequences as Standard; a valid death permanently ends this run with no rewind. Saving does not bypass death. Correct GM errors.',
  },
  scope: {
    dynamic: 'Dynamic: let successive adventures include both brief conflicts and more developed arcs, according to their substance and player decisions. Before each, establish a concrete goal, resistance and reachable outcome; keep an ending in sight. Develop the interesting core, then close a decided conflict instead of adding prerequisites or withholding its rewards. Meaningful intermediate outcomes earn EXP and usable world gains even within a longer arc. No fixed scene, check or duration quota; campaign continuation does not turn one conflict into an endless main quest.',
    short: 'Short: one self-contained conflict with a decisive challenge and a conclusive outcome. Keep room for consequential discovery and decisions; short does not mean only one check or a device to switch off. Resolve its central problem within this adventure; do not reveal it as merely a preliminary step in an unfinished larger threat. Treat scope as the current conflict, independently of campaign continuation, tone and focus. Keep stakes bounded from preparation onward; discoveries and victories must make an attainable resolution closer, not keep adding necessary preliminary tasks. Continuing play can bring a new independent adventure in the same world.',
    medium: 'Medium: a larger story arc with several connected turning points, relationships and lasting consequences, reaching a common ending. Turn successes into lasting changes and an opportunity to decide this conflict. Settle outcome EXP and independent world gains at meaningful intermediate achievements, while they can still be used in this arc, as well as at its conclusion; do not substitute extra checks for substance.',
    long: 'Extended: a substantial story arc with multiple developing sections, discoveries and long-term aims towards a reachable finale. Recognize meaningful intermediate achievements with outcome EXP and independent world gains throughout the story, not only at the final ending; successes change the opposition and bring that finale closer rather than continually revealing more prerequisites; no fixed scene or reward quota.',
  },
  continuation: {
    open: 'Open campaign: the same character and world can continue after each completed adventure, with consequences, relationships and earned development preserved. This is a continuation setting, not an instruction to invent an overarching main plot. Apply the selected adventure scope; settle each outcome and usable reward, then allow requested interludes before a new adventure. Leaving a concluded conflict does not require abandoning an unresolved main threat.',
    linked: 'Linked campaign: resolved adventures share recurring people and consequences and may contribute to an agreed overall finale. Each adventure retains its selected scope, local outcome and immediate EXP settlement.',
    single: 'Single adventure: finish with consequences and an epilogue. Begin another adventure only at my request.',
  },
};

export function pluginChoiceText(group, option, scope) {
  if(group==='continuation'&&scope==='short'&&option.id==='linked')return 'Linked campaign: recurring connections reuse people, places or consequences across self-contained short adventures. Each central conflict closes; do not create an unresolved overarching main quest.';
  return choices[group]?.[option.id] ?? option.text;
}

// Reuse selected presentation in external drafts without imposing a plot or rules.
export function presentationContext(config) {
  const depiction=config.depiction??'clear';
  if(!choices.depiction[depiction])throw new Error('Ungültige Darstellung der Welt.');
  return [
    config.tone && `Tone: ${choices.tone[config.tone] ?? ''}`,
    `World depiction: ${choices.depiction[depiction]}`,
    'These guide the proposal, not a required scene. Preserve explicit exclusions; humour is situational, not compulsory.',
  ].filter(Boolean).join('\n');
}

export function pluginProfileText(profile, selected, groups) {
  return [
    'ADVENTURE PROFILE',
    'These are the selected world and play settings for this run.',
    worldText(profile.world),
    ...groups.filter(g=>profileIds.includes(g.id)&&g.id!=='setting')
      .map(g=>`${optionNames[g.id]}: ${pluginChoiceText(g.id,selected[g.id],profile.scope)}`),
    profile.focus.length
      ? 'Play focus: '+profile.focus.map(id=>focuses.find(f=>f.id===id).text).join(' ')
      : 'Play focus: varied according to the situation, no fixed weighting.',
    profile.wishes && `User wishes and exclusions:\n${profile.wishes}`,
  ].filter(Boolean).join('\n\n');
}
