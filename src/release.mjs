// Generator release and expected rules are separate from the character schema.
export const GENERATOR_VERSION = '0.15.0';
export const RULES_VERSION = '0.15.0';
export function showRelease(element, context) {
 if(!element)return;
 element.textContent=`${context} · Generator ${GENERATOR_VERSION} · Ziel-Regeln ${RULES_VERSION}`;
 element.title='Stand dieser Seite und erwartete Plugin-Regeln. Der tatsächlich im Spielchat geladene Pluginstand wird hier nicht geprüft.';
}
