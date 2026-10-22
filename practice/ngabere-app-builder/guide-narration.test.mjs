import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile,stat} from 'node:fs/promises';
import {createHash} from 'node:crypto';
import {buildSteps} from './steps/build-data.js';
import {narrationFiles} from './narration-manifest.js';
class Element extends EventTarget {
 constructor(){super();this.isConnected=true;this.attrs={};this.textContent='';this.tagName='AUDIO';}
 setAttribute(k,v){this.attrs[k]=v;} removeAttribute(k){delete this.attrs[k];}
 pause(){this.paused=true;} load(){} remove(){this.isConnected=false;}
 play(){this.paused=false;return new Promise((resolve,reject)=>{this.resolve=resolve;this.reject=reject;});}
}
const media=[];
globalThis.document=new EventTarget();
document.querySelectorAll=()=>media.filter(a=>a.isConnected);
document.createElement=()=>new Element();document.body={append:a=>media.push(a)};
globalThis.window=new EventTarget();
const {attachNarration,stopGuideNarration}=await import('./guide-narration.js');
function control(){const button=new Element(),status=new Element();button.tagName='BUTTON';attachNarration(button,status,'assets/narration/goal.mp3');return {button,status,click:()=>button.dispatchEvent(new Event('click'))};}
test('all reading steps have English narration, with original word clips preserved',async()=>{
 const manifest=JSON.parse(await readFile(new URL('./narration-scripts.json',import.meta.url)));
 assert.equal(manifest.records.length,buildSteps.filter(s=>s.kind!=='review').length);
 for(const s of buildSteps.filter(s=>s.kind!=='review')){
  const r=manifest.records.find(r=>r.id===s.id);assert.ok(r,s.id);
  assert.equal(r.sha256,createHash('sha256').update(r.text).digest('hex'));
  assert.equal(narrationFiles[s.id],r.file+'?v='+r.sha256.slice(0,12));
  assert.ok((await stat(new URL(r.file,import.meta.url))).size>1000);
  assert.doesNotMatch(r.text,/\b(?:Ju|Nukro|Minchi|Ngäbere)\b/);
 }
 const hashes=['d21b5db633e421afcd373a3fc24cad6286f070d2c3724e597d541dba1f74ea5e','ccb58e684d8ef6928688788f00a3555c35e0b95c9c6088d00de40d7863dd7154','b82cc47823e82484fc142c1acf4f9e2895b20ea1a7e38f150372b8bc04db7854'];
 for(let i=1;i<=3;i++)assert.equal(createHash('sha256').update(await readFile(new URL(`./downloads/word${i}.wav`,import.meta.url))).digest('hex'),hashes[i-1]);
});
test('stop and navigation ignore late playback rejections',async()=>{
 const c=control();c.click();const a=media.at(-1);assert.equal(c.button.textContent,'Stop reading');
 c.click();assert.equal(a.paused,true);a.reject(new Error('interrupted'));await Promise.resolve();assert.equal(c.status.textContent,'');
 c.click();const b=media.at(-1);stopGuideNarration();b.reject(new Error('navigation'));await Promise.resolve();assert.equal(c.button.textContent,'Read aloud');assert.equal(c.status.textContent,'');
});
test('natural end resets and failed playback permits retry',async()=>{
 const c=control();c.click();media.at(-1).dispatchEvent(new Event('ended'));assert.equal(c.button.textContent,'Read aloud');
 c.click();media.at(-1).reject(new Error('missing'));await Promise.resolve();assert.match(c.status.textContent,/try again/);
 c.click();media.at(-1).dispatchEvent(new Event('playing'));assert.equal(c.status.textContent,'');assert.equal(c.button.textContent,'Stop reading');stopGuideNarration();
});
test('source pronunciation interrupts guide narration',()=>{
 const c=control();c.click();const narration=media.at(-1);
 const event=new Event('play');Object.defineProperty(event,'target',{value:new Element()});document.dispatchEvent(event);
 assert.equal(narration.paused,true);assert.equal(c.button.textContent,'Read aloud');
});
