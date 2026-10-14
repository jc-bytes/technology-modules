import {choiceStep} from '../step-patterns.js?v=1.0.0';
import {camera} from '../content.js?v=1.0.0';
export const cameraChoice=choiceStep({id:'camera-choice',title:'A camera permission',short:'Camera',activityTitle:'Choose one answer',table:camera,question:'Alex wants to take a photo in PhotoFun. Which camera permission is reasonable?',options:['Allow camera access only while using the photo tool','Allow access to every contact too','Allow the app to share every photo publicly'],answer:0,hint:'The photo tool needs the camera. Choose access limited to that task.',stage:'guided'});
