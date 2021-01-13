class Ball{
    constructor(x,y,r,ctx){
        this.x = x;
        this.y = y;
        this.r = r;
        this.speedX = 55;   
        this.color = "black";
        this.ctx = ctx;
        console.log("Ball is ready");
    }

    show(){
        this.ctx.fillStyle = this.color;
        this.ctx.beginPath();
        this.ctx.arc(this.x, this.y, this.r, 0, 2*Math.PI, false);
        this.ctx.fill();
        this.ctx.closePath();
    }

    
    move(){
        this.x += this.speedX;
        
    }

    move2(){
        this.x + 50;
    }

    hide(){
        this.speedX = 0;
        this.x = -50;
        this.y = -50;
       
    }
}