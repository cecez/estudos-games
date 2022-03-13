import k from "../game";

export default function SceneComeco() {
  k.add([
    text("Aventuras de qualquer coisa 2"),
    pos(width() / 2, 200),
    origin("center"),
    color(RED),
  ]);

  k.add([text("Clique para iniciar o jogo"), pos(center()), origin("center")]);

  onClick(() => go("jogo"));
}
