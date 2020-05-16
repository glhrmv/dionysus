//
// HTML element selection
//

const getById = (id) => document.getElementById(id);

export const player = getById("audio");
export const volumeControl = getById("volume");
export const volumeText = getById("volume-text");
export const panControl = getById("pan");
export const panText = getById("pan-text");
export const filterType = getById("filter-type");
export const frequencyControl = getById("frequency");
export const frequencyText = getById("frequency-text");
export const qFactorControl = getById("q-factor");
export const qFactorText = getById("q-factor-text");

//effects
//delay
export const delayTimeControl = getById("delayTime");
export const delayTimeText = getById("delayTime-text");
export const maxDelayControl = getById("maxDelay");
export const maxDelayText = getById("maxDelay-text");
export const delayWetControl = getById("delay-wet");
export const delayWetText = getById("delay-wet-text");
//reverb
export const preDelayControl = getById("pre-delay");
export const preDelayText = getById("pre-delay-text");
export const decayControl = getById("decay");
export const decayText = getById("decay-text");
export const reverbWetControl = getById("reverb-wet");
export const reverbWetText = getById("reverb-wet-text");
//bitcrush
export const bitcrusherControl = getById("bitcrush");
export const bitcrusherText = getById("bitcrush-text");

export const playBtn = getById("play-btn");
export const progressBar = getById("seek");
export const startTime = getById("start-time");
export const endTime = getById("end-time");

export const waveCanvas = getById("waveform");
export const freqCanvas = getById("freqbar");
export const spectoCanvas = getById("spectogram");
