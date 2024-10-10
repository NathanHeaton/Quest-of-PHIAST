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

let casted = false;

let reelSpeed = 2;
let amountReeled = 0;

let cooldown = 150;

let fishCaught = false;

let victory = false;
let canInteract = false;

//fish vars
//======================================

let fishSpawnTime = 3000;
let fishLure = 15;
let fishSpawned = false;
let fishRarityChance = 1;

let fish = ["Bass","Trout","Pike","Walleye","Carp"];
let randomFish;
let reelTime = [40,30,80,35,45];
let fishReelTime;


//player vars
//======================================
let fishInventory = [];


//An Phaist vars
//======================================
let APhaistResponse = "you have no fish I might need to eat YOU!!!!";
let responding = false;

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
            contextText.fillText("caught: " + randomFish, 150, 150);
        }
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
}


function resetCast()
{
    LineSnapAmount = 0;
    amountReeled = 0;
    casted = false;
    fishSpawnTime = 3000;
    fishSpawned = false
}



function spawnFish()
{
    if(fishSpawnTime <= 0 && !fishSpawned)
    {
        fishCaught = false;// gets rid of the previous fish message
        fishSpawned = true;
        // get a random fish and picks the reel time need for that fish
        let rngNumber =  Math.floor(Math.random() * (fish.length - 0 )) + 0;
        randomFish = fish[rngNumber];
        fishReelTime = reelTime[rngNumber];


    }
    else
    {
        fishSpawnTime -= fishLure;
    }
}

// for feeding An Phaist
function feed()
{
    responding = true;
    if (fishInventory.length == 0)
    {
        APhaistResponse = "you have no fish I might need to eat YOU!!!!";
    }
    else
    {
        APhaistResponse = "That's a tasty " + fishInventory[fishInventory.length - 1];
        fishInventory.pop();
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
        fishInventory.push(randomFish);
        resetCast();
        amountReeled = 0;
    }
}

// line slowly weakens and reel amount resets
function passiveLineLoss()
{
    if ( amountReeled > 0)
    {
        amountReeled -= reelSpeed / 30;
    }
    LineSnapAmount += lineStrength / 60;
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
                passiveLineLoss();
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
