import kaboom from "kaboom"

// initialize context
kaboom()

// load assets
loadSprite("jp", "sprites/jp.png")
loadSprite("miguel", "sprites/miguel.png")
loadSprite("chao", "sprites/chao.png")



const miguel = add([
  sprite("miguel"),
  pos(100, 40),
  scale(0.2),
  area(),
  body()
])

const MOVIMENTO_X = 200

keyDown('right', () => {
  miguel.move(MOVIMENTO_X, 0)
})

keyDown('left', () => {
  miguel.move(-MOVIMENTO_X, 0)
})

onKeyPress("space", () => {
  if (miguel.grounded()) {
		miguel.jump();
	}
})


addLevel([
  '         ',
  '         ',
  '       C ',
  '         ',
  'xxxxxxxxx',
], {
  width: 40,
  height: 40,
  'x': () => [sprite('chao'), solid(), area()],
  'C': () => [sprite('jp'), scale(0.2), solid(), area(), body(), 'chefao']
});

// add a kaboom on mouse click
onClick(() => {
	addKaboom(mousePos())
})

// burp on "b"
onKeyPress("b", burp)

// colisão
miguel.collides('chefao', () => {
  addKaboom(miguel.pos)
  shake()
  destroy(miguel)
})