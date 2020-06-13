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

// Reverb
export const reverbNode = new Tone.Reverb();
reverbNode.wet.value = 0;
reverbNode.preDelay = 0;
reverbNode.Decay = 0;
reverbNode.generate();

// Delay
export const delayNode = new Tone.FeedbackDelay();
delayNode.wet.value = 0;
delayNode.delayTime.value = 0;
delayNode.feedback.value = 0;

// Vibrato
export const vibratoNode = new Tone.Vibrato();
vibratoNode.wet.value = 0;
vibratoNode.frequency.value = 0;
vibratoNode.depth.value = 0;

// Tremolo
export const tremoloNode = new Tone.Tremolo();
tremoloNode.wet.value = 0;
tremoloNode.frequency.value = 0;
tremoloNode.depth.value = 0;
tremoloNode.start();

// Bitcrusher
export const bitcrushNode = new Tone.BitCrusher();
bitcrushNode.wet.value = 0;
bitcrushNode.bits = 8;

// Distortion
export const distortionNode = new Tone.Distortion();
distortionNode.wet.value = 0;
distortionNode.distortion = 0;
distortionNode.oversample = "none";

// Visualizers
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
Tone.connect(delayNode, bitcrushNode);
Tone.connect(bitcrushNode, reverbNode);
Tone.connect(reverbNode, vibratoNode);
Tone.connect(vibratoNode, tremoloNode);
Tone.connect(tremoloNode, distortionNode);
Tone.connect(distortionNode, waveAnalyserNode);
Tone.connect(waveAnalyserNode, freqAnalyserNode);
Tone.connect(freqAnalyserNode, spectrogramAnalyserNode);
Tone.connect(spectrogramAnalyserNode, endNode);

export default audioCtx;
