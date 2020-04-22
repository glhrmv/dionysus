console.log("hello from audio.js");

// HTML element selection
// audio element
const player = document.querySelector("#audio");
// volume slider
const volumeControl = document.querySelector("#volume");
// select pan slider
const pannerControl = document.querySelector("#panner");

// create audio context
const audioCtx = new AudioContext();

// pass it into the audio context
const track = audioCtx.createMediaElementSource(player);

// context nodes
const gainNode = new GainNode(audioCtx);
const panNode = new StereoPannerNode(audioCtx, { pan: 0 });
const endNode = audioCtx.destination;

// context connections (audio graph)
track.connect(gainNode).connect(panNode).connect(endNode);

// event listeners

// volume control
volumeControl.addEventListener(
  "input",
  function () {
    gainNode.gain.value = this.value;
  },
  false
);

// pan control
pannerControl.addEventListener(
  "input",
  function () {
    panNode.pan.value = this.value;
  },
  false
);
