class Level {
  constructor(ctx) {
    this.ctx = ctx;
    //console.log("Level is ready");
    this.ball = new Ball(this.ctx);
    this.hole = new Hole(this.ctx);
    this.level = 0;
    this.player1 = new Player_1(this.ctx);
    this.player = new Player_2(this.ctx);
  }

  action() {
    this._action = true;
  }

  levelInit() {
    this.ball.show();
    this.ball.move();
    this.hole.show();
    this.hole.move();
    if (this.level == 0) {
      if (this.ball.x > window.innerWidth + 50) {
        //this._init = false;
        const slide = document.querySelector(".slide");
        const slider = document.querySelector(".slider");
        const prevBt = document.querySelector("#prevBt");
        const nextBt = document.querySelector("#nextBt");
        slide.style.display = "initial";
        slider.style.display = "initial";
        prevBt.style.display = "initial";
        nextBt.style.display = "initial";

        
        SEND_MESSAGE("player-1/outside", true);
        SEND_MESSAGE("player-1/state", "1");
        DATABASE.ref("/player-1/outside").on("value", (snapshot) => {
          this.outside = snapshot.val();
        });

        if (this.outside == true && this.level == 0) {
          console.log("outside");
          SEND_MESSAGE("player-1/level", 1);

          this.ball.hide();
        }
        
        if (this.outside == true && this.level == 1) {
          console.log("outside 2");
         
        this._action = false;
        }
      }
    }
  }

  levelWin() {
    DATABASE.ref("/player-1/win").on("value", (snapshot) => {
      this.win = snapshot.val();

      DATABASE.ref("/player-2/validate").on("value", (snapshot) => {
        this.validate = snapshot.val();

        DATABASE.ref("/player-1/level").on("value", (snapshot) => {
          this.level = snapshot.val();

          if (this.level == this.level && this.validate == true) {
            //console.log("animation win");
            const buttonNext = document.querySelector(".next-level");
            const win = document.querySelector(".win");
            win.style.display = "initial";
            const loose = document.querySelector(".loose");
            loose.style.display = "none";

            buttonNext.onclick = () => {
              console.log("click");
              SEND_MESSAGE("player-2/validate", false);
              SEND_MESSAGE("player-1/outside", false);
              this.nextLevel();
            };
          }
        });
      });
    });
  }

  levelLoose() {
    DATABASE.ref("/player-2/validate").on("value", (snapshot) => {
      this.validate = snapshot.val();
      //console.log("animation loose 3");
      DATABASE.ref("/player-1/level").on("value", (snapshot) => {
        this.level = snapshot.val();

        if (this.level == this.level && this.validate == true) {
          //console.log("animation loose 2");
          const buttonRestart = document.querySelector(".restart");
          const loose = document.querySelector(".loose");
          loose.style.display = "initial";
          const win = document.querySelector(".win");
          win.style.display = "none";
          this.ball.show();
          this.ball.resetBall();

          this.hole.move();
          this.hole.show();
          this.hole.resetBall();

          this.ball.move();
          SEND_MESSAGE("player-1/outside", false);
          buttonRestart.onclick = () => {
            console.log("animation loose");
            SEND_MESSAGE("player-2/validate", false);
            console.log("restart");
            //this._init = false;
            const slide = document.querySelector(".slide");
            const slider = document.querySelector(".slider");
            const prevBt = document.querySelector("#prevBt");
            const nextBt = document.querySelector("#nextBt");
            slide.style.display = "initial";
            slider.style.display = "initial";
            prevBt.style.display = "initial";
            nextBt.style.display = "initial";
            this.player1.reset();
            //this.player.reset();
            if (this.outside == true && this.level == 1) {
              console.log("outside 2");
              this.player.levelOne();
              SEND_MESSAGE("player-1/outside", true);
              SEND_MESSAGE("player-1/level", this.level);
            }
            loose.style.display = "none";
            //   SEND_MESSAGE("player-2/validate", false);
            //   SEND_MESSAGE("player-1/outside", false);
            //   SEND_MESSAGE("player-1/state", "start");
            //   SEND_MESSAGE("player-1/level", this.level);

            DATABASE.ref("/player-1/outside").on("value", (snapshot) => {
              this.outside = snapshot.val();
            });

          };
        }
      });
    });
  }

  nextLevel() {
    this.level++;
    console.log("level changed", this.level);
    SEND_MESSAGE("player-1/level", this.level);
    SEND_MESSAGE("player-1/state", "2");
    DATABASE.ref("/player-1/level").on("value", (snapshot) => {
      this.level = snapshot.val();
    });
  }

  sendMessage(_type, _data) {
    SEND_MESSAGE(this.directory + _type, _data);
  }
}
