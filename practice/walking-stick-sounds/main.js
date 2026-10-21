import {MicrobitConnection} from './bluetooth.js?v=1.0.0';
import {createLineParser,classifyFreshness} from './protocol.js?v=1.0.0';
import {WarningAudio} from './audio.js?v=1.0.0';
const $=id=>document.getElementById(id);
const parser=createLineParser(),speaker=new WarningAudio();
let connectionState='disconnected',latest=null,soundEnabled=false,lastWarning=-Infinity,previousView='',mode='live',demoState='UNKNOWN',demoTimer=null,hidden=document.hidden;
const supported=globalThis.isSecureContext&&!!navigator.bluetooth?.requestDevice;
$('support').textContent=supported?'Use Chrome with Bluetooth turned on. Choose your BBC micro:bit.':!globalThis.isSecureContext?'Open the published HTTPS page to use Bluetooth.':'Bluetooth is not available in this browser. Use Chrome on a laptop or a supported Android device.';
$('connect').disabled=!supported;
const connection=new MicrobitConnection({bluetooth:navigator.bluetooth,onState:handleConnection,onBytes:bytes=>{if(mode==='live'&&connectionState==='connected'&&!hidden)receive(bytes);}});
function handleConnection(event){connectionState=event.state;latest=null;parser.reset();speaker.stop();lastWarning=-Infinity;
 $('connection').textContent=event.state==='connected'?`Connected to ${event.deviceName||'micro:bit'}. Waiting for messages.`:event.state==='connecting'?'Choose the micro:bit, then wait for its UART service.':event.message||'Not connected.';
 $('connect').disabled=!supported||event.state==='connecting'||event.state==='connected';$('disconnect').disabled=!['connecting','connected'].includes(event.state);render();}
function receive(bytes){for(const state of parser.push(bytes))latest={state,receivedAt:performance.now()};render();}
function reading(){if(hidden)return 'hidden';if(mode==='live'&&connectionState!=='connected')return connectionState;return classifyFreshness(latest,performance.now());}
function render(){const value=reading();$('source').textContent=mode==='demo'?'DEMO ONLY · NO MICRO:BIT DATA':'LIVE MICRO:BIT';
 const copy={NEAR:['Obstacle near','The micro:bit reports a valid reading of 30 cm or less.'],FAR:['Farther reading reported','The micro:bit reports a valid reading above 30 cm.'],UNKNOWN:['Reading unknown','The micro:bit cannot use this reading.'],stale:['No recent message','No complete message arrived for more than three seconds.'],waiting:['Waiting for a message','Send NEAR, FAR or UNKNOWN from your micro:bit.'],connecting:['Connecting…','Choose your device in Chrome.'],disconnected:['Waiting for a connection','Connect the micro:bit, then send a message.'],error:['Connection needs attention','Read the connection message above and try again.'],hidden:['Sound paused','Return to this tab and wait for a new message.']};
 const [title,detail]=copy[value]||copy.UNKNOWN;
 $('reading').dataset.state=value;
 if(previousView!==value){$('reading-title').textContent=title;$('reading-detail').textContent=detail;speaker.stop();lastWarning=-Infinity;previousView=value;}
 $('last-message').textContent=latest?`Last message: ${latest.state}. Received ${Math.floor((performance.now()-latest.receivedAt)/1000)} seconds ago.`:'No message received.';
 if(value!=='NEAR'||!soundEnabled||hidden)return;
 const interval=$('sound-mode').value==='voice'?3500:900;
 if(performance.now()-lastWarning>=interval){lastWarning=performance.now();speaker.warn($('sound-mode').value).catch(audioFailure);}
}
function audioFailure(error){speaker.stop();soundEnabled=false;$('sound').textContent='Enable sound';$('sound').setAttribute('aria-pressed','false');$('audio-status').textContent=error.message||'Sound could not play. Click Enable sound to try again.';}
$('sound').addEventListener('click',async()=>{if(soundEnabled){soundEnabled=false;speaker.stop();$('sound').textContent='Enable sound';$('sound').setAttribute('aria-pressed','false');$('audio-status').textContent='Sound is off.';return;}
 try{await speaker.unlock();soundEnabled=true;$('sound').textContent='Mute sound';$('sound').setAttribute('aria-pressed','true');$('audio-status').textContent='Sound is enabled. Only fresh NEAR messages repeat the warning.';lastWarning=-Infinity;render();}catch(error){audioFailure(error);}});
$('test').addEventListener('click',async()=>{try{await speaker.unlock();speaker.beep();$('audio-status').textContent=soundEnabled?'Speaker tested. Sound is enabled.':'Speaker tested. Click Enable sound for live warnings.';}catch(error){audioFailure(error);}});
$('volume').addEventListener('input',()=>{speaker.setVolume($('volume').value/100);$('volume-label').textContent=$('volume').value+'%';});
$('sound-mode').addEventListener('change',()=>{speaker.stop();lastWarning=-Infinity;render();});
$('connect').addEventListener('click',()=>{if(mode==='demo')exitDemo();connection.connect().catch(error=>handleConnection({state:'error',message:error.message}));});
$('disconnect').addEventListener('click',()=>connection.disconnect());
function sendDemo(){if(mode==='demo'&&!hidden)receive(new TextEncoder().encode(demoState+'\n'));}
function repeatDemo(){clearInterval(demoTimer);sendDemo();demoTimer=setInterval(sendDemo,500);$('pause-demo').disabled=false;}
function exitDemo(){clearInterval(demoTimer);demoTimer=null;mode='live';latest=null;parser.reset();speaker.stop();$('demo-controls').hidden=true;$('start-demo').disabled=false;$('exit-demo').disabled=true;render();}
$('start-demo').addEventListener('click',()=>{connection.disconnect();mode='demo';latest=null;parser.reset();demoState='UNKNOWN';$('demo-controls').hidden=false;$('start-demo').disabled=true;$('exit-demo').disabled=false;repeatDemo();render();});
$('exit-demo').addEventListener('click',exitDemo);
for(const button of document.querySelectorAll('[data-demo]'))button.addEventListener('click',()=>{demoState=button.dataset.demo;repeatDemo();});
$('pause-demo').addEventListener('click',()=>{clearInterval(demoTimer);demoTimer=null;$('pause-demo').disabled=true;});
document.addEventListener('visibilitychange',()=>{hidden=document.hidden;latest=null;parser.reset();speaker.stop();lastWarning=-Infinity;render();});
window.addEventListener('pagehide',()=>{clearInterval(demoTimer);clearInterval(tick);speaker.stop();connection.disconnect();});
const tick=setInterval(render,250);render();
