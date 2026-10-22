import { mountFoundationModule } from './shared/foundation-module.js?v=1.4.1';
import { lesson } from './lesson.js?v=1.4.1';
import { validateLesson } from './validate.js?v=1.4.1';
validateLesson(lesson);
document.title = lesson.title;
mountFoundationModule(lesson);
