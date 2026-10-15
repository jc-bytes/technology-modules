import {explanationStep} from '../step-patterns.js?v=1.0.0';
import {spec} from '../lesson-data.js?v=1.0.0';
const s=spec.steps.find(s=>s.kind==='form');
export const explain=explanationStep({...s,short:'Your reason',plainLanguage:'Choose contacts or ad sharing. Explain your choice using the notice.'});
