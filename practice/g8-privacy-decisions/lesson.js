import {singleActionLesson} from './step-flow.js?v=1.0.0';
import {site} from './site.js?v=1.0.0';
import {models} from './steps/models.js?v=1.0.0';
import {checks} from './steps/checks.js?v=1.0.0';
import {explain} from './steps/explain.js?v=1.0.0';
import {review} from './steps/review.js?v=1.0.0';
export const lesson=singleActionLesson({...site,sections:[...models,...checks,explain,review]});
