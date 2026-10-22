export const characterMarkup = `
  <div class="character-actions">
   <button id="character-new" type="button" class="quiet">Neuen Startbogen anlegen</button>
   <button id="character-continue" type="button" class="quiet" disabled>Als aktuellen Bogen weiterführen</button>
  </div>
  <details class="character-panel">
   <summary>Aus Kurzbeschreibung mit einer beliebigen KI erstellen</summary>
   <label for="character-idea">Figurenidee</label><textarea id="character-idea" rows="3" placeholder="Zum Beispiel: Eine reisende Magierin, deren Feuerzauber im Kampf gefährlich sind. Herkunft und Ziele bleiben offen."></textarea>
   <p>Beschreibe auch die gewünschte Macht und wichtige Einsatzmöglichkeiten. Kräfte dürfen gefährlich sein; Wirkung, Kosten und Folgen werden im Entwurf festgelegt.</p>
   <label for="character-world">Weltvorgaben aus deinem Abenteuerprofil</label><textarea id="character-world" rows="3"></textarea>
   <label for="character-template">Prompt-Template</label><textarea id="character-template" readonly rows="8"></textarea>
   <button id="copy-template" type="button" class="primary">Template kopieren</button>
   <p>In einer beliebigen KI senden. Deren JSON-Antwort unten importieren. Hier wird keine KI aufgerufen; es werden keine API-Schlüssel benötigt.</p>
  </details>
  <details class="character-panel" id="character-import-panel">
   <summary>JSON importieren</summary>
   <label for="character-file">JSON-Datei auswählen (bis 1 MB)</label><input id="character-file" type="file" accept=".json,application/json">
   <label for="character-import">Oder JSON einfügen</label><textarea id="character-import" rows="6" spellcheck="false"></textarea>
   <button id="import-character" type="button" class="primary">JSON prüfen und importieren</button>
   <p id="import-status" role="status" aria-live="polite">Ein Import ersetzt den bearbeiteten Bogen erst nach erfolgreicher Prüfung.</p>
  </details>
  <div class="character-grid">
   <section class="character-panel" aria-labelledby="character-title">
    <h2 id="character-title">Startbogen bearbeiten</h2>
    <p id="character-kind-help">Start: Attribute −1 bis +3, Summe +5; zwei Talente, situative Schwäche, 10 LP und acht Tragplätze.</p>
    <form id="character-fields" novalidate></form>
    <label class="confirm-character"><input id="character-confirmed" type="checkbox"> Ich habe diesen Bogen geprüft und bestätige ihn.</label>
    <p>Eine Änderung hebt die Bestätigung wieder auf. Zahlen lassen sich prüfen; passende Fähigkeiten, Schwächen und Hintergrundangaben prüfst du selbst.</p>
   </section>
   <section class="character-panel" aria-labelledby="character-preview-title">
    <h2 id="character-preview-title">Prüfung und Ausgabe</h2>
    <p id="character-status" role="status" aria-live="polite"></p><ul id="character-errors"></ul>
    <label for="character-preview">Lesbarer Bogen für den Spielchat</label><textarea id="character-preview" readonly rows="15"></textarea>
    <div class="character-actions"><button id="copy-character" class="primary" type="button" disabled>Bogen kopieren</button><button id="download-character-text" class="quiet" type="button" disabled>Text herunterladen (.md)</button><button id="download-character-json" class="quiet" type="button" disabled>Bearbeitbaren Bogen herunterladen (.json)</button></div>
    <details><summary>JSON-Ausgabe</summary><textarea id="character-json" readonly rows="10" aria-label="JSON-Ausgabe"></textarea></details>
    <details id="character-original-panel" hidden><summary>Ursprünglicher Startbogen (unverändert)</summary><textarea id="character-original" readonly rows="10" aria-label="Ursprünglicher Startbogen"></textarea></details>
   </section>
  </div>
`;
