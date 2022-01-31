import kaboom from "kaboom"

// initialize context
kaboom()

// load assets
loadSprite("jp", "sprites/jp.png")
loadSprite("miguel", "sprites/miguel.png")
loadSprite("chao", "sprites/chao.png")


// add a character to screen
const jp = add([
	// list of components
	sprite("jp"),
  scale(0.2),
	pos(280, 40),
	area(),
  body()
])

const MOVIMENTO_X = 200

keyDown('right', () => {
  jp.move(MOVIMENTO_X, 0)
})

keyDown('left', () => {
  jp.move(-MOVIMENTO_X, 0)
})

add([
  sprite("miguel"),
  pos(100, 40),
  scale(0.2),
  area(),
  body()
])

addLevel([
  '         ',
  '         ',
  '         ',
  '         ',
  'xxxxxxxxx',
], {
  width: 40,
  height: 40,
  'x': () => [sprite('chao'), solid(), area()]
})

// add a kaboom on mouse click
onClick(() => {
	addKaboom(mousePos())
})

// burp on "b"
onKeyPress("b", burp)