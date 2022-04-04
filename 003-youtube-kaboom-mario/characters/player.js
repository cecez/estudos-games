import constantes from "../constantes";

// functions
function playerObject() {
  let timer = 0;
  let timerInjured = 0;
  let isBig = false;
  let isInjured = false;
  return {
    biggify(time) {
      this.scale = vec2(2);
      isBig = true;
      timer = time;
    },
    isBig() {
      return isBig;
    },
    isInjured() {
      return isInjured;
    },
    injuried(time) {
      isInjured = true;
      timerInjured = time;
    },
    smallify() {
      this.scale = vec2(1);
      isBig = false;
      timer = 0;
    },
    update() {
      if (isBig) {
        timer -= dt();
        if (timer <= 0) {
          this.smallify();
        }
      }

      if (isInjured) {
        timerInjured -= dt();
        if (timerInjured <= 0) {
          isInjured = false;
        }
      }
    },
  };
}

export default function player() {
  const player = add([
    sprite("mario-standing"),
    pos(30, 0),
    area(),
    body(),
    playerObject(),
  ]);
  player.jumpForce = 500;


  // movements
  onKeyDown("left", () => {
    player.move(-constantes.characterSpeed, 0);
  });

  onKeyDown("right", () => {
    player.move(constantes.characterSpeed, 0);
  });

  onKeyDown("space", () => {
    if (player.isGrounded()) {
      player.jump();
    }
  });

  return player;
}
