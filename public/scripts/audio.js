console.log("hello from audio.js");

// element selection
const player = document.getElementById("audio");
const volumeControl = document.getElementById("volume");
const volumeText = document.getElementById("volume-text");
const panControl = document.getElementById("pan");
const panText = document.getElementById("pan-text");

// create audio context
const context = new AudioContext();
let waveAnalyser = context.createAnalyser();
let freqAnalyser = context.createAnalyser();

// context nodes
const startNode = new MediaElementAudioSourceNode(context, {
  mediaElement: player,
});
const gainNode = new GainNode(context);
const panNode = new StereoPannerNode(context, { pan: 0 });
const endNode = context.destination;

// context connections (audio graph)
startNode.connect(gainNode).connect(panNode).connect(endNode);
startNode.connect(waveAnalyser);
startNode.connect(freqAnalyser);


// variables for waveform osciloscope
waveAnalyser.fftSize = 2048;
let waveBufferLength = waveAnalyser.frequencyBinCount;
let waveDataArray = new Uint8Array(waveBufferLength);
waveAnalyser.getByteTimeDomainData(waveDataArray);
let waveCanvas = document.getElementById('waveform');
let waveCanvasCtx = waveCanvas.getContext('2d');
let waveCanvasWIDTH = waveCanvas.width;
let waveCanvasHEIGHT = waveCanvas.height;
waveCanvasCtx.clearRect(0, 0, waveCanvasWIDTH, waveCanvasHEIGHT);

//variables for the freq-bar
freqAnalyser.fftSize = 256;
let freqBufferLength = freqAnalyser.frequencyBinCount;
console.log(freqBufferLength);
let freqDataArray = new Uint8Array(freqBufferLength);
let freqCanvas = document.getElementById('freqbar');
let freqCanvasCtx = freqCanvas.getContext('2d');
let freqCanvasWIDTH = freqCanvas.width;
let freqCanvasHEIGHT = freqCanvas.height;
freqCanvasCtx.clearRect(0, 0, freqCanvasWIDTH, freqCanvasHEIGHT);

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
      drawFreqBar();
    } else if (this.dataset.playing === "true") {
      player.pause();
      this.dataset.playing = "false";
    }
  },
  false
);

function drawWaveForm(){
  let drawVisual = requestAnimationFrame(drawWaveForm);
  waveAnalyser.getByteTimeDomainData(waveDataArray);
  waveCanvasCtx.fillStyle = 'rgb(0, 0 0)';
  waveCanvasCtx.fillRect(0, 0, waveCanvasWIDTH, waveCanvasHEIGHT);
  waveCanvasCtx.lineWidth = 2;
  waveCanvasCtx.strokeStyle = 'rgb(255, 0, 0)';
  waveCanvasCtx.beginPath();
  let sliceWidth = waveCanvasWIDTH * 1.0 / waveBufferLength;
  let x = 0;
  for(var i = 0; i < waveBufferLength; i++) {
   
    var v = waveDataArray[i] / 128.0;
    var y = v * waveCanvasHEIGHT/2;

    if(i === 0) {
      waveCanvasCtx.moveTo(x, y);
    } else {
      waveCanvasCtx.lineTo(x, y);
    }

    x += sliceWidth;
  }
  waveCanvasCtx.lineTo(waveCanvasWIDTH,waveCanvasHEIGHT/2);
  waveCanvasCtx.stroke();

};

function drawFreqBar(){
  drawVisual = requestAnimationFrame(drawFreqBar);

  freqAnalyser.getByteFrequencyData(freqDataArray);

  freqCanvasCtx.fillStyle = 'rgb(0, 0, 0)';
  freqCanvasCtx.fillRect(0, 0, freqCanvasWIDTH, freqCanvasHEIGHT);
  let barWidth = (freqCanvasWIDTH / freqBufferLength) * 2.5;
  let barHeight;
  let x = 0;
  for(var i = 0; i < freqBufferLength; i++) {
    barHeight = freqDataArray[i]/2;

    freqCanvasCtx.fillStyle = 'rgb(' + (barHeight+100) + ',50,50)';
    freqCanvasCtx.fillRect(x,freqCanvasHEIGHT-barHeight/2,barWidth,barHeight);

    x += barWidth + 1;
  }

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
