kaboom({
    background: [0,0,0]
})

/** "bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb",
 "bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb",
 "rrprr<rr<rr<rr<rr<rr<rrrrrr<rr<rr<rr<rr<rr<rr",
 "$$p$$p$$p$$p$$p$$p$$p$$$$$rp$$p$$p$$p$$p$$p$$",
 "ffpffpffpffpffpffpffpffffffpffpffpffpffpffpff",
 "ffpffpffpffpffpffpffpffffffpffpffpffpffpffpff",
 "ffpffpffpffpffpffpffp+ffff+pffpffpffpffpffpff",
 "ffpffpffpffpffpffpffpof^zfopffpffpffpffpffpff",
 "ffpffpffpffpffpffpfbbaaaaaabbfpffpffpffpffpff",
 "ffpffpffpffpffpffpbbaaaaaaaabbpffpffpffpffpff",
 "ffpffpffpffpffpfbbbaaaaaaaaaabbbfpffpffpffjf@",
 "ggggggggggggggggggggggggggggggggggggggggggggg",
 "ggggggggggggggggggggggggggggggggggggggggggggg"**/

// define gravity
setGravity(2400)

// load a default sprite
loadSpriteAtlas("images/sprites/link2.png",{
    "link": {
        "x":0,
        "y":0,
        "width":648,
        "height":30,
        "sliceX":16,
        "anims":{
            "idle":{
                "from":4,
                "to":4,
                "speed":3,
                "loop":true,
            },
            "run":{
                "from":5,
                "to":7,
                "speed":3,
                "loop":true,
            },
            "stabFront":{
                "from":12,
                "to":13,
                "speed":3,
                "loop":false,
            },
            "stabBack":{
                "from":11,
                "to":10,
                "speed":3,
                "loop":false,
            },


        }

    }
})


loadSpriteAtlas("images/sprites/link2.png",{
    "evillink": {
        "x":0,
        "y":0,
        "width":648,
        "height":30,
        "sliceX":16,
        "anims":{
            "idle":{
                "from":4,
                "to":4,
                "speed":3,
                "loop":true,
            },
            "run":{
                "from":5,
                "to":7,
                "speed":3,
                "loop":true,
            },
            "stabFront":{
                "from":12,
                "to":13,
                "speed":3,
                "loop":false,
            },
            "stabBack":{
                "from":11,
                "to":10,
                "speed":3,
                "loop":false,
            },


        }

    }
})


loadSound("sword",'music/AOL_Sword.wav')
loadSprite("brick","images/sprites/brick.png")
loadSprite("rideau","images/sprites/rideau.png")
loadSprite("finRideau","images/sprites/finRideau.png")
loadSprite("sol","images/sprites/ground.png")
loadSprite("zeldaBas","images/sprites/zeldaBottom.png")
loadSprite("zeldaHaut","images/sprites/zeldaHead.png")
loadSprite("flambeau","images/sprites/flambeau.png")
loadSprite("flamme","images/sprites/flamme.png")
loadSprite("fond","images/sprites/fond.png")
loadSprite("pilier","images/sprites/pilier.png")
loadSprite("tetePilier","images/sprites/tetePilier.png")
loadSprite("carpette","images/sprites/carpette.png")


/**---------------------------------------------------------------------------------------------------**/



const SPEED = 120

;["left", "right"].forEach((key) => {
    onKeyRelease(key, () => {
        if (player.isGrounded() && !isKeyDown("left") && !isKeyDown("right")) {
            player.play("idle")
        }
    })
})


 const levels = addLevel([

 "ffpffpffpffpffp                             @",
 "ggggggggggggggggggggggggggggggggggggggggggggg",
 "ggggggggggggggggggggggggggggggggggggggggggggg"



 ],{



    tileWidth: 16,
    tileHeight: 16,
    pos: (width()/2,height()/2),

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
            sprite("evillink",{anim:"idle"}),
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
    }
})


const player = add([
    sprite("link",{anim: "idle"}),  // renders as a sprite
    area(),          // has a collider
    pos(2200,1500),
    body(), // responds to physics and gravity
    anchor("bot"),
    health(3),
    z(1000),
    "player"
])

const enemy = add([
    sprite("evillink",{anim: "idle"}),  // renders as a sprite
    area(),          // has a collider
    pos(2200,1500),
    body(), // responds to physics and gravity
    anchor("bot"),
    health(3),
    z(1000),
    "enemy"
])



player.onCollide("enemy",(enemy)=>{
    player.hurt(1)
})

player.on("hurt",()=>{
    play("sword")
})

player.on("death",()=>(
    destroy(player)
))


player.onUpdate(()=>{
    camPos(player.worldPos())
    camScale(5)
})


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
})

onKeyDown("right", () => {
    player.move(SPEED, 0)
    player.flipX = false
    if (player.isGrounded() && player.curAnim() !== "run") {
        player.play("run")
    }
})
