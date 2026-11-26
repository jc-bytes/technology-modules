// Pictures rendered by MakeCode from the main.blocks stored in each downloadable HEX.
function blockPicture(id, description) {
  const image=document.createElement('img');
  image.src='blocks/'+id+'.png';
  image.alt=description;
  image.className='blockStack';
  return image;
}
function showProgram(target,view,settings) {
  const action=(key,local)=>key==='local'?local:'send '+key.toUpperCase();
  const blocks=view==='inputs'?[
    ['start','On start set radio group to 7'],
    ...[['A',17],['AB',18],['B',19]].map(([button,d])=>['input-'+button,'On '+button+' set distance to '+d+' and call checkDistance'])
  ]:view==='receiver'?[['receiver-'+settings.tone,'On radio received: ALERT shows a skull and plays 440 Hz for '+settings.tone+' milliseconds; otherwise clear the screen and stop sounds.']]:
    [['sender-'+settings.high+'-'+settings.low,'checkDistance: if distance is greater than 18, '+action(settings.high,'show X')+'; otherwise '+action(settings.low,'clear the screen')+'.']];
  target.replaceChildren(...blocks.map(([id,alt])=>blockPicture(id,alt)));
}
function showPalette(target,control,onSelect) {
  const key=control.dataset.code;
  target.classList.add('palette');
  target.replaceChildren(...Array.from(control.options,option=>{
    const button=document.createElement('button');
    button.type='button';button.className='blockChoice';button.dataset.block=option.value;
    button.setAttribute('aria-pressed',String(option.value===control.value));
    button.setAttribute('aria-label',option.textContent);
    button.append(blockPicture(key+'-'+option.value,''));
    button.onclick=()=>onSelect(option.value);
    return button;
  }));
}
