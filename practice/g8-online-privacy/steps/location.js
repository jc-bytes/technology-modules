import {choiceStep} from '../step-patterns.js?v=1.0.0';
import {location} from '../content.js?v=1.0.0';
export const locationChoice=choiceStep({id:'location-choice',title:'Who sees a public post?',short:'Public post',activityTitle:'Choose one answer',table:location,question:'Which change best protects Alex’s location privacy?',options:['Share the exact live location with everyone','Add Alex’s home address','Remove the exact live location from the public post'],answer:2,hint:'Everyone can see a public post. Avoid revealing where Alex is right now.',stage:'independent'});
