import {tableHtml} from './content.js?v=binary-copy-17';
// Existing sums keep their labels and saved keys. New boxes precede them in PDF order.
export function withPowerPractice(section) {
 const visual=section.pdf?.visual;
 if(!section.html || visual?.columns?.[0]!=='Binary digit' || !(section.stage==='independent' || ['guided-five-sum','guided-twelve-sum'].includes(section.id)))return section;
 const bits=visual.columns.slice(1).join('');
 const items=[];
 const check=(label,answer)=>{
  items.push({type:'response',label,source:{kind:'inline-check',index:items.length}});
  return `<t3-check answer="${answer}" hint="Incorrect."><input aria-label="${label}" inputmode="numeric" autocomplete="off"></t3-check>`;
 };
 const multiplies=[...bits].map((bit,i)=>`<span class="power-entry">${check(`Position ${3-i} binary digit`,bit)}<span aria-hidden="true">× 2</span><sup>${check(`Position ${3-i} exponent`,3-i)}</sup></span>`);
 const results=[...bits].map((bit,i)=>check(`Position ${3-i} result`,Number(bit)*2**(3-i)));
 const table={caption:`Binary ${bits}`,columns:['Binary digit',...bits],rows:[['Position','3','2','1','0'],['Multiply',...multiplies],['Result',...results]]};
 // tableHtml escapes authored text. Substitute only these locally generated controls.
 let html=tableHtml({...table,rows:table.rows.map(row=>row.map((cell,i)=>i && ['Multiply','Result'].includes(row[0])?`POWERBOX${row[0]}${i}`:cell))});
 for(const [role,values] of [['Multiply',multiplies],['Result',results]])values.forEach((value,i)=>{html=html.replace(`POWERBOX${role}${i+1}`,value);});
 html=`<p>Fill the blue box with the binary digit. Fill the raised pink box with its position. Work out each result.</p><division-table-check class="power-practice">${html}<button type="button" class="fm-button primary division-check-all">Check my table</button><p class="division-batch-status" role="status"></p></division-table-check>`;
 const paper={...table,rows:[table.rows[0],['Multiply',...bits.split('').map(()=> '___ × 2^___')],['Result','___','___','___','___']]};
 return {...section,authoring:section.authoring?{...section.authoring,table:paper}:undefined,printableTable:paper,html:section.html.replace(/<table[\s\S]*?<\/table>/,html),pdf:{...section.pdf,visual:{type:'table',...paper},items:[...items,...section.pdf.items.map(item=>({...item,source:item.source?.kind==='inline-check'?{...item.source,index:item.source.index+12}:item.source}))]}};
}
