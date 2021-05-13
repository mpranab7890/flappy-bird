function Background(canvas, ctx, gameSpeed) {
  this.backgroundImage = new Image();
  this.backgroundImage.src = 'images/background.png';

  this.gameSpeed = gameSpeed;

  this.x1 = 0;
  this.x2 = canvas.width;

  this.drawbackground = () => {
    ctx.drawImage(
      this.backgroundImage,
      this.x1,
      0,
      canvas.width,
      canvas.height * 0.8
    );
    ctx.drawImage(
      this.backgroundImage,
      this.x2,
      0,
      canvas.width,
      canvas.height * 0.8
    );

    this.x1 -= this.gameSpeed;
    this.x2 -= this.gameSpeed;

    if (this.x1 <= -canvas.width) {
      this.x1 = 0;
    }

    if (this.x2 <= 0) {
      this.x2 = canvas.width;
    }
    requestAnimationFrame(this.drawbackground);
  };
}
