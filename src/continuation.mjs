// This workflow reconstructs campaign state; it does not introduce game rules.
export function continuationTemplate({point='',notes=''}={}) {
 return `language = German

CAMPAIGN HANDOFF FROM A CHAT EXPORT

Do not start or continue the story. Reconstruct a reviewable save from the attached complete Markdown chat export in this separate preparation chat. Use Open Game Master to understand the recorded rules, not to replace the campaign's agreed version or change confirmed abilities.

SOURCE AUTHORITY
The chat export is authoritative for the course of play, decisions, consequences and explicitly agreed changes. An original starting sheet or start package, a manually maintained play-tab export and older saves are optional supporting evidence only. They help check and fill gaps; they never override later established events in the export. A starting sheet describes the original baseline, not the current character. A play-tab export may be outdated. An older save applies at its own timestamp. Distinguish the game conversation from commentary and quoted earlier messages. Deduplicate overlapping exports; do not count repeated scenes, payments or improvements twice.

An uncorrected arithmetic error or an NPC's stray rules remark is not automatically an agreed rule change. Later explicit corrections replace the corrected result and consequences. If narrative, arithmetic and stated state disagree without a correction, report the conflict instead of choosing silently. Preserve exceptional abilities and agreed deviations without generalizing them to other characters. Never silently repair this campaign by applying newer general rules.

TARGET
${point.trim() ? `Requested point: ${point.trim()}. Reconstruct only up to this point; do not apply later events to it.` : 'Reconstruct the latest established decision point in the export, including the last player message. If that message has not received a GM response, retain the declared action as pending, not completed.'}

AUDIT BEFORE WRITING
1. Identify the actual files provided and the portion you can inspect. State coverage honestly: fully inspected, partly inspected or unavailable. A successful upload is not proof of full inspection. Do not invent tools, file access, exact line numbers, counts or checksums.
2. If the export exceeds what you can inspect at once, process it in ordered sections across turns. Maintain a provisional state and evidence ledger. Request the next relevant section when necessary. Do not declare the reconstruction complete while relevant sections remain unread.
3. Track original state separately from later changes. Distinguish proposals, options, purchases, loans, research, agreed improvements, payments actually received, restricted funds and outstanding promises. Check balances and progression without duplicating previously settled outcomes.
4. Preserve names and identities, roles, relationships, motives, boundaries, whereabouts and knowledge with their observable sources. Do not merge two people just because their names match; flag uncertain identities. Facts, suspicions and unknowns remain separate. Do not invent hidden GM plans or spoilers.
5. For important state entries and conflicts, provide a compact source locator: file name plus actual turn/date/heading and a short identifying quotation. Use line numbers only if you have actually determined them. Evidence must come from the attached material, not other chats, memory, outside lore or plausible invention.

OUTPUTS
A. A self-contained Markdown save, complete without references such as "as above" or "see old chat":
- Campaign, language, world and exclusions; agreed rules version, selected dice, established exceptions and death/rewind policy.
- Current character: attributes, HP/max HP, talents, abilities with actual action/reaction timing, range, targets, effects, damage, costs, limits, regeneration, expended uses, equipment and weapon profiles, defenses and conditions, resources, money and special needs. Keep unknown fields explicitly unknown.
- Crew and relevant NPCs with identities, relationships, presence, knowledge and confirmed combat state; do not invent full sheets.
- Property, business versus personal funds, payments, owned items versus available offers, research and other open projects.
- Completed outcomes and rewards already accounted for, unspent EXP and improvements still awaiting selection.
- Essential history, meaningful decisions and consequences, open threads and deadlines, usable world facts and known places.
- Exact scene, time, positions and last decision. During combat retain initiative, round, current actor, remaining turns, movement/actions spent, active effects and expiry, pending raw dice and rolls already resolved. Do not advance the clock or decide for the player.
- Explicit missing or conflicting facts. Hidden world information only if actually documented, separately spoiler-labelled; otherwise acknowledge its absence.
B. A separate short verification report: coverage, material uncertainties, discrepancies, balance checks and evidence references. Ask focused questions for essential unresolved contradictions that prevent faithful resumption. Clearly label a provisional save; never claim exact continuation or completeness when evidence is missing. Do not require the player to invent unknown secrets.
C. A ready-to-copy first message for a NEW game chat: attach output A, select Open Game Master, preserve its agreed rules and current state, clarify only blocking ambiguities, resume at the saved decision point without replaying or inventing elapsed events. A pending player action remains pending until resolved. Files must actually be attached; never claim automatic access to another chat or automatic external storage.

Deliver A as a separate downloadable Markdown file when file creation is available, otherwise as a clearly separated copyable block. Keep the verification report outside the save. No ordinary narration-length cap applies to the save. Do not compress away rule-bearing facts or replace them with a vague story summary. No invented mechanics, new rewards or story continuation.
${notes.trim() ? `\nPLAYER CHECK NOTES (not evidence of completed events; verify against export):\n${notes.trim()}\n` : ''}`;
}
