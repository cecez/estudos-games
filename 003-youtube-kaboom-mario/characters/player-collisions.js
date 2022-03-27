export default function playerCollisions(mainPlayer, gameLevel, scoreLabel) {
  mainPlayer.onHeadbutt((obj) => {
    if (obj.is("coin-surprise")) {
      gameLevel.spawn("$", obj.gridPos.sub(0, 1));
      destroy(obj);
      gameLevel.spawn("{", obj.gridPos.sub(0, 0));
    }

    if (obj.is("mushroom-surprise")) {
      gameLevel.spawn("#", obj.gridPos.sub(0, 1));
      destroy(obj);
      gameLevel.spawn("{", obj.gridPos.sub(0, 0));
    }
  });

  mainPlayer.collides("mushroom", (mushroom) => {
    mainPlayer.biggify(5);
    destroy(mushroom);
  });

  mainPlayer.collides("coin", (coin) => {
    scoreLabel.value++;
    scoreLabel.text = scoreLabel.value;
    destroy(coin);
  });
}
