class Ball{
    constructor(ctx){
        this.x =  window.innerWidth / 2;
        this.y = window.innerHeight / 2;
        this.r = 20;
        this.speedX = 1;   
        this.gravity = 0.15;
        this.gravitySpeed = 0.5;
        this.color = "black";
        this.ctx = ctx;
        console.log("Ball is ready");
    }

    show(){
        this.ctx.fillStyle = "white";
        this.ctx.beginPath();
        this.ctx.rect(0, 0, window.innerWidth ,window.innerHeight);
        this.ctx.fill();
        this.ctx.closePath();

        this.ctx.fillStyle = this.color;
        this.ctx.beginPath();
        this.ctx.arc(this.x, this.y, this.r, 0, 2*Math.PI, false);
        this.ctx.fill();
        this.ctx.closePath();

        
    }
    

    
    move(){
        this.gravitySpeed += this.gravity;
        this.x += this.speedX + this.gravitySpeed;
        
    }

    move2(){
        this.gravitySpeed += this.gravity;
        this.x += this.speedX + this.gravitySpeed;
        
    }

    resetBall(){
        this.x =  window.innerWidth / 2;
        this.y = window.innerHeight / 2;
        this.r = 20;
        this.speedX = 1;   
        this.gravity = 0.15;
        this.gravitySpeed = 0.5;
    }

    hide(){
        this.speedX = 0;
        this.x = -50;
        this.y = -50;
        this.gravity = 0;
        this.gravitySpeed = 0;
       
    }
}