class Hole {
  constructor(ctx) {
    this.x = -50;
    this.y = window.innerHeight / 2+20;
    this.r = 20;
    this.speedX = 1;
    this.gravity = 0.05;
    this.gravitySpeed = 0.5;
    this.color = "white";
    this.ctx = ctx;
    console.log("Ball is ready");
    
  }
  
  show() {
    this.ctx.fillStyle = this.color;
    this.ctx.beginPath();
    this.ctx.ellipse(this.x, this.y, 15, 5, 0, 0, 2 * Math.PI);
    this.ctx.fill();
    this.ctx.stroke();
    this.ctx.closePath();
    this.ctx.fillStyle = "black";
    this.ctx.beginPath();
    this.ctx.ellipse(this.x, this.y+2, 12, 4, 0, 0, 2 * Math.PI);
    this.ctx.fill();
    this.ctx.closePath();
  }

  move() {
    if (this.x <= window.innerWidth / 2) {
      this.gravitySpeed += this.gravity;
      this.x += this.speedX + this.gravitySpeed;
    }
    if (this.x == window.innerWidth / 2 + 20) {
      return (this.x = 90);
    }
  }

  resetBall() {
    this.x = -50;
    this.y = window.innerHeight / 2+20;
    this.r = 20;
    this.speedX = 1;
    this.gravity = 0.05;
    this.gravitySpeed = 0.5;
  }

  hide() {
    this.speedX = 0;
    this.x = -50;
    this.y = -50;
    this.gravity = 0;
    this.gravitySpeed = 0;
  }
}
