import {site} from './site.js';
import {creators,reading,sources} from './steps/video-questions.js';
import {sourceOne} from './steps/source-one.js';
import {sourceTwo} from './steps/source-two.js';
import {conclusion} from './steps/conclusion.js';
import {review} from './steps/review.js';
import {lesson as previous} from './previous-lesson.js';
const sections=[creators,reading,sources,sourceOne,sourceTwo,conclusion,review];
export const lesson={...site,sections,archivedSections:previous.sections.filter(old=>!sections.some(current=>current.id===old.id)&&old.kind!=='review')};
