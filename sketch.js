let img;

let cfg = {
  imgWidth: 12,
  imgHeight: 12,
  scaleUp: 100,
  dotSize: 15,
  maxDotSize: 100,
};

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

async function setup() {
  createCanvas(windowWidth, windowHeight);
  // frameRate(5);
  img = await loadImage("assets/d-white.png");
  console.log("setup", { width, height });
  // cfg.dotSize = windowWidth / 1000;
  cfg.dotSize = 100;
  cfg.scaleUp = windowWidth / cfg.imgWidth;
  console.log("setup", { cfg });
}

let count = 0;

function draw() {
  background(220);

  const baseDX = windowWidth * windowHeight;

  for (let x = 0; x < cfg.imgWidth; x++) {
    for (let y = 0; y < cfg.imgHeight; y++) {
      // screen coords
      const sx = x * cfg.scaleUp;
      const sy = y * cfg.scaleUp;

      const mouseDist = dist(mouseX, mouseY, sx, sy);
      const imgSize = (500 - mouseDist) / 2;
      // const mouseRatio = mouseDist / baseDX;
      // const imgSize = mouseRatio * cfg.dotSize;

      if (count == 200) {
        console.log({ mouseDist, imgSize, x, y });
      }

      // console.log({ dcalc });
      // let imgSize = map(mouseX, 0, width, 0, cfg.maxDotSize) * dist;

      stroke(0, 0, 0, 5);
      count++;
      const pixel = img.get(x, y);
      const brt = brightness(pixel);

      push();
      translate(sx, sy);

      if (brt > 50) {
        fill(128, 0, 0, 50);
      } else {
        fill(0, 128, 0, 50);
      }
      ellipse(0, 0, imgSize, imgSize);
      pop();
    }
  }

  // rect(100, 100, 200, 200);
  // fill(255, 0, 0);
  // rect(100, 100, 200, 200);

  // image(img, 50, 50, 12, 12);
}
