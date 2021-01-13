class Player_2 {
  constructor(ctx) {
    this.ctx = ctx;
    this.directory = "player-2/";
    this.level = 0;
    this.win = false;
    this.loose = false;
    this.x = window.innerWidth;
    this.y = window.innerHeight;
    this.fillStyle = this.color;
    this.color = "black";
    this.addFBListeners();
    this.reset();
    console.log("player 2 is ready");

    //this.levelOne();
  }

  show() {
    this.bg();
    if (this._action == true) {
      if (this.level == 1) {
        this.levelOne();
        this._action = false;
      }
      if (this.level == 2) {
        this.ctx.fillStyle = "red";
        this.levelTwo();
        this.ctx.beginPath();
        this.ctx.fillRect(0, 0, window.innerWidth, window.innerHeight);
      }
    }
    if (this.level == 0) {
      const slide = document.querySelector(".slide");
      const slider = document.querySelector(".slider");
      const prevBt = document.querySelector("#prevBt");
      const nextBt = document.querySelector("#nextBt");
      slide.style.display = "none";
      slider.style.display = "none";
      prevBt.style.display = "none";
      nextBt.style.display = "none";
    }
  }
  action() {
    this._action = true;
  }
  bg() {
    this.ctx.fillStyle = this.color;
    this.ctx.beginPath();
    this.ctx.rect(0, 0, this.x, this.y);
    this.ctx.fill();
    this.ctx.closePath();
  }
  reset() {
    this.sendMessage("/player-2", {
      chosen: true,
      action: null,
      validate: false,
    });
  }

  addFBListeners() {
    DATABASE.ref("/player-1/level").on("value", (snapshot) => {
      this.level = snapshot.val();
    });
  }

  sendMessage(_type, _data) {
    SEND_MESSAGE(this.directory + _type, _data);
  }

  levelOne() {
    console.log("level 1 load");
    const buttonValidate = document.querySelector(".button-validate");
    const slide = document.querySelector(".slide");
    const slider = document.querySelector(".slider");
    const prevBt = document.querySelector("#prevBt");
    const nextBt = document.querySelector("#nextBt");
    slide.style.display = "initial";
    slider.style.display = "initial";
    prevBt.style.display = "initial";
    nextBt.style.display = "initial";

    buttonValidate.onclick = () => {
      console.log("click");
      SEND_MESSAGE("player-2/validate", true);
      if (document.querySelector("#start-3") ) {
        console.log("win");
        SEND_MESSAGE("player-1/win", true);
        SEND_MESSAGE("player-1/loose", false);
      }else{
        console.log("loose");
        SEND_MESSAGE("player-1/loose", true);
        SEND_MESSAGE("player-1/win", false);
      }
    };

    let count = 0; // start point

    let images = [
      "http://www.sololearn.com/uploads/slider/1.jpg",
      "http://www.sololearn.com/uploads/slider/2.jpg",
      "http://www.sololearn.com/uploads/slider/3.jpg",
      "http://www.sololearn.com/uploads/slider/2.jpg",
    ];

    // change img
    slide.src = images[count];

    //next image function
    nextBt.addEventListener("click", (xy) => {
      if (count == 3) {
        count = -1;
      }

      count++;
      document.querySelector('[id^="start-"]').id = "start-" + count;
      slide.src = images[count];

      if (document.querySelector("#start-3")) {
        console.log("win");
        //SEND_MESSAGE("player-1/win", true);
      }
    });

    //prev image function
    prevBt.addEventListener("click", (xy) => {
      if (count == 0) {
        count = 4;
      }
      document.querySelector('[id^="start-"]').id = "start-" + count;
      count--;
      slide.src = images[count];

      DATABASE.ref("player-2/validate").on("value", (snapshot) => {
        this.validate = snapshot.val();
      });
      if ("validate" == true) {
        console.log("validate");
        // if (document.querySelector("#start-3") && this.validate == true) {
        //   console.log("win");
        //   SEND_MESSAGE("player-1/win", true);
        //"" }
      }
    });
  }

  levelTwo() {
    console.log("level 2");
  }
}
