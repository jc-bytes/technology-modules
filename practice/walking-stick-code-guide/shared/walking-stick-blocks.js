// One model supplies the full map and focused placement diagrams.
// The marked sensor operations come from the team's checked working project.
const block=(id,text,color='variable',extra={})=>({type:'block',id,text,color,...extra});
const existing=(id,text)=>({type:'existing',id,text});
const condition=(id,text,yes,no=[])=>({type:'if',id,text,yes,no});
const stack=(id,text,children)=>({type:'stack',id,text,children});
export const programStructure=[
 stack('startup','on start',[
  existing('sensor-setup','Keep any existing sensor setup here'),
  block('initial-status','set stickStatus to "UNKNOWN"'),
  block('initial-connection','set btConnected to false'),
  block('uart-service','bluetooth uart service','bluetooth')
 ]),
 stack('connected','on bluetooth connected',[
  block('connection-true','set btConnected to true')
 ]),
 stack('disconnected','on bluetooth disconnected',[
  block('connection-false','set btConnected to false'),
  block('disconnected-status','set stickStatus to "UNKNOWN"')
 ]),
 stack('sensor-loop','forever',[
  existing('sensor-read','Read distance in cm with your existing sensor blocks'),
  condition('valid-decision','if [your usable-reading test]',[
   condition('distance-decision','if [your distance in cm] ≤ 30',[
    block('near-display','show icon X','basic'),
    block('near-status','set stickStatus to "NEAR"','variable',{status:'NEAR'})
   ],[
    block('far-display','clear screen','basic'),
    block('far-status','set stickStatus to "FAR"','variable',{status:'FAR'})
   ])
  ],[
   block('unknown-display','show string "?"','basic'),
   block('unknown-status','set stickStatus to "UNKNOWN"','variable',{status:'UNKNOWN'})
  ]),
  condition('send-guard','if btConnected',[
   block('send-message','bluetooth uart write line stickStatus','bluetooth')
  ]),
  block('loop-pause','pause (ms) 500','basic')
 ])
];
const escape=v=>String(v).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const notes={
 'valid-decision':'Use the checked valid/invalid test from your working sensor program.',
 'distance-decision':'Use the existing distance value in centimetres.'
};
function renderNode(n,highlight){
 const mark=highlight===n.id?' ws-highlight':'';
 const attrs=`data-program-block="${escape(n.id)}"`;
 if(n.type==='existing')return `<div class="ws-existing${mark}" ${attrs}><span>YOUR EXISTING BLOCKS</span>${escape(n.text)}</div>`;
 if(n.type==='stack')return `<section class="ws-stack" ${attrs}><h3>${escape(n.text)}</h3><div class="ws-stack-body">${n.children.map(x=>renderNode(x,highlight)).join('')}</div></section>`;
 if(n.type==='if')return `<div class="ws-if${mark}" ${attrs}><div class="ws-if-heading">${escape(n.text)} <span>then</span></div>${notes[n.id]?`<p class="ws-condition-note">${escape(notes[n.id])}</p>`:''}<div class="ws-branch">${n.yes.map(x=>renderNode(x,highlight)).join('')}</div>${n.no.length?`<div class="ws-else">else</div><div class="ws-branch">${n.no.map(x=>renderNode(x,highlight)).join('')}</div>`:''}<div class="ws-if-end" aria-hidden="true"></div></div>`;
 if(n.type==='note')return `<div class="ws-context-note">${escape(n.text)}</div>`;
 return `<div class="ws-block ws-${escape(n.color)}${mark}" ${attrs}>${escape(n.text)}</div>`;
}
const note=text=>({type:'note',text});
const byId=id=>{let result;function visit(n){if(n.id===id)result=n;for(const c of [...(n.children||[]),...(n.yes||[]),...(n.no||[])])visit(c);}programStructure.forEach(visit);return result;};
function focusedLoop(name){
 const near=byId('distance-decision'),valid=byId('valid-decision');
 if(name==='decision'){const withoutMessages=n=>({...n,yes:n.yes?.filter(c=>!c.status).map(withoutMessages),no:n.no?.filter(c=>!c.status).map(withoutMessages)});return stack('focused-sensor-loop','forever',[note('Your existing sensor read comes first'),withoutMessages(valid)]);}
 if(name==='send')return stack('focused-sensor-loop','forever',[
  byId('sensor-read'),note('Your complete usable / near / far / failed decision stays here'),
  byId('send-guard'),byId('loop-pause')
 ]);
 const distance={...near,yes:name==='near'?near.yes:[note('NEAR branch stays here')],no:name==='far'?near.no:[]};
 const decision={...valid,yes:name==='unknown'?[note('Your usable-reading near / far decision stays here')]:[distance],no:name==='unknown'?valid.no:[]};
 return stack('focused-sensor-loop','forever',[byId('sensor-read'),decision,note('Send the chosen result after this whole decision')]);
}
const descriptions={
 startup:'Inside on start only',events:'Two separate Bluetooth event stacks',
 decision:'Inside forever, immediately after the sensor read',
 near:'Inside forever → usable reading → distance ≤ 30',
 far:'Inside forever → usable reading → else',
 unknown:'Inside forever → failed-reading else',
 send:'Inside forever, after the whole sensor decision',
 overview:'Four separate stacks in one MakeCode project',complete:'Complete program layout'
};
export function renderBlockDiagram(name){
 let nodes,highlight;
 if(name==='startup')nodes=[programStructure[0]];
 else if(name==='events')nodes=programStructure.slice(1,3);
 else if(['decision','near','far','unknown','send'].includes(name)){nodes=[focusedLoop(name)];highlight={near:'near-status',far:'far-status',unknown:'unknown-status',send:'send-guard'}[name];}
 else if(name==='overview')nodes=[stack('overview-startup','on start',[note('Prepare UNKNOWN, false and UART service')]),stack('overview-connected','on bluetooth connected',[note('btConnected = true')]),stack('overview-disconnected','on bluetooth disconnected',[note('btConnected = false; stickStatus = UNKNOWN')]),stack('overview-loop','forever',[note('Read the existing sensor'),note('Choose ONE result with if / else'),note('Send when connected'),note('Pause, then repeat')])];
 else if(name==='complete')nodes=programStructure;
 else throw new Error('Unknown block diagram '+name);
 const wide=['overview','complete'].includes(name);
 let body=name==='overview'?`<div class="ws-overview-grid">${nodes.map(n=>renderNode(n,highlight)).join('')}</div>`:wide?`<div class="ws-program-grid"><div class="ws-support-stacks">${nodes.slice(0,3).map(n=>renderNode(n,highlight)).join('')}</div><div>${renderNode(nodes[3],highlight)}</div></div>`:nodes.map(n=>renderNode(n,highlight)).join('');
 return `<figure class="ws-block-diagram ${wide?'ws-full-map':''}" aria-label="${escape(descriptions[name])}"><figcaption>${escape(descriptions[name])}</figcaption>${body}<p class="ws-diagram-key">Placement diagram. Dashed boxes and [bracketed labels] mean your existing checked sensor blocks.</p></figure>`;
}
