import {stepAliases} from './step-aliases.js?v=1.7.0';
import {attachNarration,stopGuideNarration} from './shared/guide-narration.js?v=1.7.0';
const escape=value=>String(value??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
export function mountGuide(lesson){
 const steps=lesson.sections;
 if(!steps.length||steps.some(s=>s.kind!=='html'))throw new Error('Guides must contain instruction pages only.');
 document.title=lesson.title;
 document.body.innerHTML=`<div class="fm-shell fm-clean-step fm-persistent-navigation"><header class="fm-topbar guide-header"><a class="fm-brand-title" href="#${escape(steps[0].id)}"><small>${escape(lesson.subject||'Technology')}</small><strong class="fm-activity-title">${escape(lesson.shortTitle||lesson.title)}</strong></a><details class="fm-menu"><summary>Steps</summary><nav aria-label="Guide steps">${steps.map((s,i)=>`<a class="guide-step-link" href="#${escape(s.id)}" data-step="${escape(s.id)}"><span class="guide-step-number">${i+1}</span><span>${escape(s.short||s.title)}</span></a>`).join('')}</nav></details></header><main id="fm-main" class="fm-reading-width" tabindex="-1"></main><nav class="fm-pager fm-step-bar" aria-label="Step navigation"></nav></div>`;
 const main=document.querySelector('#fm-main'),menu=document.querySelector('.fm-menu'),pager=document.querySelector('.fm-step-bar');
 function render(focus=false){
  stopGuideNarration();
  const requested=location.hash.slice(1),id=stepAliases[requested]||requested;
  if(id!==requested)history.replaceState(null,'','#'+id);
  let index=steps.findIndex(s=>s.id===id);
  if(index<0){index=id==='review'?steps.length-1:0;history.replaceState(null,'','#'+steps[index].id);}
  const step=steps[index];
  main.innerHTML=`<header class="fm-hero"><h1>${escape(step.title)}</h1></header>${step.narration?'<div class="fm-reading-tools"><button type="button" id="fm-read-aloud" class="fm-button quiet" aria-pressed="false">Read aloud</button><span id="fm-reading-status" role="status"></span></div>':''}${step.html}`;
  main.querySelector('.copy-code')?.addEventListener('click',async event=>{
   const panel=event.currentTarget.closest('.complete-code'),text=panel.querySelector('code').textContent,status=panel.querySelector('.copy-status');
   try{await navigator.clipboard.writeText(text);status.textContent='Copied. Replace the whole MakeCode JavaScript editor.';}catch{const range=document.createRange();range.selectNodeContents(panel.querySelector('code'));const selection=window.getSelection();selection.removeAllRanges();selection.addRange(range);status.textContent='Code selected. Press Ctrl+C or Command+C to copy.';}
  });
  pager.innerHTML=`${index?`<a class="previous" href="#${escape(steps[index-1].id)}">← Previous step</a>`:'<span class="fm-nav-placeholder"></span>'}<span class="fm-step-count">Step ${index+1} of ${steps.length}</span>${index<steps.length-1?`<a class="next" href="#${escape(steps[index+1].id)}">Next step →</a>`:'<span class="fm-nav-placeholder"></span>'}`;
  menu.querySelectorAll('a').forEach(a=>{if(a.dataset.step===step.id)a.setAttribute('aria-current','step');else a.removeAttribute('aria-current');});
  menu.open=false;
  if(step.narration)attachNarration(document.querySelector('#fm-read-aloud'),document.querySelector('#fm-reading-status'),step.narration);
  window.scrollTo(0,0);if(focus)main.focus({preventScroll:true});
 }
 window.addEventListener('hashchange',()=>render(true));
 menu.addEventListener('toggle',()=>{if(menu.open){const active=menu.querySelector('[aria-current=step]'),nav=menu.querySelector('nav');if(active)nav.scrollTop=Math.max(0,active.offsetTop-nav.clientHeight/2);}});
 document.addEventListener('keydown',event=>{if(event.key==='Escape'){menu.open=false;menu.querySelector('summary').focus();}});
 document.addEventListener('click',event=>{if(!menu.contains(event.target))menu.open=false;});
 render();
}
