import kaboom from "kaboom";


const VELOCIDADE_DE_MOVIMENTO = 400
const TEMPO_RESTANTE = 15

kaboom()

loadSprite("parede", "sprites/parede.png")
loadSprite("bean", "sprites/bean.png")
loadSprite("jp", "sprites/jp.png")

layer(['obj', 'ui'], 'obj')


addLevel(
    [
    'E*****   D',
    'E*****   D',
    'E*****   D',
    'E*****   D',
    'E*****   D',
    'E        D',
    'E        D',
    'E        D',
    'E        D',
    'E   ^    D',
    ], 
    {
        width: 200,
        height: 62,
        'E': () => [ sprite("parede"), 'parede-esquerda' ],
        'D': () => [ sprite("parede"), 'parede-direita' ],
        '*': () => [ sprite("bean") ]
    }
)

const jogador = add([
    scale(0.25),
    sprite("jp"),
    pos(width() / 2, height() / 1.5),
    origin("center")
])

keyDown('left', () => {
    jogador.move(-VELOCIDADE_DE_MOVIMENTO, 0)
})

keyDown('right', () => {
    jogador.move(VELOCIDADE_DE_MOVIMENTO, 0)
})

const placar = add([
    text("0"),
    pos(width() / 10, height() / 1.2),
    layer('ui'),
    {
        valor: 0
    }
])

const temporizador = add([
    text(0),
    color(RED),
    pos(width() / 10, height() / 1.1),
    layer('ui'),
    {
        tempo: TEMPO_RESTANTE
    }
])

temporizador.onUpdate(() => {
    temporizador.tempo -= dt()
    temporizador.text = temporizador.tempo.toFixed(2)

    if (temporizador.tempo <= 0) {
        
        go('perdeu', placar.valor)
    }
})