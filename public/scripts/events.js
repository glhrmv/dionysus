import {
  volumeControl,
  panControl,
  volumeText,
  panText,
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
} from "./elements.js";
import { gainNode, panNode, filterNode } from "./context.js";

//
// init
//

volumeText.innerHTML = volumeControl.value;
panText.innerHTML = panControl.value;
frequencyText.innerHTML = frequencyControl.value;
qFactorText.innerHTML = qFactorControl.value;

delayTimeText.innerHTML = delayTimeControl.value;
feedbackText.innerHTML = feedbackControl.value;
preDelayText.innerHTML = preDelayControl.value;
decayText.innerHTML = decayControl.value;
bitcrushText.innerHTML = bitcrushControl.value;

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
    //bitcrushNode.bits = this.value;
    //bitcrushText.innerHTML = bitcrushNode.bits;
    delayTimeText.innerHTML = this.value;
  },
  false,
);

feedbackControl.addEventListener(
  "input",
  function () {
    //bitcrushNode.bits = this.value;
    //bitcrushText.innerHTML = bitcrushNode.bits;
    feedbackText.innerHTML = this.value;
  },
  false,
);

preDelayControl.addEventListener(
  "input",
  function () {
    //bitcrushNode.bits = this.value;
    //bitcrushText.innerHTML = bitcrushNode.bits;
    preDelayText.innerHTML = this.value;
  },
  false,
);

decayControl.addEventListener(
  "input",
  function () {
    //bitcrushNode.bits = this.value;
    //bitcrushText.innerHTML = bitcrushNode.bits;
    decayText.innerHTML = this.value;
  },
  false,
);

// apply bitcrusher effect
bitcrushControl.addEventListener(
  "input",
  function () {
    //bitcrushNode.bits = this.value;
    //bitcrushText.innerHTML = bitcrushNode.bits;
    bitcrushText.innerHTML = this.value;
  },
  false,
);
