const left = document.getElementById("left");
const right = document.getElementById("right");
const jump = document.getElementById("jump");

let state = [];
let clickEvent = null;

window.addEventListener("keydown", (e) => {
  if (
    (e.key === "a" || e.key === "d" || e.key === " ") &&
    state.indexOf(e.key) === -1
  ) {
    state.push(e.key);
  }
});

window.addEventListener("keyup", (e) => {
  if (e.key === "a" || e.key === "d" || e.key === " ") {
    state.splice(e.key, 1);
  }
});

left.addEventListener("click", () => {
  if (state.indexOf("a") === -1) {
    clickEvent = "left";
  }
});

right.addEventListener("click", () => {
  if (state.indexOf("d") === -1) {
    clickEvent = "right";
  }
}, false);

jump.addEventListener("touchstart", () => {
  if(state.indexOf(" ") === -1) {
    state.push(" ");
  }
}, false);

jump.addEventListener("touchend", (e) => {
  if(state.indexOf(" ") !== -1) {
    state.splice(" ", 1);
  }
}, false);

export { state, clickEvent };
