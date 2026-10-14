import { mountFoundationModule } from './shared/foundation-module.js?v=3.1.1';
import { lesson } from './lesson.js?v=3.1.1';
import { validateLesson } from './validate.js?v=3.1.1';
validateLesson(lesson);
document.title = lesson.title;
mountFoundationModule(lesson);
