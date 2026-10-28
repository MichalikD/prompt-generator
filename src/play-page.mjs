import {showRelease} from './release.mjs';
import {mountPlayDesk} from './play-desk.mjs';
mountPlayDesk(document.querySelector('#play-desk'));

showRelease(document.querySelector('#release-info'),'Spielübersicht');
