function StartMenu() {
  var canvas = document.getElementById('canvas-1');
  var ctx = canvas.getContext('2d');
  canvas.width = 500;
  canvas.height = window.innerHeight / 1.3;

  //Start Menu
  var image = new Image();
  image.src = 'images/background.png';

  const drawBackground = () => {
    ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
    requestAnimationFrame(drawBackground);
  };

  drawBackground();
  var startMenu = document.querySelector('.start-menu');
  var startButton = document.querySelector('.start-button');
  startButton.onclick = () => {
    startMenu.style.display = 'none';
    this.game = new Game(canvas, ctx);
  };
}

var startMenu = new StartMenu();
