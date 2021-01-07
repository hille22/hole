class Player_2 {
  constructor(ctx) {
    this.ctx = ctx;
    this.directory = 'player-2/'
    this.level = 0;
    this.x = window.innerWidth;
    this.y = window.innerHeight;


    // this.sendMessage()
    this.fillStyle = this.color;
    this.color = "black";
    this.color2 = "white";
    this.addFBListeners();
    this.reset();
    console.log("player 2 is ready");
    
  }



  bg() {
    this.ctx.fillStyle = this.color;
    this.ctx.beginPath();  
    this.ctx.rect(0, 0, this.x, this.y);
    this.ctx.fill();
    this.ctx.closePath();

  }
  action() {
    this.ctx.fillStyle = this.color2;
    this.ctx.beginPath();
    this.ctx.rect(0, 0, this.x, this.y);
    this.ctx.fill();
    this.ctx.closePath();
    console.log("action");
  }

  reset() {
    this.sendMessage("/player-2", {
      chosen: true,
      action: null,
      
    });
  }

  addFBListeners() {
    DATABASE.ref('/player-1/level').on("value", (snapshot) => {
      this.level = snapshot.val();
      this.onLevelChange()
    });
  }

  onLevelChange() {
  
    
  }

  sendMessage(_type, _data) {
    SEND_MESSAGE(this.directory + _type, _data);
  }

  // detect(ball) {

  //   const data = {
  //     outside: false,

  //   };

  //   if (ball.x > window.innerWidth) {
  //     console.log("SEND TO FIREBASE");
  //     data.outside = true;
  //     SEND_MESSAGE("HOLE/POSITION", data);

  //   }
  // }
}
