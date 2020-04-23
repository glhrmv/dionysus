console.log("hello from audio.js");

// element selection
const player = document.getElementById("audio");
const volumeControl = document.getElementById("volume");
const volumeText = document.getElementById("volume-text");
const panControl = document.getElementById("pan");
const panText = document.getElementById("pan-text");
const WIDTH = 640;
const HEIGHT = 360;

// create audio context
const context = new AudioContext();
let analyser = context.createAnalyser();

// context nodes
const startNode = new MediaElementAudioSourceNode(context, {
  mediaElement: player,
});
const gainNode = new GainNode(context);
const panNode = new StereoPannerNode(context, { pan: 0 });
const endNode = context.destination;

// context connections (audio graph)
startNode.connect(gainNode).connect(panNode).connect(endNode);
startNode.connect(analyser);



analyser.fftSize = 2048;
let bufferLength = analyser.frequencyBinCount;
let dataArray = new Uint8Array(bufferLength);
analyser.getByteTimeDomainData(dataArray);
let canvas = document.getElementById('spectrogram');
let canvasCtx = canvas.getContext('2d');
canvasCtx.clearRect(0, 0, WIDTH, HEIGHT);

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
  false
);

// pan control
panControl.addEventListener(
  "input",
  function () {
    panNode.pan.value = this.value;
    panText.innerHTML = panNode.pan.value.toFixed(3);

  },
  false
);

// audio element finish track
player.addEventListener(
  "ended",
  () => {
    playButton.dataset.playing = "false";
  },
  false
);

player.addEventListener(
  "play",
  () => {
    // init knob control values
    volumeText.innerHTML = gainNode.gain.value.toFixed(3);
    panText.innerHTML = panNode.pan.value.toFixed(3);
  },
  false
);


//
// player controls
//

const playButton = document.getElementById("play-btn");
const progressBar = document.getElementById("seek");
const startTime = document.getElementById("start-time");
const endTime = document.getElementById("end-time");

let isPlaying = false;

// play/pause button click
playButton.addEventListener(
  "click",
  function () {
    // play or pause track depending on state
    if (this.dataset.playing === "false") {
      player.play();
      this.dataset.playing = "true";
      drawWaveForm();
    } else if (this.dataset.playing === "true") {
      player.pause();
      this.dataset.playing = "false";
    }
  },
  false
);

function drawWaveForm(){
    draw();
}

function draw(){
  let drawVisual = requestAnimationFrame(draw);
  analyser.getByteTimeDomainData(dataArray);
  canvasCtx.fillStyle = 'rgb(150, 170, 200)';
  canvasCtx.fillRect(0, 0, WIDTH, HEIGHT);
  canvasCtx.lineWidth = 2;
  canvasCtx.strokeStyle = 'rgb(0, 0, 255)';
  canvasCtx.beginPath();
  let sliceWidth = WIDTH * 1.0 / bufferLength;
  let x = 0;
  for(var i = 0; i < bufferLength; i++) {
   
    var v = dataArray[i] / 128.0;
    var y = v * HEIGHT/2;

    if(i === 0) {
      canvasCtx.moveTo(x, y);
    } else {
      canvasCtx.lineTo(x, y);
    }

    x += sliceWidth;
  }
  canvasCtx.lineTo(canvas.width, canvas.height/2);
  canvasCtx.stroke();

};

// update progress bar
player.addEventListener("timeupdate", () => {
  const length = player.duration;
  const current_time = player.currentTime;

  // calculate total length of value
  const totalLength = calculateTotalValue(length);
  endTime.innerHTML = totalLength;

  // calculate current value time
  const currentTime = calculateCurrentValue(current_time);
  startTime.innerHTML = currentTime;

  progressBar.value = player.currentTime / player.duration;
  progressBar.addEventListener("click", function (event) {
    const percent = event.offsetX / this.offsetWidth;
    player.currentTime = percent * player.duration;
    progressBar.value = percent / 100;
  });
});

//
// helpers
//

function calculateTotalValue(length) {
  const minutes = Math.floor(length / 60);
  const seconds_int = length - minutes * 60;
  const seconds_str = seconds_int.toString();
  const seconds = seconds_str.substr(0, 2);
  const time = minutes + ":" + seconds;

  return time;
}

function calculateCurrentValue(currentTime) {
  const current_hour = parseInt(currentTime / 3600) % 24;
  const current_minute = parseInt(currentTime / 60) % 60;
  const current_seconds_long = currentTime % 60;
  const current_seconds = current_seconds_long.toFixed();
  const current_time =
    (current_minute < 10 ? "0" + current_minute : current_minute) +
    ":" +
    (current_seconds < 10 ? "0" + current_seconds : current_seconds);

  return current_time;
}
