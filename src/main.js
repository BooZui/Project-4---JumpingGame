import animation from "./playGame.js";

const buttonPlay = document.querySelector(".buttonPlay");
const audioPlayer = document.querySelector(".audioPlayer");
const audio = document.querySelector("audio");
audio.volume = 0.3;

buttonPlay.addEventListener("click", () => {
  document.getElementById("container").style.display = "none";
  document.querySelector("canvas").style.display = "block";
  animation();
});

audioPlayer.addEventListener("click", () => {
  audio.paused ? audio.play() : audio.pause();
});

document.addEventListener("contextmenu", (e) => {
  e.preventDefault();
}, false);