// The existing checks own saved responses and PDF mappings. This control checks the table as one task.
class DivisionTableCheck extends HTMLElement {
 connectedCallback(){
  if(this.dataset.ready)return;this.dataset.ready='true';
  const status=this.querySelector('.division-batch-status');
  this.querySelector('.division-check-all').addEventListener('click',()=>{
   let incorrect=0,blank=0;
   for(const check of this.querySelectorAll('t3-check')){
    const input=check.querySelector('input');
    check.querySelector('button').click();
    const result=check.querySelector('[role="status"]');
    const missing=!input.value.trim();
    const wrong=result.textContent!=='Correct.';
    input.setAttribute('aria-invalid',String(wrong));
    if(wrong){if(missing)blank++;else incorrect++;}
    check.dataset.outcome=missing?'blank':wrong?'wrong':'correct';
   }
   status.textContent=blank?`Fill the ${blank} empty ${blank===1?'box':'boxes'}.`+(incorrect?` ${incorrect} other ${incorrect===1?'entry is':'entries are'} incorrect.`:''):incorrect?`${incorrect} ${incorrect===1?'entry is':'entries are'} incorrect. Check the marked boxes.`:'Correct.';
  });
  this.addEventListener('input',event=>{
   const check=event.target.closest('t3-check');
   if(check){delete check.dataset.outcome;event.target.removeAttribute('aria-invalid');status.textContent='';}
  });
 }
}
customElements.define('division-table-check',DivisionTableCheck);
