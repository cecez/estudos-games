import kaboom from "kaboom"

// initialize context
kaboom()

// load assets
loadSprite("bean", "sprites/bean.png")
loadSprite("jogador", "sprites/jogador.png")

// add a character to screen
add([
	// list of components
	sprite("bean"),
	pos(80, 40),
	area(),
])

add([
  sprite("jogador")
])

// add a kaboom on mouse click
onClick(() => {
	addKaboom(mousePos())
})

// burp on "b"
onKeyPress("b", burp)