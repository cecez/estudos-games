import constantes from "../constantes";

export default function player() {
  const player = add([sprite("mario-standing"), pos(30, 0), area(), body()]);
  player.jumpForce = 500;

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
