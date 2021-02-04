var ship;
var asteroids = [];
var lasers = [];
var score = 0;

function setup() {
  createCanvas(windowWidth, windowHeight);
  ship = new Ship();
  for (var i = 0; i < 10; i++) {
    asteroids.push(new Asteroid());
  }
}

function draw() {
  background(0);

  for (var i = lasers.length - 1; i >= 0; i--) {
    lasers[i].render();
    lasers[i].update();
    if (lasers[i].offscreen()) {
      lasers.splice(i, 1);
    } else {
      for (var j = asteroids.length - 1; j >= 0; j--) {
        if (lasers[i].hits(asteroids[j])) {
          if (asteroids[j].r > 10) {
            var newAsteroids = asteroids[j].breakup();
            score = score + 1
            asteroids = asteroids.concat(newAsteroids);
          }
          asteroids.splice(j, 1);
          lasers.splice(i, 1);
          break;
        }
      }
    }
  }

  for (var i = 0; i < asteroids.length; i++) {
    if (ship.hits(asteroids[i])) {
      console.log("ooops!");
      background(51)
      fill(0);
      textSize(24);
      text("game over", windowWidth / 2, windowHeight / 2);
      asteroids[i].stop();
      ship.stop()
     ship.boosting(false);
     text(
        "you have scored : " + score,
        windowWidth / 2 + 200,
        windowHeight / 2 - 200
      );
    }
    asteroids[i].render();
    asteroids[i].update();
    asteroids[i].edges();
  }

  console.log(lasers.length);

  ship.render();
  ship.turn();
  ship.update();
  ship.edges();

  
  console.log(score)
 // fill(255)
  //textSize(24)
  //text("your current score : " + score , windowWidth/2 + 100 , windowHeight/2 - 200 )
}

function keyReleased() {
  ship.setRotation(0);
  ship.boosting(false);
}

function keyPressed() {
  if (key == " ") {
    lasers.push(new Laser(ship.pos, ship.heading));
  } else if (keyCode == RIGHT_ARROW) {
    ship.setRotation(0.1);
  } else if (keyCode == LEFT_ARROW) {
    ship.setRotation(-0.1);
  } else if (keyCode == UP_ARROW) {
    ship.boosting(true);
  }
}
