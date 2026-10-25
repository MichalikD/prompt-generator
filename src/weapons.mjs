// Creation proposals, never inferred from an existing item's name.
export const damageBands = Object.freeze({
 light:{label:'Leicht',base:2,die:4}, ordinary:{label:'Gewöhnlich',base:3,die:6}, heavy:{label:'Schwer',base:4,die:8},
});
export const emptyWeapon = () => ({damage:'ordinary',range:'',handling:'',feature:'',limits:''});
export const weaponPresets = Object.freeze({
 sword:{label:'Schwert',damage:'ordinary',range:'Nahkampf 1–2 m',handling:'Eine Hand; Platz zum Schwingen nötig.',feature:'Auch zum bewaffneten Nahkampf in einer freien Hand geeignet.',limits:'Kein Fernangriff; eine zweite Waffe gibt keinen zusätzlichen Angriff.'},
 dagger:{label:'Dolch',damage:'light',range:'Nahkampf 1 m',handling:'Eine Hand; in engem Raum nutzbar, leicht zu verbergen.',feature:'Kann auch bei wenig Platz eingesetzt werden.',limits:'Kurze Reichweite; kein automatischer Treffer aus dem Hinterhalt.'},
 bow:{label:'Bogen',damage:'ordinary',range:'Bis 40 m normal; über 40 bis 80 m Nachteil; darüber kein wirksamer Angriff.',handling:'Zwei Hände; Platz zum Spannen, ein Pfeil je Angriff.',feature:'Ohne Schussknall; geeigneter Pfeil kann nach der Szene geborgen werden.',limits:'Mit einem unmittelbar bedrohenden Nahkämpfer Nachteil. Keine lautlose Trefferwirkung garantiert.'},
 pistol:{label:'Pistole',damage:'ordinary',range:'Bis 20 m normal; über 20 bis 40 m Nachteil; darüber kein wirksamer Angriff.',handling:'Eine Hand; auch in engem Raum nutzbar.',feature:'Die zweite Hand bleibt für Halten oder eine beiläufige Interaktion frei.',limits:'Munition und Schussknall; unter unmittelbarem Nahkampfdruck Nachteil.'},
 shotgun:{label:'Schrotflinte',damage:'heavy',range:'Bis 10 m normal; über 10 bis 20 m Nachteil; darüber kein wirksamer Angriff.',handling:'Zwei Hände; sperrig. Vorschlag: zwei Schüsse, dann eine Aktion nachladen.',feature:'Hoher Schaden auf kurze Distanz; ein Angriff auf ein Ziel, keine kostenlose Fläche.',limits:'Benötigt passende Munition und Platz zum Ausrichten; unter unmittelbarem Nahkampfdruck Nachteil.'},
 rifle:{label:'Gewehr',damage:'heavy',range:'Bis 80 m normal; über 80 bis 160 m Nachteil; darüber kein wirksamer Angriff.',handling:'Zwei Hände; sperrig, eine Patrone je Angriff.',feature:'Wirksame Distanz für eine gedeckte Schussposition.',limits:'Nachteil unter unmittelbarem Nahkampfdruck oder ohne Platz für die lange Waffe; Schussknall.'},
 automatic:{label:'Automatische Waffe',damage:'ordinary',range:'Bis 40 m normal; über 40 bis 80 m Nachteil; darüber kein wirksamer Angriff.',handling:'Zwei Hände; sperrig. Einzelschuss oder Niederhalten als Aktion.',feature:'Niederhalten: drei Patronen, eine sichtbare Person oder ein enger Durchgang in normaler Reichweite. Bis zum nächsten eigenen Zug haben Angriffe der erfassten Person durch den bestrichenen Bereich Nachteil, solange sie dort offen steht. Im bestrichenen Durchgang gilt das auch für eintretende Verbündete. Kein Schaden und keine zusätzliche Angriffsprobe.',limits:'Volle Deckung schützt; kein Umgehen von Hindernissen, kein Flächenschaden oder freier Mehrfachangriff. Unter unmittelbarem Nahkampfdruck Nachteil; Munitionsverbrauch und Lärm.'},
});
export function weaponFromPreset(id){
 const preset=Object.hasOwn(weaponPresets,id)?weaponPresets[id]:null;if(!preset)throw new Error('Unbekannte Waffenvorlage.');
 const {label,...profile}=preset;return structuredClone(profile);
}
export function weaponProfileText(profile,{english=false}={}){
 if(!profile)return '';
 const band=damageBands[profile.damage];if(!band)throw new Error('Unbekannte Schadensklasse.');
 return english
  ? `Weapon profile — Damage: ${profile.damage} ${band.base}; D${band.die} only if selected. Range: ${profile.range}\nHandling: ${profile.handling}\nTrait: ${profile.feature}\nLimits: ${profile.limits}`
  : `Waffenprofil · Schaden: ${band.label} ${band.base}; W${band.die} nur wenn ausgewählt.\nReichweite: ${profile.range}\nHandhabung: ${profile.handling}\nBesonderheit: ${profile.feature}\nGrenzen: ${profile.limits}`;
}
