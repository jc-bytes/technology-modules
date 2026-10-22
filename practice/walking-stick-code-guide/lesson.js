import {programCode} from './shared/walking-stick-program.js?v=1.7.0';
import {renderBlockDiagram} from './shared/walking-stick-blocks.js?v=1.7.0';
import {site} from './site.js?v=1.7.0';
import {buildSteps} from './steps/build-data.js?v=1.7.0';
import {narrationFiles} from './narration-manifest.js?v=1.7.0';
const e=value=>String(value??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
function render(s){
 const diagram=s.diagram?renderBlockDiagram(s.diagram):'';
 const image=s.image?`<figure class="build-picture"><img src="${e(s.image)}" alt="${e(s.alt||s.title)}"><figcaption><a href="${e(s.image)}" target="_blank" rel="noopener">Open picture full size</a></figcaption></figure>`:'';
 const code=s.code?`<pre class="guide-code" aria-label="Code for this step"><code>${e(s.code)}</code></pre>`:'';
 const fullCode=s.fullCode?`<details class="complete-code"><summary>Complete MakeCode JavaScript — ready to paste</summary><p>Add the Bluetooth extension first. Replace the whole JavaScript editor with this code.</p><button class="copy-code" type="button">Copy code</button><span class="copy-status" role="status"></span><pre class="guide-code"><code>${e(programCode)}</code></pre></details>`:'';
 const links=(s.links||[]).map(([label,url])=>`<a class="resource-link" href="${e(url)}" ${url.startsWith('#')?'':url.startsWith('http')||url.endsWith('/')||url.endsWith('.html')?'target="_blank" rel="noopener"':'download'}>${e(label)}</a>`).join('');
 return {id:s.id,title:s.title,short:s.title,kind:'html',stage:s.stage||'guided',narration:narrationFiles[s.id],html:`<div class="build-step ${s.wideDiagram?'ws-wide':image||code||diagram?'with-picture':''}"><div class="build-copy"><p class="build-where">${e(s.where)}</p><p class="build-why">${e(s.why)}</p><p class="build-action">${e(s.do)}</p>${s.expected?`<p class="build-result"><strong>Check:</strong> ${e(s.expected)}</p>`:''}${s.help?`<details><summary>Help if you get stuck</summary><p>${e(s.help)}</p></details>`:''}${links?`<div class="build-links">${links}</div>`:''}</div>${diagram||image||code}${fullCode}</div>`};
}
export const lesson={...site,sections:buildSteps.map(render)};
