const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');
// console.log(ctx);
// canvas.clientWidth = window.innerWidth;
// canvas.clientHeight = window.innerHeight;

// client height is canvas size "relative" to the window
// height is pixels inside canvas. so higher height than client height means more resolution

canvas.width = window.innerWidth;
canvas.height= window.innerHeight;

window.addEventListener('resize', () => {
  canvas.width = window.innerWidth;
  canvas.height= window.innerHeight;
  // ctx.fillRect(10, 10, 150, 100);
});

// mouse interactivity
const mouse = {
  x: null,
  y: null,
};
//                      mouse move
canvas.addEventListener('click', (event) => {
  mouse.x = event.x;
  mouse.y = event.y;
});

function drawCircle() {
  // ctx.fillStyle = 'white';
  // ctx.fillRect(10, 10, 150, 100);
  ctx.fillStyle = 'red';
  // ctx.strokeStyle = 'red';
  // begin path tells js that new drawings are separate shape from previous
  ctx.beginPath();
  // x, y, radius, start angle, radians to fill
  ctx.arc(100, 100, 50, 0, Math.PI * 2);
  ctx.fill();
  // ctx.stroke();
}
drawCircle();
