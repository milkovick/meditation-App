/* General functionality */
let play = document.querySelector(".play");
let pause = document.querySelector(".pause");
let audio = document.querySelector(".audio audio");
let durations = document.querySelectorAll(".duration");
let seasons = document.querySelectorAll(".season");
let video = document.querySelector(".video video");
let path = document.querySelector(".circle");
let remainingTimeEl = document.querySelector(".audio-remaining-time");
let pathLength = path.getTotalLength();
let audioDuration = 300; // default

play.addEventListener("click", () => {
  audio.play();
  update();
});
pause.addEventListener("click", () => {
  audio.pause();
});

seasons.forEach((season) => {
  season.addEventListener("click", () => {
    video.src = season.getAttribute("video-src");
  });
});

// Change audio duration
durations.forEach((duration) => {
  duration.addEventListener("click", () => {
    audioDuration = duration.getAttribute("audio-duration");
    update();
  });
});

path.style.strokeDasharray = pathLength;

function update() {
  // Stop audio
  if (audio.currentTime >= audioDuration) {
    audio.pause();
    audio.currentTime = 0; // stop audio
  }

  let portionPlayed = audio.currentTime / audioDuration;
  path.style.strokeDashoffset = -portionPlayed * pathLength;
  let remainingTimeInSec = audioDuration - audio.currentTime;
  renderRemainingTime(remainingTimeInSec);

  if (!audio.paused) {
    requestAnimationFrame(update);
  }
}
update();

// Render remaining time
function renderRemainingTime(timeInSec) {
  let min = Math.floor(timeInSec / 60);
  let sec = Math.floor(timeInSec % 60);

  min = min < 10 ? `0${min}` : min;
  sec = sec < 10 ? `0${sec}` : sec;

  remainingTimeEl.innerHTML = `${min}:${sec}`;
}

/* Themes menu - mobile devices */
let openMenuBtn = document.querySelector(".toggle-menu");
let seasonsMenu = document.querySelector(".seasons");

openMenuBtn.addEventListener("click", () => {
  seasonsMenu.classList.toggle("open");
  openMenuBtn.classList.toggle("rotate");
});
