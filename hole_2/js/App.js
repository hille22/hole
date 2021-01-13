class App {
  constructor() {
    console.log("App lancée");
    const urlParameter = new URLSearchParams(window.location.search);
    this.ID = urlParameter.get("player");
    this.setup();
  }

  setup() {
    this.canvas = document.createElement("canvas");
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
    document.body.appendChild(this.canvas);
    this.ctx = this.canvas.getContext("2d");

    // x, y, r, ctx
    this.ball = new Ball(
      window.innerWidth / 2,
      window.innerHeight / 2,
      20,
      this.ctx
    );

    // Ajouter player 1
    this.player1 = new Player_1(this.ctx, this.ID);

    // Ajouter player 2
    this.player2 = new Player_2(this.ctx, this.ID);

    document.addEventListener("click", this.cliked.bind(this));

    DATABASE.ref("POSITION").on("value", (snapshot) => {
      if (!this.appHasStarted) {
        this.player1.changeColor(snapshot.val());
        this.draw();
        this.appHasStarted = true;
      } else {
        const value = snapshot.val();
        this.player1.changeColor(value);
      }
    });
  }

  draw() {
    this.ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

    if (this.ID == 1) {
      this.ball.show();
      this.player1.detect(this.ball);
      
      document.body.style.background = "white";
    }

    if (this.ID == 2) {
      this.ball.hide();
      this.player2.detect(this.ball);
      document.body.style.background = "blue";
    }

    requestAnimationFrame(this.draw.bind(this));
  }

  cliked(e) {
      this.ball.move(); 
  }

}

window.onload = () => {
  new App();
};
