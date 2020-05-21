import { player } from "./elements.js";

// audio context setup
const audioCtx = new AudioContext();
Tone.context = audioCtx;

//
// context nodes
//

export const startNode = new MediaElementAudioSourceNode(audioCtx, {
  mediaElement: player,
});
export const gainNode = new GainNode(audioCtx);
export const panNode = new StereoPannerNode(audioCtx, { pan: 0 });
export const pitchNode = new Tone.PitchShift();
pitchNode.pitch = 0;
export const filterNode = new BiquadFilterNode(audioCtx, {
  frequency: 20000,
});

/////REVERB
export const reverbNode = new Tone.Reverb();
reverbNode.wet.value = 0.6;
reverbNode.preDelay = 0;
reverbNode.Decay = 0;
reverbNode.generate();

/////DELAY, NOT QUITE WORKING
/*let delayNode = new Tone.Delay();

export function newDelayNode(){
  
  delayNode = new Tone.Delay(1,1);

}*/
export const delayNode = new Tone.FeedbackDelay();
delayNode.delayTime.value = 0;
delayNode.feedback.value = 0;
//delayNode.wet.value = 0.6;
//delayNode.delayTime.value = 0;
//delayNode.maxDelay.value = 1;
//delayNode.generate();

export const vibratoNode = new Tone.Vibrato();
vibratoNode.frequency.value = 0;
vibratoNode.depth.value = 0;

///////BITCRUSHER

export const bitcrusherNode = new Tone.BitCrusher();
bitcrusherNode.bits = 8;

export const waveAnalyserNode = new AnalyserNode(audioCtx, {
  fftSize: 2048,
});
export const freqAnalyserNode = new AnalyserNode(audioCtx, {
  fftSize: 256,
});
export const spectrogramAnalyserNode = new AnalyserNode(audioCtx, {
  fftSize: 2048,
});
export const endNode = audioCtx.destination;

// context connections (audio graph)
Tone.connect(startNode, gainNode);
Tone.connect(gainNode, panNode);
Tone.connect(panNode, pitchNode);
Tone.connect(pitchNode, filterNode);
Tone.connect(filterNode, delayNode);
Tone.connect(delayNode, bitcrusherNode);
Tone.connect(bitcrusherNode, reverbNode);
Tone.connect(reverbNode,vibratoNode);
Tone.connect(vibratoNode, waveAnalyserNode);
Tone.connect(waveAnalyserNode, freqAnalyserNode);
Tone.connect(freqAnalyserNode, spectrogramAnalyserNode);
Tone.connect(spectrogramAnalyserNode, endNode);

// native audio nodes graph (to be removed later)
// startNode
//   .connect(gainNode)
//   .connect(panNode)
//   .connect(filterNode)
//   .connect(waveAnalyserNode)
//   .connect(freqAnalyserNode)
//   .connect(spectrogramAnalyserNode)
//   .connect(endNode);

export default audioCtx;
