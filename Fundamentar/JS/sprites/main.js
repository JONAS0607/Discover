const canvas = document.querySelector(".myCanvas");
const width = (canvas.width = window.innerWidth);
const height = (canvas.height = window.innerHeight);
const ctx = canvas.getContext("2d");

ctx.fillStyle = "rgb(0,0,0)";
ctx.fillRect(0, 0, width, height);

ctx.translate(width / 2, height / 2);

let imageRight = new Image();
imageRight.src = "walk-right.png";
imageRight.onload = draw;

let imageLeft = new Image();
imageLeft.src = "walk-left.png";
imageLeft.onload = draw;

let sprite = 0;
let posX = 0;

const body = document.querySelector("body");

function draw() {
  body.onkeydown = function (e) {
    ctx.fillRect(-(width / 2), -(height / 2), width, height);
    if (e.keyCode == 39) {
      ctx.drawImage(
        imageRight,
        sprite * 102,
        0,
        102,
        148,
        0 + posX,
        -74,
        102,
        148
      );
    } else if (e.keyCode == 37) {
      ctx.drawImage(
        imageLeft,
        sprite * 102,
        0,
        102,
        148,
        0 + posX,
        -74,
        102,
        148
      );
    }

    // 37 is arrow left, 39 is arrow right,
    // 38 is arrow up, 40 is arrow down

    if (e.keyCode == 37) {
      if (sprite === 5) {
        sprite = 0;
      } else {
        sprite++;
      }
      if (posX > width / 2) {
        newStartPos = -(width / 2 + 102);
        posX = Math.ceil(newStartPos);
        console.log(posX);
      } else {
        posX -= 50;
      }
      window.requestAnimationFrame(draw);
    } else if (e.keyCode == 39) {
      if (sprite === 5) {
        sprite = 0;
      } else {
        sprite++;
      }
      if (posX > width / 2) {
        newStartPos = -(width / 2 + 102);
        posX = Math.ceil(newStartPos);
        console.log(posX);
      } else {
        posX += 50;
      }
      window.requestAnimationFrame(draw);
    }
  };
}
