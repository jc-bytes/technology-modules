import { mountFoundationModule } from './shared/foundation-module.js?v=2.0.1';
import { lesson } from './lesson.js?v=2.0.1';
import { validateLesson } from './validate.js?v=2.0.1';
validateLesson(lesson);
try {
 if(!localStorage.getItem(lesson.storageKey)){
  const prior=JSON.parse(localStorage.getItem('formative:g7-scratch-delivery:v1') || 'null');
  if(prior?.identity)localStorage.setItem(lesson.storageKey,JSON.stringify({identity:prior.identity,identityStarted:prior.identityStarted || false}));
 }
} catch {}

document.title = lesson.title;
mountFoundationModule(lesson);
