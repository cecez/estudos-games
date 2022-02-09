import kaboom from "kaboom";

kaboom()

loadSprite("parede", "sprites/parede.png")
loadSprite("bean", "sprites/bean.png")

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
        width: 30,
        height: 22,
        'E': () => [ sprite("parede"), 'parede-esquerda' ],
        'D': () => [ sprite("parede"), 'parede-direita' ],
        '*': () => [ sprite("bean") ]
    }
)