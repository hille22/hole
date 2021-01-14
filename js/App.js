class App {
  constructor(ID) {
    this.ID = ID;
    this.win = false;
    this.state = "start";
    this.level = 0;
    this.loose = false;
    this.outside = false;
    if (ID === "player-1") this.player1 = new Player_1(this.ctx);
    else if (ID === "player-2") this.player = new Player_2(this.ctx);
    let CLICKED = false;
    this.setupCanvas();
  }

  setupCanvas() {
    this.canvas = document.createElement("canvas");
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
    document.body.appendChild(this.canvas);
    this.ctx = this.canvas.getContext("2d");

    // x, y, r, ctx
    this.ball = new Ball(this.ctx);

    this.player1 = new Player_1(this.ctx);

    this.player = new Player_2(this.ctx);

    this.levels = new Level(this.ctx);

    this.button = new Draw(this.w / 2, this.h / 2, 40, 40, this.ctx);

    document.addEventListener("click", this.cliked.bind(this));

    this.appHasStarted = false;

    DATABASE.ref("player-1/").once("value", this.onValueChanged.bind(this));
  }

  draw() {
    this.ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
    if (this.state == "start") {
      const buttonDraw = document.querySelector(".button-draw");
      const buttonValidate = document.querySelector(".button-validate");
      const sliderContainer = document.querySelector("#slider-container");
      //console.log(this.ball);

      if (this.ID === "player-1") {
        this.ball.show();
        this.ball.move();

        //console.log(this.ball);
        buttonDraw.style.display = "inline";

        if (this.win == true) {
          console.log("winnnn");
          this.player1.levelWin();
        }

        DATABASE.ref("/player-1/loose").on("value", (snapshot) => {
          this.loose = snapshot.val();
        });

        if (this.loose == true) {
          //this.ball.resetBall();
          //this.ball.move();
          //SEND_MESSAGE("player-1/outside", false);

          console.log("looooose");
          this.player1.levelLoose();

          //   if (this.ball.x > window.innerWidth) {
          //     console.log("outside 2");

          //     SEND_MESSAGE("player-1/outside", true);
          //     SEND_MESSAGE("player-1/level", this.level);

          // }
        }
        if (this.ball.x > window.innerWidth) {
          if (this.level == 0) {
            SEND_MESSAGE("player-1/outside", true);
            SEND_MESSAGE("player-1/level", 1);
            this.ball.hide();
          }

          DATABASE.ref("/player-1/level").on("value", (snapshot) => {
            this.level = snapshot.val();
          });

          if (this.level == 1) {
            SEND_MESSAGE("player-1/outside", false);
          }
          // SEND_MESSAGE("player-1/state", "1");
        }
      }

      if (this.ID === "player-2") {
        this.ball.hide();
        this.player.show();
        buttonValidate.style.display = "flex";
        sliderContainer.style.display = "flex";
        // buttonValidate.onclick = () => {
        //   console.log("click");
        //   SEND_MESSAGE("player-2/validate", true);
        // };
      }
      requestAnimationFrame(this.draw.bind(this));
    }
  }

  cliked(e) {
    console.log(e);
    this.ball.move();
  }

  onValueChanged(snapshot) {
    //console.log("snapshot", snapshot.val);
    if (!this.appHasStarted) {
      this.appHasStarted = true;
      this.draw();
    }
    if (this.ID === "player-2") {
      this.player.action();
    }
    if (this.ID === "player-1") {
      // console.log("winnnn");
      this.player1.levelWin();
    }
  }
}

let READY = false;
let CHOSEN_PLAYER_ID;
let CLICKED_BTN;

window.onload = () => {
  const choosePlayerBtns = document.querySelectorAll("button.choose-player");
  const container = document.querySelector("#btn-container");
  const buttonDraw = document.querySelector(".button-draw");
  const buttonValidate = document.querySelector(".button-validate");
  const sliderContainer = document.querySelector("#slider-container");
  const win = document.querySelector(".win");
  const loose = document.querySelector(".loose");
  loose.style.display = "none";
  win.style.display = "none";
  buttonDraw.style.display = "none";
  buttonValidate.style.display = "none";
  sliderContainer.style.display = "none";
  DATABASE.ref("/").on("value", (snapshot) => {
    if (READY === true) return;

    let players = snapshot.val();

    let readyState = 0;

    for (let playerName in players) {
      const values = players[playerName];
      const chosen = values.chosen;
      if (chosen === undefined) continue;

      if (chosen === true) {
        readyState++;

        choosePlayerBtns.forEach((btn) => {
          if (playerName === btn.value) btn.disabled = true;
        });
      }
    }

    if (readyState < 2) return;

    READY = true;
    console.log("GAME INIT");
    console.log("PLAYER IS", CHOSEN_PLAYER_ID);

    container.style.display = "none";
    new App(CHOSEN_PLAYER_ID);
    // // players.forEach(
    // //   player => {
    // //       if()
    // //   })

    // // if (!chosen) return;

    // // btn.disabled = true;
  });

  choosePlayerBtns.forEach((btn) => {
    btn.onclick = () => {
      // container.style.display = "none";
      let ID = btn.value;
      CHOSEN_PLAYER_ID = ID;

      CLICKED_BTN = btn;
      // new App(ID);
      SEND_MESSAGE(ID + "/chosen", true);
    };
  });

  window.onbeforeunload = (e) => {
    SEND_MESSAGE("player-1/chosen", false);
    SEND_MESSAGE("player-1/level", 0);
    SEND_MESSAGE("player-2/chosen", false);
    SEND_MESSAGE("player-2/validate", false);
    SEND_MESSAGE("player-1/outside", false);
    SEND_MESSAGE("player-1/win", false);
    SEND_MESSAGE("player-1/loose", false);
    SEND_MESSAGE("player-1/state", "start");
  };
};
