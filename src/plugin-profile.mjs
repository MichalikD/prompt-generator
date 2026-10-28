import { optionNames } from './language.mjs';
import { focuses, profileIds } from './profile.mjs';
import { worldText } from './worlds.mjs';

// Run-specific choices only. General GM instructions live in the plugin.
const choices = {
  tone: {
    adventure: 'Adventure: wonder, exploration, initiative and real danger. Hostile actors may attack; defeat, loss and death are possible. Quiet and humour can occur; no horror focus.',
    cozy: 'Cozy: a reassuring atmosphere, manageable conflicts and rare foreseeable dangers; no cruelty or horror scenes.',
    dark: 'Dark: danger, harsh consequences and moral complexity with room for hope. Threats can act decisively; no horror focus.',
    horror: 'Horror: threat, uncertainty and unease; preserve coherent consequences and player agency.',
  },
  death: {
    standard: 'Standard: the world permits injury, defeat and death. After death, accept the ending or rewind to the last decision where death was avoidable. Reset world and character knowledge; player knowledge remains. Identical replayed attempts retain their rolls; different approaches are allowed.',
    hardcore: 'Hardcore: the same world danger and consequences as Standard; a valid death permanently ends this run with no rewind. Saving does not bypass death. Correct GM errors.',
  },
  scope: {
    short: 'Short: one self-contained conflict with a decisive challenge and a conclusive outcome. Resolve its central problem within this adventure; do not reveal it as merely a preliminary step in an unfinished larger threat. Keep stakes bounded from preparation onward; discoveries and victories must make an attainable resolution closer, not keep adding necessary preliminary tasks. Continuing play can bring a new independent adventure in the same world.',
    medium: 'Medium: a larger story arc with several connected turning points, relationships and lasting consequences, reaching a common ending. Turn successes into lasting changes and an opportunity to decide this conflict. Grant usable abilities, equipment or other development at meaningful intermediate achievements, while they can still be used in this arc, as well as at its conclusion; do not substitute extra checks for substance.',
    long: 'Extended: a substantial story arc with multiple developing sections, discoveries and long-term aims towards a reachable finale. Recognize meaningful intermediate achievements with useful abilities, items, improvements or other concrete benefits throughout the story, not only at the final ending; successes change the opposition and bring that finale closer rather than continually revealing more prerequisites; no fixed scene or reward quota.',
  },
  continuation: {
    open: 'Open campaign: the same character and world can continue after each completed adventure, with consequences, relationships and earned development preserved. This is a continuation setting, not an instruction to invent an overarching main plot. Apply the selected adventure scope; settle each outcome and usable reward, then allow requested interludes before a new adventure. Leaving a concluded conflict does not require abandoning an unresolved main threat.',
    linked: 'Linked campaign: after each resolved chapter, prepare the next chapter of the larger conflict towards a reachable overall finale. Preserve local outcomes.',
    single: 'Single adventure: finish with consequences and an epilogue. Begin another adventure only at my request.',
  },
};

export function pluginChoiceText(group, option, scope) {
  if(group==='continuation'&&scope==='short'&&option.id==='linked')return 'Linked campaign: recurring connections reuse people, places or consequences across self-contained short adventures. Each central conflict closes; do not create an unresolved overarching main quest.';
  return choices[group]?.[option.id] ?? option.text;
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
