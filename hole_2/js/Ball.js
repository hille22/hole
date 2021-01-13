class Ball{
    constructor(x,y,r,ctx,colors){
        this.x = x;
        this.y = y;
        this.r = r;
        this.speedX = 25;   
        this.color = colors;
        this.ctx = ctx;
        console.log("Ball is ready");
    }

    show(){
        this.ctx.fillStyle = this.colors;
        this.ctx.beginPath();
        this.ctx.arc(this.x, this.y, this.r, 0, 2*Math.PI, false);
        this.ctx.fill();
        this.ctx.closePath();
    }

    move(){
        this.x += this.speedX;
        
    }

    hide(){
        this.speedX = 0;
        this.x = -50;
        this.y = -50;
       
    }
}