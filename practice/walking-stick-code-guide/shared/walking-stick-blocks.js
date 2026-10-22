// Images rendered from WalkingStick_Bluetooth.ts by the official MakeCode renderer.
const e=v=>String(v).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const captions={startup:'on start — Trig P0, Echo P1 and Bluetooth UART',sensor:'Separate function: readUltrasonicDistance',connected:'Separate event: on bluetooth connected',disconnected:'Separate event: on bluetooth disconnected',forever:'forever — read, choose one result, send, pause',unknown:'Inside the first if: reject an invalid echo',near:'Inside the outer else: the complete near / far decision',far:'The inner else belongs to distanceCm ≤ 30',send:'After the sensor decision, still inside forever'};
function picture(name,prefix){const path=prefix+'assets/makecode/'+name+'.png';return `<figure class="makecode-picture makecode-${name}"><figcaption>${e(captions[name])}</figcaption><a href="${path}" target="_blank" rel="noopener" aria-label="Open ${e(captions[name])} full size"><img src="${path}" alt="Actual MakeCode blocks: ${e(captions[name])}"></a><small>Click the blocks to open full size.</small></figure>`;}
export function renderBlockDiagram(name,prefix=''){
 if(['complete','overview'].includes(name))return `<div class="makecode-gallery"><div class="makecode-support">${['startup','sensor','connected','disconnected'].map(n=>picture(n,prefix)).join('')}</div>${picture('forever',prefix)}</div>`;
 if(name==='events')return `<div class="makecode-events">${picture('connected',prefix)}${picture('disconnected',prefix)}</div>`;
 if(name==='decision')name='forever';
 if(!captions[name])throw new Error('Unknown MakeCode image '+name);
 return picture(name,prefix);
}
