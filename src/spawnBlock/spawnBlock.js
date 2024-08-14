import Block from "../obj/Block.js";

export default function spawnBlock(ctx) {
  let blocks = [];
  blocks.push(new Block(ctx, 198, 60, 4, 540));
  blocks.push(new Block(ctx, 198, 56, 20, 10));
  blocks.push(new Block(ctx, 198, 0, 4, 15));
  blocks.push(new Block(ctx, 398, 0, 4, 530));
  blocks.push(new Block(ctx, 398, 580, 4, 20));
  blocks.push(new Block(ctx, 390, 230, 10, 10));
  blocks.push(new Block(ctx, 202, 430, 8, 10));
  blocks.push(new Block(ctx, 568, 34, 32, 4));

  blocks.push(new Block(ctx, 120, 500, 30, 10));
  blocks.push(new Block(ctx, 100, 440, 50, 10));
  blocks.push(new Block(ctx, 96, 350, 4, 100));
  blocks.push(new Block(ctx, 50, 280, 10, 105));
  blocks.push(new Block(ctx, 100, 280, 30, 4));
  blocks.push(new Block(ctx, 130, 360, 4, 32));
  blocks.push(new Block(ctx, 134, 360, 10, 10))
  blocks.push(new Block(ctx, 0, 440, 60, 10));
  blocks.push(new Block(ctx, 46, 330, 4, 6));
  blocks.push(new Block(ctx, 190, 280, 4, 4));
  blocks.push(new Block(ctx, 100, 220, 60, 10));
  blocks.push(new Block(ctx, 0, 230, 50, 4));
  blocks.push(new Block(ctx, 50, 170, 4, 20));
  blocks.push(new Block(ctx, 50, 170, 150, 4));

  blocks.push(new Block(ctx, 500, 500, 4, 4));
  blocks.push(new Block(ctx, 440, 400, 4, 4));
  blocks.push(new Block(ctx, 500, 360, 4, 4));
  blocks.push(new Block(ctx, 540, 280, 4, 4));
  blocks.push(new Block(ctx, 460, 260, 4, 4));
  blocks.push(new Block(ctx, 455, 200, 4, 4));
  blocks.push(new Block(ctx, 500, 120, 4, 4));

  return blocks
}