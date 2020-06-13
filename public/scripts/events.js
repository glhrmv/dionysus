import {
  volumeControl,
  panControl,
  volumeText,
  panText,
  pitchControl,
  pitchText,
  filterType,
  frequencyControl,
  frequencyText,
  qFactorControl,
  qFactorText,
  bitcrushControl,
  bitcrushText,
  delayTimeControl,
  delayTimeText,
  feedbackControl,
  feedbackText,
  preDelayControl,
  preDelayText,
  decayControl,
  decayText,
  reverbWetControl,
  reverbWetText,
  vibratoFreqControl,
  vibratoFreqText,
  vibratoDepthControl,
  vibratoDepthText,
  tremoloWetControl,
  tremoloWetText,
  tremoloFreqText,
  tremoloFreqControl,
  tremoloDepthControl,
  tremoloDepthText,
  delayWetControl,
  delayWetText,
  bitcrushWetText,
  bitcrushWetControl,
  vibratoWetText,
  vibratoWetControl,
  distortionWetControl,
  distortionWetText,
  distortionAmount,
  distortionAmountText,
  oversamplingType,
} from "./elements.js";
import {
  gainNode,
  panNode,
  filterNode,
  reverbNode,
  bitcrushNode,
  delayNode,
  pitchNode,
  vibratoNode,
  tremoloNode,
  distortionNode
} from "./context.js";

//
// init
//

volumeText.innerHTML = volumeControl.value;
panText.innerHTML = panControl.value;
pitchText.innerHTML = pitchControl.value;

frequencyText.innerHTML = frequencyControl.value;
qFactorText.innerHTML = qFactorControl.value;
delayWetText.innerHTML = delayWetControl.value;

delayTimeText.innerHTML = delayTimeControl.value;
feedbackText.innerHTML = feedbackControl.value;
reverbWetText.innerHTML = reverbWetControl.value;

preDelayText.innerHTML = preDelayControl.value;
decayText.innerHTML = decayControl.value;

bitcrushText.innerHTML = bitcrushControl.value;
bitcrushWetText.innerHTML = bitcrushWetControl.value;

vibratoDepthText.innerHTML = vibratoDepthControl.value;
vibratoFreqText.innerHTML = vibratoFreqControl.value;
vibratoWetText.innerHTML = vibratoWetControl.value;

tremoloDepthText.innerHTML = tremoloDepthControl.value;
tremoloFreqText.innerHTML = tremoloFreqControl.value;
tremoloWetText.innerHTML = tremoloWetControl.value;

distortionAmountText.innerHTML = distortionAmount.value;
distortionWetText.innerHTML = distortionWetControl.value;


//
// event listeners
//

// volume control
volumeControl.addEventListener(
  "input",
  function () {
    gainNode.gain.value = this.value;
    volumeText.innerHTML = gainNode.gain.value.toFixed(3);
  },
  false,
);

// pan control
panControl.addEventListener(
  "input",
  function () {
    panNode.pan.value = this.value;
    panText.innerHTML = panNode.pan.value.toFixed(3);
  },
  false,
);

pitchControl.addEventListener(
  "input",
  function () {
    pitchNode.pitch = this.value;
    pitchText.innerHTML = pitchNode.pitch;
  },
  false,
);

// filter type
filterType.addEventListener("change", function () {
  filterNode.type = this.value;
});

// filter frequency control
frequencyControl.addEventListener(
  "input",
  function () {
    filterNode.frequency.value = this.value;
    frequencyText.innerHTML = filterNode.frequency.value;
  },
  false,
);

// filter Q-factor control
qFactorControl.addEventListener(
  "input",
  function () {
    filterNode.Q.value = this.value;
    qFactorText.innerHTML = filterNode.Q.value;
  },
  false,
);

delayTimeControl.addEventListener(
  "input",
  function () {
    delayNode.delayTime.value = this.value;
    delayTimeText.innerHTML = delayNode.delayTime.value;
  },
  false,
);

feedbackControl.addEventListener(
  "input",
  function () {
    delayNode.feedback.value = this.value;
    feedbackText.innerHTML = delayNode.feedback.value;
  },
  false,
);

delayWetControl.addEventListener(
  "input",
  function () {
    delayNode.wet.value = this.value;
    delayWetText.innerHTML = delayNode.wet.value;
  },
  false,
);

preDelayControl.addEventListener(
  "input",
  function () {
    reverbNode.preDelay = this.value;
    preDelayText.innerHTML = reverbNode.preDelay;
    reverbNode.generate();
  },
  false,
);

decayControl.addEventListener(
  "input",
  function () {
    reverbNode.decay = this.value;
    decayText.innerHTML = reverbNode.decay;
    reverbNode.generate();
  },
  false,
);

reverbWetControl.addEventListener(
  "input",
  function () {
    reverbNode.wet.value = this.value;
    reverbWetText.innerHTML = reverbNode.wet.value;
    reverbNode.generate();
  },
  false,
);

bitcrushControl.addEventListener(
  "input",
  function () {
    bitcrushNode.bits = this.value;
    bitcrushText.innerHTML = bitcrushNode.bits;
  },
  false,
);

bitcrushWetControl.addEventListener(
  "input",
  function () {
    bitcrushNode.wet.value = this.value;
    bitcrushWetText.innerHTML = bitcrushNode.wet.value;
  },
  false,
);

vibratoFreqControl.addEventListener(
  "input",
  function () {
    vibratoNode.frequency.value = this.value;
    vibratoFreqText.innerHTML = vibratoNode.frequency.value;
  },
  false,
);

vibratoDepthControl.addEventListener(
  "input",
  function () {
    vibratoNode.depth.value = this.value;
    vibratoDepthText.innerHTML = vibratoNode.depth.value;
  },
  false,
);

vibratoWetControl.addEventListener(
  "input",
  function () {
    vibratoNode.wet.value = this.value;
    vibratoWetText.innerHTML = vibratoNode.wet.value;
  },
  false,
);

tremoloFreqControl.addEventListener(
  "input",
  function () {
    tremoloNode.frequency.value = this.value;
    tremoloFreqText.innerHTML = tremoloNode.frequency.value;
  },
  false,
);

tremoloDepthControl.addEventListener(
  "input",
  function () {
    tremoloNode.depth.value = this.value;
    tremoloDepthText.innerHTML = tremoloNode.depth.value;
  },
  false,
);

tremoloWetControl.addEventListener(
  "input",
  function () {
    tremoloNode.wet.value = this.value;
    tremoloWetText.innerHTML = tremoloNode.wet.value;
  },
  false,
);

distortionWetControl.addEventListener(
  "input",
  function () {
    distortionNode.wet.value = this.value;
    distortionWetText.innerHTML = distortionNode.wet.value;
  },
  false,
);

distortionAmount.addEventListener(
  "input",
  function () {
    distortionNode.distortion = this.value;
    distortionAmountText.innerHTML = distortionNode.distortion;
  },
  false,
);

// oversampling type
oversamplingType.addEventListener("change", function () {
  distortionNode.oversample = this.value;
});
