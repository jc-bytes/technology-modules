'use strict';
const $ = id => document.getElementById(id);
const steps = [...document.querySelectorAll('.step')];
const storageKey = 'g7-mandrake-greenhouse-v1';
const origin = 'https://trg-microbit.userpxt.io';
const branches = ['local','alert','clear'];
const durations = ['200','500'];
const distances = [17,18,19];
const state = {step:0, round:1, high:'local', low:'local', tone:'200', notes:{}, revisions:{}};
try {
  const prior = JSON.parse(localStorage.getItem(storageKey));
  if (prior) {
    for (const key of ['high','low']) if (branches.includes(prior[key])) state[key] = prior[key];
    if (durations.includes(prior.tone)) state.tone = prior.tone;
    if (steps[prior.step]) state.step = Number(prior.step);
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
  steps.forEach(s => { s.hidden = s !== step; });
  $('title').textContent = step.dataset.title;
  $('scene').textContent = step.dataset.scene;
  $('position').textContent = 'Step '+(state.step+1)+' of '+steps.length;
  $('back').disabled = state.step === 0;
  $('next').hidden = state.step === steps.length-1;
  document.querySelectorAll('[data-code]').forEach(el => { el.value = state[el.dataset.code]; });
  document.querySelectorAll('[data-radio]').forEach(el => { el.textContent = ''; });
  renderRounds();
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
const running = new Set();
async function restart() {
  const turn = ++generation;
  clearTimeout(startupTimer);
  boards = [];
  running.clear();
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
function reportRadio(packet) {
  const el = steps[state.step].querySelector('[data-radio]');
  if (!el) return;
  const bytes = packet.payload?.bufferData;
  const word = bytes && new TextDecoder().decode(new Uint8Array(bytes)).match(/ALERT|CLEAR/)?.[0];
  if (!word) return;
  let hint = '';
  if (state.step === 1 && word === 'CLEAR') hint = ' If you pressed B, try the other radio word in the upper branch.';
  if (state.step === 2 && state.low === 'alert' && state.high === 'alert') hint = ' Both branches send the same word. How will the door know when to clear?';
  el.textContent = 'Radio message from the plant: '+word+'.'+hint;
}
window.addEventListener('message',e => {
  if (e.origin !== origin) return;
  const frame = boards.find(f=>f.contentWindow === e.source);
  if (!frame) return;
  const msg = e.data;
  if (msg?.type === 'ready') {
    const first = frame.id === 'sender';
    frame.contentWindow.postMessage({...program,id:frame.id,frameCounter:first?1:2,options:{theme:first?'yellow':'green'}},origin);
  } else if (msg?.type === 'status' && msg.state === 'running') {
    running.add(frame);
    if (running.size === 2) {
      clearTimeout(startupTimer);
      $('status').textContent = 'Both micro:bits are ready.';
    }
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
