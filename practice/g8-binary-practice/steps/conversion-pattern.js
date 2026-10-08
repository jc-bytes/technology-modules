import {divisionStep} from './division-pattern.js?v=power-practice-15';
import {tableHtml, bitTable} from '../content.js?v=power-practice-15';
export function conversion({id, given, binary, sum, options, hint, extra=false}) {
 if(binary)return divisionStep({id,given,sum,options,extra});
 const table=bitTable(given);
 const prompt=`Convert binary ${given} into an ordinary decimal number.`;
 const answer=String(parseInt(given,2));
 return {id,title:extra?`Extra: ${given}`:prompt,short:extra?`Extra ${given}`:given,kind:'html',stage:'independent',
 html:`<div class="t3-lab"><p>Convert binary ${given} into an ordinary decimal number.</p>${tableHtml(table)}<p>Start at position 0 on the right. Use the position as the exponent. Multiply each digit by its power of 2. Add the results. Zeros add nothing.</p><t3-check answer="${sum}" hint="${hint}"><label>Place-value sum for ${given}<select aria-label="Place-value sum for ${given}"><option value="">Choose…</option>${options.map(x=>`<option>${x}</option>`).join('')}</select></label></t3-check><t3-check answer="${answer}" hint="${hint}"><label>Decimal answer for ${given}<input aria-label="Decimal answer for ${given}" inputmode="numeric" autocomplete="off"></label></t3-check></div>`,
 pdf:{prompt:prompt+' Start at position 0 on the right. Multiply each digit by its power of 2. Add the results.',visual:{type:'table',...table},items:[{type:'response',label:'Place-value sum',source:{kind:'inline-check',index:0}},{type:'response',label:'Decimal answer',source:{kind:'inline-check',index:1}}]}};
}
