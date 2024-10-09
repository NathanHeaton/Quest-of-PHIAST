// canvas
//==============================================
const canvas = document.getElementById("canvas")
const context = canvas.getContext("2d");
const contextText = canvas.getContext("2d");
const CANVAS_WIDTH = 1920;
const CANVAS_HEIGHT = 1080;


//fishing vars
//======================================
let hookX = 200;
let hookY = 250;

let casted = false;

let reelSpeed = 2;

let cooldown = 150;

let victory = false;
let canInteract = false;

//fish vars
//======================================

let fishSpawnTime = 300;
let fishLure = 15;
let fishSpawned = false;
let fishRarityChance = 1;

let fish = {Bass,Trout,Pike,Walleye,Carp};




// image setup
//=======================================================
let background = new Image();
background.src = "assets/img/Background + UI elements.png";


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
let option = false

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
            
            context.fillRect(hookX,hookY,15,15);
        }
    }

}


let musicActive = false;
function playBackgroundMusic()
{
    
    if (musicActive == false)
    {
        music.play();
        musicActive = true;
    }
    
}

function changeVolume()
{


}



function spawnFish()
{

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
