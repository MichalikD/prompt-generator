// World assumptions are shared by setup, both output modes and character creation.
export const worldSources = [
 {id:'original',label:'Eigenständige Welt',text:'Create an independent setting and cast within the effective world specifications; do not silently import a known fictional universe.'},
 {id:'inspired',label:'Von einem Werk inspiriert',text:'Use the named work as inspiration, not its canon. Preserve only the requested influences.'},
 {id:'canon',label:'Bekanntes Universum',text:'Use the named universe and requested period/deviations. Mark uncertain canon instead of inventing certainty; clarify only essential gaps.'},
];
export const worldFields = [
 {key:'era',config:'worldEra',label:'Zeit / Epoche',options:[
  {id:'ancient',label:'Antike',text:'An ancient era.'},
  {id:'medieval',label:'Mittelalter / feudale Epoche',text:'A medieval or feudal era.'},
  {id:'industrial',label:'Industriezeitalter / 19. Jahrhundert',text:'An industrial-era society, broadly inspired by the nineteenth century.'},
  {id:'present',label:'Gegenwart',text:'A contemporary era.'},
  {id:'future',label:'Zukunft',text:'A future era.'},
  {id:'timeless',label:'Mythische Zeit',text:'Mythic time, not a real-world calendar.'},
  {id:'other',label:'Eigene Festlegung',text:'Use the custom era specified below.'},
 ]},
 {key:'technology',config:'worldTechnology',label:'Technik',options:[
  {id:'minimal',label:'Sehr einfache Technik',text:'Simple tools; no firearms or industrial machinery.'},
  {id:'preindustrial',label:'Vorindustriell',text:'Preindustrial tools, transport and weapons; no modern firearms or electronics.'},
  {id:'industrial',label:'Industriezeit und frühe Schusswaffen',text:'Industrial-era tools and transport with firearms; no modern digital networks.'},
  {id:'modern',label:'Heutige Technik',text:'Contemporary technology, communications, transport and firearms.'},
  {id:'advanced',label:'Hochtechnologie',text:'Advanced networks, cybertechnology and automation, with concrete access and range limits.'},
  {id:'space',label:'Raumfahrt',text:'Space travel and advanced technology with defined capabilities and limits.'},
  {id:'other',label:'Eigene Festlegung',text:'Use the custom technology specified below.'},
 ]},
 {key:'powers',config:'worldPowers',label:'Magie und besondere Kräfte',options:[
  {id:'none',label:'Keine übernatürlichen Kräfte',text:'No supernatural powers.'},
  {id:'limited',label:'Magie vorhanden · Verbreitung offen',text:'Limited supernatural powers; establish effects, costs and limits before use.'},
  {id:'common',label:'Verbreitete Magie / besondere Kräfte',text:'Supernatural powers are widespread, but have concrete limits and costs.'},
  {id:'divine',label:'Götter prägen die Welt',text:'Gods, cults and divine powers shape the world; distinguish belief, divine action and mortal knowledge.'},
  {id:'other',label:'Eigene Festlegung',text:'Use the custom powers and limits specified below.'},
 ]},
];
export const worldPlayerKinds=[
 {id:'mortal',label:'Sterbliche Figur',text:'Player characters are mortal; special abilities require agreed effects, costs and limits.'},
 {id:'demigod',label:'Halbgöttliche Figur',text:'A demigod character is possible only with bounded starting abilities agreed before play; ancestry grants no unlimited powers.'},
 {id:'god',label:'Göttliche Figur mit vereinbarten Grenzen',text:'A divine character requires a bounded playable scale and agreed starting abilities before play; no omnipotence or automatic success.'},
];
export const worldTemplates=[
 {id:'fantasy',label:'Fantasy',text:'Fantasy: an independent world with diverse species and cultures.',era:'medieval',technology:'preindustrial',powers:'limited',society:'Independent cultures, communities and realms; no known franchise.',mythology:''},
 {id:'cyberpunk',label:'Cyberpunk',text:'Cyberpunk: advanced technology, inequality and contested power.',era:'future',technology:'advanced',powers:'none',society:'Concentrated corporate power, inequality, public institutions and urban communities with competing interests.',mythology:''},
 {id:'scifi',label:'Science-Fiction / Weltraum',text:'Science fiction: space travel and future societies.',era:'future',technology:'space',powers:'none',society:'Planets, settlements and different cultures with distinct interests; no known franchise.',mythology:''},
 {id:'historical',label:'Historisches Abenteuer',text:'Historical adventure: a real-world era and region.',era:'industrial',technology:'industrial',powers:'none',society:'A European region by default; custom region, date and historical accuracy may be specified.',mythology:''},
 {id:'modern',label:'Gegenwart',text:'Contemporary world: present-day people and institutions.',era:'present',technology:'modern',powers:'none',society:'A fictional present-day place with plausible institutions and everyday life.',mythology:''},
 {id:'western',label:'Wilder Westen',text:'Western: frontier life, disputed authority and firearms.',era:'industrial',technology:'industrial',powers:'none',society:'An independent frontier with settlements, trade, migration and disputed authority; varied communities and interests, without reducing cultures to stereotypes.',mythology:''},
 {id:'japan',label:'Feudales Japan',text:'Feudal Japan: Japanese history and culture with feudal power structures.',era:'medieval',technology:'preindustrial',powers:'none',society:'Japanese regional communities, warrior houses and competing loyalties. Use Sengoku-era Japan if the era is unchanged; period-appropriate matchlock firearms may exist. Explicit adaptations replace these assumptions.',mythology:''},
 {id:'mythology',label:'Mythologische Götterwelt',text:'Mythological world: gods and mortals in a myth-shaped society.',era:'ancient',technology:'preindustrial',powers:'divine',society:'Cultures, religious life and divine interests reflect the selected pantheon without dictating player choices.',mythology:'Greek mythology; variants may differ. Another or invented pantheon can replace it.'},
 {id:'postapocalyptic',label:'Endzeit',text:'Post-apocalyptic world: life after a major collapse.',era:'future',technology:'modern',powers:'none',society:'Communities rebuild amid uneven access to surviving technology; the cause of collapse and surviving cultures can be specified.',mythology:''},
 {id:'custom',label:'Eigene Welt',text:'Custom world: use the supplied world specifications.',era:'other',technology:'other',powers:'other',society:'Use the custom description.',mythology:''},
];
export const worldTextFields=['worldReference','worldDescription','worldSociety','worldMythology'];
function textField(c,key) {
 const v=c[key];if(v===undefined)return '';
 if(typeof v!=='string')throw new Error('Weltangaben müssen Text sein.');return v.trim();
}
function choice(list,id,label) {const item=list.find(x=>x.id===id);if(!item)throw new Error(`Ungültige Weltangabe: ${label}`);return item;}
export function resolveWorld(config) {
 const template=choice(worldTemplates,config.setting,'Vorlage');
 const source=choice(worldSources,config.worldSource||'original','Grundlage');
 const world={template:template.id,source:source.id,reference:source.id==='original'?'':textField(config,'worldReference'),description:textField(config,'worldDescription'),society:textField(config,'worldSociety')||template.society,mythology:textField(config,'worldMythology')||(template.id==='mythology'?template.mythology:''),playerKind:config.worldPlayerKind||'mortal'};
 choice(worldPlayerKinds,world.playerKind,'Figurenart');
 for(const f of worldFields)world[f.key]=choice(f.options,config[f.config]||template[f.key],f.label).id;
 if(template.id==='custom'&&!world.description)throw new Error('Bitte beschreibe deine eigene Welt. Ein kurzer Satz genügt.');
 if(source.id!=='original'&&!world.reference)throw new Error('Bitte Vorbild oder bekanntes Universum und gewünschte Einflüsse beziehungsweise Abweichungen angeben.');
 if(template.id!=='custom'&&worldFields.some(f=>world[f.key]==='other')&&!world.description)throw new Error('Bitte die eigene Festlegung unter weiteren Weltvorgaben beschreiben.');
 world.warnings=worldWarnings(world);
 if(config.worldMixConfirmed!==undefined&&![false,true,'yes'].includes(config.worldMixConfirmed))throw new Error('Ungültige Bestätigung der Weltmischung.');
 world.mixed=world.warnings.length>0;
 world.mixConfirmed=config.worldMixConfirmed===true||config.worldMixConfirmed==='yes';
 return world;
}
export function worldWarnings(w) {
 const out=[];
 if(w.template==='cyberpunk'&&(!['advanced','space'].includes(w.technology)||['ancient','medieval','industrial'].includes(w.era)||w.powers!=='none'))out.push('Cyberpunk setzt normalerweise Zukunft und Hochtechnologie voraus. Diese Auswahl ist eine alternative Weltmischung.');
 if(w.template==='scifi'&&w.technology!=='space')out.push('Die Weltraumvorlage setzt Raumfahrt voraus. Mit dieser Technik entsteht eine bewusst andere Science-Fiction-Welt.');
 if(w.template==='western'&&(!['industrial','modern'].includes(w.technology)||['ancient','medieval','future','timeless'].includes(w.era)))out.push('Klassischer Wilder Westen verbindet Grenzgesellschaften mit Schusswaffen und dem 19. Jahrhundert. Diese Auswahl weicht davon ab, etwa als Weltraumwestern.');
 if(w.template==='japan'&&(['present','future'].includes(w.era)||['modern','advanced','space'].includes(w.technology)))out.push('Feudales Japan wird hier mit einer anderen Epoche oder fortgeschrittener Technik verbunden. Das ist eine alternative Weltmischung.');
 if(w.template==='historical'&&(['future','timeless'].includes(w.era)||['advanced','space'].includes(w.technology)||w.powers!=='none'))out.push('Die historische Vorlage wird durch diese Angaben zur alternativen Geschichte oder historischen Fantasy.');
 if(w.template==='mythology'&&w.powers==='none')out.push('Ohne übernatürliche Kräfte wird die Götterwelt zu einer Welt mit Religion und Mythen, ohne nachweisbare göttliche Eingriffe.');
 if(!out.length&&['ancient','medieval'].includes(w.era)&&['industrial','modern','advanced','space'].includes(w.technology))out.push('Die gewählte Epoche und der technische Entwicklungsstand bilden eine alternative Geschichte. Bitte diese Mischung bewusst bestätigen.');
 if(w.playerKind!=='mortal'&&w.powers==='none')throw new Error('Eine göttliche oder halbgöttliche Spielfigur widerspricht „keine übernatürlichen Kräfte“. Bitte Kräfte oder Figurenart ändern.');
 if(w.playerKind==='god')out.push('Göttliche Figuren benötigen vereinbarte Grenzen für unser W20-System. Die Spielleitung muss diese vor dem Auftakt mit dir festlegen.');
 return out;
}
export function validateWorld(config) {
 const world=resolveWorld(config);
 if(world.mixed&&!world.mixConfirmed)throw new Error(world.warnings.join(' ')+' Bitte die bewusste Mischung bestätigen oder die Angaben ändern.');
 return world;
}
export function worldText(w,{legacy=false}={}) {
 const template=choice(worldTemplates,w.template,'Vorlage');
 const powers={
  limited:'Supernatural powers exist; their prevalence and world-scale strength may be established in play. Individual abilities use their agreed effects, costs and limits.',
  common:'Supernatural powers are widespread. Prevalence does not determine their strength; individual abilities use their agreed effects, costs and limits.',
 };
 const kinds={
  mortal:'The character starts mortal; later changes of nature or abilities require agreed development.',
  demigod:'The character starts as a demigod with agreed abilities; ancestry alone grants no additional powers.',
  god:'The character starts as a deity at an agreed playable scale with defined abilities.',
 };
 return [
  `World template: ${template.text.split(':')[0]}. ${w.mixed?'Deliberate hybrid; the effective specifications below replace conflicting template assumptions.':template.text}`,
  choice(worldSources,w.source,'Grundlage').text,
  w.reference&&`Reference and requested influences/deviations:\n${w.reference}`,
  ...worldFields.map(f=>`${f.key[0].toUpperCase()+f.key.slice(1)}: ${!legacy&&f.key==='powers'&&powers[w.powers] || choice(f.options,w[f.key],f.label).text}`),
  ['advanced','space'].includes(w.technology)&&'Cyberware: concrete functions, costs and access/range limits; bonuses count as equipment.',
  `Society and place: ${w.society}`,
  w.mythology&&`Mythology: ${w.mythology}`,
  legacy?choice(worldPlayerKinds,w.playerKind,'Figurenart').text:kinds[w.playerKind],
  w.description&&`World description (user specifications):\n${w.description}`,
  !legacy&&worldPresence(w),
  legacy?'Explicit custom specifications replace conflicting template defaults. Preserve other compatible assumptions. Resolve contradictions between explicit specifications before play; never silently ignore one. A calendar date alone does not define technology.':'The effective specifications above define this world. User adaptations replace conflicting template suggestions. Clarify contradictions between explicit specifications before play.',
 ].filter(Boolean).join('\n\n');
}
export function worldRules(world,{legacy=true}={}) {
 const rules=[];
 if(world.powers==='none')rules.push('No supernatural abilities.');
 else rules.push(legacy ? 'Special powers: agree effects, costs and limits before play; magic users start with three resource points. No universal problem-solving powers.' : 'Special powers: express the requested character concept and power scale with effective abilities, including damaging powers when fitting. Define effects, costs and limits before play. Three resource points are the default proposal, not a limit on the potency of a power or on later development. Agree any necessary deviation before confirming the sheet.');
 return rules.join(' ');
}

function worldPresence(world) {
 const identities={
 fantasy:'Make fantasy present throughout the campaign: magical practices, nonhuman peoples, creatures and extraordinary places shape opportunities, institutions and dangers according to the effective specifications and explicit exclusions. A medieval era does not reduce this world to mundane village life. The character’s starting abilities do not cap the powers or creatures that exist elsewhere.',
 mythology:'Let the selected mythology shape places, interests and extraordinary encounters in play; divine rivalries, sacred obligations and mythic beings can create playable opportunities beyond historical scenery.',
 cyberpunk:'Make technology, unequal access, surveillance, bodily augmentation and competing institutions create usable opportunities and consequences, not merely neon scenery.',
 scifi:'Make space, unfamiliar environments, scientific discoveries and distinct societies affect choices; travel and technology have their established capabilities, not arbitrary obstacles.',
 historical:'Make the selected period and region matter through institutions, customs, material conditions and competing interests; avoid treating every historical society as the same medieval village.',
 modern:'Make contemporary institutions, communication, transport and social relationships affect available actions and consequences rather than importing feudal assumptions.',
 western:'Make frontier distances, uncertain authority, community interests and firearms shape opportunities; do not reduce every journey to a wagon repair or toll dispute.',
 japan:'Make the selected Japanese period, local communities, obligations and warrior houses shape choices without prescribing obedience, duels or a single plot.',
 postapocalyptic:'Make the established collapse, ecology, surviving communities and uneven supplies consequential. Distinguish salvage from working transport; scarcity is not an obligation to repeat the same ambush.',
 custom:'Derive distinctive playable opportunities from the supplied world instead of imposing another template.',
 };
 const presence=world.powers==='none'
  ? 'Build compatible cultures, environments and institutions while respecting the exclusion of supernatural powers; do not turn belief into demonstrated divine intervention.'
  : ['limited','common','divine'].includes(world.powers)?'Supernatural powers are part of this selected world. Give them concrete playable presence in later adventures as well as the opening, not only rumours. Match their agreed prevalence; distinguish actual effects, testimony and belief. No encounter quota or automatic powers for the hero.':'Apply the explicitly supplied power specifications without assuming supernatural effects.';
 const identity=world.powers==='none'&&['fantasy','mythology'].includes(world.template)?'Let the selected world shape peoples, beliefs, landscapes and unusual places without supernatural events.':identities[world.template];
 return identity+' '+presence+' Explicit world adaptations and exclusions override incompatible suggestions; develop circumstances, not a prescribed sequence.';
}
