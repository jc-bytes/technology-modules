export class WarningAudio {
 constructor(){this.context=null;this.nodes=new Set();this.level=.25;this.epoch=0;this.voice=null;}
 async unlock(){const Context=globalThis.AudioContext||globalThis.webkitAudioContext;if(!Context)throw Error('This browser cannot play the warning. Try Chrome on a laptop.');this.context ||= new Context();await this.context.resume();if(this.context.state!=='running')throw Error('Sound could not start. Click Enable sound again.');}
 setVolume(value){this.level=Math.min(.6,Math.max(0,Number(value)||0));}
 stop(){this.epoch++;for(const node of this.nodes){try{node.stop();}catch{}try{node.disconnect();}catch{}}this.nodes.clear();}
 attach(source,duration){const gain=this.context.createGain();gain.gain.value=this.level*.25;source.connect(gain).connect(this.context.destination);this.nodes.add(source);source.onended=()=>{source.disconnect();gain.disconnect();this.nodes.delete(source);};source.start();if(duration)source.stop(this.context.currentTime+duration);}
 beep(){const source=this.context.createOscillator();source.type='sine';source.frequency.value=660;this.attach(source,.14);}
 async warn(mode){if(!this.context||this.context.state!=='running')return;
 if(mode!=='voice'){this.beep();return;}
 const epoch=this.epoch;
 if(!this.voice){const response=await fetch(new URL('./assets/obstacle-near.mp3',import.meta.url));if(!response.ok)throw Error('The spoken warning did not load. Choose Beep and try again.');this.voice=await this.context.decodeAudioData(await response.arrayBuffer());}
 if(epoch!==this.epoch)return;
 const source=this.context.createBufferSource();source.buffer=this.voice;this.attach(source);
 }
}
