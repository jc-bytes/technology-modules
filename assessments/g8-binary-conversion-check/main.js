import {lesson} from './lesson.js?v=natural-binary-2';
import {validateLesson} from './validate.js?v=natural-binary-2';
import {mountFoundationModule} from './shared/foundation-module.js?v=natural-binary-2';
validateLesson(lesson);document.title=lesson.title;mountFoundationModule(lesson);
