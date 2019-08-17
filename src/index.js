import * as p5 from "p5";
const height = 1400;
const width = 1400;
const rows = height / 20;
const cols = width / 20;
const box = 20;
const terrain = [];
let movement = 1;
let movementSpeed = 0.1;
let high = 100;
let low = 0;
let rotation = 3;
let frameRate = 30;
p5.disableFriendlyErrors = true;

const speedInput = document.getElementById("speed");
speedInput.addEventListener("input", ev => {
  movementSpeed = speedInput.value;
});

const heightInput = document.getElementById("height");
heightInput.addEventListener("input", ev => {
  high = heightInput.value;
});

const depthInput = document.getElementById("depth");
depthInput.addEventListener("input", ev => {
  low = parseInt(depthInput.value);
});

const rotationInput = document.getElementById("rotation");
rotationInput.addEventListener("input", ev => {
  rotation = rotationInput.value;
});

let RobotoMonoRegular;

const main = p5 => {
  p5.preload = () => {
    RobotoMonoRegular = p5.loadFont("assets/RobotoMono-Regular.ttf");
  };
  p5.setup = () => {
    p5.createCanvas(600, 600, p5.WEBGL);
  };

  p5.draw = () => {
    p5.clear();
    movement -= movementSpeed;

    p5.stroke(233);

    p5.background(0);
    p5.noFill();
    p5.push();
    p5.rotateX(p5.PI / rotation);
    p5.translate(-width / 2, -height / 2);

    let yOffset = movement;
    for (let y = 0; y < rows; y++) {
      terrain[y] = [];
      let xOffset = movement;
      for (let x = 0; x < cols; x++) {
        let num = p5.map(p5.noise(xOffset, yOffset), 0, 1, low, high);
        xOffset += 0.2;
        terrain[y].push(num);
      }
      yOffset -= 0.2;
    }

    for (let y = 0; y < rows; y++) {
      p5.beginShape(p5.TRIANGLE_STRIP);
      for (let x = 0; x < cols; x++) {
        p5.vertex(x * box, y * box, terrain[x][y]);

        p5.vertex(x * box, (y + 1) * box, terrain[x][y + 1]);
      }
      p5.endShape();
    }
    p5.pop();
    p5.fill("white");
    p5.textFont(RobotoMonoRegular);
    p5.textSize(10);
    p5.text("FPS: " + p5.frameRate().toFixed(1), -600 / 2 + 2, -600 / 2 + 10);
  };
};

const P5 = new p5(main, "p5-canvas");
