console.log("hello from audio.js");

// create audio context
const audioContext = new AudioContext();

// get the audio element
const audioElement = document.querySelector("#audio");

// pass it into the audio context
const track = audioContext.createMediaElementSource(audioElement);

// context nodes
const gainNode = new GainNode(audioContext);
const panNode = new StereoPannerNode(audioContext, { pan: 0 });

// context connections (audio graph)
track.connect(gainNode);
gainNode.connect(panNode);
panNode.connect(audioContext.destination);

// select play button
const playButton = document.querySelector("button");

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

// select volume slider
const volumeControl = document.querySelector("#volume");

volumeControl.addEventListener(
  "input",
  function () {
    gainNode.gain.value = this.value;
  },
  false
);

// select pan slider
const pannerControl = document.querySelector('#panner');

pannerControl.addEventListener('input', function() {
    panNode.pan.value = this.value;
}, false);

audioElement.addEventListener(
  "ended",
  () => {
    playButton.dataset.playing = "false";
  },
  false
);
