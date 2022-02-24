import kaboom from "kaboom";


const VELOCIDADE_DE_MOVIMENTO = 400
const VELOCIDADE_DE_MOVIMENTO_DO_SPACE_INVADER = 400
const ACRESCIMO_DE_ALTURA_PARA_SPACE_INVADER = 450
const TEMPO_RESTANTE = 15

kaboom()

loadSprite("parede", "sprites/parede.png")
loadSprite("bean", "sprites/bean.png")
loadSprite("jp", "sprites/jp.png")

scene("jogo", () => {

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
            'E': () => [ sprite("parede"), area(), 'parede-esquerda' ],
            'D': () => [ sprite("parede"), area(), 'parede-direita' ],
            '*': () => [ sprite("bean"), area(), "space-invader" ]
        }
    )
    
    const jogador = add([
        scale(0.25),
        sprite("jp"),
        pos(width() / 2, height() / 1.5),
        origin("center"),
        area()
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
            go("perdeu", { placar: placar.valor })
        }
    })

    let velocidadeAtualDoSpaceInvader = VELOCIDADE_DE_MOVIMENTO_DO_SPACE_INVADER
    action("space-invader", (s) => {
        s.move(velocidadeAtualDoSpaceInvader, 0)
    })

    collides("space-invader", "parede-direita", () => {
        velocidadeAtualDoSpaceInvader = -VELOCIDADE_DE_MOVIMENTO_DO_SPACE_INVADER
        every("space-invader", (s) => {
            s.move(0, ACRESCIMO_DE_ALTURA_PARA_SPACE_INVADER)
        })
    })

    collides("space-invader", "parede-esquerda", () => {
        velocidadeAtualDoSpaceInvader = VELOCIDADE_DE_MOVIMENTO_DO_SPACE_INVADER
        every("space-invader", (s) => {
            s.move(0, ACRESCIMO_DE_ALTURA_PARA_SPACE_INVADER)
        })
    })

    jogador.onCollide("space-invader", () => {
        go("perdeu", { placar: placar.valor })
    })

});


scene("perdeu", (dados) => {
    add([
        text("Game Over"),
        pos(center()),
        origin("center")
    ])

    add([
        text("Placar: " + dados.placar),
        pos(width() / 2, (height() / 2) + 100),
        origin("center")
    ])
})

go("jogo")