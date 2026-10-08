import {lesson} from './lesson.js?v=supported-2';
import {validateLesson} from './validate.js?v=supported-2';
import {mountFoundationModule} from './shared/foundation-module.js?v=supported-2';
validateLesson(lesson);document.title=lesson.title;mountFoundationModule(lesson);
