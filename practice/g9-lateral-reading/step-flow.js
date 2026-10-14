// Expand hidden question/answer parts into the normal step sequence.
// Original response scopes and field names are retained for existing work.
export function singleActionLesson(lesson) {
 if (!lesson.singleActionSteps) return lesson;
 const sections=lesson.sections.flatMap(section=>{
  if(section.kind==='form' && section.fields.length>1 && !section.singleAction){
   return section.fields.map((field,index)=>({...section,
    id:index===0?section.id:`${section.id}--${encodeURIComponent(field.name)}`,
    title:field.stepTitle || `${section.title} — ${index+1}`,
    short:field.stepTitle || `${section.short || section.title} ${index+1}`,
    responseSource:section.responseSource || section.id,
    intro:index===0?section.intro:field.intro || '', fields:[field],
    legacyFields:index===0?section.legacyFields:[],
    pdf:section.pdf ? {...section.pdf,items:section.pdf.items?.filter(item=>
      item.type==='response' && item.source?.kind==='field' && item.source.name===field.name)} : undefined,
   }));
  }
  if(section.kind==='choice' && section.items.length>1){
   return section.items.map((item,index)=>({...section,
    id:index===0?section.id:`${section.id}--question-${index+1}`,
    title:item.title || `${section.title} — ${index+1}`,short:item.title || `${section.short || section.title} ${index+1}`,
    responseSource:section.responseSource || section.id,items:[{...item,sourceIndex:index}],
    pdf:section.pdf ? {...section.pdf,items:section.pdf.items?.filter(task=>task.source?.kind==='choice' && task.source.index===index).map(task=>({...task,source:{...task.source,index:0}}))} : undefined,
   }));
  }
  return section;
 });
 if(new Set(sections.map(s=>s.id)).size!==sections.length)throw new Error('Expanded step IDs must be unique.');
 return {...lesson,sections};
}
