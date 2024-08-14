import Player from "./obj/PlayerGame.js";
import spawnBlock from "./spawnBlock/spawnBlock.js";

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

canvas.width = 600;
canvas.height = 600;

function hitTheBlock(block) {
  // Top the block
  if (
    block.y >= player.y + player.height &&
    block.y <= player.y + player.height + 16 &&
    block.x <= player.x + player.width - 16 &&
    block.x + block.width >= player.x + 16 &&
    !block.topBlock
  ) {
    block.topBlock = true;
  } else if (
    (block.x > player.x + player.width - 16 ||
      block.x + block.width < player.x + 16) &&
    block.topBlock
  ) {
    player.bottom = canvas.height;
    block.topBlock = false;
  }

  // Bottom the block
  if (
    block.y + block.height <= player.y + 6 &&
    block.y + block.height >= player.y - 20 &&
    block.x <= player.x + player.width - 16 &&
    block.x + block.width >= player.x + 16 &&
    !block.bottomBlock
  ) {
    block.bottomBlock = true;
  } else if (
    (block.x > player.x + player.width - 16 ||
      block.x + block.width < player.x + 16) &&
    block.bottomBlock
  ) {
    player.top = 0;
    block.bottomBlock = false;
  }

  // Right the block
  if (
    block.x + block.width >= player.x + 16 &&
    block.x + block.width - 4 <= player.x + 16 &&
    block.y + block.height > player.y + 6 &&
    block.y < player.y + player.height &&
    !block.hitRight
  ) {
    block.hitRight = true;
  } else if (block.hitRight) {
    player.left = 0;
    block.hitRight = false;
  }

  // Left the block
  if (
    block.x <= player.x + player.width - 16 &&
    block.x + 4 >= player.x + player.width - 16 &&
    block.y + block.height > player.y + 6 &&
    block.y < player.y + PlayerHeight &&
    !block.hitLeft
  ) {
    block.hitLeft = true;
  } else if (block.hitLeft) {
    player.right = canvas.width;
    block.hitLeft = false;
  }
}

const restartAudio = new Audio("/audio/restart.mp3");

function fallInTheHole() {
  if (
    player.x + player.width - 16 >= 60 &&
    player.y + player.height >= canvas.height - 2
  ) {
    restartAudio.play();
    player.x = -15;
    player.y = canvas.height - player.height - 20;
    player.isOnLand = false;
    return true;
  }

  if (
    player.x + player.width - 24 >= 150 &&
    player.x + 16 <= 200 &&
    player.y + player.height >= 169 &&
    player.y + player.height <= 173
  ) {
    restartAudio.play();
    player.x = -15;
    player.y = canvas.height - player.height - 20;
    player.isOnLand = false;
    return true;
  }
  return false;
}

function winner() {
  if (
    player.y + player.height <= player.height &&
    player.x >= canvas.width - player.width + 16
  ) {
    return true;
  }
  return false;
}

const playerWidth = 60;
const PlayerHeight = 40;

const playerX = 0;
const playerY = canvas.height - PlayerHeight;

const player = new Player(
  ctx,
  playerX,
  playerY,
  playerWidth,
  PlayerHeight,
  0,
  canvas.width,
  canvas.height,
  0
);

const blocks = spawnBlock(ctx);
const backgroundImg = new Image();
backgroundImg.src = "/PNG/Background/background.png";
let gate = 31;
let lastTime = 0;

export default function animation(timeStamp) {
  const deltaTime = timeStamp - lastTime;
  lastTime = timeStamp;

  // Fill the canvas background
  ctx.drawImage(backgroundImg, 0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "#11115555";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Fill the destination
  ctx.fillStyle = "#fa2334";
  ctx.fillRect(
    canvas.width - (player.width - 28),
    0,
    player.width - 28,
    player.height - 6
  );

  // Fill the hole
  ctx.fillStyle = "#fff";
  ctx.fillRect(60, canvas.height - 1, canvas.width - 60, 1);
  ctx.fillRect(150, 169, 50, 1);

  blocks.forEach((block) => {
    block.draw();
    hitTheBlock(block);

    if (block.topBlock) {
      player.bottom = block.y;
    }

    if (block.bottomBlock) {
      player.top = block.y + block.height + 6;
    }

    if (block.hitRight) {
      player.left = block.x + block.width;
    }

    if (block.hitLeft) {
      player.right = block.x;
    }
  });

  // Update player and block
  player.update(deltaTime);

  let check = fallInTheHole();

  if (check) {
    gate = 0;
    check = false;
  }

  if (gate < 30) {
    ctx.fillStyle = "#fff8";
    ctx.fillRect(0, 540, 2, 45);
    gate++;
  } else if (gate === 20) {
    gate = 31;
  }

  const animate = requestAnimationFrame(animation);

  if (winner()) {
    cancelAnimationFrame(animate);
  }
}