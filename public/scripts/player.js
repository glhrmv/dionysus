import {
  player,
  startTime,
  endTime,
  progressBar
} from "./elements.js";
import { drawWaveForm, drawFreqBar } from "./viz.js";

//
// player controls
//

let isPlaying = false;

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

// bind spacebar to play button
document.onkeydown = function (e) {
  if (e.keyCode == 32) {
    e.preventDefault();
    togglePlay();
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
  progressBar.addEventListener("click", function (e) {
    const percent = e.offsetX / this.offsetWidth;
    player.currentTime = percent * player.duration;
    progressBar.value = percent / 100;
  });
});

// on track finish
player.addEventListener(
  "ended",
  () => {
    isPlaying = false;
  },
  false
);

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
