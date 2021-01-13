class Player_1 {
  constructor(ctx) {
    this.ctx = ctx;
    this.directory = "player-1/";
    this.level = 0;
    this.win = false;
    this.loose = false;
    this.fillStyle = this.color;
    this.color = "red";
    this.addFBListeners();
    this.reset();
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
     
      console.log("win : " + this.win);
      //console.log("level : " + level);
      if (this.win == true) {
        DATABASE.ref("/player-1/level").on("value", (snapshot) => {
          this.level = snapshot.val();
        //this.level = snapshot.val();
        if(this.level == 1){
          console.log("winnnn");
          //this.nextLevel();
        }
      });
      }

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
      level: 0,
      win:false,
      loose:false,
      drawing: [],
      state: "start",
    });
  }

  sendMessage(_type, _data) {
    SEND_MESSAGE(this.directory + _type, _data);
  }
}
