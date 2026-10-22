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
    short: 'Short: one bounded pursuit with a decisive challenge and a recognizable consequential outcome.',
    medium: 'Medium: a developed pursuit with connected turning points, relationships and lasting consequences; a reachable ending.',
    long: 'Extended: a layered pursuit with room for relationships and discoveries, visible progress and a reachable finale.',
  },
  continuation: {
    open: 'Open campaign: after each adventure, settle its consequences and development, then prepare the next adventure in the continuing world. Allow requested interludes; no overarching end goal is required.',
    linked: 'Linked campaign: after each resolved chapter, prepare the next chapter of the larger conflict towards a reachable overall finale. Preserve local outcomes.',
    single: 'Single adventure: finish with consequences and an epilogue. Begin another adventure only at my request.',
  },
};

export function pluginChoiceText(group, option) {
  return choices[group]?.[option.id] ?? option.text;
}

export function pluginProfileText(profile, selected, groups) {
  return [
    'ADVENTURE PROFILE',
    'These are the selected world and play settings for this run.',
    worldText(profile.world),
    ...groups.filter(g=>profileIds.includes(g.id)&&g.id!=='setting')
      .map(g=>`${optionNames[g.id]}: ${pluginChoiceText(g.id,selected[g.id])}`),
    profile.focus.length
      ? 'Play focus: '+profile.focus.map(id=>focuses.find(f=>f.id===id).text).join(' ')
      : 'Play focus: varied according to the situation, no fixed weighting.',
    profile.wishes && `User wishes and exclusions:\n${profile.wishes}`,
  ].filter(Boolean).join('\n\n');
}
