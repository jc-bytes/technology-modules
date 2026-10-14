function evidenceSections(config,state){
 const archived=(config.archivedSections || []).filter(section=>{
  const saved=state.responses?.[section.responseSource || section.id] || {};
  return (section.fields || []).some(field=>String(saved[field.name] || '').trim()) ||
   (section.items || []).some((item,index)=>state.choiceDrafts?.[`${section.responseSource || section.id}:${item.sourceIndex ?? index}`]!==undefined || (state.attempts || []).some(a=>a.sectionId===(section.responseSource || section.id) && (a.activityIndex===(item.sourceIndex ?? index) || a.activityTitle===item.title))) ||
   (section.inlineChecks || []).some(check=>String(state.inlineAnswers?.[check.key] || '').trim());
 }).map(section=>({...section,title:`Earlier saved work: ${section.title}`}));
 return [...config.sections,...archived];
}
export const escapeEvidence = value => String(value ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
export function checkChoice(raw, expected, optionCount) {
  if (raw === null || raw === undefined || raw === '') return { checked:false, message:'Choose an answer.' };
  const answer = Number(raw);
  if (!Number.isInteger(answer) || answer < 0 || answer >= optionCount) return { checked:false, message:'Choose an answer.' };
  return {checked:true, answer, passed:answer === expected};
}
export function foundationEvidence(config, state) {
  const e=escapeEvidence, identity=state.identity || {};
  const fields=evidenceSections(config,state).map(section=>{
    const saved=state.responses[section.responseSource || section.id] || {};
    let answers='';
    if(section.kind==='form') answers=section.fields.map(field=>`<p><strong>${e(field.label)}</strong><br>${e(saved[field.name] || 'Not answered')}</p>`).join('');
    if(section.kind==='choice') answers=section.items.map((item,index)=>{
      const draft=state.choiceDrafts?.[`${section.responseSource || section.id}:${item.sourceIndex ?? index}`];
      const attempt=[...state.attempts].reverse().find(a=>a.sectionId===(section.responseSource || section.id) && (a.activityIndex===(item.sourceIndex ?? index) || a.activityTitle===item.title));
      const value=draft!==undefined ? item.options[draft] : attempt?.response?.selected;
      return `<p><strong>${e(item.question)}</strong><br>${e(value || 'Not answered')}</p>`;
    }).join('');
    if(section.kind==='sensor') answers=['light','threshold','output'].map(key=>`<p><strong>${e(key)}</strong>: ${e(saved[key] ?? 'Not answered')}</p>`).join('');
    const earlier=(section.legacyFields || []).filter(field=>String(saved[field.name] ?? '').trim()).map(field=>`<p><strong>${e(field.label)}</strong><br>${e(saved[field.name])}</p>`).join('');
    if(earlier)answers+=`<h3>Earlier saved answers</h3>${earlier}`;
    answers += (section.inlineChecks || []).map(check=>`<p><strong>${e(check.label)}</strong><br>${e(state.inlineAnswers?.[check.key] || 'Not answered')}</p>`).join('');
    return answers?`<section><h2>${e(section.title)}</h2>${answers}</section>`:'';
  }).join('');
  return `<!doctype html><html lang="en"><meta charset="utf-8"><title>${e(config.assignedRoute?.title || config.title)} answers</title><style>body{font:18px Arial;line-height:1.6;max-width:850px;margin:40px auto;padding:24px;color:#123f58}section{border-top:1px solid #aaa;margin-top:24px}p{white-space:pre-wrap}</style><h1>${e(config.assignedRoute?.title || config.title)}</h1><p>Name: ${e([identity.firstName,identity.lastName].filter(Boolean).join(' ') || 'Not entered')}<br>Grade: ${e(identity.grade || 'Not entered')}<br>Date: ${e(new Date().toLocaleDateString())}</p>${fields || '<p>No web answers entered. Keep your work in the assigned software.</p>'}</html>`;
}

export function foundationPdfReport(config, state) {
  const identity = state.identity || {};
  const blocks = [];
  const tasks = [];
  for (const section of evidenceSections(config,state)) {
    if (section.kind === 'review') continue;
    const saved = state.responses[section.responseSource || section.id] || {};
    blocks.push({heading: section.title});
    if (section.kind === 'form') {
      for (const field of section.fields) blocks.push({label: field.label, answer: saved[field.name] || 'Not answered'});
    } else if (section.kind === 'choice') {
      section.items.forEach((item, index) => {
        const draft = state.choiceDrafts?.[`${section.responseSource || section.id}:${item.sourceIndex ?? index}`];
        const attempt = [...state.attempts].reverse().find(a => a.sectionId === section.id && (a.activityIndex === index || a.activityTitle === item.title));
        const value = draft !== undefined ? item.options[draft] : attempt?.response?.selected;
        blocks.push({label: item.question, answer: value || 'Not answered'});
      });
    } else if (section.kind === 'sensor') {
      for (const key of ['light', 'threshold', 'output']) blocks.push({label: key, answer: saved[key] ?? 'Not answered'});
    }
    const earlier = (section.legacyFields || []).filter(field => String(saved[field.name] ?? '').trim());
    if (earlier.length) {
      blocks.push({heading: 'Earlier saved answers'});
      for (const field of earlier) blocks.push({label: field.label, answer: saved[field.name]});
    }
    for (const check of section.inlineChecks || []) blocks.push({label: check.label, answer: state.inlineAnswers?.[check.key] || 'Not answered'});

    const readSource = source => {
      if (!source || typeof source !== 'object') return '';
      if (source.kind === 'field') return saved[source.name] ?? '';
      if (source.kind === 'inline-check') {
        const check = section.inlineChecks?.[source.index];
        return check ? state.inlineAnswers?.[check.key] ?? '' : '';
      }
      if (source.kind === 'choice') {
        const item = section.items?.[source.index];
        if (!item) return '';
        const draft = state.choiceDrafts?.[`${section.responseSource || section.id}:${item.sourceIndex ?? source.index}`];
        if (draft !== undefined) return item.options[draft] ?? '';
        const attempt = [...(state.attempts || [])].reverse().find(entry => entry.sectionId === (section.responseSource || section.id) && (entry.activityIndex === (item.sourceIndex ?? source.index) || entry.activityTitle === item.title));
        return attempt?.response?.selected ?? '';
      }
      return '';
    };
    const pdfItems = section.pdf?.items?.map(item => item.type === 'calculation'
      ? {type:'calculation',label:item.label,multiplication:readSource(item.multiplicationSource),total:readSource(item.totalSource)}
      : {type:'response',label:item.label,answer:readSource(item.source)})
      ?? [
        ...(section.kind === 'form' ? section.fields.map(field => ({type:'response',label:field.label,answer:saved[field.name] ?? ''})) : []),
        ...(section.kind === 'choice' ? section.items.map((item,index) => ({type:'response',label:item.question,answer:readSource({kind:'choice',index})})) : []),
        ...(section.kind === 'sensor' ? ['light','threshold','output'].map(key => ({type:'response',label:key,answer:saved[key] ?? ''})) : []),
        ...(section.inlineChecks || []).map((check,index) => ({type:'response',label:check.label,answer:readSource({kind:'inline-check',index})})),
      ];
    for (const field of earlier) pdfItems.push({type:'response',label:`Earlier: ${field.label}`,answer:saved[field.name]});
    if (pdfItems.length || section.pdf?.prompt || section.pdf?.visual) tasks.push({
      heading:section.pdf?.heading || section.title,
      prompt:section.pdf?.prompt || section.summary || 'Your recorded work for this section.',
      visual:section.pdf?.visual,
      items:pdfItems,
    });
  }
  return {
    layout: 'structured',
    title: config.assignedRoute?.title || config.title,
    headerLabel: config.pdfHeader || 'ACADEMIA INTERNACIONAL DAVID  ·  TECHNOLOGY',
    footerLabel: config.pdfFooter || 'ACADEMIA INTERNACIONAL DAVID  ·  TECHNOLOGY',
    name: [identity.firstName, identity.lastName].filter(Boolean).join(' '),
    group: identity.grade,
    date: new Date().toLocaleDateString(),
    version: config.version || config.id || 'formative practice',
    status: config.assignedRoute?.pdfStatus || config.pdfStatus || 'Practice work. Teacher reviews explanations and responses.',
    sections: config.sections.map(section => section.id),
    tasks,
    blocks: blocks.length ? blocks : [{text: 'No web answers entered. Keep your work in the assigned software.'}],
  };
}
