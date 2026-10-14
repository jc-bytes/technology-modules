import { tableHtml } from './content.js?v=3.2.0';
import { taskPdf } from './pdf.js?v=3.2.0';

const escape = value => String(value).replace(/[&<>"']/g, char => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));

// These patterns turn one authored question into its screen and PDF versions.
// build-printable.mjs reads the resulting screen section for the paper version.
export function exampleStep({id, title, short, explanation, source, action, table, takeaway}) {
  return {
    id, title, short, kind:'html', stage:'model', authoring:{table},
    html:`<p>${escape(explanation)}</p><div class="fm-source"><p>${escape(source)}</p></div><p>${escape(action)}</p>${tableHtml(table)}<p>${escape(takeaway)}</p>`,
  };
}

export function guidedSelect({id, title, short, instruction, table, question, options, answer, hint}) {
  return {
    id, title, short, kind: 'html', stage:'guided', authoring:{question, options, answer, table},
    html: `<div class="t3-lab"><p>${escape(instruction)}</p>${tableHtml(table)}<t3-check answer="${escape(answer)}" hint="${escape(hint)}"><label>${escape(question)}<select aria-label="${escape(question)}"><option value="">Choose…</option>${options.map(option=>`<option>${escape(option)}</option>`).join('')}</select></label></t3-check></div>`,
    pdf: taskPdf({prompt: `${instruction} ${question}`, table, label: question, source: {kind:'inline-check', index:0}}),
  };
}

export function choiceStep({id, title, short, activityTitle, table, question, options, answer, hint, stage='practice'}) {
  return {
    id, title, short, kind: 'choice', stage, authoring:{question, options, answer, table},
    items: [{title: activityTitle, visual: tableHtml(table), question, options, answer, retry: hint}],
    pdf: taskPdf({prompt: question, table, label: question, source: {kind:'choice', index:0}}),
  };
}

export function explanationStep({id, title, short, table, question, fieldId, help, plainLanguage, starter, replayStepId}) {
  return {
    id, title, short, kind: 'form', stage:'practice', authoring:{question, table}, intro: tableHtml(table),
    fields: [{name: fieldId, label: question, type:'textarea', help, plainLanguage, starter, replayStepId}],
    pdf: taskPdf({prompt: question, table, label: question, source: {kind:'field', name:fieldId}}),
  };
}

// A video is one normal Watch step, followed by separate answer steps.
export function videoStep({id, title, short=title, embedUrl, openUrl, instruction, stopAt, credit, stage='model'}) {
  return {id,title,short,kind:'html',stage,
    html:`<section class="fm-video-step"><iframe title="${escape(title)}" src="${escape(embedUrl)}" allow="encrypted-media; picture-in-picture" allowfullscreen></iframe><p>${escape(instruction)}</p><p><a href="${escape(openUrl)}" target="_blank" rel="noopener">Open on YouTube</a>${stopAt ? ` · Stop at ${escape(stopAt)}.` : ''}</p>${credit ? `<small>${escape(credit)}</small>` : ''}</section>`};
}
