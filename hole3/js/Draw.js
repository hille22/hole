
class Draw {
  constructor(ctx) {
    console.log('App ready');
    this.ctx = ctx;
    this.database = firebase.database();
   
    this.color = {
      'r': Math.round(Math.random() * 255),
      'g': Math.round(Math.random() * 255),
      'b': Math.round(Math.random() * 255),
    };

     this.MOUSE = {
      x:0,
      y:0, 
    }

    this.UID = '_' + Math.random().toString(36).substr(2, 9);
    // this.ctx.strokeStyle = 'rgb(255,0,0)';

    window.addEventListener('mousedown', (e) => {
     this.MOUSE.x = e.clientX;
     this.MOUSE.y = e.clientY;
     
     this.touchStart(e);
    });

    window.addEventListener('mousemove', (e) => {
      this.MOUSE.x = e.clientX;
      this.MOUSE.y = e.clientY;
      this.touchMove(e);
    });

    //window.addEventListener('mouseup', mouseUp);
    window.addEventListener('mouseup', (e) => {
      this.MOUSE.x = e.clientX;
      this.MOUSE.y = e.clientY;
      this.touchEnd(e);
    });

    window.addEventListener('touchstart', (e) => {
      this.MOUSE.x = e.touches[0].clientX;
      this.MOUSE.y = e.touches[0].clientY;
      this.touchStart(e);
    });

    window.addEventListener('touchmove', (e) => {
      this.MOUSE.x = e.touches[0].clientX;
      this.MOUSE.y = e.touches[0].clientY;
      this.touchMove(e);
    });

    window.addEventListener('touchend', (e) => {
      this.MOUSE.x = e.touches[0].clientX;
      this.MOUSE.y = e.touches[0].clientY;
      touchEnd(e);
    });
    document.body.addEventListener("touchstart", (e) => {
      if (e.target == canvas) {
        e.preventDefault();
      }
    }, false);
    document.body.addEventListener("touchend", (e) => {
      if (e.target == canvas) {
        e.preventDefault();
      }
    }, false);
    document.body.addEventListener("touchmove", (e) => {
      if (e.target == canvas) {
        e.preventDefault();
      }
    }, false);
    
    this.addDatabaseListener();

    this.isDrawing = false;
    this.count = 0;
  }

  touchStart(e) {
    console.log('mouse down', e);
    this.isDrawing = true;
    // this.ctx.beginPath();
    // this.ctx.moveTo(e.x, e.y);
  }

  touchMove(e) {
    if (this.isDrawing) {
      //console.log('mouse move');
      this.send('DRAWINGS/' + this.UID + '/' + Date.now(), {
        'x': e.x,
        'y': e.y,
        'color': this.color,
      });
    }
  }

  touchEnd(e) {
    //console.log('mouse up');
    this.isDrawing = false;
    this.send('DRAWINGS/' + this.UID, null);
  }

  send(path, value) {
    const json = {'data': value};
    this.database.ref(path).set(json);
  }

  getMousePos(canvasDom, mouseEvent) {
		var rect = canvasDom.getBoundingClientRect();
		return {
			x: mouseEvent.clientX - rect.left,
			y: mouseEvent.clientY - rect.top
		};
  }
  
  getTouchPos(canvasDom, touchEvent) {
		var rect = canvasDom.getBoundingClientRect();
		return {
			x: touchEvent.touches[0].clientX - rect.left,
			y: touchEvent.touches[0].clientY - rect.top
    };
    
    
    
	}




  addDatabaseListener() {
    this.database.ref('DRAWINGS').on('value', (snapshot) => {
      // console.log(snapshot.val());
      this.drawings = snapshot.val();
      //console.log(this.drawings);
      for (const user in this.drawings) {
        const points = Object.keys(this.drawings[user]);
        if (points.length >= 2) {
          //console.log(points);
          this.ctx.beginPath();
          const data = this.drawings[user][points[0]].data;
          this.ctx.strokeStyle = 'red';
          this.ctx.moveTo(data.x, data.y);
          for (let i = 1; i < points.length; i++) {
            const data2 = this.drawings[user][points[i]].data;
            this.ctx.lineTo(data2.x, data2.y);
          }
          this.ctx.stroke();
          this.ctx.closePath();
        }
      }

    })
  }

};