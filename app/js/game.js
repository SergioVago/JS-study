"use strict";

// Creating canvas
const canvas = document.createElement('canvas');
const ctx = canvas.getContext('2d');
canvas.width = 512;
canvas.height = 480;
document.body.appendChild(canvas); // Background image

let bgReady = false;
const bgImage = new Image();

bgImage.onload = function () {
  bgReady = true;
};

bgImage.src = 'images/background.png'; // Hero image

let heroReady = false;
const heroImage = new Image();

heroImage.onload = function () {
  heroReady = true;
};

heroImage.src = 'images/hero.png'; // Monster image

let monsterReady = false;
const monsterImage = new Image();

monsterImage.onload = function () {
  monsterReady = true;
};

monsterImage.src = 'images/monster.png'; // Game objects

const hero = {
  speed: 256 // Moving in pixels per second

};
const monster = {};
let monsterCaught = 0; // Keyboard control

const keysDown = {};
window.addEventListener('keydown', function (e) {
  keysDown[e.keyCode] = true;
}, false);
window.addEventListener('keyup', function (e) {
  delete keysDown[e.keyCode];
}, false); // Reset the game when the player got the monster

const reset = function reset() {
  hero.x = canvas.width / 2;
  hero.y = canvas.height / 2; // Set a random position to the monster

  monster.x = 32 + Math.random() * (canvas.width - 64);
  monster.y = 32 + Math.random() * (canvas.height - 64);
}; // Update the objects game


const update = function update(modifier) {
  if (38 in keysDown) {
    // Pressing up arrow
    hero.y -= hero.speed * modifier;
  }

  if (40 in keysDown) {
    // Pressing down arrow
    hero.y += hero.speed * modifier;
  }

  if (37 in keysDown) {
    // Pressing left arrow
    hero.x -= hero.speed * modifier;
  }

  if (39 in keysDown) {
    // Pressing right arrow
    hero.x += hero.speed * modifier;
  } // The characters touched


  if (hero.x <= monster.x + 32 && hero.y <= monster.y + 32 && monster.x <= hero.x + 32 && monster.y <= hero.y + 32) {
    ++monsterCaught;
    reset();
  }
}; // Render all


const render = function render() {
  if (bgReady) {
    ctx.drawImage(bgImage, 0, 0);
  }

  if (heroReady) {
    ctx.drawImage(heroImage, hero.x, hero.y);
  }

  if (monsterReady) {
    ctx.drawImage(monsterImage, monster.x, monster.y);
  }

  ctx.fillStyle = 'rgb(250, 250, 250)';
  ctx.font = '24px Helvetica';
  ctx.textAlign = 'left';
  ctx.textBaseline = 'top';
  ctx.fillText('Monsters caught: ' + monsterCaught, 32, 32);
}; // Controls the game loop


const main = function main() {
  const now = Date.now();
  const delta = now - then;
  update(delta / 1000);
  render();
  then = now; // Do this as soon as possible

  requestAnimationFrame(main);
};

const w = window;
const requestAnimationFrame = w.requestAnimationFrame || w.webkitRequestAnimationFrame || w.msRequestAnimationFrame || w.mozRequestAnimationFrame;
let then = Date.now();
reset();
main();
//# sourceMappingURL=game.js.map