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
let LineSnapMessage = "your line snapped don't let the hook get white"

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
    { type:"junk", name:"Gold Ring", rarity:"Legendary", reelTime: 140 }
    ];
let randomFish;
let fishReelTime;


//player vars
//======================================

let clickableItems = [];

let gameWon = false;

let playerInventory = {
    loot:[],
    gear:[],
    bait:[]
}


playerInventory.gear.push({ type:'rod', rarity:"basic" , name: 'Stick Fishing Rod', description:'normal stick with a wire stuck to it', speed: 2, status: "active", s:{x: 1,y:0} },
{type:'line', rarity:"basic", name:'yarn Line', description:'very weak line', strength:20 , status: "active", s:{x: 0,y:1}});
playerInventory.bait.push({ type: 'bait', rarity:"basic", name: 'Worm', quantity: 5, lure:15, spawnTime: 3000, status: "active", s:{x: 0,y:0} });

//An Phaist vars
//======================================
let APhaistResponse = "you have no fish I might need to eat YOU!!!!";
let responding = false;

// rewards that you can get from giveing fish
let rewardMessage = "";
let Rewards = {
    gear:[
        // rods
        { type:'rod', rarity:"Common", name: 'Childrens fishing rod', description:'Just about better than a stick', speed: 3, spawnBonus:0, status: "inActive", s:{x: 0,y:0} },
        { type:'rod', rarity:"Rare", name: 'Trolling rod', description:'Perfect for fishing on a boat', speed: 5, spawnBonus:0, status: "inActive", s:{x: 2,y:0}  },
        { type:'rod', rarity:"Epic", name: 'Composite trolling rod', description:'Strong and light weight', speed: 6, spawnBonus:0.2, status: "inActive", s:{x: 3,y:0}  },
        { type:'rod', rarity:"Legendary", name: 'Graphite trolling rod', description:'The ultimate rod', speed: 8, spawnBonus:0.4, status: "inActive", s:{x: 3,y:0}  },

        // line
        { type:'line', rarity:"Common", name:'Old fishing line', description:'better than yarn atleast', strength:30, status: "inActive", s:{x: 1,y:1} },
        { type:'line', rarity:"Rare", name:'Monofilament Line', description:'cheap basic fishing line', strength:35, status: "inActive", s:{x: 2,y:1} },
        { type:'line', rarity:"Epic", name:'Fluorocarbon Fishing Line', description:'Perfect complement to braid', strength:65, lureBonus: 0.2, status: "inActive", s:{x: 3,y:1} },
        { type:'line', rarity:"Legendary", name:'Spiderwire Braid', description:'The ultimate fishing line', strength:75, lureBonus:0.4, status: "inActive", s:{x: 4,y:1} }
    ],
    bait:[
        { type: 'bait', rarity:"Common", name: 'Worm', quantity: 2, lure:15, spawnTime: 3000, status: "inActive", s:{x: 0,y:0} },
        { type: 'bait', rarity:"Common", name: 'Shrimp', quantity: 3, lure:20, spawnTime: 3000, status: "inActive", s:{x: 1,y:0} },
        { type: 'bait', rarity:"Common", name: 'Fish Food', quantity: 2, lure:25, spawnTime: 2500, status: "inActive", s:{x: 2,y:0} },
        { type: 'bait', rarity:"Rare", name: 'Cheese', quantity: 5, lure:25, spawnTime: 2250, status: "inActive", s:{x: 3,y:0} },
        { type: 'bait', rarity:"Rare", name: 'Basic Lure', quantity: 100, lure:20, spawnTime: 2500, status: "inActive", s:{x: 0,y:1} },
        { type: 'bait', rarity:"Epic", name: 'Minnow', quantity: 1, lure:30, spawnTime: 500, status: "inActive", s:{x: 1,y:1} },
        { type: 'bait', rarity:"Epic", name: 'Special Lure', quantity: 100, lure:30, spawnTime: 1500, status: "inActive", s:{x: 2,y:1} },
        { type: 'bait', rarity:"Epic", name: 'Golden Fish Food', quantity: 1, lure:35, spawnTime: 4000, status: "inActive", s:{x: 3,y:0} },
        { type: 'bait', rarity:"Legendary", name: 'Golden Special Lure', quantity: 100, lure:35, spawnTime: 1500, status: "inActive", s:{x: 0,y:2} },
        { type: 'bait', rarity:"Legendary", name: 'True Bait', quantity: 2, lure:40, spawnTime: 1500, status: "inActive", s:{x: 1,y:2} }
    ]
}

let gameOverMessage = "you ran out of bait";

// image setup
//=======================================================
const ITEM_FRAME = 100;

let background = new Image();
background.src = "assets/img/Background + UI elements.png";

let feedingBackground = new Image();
feedingBackground.src = "assets/img/Dingle storyboard feeding.png";

let baitAssets = new Image();
baitAssets.src = "assets/img/Bait assets.png";

let baitItem = new GameObject(baitAssets,50,825,ITEM_FRAME,ITEM_FRAME);

let gameAssets = new Image();
gameAssets.src = "assets/img/Game assets.png";

let rodItem = new GameObject(gameAssets,100 +ITEM_FRAME,825,ITEM_FRAME,ITEM_FRAME);

let lineItem =  new GameObject(gameAssets,150 +ITEM_FRAME+ITEM_FRAME,825,ITEM_FRAME,ITEM_FRAME);


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
let inventory = false;

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
            drawLine();
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
        contextText.fillText(getBaitQuantity(), baitItem.x, baitItem.y );

        // Item UI
        drawItem(baitItem, playerInventory.bait.find(item => item.status == "active"));
        drawItem(rodItem, playerInventory.gear.find(item => item.status == "active" && item.type == "rod"));
        drawItem(lineItem, playerInventory.gear.find(item => item.status == "active" && item.type == "line"));

    }
    if (feeding == true)
    {
        context.drawImage(feedingBackground,0,0,canvas.width,canvas.height);
        if(responding)
        {
            contextText.fillStyle = "white";
            contextText.font = "50px Arial";
            contextText.fillText("An Phaist: "+ APhaistResponse, 150, 60);
            contextText.fillStyle = "white";
            contextText.font = "50px Arial";
            contextText.fillText(rewardMessage,150,850);
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
    if (inventory)
    {
        context.fillStyle = "#000";
        context.fillRect(0, 0, canvas.width, canvas.height);
        contextText.fillStyle = "white";
        contextText.font = "50px Arial";
        contextText.fillText("Inventory", 150, 60);

        context.fillStyle = "#FF4488";
        context.fillRect(400, 850, 350,230);
        contextText.fillStyle = "white";
        contextText.font = "50px Arial";
        contextText.fillText("fish", 500, 900);

        for(let i = 0; i < playerInventory.bait.length;i++)
        {
            let x = 300 + (i * (ITEM_FRAME + 75));
            let y = 300;
            drawIventoryItems(baitItem, playerInventory.bait.at(i),x,y);

        }
        for(let i = 0; i < playerInventory.gear.length;i++)
        {
            let x = 300 + (i * (ITEM_FRAME + 75));
            let y = 600;
            drawIventoryItems(rodItem, playerInventory.gear.at(i),x,y);

        }



    }
    if (gameWon)
    {
        context.fillStyle = "#000";
        context.fillRect(0, 0, canvas.width, canvas.height);
        contextText.fillStyle = "white";
        contextText.font = "50px Arial";
        contextText.fillText("You gave An Phiast the knowledge he needs to live a normal life", 150, 60);

        context.fillStyle = "#FF4488";
        context.fillRect(400, 850, 350,230);
        contextText.fillStyle = "white";
        contextText.font = "50px Arial";
        contextText.fillText("New game", 500, 900);

        context.fillStyle = "#FF4488";
        context.fillRect(800, 850, 350, 230);
        contextText.fillStyle = "white";
        contextText.font = "50px Arial";
        contextText.fillText("Keep playing", 850, 900);
    }
}

function drawLine() {
    context.beginPath();       // Start a new path
    context.moveTo(991,597);    // Move to the starting point
    context.lineTo(hook.x+5, hook.y);    // Draw a line to the ending point
    context.stroke();          // Render the line
}

function drawIventoryItems(sprite, data, x, y){

    clickableItems.push({
        x: x - 25,
        y: y - 25,
        width: ITEM_FRAME + 50,
        height: 50,
        item: data
    });
    contextText.fillStyle = "white";
    contextText.font = "18px Arial";
    contextText.fillText(data.name,x-15, y-50)
    // if equiped or not
    if (data.status === "active")
    {   
        context.fillStyle = "#FF4488";
        context.fillRect(x-25, y-25, ITEM_FRAME + 50, 50);
        contextText.fillStyle = "white";
        contextText.font = "15px Arial";
        contextText.fillText("un equip", x-15, y-15);
    }
    else 
    {
        context.fillStyle = "#BB2244";
        context.fillRect(x-25, y-25, ITEM_FRAME + 50, 50);
        contextText.fillStyle = "white";
        contextText.font = "15px Arial";
        contextText.fillText("equip", x-15, y-15);
    }
    // text description and rarity
    contextText.fillStyle = "white";
    contextText.font = "15px Arial";
    if (data.type != "bait")
        {
        contextText.fillText(data.description, x-15, y+ITEM_FRAME+15,150);
        }
    else{contextText.fillText("quantity: " +data.quantity, x-15, y+ITEM_FRAME+15,150);}
    contextText.fillStyle = "white";
    contextText.font = "15px Arial";

    contextText.fillText("rarity: " + data.rarity, x-15, y+ITEM_FRAME+35,150);

    context.drawImage(sprite.spritesheet,data.s.x * ITEM_FRAME, data.s.y * ITEM_FRAME,ITEM_FRAME,ITEM_FRAME, 
        x,
        y,
        ITEM_FRAME,
        ITEM_FRAME
        );


}


function drawItem(sprite, data){

    context.drawImage(sprite.spritesheet,data.s.x * ITEM_FRAME, data.s.y * ITEM_FRAME,ITEM_FRAME,ITEM_FRAME, 
        sprite.x,
        sprite.y,
        ITEM_FRAME,
        ITEM_FRAME
        );

}

////////////////////////////////////////
// code from chat gpt 4-o
///////////////////////////////////////////

function getRandomItemByRarity(rarity) {
    // Filter the rewards by the given rarity
    let itemsByRarity = Rewards.gear.concat(Rewards.bait).filter(item => item.rarity === rarity);
    // Return a random item from the filtered list
    return itemsByRarity[Math.floor(Math.random() * itemsByRarity.length)];
}

function rewardPlayerForFish(fish) {
    // Determine the rarity of the fish caught
    let fishRarity = fish.rarity;

    // Use random variance to determine if the player gets a reward, and what type
    let rewardChance = Math.random(); // Random number between 0 and 1

    // Higher rarity fish gives higher chance for better rewards
    let rewardType;
    if (rewardChance < 0.5) {
        rewardType = 'gear'; // 50% chance to get gear
    } else {
        rewardType = 'bait'; // 50% chance to get bait
    }

    // Get a reward item based on the rarity of the fish and random variance
    let reward = getRandomItemByRarity(fishRarity);

    // Add the reward to the player's inventory based on its type
    if (reward.type === 'rod' || reward.type === 'line') {
        // Add gear to player's inventory
        playerInventory.gear.push(reward);

        // Find and remove the gear item from the Rewards.gear array
        let rewardIndex = Rewards.gear.findIndex(item => item.name === reward.name);
        if (rewardIndex !== -1) {
            Rewards.gear.splice(rewardIndex, 1); // Remove the item from the rewards
        }
    } else if (reward.type === 'bait') {
        // Check if the player already has the bait
        let existingBait = playerInventory.bait.find(b => b.name === reward.name);
        if (existingBait) {
            // Increase the quantity of the existing bait
            existingBait.quantity += reward.quantity;
        } else {
            // Add the new bait to the inventory
            playerInventory.bait.push(reward);
        }
    }

    rewardMessage = `You caught a ${fish.name} (${fish.rarity}) and received a ${reward.name}!`;
}

/////////////////////////////////////////////////////////////
// end of code from gpt 4-0
///////////////////////////////////////////////////////////////


function resetCast()
{
    LineSnapAmount = 0;
    amountReeled = 0;
    casted = false;
    fishSpawnTime = playerInventory.bait.find(item => item.type == "bait" && item.status == "active" ).spawnTime;
    if (playerInventory.gear.find(item => item.type == "rod").spawnBonus > 0)
        {
            fishSpawnTime = fishSpawnTime - (fishSpawnTime * playerInventory.gear.find(item => item.type == "rod" && item.status == "active").spawnBonus)
        }
    fishSpawned = false
}

function pickFishRarity(t_bait)
{
    let lootPool = [];

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
        return null;
    }

    return lootPool[rngNumber];
}

function getBaitQuantity(){
    return playerInventory.bait.find(item => item.type === "bait"  && item.status == "active").quantity;
}

function spawnFish()
{
    let playerbait = playerInventory.bait.find(item => item.type === "bait"  && item.status == "active");
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
            fishSpawnTime = playerInventory.bait.find(item => item.type == "bait"  && item.status == "active").spawnTime;
        }
        else if (!fishSpawned)
        {
            fishSpawnTime -= playerbait.lure;// gets the lure of the bait
        }
    }
    else if (!fishSpawned)
    {
        resetGame();
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

        rewardPlayerForFish(playerInventory.loot.findLast(item => item.type === "fish" || item.type === "junk"));
        APhaistResponse = "That's a tasty " + playerInventory.loot[playerInventory.loot.length - 1].name;

        if(playerInventory.loot[playerInventory.loot.length - 1].name == "Salmon of Knowledge")
        {
            playerInventory.loot.find(item => item.name === "Salmon of Knowledge")
            feeding = false;
            gameWon = true;
        }
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
        amountReeled -= 0.05;
    }
    LineSnapAmount -= 0.2;
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

            keepHookInCorrectSpot();
            spawnFish();
            catchFish();

            if(fishSpawned)
            {
                hookDrift();
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

let hookDriftAmount =0;

function hookDrift(){
    hookDriftAmount =Math.floor(Math.random() * 11) - 5;

    hook.x += hookDriftAmount/5;
    hook.y += hookDriftAmount/10;

}

function keepHookInCorrectSpot(){
    if(hook.y < 635)
        {
            hook.y = 635;
        }
    else if (hook.y > 894)
        {
            hook.y = 894;
        }
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

    playerInventory.gear.push({ type:'rod', rarity:"basic" , name: 'Stick Fishing Rod', description:'normal stick with a wire stuck to it', speed: 2, status: "active", s:{x: 1,y:0} },
        {type:'line', rarity:"basic", name:'yarn Line', description:'very weak line', strength:20 , status: "active", s:{x: 0,y:1}});
        playerInventory.bait.push({ type: 'bait', rarity:"basic", name: 'Worm', quantity: 5, lure:15, spawnTime: 3000, status: "active", s:{x: 0,y:0} });



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
