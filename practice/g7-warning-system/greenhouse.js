// A small walkable room, drawn in the same pixel scale as Python Detective.
const greenhouse = (() => {
  const canvas = document.querySelector('#garden');
  const ctx = canvas.getContext('2d');
  const art = document.createElement('canvas');
  art.width = canvas.width; art.height = canvas.height;
  const bg = art.getContext('2d');
  const sprites = new Image();
  sprites.src = 'greenhouse-characters.png';
  const reduce = matchMedia('(prefers-reduced-motion: reduce)');
  const $ = id => document.getElementById(id);
  const ink = '#2b4036', iron = '#385953', light = '#a4bb98';
  let seed = 726;
  function random(){seed=(Math.imul(seed,1664525)+1013904223)>>>0;return seed/4294967296;}
  const box = (c,x,y,w,h,color) => {c.fillStyle=color;c.fillRect(Math.round(x),Math.round(y),w,h);};
  function poly(c,points,color){
    c.fillStyle=color;c.beginPath();
    points.forEach(([x,y],i)=>i?c.lineTo(Math.round(x),Math.round(y)):c.moveTo(Math.round(x),Math.round(y)));
    c.closePath();c.fill();
  }
  function line(c,x,y,x2,y2,width,color){
    const n=Math.max(Math.abs(x2-x),Math.abs(y2-y),1);
    for(let i=0;i<=n;i++)box(c,x+(x2-x)*i/n,y+(y2-y)*i/n,width,width,color);
  }
  function leaf(c,x,y,dx,dy,size,color){
    poly(c,[[x,y],[x+dx*.45-dy*size,y+dy*.45+dx*size],[x+dx,y+dy],[x+dx*.65+dy*size,y+dy*.65-dx*size]],color);
  }
  function fern(c,x,y,s,shade){
    const greens=shade?['#496c54','#5f865d','#81a26b']:['#224e42','#337158','#55946b'];
    for(let i=0;i<7;i++){
      const dx=(i-3)*s*2.4,dy=-(8+Math.sin(i*Math.PI/6)*10)*s;
      line(c,x,y,x+dx,y+dy,1,greens[0]);
      for(let k=1;k<5;k++){
        const t=k/5, a=x+dx*t,b=y+dy*t;
        leaf(c,a,b,-(5-k*.6)*s,(-2-k/2)*s,.2,greens[i%3]);
        leaf(c,a,b,(5-k*.65)*s,-3*s,.2,greens[(i+1)%3]);
      }
    }
  }
  function pot(c,x,y,s){
    poly(c,[[x-7*s,y],[x+7*s,y],[x+5*s,y+9*s],[x-4*s,y+9*s]],'#944e39');
    box(c,x-8*s,y-2*s,16*s,3*s,'#c88052');box(c,x-5*s,y+2*s,3*s,5*s,'#d38c60');
  }
  function drawRoom(){
    const sky=bg.createLinearGradient(0,0,0,106);sky.addColorStop(0,'#90c8c5');sky.addColorStop(.66,'#f8ddb1');sky.addColorStop(1,'#e7c791');
    bg.fillStyle=sky;bg.fillRect(0,0,480,178);
    box(bg,296,20,20,14,'#fff0b5');box(bg,300,17,12,21,'#fff0b5');
    for(let layer=0;layer<3;layer++){
      const trail=[[0,114]];
      for(let x=-4;x<490;x+=6)trail.push([x,65+layer*14+10*Math.sin(x*.027+layer*2)+random()*5]);
      trail.push([490,114]);poly(bg,trail,['#90aaa0','#789489','#607f70'][layer]);
    }
    for(let i=0;i<16;i++){const x=i*33;fern(bg,x,107,1.2+random(),true);}
    for(let x=-85;x<500;x+=78){
      line(bg,x,0,x+44,32,4,iron);line(bg,x+1,0,x+46,32,1,light);
      box(bg,x+44,32,4,80,iron);box(bg,x+45,33,1,76,light);
      line(bg,x+46,34,x+58,46,2,iron);
      poly(bg,[[x+52,38],[x+63,38],[x+53,60]],'#ffffff40');
    }
    box(bg,0,31,480,5,iron);box(bg,0,32,480,1,'#c6ceb0');box(bg,0,69,480,3,'#618077');
    for(let x=0;x<480;x+=24){box(bg,x,104,23,17,x%48?'#647e66':'#778c70');box(bg,x,105,23,1,'#a4ab83');}
    box(bg,0,119,480,59,'#bb9a73');
    for(let y=123;y<178;y+=10){
      box(bg,0,y,480,1,'#997c60');for(let x=(y%3)*15;x<480;x+=46)box(bg,x,y,1,10,'#a08365');
    }
    for(let i=0;i<150;i++){const x=random()*480,y=122+random()*55;box(bg,x,y,2,1,'#caad86');}
    // Door frame, panes, kick plate and brass handle.
    box(bg,374,34,60,89,'#3c5044');box(bg,377,37,54,84,'#a7704e');box(bg,381,40,45,78,'#76543e');
    box(bg,384,44,39,43,'#99c0aa');box(bg,386,47,35,36,'#82a99a');line(bg,388,77,411,50,2,'#b6cfb5');
    box(bg,401,44,3,43,'#8e6449');box(bg,384,64,39,3,'#8e6449');box(bg,385,94,36,18,'#936449');
    box(bg,416,88,5,2,'#e6c478');box(bg,371,121,65,4,'#676c58');
    // Propagation bench, terracotta pots, seed trays and a watering can.
    box(bg,1,95,75,5,'#724f3c');box(bg,4,100,4,22,ink);box(bg,61,100,4,22,ink);
    for(const [x,s] of [[10,1],[32,1],[57,1]]){fern(bg,x,85,1.15,true);pot(bg,x,86,s);}
    box(bg,68,113,96,6,'#c68c58');box(bg,66,111,100,3,'#e6b77c');box(bg,72,119,6,23,'#6e513c');box(bg,153,119,6,23,'#6e513c');
    box(bg,74,130,82,3,'#986640');for(let x=83;x<139;x+=14)pot(bg,x,128,0.72);
    box(bg,208,106,76,5,'#dda66b');box(bg,212,111,68,23,'#82573f');box(bg,216,113,28,14,'#ad7c53');
    box(bg,248,113,27,14,'#ad7c53');box(bg,227,116,6,2,'#e5bf83');box(bg,259,116,6,2,'#e5bf83');
    box(bg,219,85,25,17,ink);box(bg,221,87,21,12,'#75ac95');box(bg,224,91,13,2,'#d7e9af');box(bg,229,102,6,4,ink);
    pot(bg,273,98,.85);box(bg,270,90,2,7,'#efac54');line(bg,275,97,278,88,2,'#6b7871');
    for(const x of [23,176,322,457]){
      line(bg,x,0,x,23,1,ink);line(bg,x,20,x-7,30,1,ink);line(bg,x,20,x+7,30,1,ink);
      pot(bg,x,31,1);fern(bg,x,31,.85,false);
      for(let j=0;j<3;j++){line(bg,x-4+j*4,35,x-5+j*4,40+j*3,1,'#477950');leaf(bg,x-5+j*4,40+j*3,-4,3,.23,'#59845a');}
    }
    fern(bg,457,124,2,false);pot(bg,457,122,1.5);
    for(const x of [0,480]){fern(bg,x,169,2.3,false);fern(bg,x+(x?-12:12),170,1.6,false);}
    // The copper rail guides the lifting basket.
    box(bg,94,61,3,50,'#78684c');box(bg,95,61,1,48,'#c6a96a');
    for(let y=65;y<105;y+=6)box(bg,92,y,5,1,'#e3c785');
  }
  drawRoom();
  let x=22,goal=77, arrival=null,lift=0,desired=0,alarm=false,localX=false,radioAt=-10000,word='',last=0,walk=0,clock=0,ready=false;
  let pending=19,audio;
  function say(s){$('speech').textContent=s;}
  function walkTo(where,fn){goal=where;arrival=fn;}
  function character(x,y,row,facing,phase,scale=1){
    if(!sprites.complete || !sprites.naturalWidth)return;
    const tile=phase===null?0:1+(Math.floor(phase)%8);
    ctx.save();ctx.translate(Math.round(x),Math.round(y));ctx.scale(facing*scale,scale);ctx.drawImage(sprites,tile*36,row*60,36,60,-18,-60,36,60);ctx.restore();
  }
  function board(x,y,pattern){
    box(ctx,x-8,y-8,16,15,'#202b2c');box(ctx,x-7,y+6,14,2,'#bf9e4b');
    for(let k=0;k<25;k++)box(ctx,x-5+k%5*2,y-6+Math.floor(k/5)*2,1.6,1.6,pattern[k]==='1'?'#ff6369':'#3a4440');
  }
  function mandrake(t){
    const y=94-lift, sway=reduce.matches?0:Math.sin(t/480)*1.6;
    const xs=110;
    // A sling slides along the rail as the apprentice turns the crank.
    box(ctx,95,y+3,14,2,'#c49651');box(ctx,94,y,4,7,'#d8ac65');
    line(ctx,99,y+4,106,y+8,1,'#896d49');line(ctx,108,y+8,117,y+4,1,'#896d49');
    line(ctx,xs-2,y+4,xs-5+sway,y+13,2,'#9a7142');line(ctx,xs+3,y+4,xs+6-sway,y+12,2,'#aa7b45');
    poly(ctx,[[xs-5,y-6],[xs+3,y-8],[xs+7,y-4],[xs+6,y+3],[xs+2,y+7],[xs-4,y+6],[xs-7,y+1]],'#a87443');
    box(ctx,xs-5,y-5,9,7,'#d3a262');box(ctx,xs-4,y-2,2,2,ink);box(ctx,xs+2,y-2,2,2,ink);box(ctx,xs-1,y+2,2,1,'#865335');
    for(const [dx,dy,col] of [[-13,-10,'#407b4c'],[11,-10,'#568d50'],[-5,-14,'#79a25e'],[5,-16,'#57944d']])leaf(ctx,xs,y-6,dx+sway,dy,.22,col);
    pot(ctx,110,98,1.4);
  }
  function frame(now){
    const dt=Math.min(now-last||16,80);last=now;clock+=dt;
    const diff=goal-x, moving=Math.abs(diff)>.25;
    const delta=Math.sign(diff)*Math.min(Math.abs(diff),dt*.14);
    x=reduce.matches?goal:x+delta;walk+=Math.abs(delta)/3.5;
    if(Math.abs(x-goal)<.3&&arrival){const fn=arrival;arrival=null;fn();}
    lift=reduce.matches?desired:lift+(desired-lift)*(1-Math.exp(-dt/105));
    ctx.imageSmoothingEnabled=false;ctx.drawImage(art,0,0);
    if(!reduce.matches){
      for(let i=0;i<5;i++){
        const t=now/1300+i*3.1, bx=23+i*91+Math.sin(t*.7)*13, by=52+Math.cos(t)*6;
        box(ctx,bx,by,2,1,'#d9a748');box(ctx,bx-1,by-1-Math.floor(now/170)%2,2,1,'#fff4ca');
      }
    }
    mandrake(now);
    const traveling=now-radioAt,signal=traveling>=0&&traveling<750;
    if(signal&&!reduce.matches){
      const k=traveling/750;const xx=147+k*221,yy=91-40*Math.sin(Math.PI*k);
      for(let i=0;i<3;i++)box(ctx,xx-i*4,yy+i,3,2,word==='ALERT'?'#ffbb53':'#9cf2cf');
    }
    board(147,101,localX?'1000101010001000101010001':'');
    board(368,71,alarm?'0111010101111110111001110':'');
    box(ctx,363,51,10,4,alarm?'#ffb845':'#596353');box(ctx,365,48,6,4,alarm?'#ffd679':'#889581');
    const bob=reduce.matches?0:Math.sin(now/580)*.8;
    character(345,134+bob-(alarm&&signal&&!reduce.matches?Math.abs(Math.sin(traveling/125))*5:0),1,-1,null,.97);
    character(x,145,0,moving?(diff>=0?1:-1):(x>220?-1:1),moving?walk:null,1.02);
    if(signal || alarm){box(ctx,337,62,12,9,'#fff1c8');box(ctx,338,71,3,2,'#fff1c8');box(ctx,342,64,2,3,ink);box(ctx,342,68,2,1,ink);}
    requestAnimationFrame(frame);
  }
  requestAnimationFrame(frame);
  function activateSound(){
    try {if(!audio)audio=new AudioContext();if(audio.state==='suspended')audio.resume().catch(()=>{});}catch{}
  }
  let toneNode;
  function stopTone(){if(toneNode){try{toneNode.stop();}catch{}toneNode=null;}}
  function test(distance){
    activateSound();
    if(!ready){say('The boards are starting. Try the plant when both are ready.');return;}
    pending=distance;walkTo(88,()=>window.dispatchEvent(new CustomEvent('greenhouse-test',{detail:distance})));
  }
  for(const b of document.querySelectorAll('[data-lift]'))b.onclick=()=>test(Number(b.dataset.lift));
  $('plantSpot').onclick=()=>test(pending);
  $('benchSpot').onclick=()=>walkTo(201,()=>window.dispatchEvent(new Event('greenhouse-bench')));
  $('keeperSpot').onclick=()=>walkTo(317,()=>window.dispatchEvent(new Event('greenhouse-talk')));
  canvas.tabIndex=0;canvas.setAttribute('aria-label','Greenhouse floor. Walk with the left and right arrows. Press Enter to use the nearest station.');
  canvas.onclick=e=>{
    const pos=(e.clientX-canvas.getBoundingClientRect().left)/canvas.clientWidth*480;
    if(pos<164)test(pending);else if(pos<291)$('benchSpot').click();else $('keeperSpot').click();
  };
  canvas.onkeydown=e=>{
    if(!['ArrowLeft','ArrowRight','Enter',' '].includes(e.key))return;
    e.preventDefault();
    if(e.key==='ArrowLeft'||e.key==='ArrowRight')walkTo(Math.min(434,Math.max(28,goal+(e.key==='ArrowLeft'?-22:22))),null);
    else $(x<150?'plantSpot':x<278?'benchSpot':'keeperSpot').click();
  };
  return {
    say,
    start(){ready=false;arrival=null;alarm=false;localX=false;desired=0;radioAt=-10000;stopTone();$('gameReadout').textContent='Mandrake in its pot';document.querySelectorAll('[data-lift]').forEach(b=>b.removeAttribute('aria-pressed'));},
    ready(){ready=true;},
    distance(d,high,low){
      desired={17:10,18:22,19:35}[d];pending=d;
      $('gameReadout').textContent='Plant height · '+d+' cm';
      document.querySelectorAll('[data-lift]').forEach(b=>b.setAttribute('aria-pressed',String(+b.dataset.lift===d)));
      if(d===19&&high==='local'){localX=true;say('I can see an X at the pot. Nothing reached my door. Meet me at the repair bench.');}
      if(d<19&&low==='local'){localX=false;say(alarm?'My warning is still on. The plant cleared its own board. Check the lower branch at the bench.':'The plant board cleared itself. Watch my board when you test the radio.');}
    },
    radio(message,duration,sceneSound){
      word=message;alarm=word==='ALERT';radioAt=performance.now();stopTone();
      if(alarm&&sceneSound&&audio?.state==='running'){
        const oscillator=audio.createOscillator(),gain=audio.createGain();gain.gain.value=.065;
        oscillator.frequency.value=440;oscillator.connect(gain).connect(audio.destination);oscillator.start();oscillator.stop(audio.currentTime+duration/1000);toneNode=oscillator;
      }
    }
  };
})();
