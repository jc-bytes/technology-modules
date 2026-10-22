import { attachNarration, stopGuideNarration } from "./guide-narration.js?v=1.5.0";

import { practiceCheckSpecs } from "./t3-practice.js?v=1.5.0";
import { checkChoice, foundationEvidence, foundationPdfReport } from "./foundation-evidence.js?v=1.5.0";
import { downloadStudentPdf } from "./student-pdf.js?v=1.5.0";
import { selectClassRoute } from "./class-routes.js?v=1.5.0";

const clone = (value) => JSON.parse(JSON.stringify(value));
const escapeHtml = (value = "") => String(value).replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll('"', "&quot;").replaceAll("'", "&#039;");
const uid = () => `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;

export function mountFoundationModule(config) {
  config = selectClassRoute(config, new URLSearchParams(location.search).get("class"));
  config.sections = config.sections.map(section=>({...section,narration:section.narration || config.narrationFiles?.[section.id],inlineChecks:practiceCheckSpecs(section.html)}));
  const assignedRoute = config.assignedRoute;
  const gradeLabel = config.gradeLabel || "Grade 6 Technology";
  const classes = config.classes || ["6A", "6B", "6C"];
  const defaultState = { attempts: [], responses: {}, visited: [config.sections[0].id], identity: {firstName:"",lastName:"",grade:""}, identityStarted:false, choiceDrafts:{}, choicePositions:{}, formPositions:{}, inlineAnswers:{} };
  let storageFailed = false;
  let state = load();
  let activeId = route();
  let editingIdentity = !state.identityStarted;
  for(const section of config.sections)for(const check of section.inlineChecks){if(state.inlineAnswers[check.key]===undefined)try{state.inlineAnswers[check.key]=localStorage.getItem(check.key) || "";}catch{}}

  function load() {
    const record=value=>value && typeof value==='object' && !Array.isArray(value)?value:{};
    try {
      const saved = JSON.parse(localStorage.getItem(config.storageKey) || "null");
      return { ...clone(defaultState), ...saved, attempts: Array.isArray(saved?.attempts) ? saved.attempts.filter(a=>a && typeof a==='object') : [], responses: saved?.responses && typeof saved.responses==='object' ? saved.responses : {}, visited: Array.isArray(saved?.visited) ? saved.visited : defaultState.visited, identity: Object.fromEntries(['firstName','lastName','grade'].map(key=>[key,typeof saved?.identity?.[key]==='string'?saved.identity[key].slice(0,70):''])), choiceDrafts:record(saved?.choiceDrafts), choicePositions:record(saved?.choicePositions), formPositions:record(saved?.formPositions), inlineAnswers:record(saved?.inlineAnswers) };
    } catch { storageFailed = true; return clone(defaultState); }
  }
  function save() { try { localStorage.setItem(config.storageKey, JSON.stringify(state)); } catch { storageFailed = true; } const warning=document.querySelector("#fm-storage-warning"); if(warning) warning.textContent=storageFailed?"This browser cannot save your work. Keep this tab open and download your answers.":""; }
  function route() {
    const id = location.hash.replace(/^#/, "");
    const targetIndex = config.sections.findIndex((section) => section.id === id);
    return targetIndex >= 0 ? id : config.sections[0].id;
  }
  function section() { return config.sections.find((item) => item.id === activeId) || config.sections[0]; }
  function passedCount(sectionId) { return state.attempts.filter((attempt) => attempt.sectionId === sectionId && attempt.passed).length; }
  function status(sectionId) {
    if (state.attempts.some((attempt) => attempt.sectionId === sectionId && attempt.passed) || state.responses[sectionId]?.saved) return "done";
    return state.visited.includes(sectionId) ? "started" : "new";
  }
  function nav() {
    return config.sections.map((item,index) => `<a href="#${item.id}" class="fm-nav-link ${item.id === activeId ? "is-active" : ""}" ${item.id === activeId ? 'aria-current="page"' : ""}>${index+1}. ${escapeHtml(item.short || item.title)}</a>`).join("");
  }
  function studentLabel() {
    return `<span><strong>${escapeHtml([state.identity.firstName,state.identity.lastName].filter(Boolean).join(' ') || 'Your name')}</strong><small>${escapeHtml(state.identity.grade ? `Grade ${state.identity.grade}` : 'Your grade')}</small></span>`;
  }
  function shell() {
    const footer = config.showPaperVersion === false ? '' : `<footer class="fm-footer"><a href="${escapeHtml(assignedRoute?.fallback || './printable-fallback.html')}" target="_blank">Paper version</a></footer>`;
    const title = escapeHtml(assignedRoute?.title || config.shortTitle || config.title);
    const branding = config.layout === 'clean-step'
      ? `<div class="fm-brand-title"><small>${escapeHtml(config.subject || 'Technology')}</small><strong class="fm-activity-title">${title}</strong></div>`
      : `<strong class="fm-activity-title">${title}</strong>`;
    return `<div class="fm-shell ${config.layout === 'clean-step' ? 'fm-clean-step' : ''} ${config.persistentNavigation ? 'fm-persistent-navigation' : ''}"><header class="fm-topbar">${branding}<div class="fm-tools"><div class="fm-student"><span id="fm-student-label">${studentLabel()}</span><button id="fm-edit-identity" class="fm-edit" aria-label="Edit your name and grade" title="Edit your name and grade"><svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="m16 3 5 5-12 12-6 1 1-6Z"/><path d="m14 5 5 5"/></svg></button></div><button id="fm-download" class="fm-button primary" aria-label="Download your answers" title="Download your answers"><svg class="fm-tool-icon" viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M12 3v12m-5-5 5 5 5-5M5 16v5h14v-5"/></svg><span class="fm-tool-text">Download your answers</span></button><details class="fm-menu"><summary aria-label="Steps" title="Steps"><svg class="fm-tool-icon" viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M8 5h13M8 12h13M8 19h13M3 5h1M3 12h1M3 19h1"/></svg><span class="fm-tool-text">Steps</span></summary><nav aria-label="Activity steps">${nav()}</nav></details></div></header><p id="fm-storage-warning" role="status"></p><main id="fm-main" tabindex="-1"></main>${footer}</div><div id="fm-toast" class="fm-toast" role="status" aria-live="polite"></div>`;
  }
  function identityPage() {
    if(config.compactIdentity) return `<section class="fm-identity-panel" aria-labelledby="fm-identity-title"><h1 id="fm-identity-title">${state.identityStarted ? 'Your details' : 'Before you start'}</h1><p>Add your name and grade.</p><form id="fm-identity-form">${[['firstName','First name','given-name'],['lastName','Last name','family-name'],['grade','Grade','off']].map(([key,label,autocomplete])=>`<label class="fm-field fm-identity-${key}">${label}<input name="${key}" value="${escapeHtml(state.identity[key])}" autocomplete="${autocomplete}" maxlength="70"></label>`).join('')}<button class="fm-button primary">${state.identityStarted ? 'Save and return' : 'Start lesson →'}</button></form></section>`;
    return `<h1>What is your name?</h1><form id="fm-identity-form">${[['firstName','First name','given-name'],['lastName','Last name','family-name'],['grade','Grade','off']].map(([key,label,autocomplete])=>`<label class="fm-field">${label}<input name="${key}" value="${escapeHtml(state.identity[key])}" autocomplete="${autocomplete}" maxlength="70"></label>`).join('')}<button class="fm-button primary">Continue</button></form>`;
  }
  function hero(item) {
    const index = config.sections.findIndex((entry) => entry.id === item.id);
    const progress = `${config.layout === 'clean-step' ? `${escapeHtml(assignedRoute?.title || config.title)} · ` : ''}Step ${index + 1} of ${config.sections.length}`;
    return `<header class="fm-hero">${config.persistentNavigation ? '' : `<p>${progress}</p>`}<h1>${item.title}</h1>${item.summary ? `<div>${item.summary}</div>` : ""}</header>`;
  }
  function pager(item) {
    const index = config.sections.findIndex((entry) => entry.id === item.id);
    const previous = config.sections[index - 1]; const next = config.sections[index + 1];
    if (config.persistentNavigation) return `<nav class="fm-pager fm-step-bar" aria-label="Lesson navigation">${previous ? `<a class="previous" href="#${previous.id}">← Previous step</a>` : '<span class="fm-nav-placeholder" aria-hidden="true"></span>'}<span class="fm-step-count" aria-label="Step ${index + 1} of ${config.sections.length}">Step ${index + 1} of ${config.sections.length}</span>${next ? `<a class="next" href="#${next.id}">Next step →</a>` : '<span class="fm-nav-placeholder" aria-hidden="true"></span>'}</nav>`;
    return `<nav class="fm-pager" aria-label="Lesson navigation">${previous ? `<a href="#${previous.id}">${config.layout === 'clean-step' ? '← Previous step' : `← ${previous.short}`}</a>` : "<span></span>"}${next ? `<a class="next" href="#${next.id}">${config.layout === 'clean-step' ? 'Next step' : `${next.short} →`}</a>` : ""}</nav>`;
  }
  function block(label, title, html, className = "") { return `<section class="fm-block ${className}"><p class="fm-label">${label}</p>${title ? `<h2>${title}</h2>` : ''}${html}</section>`; }
  function practiceHeader(item, position) {
    return `<section class="fm-set" aria-label="Practice set, activity ${position} of ${item.items.length}"><div><span>Practice set</span><strong>Activity ${position} of ${item.items.length}</strong></div><ol>${item.items.map((_, index) => `<li class="${index + 1 < position ? "done" : index + 1 === position ? "current" : ""}">${index + 1}</li>`).join("")}</ol></section>`;
  }
  function lessonPage(item) { return `${hero(item)}${item.html}${pager(item)}`; }
  function choicePage(item) {
    const sourceId=item.responseSource || item.id;
    const priorIndex = state.choicePositions[item.id] ?? (state.responses[item.id]?.activity ?? (passedCount(item.id) % item.items.length));
    const shownIndex = Number.isInteger(priorIndex) && priorIndex>=0 && priorIndex<item.items.length ? priorIndex : 0;
    const activity = item.items[shownIndex];
    const sourceIndex=activity.sourceIndex ?? shownIndex;
    const candidate=state.responses[sourceId] || {};
    const saved=activity.sourceIndex===undefined || candidate.activity===sourceIndex ? candidate : {};
    const answer=state.choiceDrafts[`${sourceId}:${sourceIndex}`] ?? saved.answer;
    const choices = activity.options.map((option,index)=>`<label class="fm-choice"><input type="radio" name="answer" value="${index}" ${String(answer)===String(index)?'checked':''}><span><b aria-hidden="true">${index+1}</b>${escapeHtml(option)}</span></label>`).join('');
    const feedback = saved.checked ? `<div class="fm-feedback ${saved.passed?'success':'retry'}" role="status">${saved.passed?'Correct.':escapeHtml(activity.retry || 'Look at the example and try again.')}</div>` : '';
    const count = config.layout === 'clean-step' && item.items.length === 1 ? '' : `<p>Question ${shownIndex+1} of ${item.items.length}</p>`;
    const questionNav = config.layout === 'clean-step' && item.items.length === 1 ? '' : `<nav class="fm-pager" aria-label="Question navigation">${shownIndex?`<button class="fm-button quiet" data-choice-position="${shownIndex-1}">Previous question</button>`:'<span></span>'}${shownIndex<item.items.length-1?`<button class="fm-button quiet" data-choice-position="${shownIndex+1}">Next question</button>`:''}</nav>`;
    return `${hero(item)}${count}${block('',config.layout === 'clean-step' && item.items.length === 1 ? '' : activity.title,`${activity.visual || ''}<p class="fm-question">${activity.question}</p><form id="fm-choice-form"><input type="hidden" name="activity" value="${shownIndex}"><div class="fm-choices">${choices}</div><button class="fm-button primary">Check</button></form>${feedback}${questionNav}`)}${pager(item)}`;
  }
  function formPage(item) {
    const saved = state.responses[item.responseSource || item.id] || {};
    if(config.singleActionSteps){
      const fields=item.fields.map(field=>{
        const id='fm-answer-'+encodeURIComponent(field.name),helpId=id+'-help';
        const support=config.readingSupport ? `${field.plainLanguage?`<p class="fm-plain-language"><strong>In simpler words:</strong> ${escapeHtml(field.plainLanguage)}</p>`:''}${field.starter?`<p class="fm-sentence-starter"><strong>You can start:</strong> ${escapeHtml(field.starter)}</p>`:''}` : '';
        const recordedSource=field.sourceFieldName ? String(saved[field.sourceFieldName] || '').trim() : '';
        let sourceHref='';try{const parsed=new URL(recordedSource || field.defaultSourceUrl || '');if(['https:','http:'].includes(parsed.protocol))sourceHref=parsed.href;}catch{}
        const sourceContext=config.readingSupport && field.sourceFieldName ? sourceHref ? `<p class="fm-source-context"><a href="${escapeHtml(sourceHref)}" target="_blank" rel="noopener">Open your report</a></p>` : recordedSource ? `<p class="fm-source-context">Your report: ${escapeHtml(recordedSource)}</p>` : '' : '';
        const input=field.type==='textarea'?`<textarea id="${id}" name="${field.name}" ${field.help?`aria-describedby="${helpId}"`:''} rows="${field.rows || 3}">${escapeHtml(saved[field.name] || '')}</textarea>`:`<input id="${id}" name="${field.name}" value="${escapeHtml(saved[field.name] ?? '')}" type="${field.type || 'text'}" ${field.help?`aria-describedby="${helpId}"`:''}>`;
        return `<div class="fm-field"><label for="${id}">${field.label}</label>${sourceContext}${support}${input}${field.help?`<small id="${helpId}">${field.help}</small>`:''}${config.readingSupport && field.replayStepId?`<p><a href="#${escapeHtml(field.replayStepId)}">Replay this clip</a></p>`:''}</div>`;
      }).join('');
      return `${hero(item)}${item.intro || ''}<form id="fm-record-form" class="fm-record-form">${fields}</form>${pager(item)}`;
    }
    const position = Math.max(0, Math.min(Number.isInteger(state.formPositions[item.id]) ? state.formPositions[item.id] : 0,item.fields.length-1));
    const field = item.fields[position];
    const input=field.type==='textarea'?`<textarea name="${field.name}" rows="${field.rows || 4}">${escapeHtml(saved[field.name] || '')}</textarea>`:`<input name="${field.name}" value="${escapeHtml(saved[field.name] ?? '')}" type="${field.type || 'text'}" ${field.min!==undefined?`min="${field.min}"`:''}>`;
    const count = config.layout === 'clean-step' && item.fields.length === 1 ? '' : `<p>Part ${position+1} of ${item.fields.length}</p>`;
    const answerNav = config.layout === 'clean-step' && item.fields.length === 1 ? '' : `<nav class="fm-pager" aria-label="Answer navigation">${position?`<button class="fm-button quiet" data-form-position="${position-1}">Previous part</button>`:'<span></span>'}${position<item.fields.length-1?`<button class="fm-button primary" data-form-position="${position+1}">Next part</button>`:''}</nav>`;
    return `${hero(item)}${position===0?item.intro || '':''}<form id="fm-record-form" class="fm-record-form">${count}<label class="fm-field"><span>${field.label}</span>${input}<small>${field.help || ''}</small></label></form>${answerNav}${pager(item)}`;
  }
  function sensorPage(item) {
    const stored = state.responses[item.id] || {};
    const bounded=(value,fallback,min,max)=>Number.isFinite(Number(value))?Math.min(max,Math.max(min,Number(value))):fallback;
    const saved={...stored,light:bounded(stored.light ?? 80,80,0,255),threshold:bounded(stored.threshold ?? 100,100,1,254)};
    const output = Number(saved.light) < Number(saved.threshold) ? item.lowOutput : item.highOutput;
    return `${hero(item)}${block("Test", "Move the light value across the threshold", `<div class="fm-sensor-lab"><div class="fm-microbit" aria-label="micro:bit display"><div class="fm-led-grid" id="fm-led-grid">${renderIcon(output.icon)}</div><strong id="fm-sensor-output">${output.label}</strong></div><form id="fm-sensor-form"><label class="fm-field"><span>Light level: <output id="fm-light-value">${saved.light}</output></span><input name="light" type="range" min="0" max="255" value="${saved.light}"></label><label class="fm-field"><span>Threshold</span><input name="threshold" type="number" min="1" max="254" value="${saved.threshold}" required></label><p class="fm-rule">If light level is below the threshold, show the night icon. Otherwise, clear the display.</p><button class="fm-button primary large">Save this sensor test</button></form>${saved.saved ? '<div class="fm-feedback success"><strong>Test saved.</strong><span>Your light value, threshold, and output are in the report.</span></div>' : ""}</div>`)}${pager(item)}`;
  }
  function renderIcon(pattern) {
    const active = new Set(pattern || []);
    return Array.from({ length: 25 }, (_, index) => `<i class="${active.has(index) ? "on" : ""}"></i>`).join("");
  }
  function reviewPage(item) {
    const report=foundationEvidence(config,state);
    const body=report.slice(report.indexOf('<section>'),report.lastIndexOf('</html>'));
    return `${hero(item)}${report.includes('<section>') ? body : '<p>No web answers entered.</p>'}${pager(item)}`;
  }
  async function downloadReport(button) {
    const announce = message => toast(config.practiceOnly && message.startsWith('PDF ready:')
      ? 'Practice PDF ready. Keep it for review.' : message);
    await downloadStudentPdf(foundationPdfReport(config, state), `${config.slug}-answers.pdf`, button, announce);
  }
  function toast(message) { const el = document.querySelector("#fm-toast"); el.textContent = message; el.classList.add("show"); setTimeout(() => el.classList.remove("show"), 1800); }
  function render({ focus = false } = {}) {
    stopGuideNarration();
    document.querySelectorAll('audio,video').forEach(audio=>audio.pause());
    if(config.readingSupport && 'speechSynthesis' in window) speechSynthesis.cancel();
    const notice=document.querySelector("#fm-toast");if(notice)notice.textContent="";
    const item = section(); if (!state.visited.includes(item.id)) state.visited.push(item.id); save();
    const renderer = item.kind === "choice" ? choicePage : item.kind === "form" ? formPage : item.kind === "sensor" ? sensorPage : item.kind === "review" ? reviewPage : lessonPage;
    const launch = assignedRoute && config.layout !== "clean-step" && item.id === config.sections[0].id ? `<p class="fm-label">${escapeHtml(assignedRoute.title)}</p>${assignedRoute.assignmentStatus === "optional-unassigned" ? `<p class="fm-block">${escapeHtml(assignedRoute.instructions)}</p>` : ""}` : "";
    document.querySelector("#fm-main").classList.toggle("fm-identity-screen", editingIdentity && !!config.compactIdentity);
    document.querySelector("#fm-main").innerHTML = editingIdentity ? identityPage() : launch + renderer(item);
    document.querySelector('#fm-main').classList.toggle('fm-reading-width', !!config.readingSupport && !item.html?.includes('fm-video-step'));
    if(config.readingSupport && !editingIdentity && item.kind!=='review' && !item.html?.includes('fm-video-step')) {
      const main=document.querySelector('#fm-main'),hero=main.querySelector('.fm-hero');
      const available=!!item.narration || ('speechSynthesis' in window && 'SpeechSynthesisUtterance' in window);
      hero?.insertAdjacentHTML('afterend',available ? '<div class="fm-reading-tools"><button type="button" id="fm-read-aloud" class="fm-button quiet" aria-pressed="false">Read aloud</button><span id="fm-reading-status" role="status"></span></div>' : '<p class="fm-reading-unavailable">Read aloud is unavailable in this browser.</p>');
    }
    document.querySelector(".fm-menu nav").innerHTML = nav(); bind(item);
    document.querySelector("#fm-student-label").innerHTML = studentLabel();
    save();
    if (focus) { document.querySelector("#fm-main").focus({ preventScroll: true }); scrollTo({ top: 0, behavior: "smooth" }); }
  }
  function bind(item) {
    const readButton=document.querySelector('#fm-read-aloud');
    if(readButton && item.narration) attachNarration(readButton,document.querySelector('#fm-reading-status'),item.narration);
    else readButton?.addEventListener('click',()=>{
      const status=document.querySelector('#fm-reading-status');
      if(readButton.getAttribute('aria-pressed')==='true'){speechSynthesis.cancel();readButton.textContent='Read aloud';readButton.setAttribute('aria-pressed','false');status.textContent='';return;}
      const text=Array.from(document.querySelectorAll('#fm-main h1,#fm-main h2,#fm-main p,.fm-field>label,.fm-field>small,#fm-main th,#fm-main td,#fm-main caption')).map(node=>node.innerText).filter(Boolean).join('. ');
      const utterance=new SpeechSynthesisUtterance(text.replace(/\s+/g,' ').trim());utterance.lang='en';utterance.rate=0.9;
      const reset=()=>{if(!readButton.isConnected)return;readButton.textContent='Read aloud';readButton.setAttribute('aria-pressed','false');status.textContent='';};
      utterance.onend=reset;utterance.onerror=event=>{reset();if(['canceled','interrupted'].includes(event.error))return;if(status.isConnected)status.textContent='Read aloud is unavailable. Try your device’s reading tool.';};
      readButton.textContent='Stop reading';readButton.setAttribute('aria-pressed','true');speechSynthesis.cancel();speechSynthesis.speak(utterance);
    });
    const identityForm=document.querySelector('#fm-identity-form');
    const captureIdentity=()=>{state.identity=Object.fromEntries(new FormData(identityForm));save();document.querySelector('#fm-student-label').innerHTML=studentLabel();};
    identityForm?.addEventListener('input',captureIdentity);
    identityForm?.addEventListener('submit',event=>{event.preventDefault();captureIdentity();state.identityStarted=true;editingIdentity=false;save();render({focus:true});});
    const choiceForm=document.querySelector('#fm-choice-form');
    choiceForm?.addEventListener('change',()=>{const data=new FormData(choiceForm),index=Number(data.get('activity'));state.choicePositions[item.id]=index;const sourceIndex=item.items[index].sourceIndex ?? index,sourceId=item.responseSource || item.id;state.choiceDrafts[`${sourceId}:${sourceIndex}`]=Number(data.get('answer'));state.responses[sourceId]={answer:Number(data.get('answer')),activity:sourceIndex,checked:false};save();document.querySelector('.fm-feedback')?.remove();});
    choiceForm?.addEventListener('submit',event=>{
      event.preventDefault();const data=new FormData(choiceForm),activityIndex=Number(data.get('activity')),activity=item.items[activityIndex];
      const result=checkChoice(data.get('answer'),activity.answer,activity.options.length);
      if(!result.checked){toast(result.message);return;}
      const sourceIndex=activity.sourceIndex ?? activityIndex,sourceId=item.responseSource || item.id;
      state.choicePositions[item.id]=activityIndex;state.choiceDrafts[`${sourceId}:${sourceIndex}`]=result.answer;
      state.responses[sourceId]={...result,activity:sourceIndex};
      state.attempts.push({id:uid(),at:new Date().toISOString(),sectionId:sourceId,sectionTitle:item.title,activityTitle:activity.title,activityIndex:sourceIndex,passed:result.passed,evaluated:true,response:{selected:activity.options[result.answer]}});save();render();
    });
    document.querySelectorAll('[data-choice-position]').forEach(button=>button.addEventListener('click',()=>{state.choicePositions[item.id]=Number(button.dataset.choicePosition);state.responses[item.id]={activity:state.choicePositions[item.id],checked:false};save();render({focus:true});}));
    document.querySelector('#fm-record-form')?.addEventListener('input',event=>{const key=item.responseSource || item.id;state.responses[key]={...state.responses[key],...Object.fromEntries(new FormData(event.currentTarget)),saved:false};save();});
    document.querySelector('#fm-record-form')?.addEventListener('submit',event=>event.preventDefault());
    document.querySelectorAll('[data-form-position]').forEach(button=>button.addEventListener('click',()=>{state.formPositions[item.id]=Number(button.dataset.formPosition);save();render({focus:true});}));
    const sensorForm = document.querySelector("#fm-sensor-form");
    if (sensorForm) {
      const update = () => { const light = Number(sensorForm.elements.light.value); const threshold = Number(sensorForm.elements.threshold.value); const output = light < threshold ? item.lowOutput : item.highOutput; document.querySelector("#fm-light-value").textContent = light; document.querySelector("#fm-led-grid").innerHTML = renderIcon(output.icon); document.querySelector("#fm-sensor-output").textContent = output.label; };
      sensorForm.addEventListener("input", () => { update(); state.responses[item.id] = {...Object.fromEntries(new FormData(sensorForm)), output:document.querySelector("#fm-sensor-output").textContent};save(); }); sensorForm.addEventListener("submit", (event) => { event.preventDefault(); const light = Number(sensorForm.elements.light.value); const threshold = Number(sensorForm.elements.threshold.value); const output = light < threshold ? item.lowOutput : item.highOutput; const response = { light, threshold, output: output.label, saved: true }; state.responses[item.id] = response; state.attempts.push({ id: uid(), at: new Date().toISOString(), sectionId: item.id, sectionTitle: item.title, activityTitle: "Sensor threshold test", evaluated: false, passed: false, response }); save(); render(); toast("Sensor test saved."); });
    }

  }

  document.addEventListener("formative-check-answer",event=>{if(!event.detail || !config.sections.some(s=>s.inlineChecks.some(c=>c.key===event.detail.key)))return;state.inlineAnswers[event.detail.key]=String(event.detail.value ?? "");save();});
  document.body.innerHTML = shell();
  document.querySelector('#fm-download').addEventListener('click',event=>downloadReport(event.currentTarget));
  document.querySelector('#fm-edit-identity').addEventListener('click',()=>{editingIdentity=true;render({focus:true});});
  addEventListener("hashchange", () => { activeId = route(); document.querySelector('.fm-menu').open=false; render({ focus: true }); });
  render();
}
