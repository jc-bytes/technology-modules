import {mountFoundationModule} from './shared/foundation-module.js?v=2.0.1';
import {lesson} from './previous-lesson.js?v=2.0.1';
document.body.dataset.practicePath=location.pathname.replace(/previous.html$/,'');document.body.dataset.practiceSearch='';document.title=lesson.title;mountFoundationModule(lesson);
