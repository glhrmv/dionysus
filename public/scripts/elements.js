//
// HTML element selection
//

const getById = (id) => document.getElementById(id);

export const player = getById("audio");
export const volumeControl = getById("volume");
export const volumeText = getById("volume-text");
export const panControl = getById("pan");
export const panText = getById("pan-text");
export const pitchControl = getById("pitch");
export const pitchText = getById("pitch-text");

export const filterType = getById("filter-type");
export const frequencyControl = getById("frequency");
export const frequencyText = getById("frequency-text");
export const qFactorControl = getById("q-factor");
export const qFactorText = getById("q-factor-text");

export const playBtn = getById("play-btn");
export const progressBar = getById("seek");
export const startTime = getById("start-time");
export const endTime = getById("end-time");

// effects
// delay
export const delayTimeControl = getById("delayTime");
export const delayTimeText = getById("delayTime-text");
export const feedbackControl = getById("feedback");
export const feedbackText = getById("feedback-text");
export const delayWetControl = getById("delay-wet");
export const delayWetText = getById("delay-wet-text");
// reverb
export const preDelayControl = getById("pre-delay");
export const preDelayText = getById("pre-delay-text");
export const decayControl = getById("decay");
export const decayText = getById("decay-text");
export const reverbWetControl = getById("reverb-wet");
export const reverbWetText = getById("reverb-wet-text");
// bitcrush
export const bitcrushControl = getById("bitcrush");
export const bitcrushText = getById("bitcrush-text");
export const bitcrushWetControl = getById("bitcrush-wet");
export const bitcrushWetText = getById("bitcrush-wet-text");
// vibrato
export const vibratoFreqControl = getById("vibrato-freq");
export const vibratoFreqText = getById("vibrato-freq-text");
export const vibratoDepthControl = getById("vibrato-depth");
export const vibratoDepthText = getById("vibrato-depth-text");
export const vibratoWetControl = getById("vibrato-wet");
export const vibratoWetText = getById("vibrato-wet-text");
// tremolo
export const tremoloFreqControl = getById("tremolo-freq");
export const tremoloFreqText = getById("tremolo-freq-text");
export const tremoloDepthControl = getById("tremolo-depth");
export const tremoloDepthText = getById("tremolo-depth-text");
export const tremoloWetControl = getById("tremolo-wet");
export const tremoloWetText = getById("tremolo-wet-text");
//distortion
export const distortionWetControl = getById("distortion-wet");
export const distortionWetText = getById("distortion-wet-text");
export const distortionAmount = getById("distortion_amount");
export const distortionAmountText = getById("distortion_amount-text");
export const oversamplingType = getById("oversampling-type");

export const waveCanvas = getById("waveform");
export const freqCanvas = getById("freqbar");
export const spectoCanvas = getById("spectogram");
