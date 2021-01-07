class Player_1 {
  constructor(ctx) {
    this.ctx = ctx;
    this.directory = "player-1/";
    this.level = 0;

    // this.sendMessage()

    this.addFBListeners();
    this.reset();
    //this.detect();
     this.nextLevel()
    // this.speed = 20;
    // this.direction = 0;
  }

  addFBListeners() {
    DATABASE.ref(this.directory).once("value", (snapshot) => {
      let obj = snapshot.val();
      console.log(obj);
    });
  }

  nextLevel() {
    this.level++;
    console.log('level changed', this.level)
    this.sendMessage('level', this.level)
    this.sendMessage('level/key', 0)
  }

  reset() {
    this.sendMessage("", {
      chosen: true,
      outside: false,
      level: this.level,
      
      drawing: [],
      state: "start",
    });
  }

  sendMessage(_type, _data) {
    SEND_MESSAGE(this.directory + _type, _data);
  }

}
