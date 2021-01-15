const IMAGES1 = [
  "../img/intro.gif",
  "http://www.sololearn.com/uploads/slider/2.jpg",
  "http://www.sololearn.com/uploads/slider/3.jpg",
  "http://www.sololearn.com/uploads/slider/2.jpg",
];

class Player_2 {
  constructor(ctx) {
    this.ctx = ctx;
    this.directory = "player-2/";
    this.level = 0;
    this.win = false;
    this.winIndex = 3;
    this.loose = false;
    this.x = window.innerWidth;
    this.y = window.innerHeight;
    this.fillStyle = this.color;
    this.color = "black";
    this.state = "start";
    this.addFBListeners();
    this.reset();
    
    this.slide = document.querySelector(".slide");
    
  }

  show() {
    DATABASE.ref("/player-1/level").on("value", (snapshot) => {
      this.level = snapshot.val();
    });
    this.bg();
    if (this._action == true) {
      DATABASE.ref("/player-1/level").on("value", (snapshot) => {
        this.level = snapshot.val();
      });
      if (this.level == 1) {
        this.levelOne();
        this._action = false;
        SEND_MESSAGE("player-1/state", "1");
      }
      if (this.level == 2) {
        this.levelTwo();
        this._action = false;
        SEND_MESSAGE("player-1/state", "2");
      }
    }
    
    if (this.level == 0 ) {
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
    this._action = true;
    this.sendMessage("/player-2", {
      chosen: true,
      action: null,
      init: null,
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
      const slide = document.querySelector(".slide");
            const slider = document.querySelector(".slider");
            const prevBt = document.querySelector("#prevBt");
            const nextBt = document.querySelector("#nextBt");
            slide.style.display = "none";
            slider.style.display = "none";
            prevBt.style.display = "none";
            nextBt.style.display = "none";
      SEND_MESSAGE("player-2/validate", true);
      if (this.hasSelectedGoodImage()) {
        console.log("win");

        SEND_MESSAGE("player-1/win", true);

      } else {
        console.log("loose");
        SEND_MESSAGE("player-1/loose", true);

      }
    };

    this.selectImage(0);

    //next image function
    nextBt.addEventListener("click", (xy) => {
      this.nextImage();
      if (this.hasSelectedGoodImage()) {
        console.log("win");
      }
    });

    //prev image function
    prevBt.addEventListener("click", (xy) => {
      this.previousImage();
      if (this.hasSelectedGoodImage()) {
        console.log("win");
      }
    });
  }

  hasSelectedGoodImage() {
    return parseInt(this.slide.dataset.selectImage) === this.winIndex;
  }

  moveToImage(move) {
    const { slide } = this; // destructuring https://www.youtube.com/watch?v=UgEaJBz3bjY
    const { selectImage } = slide.dataset;
    const index = UTILS.trueModulo(parseInt(selectImage) + move, IMAGES1.length);
    // console.log(parseInt(selectImage) + move, move)
    this.selectImage(index);
  }

  selectImage(index) {
    const src = IMAGES1[index];
    this.slide.src = src;
    this.slide.dataset.selectImage = index;
  }

  nextImage() {
    this.moveToImage(1);
  }

  previousImage() {
    this.moveToImage(-1);
  }



  levelTwo() {
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
      if (this.hasSelectedGoodImage()) {
        console.log("win");

        SEND_MESSAGE("player-1/win", true);
        //SEND_MESSAGE("player-1/loose", false);
      } else {
        console.log("loose");
        SEND_MESSAGE("player-1/loose", true);
        //SEND_MESSAGE("player-1/win", false);
      }
    };

    this.selectImage(0);

    //next image function
    nextBt.addEventListener("click", (xy) => {
      this.nextImage();
      if (this.hasSelectedGoodImage()) {
        console.log("win");
      }
    });

    //prev image function
    prevBt.addEventListener("click", (xy) => {
      this.previousImage();
      if (this.hasSelectedGoodImage()) {
        console.log("win");
      }
    });
  }
}