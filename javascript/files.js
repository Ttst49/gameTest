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


//Sound import
    loadSound("sword",'music/AOL_Sword.wav')
    loadSound("hurt","music/AOL_Hurt.wav")
    loadSound("fire","music/AOL_Fire.wav")
    loadSound("death","music/AOL_Die.wav")
    loadSound("win","music/AOL_LearnSpell.wav")
    /**---------------------------------------------------------------------------------------------------**/
}


//Options of the game
export function loadOptions(){
    let SPEED;
    return SPEED = 120,setGravity(2400)
}