kaboom({
    background: [0,0,0,0]
})


//Sprites import
  function loadAllSprites(){
    loadSpriteAtlas("images/sprites/link3.png",{
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
                "crouch":{
                    "from":14,
                    "to":14,
                    "speed":3,
                    "loop":false
                },
                "crouchStab":{
                    "from":14,
                    "to":15,
                    "speed":3,
                    "loop":false
                }
            }

        }
    })
    loadSpriteAtlas("images/sprites/enemy.png",{
        "enemy": {
            "x":0,
            "y":0,
            "sliceX":2,
            "width":32,
            "height":12,
            "anims":{
                "run":{
                    "from":0,
                    "to":1,
                    "loop":true,
                    "speed":3
                }
            }

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
    loadSprite("heart","images/sprites/heart.png")
    loadSprite("emptyHeart","images/sprites/emptyHeart.png")
    loadSprite("rupee","images/sprites/rupee.png")
    loadSprite("cloudLeft","images/town/cloudLeft.png")
    loadSprite("cloudRight","images/town/cloudRight.png")
    loadSprite("sky","images/town/sky.png")


      for (let i = 1; i<=16;i++){
          loadSprite(`menu${i}`,`images/menu/menu_${i}.png`)
      }

      for (let i = 1;i<=5;i++){
          loadSprite(`wood${i}`,`images/sprites/wood/wood${i}.png`)
      }

      for (let i =1; i<=19;i++){
          loadSprite(`town${i}`,`images/town/town${i}.png`)
      }


//Sound import
    loadSound("sword",'music/AOL_Sword.wav')
    loadSound("hurt","music/AOL_Hurt.wav")
    loadSound("fire","music/AOL_Fire.wav")
    loadSound("death","music/AOL_Die.wav")
    loadSound("win","music/AOL_LearnSpell.wav")
    loadSound("rupee","music/AOL_Pause.wav")
    /**---------------------------------------------------------------------------------------------------**/
}


//Options of the game
let SPEED = 120
setGravity(2400)




//add Player and other necessary elements
  function addEverythingNeeded(numberOfEnnemies = 0){

//Player and enemies creation

    const player = add([
        sprite("link",{anim: "idle"}),  // renders as a sprite
        area(),          // has a collider
        pos(700,600),
        body(), // responds to physics and gravity
        health(10),
        z(1000),
        "player"
    ])


    let defaultHealth = 10


    function refreshLife(){
        let j = 0
        for (let i=1;i<=defaultHealth;i++){
            const healthbar = add([
                sprite("heart"),
                pos(j, 0),
                fixed(),
                scale(2),

            ])
            j +=32
        }
    }

    function takeOneHeartAway(){
        const heartDeleted = add([
            sprite("emptyHeart"),
            pos(32*defaultHealth,0),
            fixed(),
            scale(2)
        ])
    }

    refreshLife()

    for (let i=0;i<=numberOfEnnemies;i++){
        const enemy = add([
            sprite("enemy",{anim:"run"}),  // renders as a sprite
            area(),          // has a collider
            pos(Math.random()*(1000-850 +1)+850,600),
            body(), // responds to physics and gravity
            health(3),
            patrol(),
            z(1000),
            "enemy"
        ])
        player.onCollide("enemy",(enemy)=>{
            if (player.curAnim() === "stabFront"){
                enemy.hurt(5)
            }else{
                player.hurt(1)
            }


        })
        enemy.on("hurt",()=>{
            play("fire")
        })
        enemy.on("death",()=>{
            destroy(enemy)
            let number = Math.random() * (10 - 0 + 1)
            console.log(Math.round(number))
            if (Math.round(number) % 2 === 0){
                const rupee = add([
                    sprite("rupee"),
                    pos(enemy.pos.x,enemy.pos.y-5),
                    scale(0.5)
                ])
            }


        })
    }

    function patrol(speed = 60, dir = -1) {
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


    player.on("hurt",()=>{
        play("hurt")
        defaultHealth--
        takeOneHeartAway()
    })
    player.on("death",()=>(
        destroy(player), play("death"), go("lose")
    ))
    player.onCollide("portalNext",()=>{
        sceneGenerator()
    })
    player.onCollide("portalPrevious",()=>{
        sceneGenerator(false)
    })
    player.onUpdate(()=>{
        camPos(vec2(player.pos.x,550))
        camScale(3)
    })
    player.onCollide("rupee",(r)=>{
        destroy(r), play('rupee')
    })



//Key pressed actions

    onKeyPress("space", () => {
        if (player.curAnim() == "idle"){
            player.play("stabFront")
        }else if (player.curAnim()=="crouch"){
            player.play("crouchStab")
        }
        play("sword")


        player.onAnimEnd((anim) =>{
            if (anim === "stabFront" || anim === "crouchStab"){
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

      onKeyDown("down", () => {
          player.move(0, 0)
          player.flipX = false
          if (player.isGrounded() && player.curAnim() !== "crouch") {
              player.play("crouch")
          }
          player.onAnimEnd((anim) =>{
              if (anim === "crouchStab"){
                  player.play("idle")
              }
          })
      })


    ;["left", "right","down"].forEach((key) => {
        onKeyRelease(key, () => {
            if (player.isGrounded() && !isKeyDown("left") && !isKeyDown("right") && !isKeyDown("down")) {
                player.play("idle")
            }
        })
    })

}

//add tiles definition for levels

  let tilesSet = {

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
        sprite("fond"),
        area(),
        body({isStatic: true}),
        anchor("bot"),
        scale(0.1),
        "portalNext",
    ],

    "#": ()=>[
        sprite("fond"),
        area(),
        body({isStatic: true}),
        anchor("bot"),
        scale(0.1),
        "portalPrevious",
    ],



    "/": ()=>[
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
        body({isStatic: true}),
    ],


      "A": ()=>[
          sprite("town1"),
          z(-10),
      ],
      "Z": ()=>[
          sprite("town2"),
          z(-10),
      ],
      "E": ()=>[
          sprite("town3"),
          z(-10),
      ],
      "R": ()=>[
          sprite("town4"),
          z(-10),
      ],
      "T": ()=>[
          sprite("town5"),
          z(-10),
      ],
      "Y": ()=>[
          sprite("town6"),
          z(-10),
      ],
      "U": ()=>[
          sprite("town7"),
          z(-10),
      ],
      "I": ()=>[
          sprite("town8"),
          z(-10),
      ],
      "O": ()=>[
          sprite("town9"),
          z(-10),
      ],
      "P": ()=>[
          sprite("town10"),
          z(-10),
      ],
      "Q": ()=>[
          sprite("town11"),
          z(-10),
      ],
      "S": ()=>[
          sprite("town12"),
          z(-10),
      ],
      "D": ()=>[
          sprite("town13"),
          anchor("bot"),
          area(),
          body({isStatic: true}),
      ],
      "J": ()=>[
          sprite("town14"),
          z(-10),
      ],
      "K": ()=>[
          sprite("town15"),
          z(-10),
      ],
      "L": ()=>[
          sprite("town16"),
          z(-10),
      ],
      "M": ()=>[
          sprite("town17"),
          z(-10),
      ],
      "W": ()=>[
          sprite("town18"),
          z(-10),
      ],
      "X": ()=>[
          sprite("town19"),
          z(-10),
      ],
      "F": ()=>[
          sprite("cloudRight"),
          z(-10),
      ],
      "G": ()=>[
          sprite("cloudLeft"),
          z(-10),
      ],
      "H": ()=>[
          sprite("sky"),
          z(-10),
      ],
      "=": ()=>[
          sprite("fond"),
          z(-10),
          "door"
      ],







}

  let tilesSetMenu = {
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

  let niveaux = [


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
        "@fpffpffpffpffpfbbbaaaaaaaaaabbbfpffpffpffjf@\r",
        "ggggggggggggggggggggggggggggggggggggggggggggg\r",
        "ggggggggggggggggggggggggggggggggggggggggggggg\r",
        "ggggggggggggggggggggggggggggggggggggggggggggg"
    ],
    [
        "        111111111111111111111111111111111111111111111111",
        "        111111111111111111111111111111111111111111111111",
        "        111111111111111111111111111111111111111111111111",
        "        331111333333331111113311113333111111311333333111",
        "        ff33332fff2f2f3311332f33332fff311333233f2f2ff333",
        "        ffffff2fff2f2fff33ff2fffff2ffff33fff2fff2f2fffff",
        "        ffffff2fff2f2fffffff2fffff2fffffffff2fff2f2fffff",
        "        ffffff2fff2f2fffffff2fffff2fffffffff2fff2f2fffff",
        "        ffffff2fff2f2fffffff2fffff2fffffffff2fff2f2fffff",
        "        ffffff2fff2f2fffffff2fffff2fffffffff2fff2f2fffff",
        "        #4444444444444444444444444444444444444444444444@",
        "        555555555555555555555555555555555555555555555555",
        "        555555555555555555555555555555555555555555555555"

    ],
      [
          "        HHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHGFHHHHHHHHHHHHHHHHHH",
          "        HHHHHHHHHHHHHHHGFHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHH",
          "        HHGFHHHHHHHHHHRRRRRRRHHHHHGFHHHHHHHHHHHHHHHHHHHHHHHHHHHHH",
          "        HHHHHHHHHHHHHHPPPPPPPHHHHHHHHGFHHHHHHHHHHHHHHHHHGFHHHHHHH",
          "        HHHHHHHHHHHHHHUUUUUUTHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHH",
          "        HHHHHHHHHHHHHHUAUAUATHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHH",
          "        HHHHHHHHHHHHHHUYUYUYTHHHMMMMMMMHHHHHRRRRRRRRRHHHHHHHHHHHH",
          "        HHHHHHHHHHHHHHUUUUUUTHHHWWWWWWWHHHHHPPPPPPPPPHHHHHHHHHHHH",
          "        HHHHHHHHHHHHHHUAUZUATHHHLJLELJXHHHHHUAUUEUUATHHHHHHHHHHHH",
          "        HHHHHHHHHHHHHHUYU=UYTHHHLKLILKXHHHHHUYUUIUUYTHHHHHHHHHHHH",
          "        #HHHHHHHHSHSHHUUU=UUTHSSLLLOLLXHSSHHUUUUOUUUTHSSHHHHHHHH@",
          "        fffffffffffffffffffffffffffffffffffffffffffffffffffffffff",
          "        DDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDD",
          "        DDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDD",
          "        DDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDD"
      ]

]

//define levels informations
let levelsInfo = {
    "nextLevel" : {
        "tag":"nextLevel",
        "levelNumber": 0,
        "enemiesNumber":0
    }
}

function sceneGenerator(next = true){
    if (next){
        levelsInfo.nextLevel.levelNumber +=1
    }else{
        levelsInfo.nextLevel.levelNumber -=1
    }
    levelsInfo.nextLevel.enemiesNumber = 0 //Math.round(Math.random() * (2 - 0 + 1))
    if (levelsInfo.nextLevel.levelNumber == 3){
        go('win')
    }else{
        go(levelsInfo.nextLevel.tag)
    }
}


//manage scenes in the game

//define the title menu
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

    camPos(width()/3 ,height()/2 + 100)
    camScale(7)

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
    addEverythingNeeded(levelsInfo.nextLevel.enemiesNumber)




})


scene("lose", () => {
    add([
        text("You Lose"),
        pos(12),
    ])

    onKeyPress(() => go("nextLevel"))
})
scene("win", () => {
    add([
        text("You Win"),
        pos(12),
    ])

    onKeyPress(() => go("start"))
})


loadAllSprites()
go("start")

