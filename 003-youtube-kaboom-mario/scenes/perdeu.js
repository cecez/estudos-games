export default function ScenePerdeu(dados) {
  add([text("Game Over"), pos(center()), origin("center")]);

  add([
    text("Pontos: " + dados.score),
    pos(width() / 2, height() / 2 + 100),
    origin("center"),
  ]);

  onClick(() => go("começo"));
}
