import { mountFoundationModule } from './shared/foundation-module.js?v=3.2.0';
import { lesson } from './lesson.js?v=3.2.0';
import { validateLesson } from './validate.js?v=3.2.0';
validateLesson(lesson);
document.title = lesson.title;
mountFoundationModule(lesson);
