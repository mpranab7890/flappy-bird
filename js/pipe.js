function Pipe(canvas, ctx, distanceBetweenPipes, gameSpeed) {
  this.x = canvas.width + distanceBetweenPipes;
  this.yTop = 0;
  this.gap = 140;
  this.minimumHeight = 100;
  this.gameSpeed = gameSpeed;

  this.heightTopPipe = getRandomNumber(
    this.minimumHeight,
    canvas.height * 0.8 - (this.minimumHeight + this.gap)
  );
  this.yBottom = this.heightTopPipe + this.gap;
  this.heightBottomPipe = canvas.height * 0.8 - this.yBottom;
  this.pipeWidth = 100;

  this.topPipe = new Image();
  this.topPipe.src = 'images/pipe-top.png';
  this.bottomPipe = new Image();
  this.bottomPipe.src = 'images/pipe-bottom.png';

  this.draw = () => {
    ctx.drawImage(
      this.topPipe,
      this.x,
      this.yTop,
      this.pipeWidth,
      this.heightTopPipe
    );
    ctx.drawImage(
      this.bottomPipe,
      this.x,
      this.yBottom,
      this.pipeWidth,
      this.heightBottomPipe
    );
  };

  this.update = (pipeArray, index, bird) => {
    this.draw();
    this.x -= this.gameSpeed;
    if (index === 0) {
      if (this.x + this.pipeWidth <= 0) {
        pipeArray.splice(index, 1);
        bird.scoreUpdated = false;
      }
    }
    // requestAnimationFrame(update);
  };
}
