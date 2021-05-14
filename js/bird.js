function Bird(canvas, ctx, gameStarted, gameOverMenu) {
  this.x = 50;
  this.y = canvas.height * 0.4;
  this.birdImage = new Image();
  this.birdImage.src = 'images/bird.png';
  this.velocityDown = 0;
  this.gravity = 0.3;
  this.velocityUp = 25;
  this.birdWidth = 50;
  this.birdHeight = 40;
  this.scoreUpdated = false;
  this.collided = false;
  this.gameStarted = gameStarted;

  this.drawBird = () => {
    ctx.drawImage(
      this.birdImage,
      this.x,
      this.y,
      this.birdWidth,
      this.birdHeight
    );
  };

  this.update = () => {
    this.drawBird();
    if (this.gameStarted) {
      this.velocityDown += this.gravity;
      this.y += this.velocityDown;
    }
    this.checkCollisionWithBase();

    requestAnimationFrame(this.update);
  };

  this.checkCollision = (pipe) => {
    if (
      this.x + this.birdWidth >= pipe.x &&
      this.x <= pipe.x + pipe.pipeWidth &&
      (this.y <= pipe.heightTopPipe || this.y + this.birdHeight >= pipe.yBottom)
    ) {
      this.collided = true;
      return true;
    }
    return false;
  };

  this.checkCollisionWithBase = () => {
    if (this.y + this.birdHeight >= canvas.height * 0.8) {
      this.y = canvas.height * 0.8 - this.birdHeight;
      this.collided = true;
      document.querySelector('.score').style.display = 'none';
      return true;
    }
    return false;
  };

  this.calculateScore = (pipe, score, scoreElement) => {
    if (
      this.x + this.birdWidth > pipe.x + pipe.pipeWidth &&
      !this.scoreUpdated
    ) {
      score = score + 1;
      scoreElement.innerHTML = score;
      this.scoreUpdated = true;
    }
    return score;
  };

  this.fly = () => {
    if (!this.collided) {
      this.y = this.y - this.velocityUp;
      this.velocityDown -= this.velocityUp * this.gravity;
    }
  };
}
