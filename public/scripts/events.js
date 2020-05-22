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
  bitcrusherControl,
  bitcrusherText,
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
  depthControl,
  depthText,
} from "./elements.js";
import {
  gainNode,
  panNode,
  filterNode,
  reverbNode,
  bitcrusherNode,
  delayNode,
  pitchNode,
  vibratoNode,
} from "./context.js";

//
// init
//

volumeText.innerHTML = volumeControl.value;
panText.innerHTML = panControl.value;
pitchText.innerHTML = pitchControl.value;
frequencyText.innerHTML = frequencyControl.value;
qFactorText.innerHTML = qFactorControl.value;

delayTimeText.innerHTML = delayTimeControl.value;
feedbackText.innerHTML = feedbackControl.value;
preDelayText.innerHTML = preDelayControl.value;
decayText.innerHTML = decayControl.value;
reverbWetText.innerHTML = reverbWetControl.value;
bitcrusherText.innerHTML = bitcrusherControl.value;
depthText.innerHTML = depthControl.value;
vibratoFreqText.innerHTML = vibratoFreqControl.value;

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

////Effects, still don't work, here for prototype purposes
delayTimeControl.addEventListener(
  "input",
  function () {
    //bitcrusherNode.bits = this.value;
    //bitcrusherText.innerHTML = bitcrusherNode.bits;
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

preDelayControl.addEventListener(
  "input",
  function () {
    //bitcrusherNode.bits = this.value;
    //bitcrusherText.innerHTML = bitcrusherNode.bits;

    reverbNode.preDelay = this.value;
    preDelayText.innerHTML = reverbNode.preDelay;
    reverbNode.generate();
  },
  false,
);

decayControl.addEventListener(
  "input",
  function () {
    //bitcrusherNode.bits = this.value;
    //bitcrusherText.innerHTML = bitcrusherNode.bits;
    reverbNode.decay = this.value;
    decayText.innerHTML = reverbNode.decay;
    reverbNode.generate();
  },
  false,
);

reverbWetControl.addEventListener(
  "input",
  function () {
    //bitcrusherNode.bits = this.value;
    //bitcrusherText.innerHTML = bitcrusherNode.bits;
    reverbNode.wet.value = this.value;
    reverbWetText.innerHTML = reverbNode.wet.value;
    reverbNode.generate();
  },
  false,
);

// apply bitcrusherer effect
bitcrusherControl.addEventListener(
  "input",
  function () {
    bitcrusherNode.bits = this.value;
    bitcrusherText.innerHTML = bitcrusherNode.bits;
    //bitcrusherText.innerHTML = this.value;
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

depthControl.addEventListener(
  "input",
  function () {
    vibratoNode.depth.value = this.value;
    depthText.innerHTML = vibratoNode.depth.value;
  },
  false,
);
