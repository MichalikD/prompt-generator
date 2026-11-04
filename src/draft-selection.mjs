const differences={
 world:'living conditions, social organization, and the possibilities created by technology or supernatural elements',
 character:'personality, background, motivation, relationships and inner tensions within my character idea; do not replace an explicitly specified identity, role or power scale',
 crew:'group cohesion, relationships, independent interests and composition, while preserving the adopted world, main character and specified members',
};

// Preparation only: the selected draft retains the existing import schema.
export function withDraftSelection(prompt,kind,{alternatives=false}={}) {
 if(!alternatives)return prompt;
 if(!differences[kind])throw new Error('Unbekannte Entwurfsart.');
 return [
  'TWO-STAGE DRAFT SELECTION — EXPERIMENTAL VERBALIZED SAMPLING',
  'The shared request below defines the world, character or crew specifications and final JSON format. Its instructions to return one JSON object apply only to Stage 2. In Stage 1 use the short candidate format specified here. Explicit user facts, exclusions, intentionally open areas and any adopted world or character remain binding in both stages. A supplied draft impulse guides the alternatives but never overrides those specifications. Ask one focused question if an essential contradiction prevents a compatible draft.',
  'STAGE 1 — FIVE POSSIBLE FOUNDATIONS',
  'Generate five possible responses to the shared request, each with an estimated probability below 0.10. Each response is a compact foundation for a later complete draft, not a full sheet or world. Seek plausible, less immediately typical responses without sacrificing coherence, playability or compatibility. The estimates concern how likely such a response would be to this request, not quality or chances of campaign success. Label them as uncalibrated model estimates; this incomplete set need not sum to one.',
  `Differentiate ${differences[kind]}. New names, scenery or symbols alone do not make a different foundation. Where my specifications are detailed, vary only what remains open for invention. Do not force novelty by changing the genre, adding a compulsory destiny or violating the supplied rules.`,
  'Output five numbered candidates, each with a short working title, three concise descriptive sentences and its estimated probability, in the selected language. Use at most 350 words in total. No full JSON, full numerical sheets, opening scene, images, tools or external links. Output only the candidate descriptions, not private reasoning. Stop and wait for my selection; do not choose or expand a candidate yourself.',
  'STAGE 2 — EXPAND ONLY MY SELECTION',
  'After I select a candidate, apply any requested changes and expand only that foundation into the complete draft required below. Retain its distinguishing features and the established world and character. Return exactly one complete JSON object matching the existing template, with all required fields and closing braces, no Markdown, probabilities, experimental fields or commentary. Preserve the schema, fixed codes and confirmed:false. Do not start play. If I request new alternatives instead, remain in Stage 1.',
  'SHARED REQUEST AND STAGE-2 JSON FORMAT',prompt,
 ].join('\n\n');
}
