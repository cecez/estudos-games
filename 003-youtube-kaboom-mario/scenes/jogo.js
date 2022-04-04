import goomba from "../characters/goomba";
import mushroom from "../characters/mushroom";
import player from "../characters/player";
import playerCollisions from "../characters/player-collisions";
import gameLevel from "./jogo-config";

layers(["obj", "ui"], "obj");

export default function SceneJogo() {
  const level = gameLevel();
  const mainPlayer = player();
  mushroom();
  goomba();

  const scoreLabel = add([
    text("0"),
    pos(30, 6),
    layer("ui"),
    {
      value: "0",
    },
  ]);

  mainPlayer.onUpdate(() => {
    camPos(player.pos);
    if (mainPlayer.pos.y <= -10) {
      go("perdeu", { score: scoreLabel.value });
    }
  });

  playerCollisions(mainPlayer, level, scoreLabel);

  add([text("Fase 1"), pos(70, 6)]);
}
