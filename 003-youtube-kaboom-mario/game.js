import kaboom from "kaboom";
import constantes from "./constantes";

export const k = kaboom({
  scale: 2,
  clearColor: [0, 0, 0, 1],
  background: constantes.corDeFundo,
});

export default k;

// scene("jogo", () => {

//     addLevel(
//         [
//         'E*****   D',
//         'E*****   D',
//         'E*****   D',
//         'E*****   D',
//         'E*****   D',
//         'E        D',
//         'E        D',
//         'E        D',
//         'E        D',
//         'E   ^    D',
//         ],
//         {
//             width: 200,
//             height: 62,
//             'E': () => [ sprite("parede"), area(), 'parede-esquerda' ],
//             'D': () => [ sprite("parede"), area(), 'parede-direita' ],
//             '*': () => [ sprite("bean"), area(), "space-invader" ]
//         }
//     )

//     const jogador = add([
//         scale(0.25),
//         sprite("jp"),
//         pos(width() / 2, height() / 1.5),
//         origin("center"),
//         area()
//     ])

//     onKeyDown('left', () => {
//         jogador.move(-VELOCIDADE_DE_MOVIMENTO, 0)
//     })

//     onKeyDown('right', () => {
//         jogador.move(VELOCIDADE_DE_MOVIMENTO, 0)
//     })

//     onKeyDown('up', () => {
//         jogador.move(0, -VELOCIDADE_DE_MOVIMENTO)
//     })

//     onKeyDown('down', () => {
//         jogador.move(0, VELOCIDADE_DE_MOVIMENTO)
//     })

//     const placar = add([
//         text("0"),
//         pos(width() / 10, height() / 1.2),
//         layer('ui'),
//         {
//             valor: 0
//         }
//     ])

//     const temporizador = add([
//         text(0),
//         color(RED),
//         pos(width() / 10, height() / 1.1),
//         layer('ui'),
//         {
//             tempo: TEMPO_RESTANTE
//         }
//     ])

//     placar.onUpdate(() => {
//         placar.text = placar.valor
//     })

//     temporizador.onUpdate(() => {
//         temporizador.tempo -= dt()
//         temporizador.text = temporizador.tempo.toFixed(2)

//         if (temporizador.tempo <= 0) {
//             go("perdeu", { placar: placar.valor })
//         }
//     })

//     let velocidadeAtualDoSpaceInvader = VELOCIDADE_DE_MOVIMENTO_DO_SPACE_INVADER
//     onUpdate("space-invader", (s) => {
//         s.move(velocidadeAtualDoSpaceInvader, 0)
//     })

//     onCollide("space-invader", "parede-direita", () => {
//         velocidadeAtualDoSpaceInvader = -VELOCIDADE_DE_MOVIMENTO_DO_SPACE_INVADER
//         every("space-invader", (s) => {
//             s.move(0, ACRESCIMO_DE_ALTURA_PARA_SPACE_INVADER)
//         })
//     })

//     onCollide("space-invader", "parede-esquerda", () => {
//         velocidadeAtualDoSpaceInvader = VELOCIDADE_DE_MOVIMENTO_DO_SPACE_INVADER
//         every("space-invader", (s) => {
//             s.move(0, ACRESCIMO_DE_ALTURA_PARA_SPACE_INVADER)
//         })
//     })

//     jogador.onCollide("space-invader", () => {
//         go("perdeu", { placar: placar.valor })
//     })

//     function disparaTiro(posicao) {
//         add([
//             rect(6, 18),
//             area(),
//             pos(posicao),
//             origin("center"),
//             color(RED),
//             "tiro"
//         ])
//     }

//     onKeyPress("space", () => {
//         disparaTiro(jogador.pos.add(0, -10))
//     })

//     onUpdate("tiro", (tiro) => {
//         tiro.move(0, -VELOCIDADE_DO_TIRO)
//         if (tiro.pos.y < 0) {
//             tiro.destroy()
//         }
//     })

//     onCollide("tiro", "space-invader", (tiro, inimigo) => {
//         shake(80)
//         play("inimigoMorre")
//         inimigo.destroy()
//         tiro.destroy()
//         placar.valor++

//         if (placar.valor == 25) {
//             go("ganhou", { placar: placar.valor, tempo: temporizador.tempo.toFixed(2) })
//         }
//     })

// });

// scene("perdeu", (dados) => {
//     somDaFase1.pause()
//     somDaDerrota.play()

//     add([
//         text("Game Over"),
//         pos(center()),
//         origin("center")
//     ])

//     add([
//         text("Placar: " + dados.placar),
//         pos(width() / 2, (height() / 2) + 100),
//         origin("center")
//     ])

//     onClick(() => go("começo"))
// })

// scene("ganhou", (dados) => {
//     somDaFase1.pause()
//     somDaVitoria.play()

//     layer(['ganhou'], 'ganhou')

//     add([
//         text("Vitoria!"),
//         pos(center()),
//         origin("center")
//     ])

//     add([
//         text("Placar: " + dados.placar),
//         pos(width() / 2, (height() / 2) + 100),
//         origin("center")
//     ])

//     add([
//         text("Tempo: " + dados.tempo),
//         pos(width() / 2, (height() / 2) + 200),
//         origin("center")
//     ])

//     onClick(() => go("começo"))
// })
