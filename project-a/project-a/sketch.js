let blink = false;
let timer = 0;
let showBg = false;

let pupilSize = 80;

let balls = [];

function setup() {
  createCanvas(400, 400);

  for (let i = 0; i < 15; i = i + 1) {
    balls.push({
      x: random(width),
      y: random(height),
      size: random(20, 90),
      xSpeed: random(-4, 4),
      ySpeed: random(-4, 4),
      angle: random(0, TWO_PI),
    });
  }
}

function draw() {
  timer = timer + 1;

  if (showBg == false) {
    background(255, 195, 170);
  } else {
    background(255);
    noFill();
    stroke(0);
    strokeWeight(1);

    for (let x = 0; x <= 400; x += 20) {
      for (let y = 0; y <= 400; y += 20) {
        let wave = sin(timer * 0.05 + x * y) * 10;

        circle(x, y, 30 + wave);

        for (let dia = 1; dia <= 40; dia += 5) {
          circle(x, y, dia + wave);
        }
      }
    }
  }

  // eye apple
  fill(255);
  noStroke();
  ellipse(200, 200, 400, 200);

  // pink thing
  fill(255, 153, 204);
  noStroke();
  ellipse(15, 200, 30, 80);
 
  // eye
  noFill();
  stroke(240, 184, 160);
  strokeWeight(10);
  ellipse(200, 200, 400, 200);

  // lashes
  stroke(153, 76, 0);
  line(80, 115, 40, 40);
  line(200, 100, 200, 40);
  line(320, 115, 360, 40);

  // pupil
  let eyeX = mouseX;
  let eyeY = mouseY;

  let shake = map(timer, 0, 100, 0, 1);

  if (timer > 300) {
    eyeX = mouseX + random(-shake, shake);
    eyeY = mouseY + random(-shake, shake);
  }

  if (eyeX < 80) eyeX = 80;
  if (eyeX > 320) eyeX = 320;
  if (eyeY < 160) eyeY = 160;
  if (eyeY > 240) eyeY = 240;

  fill(255, 0, 0);
  noStroke();
  circle(eyeX, eyeY, pupilSize);

  // чёрный экран с шариками
  if (blink == true) {
    background(0);

    for (let ball of balls) {
      ball.x += ball.xSpeed;
      ball.y += ball.ySpeed;

      if (ball.x > width || ball.x < 0) {
        ball.xSpeed = -ball.xSpeed;
      }

      if (ball.y > height || ball.y < 0) {
        ball.ySpeed = -ball.ySpeed;
      }

      let r = sin(ball.angle) * 127 + 128;
      let g = sin(ball.angle + 1) * 127 + 128;
      let b = sin(ball.angle + 3) * 127 + 128;

      fill(r, g, b);
      noStroke();

      let newSize = sin(ball.angle) * 45 + 45;
      circle(ball.x, ball.y, newSize);

      ball.angle = ball.angle + 0.03;
    }
  }
}

function mousePressed() {
  if (pupilSize == 80) {
    pupilSize = 30;
  } else {
    pupilSize = 80;
  }
}

function keyPressed() {
  if (key == " ") {
    blink = true; // глаза закрылись
  }

  if (key == "h") {
    showBg = !showBg;
  }
}

function keyReleased() {
  if (key == " ") {
    blink = false; // глаза открылись
    timer = 0; // всё начинается заново
  }
}
