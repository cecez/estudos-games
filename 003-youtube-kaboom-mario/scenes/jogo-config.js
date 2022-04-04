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
  "=": () => [sprite("block"), solid(), area()],
  x: () => [sprite("brick"), solid(), area()],
  $: () => [sprite("coin"), "coin", solid(), area()],
  "^": () => [sprite("goomba"), "dangerous", solid(), area(), body()],
  "#": () => [sprite("mushroom"), "mushroom", solid(), area(), body()],
  "(": () => [sprite("pipe-left"), scale(0.5), solid(), area()],
  ")": () => [sprite("pipe-right"), scale(0.5), solid(), area()],
  "-": () => [sprite("pipe-top-left"), scale(0.5), solid(), area()],
  "+": () => [sprite("pipe-top-right"), scale(0.5), solid(), area()],
  "%": () => [sprite("question"), "coin-surprise", solid(), area()],
  "*": () => [sprite("question"), "mushroom-surprise", solid(), area()],
  "{": () => [sprite("unboxed"), solid(), area()],
};

export default function gameLevel() {
  return addLevel(map, levelConfiguration);
}
