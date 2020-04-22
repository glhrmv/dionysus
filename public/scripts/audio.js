console.log("hello from audio.js");

// HTML element selection
// audio element
const player = document.getElementById("audio");
// volume slider
const volumeControl = document.getElementById("volume");
// select pan slider
const pannerControl = document.getElementById("panner");

// create audio context
const context = new AudioContext();

// pass it into the audio context
const track = context.createMediaElementSource(player);

// context nodes
const gainNode = new GainNode(context);
const panNode = new StereoPannerNode(context, { pan: 0 });
const endNode = context.destination;

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
