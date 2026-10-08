import {tableHtml} from '../content.js?v=binary-copy-17';
export function divisionRows(number) {
 const rows=[];let n=Number(number);
 do {const quotient=Math.floor(n/2),remainder=n%2;rows.push({number:n,quotient,remainder});n=quotient;} while(n>0);
 return rows;
}
export function divisionStep({id,given,stage='independent',guided=false,extra=false,sum,options}) {
 const rows=divisionRows(given);
 const prompt=`Convert decimal ${given} to binary.`;
 const answer=Number(given).toString(2);
 const table={caption:'Your division steps',columns:['Division','Remainder'],rows:rows.map((row,i)=>[`${i===0?given:'___'} ÷ 2 = ___`,'___'])};
 let index=0;const items=[];
 const check=(label,value,binary=false)=>{items.push({type:'response',label,source:{kind:'inline-check',index:index++}});return `<t3-check ${binary?'answer-format="binary"':''} answer="${value}" hint="Incorrect."><input aria-label="${label}" inputmode="numeric" autocomplete="off"></t3-check>`;};
 let html=`<div class="t3-lab"><p>${prompt}</p><p>Complete every division. Use each whole-number answer as the next row's starting number. Stop when the whole-number answer is 0.</p><division-table-check><table class="division-table"><caption>Your division steps</caption><thead><tr><th scope="col">Division</th><th scope="col">Remainder</th></tr></thead><tbody>`;
 rows.forEach((row,i)=>{
  const start=i===0?`<span class="division-start">${given}</span>`:check(`Row ${i+1} starting number for ${given}`,row.number);
  html+=`<tr><td><div class="division-equation">${start}<span>÷ 2 =</span>${check(`Quotient for ${row.number} ÷ 2`,row.quotient)}</div></td><td>${check(`Remainder for ${row.number} ÷ 2`,row.remainder)}</td></tr>`;
 });
 html+='</tbody></table><p>Read the remainders from bottom to top. Write those digits in the answer box.</p>';
 html+=`<label class="division-final">Completed binary number${check(`Binary answer for ${given}`,answer,true)}</label><button type="button" class="fm-button primary division-check-all">Check my work</button><p class="division-batch-status" role="status"></p></division-table-check>`;
 html+='</div>';
 return {id,followUp:sum?decimalCheckStep({id:id+'-check-decimal-v1',given,sum,options}):null,title:extra?`Extra: convert decimal ${given}`:guided?'Try dividing 12 by 2':`Convert decimal ${given} to binary`,short:extra?`Extra ${given}`:guided?'Divide 12':given,kind:'html',stage,html,pdf:{prompt:prompt+' Show the whole-number answer and remainder for every division. Read the remainders from bottom to top.',visual:{type:'table',...table},items}};
}

function decimalCheckStep({id,given,sum,options}) {
 const bits=Number(given).toString(2).padStart(4,'0');
 const prompt=`Check binary ${bits} by changing it back to decimal.`;
 const table={caption:`Binary ${bits}`,columns:['Binary digit',...bits],rows:[['Position','3','2','1','0'],['Multiply',...[...bits].map((bit,i)=>`${bit} × 2^${3-i}`)]]};
 const label=`Place-value sum for ${given}`;
 return {id,title:`Check your answer for ${given}`,short:`Check ${given}`,kind:'html',stage:'independent',
 html:`<div class="t3-lab"><p>${prompt}</p>${tableHtml(table)}<p>Work out each multiplication. Add the results. Zeros add nothing.</p><t3-check answer="${sum}" hint="Work out the powers of 2, multiply, then add."><label>${label}<select aria-label="${label}"><option value="">Choose…</option>${options.map(option=>`<option>${option}</option>`).join('')}</select></label></t3-check></div>`,
 pdf:{prompt:prompt+' Work out each multiplication. Add the results.',visual:{type:'table',...table},items:[{type:'response',label,source:{kind:'inline-check',index:0}}]}};
}
