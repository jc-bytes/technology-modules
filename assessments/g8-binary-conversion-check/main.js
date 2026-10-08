import {lesson} from './lesson.js';
import {validateLesson} from './validate.js';
import {mountFoundationModule} from './shared/foundation-module.js';
validateLesson(lesson);document.title=lesson.title;mountFoundationModule(lesson);
