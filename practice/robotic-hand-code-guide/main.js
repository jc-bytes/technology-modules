import { mountFoundationModule } from './shared/foundation-module.js?v=1.0.0';
import { narrationFiles } from './narration-manifest.js?v=1.0.0';
import { lesson } from './lesson.js?v=1.0.0';
import { validateLesson } from './validate.js?v=1.0.0';
validateLesson(lesson);
document.title = lesson.title;
mountFoundationModule({...lesson,narrationFiles});
