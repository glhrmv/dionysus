//
// HTML element selection
//

const $ = (id) => document.getElementById(id);

export const player = $("audio");
export const volumeControl = $("volume");
export const volumeText = $("volume-text");
export const panControl = $("pan");
export const panText = $("pan-text");
export const filterType = $("filter-type");
export const frequencyControl = $("frequency");
export const frequencyText = $("frequency-text");
export const qFactorControl = $("q-factor");
export const qFactorText = $("q-factor-text");

//effects
//delay
export const delayTimeControl = $("delayTime");
export const delayTimeText = $("delayTime-text");
export const feedbackControl = $("feedback");
export const feedbackText = $("feedback-text");
//reverb
export const preDelayControl = $("pre-delay");
export const preDelayText = $("pre-delay-text");
export const decayControl = $("decay");
export const decayText = $("decay-text");
//bitcrush
export const bitcrushControl = $("bitcrush");
export const bitcrushText = $("bitcrush-text");

export const playBtn = $("play-btn");
export const progressBar = $("seek");
export const startTime = $("start-time");
export const endTime = $("end-time");

export const waveCanvas = $("waveform");
export const freqCanvas = $("freqbar");
export const spectoCanvas = $("spectogram");
