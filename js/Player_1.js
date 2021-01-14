class Player_1 {
  constructor(ctx) {
    this.ctx = ctx;
    this.directory = "player-1/";
    this.level = 0;
    this.win = false;
    this.loose = false;
    this.validate = false;
    this.fillStyle = this.color;
    this.color = "red";
    this.state = "start";
    this.addFBListeners();
    this.reset();
    this.ball = new Ball(
     
      this.ctx
    );
    //this.nextLevel();
    //this.levelWin();
  }

  addFBListeners() {
    DATABASE.ref(this.directory).once("value", (snapshot) => {
      let obj = snapshot.val();
      console.log(obj);
    });
  }

  levelWin() {
    DATABASE.ref("/player-1/win").on("value", (snapshot) => {
      this.win = snapshot.val();
      console.log("validate : " + this.validate);
      console.log("win : " + this.win);
      DATABASE.ref("/player-2/validate").on("value", (snapshot) => {
        this.validate = snapshot.val();

        if (this.win == true) {
          DATABASE.ref("/player-1/level").on("value", (snapshot) => {
            this.level = snapshot.val();

            if (this.level == 1 && this.validate == true) {
              console.log("animation win");
              const buttonNext = document.querySelector(".next-level");
              const win = document.querySelector(".win");
              win.style.display = "initial";
              const loose = document.querySelector(".loose");
              loose.style.display = "none";

              buttonNext.onclick = () => {
                console.log("click");
                this.ball.show();
                this.nextLevel();
              };
            }
          });
        }
      });
    });
  }

  levelLoose() {
    DATABASE.ref("/player-1/win").on("value", (snapshot) => {
      this.win = snapshot.val();

      DATABASE.ref("/player-2/validate").on("value", (snapshot) => {
        this.validate = snapshot.val();

        if (this.win == false) {
          DATABASE.ref("/player-1/level").on("value", (snapshot) => {
            this.level = snapshot.val();

            if (this.level == 1 && this.validate == true) {
              console.log("animation loose");
              const buttonRestart = document.querySelector(".restart");
              const loose = document.querySelector(".loose");
              loose.style.display = "initial";
              const win = document.querySelector(".win");
              win.style.display = "none";

              buttonRestart.onclick = () => {
                //console.log("click");
                this.ball.show();
                this.ball.move();
                console.log(this.ball);
                this.reset();
                loose.style.display = "none";
                SEND_MESSAGE("player-2/validate", false);
                SEND_MESSAGE("player-1/outisde", false);
                SEND_MESSAGE("player-1/state", "start");
              };

              //this.nextLevel();
            }
          });
        }
      });
    });
  }

  nextLevel() {
    this.level++;
    console.log("level changed", this.level);
    this.sendMessage("level", this.level);
  }

  reset() {
    this.sendMessage("", {
      chosen: true,
      outside: false,
      level: this.level,
      validate: false,
      win: false,
      loose: false,
      drawing: [],
      state: "start",
    });
  }

  sendMessage(_type, _data) {
    SEND_MESSAGE(this.directory + _type, _data);
  }
}
