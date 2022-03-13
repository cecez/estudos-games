import kaboom from "kaboom";


const VELOCIDADE_DE_MOVIMENTO = 400
const VELOCIDADE_DE_MOVIMENTO_DO_SPACE_INVADER = 400
const VELOCIDADE_DO_TIRO = 300
const ACRESCIMO_DE_ALTURA_PARA_SPACE_INVADER = 450
const TEMPO_RESTANTE = 20
const DIFERENCA_ICONE_INICIAL = 0.01

kaboom({
    background: [ 0, 0, 255, ]
})

loadSprite("parede", "sprites/parede.png")
loadSprite("bean", "sprites/bean.png")
loadSprite("jp", "sprites/jp.png")
loadSprite("miguel", "sprites/miguel.png")
loadSound("somDaDerrota", "sounds/derrota.mp3")
loadSound("somDaFase1", "sounds/fundo_fase_1.m4a")
loadSound("inimigoMorre", "sounds/inimigo_morre.m4a")
loadSound("somDoChefao", "sounds/ProjetoSomChefao.m4a")


const somDaDerrota = play("somDaDerrota", {
    volume: 0.8,
    loop: true
})

const somDaFase1 = play("somDaFase1", {
    volume: 0.5,
    loop: true
})

const somDaVitoria = play("somDoChefao", {
    volume: 0.8,
    loop: true
})


scene("começo", () => {

    add([
        text("Aventuras de qualquer coisa"),
        pos(width() / 2, 200),
        origin("center"),
        color(RED)
    ])

    add([
        text("Clique para iniciar o jogo"),
        pos(center()),
        origin("center")
    ])

    let scaleJogador = 0.1;
    let scaleDelta = 0.25;
    const jogador = add([
        sprite("miguel"),
        pos(width() / 6 - 100, height() / 1.5),
        origin("center"),
    ])

    const jogador2 = add([
        sprite("jp"),
        pos(width() - 250, height() / 1.5),
        origin("center"),
    ])

    jogador.onUpdate(() => {
        
        if (scaleJogador > 2) {
            scaleDelta = -DIFERENCA_ICONE_INICIAL;
        } 

        if (scaleJogador < 0) {
            scaleDelta = DIFERENCA_ICONE_INICIAL;
        }

        scaleJogador = scaleJogador + scaleDelta;

        jogador.scale = scaleJogador
        jogador2.scale = 2 - scaleJogador
    })

    

    somDaDerrota.pause()
    somDaFase1.pause()
    somDaVitoria.pause()

    // onClick(() => go("jogo"))

    onClick(() => go("ganhou", { placar: "teste", tempo: "teste"}))

})


scene("jogo", () => {

    somDaFase1.play()


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
    
    onKeyDown('left', () => {
        jogador.move(-VELOCIDADE_DE_MOVIMENTO, 0)
    })
    
    onKeyDown('right', () => {
        jogador.move(VELOCIDADE_DE_MOVIMENTO, 0)
    })

    onKeyDown('up', () => {
        jogador.move(0, -VELOCIDADE_DE_MOVIMENTO)
    })

    onKeyDown('down', () => {
        jogador.move(0, VELOCIDADE_DE_MOVIMENTO)
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

    placar.onUpdate(() => {
        placar.text = placar.valor
    })
    
    temporizador.onUpdate(() => {
        temporizador.tempo -= dt()
        temporizador.text = temporizador.tempo.toFixed(2)
    
        if (temporizador.tempo <= 0) {
            go("perdeu", { placar: placar.valor })
        }
    })

    let velocidadeAtualDoSpaceInvader = VELOCIDADE_DE_MOVIMENTO_DO_SPACE_INVADER
    onUpdate("space-invader", (s) => {
        s.move(velocidadeAtualDoSpaceInvader, 0)
    })

    onCollide("space-invader", "parede-direita", () => {
        velocidadeAtualDoSpaceInvader = -VELOCIDADE_DE_MOVIMENTO_DO_SPACE_INVADER
        every("space-invader", (s) => {
            s.move(0, ACRESCIMO_DE_ALTURA_PARA_SPACE_INVADER)
        })
    })

    onCollide("space-invader", "parede-esquerda", () => {
        velocidadeAtualDoSpaceInvader = VELOCIDADE_DE_MOVIMENTO_DO_SPACE_INVADER
        every("space-invader", (s) => {
            s.move(0, ACRESCIMO_DE_ALTURA_PARA_SPACE_INVADER)
        })
    })

    jogador.onCollide("space-invader", () => {
        go("perdeu", { placar: placar.valor })
    })

    function disparaTiro(posicao) {
        add([
            rect(6, 18),
            area(),
            pos(posicao),
            origin("center"),
            color(RED),
            "tiro"
        ])
    }

    onKeyPress("space", () => {
        disparaTiro(jogador.pos.add(0, -10))
    })

    onUpdate("tiro", (tiro) => {
        tiro.move(0, -VELOCIDADE_DO_TIRO)
        if (tiro.pos.y < 0) {
            tiro.destroy()
        }
    })

    onCollide("tiro", "space-invader", (tiro, inimigo) => {
        shake(80)
        play("inimigoMorre")
        inimigo.destroy()
        tiro.destroy()
        placar.valor++

        if (placar.valor == 25) {
            go("ganhou", { placar: placar.valor, tempo: temporizador.tempo.toFixed(2) })
        }
    })

});


scene("perdeu", (dados) => {
    somDaFase1.pause()
    somDaDerrota.play()

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

    onClick(() => go("começo"))
})


scene("ganhou", (dados) => {
    somDaFase1.pause()
    somDaVitoria.play()

    layer(['ganhou'], 'ganhou')
    

    add([
        text("Vitoria!"),
        pos(center()),
        origin("center")
    ])

    add([
        text("Placar: " + dados.placar),
        pos(width() / 2, (height() / 2) + 100),
        origin("center")
    ])

    add([
        text("Tempo: " + dados.tempo),
        pos(width() / 2, (height() / 2) + 200),
        origin("center")
    ])

    onClick(() => go("começo"))
})

go("começo")