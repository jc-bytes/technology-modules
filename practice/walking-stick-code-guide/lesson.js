import {site} from './site.js?v=1.3.0';
import {buildSteps} from './steps/build-data.js?v=1.3.0';
import {narrationFiles} from './narration-manifest.js?v=1.3.0';
const e=value=>String(value??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
function render(s){
 const image=s.image?`<figure class="build-picture"><img src="${e(s.image)}" alt="${e(s.alt||s.title)}"><figcaption><a href="${e(s.image)}" target="_blank" rel="noopener">Open picture full size</a></figcaption></figure>`:'';
 const code=s.code?`<pre class="guide-code" aria-label="Code for this step"><code>${e(s.code)}</code></pre>`:'';
 const links=(s.links||[]).map(([label,url])=>`<a class="resource-link" href="${e(url)}" ${url.startsWith('http')||url.endsWith('/')?'target="_blank" rel="noopener"':'download'}>${e(label)}</a>`).join('');
 return {id:s.id,title:s.title,short:s.title,kind:'html',stage:s.stage||'guided',narration:narrationFiles[s.id],html:`<div class="build-step ${image||code?'with-picture':''}"><div class="build-copy"><p class="build-where">${e(s.where)}</p><p class="build-why">${e(s.why)}</p><p class="build-action">${e(s.do)}</p>${s.expected?`<p class="build-result"><strong>Check:</strong> ${e(s.expected)}</p>`:''}${s.help?`<details><summary>Help if you get stuck</summary><p>${e(s.help)}</p></details>`:''}${links?`<div class="build-links">${links}</div>`:''}</div>${image||code}</div>`};
}
export const lesson={...site,sections:buildSteps.map(render)};
