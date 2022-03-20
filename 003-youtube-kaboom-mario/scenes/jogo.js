import player from "../characters/player";

layers(["obj", "ui"], "obj");

const map = [
  "                              ",
  "                              ",
  "                              ",
  "                              ",
  "                              ",
  "                              ",
  "                              ",
  "   %  =*=%=                   ",
  "                          -+  ",
  "             ^  ^    x    ()  ",
  "xxxxxxxxxxxxxxxxxxxxxx  xxxxxx",
];

const levelConfiguration = {
  width: 20,
  height: 20,
  $: () => [sprite("coin"), solid(), area()],
  "=": () => [sprite("block"), solid(), area()],
  "^": () => [sprite("goomba"), solid(), area(), body()],
  x: () => [sprite("brick"), solid(), area()],
  "(": () => [sprite("pipe-left"), scale(0.5), solid(), area()],
  ")": () => [sprite("pipe-right"), scale(0.5), solid(), area()],
  "-": () => [sprite("pipe-top-left"), scale(0.5), solid(), area()],
  "+": () => [sprite("pipe-top-right"), scale(0.5), solid(), area()],
  "%": () => [sprite("question"), "coin-surprise", solid(), area()],
  "*": () => [sprite("question"), "mushroom-surprise", solid(), area()],
};

export default function SceneJogo() {
  const gameLevel = addLevel(map, levelConfiguration);

  // character
  const mainPlayer = player();

  mainPlayer.onHeadbutt((obj) => {
    if (obj.is("coin-surprise")) {
      gameLevel.spawn("$", obj.gridPos.sub(0, 0));
    }
  });

  // ui layer
  const scoreLabel = add([
    text("0"),
    pos(30, 6),
    layer("ui"),
    {
      value: "0",
    },
  ]);

  add([text("Fase 1"), pos(70, 6)]);
}
