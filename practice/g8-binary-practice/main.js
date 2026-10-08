import './division-table-check.js?v=binary-copy-17';
import { mountFoundationModule } from './shared/foundation-module.js?v=binary-copy-17';
import { lesson } from './lesson.js?v=binary-copy-17';
import { validateLesson } from './validate.js?v=binary-copy-17';
// Keep saved division work when removing the fixed four-bit wording.
try {
 const prefix='t3-practice:v1:'+location.pathname+location.search+':';
 const saved=JSON.parse(localStorage.getItem(lesson.storageKey)||'{}');
 const keys=new Set([...Object.keys(localStorage),...Object.keys(saved.inlineAnswers||{})]);
 for(const key of keys) {
  if(!key.startsWith(prefix))continue;
  const updated=key.replace(/Convert decimal (\d+) into four binary digits\.:/, 'Convert decimal $1 to binary.:').replace(/:Four bits for (\d+)$/, ':Binary answer for $1').replace(/:Completed four-bit binary number for decimal 12$/, ':Completed binary number for decimal 12');
  if(updated===key)continue;
  const value=saved.inlineAnswers?.[key] ?? localStorage.getItem(key);
  if(value!==null && value!==undefined && localStorage.getItem(updated)===null)localStorage.setItem(updated,value);
  if(saved.inlineAnswers && !(updated in saved.inlineAnswers))saved.inlineAnswers[updated]=value;
 }
 localStorage.setItem(lesson.storageKey,JSON.stringify(saved));
} catch { /* The runtime reports storage failure. */ }
validateLesson(lesson);
document.title = lesson.title;
// Preserve answers to unchanged guided questions when their instructional wording changes.
try {
 const prefix='t3-practice:v1:'+location.pathname+location.search+':';
 const saved=JSON.parse(localStorage.getItem(lesson.storageKey)||'{}');
 for(const [before,after,label] of [["12 uses 8 and 4. Put 1 in those places. Put 0 in the other places.", "Convert decimal 12 to binary. Read the remainders from the bottom row to the top row.", "Which four bits show 12?"], ["Start with 8. There is 4 left. Choose the places that add to 12.", "Check your result by converting binary 1100 back to decimal. Multiply each digit by its position value, then add the results.", "Which sum makes 12?"], ["Read the bits below 8, 4, 2 and 1. Choose only the places marked 1.", "Convert binary 0101 to decimal. Multiply each digit by the number above it. Choose the sum of the nonzero results.", "Which sum does 0101 show?"], ["You found 4 and 1. Add those values.", "Convert binary 0101 to decimal. Add the multiplication results: 0 + 4 + 0 + 1.", "What decimal number is 0101?"]]) {
  const oldKey=prefix+before+':'+label,newKey=prefix+after+':'+label;
  const value=saved.inlineAnswers?.[oldKey] ?? localStorage.getItem(oldKey);
  if(value!==null && value!==undefined && localStorage.getItem(newKey)===null) localStorage.setItem(newKey,value);
 }
} catch { /* The runtime reports unavailable browser storage. */ }
try {
 const prefix='t3-practice:v1:'+location.pathname+location.search+':Convert decimal 12 into four binary digits.:';
 for(const [row,n] of [12,6,3,1].entries())for(const [oldLabel,newLabel] of [[`Quotient for ${n} ÷ 2`,`Row ${row+1} whole-number answer`],[`Remainder for ${n} ÷ 2`,`Row ${row+1} remainder`]]){
  const value=localStorage.getItem(prefix+oldLabel);
  if(value!==null && localStorage.getItem(prefix+newLabel)===null)localStorage.setItem(prefix+newLabel,value);
 }
} catch { /* Existing runtime handles storage failure. */ }
// The guided questions retain their meanings; preserve their compatible saved answers.
try {
 const prefix='t3-practice:v1:'+location.pathname+location.search+':';
 for(const [before,after,label] of [["Convert binary 0101 to decimal. Multiply each digit by the number above it. Choose the sum of the nonzero results.", "Convert binary 0101 to decimal. Multiply each digit by 2^x, where x is its position counting from 0 on the right. Choose the sum of the nonzero results.", "Which sum does 0101 show?"], ["Convert binary 0101 to decimal. Add the multiplication results: 0 + 4 + 0 + 1.", "Convert binary 0101 to decimal. Add (0 \u00d7 2^3) + (1 \u00d7 2^2) + (0 \u00d7 2^1) + (1 \u00d7 2^0).", "What decimal number is 0101?"], ["Check your result by converting binary 1100 back to decimal. Multiply each digit by its position value, then add the results.", "Check your result by converting binary 1100 back to decimal. Multiply each digit by its power of 2, then add the results.", "Which sum makes 12?"]]) {
  const oldKey=prefix+before+':'+label,newKey=prefix+after+':'+label;
  const value=localStorage.getItem(oldKey);
  if(value!==null && localStorage.getItem(newKey)===null)localStorage.setItem(newKey,value);
 }
} catch { /* Existing runtime handles storage failure. */ }
// Preserve saved answers when only support wording changes.
try {
 const prefix='t3-practice:v1:'+location.pathname+location.search+':';
 const saved=JSON.parse(localStorage.getItem(lesson.storageKey)||'{}');
 for(const [before,after,label] of [["Check your result by converting binary 1100 back to decimal. Multiply each digit by its power of 2, then add the results.", "Change binary 1100 back to decimal. Multiply each digit by its power of 2. Add the results.", "Which sum makes 12?"], ["Convert binary 0101 to decimal. Multiply each digit by 2^x, where x is its position counting from 0 on the right. Choose the sum of the nonzero results.", "Change binary 0101 into decimal. Work out each multiplication in the table. Zeros add nothing.", "Which sum does 0101 show?"], ["Convert binary 0101 to decimal. Add (0 \u00d7 2^3) + (1 \u00d7 2^2) + (0 \u00d7 2^1) + (1 \u00d7 2^0).", "Add the results of the four multiplications.", "What decimal number is 0101?"], ["Use binary place values, 8, 4, 2 and 1.", "Use the powers of 2 in the table.", "What is the first 1 in binary 1000 worth?"], ["A starting zero uses none of its place value.", "Multiplying by 0 gives 0.", "How much do the starting zeros in 0011 add?"]]) {
  const oldKey=prefix+before+':'+label,newKey=prefix+after+':'+label;
  const value=localStorage.getItem(oldKey) ?? saved.inlineAnswers?.[oldKey];
  if(value!==null && value!==undefined && localStorage.getItem(newKey)===null)localStorage.setItem(newKey,value);
 }
} catch { /* The runtime reports storage failures. */ }
// The conversion-back check moved to its own page; keep existing answers.
try {
 const prefix='t3-practice:v1:'+location.pathname+location.search+':';
 const saved=JSON.parse(localStorage.getItem(lesson.storageKey)||'{}');
 for(const given of [3,14,5,13]) {
  const bits=given.toString(2).padStart(4,'0'),label=`Place-value sum for ${given}`;
  const oldKey=prefix+`Convert decimal ${given} into four binary digits.:`+label;
  const newKey=prefix+`Check binary ${bits} by changing it back to decimal.:`+label;
  const value=localStorage.getItem(oldKey) ?? saved.inlineAnswers?.[oldKey];
  if(value!==null && value!==undefined && localStorage.getItem(newKey)===null)localStorage.setItem(newKey,value);
 }
} catch { /* The runtime reports storage failures. */ }
// Keep equivalent saved sums when displaying all four terms.
try {
 const prefix='t3-practice:v1:'+location.pathname+location.search+':';
 const saved=JSON.parse(localStorage.getItem(lesson.storageKey)||'{}');
 const expand=value=>{const terms=String(value).split(' + ');return [8,4,2,1].map(n=>terms.includes(String(n))?n:0).join(' + ');};
 for(const key of Object.keys(localStorage)) {
  if(!key.startsWith(prefix) || !/:(Place-value sum for|Which sum)/.test(key))continue;
  const value=localStorage.getItem(key);
  if(value && /^(?:[01248])(?: \+ [01248])*$/.test(value)) {
   const updated=expand(value);localStorage.setItem(key,updated);
   if(saved.inlineAnswers && key in saved.inlineAnswers)saved.inlineAnswers[key]=updated;
  }
 }
 localStorage.setItem(lesson.storageKey,JSON.stringify(saved));
} catch { /* The runtime reports storage failures. */ }
mountFoundationModule(lesson);
