import {choiceStep} from '../step-patterns.js?v=1.0.0';
import {profile} from '../content.js?v=1.0.0';
export const guided=choiceStep({id:'profile-choice',title:'Protect Alex’s profile',short:'Profile',activityTitle:'Choose one answer',table:profile,question:'Which change best protects Alex’s privacy?',options:['Hide the home address and phone number','Make the nickname larger','Add more drawing tips'],answer:0,hint:'Find information that lets someone locate or contact Alex.',stage:'guided'});
