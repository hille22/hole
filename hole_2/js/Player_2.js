class Player_2 {
  constructor(ctx, id) {
    this.ctx = ctx;
    this.ID = id;
    this.speed = 20;
    this.direction = 0;
  }

  send() {
    SEND_MESSAGE("POSITION", {
      outside: false,
   
    });
  }

  changeColor(data) {
    if (this.ID = 2) {
      data.outside = false;
    }
  }
}
