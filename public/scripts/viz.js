import { waveCanvas, freqCanvas } from './elements.js';
import { waveAnalyserNode, freqAnalyserNode } from './context.js'

//
// visualizers
//

// waveform
const waveBufferLength = waveAnalyserNode.frequencyBinCount;
const waveDataArray = new Uint8Array(waveBufferLength);
waveAnalyserNode.getByteTimeDomainData(waveDataArray);

const waveCanvasCtx = waveCanvas.getContext("2d");
const waveCanvasWidth = waveCanvas.width;
const waveCanvasHeight = waveCanvas.height;
waveCanvasCtx.clearRect(0, 0, waveCanvasWidth, waveCanvasHeight);

export const drawWaveForm = () => {
  requestAnimationFrame(drawWaveForm);
  waveAnalyserNode.getByteTimeDomainData(waveDataArray);
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
const freqBufferLength = freqAnalyserNode.frequencyBinCount;
const freqDataArray = new Uint8Array(freqBufferLength);

const freqCanvasCtx = freqCanvas.getContext("2d");
const freqCanvasWidth = freqCanvas.width;
const freqCanvasHeight = freqCanvas.height;
freqCanvasCtx.clearRect(0, 0, freqCanvasWidth, freqCanvasHeight);

export const drawFreqBar = () => {
  requestAnimationFrame(drawFreqBar);
  freqAnalyserNode.getByteFrequencyData(freqDataArray);

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
