import mushroom from "../characters/mushroom";
import player from "../characters/player";
import playerCollisions from "../characters/player-collisions";
import gameLevel from "./jogo-config";

layers(["obj", "ui"], "obj");

export default function SceneJogo() {
  const level = gameLevel();
  const mainPlayer = player();
  mushroom();

  const scoreLabel = add([
    text("0"),
    pos(30, 6),
    layer("ui"),
    {
      value: "0",
    },
  ]);

  playerCollisions(mainPlayer, level, scoreLabel);

  add([text("Fase 1"), pos(70, 6)]);
}
