import {showRelease} from './release.mjs';
import {mountCharacterEditor} from './character-editor.mjs';
mountCharacterEditor(document.querySelector('#character-editor'));

showRelease(document.querySelector('#release-info'),'Charakterbogen');
