import {lesson} from './lesson.js?v=clear-questions-3';
import {validateLesson} from './validate.js?v=clear-questions-3';
import {mountFoundationModule} from './shared/foundation-module.js?v=clear-questions-3';
validateLesson(lesson);document.title=lesson.title;mountFoundationModule(lesson);
