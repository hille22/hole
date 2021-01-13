class Player_1 {
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
    const data = {
      outside: false,
  
    };
  }

  changeColor(data) {
    if (this.ID = 1) {
      data.outside == true;
    }
  }
}
