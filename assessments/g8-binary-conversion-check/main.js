import {lesson} from './lesson.js?v=power-boxes-1';
import {validateLesson} from './validate.js?v=power-boxes-1';
import {mountFoundationModule} from './shared/foundation-module.js?v=power-boxes-1';
validateLesson(lesson);document.title=lesson.title;mountFoundationModule(lesson);
