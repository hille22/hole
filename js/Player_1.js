class Player_1 {
  constructor(ctx) {
    this.ctx = ctx;
    this.directory = "player-1/";
    this.level = 1;
    this.win = false;
    this.loose = false;
    this.fillStyle = this.color;
    this.color = "red";
    this.state = "start";
    this.addFBListeners();
    this.reset();
  }

  addFBListeners() {
    DATABASE.ref(this.directory).once("value", (snapshot) => {
      let obj = snapshot.val();
      console.log(obj);
    });
  }

  reset() {
    this.sendMessage("", {
      chosen: true,
      level:this.level,
      validate: false,
      win: false,
      loose: false,
      drawing: [],
      init: null,
      state: "start",
    });
  }

  sendMessage(_type, _data) {
    SEND_MESSAGE(this.directory + _type, _data);
  }
}
