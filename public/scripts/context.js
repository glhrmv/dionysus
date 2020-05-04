import { player } from "./elements.js";
//import * as Tone from "tone";

// audio context
const audioCtx = new AudioContext();
//var context = new Tone.Context(audioCtx);

//
// context nodes
//

export const startNode = new MediaElementAudioSourceNode(audioCtx, {
    mediaElement: player,
});
export const gainNode = new GainNode(audioCtx);
export const panNode = new StereoPannerNode(audioCtx, { pan: 0 });
export const filterNode = new BiquadFilterNode(audioCtx, { frequency: 20000 });


//export const bitcrushNode = new BiquadFilterNode(audioCtx, { bits: 4 });

export const waveAnalyserNode = new AnalyserNode(audioCtx, { fftSize: 2048 });
export const freqAnalyserNode = new AnalyserNode(audioCtx, { fftSize: 256 });
export const spectrogramAnalyserNode = new AnalyserNode(audioCtx, { fftSize: 2048 });
export const endNode = audioCtx.destination;

// context connections (audio graph)
startNode
    .connect(gainNode)
    .connect(panNode)
    .connect(filterNode)
    .connect(waveAnalyserNode)
    .connect(freqAnalyserNode)
    .connect(spectrogramAnalyserNode)
    .connect(endNode);

export default audioCtx;