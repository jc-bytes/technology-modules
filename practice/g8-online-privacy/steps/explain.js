import {explanationStep} from '../step-patterns.js?v=1.0.0';
import {contacts} from '../content.js?v=1.0.0';
export const explain=explanationStep({id:'privacy-reason',title:'Explain one privacy choice',short:'Your reason',table:contacts,question:'Why should Alex refuse PuzzlePop’s request for contacts?',fieldId:'privacy-reason-v1',help:'Write one short sentence. You may say it aloud before typing.',plainLanguage:'Does a number puzzle need a phone contact list? Explain your choice.',starter:'Alex should refuse because ___.'});
