import {choiceStep} from '../step-patterns.js?v=1.0.0';
import {contacts} from '../content.js?v=1.0.0';
export const contactChoice=choiceStep({id:'contacts-choice',title:'A puzzle and your contacts',short:'Contacts',activityTitle:'Choose one answer',table:contacts,question:'PuzzlePop asks Alex for all saved contacts. What is the best choice?',options:['Allow it because every app needs contacts','Do not allow it; the puzzle gives no reason to need contacts','Post the contacts publicly'],answer:1,hint:'Playing a number puzzle does not require a phone contact list.',stage:'independent'});
