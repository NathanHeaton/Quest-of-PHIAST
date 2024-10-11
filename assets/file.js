// canvas
//==============================================
const canvas = document.getElementById("canvas")
const context = canvas.getContext("2d");
const contextText = canvas.getContext("2d");
const CANVAS_WIDTH = 1920;
const CANVAS_HEIGHT = 1080;


//fishing vars
//======================================

let hook = {x : 200, y : 250};

let lineStrength = 20;
let LineSnapAmount = 0;
let lineSnapped = false;
let LineSnapMessage = "your line snapped don't let the hook go white"

let casted = false;

let reelSpeed = 2;
let amountReeled = 0;


let fishCaught = false;

//fish vars
//======================================

let fishSpawnTime = 100;
let fishSpawned = false;

let loot = [
    { type:"fish", name:"Bass", rarity:"Common", reelTime: 40 },
    { type:"fish", name:"Trout", rarity:"Common", reelTime: 30 },
    { type:"fish", name:"Pike", rarity:"Common", reelTime: 55 },
    { type:"fish", name:"Walleye", rarity:"Common", reelTime: 35 },
    { type:"fish", name:"Carp", rarity:"Common", reelTime: 45 },
    { type:"fish", name:"Sauger", rarity:"Rare", reelTime:70 },
    { type:"fish", name:"Blue Catfish", rarity:"Rare", reelTime: 80 },
    { type:"fish", name:"Black Crappie", rarity:"Rare", reelTime: 75 },
    { type:"fish", name:"White Crappie", rarity:"Epic", reelTime:90 },
    { type:"fish", name:"Sunfish Bluegill", rarity:"Epic", reelTime: 110 },
    { type:"fish", name:"Rainbow Trout", rarity:"Epic", reelTime: 120 },
    { type:"fish", name:"Salmon of Knowledge", rarity:"Legendary", reelTime: 150 },
    //junk items
    { type:"junk", name:"Swimming Goggles", rarity:"Rare", reelTime: 25 },
    { type:"junk", name:"Tin Can", rarity:"Common", reelTime:15 },
    { type:"junk", name:"Broken Net", rarity:"Common", reelTime: 60 },
    { type:"junk", name:"Ancient Sword", rarity:"Epic", reelTime: 105 },
    { type:"junk", name:"Gold Ring", rarity:"Legendary", reelTime: 140 },
    ];
let randomFish;
let fishReelTime;


//player vars
//======================================

let playerInventory = {
    loot:[],
    gear:[],
    bait:[]
}


playerInventory.gear.push({ type:'rod', name: 'Stick Fishing Rod', speed: 2 },{type:'line', name:'yarn Line', strength:20});
playerInventory.bait.push({ type: 'bait', name: 'Worm', quantity: 20, lure:15, spawnTime: 3000, status: "active" });


//An Phaist vars
//======================================
let APhaistResponse = "you have no fish I might need to eat YOU!!!!";
let responding = false;

let gameOverMessage = "you ran out of bait";

// image setup
//=======================================================
let background = new Image();
background.src = "assets/img/Background + UI elements.png";

let feedingBackground = new Image();
feedingBackground.src = "assets/img/Dingle storyboard feeding.png";


// audio setup
//=========================================================

//let music = new Audio("assets/audio/dark castle Am ver.2.mp3");

// GameObject holds positional information
// Can be used to hold other information based on requirements
//=======================================================
function GameObject(spritesheet, x, y, width, height) {
    this.spritesheet = spritesheet;
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
}

// game object setup
//=======================================================
//let player = new GameObject(playerImage, playerx, playery, 16, 16);


// render
//=======================================================
let pause = false;
let fishing = true;
let option = false;
let feeding = false;
let gameOver = false;

// window
//============================================================

const ASPECT_RATIO = 1080/1920;
let optimalWidthtotal = 1920;

setCanvasSize();

window.addEventListener("resize",setCanvasSize);

function setCanvasSize()
{
    optimalWidthtotal = document.getElementsByClassName("container")[0].clientWidth;
    if (optimalWidthtotal > 1920)
        {
            optimalWidthtotal = 1920;
        }
    canvas.width = optimalWidthtotal;
    canvas.height = optimalWidthtotal * ASPECT_RATIO; // calclates the best height to view the content
}

function draw() {
    // Clear Canvas
    context.clearRect(0, 0, canvas.width, canvas.height);
    
    

    if (pause == true) // can pause on any screen
    {
        context.fillStyle = "#00000088";
        context.fillRect(0, 0, canvas.width, canvas.height);

        // pause title
        contextText.fillStyle = "white";
        contextText.font = "80px Arial";
        contextText.fillText("Pause", 450, 150);

        contextText.font = "30px Copperplate";
        contextText.fillText("Movement: WASD \n Interact: e \n Sprint: h", 10, 50);
        
        //return to game button
        context.fillRect(450,200,200,75);
        contextText.fillStyle = "black";
        contextText.fillText("Return",500,240);
        
        // options button
        contextText.fillStyle = "white";
        context.fillRect(450,300,200,75);
        contextText.fillStyle = "black";
        contextText.fillText("Options",500,340);

    }

    if (option == true)
    {
        context.fillStyle = "#000";
        context.fillRect(0, 0, canvas.width, canvas.height);

    }

    if (fishing == true)
    {
        context.drawImage(background,0,0,canvas.width,canvas.height);
        if (casted)
        {
            
            context.fillStyle = "#000";
            if(fishSpawned)
            {
                context.fillStyle = "#000";
                context.fillRect(0,0,amountReeled,40);

                context.fillStyle = "rgb(255,"+ LineSnapAmount +"," + LineSnapAmount +")";
            }

            context.fillRect(hook.x,hook.y,15,15);
        }
        if(fishCaught)
        {
            contextText.fillStyle = "white";
            contextText.font = "50px Arial";
            contextText.fillText("You caught ("+randomFish.rarity+ " " + randomFish.name + ")", 50, 150);
        }
        if (lineSnapped)
        {
            contextText.fillStyle = "white";
            contextText.font = "50px Arial";
            contextText.fillText(LineSnapMessage, 50, 150);
        }
        contextText.fillStyle = "white";
        contextText.font = "50px Arial";
        contextText.fillText(getBaitQuantity(), 390, 930);
    }
    if (feeding == true)
    {
        context.drawImage(feedingBackground,0,0,canvas.width,canvas.height);
        if(responding)
        {
            contextText.fillStyle = "white";
            contextText.font = "50px Arial";
            contextText.fillText("An Phaist: "+ APhaistResponse, 150, 60);
        }

    }
    if (gameOver)
    {
        context.fillStyle = "#000";
        context.fillRect(0, 0, canvas.width, canvas.height);
        contextText.fillStyle = "white";
        contextText.font = "50px Arial";
        contextText.fillText("you ran out of bait", 150, 60);

        context.fillStyle = "#FF4488";
        context.fillRect(400, 850, 350,230);
        contextText.fillStyle = "white";
        contextText.font = "50px Arial";
        contextText.fillText("New game", 500, 900);
    }
}


function resetCast()
{
    LineSnapAmount = 0;
    amountReeled = 0;
    casted = false;
    fishSpawnTime = playerInventory.bait.find(item => item.type == "bait").spawnTime;
    fishSpawned = false
}

function pickFishRarity(t_bait)
{
    let lootPool = [];

    console.log(t_bait);
    // based on the player lure makes the loot pool
    if (t_bait.lure <= 15)
    {
        lootPool = loot.filter(item => item.rarity == "Common");
    }
    else if (t_bait.lure <= 20)
    {
        lootPool = loot.filter(item => item.rarity == "Common" || item.rarity == "Rare");
    }
    else if (t_bait.lure <= 25)
    {
        lootPool = loot.filter(item => item.rarity == "Common" || item.rarity == "Rare" || item.rarity == "Epic");
    }
    else if (t_bait.lure <= 30)
    {
        lootPool = loot.filter(item => item.rarity == "Rare" || item.rarity == "Epic");
    }
    else if (t_bait.lure <= 35)
    {
        lootPool = loot.filter(item => item.rarity == "Rare" || item.rarity == "Epic" || item.rarity == "Legendary");
    }
    else if (t_bait.lure <= 40)
    {
        lootPool = loot.filter(item => item.rarity == "Epic" || item.rarity == "Legendary");
    }
    


    // make sure there is items in the loot pool
    if (lootPool.length > 0) {
        rngNumber = Math.floor(Math.random() * lootPool.length);
    } else {
        console.log("No items in the loot pool!");
        return null;
    }
    console.log(lootPool);

    return lootPool[rngNumber];
}

function getBaitQuantity(){
    return playerInventory.bait.find(item => item.type === "bait").quantity;
}

function spawnFish()
{
    let playerbait = playerInventory.bait.find(item => item.type === "bait");
    if (playerbait.quantity > 0 && !fishSpawned)
    {
        if(fishSpawnTime <= 0 && !fishSpawned)
        {
            fishCaught = false;// gets rid of the previous fish message
            fishSpawned = true;
            // get a random fish and picks the reel time need for that fish
            randomFish = pickFishRarity(playerbait);
            fishReelTime = randomFish.reelTime;
            playerbait.quantity--;//uses up bait
            fishSpawnTime = playerInventory.bait.find(item => item.type == "bait").spawnTime;
        }
        else if (!fishSpawned)
        {
            fishSpawnTime -= playerbait.lure;// gets the lure of the bait
        }
    }
    else if (!fishSpawned)
    {
        resetGame();
        console.log("you have "+ playerbait.quantity + " remaining");
    }
}

// for feeding An Phaist
function feed()
{
    responding = true;
    let totalFish = playerInventory.loot.length;

    if (totalFish == 0)
    {
        APhaistResponse = "you have no fish I might need to eat YOU!!!!";
        gameOverMessage = "An Phiast is hungry, and decide to eat you"
    }
    else
    {
        APhaistResponse = "That's a tasty " + playerInventory.loot[playerInventory.loot.length - 1].name;
        playerInventory.loot.pop();
    }
}

const BOAT_POS = {x : 810 ,y : 1080};

// adds some animation
function animatedLineIn(dir)
{
    let xincrement =0;
    let yincrement = 0;

    xincrement = (BOAT_POS.x - hook.x) / fishReelTime;
    yincrement = (BOAT_POS.y - hook.y) / fishReelTime;


    hook.x += xincrement * dir;
    hook.y += yincrement * dir;
    if (hook.x < 600)
    {
        hook.x = 600;
    }


}

// function to add fish to inv and reset cast
function catchFish()
{
    if (amountReeled >= fishReelTime)
    {
        fishCaught = true;
        playerInventory.loot.push(randomFish);
        resetCast();
        amountReeled = 0;
    }
}

// line slowly weakens and reel amount resets
function passiveLineGain()
{
    if ( amountReeled > 0)
    {
        amountReeled -= 0.2;

    }
    LineSnapAmount += 0.02;
}

function update() {
    

    if (pause)
    {

    }
    else if (option)
    {
        
    }
    else if (fishing)
    {
        if (casted)
        {
            spawnFish();
            catchFish();

            if(fishSpawned)
            {
                passiveLineGain();
            }
        }
    }
}

function gameloop() {
    update();
    draw();
    window.requestAnimationFrame(gameloop);
}

function boundaryCheck(){

}


let respawnTime = 300;
let respawnActive = false;

function resetGame()
{
    gameOver = true;
    fishing = false;
    resetCast();

    playerInventory = {
        loot:[],
        gear:[],
        bait:[]
    }

    playerInventory.gear.push({ type:'rod', name: 'Stick Fishing Rod', speed: 2 },{type:'line', name:'yarn Line', strength:20});
    playerInventory.bait.push({ type: 'bait', name: 'Worm', quantity: 1, lure:40, spawnTime: 3000 });



}

function winGame()
{

}


// Handle Active Browser Tag Animation
window.requestAnimationFrame(gameloop);

// https://developer.mozilla.org/en-US/docs/Web/API/window/requestAnimationFrame

window.addEventListener('keydown', input);
// disable the second event listener if you want continuous movement
window.addEventListener('keyup', input);

window.addEventListener("mousedown", input)
