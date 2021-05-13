function Game(canvas, ctx) {
  this.gameOverMenu = document.querySelector('.game-over-menu');
  this.score = 0;
  this.scoreElement = document.querySelector('.score');
  this.scoreElement.style.display = 'block';
  this.scoreElement.innerHTML = this.score;
  this.pipeArray = [];
  this.distanceBetweenPipes = 200;
  this.gameSpeed = 5;
  this.gameStarted = false;
  this.flag = false;

  this.background = new Background(canvas, ctx, this.gameSpeed);
  this.background.drawbackground();

  this.base = new Base(canvas, ctx, this.gameSpeed);
  this.base.drawBase();

  this.bird = new Bird(canvas, ctx, this.gameStarted, this.gameOverMenu);
  this.bird.update();

  this.updateAndGeneratePipe = () => {
    // console.log('Score: ' + this.score);
    if (this.pipeArray.length != 0) {
      if (
        this.bird.checkCollision(this.pipeArray[0]) ||
        this.bird.checkCollisionWithBase()
      ) {
        this.reset();
      }
      this.score = this.bird.calculateScore(
        this.pipeArray[0],
        this.score,
        this.scoreElement
      );
      this.pipeArray.forEach((pipe, index) => {
        pipe.update(this.pipeArray, index, this.bird);
        //   console.log(this.pipeArray.length);
        if (index == this.pipeArray.length - 1) {
          if (canvas.width - pipe.x >= this.distanceBetweenPipes) {
            this.pipeArray.push(
              new Pipe(canvas, ctx, this.distanceBetweenPipes, this.gameSpeed)
            );
          }
        }
      });
    }

    this.animationFrame = requestAnimationFrame(this.updateAndGeneratePipe);
  };

  window.addEventListener('keypress', (e) => {
    if (e.keyCode == 32) {
      if (!this.gameStarted) {
        this.pipeArray.push(
          new Pipe(canvas, ctx, this.distanceBetweenPipes, this.gameSpeed)
        );
        this.gameStarted = true;
        this.bird.gameStarted = true;
        if (!this.flag) {
          this.flag = true;
          this.updateAndGeneratePipe();
        }
      }

      this.bird.fly();
    }
  });

  this.reset = () => {
    this.gameOverMenu.style.display = 'block';
    this.background.gameSpeed = 0;
    this.base.gameSpeed = 0;
    this.gameStarted = false;

    this.pipeArray.forEach((pipe) => (pipe.gameSpeed = 0));
    document.querySelector('.final-score').innerHTML = this.score;

    if (localStorage.getItem('high-score') === null) {
      localStorage.setItem('high-score', 0);
    }

    let highScore = localStorage.getItem('high-score');
    if (this.score > highScore) {
      highScore = this.score;
      localStorage.setItem('high-score', this.score);
    }
    document.querySelector('.high-score').innerHTML = highScore;
  };

  this.replayButton = document.querySelector('.replay-button');
  this.replayButton.onclick = () => {
    this.score = 0;
    this.background.gameSpeed = this.gameSpeed;
    this.base.gameSpeed = this.gameSpeed;
    this.pipeArray = [];
    this.bird.y = canvas.height * 0.4;
    this.bird.gameStarted = false;
    this.bird.velocityDown = 0;
    this.bird.collided = false;
    this.scoreElement.style.display = 'block';
    this.scoreElement.innerHTML = this.score;
    this.gameOverMenu.style.display = 'none';
  };
}
