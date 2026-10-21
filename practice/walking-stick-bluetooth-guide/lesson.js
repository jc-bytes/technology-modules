import {singleActionLesson} from './step-flow.js?v=1.0.0';
import {site} from './site.js?v=1.0.0';
import {buildSteps} from './steps/build-data.js?v=1.0.0';
import {narrationFiles} from './narration-manifest.js?v=1.0.0';
import {choiceStep,explanationStep} from './step-patterns.js?v=1.0.0';
const e=value=>String(value??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
function context(s){return `<div class="build-copy"><p class="build-where">${e(s.where||'In this guide')}</p>${s.why?`<p class="build-why">${e(s.why)}</p>`:''}${s.image?`<figure class="build-picture"><img src="${e(s.image)}" alt="${e(s.alt||s.title)}"></figure>`:''}${s.code?`<pre class="guide-code"><code>${e(s.code)}</code></pre>`:''}</div>`;}
function render(s){
 if(s.kind==='review')return {...s,short:'Your answers',stage:'review'};
 if(s.kind==='check'){const page=choiceStep({id:s.id,title:s.title,short:s.title,question:s.question,options:s.options,answer:s.answer,hint:s.hint,stage:s.stage||'practice'});page.items[0].visual='<div class="choice-context">'+context(s)+'</div>';page.pdf.prompt=[s.why,s.question].filter(Boolean).join(" ");return page;}
 if(s.kind==='response')return {...explanationStep({id:s.id,title:s.title,short:s.title,question:s.question,fieldId:'response',starter:s.starter,plainLanguage:s.plainLanguage,help:s.help||'Write your actual observation. If the test did not run, write Test not run.',stage:s.stage||'practice'}),stage:s.stage||'practice',intro:context(s),pdf:{prompt:[s.why,s.question].filter(Boolean).join(' '),items:[{type:'response',label:s.question,source:{kind:'field',name:'response'}}]}};
 const image=s.image?`<figure class="build-picture"><img src="${e(s.image)}" alt="${e(s.alt||s.title)}"><figcaption><a href="${e(s.image)}" target="_blank" rel="noopener">Open picture full size</a></figcaption></figure>`:'';
 const code=s.code?`<pre class="guide-code" aria-label="Code for this step"><code>${e(s.code)}</code></pre>`:'';
 const links=(s.links||[]).map(([label,url])=>`<a class="resource-link" href="${e(url)}" ${url.startsWith('http')||url.endsWith('/')?'target="_blank" rel="noopener"':'download'}>${e(label)}</a>`).join('');
 return {id:s.id,title:s.title,short:s.title,kind:'html',stage:s.stage||(s.id==='goal'||s.id==='energy-path'?'model':'guided'),html:`<div class="build-step ${image||code?'with-picture':''}"><div class="build-copy"><p class="build-where">${e(s.where)}</p><p class="build-why">${e(s.why)}</p><p class="build-action">${e(s.do)}</p><p class="build-result"><strong>Check:</strong> ${e(s.expected)}</p>${s.help?`<details><summary>Help if you get stuck</summary><p>${e(s.help)}</p></details>`:''}${links?`<div class="build-links">${links}</div>`:''}</div>${image||code}</div>`};
}
export const lesson=singleActionLesson({...site,sections:buildSteps.map(s=>({...render(s),narration:narrationFiles[s.id]}))});
