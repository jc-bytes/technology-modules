import { site } from './site.js';
import { safetyModel } from './steps/safety-model.js';
import { model } from './steps/model.js';
import { guided } from './steps/guided.js?v=20260929a';
import { compare } from './steps/compare.js';
import { explain } from './steps/explain.js';
import { independent } from './steps/independent.js';
import { priority } from './steps/priority.js';
import { review } from './steps/review.js';

export const lesson = {...site, sections: [safetyModel, guided, compare, model, explain, independent, priority, review]};
