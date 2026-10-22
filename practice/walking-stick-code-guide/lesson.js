import {renderBlockDiagram} from './shared/walking-stick-blocks.js?v=1.9.1';
import {site} from './site.js?v=1.9.1';
import {buildSteps} from './steps/build-data.js?v=1.9.1';
import {narrationFiles} from './narration-manifest.js?v=1.9.1';
const e=value=>String(value??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
function render(s){
 const diagram=s.diagram?renderBlockDiagram(s.diagram):'';
 const image=s.image?`<figure class="build-picture"><img src="${e(s.image)}" alt="${e(s.alt||s.title)}"><figcaption><a href="${e(s.image)}" target="_blank" rel="noopener">Open picture full size</a></figcaption></figure>`:'';
 const code=s.code?`<div class="typed-snippet">${s.codeLabel?`<p>${e(s.codeLabel)}</p>`:''}<pre class="guide-code" aria-label="Code for this step"><code>${e(s.code)}</code></pre></div>`:'';
 const bluetoothLink=(s.links||[]).find(([,url])=>url==='../walking-stick-sounds/');
 const bluetoothButton=bluetoothLink?`<a class="resource-link bluetooth-site-link" href="${e(bluetoothLink[1])}" target="_blank" rel="noopener" aria-label="Open Bluetooth sound site, opens in a new tab">${e(bluetoothLink[0])} <span aria-hidden="true">↗</span></a>`:'';
 const links=(s.links||[]).filter(link=>link!==bluetoothLink).map(([label,url])=>`<a class="resource-link" href="${e(url)}" ${url.startsWith('#')?'':url.startsWith('http')||url.endsWith('/')||url.endsWith('.html')?'target="_blank" rel="noopener"':'download'}>${e(label)}</a>`).join('');
 return {id:s.id,title:s.title,short:s.title,kind:'html',stage:s.stage||'guided',narration:narrationFiles[s.id],html:`<div class="build-step ${s.wideDiagram?'ws-wide':image||code||diagram?'with-picture':''}"><div class="build-copy"><p class="build-where">${e(s.where)}</p>${bluetoothButton}<p class="build-why">${e(s.why)}</p><p class="build-action">${e(s.do)}</p>${s.actions?`<ol class="build-actions">${s.actions.map(action=>`<li>${e(action)}</li>`).join('')}</ol>`:''}${s.expected?`<p class="build-result"><strong>Check:</strong> ${e(s.expected)}</p>`:''}${s.help?`<details><summary>Help if you get stuck</summary><p>${e(s.help)}</p></details>`:''}${links?`<div class="build-links">${links}</div>`:''}${code&&diagram?`<details class="snippet-reference"><summary>Check the function blocks</summary>${diagram}</details>`:''}</div>${code||diagram||image}</div>`};
}
export const lesson={...site,sections:buildSteps.map(render)};
