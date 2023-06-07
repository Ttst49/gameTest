//launch game
kaboom({
    background: [0,0,0]
})

//Sprites import
export function loadAllSprites(){
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
                },
                "stabFront":{
                    "from":12,
                    "to":13,
                    "speed":3,
                    "loop":false,
                },
            }

        }
    })
    loadSpriteAtlas("images/sprites/enemy.png",{
        "enemy": {
            "x":0,
            "y":0,
            "width":16,
            "height":12,

        }
    })
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
    loadSprite("path","images/sprites/path.png")
    loadSprite("desertPath","images/sprites/desertPath.png")
    loadSprite("corruptedPath","images/sprites/corruptedPath.png")
    loadSprite("cactusB","images/sprites/cactusB.png")
    loadSprite("cactusT","images/sprites/cactusT.png")


    for (let i = 1; i<=16;i++){
        loadSprite(`menu${i}`,`images/menu/menu_${i}.png`)
    }

    for (let i = 1; i<=132;i++){
        loadSprite(`town${i}`,`images/town/town_${i}.png`)
    }



//Sound import
    loadSound("sword",'music/AOL_Sword.wav')
    loadSound("hurt","music/AOL_Hurt.wav")
    loadSound("fire","music/AOL_Fire.wav")
    loadSound("death","music/AOL_Die.wav")
    loadSound("win","music/AOL_LearnSpell.wav")
    /**---------------------------------------------------------------------------------------------------**/
}


//Options of the game
let SPEED = 120
setGravity(2400)



//add Player and other necessary elements
export function addEverythingNeeded(){

//Player and enemies creation

    const player = add([
        sprite("link",{anim: "idle"}),  // renders as a sprite
        area(),          // has a collider
        pos(800,450),
        body(), // responds to physics and gravity
        health(3),
        z(1000),
        "player"
    ])

    const enemy = add([
        sprite("enemy"),  // renders as a sprite
        area(),          // has a collider
        pos(850,450),
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
        sceneGenerator()
    })
    player.onUpdate(()=>{
        camPos(vec2(player.pos.x,550))
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
            z(-10),
            "brick",
        ],


    "r": ()=>[
        sprite("rideau"),
        z(-10),
        "rideau",
    ],

    "p": ()=>[
        sprite("pilier"),
        z(-10),
        "pilier",
    ],

    "<": ()=>[
        sprite("tetePilier"),
        z(-10),
        "tetePilier",
    ],

    "$": ()=>[
        sprite("finRideau"),
        z(-10),
        "finRideau",
    ],

    "f": ()=>[
        sprite("fond"),
        z(-10),
        "background",
    ],

    "o": ()=>[
        sprite("flambeau"),
        z(-10),
        "flambeau",
    ],

    "+": ()=>[
        sprite("flamme"),
        z(-10),
        "flamme",
    ],

    "z": ()=>[
        sprite("zeldaBas"),
        z(-10),
        "zeldaBottom",
    ],

    "^": ()=>[
        sprite("zeldaHaut"),
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

export let tilesSetMenu = {
    "a": ()=>[
        sprite("menu1"),
        z(-10),
    ],
    "z": ()=>[
        sprite("menu2"),
        z(-10),
    ],
    "e": ()=>[
        sprite("menu3"),
        z(-10),
    ],
    "r": ()=>[
        sprite("menu4"),
        z(-10),
    ],
    "t": ()=>[
        sprite("menu5"),
        z(-10),
    ],
    "y": ()=>[
        sprite("menu6"),
        z(-10),
    ],
    "u": ()=>[
        sprite("menu7"),
        z(-10),
    ],
    "i": ()=>[
        sprite("menu8"),
        z(-10),
    ],
    "o": ()=>[
        sprite("menu9"),
        z(-10),
    ],
    "p": ()=>[
        sprite("menu10"),
        z(-10),
    ],
    "q": ()=>[
        sprite("menu11"),
        z(-10),
    ],
    "s": ()=>[
        sprite("menu12"),
        z(-10),
    ],
    "d": ()=>[
        sprite("menu13"),
        z(-10),
    ],
    "f": ()=>[
        sprite("menu14"),
        z(-10),
    ],
    "g": ()=>[
        sprite("menu15"),
        z(-10),
    ],
    "h": ()=>[
        sprite("menu16"),
        z(-10),
    ],

}


//Levels on the game

export let niveaux = [


    [
        "bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb\r",
        "bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb\r",
        "rrprr<rr<rr<rr<rr<rr<rrrrrr<rr<rr<rr<rr<rr<rr\r",
        "$$p$$p$$p$$p$$p$$p$$p$$$$$rp$$p$$p$$p$$p$$p$$\r",
        "ffpffpffpffpffpffpffpffffffpffpffpffpffpffpff\r",
        "ffpffpffpffpffpffpffpffffffpffpffpffpffpffpff\r",
        "ffpffpffpffpffpffpffp+ffff+pffpffpffpffpffpff\r",
        "ffpffpffpffpffpffpffpof^zfopffpffpffpffpffpff\r",
        "ffpffpffpffpffpffpfbbaaaaaabbfpffpffpffpffpff\r",
        "ffpffpffpffpffpffpbbaaaaaaaabbpffpffpffpffpff\r",
        "ffpffpffpffpffpfbbbaaaaaaaaaabbbfpffpffpffjf@\r",
        "ggggggggggggggggggggggggggggggggggggggggggggg\r",
        "ggggggggggggggggggggggggggggggggggggggggggggg"
    ],
    [
        "                            @\n",
        "/////////////////////////////\n",
        "/////////////////////////////\n",
        "/////////////////////////////\n",
        "/////////////////////////////\n",
    ],
    [
        "//////////////////////@"
    ]


]

//define levels informations
let levelsInfo = {
    "nextLevel" : {
        "tag":"nextLevel",
        "levelNumber": 0
    }
}

function sceneGenerator(){
    levelsInfo.nextLevel.levelNumber +=1
    go(levelsInfo.nextLevel.tag)
}


//manage scenes in the game

//define the first scene
scene("start",()=>{

    const level= addLevel([

        "azer",
        "tyui",
        "opqs",
        "dfgh"




    ],{



        tileWidth: 64,
        tileHeight: 64,
        pos: (width()/2,height()/2),

        tiles:
        tilesSetMenu

    })

    camPos(width()/3 + 55,height()/2 + 100)
    camScale(5)

    onKeyPress("space",()=>{
        go("nextLevel")
    })


})


//define the next level to appear in the game
scene(levelsInfo.nextLevel.tag,(niveau = niveaux[levelsInfo.nextLevel.levelNumber])=>{


    const level = addLevel(


        niveau

    ,{

        tileWidth: 16,
        tileHeight: 16,
        pos: (500,500),

        tiles:
        tilesSet

    })
console.log(niveaux)
    addEverythingNeeded()




})


scene("lose", () => {
    add([
        text("You Lose"),
        pos(12),
    ])

    onKeyPress(() => kaboom())
})



loadAllSprites()
go("start")