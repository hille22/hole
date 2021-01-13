class Draw {
    constructor(x, y, w, h, ctx) {
      this.x = x;
      this.y = y;
      this.w = w;
      this.h = h;
      this.ctx = ctx;
      this.color = "red";
      this.ID = Math.random() * 10;
      document.addEventListener("click", this.send.bind(this));
    }
    show() {
      this.ctx.fillStyle = this.color;
      this.ctx.fillRect(this.x, this.y, this.w, this.h);
    }
  
    send() {
    //   SEND_MESSAGE("SIZE_COLOR_CHANGE", {
    //     color: `rgba(${Math.round(Math.random() * 255)},0,${Math.round(Math.random() * 255)},0.02)`,
    //     w: this.w+20,
    //     h: this.h+20, 
    //     x : this.x-10,
    //     y: this.y-10,
      
    //     id: this.ID,
        
    //   });
    }
  
    changeColor(data) {
    //   if (this.ID != data.id) {
    //     this.color = data.color;
    //     this.w = data.w;
    //     this.h = data.h;
    //     this.x = data.x;
    //     this.y = data.y;
        
    //   }
     }
  
  }