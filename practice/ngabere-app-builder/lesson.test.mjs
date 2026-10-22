import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile,stat} from 'node:fs/promises';
import {lesson} from './lesson.js';
import {validateLesson} from './validate.js';
import {checkActivity} from './activity-check.js';
import {foundationPdfReport} from './shared/foundation-evidence.js';
import {previewLesson,sampleState} from './preview-samples.js';

test('all steps and response mappings validate',()=>validateLesson(lesson));
test('lesson and printable pass the common author checks',async()=>{
 const checks=checkActivity(lesson,await readFile(new URL('./printable-fallback.html',import.meta.url),'utf8'));
 assert.deepEqual(checks.filter(c=>c.status==='fail'),[]);
});
test('every local image and download resolves; teacher model is excluded',async()=>{
 const refs=new Set(lesson.sections.flatMap(s=>[...(s.html||'').matchAll(/(?:src|href)="([^"#]+)"/g)].map(m=>m[1])).filter(x=>!x.startsWith('http')));
 for(const url of refs)assert.ok((await stat(new URL(url,import.meta.url))).size>0,url);
 for(const ref of refs)assert.doesNotMatch(ref,/Simple_Model|Cloud_Model|Teacher Only/);
});
test('native block pictures show the matching event and helper, without student recovery shortcuts',async()=>{
 for(const [button,helper] of Object.entries({ListenButton:'PlayWord',NextButton:'NextWord',PreviousButton:'PreviousWord',LearnedButton:'SaveLearnedWord'})){
  const full=await readFile(new URL(`assets/blocks/student-${button}.svg`,import.meta.url),'utf8');
  const empty=await readFile(new URL(`assets/blocks/empty-${button}.svg`,import.meta.url),'utf8');
  for(const svg of [full,empty]){assert.match(svg,/blocklySvg geras-renderer classic-theme/);assert.ok(svg.includes(button));assert.ok(svg.includes('.Click'));}
  assert.ok(full.includes(helper));assert.ok(!empty.includes(helper));
 }
 const all=lesson.sections.map(s=>s.html||'').join('');assert.doesNotMatch(all,/Checkpoint|recovery PNG|recovery file/i);
});
test('partial PDF uses real answers and preserves blank responses',()=>{
 const config=previewLesson(lesson), state=sampleState(config,'empty');
 state.identity={firstName:'Sample',lastName:'Learner',grade:'8B'};state.responses={'audio-evidence':{response:'Ju played its recording. Dog audio needs checking.'}};
 const report=foundationPdfReport(config,state);const str=JSON.stringify(report);
 assert.ok(str.includes('Dog audio needs checking.'));assert.ok(str.includes('Sample'));
 assert.ok(!str.includes('After signing in again, Ju showed ___.'),'Sentence starter must not become an answer');
});

test('beginner visuals use actual captures or native blocks only where needed',async()=>{
 const {buildSteps}=await import('./steps/build-data.js');const by=Object.fromEntries(buildSteps.map(s=>[s.id,s]));
 assert.ok(buildSteps.indexOf(by['name-and-text'])>buildSteps.indexOf(by['listen-style']));
 for(const id of ['guide-and-editor','get-starter','open-inventor','names-check','test-listen','three-audios','audio-evidence','save-evidence','save-check','installed-test','final-evidence','files-evidence','review'])assert.ok(!by[id].visuals,id);
 for(const step of buildSteps){
  assert.ok(!step.image,'No old illustration should remain');
  for(const v of step.visuals||[])assert.match(v.src,/^assets\/(screenshots\/.*\.(?:jpg|png)|blocks\/.*\.svg|runtime\/.*\.png)$/);
 }
 assert.equal(by.goal.visualKind,'runtime');
 assert.equal(by['test-NextButton'].visualKind,'runtime');
 assert.match(by['return-test'].visualCaption,/demonstration data/);
 assert.match(by['upload-2'].help,/word2/);assert.match(by['upload-3'].help,/word3/);
});


test('app changes use Web Preview while editor tasks retain real editor references',async()=>{
 const {buildSteps}=await import('./steps/build-data.js');const by=Object.fromEntries(buildSteps.map(s=>[s.id,s]));
 for(const id of ['word-style','meaning-style','listen-button','listen-style','instruction','learned-button','previous-button','next-button','test-NextButton','test-PreviousButton','save-test','progress-test','independent']){
  assert.equal(by[id].visualKind,'runtime',id);assert.equal(by[id].visuals.length,2,id);
  for(const v of by[id].visuals)assert.match(v.src,/^assets\/runtime\//);
 }
 for(const id of ['starter-check','designer-map','find-card','navigation-row','upload-1','upload-2','upload-3'])assert.equal(by[id].visualKind,'designer',id);
 for(const id of ['listen-call','call-NextButton','call-PreviousButton','save-call'])assert.equal(by[id].visualKind,'blocks',id);
});


test('required testing uses our viewer and teaches reopening after edits',async()=>{
 const {buildSteps}=await import('./steps/build-data.js');const by=Object.fromEntries(buildSteps.map(s=>[s.id,s]));
 assert.match(by['connect-phone'].do,/Export selected project/);
 assert.doesNotMatch(JSON.stringify(buildSteps),/AI Companion|connected phone|On your phone|On the phone/);
 assert.match(by['test-listen'].do,/Export a new \.aia/);
 assert.match(by['installed-test'].do,/latest exported \.aia/);
 assert.match(by['build-apk'].do,/If your teacher asks/);
 assert.match(by['files-evidence'].question,/our viewer/);
});


test('whole-guide corrections preserve editor transitions and accurate settings',async()=>{
 const {buildSteps}=await import('./steps/build-data.js');const by=Object.fromEntries(buildSteps.map(s=>[s.id,s]));
 assert.equal(buildSteps.length,52);
 assert.doesNotMatch(JSON.stringify(buildSteps),/Learn Ngäbere|127\.0\.0\.1:8888/);
 assert.equal(by['navigation-row'].visuals.length,1);
 for(const id of ['listen-style','learned-button','previous-button','next-button'])assert.ok(by[id].settings.some(([key,value])=>key==='FontSize'&&value==='16'),id);
 for(const id of ['event-NextButton','event-PreviousButton','save-event'])assert.match(by[id].do,/MIT App Inventor tab and click Blocks/);
 for(const id of ['test-NextButton','test-PreviousButton','save-test'])assert.match(by[id].do,/Export a new \.aia/);
 assert.match(by['return-test'].do,/Progress, then Sign out/);
 assert.match(by['designer-map'].help,/layout area.*separate app viewer/);
});


test('Steps menu only navigates; starter download belongs to its own step',async()=>{
 const source=await readFile(new URL('./shared/foundation-module.js',import.meta.url),'utf8');
 assert.doesNotMatch(source,/fm-starter-download|Download app starter/);
 const step=lesson.sections.find(s=>s.id==='get-starter');
 assert.match(step.html,/downloads\/LanguageApp_Firebase_Starter\.aia/);
});


test('official MIT editor and separate viewer have distinct links',async()=>{
 const {buildSteps}=await import('./steps/build-data.js');const by=Object.fromEntries(buildSteps.map(s=>[s.id,s]));
 assert.equal(by['open-inventor'].links[0][1],'https://ai2.appinventor.mit.edu/');
 const viewer=lesson.sections.find(s=>s.id==='connect-phone');
 assert.match(viewer.html,/href="viewer\/index.html" target="_blank" rel="noopener"/);
 assert.doesNotMatch(viewer.html,/href="viewer\/index.html" download/);
 for(const id of ['test-listen','test-NextButton','test-PreviousButton','save-test','independent','installed-test'])assert.match(by[id].do+' '+by[id].expected,/export|Export/);
});
