function Base(canvas, ctx, gameSpeed) {
  this.baseImage = new Image();
  this.baseImage.src = 'images/base.png';

  this.gameSpeed = gameSpeed;

  this.x1 = 0;
  this.x2 = canvas.width;

  this.drawBase = () => {
    ctx.drawImage(
      this.baseImage,
      this.x1,
      canvas.height * 0.8,
      canvas.width,
      canvas.height * 0.2
    );
    ctx.drawImage(
      this.baseImage,
      this.x2,
      canvas.height * 0.8,
      canvas.width,
      canvas.height * 0.2
    );

    this.x1 -= this.gameSpeed;
    this.x2 -= this.gameSpeed;

    if (this.x1 <= -canvas.width) {
      this.x1 = 0;
    }

    if (this.x2 <= 0) {
      this.x2 = canvas.width;
    }
    requestAnimationFrame(this.drawBase);
  };
}
