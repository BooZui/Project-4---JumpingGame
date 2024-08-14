export default class Block {
  constructor(ctx, x, y, width, height) {
    this.ctx = ctx;
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.topBlock = false;
    this.hitRight = false;
    this.hitLeft = false;
    this.bottomBlock = false;
  }
  
  draw() {
    this.ctx.fillStyle = "#000";
    this.ctx.fillRect(this.x, this.y, this.width, this.height);
  }
}