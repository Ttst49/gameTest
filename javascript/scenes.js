
//add Player and other necessary elements
export function addEverythingNeeded(){

//Player and enemies creation

    const player = add([
        sprite("link",{anim: "idle"}),  // renders as a sprite
        area(),          // has a collider
        pos(500,450),
        body(), // responds to physics and gravity
        health(3),
        z(1000),
        "player"
    ])

    const enemy = add([
        sprite("enemy"),  // renders as a sprite
        area(),          // has a collider
        pos(600,450),
        body(), // responds to physics and gravity
        health(3),
        patrol(),
        z(1000),
        "enemy"
    ])

    function patrol(speed = 60, dir = 1) {
        return {
            id: "patrol",
            require: [ "pos", "area" ],
            add() {
                this.on("collide", (obj, col) => {
                    if (col.isLeft() || col.isRight()) {
                        dir = -dir
                    }
                })
            },
            update() {
                this.move(speed * dir, 0)
            },
        }
    }


    /**
     const player = levels.get("player")[0]
     const enemy = levels.get("enemy")[0]
     **/

//collision and touch actions

    player.onCollide("enemy",(enemy)=>{
        if (player.curAnim() === "stabFront"){
            enemy.hurt(5)
        }else{
            player.hurt(1)
        }


    })
    player.on("hurt",()=>{
        play("hurt")
    })
    enemy.on("hurt",()=>{
        play("fire")
    })
    player.on("death",()=>(
        destroy(player), play("death")
    ))
    enemy.on("death",()=>{
        destroy(enemy)
    })
    player.onCollide("portal",()=>{
        go("nextLevel")
    })
    player.onUpdate(()=>{
        camPos(vec2(player.pos.x,500))
        camScale(3)
    })


//Key pressed actions

    onKeyPress("space", () => {
        player.play("stabFront")
        play("sword")


        player.onAnimEnd((anim) =>{
            if (anim === "stabFront"){
                player.play("idle")
            }
        })

    })
    onKeyDown("left", () => {
        player.move(-SPEED, 0)
        player.flipX = true
        if (player.isGrounded() && player.curAnim() !== "run") {
            player.play("run")

        }
        player.onAnimEnd((anim) =>{
            if (anim === "stabFront"){
                player.play("idle")
            }
        })

    })
    onKeyDown("right", () => {
        player.move(SPEED, 0)
        player.flipX = false
        if (player.isGrounded() && player.curAnim() !== "run") {
            player.play("run")
        }
        player.onAnimEnd((anim) =>{
            if (anim === "stabFront"){
                player.play("idle")
            }
        })
    })
    ;["left", "right"].forEach((key) => {
        onKeyRelease(key, () => {
            if (player.isGrounded() && !isKeyDown("left") && !isKeyDown("right")) {
                player.play("idle")
            }
        })
    })

}

//add tiles definition for levels

export let tilesSet = {
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



//manage scenes in the game

//define the first scene
scene("start",(niveau = niveaux)=>{
    const level= addLevel([


        `${niveau[2]}`



    ],{



        tileWidth: 16,
        tileHeight: 16,
        pos: (500,500),

        tiles:
        tilesSet

    })

    addEverythingNeeded()

})

//define the next level to appear in the game
scene("nextLevel",(niveau = niveaux)=>{
    let level = addLevel([


        `${niveau[0]}`



    ],{

        tileWidth: 16,
        tileHeight: 16,
        pos: (500,500),

        tiles:
        tilesSet

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