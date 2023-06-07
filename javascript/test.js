export let tilesSet = {

    "b": () => [
        sprite("brick"),
        z(-10),
        "brick",
    ],


    "r": () => [
        sprite("rideau"),
        z(-10),
        "rideau",
    ],

    "p": () => [
        sprite("pilier"),
        z(-10),
        "pilier",
    ],

    "<": () => [
        sprite("tetePilier"),
        z(-10),
        "tetePilier",
    ],

    "$": () => [
        sprite("finRideau"),
        z(-10),
        "finRideau",
    ],

    "f": () => [
        sprite("fond"),
        z(-10),
        "background",
    ],

    "o": () => [
        sprite("flambeau"),
        z(-10),
        "flambeau",
    ],

    "+": () => [
        sprite("flamme"),
        z(-10),
        "flamme",
    ],

    "z": () => [
        sprite("zeldaBas"),
        z(-10),
        "zeldaBottom",
    ],

    "^": () => [
        sprite("zeldaHaut"),
        z(-10),
        "zeldaHead",
    ],

    "g": () => [
        sprite("sol"),
        area(),
        body({isStatic: true}),
        anchor("bot"),
        "platform",
    ],

    "a": () => [
        sprite("carpette"),
        z(-10),
        "carpette",
    ],

    "@": () => [
        sprite("link"),
        area(),
        body({isStatic: true}),
        anchor("bot"),
        "portal",
    ],

    "/": () => [
        sprite("path"),
        area(),
        body({isStatic: true}),
        anchor("bot"),

    ],


    "1": () => [
        sprite("wood1"),
        anchor("bot"),
    ],
    "2": () => [
        sprite("wood2"),
        anchor("bot"),
    ],
    "3": () => [
        sprite("wood3"),
        anchor("bot"),
    ],
    "4": () => [
        sprite("wood4"),
        anchor("bot"),
    ],
    "5": () => [
        sprite("wood5"),
        anchor("bot"),
        area(),
        body()
    ],

}