import {choiceStep} from '../step-patterns.js?v=1.0.0';
import {spec} from '../lesson-data.js?v=1.0.0';
export const checks=spec.steps.filter(s=>s.question && s.options).map(s=>choiceStep({...s,activityTitle:s.title}));
