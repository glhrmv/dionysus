//
// element selection
//

const player = document.getElementById("audio");
const volumeControl = document.getElementById("volume");
const volumeText = document.getElementById("volume-text");
const panControl = document.getElementById("pan");
const panText = document.getElementById("pan-text");
const frequencyControl = document.getElementById("frequency");
const frequencyText = document.getElementById("frequency-text");
const qFactorControl = document.getElementById("q-factor");
const qFactorText = document.getElementById("q-factor-text");

const progressBar = document.getElementById("seek");
const startTime = document.getElementById("start-time");
const endTime = document.getElementById("end-time");

const waveCanvas = document.getElementById("waveform");
const freqCanvas = document.getElementById("freqbar");

// audio context
const audioCtx = new AudioContext();

//
// context nodes
//

const startNode = new MediaElementAudioSourceNode(audioCtx, {
  mediaElement: player,
});

const gainNode = new GainNode(audioCtx);

const panNode = new StereoPannerNode(audioCtx, { pan: 0 });

const filterNode = new BiquadFilterNode(audioCtx);

const waveAnalyser = new AnalyserNode(audioCtx, { fftSize: 2048 });
const waveBufferLength = waveAnalyser.frequencyBinCount;
const waveDataArray = new Uint8Array(waveBufferLength);
waveAnalyser.getByteTimeDomainData(waveDataArray);

const freqAnalyser = new AnalyserNode(audioCtx, { fftSize: 256 });
const freqBufferLength = freqAnalyser.frequencyBinCount;
const freqDataArray = new Uint8Array(freqBufferLength);

const endNode = audioCtx.destination;

// context connections (audio graph)
startNode
  .connect(gainNode)
  .connect(panNode)
  .connect(filterNode)
  .connect(waveAnalyser)
  .connect(freqAnalyser)
  .connect(endNode);

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

//
// player controls
//

let isPlaying = false;

// bind spacebar to play button
document.onkeydown = function (e) {
  if (e.keyCode == 32) {
    e.preventDefault();
    togglePlay();
  }
};

const togglePlay = () => {
  if (!isPlaying) {
    player.play();
    drawWaveForm();
    drawFreqBar();
  } else {
    player.pause();
  }

  isPlaying = !isPlaying;
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

// on track play
player.addEventListener(
  "play",
  () => {
    // init knob control values
    volumeText.innerHTML = gainNode.gain.value.toFixed(3);
    panText.innerHTML = panNode.pan.value.toFixed(3);
  },
  false
);

// on track finish
player.addEventListener(
  "ended",
  () => {
    isPlaying = false;
  },
  false
);

//
// visualizers
//

// waveform
const waveCanvasCtx = waveCanvas.getContext("2d");
const waveCanvasWidth = waveCanvas.width;
const waveCanvasHeight = waveCanvas.height;
waveCanvasCtx.clearRect(0, 0, waveCanvasWidth, waveCanvasHeight);

const drawWaveForm = () => {
  requestAnimationFrame(drawWaveForm);
  waveAnalyser.getByteTimeDomainData(waveDataArray);
  waveCanvasCtx.lineWidth = 2;

  waveCanvasCtx.fillStyle = "rgb(250, 250, 251)";
  waveCanvasCtx.fillRect(0, 0, waveCanvasWidth, waveCanvasHeight);
  waveCanvasCtx.strokeStyle = "rgb(47, 47, 47)";
  waveCanvasCtx.beginPath();

  let sliceWidth = (waveCanvasWidth * 1.0) / waveBufferLength;
  let x = 0;
  for (let i = 0; i < waveBufferLength; i++) {
    let v = waveDataArray[i] / 128.0;
    let y = (v * waveCanvasHeight) / 2;

    if (i === 0) waveCanvasCtx.moveTo(x, y);
    else waveCanvasCtx.lineTo(x, y);

    x += sliceWidth;
  }
  waveCanvasCtx.lineTo(waveCanvasWidth, waveCanvasHeight / 2);
  waveCanvasCtx.stroke();
};

// frequency spectrum
const freqCanvasCtx = freqCanvas.getContext("2d");
const freqCanvasWidth = freqCanvas.width;
const freqCanvasHeight = freqCanvas.height;
freqCanvasCtx.clearRect(0, 0, freqCanvasWidth, freqCanvasHeight);

const drawFreqBar = () => {
  requestAnimationFrame(drawFreqBar);
  freqAnalyser.getByteFrequencyData(freqDataArray);

  freqCanvasCtx.fillStyle = "rgb(250, 250, 251)";
  freqCanvasCtx.fillRect(0, 0, freqCanvasWidth, freqCanvasHeight);
  let barWidth = (freqCanvasWidth / freqBufferLength) * 2.5;
  let barHeight;
  let x = 0;
  for (let i = 0; i < freqBufferLength; i++) {
    barHeight = freqDataArray[i] / 2;

    freqCanvasCtx.fillStyle = `rgb(47, 47, 47)`;
    freqCanvasCtx.fillRect(
      x,
      freqCanvasHeight - barHeight / 2,
      barWidth,
      barHeight
    );

    x += barWidth + 1;
  }
};

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
  const current_minute = parseInt(currentTime / 60) % 60;
  const current_seconds_long = currentTime % 60;
  const current_seconds = current_seconds_long.toFixed();
  const current_time =
    (current_minute < 10 ? "0" + current_minute : current_minute) +
    ":" +
    (current_seconds < 10 ? "0" + current_seconds : current_seconds);

  return current_time;
}
