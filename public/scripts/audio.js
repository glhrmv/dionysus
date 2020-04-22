console.log("hello from audio.js");

// HTML element selection 
// audio element
const audioElement = document.querySelector("#audio");
// play/pause button
const playButton = document.querySelector("button");
// volume slider
const volumeControl = document.querySelector("#volume");
// select pan slider
const pannerControl = document.querySelector('#panner');

// create audio context
const audioContext = new AudioContext();

// pass it into the audio context
const track = audioContext.createMediaElementSource(audioElement);

// context nodes
const gainNode = new GainNode(audioContext);
const panNode = new StereoPannerNode(audioContext, { pan: 0 });

// context connections (audio graph)
track.connect(gainNode);
gainNode.connect(panNode);
panNode.connect(audioContext.destination);

// event listeners

// play / pause control
playButton.addEventListener(
  "click",
  function () {
    // check if context is in suspended state (autoplay policy)
    if (audioContext.state === "suspended") audioContext.resume();

    // play or pause track depending on state
    if (this.dataset.playing === "false") {
      audioElement.play();
      this.dataset.playing = "true";
    } else if (this.dataset.playing === "true") {
      audioElement.pause();
      this.dataset.playing = "false";
    }
  },
  false
);

// volume control
volumeControl.addEventListener(
  "input",
  function () {
    gainNode.gain.value = this.value;
  },
  false
);

// pan control
pannerControl.addEventListener('input', function() {
    panNode.pan.value = this.value;
}, false);

// audio element finish track
audioElement.addEventListener(
  "ended",
  () => {
    playButton.dataset.playing = "false";
  },
  false
);
