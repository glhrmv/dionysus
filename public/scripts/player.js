const playerContainer = document.getElementById("player-container");
const player = document.getElementById("audio");
const playButton = document.getElementById("play-btn");
const progressbar = document.getElementById("seek");
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
    } else if (this.dataset.playing === "true") {
      player.pause();
      this.dataset.playing = "false";
    }
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

	progressbar.value = player.currentTime / player.duration;
	progressbar.addEventListener("click", function(event) {
		const percent = event.offsetX / this.offsetWidth;
		player.currentTime = percent * player.duration;
		progressbar.value = percent / 100;
	});
});

// helpers

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
