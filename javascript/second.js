







//manage scenes in the game


scene("start",(level)=>{
    let levels = addLevel([


        level[0]



    ],{



        tileWidth: 16,
        tileHeight: 16,
        pos: (500,500),

        tiles:{
            "b": ()=>[
                sprite("brick"),
                area(),
                body({isStatic: true}),
                anchor("bot"),
                z(-10),
                "brick",
            ],

            /**
             "l": ()=>[
             sprite("link",{anim:"idle"}),
             area(),
             body({isStatic: true}),
             anchor("bot"),
             health(3),
             z(1000),
             "player",
             ],

             "j": ()=>[
             sprite("enemy"),
             area(),
             body({isStatic: true}),
             anchor("bot"),
             health(3),
             z(1000),
             "enemy",
             ],
             **/


            "r": ()=>[
                sprite("rideau"),
                area(),
                body({isStatic: true}),
                anchor("bot"),
                z(-10),
                "rideau",
            ],
            "p": ()=>[
                sprite("pilier"),
                area(),
                body({isStatic: true}),
                anchor("bot"),
                z(-10),
                "pilier",
            ],
            "<": ()=>[
                sprite("tetePilier"),
                area(),
                body({isStatic: true}),
                anchor("bot"),
                z(-10),
                "tetePilier",
            ],
            "$": ()=>[
                sprite("finRideau"),
                area(),
                body({isStatic: true}),
                anchor("bot"),
                z(-10),
                "finRideau",
            ],
            "f": ()=>[
                sprite("fond"),
                area(),
                body({isStatic: true}),
                anchor("bot"),
                z(-10),
                "background",
            ],
            "o": ()=>[
                sprite("flambeau"),
                area(),
                body({isStatic: true}),
                anchor("bot"),
                z(-10),
                "flambeau",
            ],
            "+": ()=>[
                sprite("flamme"),
                area(),
                body({isStatic: true}),
                anchor("bot"),
                z(-10),
                "flamme",
            ],
            "z": ()=>[
                sprite("zeldaBas"),
                area(),
                body({isStatic: true}),
                anchor("bot"),
                z(-10),
                "zeldaBottom",
            ],
            "^": ()=>[
                sprite("zeldaHaut"),
                area(),
                body({isStatic: true}),
                anchor("bot"),
                z(-10),
                "zeldaHead",
            ],
            "g": ()=>[
                sprite("sol"),
                area(),
                body({isStatic: true}),
                anchor("bot"),
                "platform",
            ],
            "a": ()=>[
                sprite("carpette"),
                area(),
                body({isStatic: true}),
                anchor("bot"),
                z(-10),
                "carpette",
            ],
            "@": ()=>[
                sprite("link"),
                area(),
                body({isStatic: true}),
                anchor("bot"),
                "portal",
            ],
            "/": ()=>[
                sprite("path"),
                area(),
                body({isStatic: true}),
                anchor("bot"),

            ],
        }
    })

    addEverythingNeeded()

})



//define the next level to appear in the game
scene("nextLevel",()=>{
    let levels = addLevel([


        `${niveaux[1]}`



    ],{



        tileWidth: 16,
        tileHeight: 16,
        pos: (500,500),

        tiles:{
            "/": ()=>[
                sprite("corruptedPath"),
                area(),
                body({isStatic: true}),
                anchor("bot"),

            ],
            "@": ()=>[
                sprite("link"),
                area(),
                body({isStatic: true}),
                anchor("bot"),
                "portal",
            ],
        }
    })

    addEverythingNeeded()

})


scene("lose", () => {
    add([
        text("You Lose"),
        pos(12),
    ])

    onKeyPress(() => kaboom())
})

