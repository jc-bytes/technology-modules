import {lesson} from './lesson.js?v=filled-pdf-tables-4';
import {validateLesson} from './validate.js?v=filled-pdf-tables-4';
import {mountFoundationModule} from './shared/foundation-module.js?v=filled-pdf-tables-4';
validateLesson(lesson);document.title=lesson.title;mountFoundationModule(lesson);
