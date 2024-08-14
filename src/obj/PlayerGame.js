import { state, clickEvent } from "../PlayerEvnetHandler/eventHandle.js";
import loadImg from "../loadImg/loadImg.js";

let jumpRightState = loadImg("Jump", 11);
let jumpLeftState = loadImg("JumpL", 11);
let fallRightState = loadImg("Fall", 11);
let fallLeftState = loadImg("FallL", 11);
let idleARightState = loadImg("IdleA", 21);
let idleALeftState = loadImg("IdleAL", 21);
let idleBRightState = loadImg("IdleB", 21);
let idleBLefttState = loadImg("IdleBL", 21);

const hitAudio = new Audio("/audio/hit.mp3");
hitAudio.volume = 0.4;
const jumpAudio = new Audio("/audio/jump.mp3");
const waitAudio = new Audio("/audio/wait.mp3");
waitAudio.volume = 1;
const onTopAudio = new Audio("/audio/onTop.mp3");

export default class Player {
  constructor(ctx, x, y, width, height, top, right, bottom, left) {
    this.ctx = ctx;
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.top = top;
    this.right = right;
    this.bottom = bottom;
    this.left = left;
    this.jumpState = jumpLeftState;
    this.fallState = fallRightState;
    this.idleState = idleARightState;
    this.waitState = idleBRightState;
    this.state = this.idleState;
    this.stateFrameSize = 21;
    this.stateFrame = 0;
    this.direction = 1;
    this.speed = 3;
    this.time = 0;
    this.timeWait = 0;
    this.fps = 40;
    this.gravity = 9.8 / 20;
    this.isOnLand = true;
    this.isJumpWait = false;
    this.wait = 0;
    this.veclocity = {
      x: 3,
      y: 0,
    };
  }

  draw(deltatime) {
    this.ctx.drawImage(
      this.state[this.stateFrame],
      this.x,
      this.y,
      this.width,
      this.height
    );
    if (this.time > 1000 / this.fps) {
      this.stateFrame++;
      this.time = 0;
    } else {
      this.time += deltatime ? deltatime : 0;
    }
  }

  stateEvent(deltaTime) {
    if (state.includes(" ") && this.veclocity.y === 0) {
      waitAudio.play();
      this.isJumpWait = true;
      this.state = this.waitState;
      this.stateFrameSize = 21;
      if (this.timeWait >= 30 && this.wait >= -10) {
        this.wait -= 0.5;
        this.timeWait = 0;
      } else if (this.timeWait < 900) {
        this.timeWait += deltaTime;
      } else if (this.wait < -10) {
        this.wait = -10;
      }
    }

    if ((state.includes("d") || clickEvent === "right") && this.isOnLand) {
      this.veclocity.x = 3;
      this.idleState = idleARightState;
      this.waitState = idleBRightState;
      this.jumpState = jumpRightState;
      this.fallState = fallRightState;
      this.direction = 1;
    }

    if ((state.includes("a") || clickEvent === "left") && this.isOnLand) {
      this.idleState = idleALeftState;
      this.waitState = idleBLefttState;
      this.jumpState = jumpLeftState;
      this.fallState = fallLeftState;
      this.direction = -1;
    }

    if (this.x >= this.right - this.width + 16) {
      hitAudio.play();
      this.direction = -1;
      this.idleState = idleALeftState;
      this.waitState = idleBLefttState;
      this.jumpState = jumpLeftState;
      this.fallState = fallLeftState;
    } else if (this.x <= this.left - 16) {
      hitAudio.play();
      this.direction = 1;
      this.idleState = idleARightState;
      this.waitState = idleBRightState;
      this.jumpState = jumpRightState;
      this.fallState = fallRightState;
    }

    if (this.y >= this.bottom - this.height - this.veclocity.y) {
      this.veclocity.x = 0;

      if (!this.isJumpWait) {
        this.state = this.idleState;
        this.stateFrameSize = 21;
        this.isOnLand = true;
      }
    } else {
      this.veclocity.x = this.speed * this.direction;
    }

    if (
      this.y >= this.bottom - this.height - 3 &&
      this.y != this.bottom - this.height
    ) {
      onTopAudio.play();
    }

    if (this.isOnLand === false && this.veclocity.y < 0) {
      this.state = this.fallState;
      this.stateFrameSize = 6;
    }

    if (this.wait && !state.includes(" ")) {
      jumpAudio.play();
      waitAudio.pause();
      this.isOnLand = false;
      this.isJumpWait = false;
      this.state = this.jumpState;
      this.stateFrameSize = 6;
      this.veclocity.y += this.wait;
      this.wait = 0;
    }
  }
  update(deltatime) {
    this.stateEvent(deltatime);

    if (this.y < this.top - 4) {
      this.y = this.top - 4;
    }

    if (this.y > this.bottom - this.height) {
      this.y = this.bottom - this.height;
    }

    this.x += this.veclocity.x;
    this.y += this.veclocity.y;
    this.isOnLand ? (this.veclocity.y = 0) : (this.veclocity.y += this.gravity);

    if (this.stateFrame >= this.stateFrameSize) {
      this.stateFrame = 0;
    }

    this.draw(deltatime);
  }
}
