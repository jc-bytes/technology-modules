const checks=[];
const input=(label,answer,binary=false)=>{
 const index=checks.length;
 checks.push({type:'response',label,source:{kind:'inline-check',index}});
 return `<t3-check ${binary?'answer-format="binary"':''} answer="${answer}" hint="Incorrect."><input aria-label="${label}" inputmode="numeric" autocomplete="off"></t3-check>`;
};
const rows=[{n:12,q:6,r:0},{n:6,q:3,r:0},{n:3,q:1,r:1},{n:1,q:0,r:1}];
const htmlRows=rows.map((row,i)=>`<tr><td><div class="division-equation">${i===0?'<span class="division-start">12</span>':input(`Row ${i+1} starting number`,row.n)}<span>÷ 2 =</span>${input(`Row ${i+1} whole-number answer`,row.q)}</div></td><td>${input(`Row ${i+1} remainder`,row.r)}</td></tr>`).join('');
const final=input('Completed binary number for decimal 12','1100',true);
export const step={id:'guided-divide-twelve-v2',title:'Convert decimal 12 to binary',short:'Try 12',kind:'html',stage:'guided',
 html:`<div class="t3-lab"><p>Convert decimal 12 to binary.</p><p>Complete every division. Use each whole-number answer as the next row's starting number. Stop when the whole-number answer is 0. Read the remainders from bottom to top.</p><division-table-check><table class="division-table"><caption>Your division steps</caption><thead><tr><th scope="col">Division</th><th scope="col">Remainder</th></tr></thead><tbody>${htmlRows}</tbody></table><label class="division-final">Completed binary number${final}</label><button type="button" class="fm-button primary division-check-all">Check my work</button><p class="division-batch-status" role="status"></p></division-table-check></div>`,
 pdf:{prompt:'Convert decimal 12 to binary. Complete each starting number, whole-number answer and remainder. Read the remainders upward and write the completed binary number.',visual:{type:'table',caption:'Your division steps',columns:['Division','Remainder'],rows:[['12 ÷ 2 = ___','___'],['___ ÷ 2 = ___','___'],['___ ÷ 2 = ___','___'],['___ ÷ 2 = ___','___']]},items:checks}};
