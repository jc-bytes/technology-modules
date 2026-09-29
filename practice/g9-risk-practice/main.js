import { mountFoundationModule } from './shared/foundation-module.js?v=20260929a';
import { lesson } from './lesson.js?v=20260929a';
import { validateLesson } from './validate.js';
validateLesson(lesson);
document.title = lesson.title;
mountFoundationModule(lesson);
