import {attachNarration,stopGuideNarration} from './shared/guide-narration.js?v=1.3.0';
const escape=value=>String(value??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
export function mountGuide(lesson){
 const steps=lesson.sections;
 if(!steps.length||steps.some(s=>s.kind!=='html'))throw new Error('Guides must contain instruction pages only.');
 document.title=lesson.title;
 document.body.innerHTML=`<div class="fm-shell fm-clean-step fm-persistent-navigation"><header class="fm-topbar guide-header"><a class="fm-brand-title" href="#${escape(steps[0].id)}"><small>${escape(lesson.subject||'Technology')}</small><strong class="fm-activity-title">${escape(lesson.shortTitle||lesson.title)}</strong></a><details class="fm-menu"><summary>Steps</summary><nav aria-label="Guide steps">${steps.map((s,i)=>`<a href="#${escape(s.id)}" data-step="${escape(s.id)}">${i+1}. ${escape(s.short||s.title)}</a>`).join('')}</nav></details></header><main id="fm-main" class="fm-reading-width" tabindex="-1"></main><nav class="fm-pager fm-step-bar" aria-label="Step navigation"></nav></div>`;
 const main=document.querySelector('#fm-main'),menu=document.querySelector('.fm-menu'),pager=document.querySelector('.fm-step-bar');
 function render(focus=false){
  stopGuideNarration();
  const id=location.hash.slice(1);let index=steps.findIndex(s=>s.id===id);
  if(index<0){index=id==='review'?steps.length-1:0;history.replaceState(null,'','#'+steps[index].id);}
  const step=steps[index];
  main.innerHTML=`<header class="fm-hero"><h1>${escape(step.title)}</h1></header>${step.narration?'<div class="fm-reading-tools"><button type="button" id="fm-read-aloud" class="fm-button quiet" aria-pressed="false">Read aloud</button><span id="fm-reading-status" role="status"></span></div>':''}${step.html}`;
  pager.innerHTML=`${index?`<a class="previous" href="#${escape(steps[index-1].id)}">← Previous step</a>`:'<span class="fm-nav-placeholder"></span>'}<span class="fm-step-count">Step ${index+1} of ${steps.length}</span>${index<steps.length-1?`<a class="next" href="#${escape(steps[index+1].id)}">Next step →</a>`:'<span class="fm-nav-placeholder"></span>'}`;
  menu.querySelectorAll('a').forEach(a=>{if(a.dataset.step===step.id)a.setAttribute('aria-current','step');else a.removeAttribute('aria-current');});
  menu.open=false;
  if(step.narration)attachNarration(document.querySelector('#fm-read-aloud'),document.querySelector('#fm-reading-status'),step.narration);
  window.scrollTo(0,0);if(focus)main.focus({preventScroll:true});
 }
 window.addEventListener('hashchange',()=>render(true));
 document.addEventListener('keydown',event=>{if(event.key==='Escape')menu.open=false;});
 render();
}
