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
export const filterNode = new BiquadFilterNode(audioCtx, {
  frequency: 20000,
});
export const reverbNode = new Tone.Reverb();
reverbNode.wet.value = 0.8;

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
Tone.connect(panNode, filterNode);
Tone.connect(filterNode, reverbNode);
Tone.connect(reverbNode, waveAnalyserNode);
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
