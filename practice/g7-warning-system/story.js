'use strict';
const $ = id => document.getElementById(id);
const steps = [...document.querySelectorAll('.step')];
const storageKey = 'g7-mandrake-greenhouse-v1';
const origin = 'https://trg-microbit.userpxt.io';
const branches = ['local','alert','clear'];
const durations = ['200','500'];
const distances = [17,18,19];
const state = {step:0, round:1, high:'local', low:'local', tone:'200', notes:{}, revisions:{}, fieldTests:[], repotted:false};
try {
  const prior = JSON.parse(localStorage.getItem(storageKey));
  if (prior) {
    for (const key of ['high','low']) if (branches.includes(prior[key])) state[key] = prior[key];
    if (durations.includes(prior.tone)) state.tone = prior.tone;
    if (steps[prior.step]) state.step = Number(prior.step);
    if (Array.isArray(prior.fieldTests)) state.fieldTests=[...new Set(prior.fieldTests.filter(t=>/^[12]-(17|18|19)$/.test(t)))];
    state.repotted = prior.repotted === true;
    if (prior.round === 2) state.round = 2;
    for (const key of ['notes','revisions']) {
      for (const [name,value] of Object.entries(prior[key] || {})) {
        if (typeof value === 'string') state[key][name] = value;
      }
    }
  }
} catch { $('storage').textContent = 'Your saved work could not be opened. Download your files before leaving.'; }
function save() {
  try { localStorage.setItem(storageKey, JSON.stringify(state)); }
  catch { $('storage').textContent = 'This browser could not save your changes. Download your files before leaving.'; }
}
const revision = () => [state.high,state.low,state.tone].join('-');
function note(key) { return state.notes[key] || ''; }
function studentName() { return [note('first'),note('last')].filter(Boolean).join(' '); }
function filename() {
  const clean = key => note(key).trim().replace(/[^\p{L}\p{N}-]+/gu,'_');
  return 'G7_MandrakeExam_' + (clean('first') || 'Firstname') + '_' + (clean('last') || 'Lastname');
}
function updateWho() { $('who').textContent = [studentName(),note('group')].filter(Boolean).join(' · '); }
function renderRounds() {
  document.querySelectorAll('[data-round]').forEach(b => b.setAttribute('aria-pressed', String(Number(b.dataset.round) === state.round)));
  $('trials').replaceChildren();
  for (const [i,distance] of distances.entries()) {
    const key = 'r'+state.round+'d'+distance;
    const label = document.createElement('label');
    label.textContent = ['A','A+B','B'][i]+' · '+distance+' cm — receiver icon and sound';
    const input = document.createElement('input');
    input.dataset.field = key;
    input.value = note(key);
    label.append(input);
    if (input.value && state.revisions[key] !== revision()) {
      const old = document.createElement('small');
      old.textContent = 'Recorded with earlier blocks. Repeat this test and update your note.';
      label.append(old);
    }
    $('trials').append(label);
  }
}
function renderStep(focus=false) {
  const step = steps[state.step];
  $('keeperAction').hidden = true;
  $('workbench').hidden = true;
  steps.forEach(s => { s.hidden = s !== step; });
  $('title').textContent = step.dataset.title;
  $('scene').textContent = step.dataset.scene;
  greenhouse.say(state.step===0 ? 'Pip’s pot cracked on the cart! I brought a spare. Try the lift at 19 cm while Mara keeps watch at the door.' : step.dataset.scene, [0,5].includes(state.step)?'courier':'keeper');
  $('position').textContent = 'Step '+(state.step+1)+' of '+steps.length;
  $('back').disabled = state.step === 0;
  $('next').hidden = state.step === steps.length-1;
  document.querySelectorAll('[data-code]').forEach(el => { el.value = state[el.dataset.code]; });
  document.querySelectorAll('[data-radio]').forEach(el => { el.textContent = ''; });
  renderRounds();
  $('codeView').value=[3,4].includes(state.step)?'receiver':'sender';
  updateProgram();
  const control=step.querySelector('[data-code]');
  if(control){
    let choices=step.querySelector('.lessonChoices');
    if(!choices){
      choices=document.createElement('div');choices.className='lessonChoices';
      control.parentElement.after(choices);
    }
    showPalette(choices,control,value=>{
      applyBlock(control,value);
      choices.querySelector('[aria-pressed="true"]').focus({preventScroll:true});
    });
  }
  if (focus) { window.scrollTo(0,0); $('title').focus({preventScroll:true}); }
}
function move(delta) { state.step += delta; renderStep(true); save(); }
$('back').onclick = () => move(-1);
$('next').onclick = () => move(1);
document.querySelectorAll('[data-round]').forEach(b => b.onclick = () => { state.round = Number(b.dataset.round); renderRounds(); save(); });
document.querySelectorAll('[data-field]').forEach(el => { el.value = note(el.dataset.field); });
document.addEventListener('input',e => {
  const key = e.target.dataset.field;
  if (!key) return;
  state.notes[key] = e.target.value;
  if (/^r[12]d/.test(key)) { state.revisions[key] = revision(); e.target.parentElement.querySelector('small')?.remove(); }
  updateWho();
  if ($('downloads').open) $('fileName').textContent = filename();
  save();
});
document.addEventListener('change',e => {
  const key = e.target.dataset.code;
  if (!key) return;
  if(state[key]!==e.target.value){state.fieldTests=[];state.repotted=false;}
  state[key] = e.target.value;
  renderStep(); save(); restart();
});
async function fetchFile(url) {
  const result = await fetch(url);
  if (!result.ok) throw Error('Download failed');
  return result;
}
async function compiledFile(key,kind) {
  const raw = await fetchFile('programs/'+key+'.'+kind+'.bin');
  return new Response(raw.body.pipeThrough(new DecompressionStream('gzip')));
}
let boards = [];
let program;
let generation = 0;
let startupTimer;
let lastDistance=0, transferPending=false;
function updateProgram(){showProgram($('programBlocks'),$('codeView').value,state);}
$('codeView').onchange=updateProgram;
function applyBlock(control,value){
  if(control.value===value)return;
  control.value=value;
  control.dispatchEvent(new Event('change',{bubbles:true}));
}
let nextSceneTest = null;
let sceneSound = false;
// Mirror a reading only when the compiled MakeCode button handler actually runs.
function observeSender(code) {
  return code.replace(/(globals\.distance___\d+ = \((17|18|19)\);)/g,
    (_, assignment, distance) => assignment + ' pxsim.Runtime.postMessage({type:"greenhouse-distance",distance:'+distance+'});');
}
window.addEventListener('greenhouse-test', event => {
  if (running.size !== 2) return;
  const id = {17:1,18:3,19:2}[event.detail];
  if (!id) return;
  nextSceneTest = event.detail;
  $('sender').contentWindow.postMessage({type:'eventbus',id,eventid:3},origin);
});
window.addEventListener('greenhouse-bench', () => {
  // The same bench handles both radio branches and the tone dial.
  const step = state.high !== 'alert' ? 1 : state.low !== 'clear' ? 2 : !note('before') ? 3 : 4;
  state.step = step;
  renderStep(); save();
  openBench();
});
function openBench() {
  const control = steps[state.step].querySelector('select');
  if (!control) return;
  $('benchLabel').textContent = control.parentElement.firstChild.textContent.trim()+ ' · choose a block';
  showProgram($('benchBlocks'),control.dataset.code==='tone'?'receiver':'sender',state);
  showPalette($('benchPalette'),control,value=>{
    applyBlock(control,value);
    openBench();
  });
  $('workbench').hidden = false;
  greenhouse.say(control.dataset.code==='tone'?'I can change the length of the note here. Then I’ll listen at the door.':'Here’s the rule inside my sender. I can swap this block, then lift Pip and see what Mara gets.','apprentice');
  $('benchPalette').querySelector('[aria-pressed="true"]').focus({preventScroll:true});

}
$('closeBench').onclick = () => {
  $('workbench').hidden = true;
  $('plantSpot').focus({preventScroll:true});
  $('plantSpot').click();
};
function offerAction(label,action) {
  const b=$('keeperAction'); b.textContent=label; b.hidden=false;
  b.onclick=()=>{ b.hidden=true; action(); };
}
function toBench(){ $('benchSpot').click(); }
function toNotes(index) {
  state.step=index;renderStep();save();
  const field=steps[index].querySelector('textarea,input');
  if(field) { field.focus({preventScroll:true}); field.scrollIntoView({block:'center'}); }
}
$('handoff').onclick=()=>$('courierSpot').click();
window.addEventListener('greenhouse-courier',()=>{
  if(state.repotted){
    greenhouse.say('Pip is asleep in the blue pot. I can take him to the next greenhouse. Keep your test sheet for the demonstration.','courier');
    offerAction('My files',offerDownloads);
  }else if(revision()!=='alert-clear-500'){
    greenhouse.say('Feel that crack in the old pot? I’ll hold the new one. Get Mara’s warning working before we lift Pip out.','courier');
    offerAction('Go to the repair bench',toBench);
  }else if(state.fieldTests.length<6){
    greenhouse.say('I have the blue pot ready. Run each height in round 1 and again in round 2. We’ve checked '+state.fieldTests.length+' of the six lifts.','courier');
    offerAction('Open the test log',()=>toNotes(5));
  }else{
    greenhouse.say('All six lifts checked. I’ll slide the blue pot under Pip. Lower him into it when Mara gives the all-clear.','courier');
    offerAction('Lower Pip into the blue pot',()=>{
      if(running.size!==2){greenhouse.say('Wait for the two boards, then talk to me again.','courier');return;}
      transferPending=true;
      window.dispatchEvent(new CustomEvent('greenhouse-test',{detail:18}));
    });
  }
});
window.addEventListener('greenhouse-talk', () => {
  if (state.high !== 'alert') greenhouse.say('The warning belongs here at the door. Walk to the repair bench and give the sender a radio block.');
  else if (state.low !== 'clear') greenhouse.say('Try 19 cm and then 18 cm. If the skull stays on at the door, repair the lower branch.');
  else if (state.tone === '200') greenhouse.say('Listen to our short beep at 19 cm. Record it before you make it longer at the bench.');
  else greenhouse.say('Test all three heights twice. Bring me your results and show me how the warning works.');
  if(state.high !== 'alert' || state.low !== 'clear') offerAction('Go to the bench',toBench);
  else if(state.tone==='200') offerAction('Record the short beep',()=>toNotes(3));
  else offerAction('Open the test log',()=>toNotes(5));
});
const running = new Set();
async function restart() {
  const turn = ++generation;
  clearTimeout(startupTimer);
  boards = [];
  running.clear(); transferPending=false; lastDistance=0;
  greenhouse.start(); nextSceneTest=null; sceneSound=false;
  $('status').textContent = 'Starting your program…';
  try {
    const [settings,code] = await Promise.all([fetchFile('board.json').then(r=>r.json()), compiledFile(revision(),'sim').then(r=>r.text())]);
    if (turn !== generation) return;
    program = {...settings,code};
    for (const role of ['sender','receiver']) {
      const old = $(role), fresh = old.cloneNode(false);
      fresh.removeAttribute('src');
      old.replaceWith(fresh);
      boards.push(fresh);
      fresh.src = origin+'/---simulator#'+role;
    }
    startupTimer = setTimeout(() => {
      if (running.size < 2) $('status').textContent = 'MakeCode is still loading. Check your connection and reload this page.';
    },25000);
  } catch {
    if (turn === generation) $('status').textContent = 'Your program could not load. Check your connection and reload this page.';
  }
}
document.querySelectorAll('[data-sighting]').forEach(button => {
  button.onclick = () => {
    if (state.high === 'local') {
      $('keepersReply').textContent = button.dataset.sighting === 'plant'
        ? 'Keeper: “That’s what I saw too. The plant board is showing the warning to itself. Let’s change the block so it tells me at the door.”'
        : 'Keeper: “Try B on the plant board once more. The X lights up beside the tray. Look at my board at the door. Did the message reach me?”';
    } else {
      $('keepersReply').textContent = 'Keeper: “You’ve already changed the sender. Test the radio message with your current blocks in the next step.”';
    }
  };
});
function reportRadio(packet) {
  const el = steps[state.step].querySelector('[data-radio]');
  const bytes = packet.payload?.bufferData;
  const word = bytes && new TextDecoder().decode(new Uint8Array(bytes)).match(/ALERT|CLEAR/)?.[0];
  if (!word) return;
  greenhouse.radio(word,Number(state.tone),sceneSound);
  if(state.step===5 && revision()==='alert-clear-500' && distances.includes(lastDistance) && word===(lastDistance===19?'ALERT':'CLEAR')){
    const tag=state.round+'-'+lastDistance;
    if(!state.fieldTests.includes(tag)){state.fieldTests.push(tag);save();}
  }
  if(transferPending && word==='CLEAR' && lastDistance===18){
    transferPending=false;state.repotted=true;save();greenhouse.settle();
    greenhouse.say('Look, his leaves have stopped shaking. Pip’s asleep in the blue pot. Mara, you can let the visitors in!','courier');
    offerAction('Finish the signal diagram',()=>toNotes(6));return;
  }
  const replies = {
    1: {ALERT:'“The warning reached me! I’ll keep the visitors outside. Lower Pip into the moss and tell me when I can open up.”', CLEAR:'“That tells me to clear the warning. If the plant is up at 19 cm, which word do I need?”'},
    2: {ALERT:'“I have the warning. Lower the plant to 18 cm with A+B. Can you get my display to clear?”', CLEAR:'“Your all-clear reached me. Pip’s quiet. I can let the visitors through.”'},
    3: {ALERT:'“There! I almost missed it under the fans. What did you hear?”'},
    4: {ALERT:'“I caught that one over the fans. Kit, bring the blue pot over for the test lifts.”'}
  };
  const reply = replies[state.step]?.[word];
  greenhouse.say(reply || (word==='ALERT'?'The warning reached my door. I see the skull.':'The all-clear reached my door. The lights went out.'));
  if (state.step === 1 && word === 'ALERT') offerAction('Fix the all-clear',toBench);
  if (state.step === 2 && word === 'CLEAR' && state.low === 'clear') offerAction('Compare the beep',()=>toNotes(3));
  if (state.step === 4 && word === 'ALERT' && state.tone === '500') offerAction('Record the longer beep',()=>toNotes(4));
  if (el) el.textContent = 'Radio message: '+word+'.'+(reply ? ' Keeper: '+reply : '');
}
window.addEventListener('message',e => {
  if (e.origin !== origin) return;
  const frame = boards.find(f=>f.contentWindow === e.source);
  if (!frame) return;
  const msg = e.data;
  if (msg?.type === 'ready') {
    const first = frame.id === 'sender';
    frame.contentWindow.postMessage({...program,code:first?observeSender(program.code):program.code,id:frame.id,frameCounter:first?1:2,options:{theme:first?'yellow':'green'}},origin);
  } else if (msg?.type === 'status' && msg.state === 'running') {
    running.add(frame);
    if (running.size === 2) {
      clearTimeout(startupTimer);
      greenhouse.ready();
      if(state.repotted) greenhouse.settle(false);
      $('status').textContent = 'Both micro:bits are ready.';
    }
  } else if (msg?.type === 'greenhouse-distance' && frame.id === 'sender' && distances.includes(msg.distance)) {
    sceneSound = nextSceneTest === msg.distance;
    nextSceneTest = null;
    $('receiver').contentWindow.postMessage({type:'mute',mute:sceneSound},origin);
    $('workbench').hidden = true;
    $('keeperAction').hidden = true;
    lastDistance=msg.distance;
    greenhouse.distance(msg.distance,state.high,state.low);
    if (msg.distance===19 && state.high==='local') offerAction('Repair the radio',toBench);
  } else if (msg?.type === 'radiopacket' && running.size === 2) {
    boards.find(f=>f!==frame).contentWindow.postMessage(msg,origin);
    if (frame.id === 'sender') reportRadio(msg);
  }
});
function offerDownloads() {
  $('fileName').textContent = filename();
  $('exportStatus').textContent = '';
  $('downloads').showModal();
}
$('files').onclick = $('finishFiles').onclick = offerDownloads;
function download(data,name) {
  const url = URL.createObjectURL(data);
  const a = document.createElement('a');
  a.href=url; a.download=name; document.body.append(a); a.click(); a.remove();
  setTimeout(()=>URL.revokeObjectURL(url),30000);
}
async function worksheet(work) {
  const source = await fetchFile('G7_MandrakeExam_Firstname_Lastname.docx');
  const zip = await JSZip.loadAsync(await source.arrayBuffer());
  const ns = 'http://schemas.openxmlformats.org/wordprocessingml/2006/main';
  const xml = new DOMParser().parseFromString(await zip.file('word/document.xml').async('string'),'application/xml');
  const tags = (node,name) => [...node.getElementsByTagNameNS(ns,name)];
  const body = tags(xml,'body')[0];
  while (body.firstElementChild && body.firstElementChild.textContent !== 'My warning system test sheet') body.firstElementChild.remove();
  if (!body.firstElementChild) throw Error('Worksheet template changed');
  const name = [work.notes.first,work.notes.last].filter(Boolean).join(' ');
  tags(body,'t').find(t=>t.textContent.startsWith('Name ')).textContent = 'Name: '+(name || '________________')+'    Group: '+(work.notes.group || '________');
  const tables = tags(body,'tbl');
  function fill(table,row,col,key) {
    const cell = tags(tags(tables[table],'tr')[row],'tc')[col];
    const r = xml.createElementNS(ns,'w:r');
    const t = xml.createElementNS(ns,'w:t');
    const stale = key.startsWith('r') && work.notes[key] && work.revisions[key] !== work.key;
    t.textContent = (work.notes[key] || 'Unanswered') + (stale ? ' (Earlier program version)' : '');
    r.append(t);tags(cell,'p')[0].append(r);
  }
  fill(0,1,0,'before');fill(0,1,1,'after');
  for (const [i,d] of distances.entries()) for (const round of [1,2]) fill(1,i+1,round,'r'+round+'d'+d);
  ['input','decision','output'].forEach((k,i)=>fill(2,2,i,k));
  zip.file('word/document.xml',new XMLSerializer().serializeToString(xml));
  return zip.generateAsync({type:'blob',compression:'DEFLATE',mimeType:'application/vnd.openxmlformats-officedocument.wordprocessingml.document'});
}
async function exportFile(kind) {
  const work = {key:revision(),notes:{...state.notes},revisions:{...state.revisions}};
  const stem=filename();
  $('exportStatus').textContent='Preparing your file…';
  try {
    const data = kind === 'hex' ? await compiledFile(work.key,'hex').then(r=>r.blob()) : await worksheet(work);
    download(data,stem+'.'+kind);
    $('exportStatus').textContent='Your download is ready.';
  } catch { $('exportStatus').textContent='The download could not finish. Check your connection and try again.'; }
}
$('hex').onclick = () => exportFile('hex');
$('sheet').onclick = () => exportFile('docx');
updateWho(); renderStep(); restart();
