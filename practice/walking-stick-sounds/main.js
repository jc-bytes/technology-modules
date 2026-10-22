import {MicrobitConnection} from './bluetooth.js?v=1.3.0';
import {createLineParser,classifyFreshness,parseReport} from './protocol.js?v=1.3.0';
import {WarningAudio} from './audio.js?v=1.3.0';
const $=id=>document.getElementById(id);
const parser=createLineParser(),speaker=new WarningAudio();
let connectionState='disconnected',latest=null,soundEnabled=false,lastWarning=-Infinity,previousView='',mode='live',demoState='UNKNOWN',demoTimer=null,hidden=document.hidden;
const supported=globalThis.isSecureContext&&!!navigator.bluetooth?.requestDevice;
const supportMessage=!globalThis.isSecureContext?'Open the HTTPS page to connect.':'Use Chrome on a laptop or a supported Android device. Bluetooth is unavailable in this browser.';
$('support').textContent=supported?'':supportMessage;
$('support').hidden=supported;
$('connect').disabled=!supported;
const connection=new MicrobitConnection({bluetooth:navigator.bluetooth,onState:handleConnection,onBytes:bytes=>{if(mode==='live'&&connectionState==='connected'&&!hidden)receive(bytes);}});
function handleConnection(event){
 connectionState=event.state;latest=null;parser.reset();speaker.stop();lastWarning=-Infinity;
 const active=['connecting','connected'].includes(event.state);
 $('connection').textContent=event.state==='connected'?`Connected · ${event.deviceName||'micro:bit'}`:event.state==='connecting'?'Connecting…':'Not connected';
 $('connect').disabled=!supported||active;
 $('connect').hidden=event.state==='connected';
 $('connect-label').textContent=event.state==='connecting'?'Connecting…':'Connect micro:bit';
 $('disconnect').disabled=!active;$('disconnect').hidden=!active;
 $('disconnect').textContent=event.state==='connecting'?'Cancel':'Disconnect';
 $('support').textContent=event.message||(!supported?supportMessage:'');
 $('support').hidden=!event.message&&supported;
 render();
}
function receive(bytes){for(const line of parser.push(bytes))latest={...parseReport(line),receivedAt:performance.now()};render();}
function reading(){if(hidden)return 'hidden';if(mode==='live'&&connectionState!=='connected')return connectionState;return classifyFreshness(latest,performance.now());}
function render(){const value=reading();$('source').textContent=mode==='demo'?'DEMO MODE':connectionState==='connected'?'LIVE MICRO:BIT':'MICRO:BIT';
 const copy={NEAR:['Obstacle near','The micro:bit reports an obstacle within 30 cm.'],FAR:['Beyond 30 cm','The latest valid reading is farther than 30 cm.'],UNKNOWN:['Reading unavailable','The micro:bit cannot use this measurement.'],stale:['Signal paused','No recent message. Check your micro:bit.'],waiting:['Waiting for a reading','Your micro:bit is connected. Send a message to begin.'],connecting:['Connecting…','Choose your device in Chrome.'],disconnected:['Ready to connect',"Your micro:bit’s warning will appear here."],error:['Connection needs attention','Read the connection message above and try again.'],hidden:['Sound paused','Return to this tab and wait for a new message.']};
 const [title,detail]=copy[value]||copy.UNKNOWN;
 $('reading').dataset.state=value;
 if(previousView!==value){$('reading-title').textContent=title;$('reading-detail').textContent=detail;speaker.stop();lastWarning=-Infinity;previousView=value;}
 $('distance-value').textContent=['NEAR','FAR'].includes(value)&&Number.isFinite(latest?.distanceCm)?latest.distanceCm.toFixed(1):'—';
 $('last-message').textContent=latest?`Last message: ${latest.state}. Received ${Math.floor((performance.now()-latest.receivedAt)/1000)} seconds ago.`:'No message yet';
 if(value!=='NEAR'||!soundEnabled||hidden)return;
 const interval=$('sound-mode').value==='voice'?3500:900;
 if(performance.now()-lastWarning>=interval){lastWarning=performance.now();speaker.warn($('sound-mode').value).catch(audioFailure);}
}
function audioFailure(error){speaker.stop();soundEnabled=false;$('sound-label').textContent='Enable sound';$('sound').setAttribute('aria-pressed','false');$('audio-status').textContent=error.message||'Sound could not play. Click Enable sound to try again.';}
$('sound').addEventListener('click',async()=>{if(soundEnabled){soundEnabled=false;speaker.stop();$('sound-label').textContent='Enable sound';$('sound').setAttribute('aria-pressed','false');$('audio-status').textContent='Sound is off';return;}
 try{await speaker.unlock();soundEnabled=true;$('sound-label').textContent='Mute sound';$('sound').setAttribute('aria-pressed','true');$('audio-status').textContent='Sound is on · warnings play for NEAR';lastWarning=-Infinity;render();}catch(error){audioFailure(error);}});
$('test').addEventListener('click',async()=>{try{await speaker.unlock();speaker.beep();$('audio-status').textContent=soundEnabled?'Speaker tested. Sound is enabled.':'Speaker tested. Click Enable sound for live warnings.';}catch(error){audioFailure(error);}});
$('volume').addEventListener('input',()=>{speaker.setVolume($('volume').value/100);$('volume-label').textContent=$('volume').value+'%';});
$('sound-mode').addEventListener('change',()=>{speaker.stop();lastWarning=-Infinity;render();});
$('connect').addEventListener('click',()=>{if(mode==='demo')exitDemo();connection.connect().catch(error=>handleConnection({state:'error',message:error.message}));});
$('disconnect').addEventListener('click',()=>connection.disconnect());
function sendDemo(){if(mode==='demo'&&!hidden)receive(new TextEncoder().encode((demoState==='NEAR'?'NEAR,20.3':demoState==='FAR'?'FAR,40':'UNKNOWN')+'\n'));}
function repeatDemo(){clearInterval(demoTimer);sendDemo();demoTimer=setInterval(sendDemo,500);$('pause-demo').disabled=false;}
function exitDemo(){clearInterval(demoTimer);demoTimer=null;mode='live';latest=null;parser.reset();speaker.stop();$('demo-controls').hidden=true;$('start-demo').disabled=false;$('exit-demo').disabled=true;$('exit-demo').hidden=true;$('start-demo').hidden=false;render();}
$('start-demo').addEventListener('click',()=>{connection.disconnect();mode='demo';latest=null;parser.reset();demoState='UNKNOWN';$('demo-controls').hidden=false;$('start-demo').disabled=true;$('exit-demo').disabled=false;$('exit-demo').hidden=false;$('start-demo').hidden=true;repeatDemo();render();});
$('exit-demo').addEventListener('click',exitDemo);
for(const button of document.querySelectorAll('[data-demo]'))button.addEventListener('click',()=>{demoState=button.dataset.demo;repeatDemo();});
$('pause-demo').addEventListener('click',()=>{clearInterval(demoTimer);demoTimer=null;$('pause-demo').disabled=true;});
document.addEventListener('visibilitychange',()=>{hidden=document.hidden;latest=null;parser.reset();speaker.stop();lastWarning=-Infinity;render();});
window.addEventListener('pagehide',()=>{clearInterval(demoTimer);clearInterval(tick);speaker.stop();connection.disconnect();});
const tick=setInterval(render,250);render();
