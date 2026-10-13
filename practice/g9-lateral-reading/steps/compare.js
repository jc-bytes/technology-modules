import {repeatedSources} from '../content.js';import {choiceStep} from '../step-patterns.js';
export const compare=choiceStep({id:'compare',title:'Reposts are not new evidence',short:'Compare sources',activityTitle:'Trace the information',table:repeatedSources,question:'Do Pages B and C independently confirm that the rescue happened?',options:['Yes, because two pages repeat it','No, both depend on the same unverified post','Yes, if they use different titles'],answer:1,hint:'Trace each page back to the original post. Neither adds evidence.'});

