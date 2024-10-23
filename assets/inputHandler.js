// player input
//=======================================================
function GamerInput(input) {
    this.action = input; // Hold the current input as a string
}

// Default GamerInput is set to None
let gamerInput = new GamerInput("None"); //No Input

// mouse and touch

let mousePos = {
    x: 0,
    y: 0,
}

window.addEventListener("touchstart", touchInput);

canvas.addEventListener("mousedown", mouseInput);
canvas.addEventListener("wheel", mouseScroll);
canvas.addEventListener("mouseup",mouseLetGo);

let isDragging = false;

let mouseUp = false;

function mouseScroll(event)
{
    event.preventDefault();

    if(casted && fishSpawned)
    {
        let rod = playerInventory.gear.find(item => item.type === "rod" && item.status == "active");// gets the players rod from their inventory
        let line = playerInventory.gear.find(item => item.type === "line" && item.status == "active");
        if(event.deltaY > 1)
        {
            amountReeled += rod.speed;//gets the speed of the reel
            LineSnapAmount += line.strength / 2;
            animatedLineIn(1);//pulling in

        }
        else // line slowly goes back
        {
            amountReeled -= rod.speed / 8;
            LineSnapAmount -= line.strength * 2;
            animatedLineIn(-1);// letting out
        }

        // resets progress if line snaps
        if (LineSnapAmount > 255)
        {
            lineSnapped = true;
            resetCast();
        }
    }
}


function mouseLetGo()
{
    if(fishing)
    {
        mouseUp = true;
        resetCast();
    }
}
function mouseInput(event)
{
    if(!interacted)
    {
        turnOn();
        interacted = true;
    }
    // Get the mouse coordinates relative to the canvas
    var mouseX = event.clientX - canvas.getBoundingClientRect().left;
    var mouseY = event.clientY - canvas.getBoundingClientRect().top;

    mouseUp = false;
    let ratioY = canvas.clientHeight / 1080;
    let ratioX = canvas.clientWidth / 1920;


    // while the player is in the fishing screen
    if(fishing)
    {
        if (mouseY > 600*ratioY && !casted)
        {
            hook.x = mouseX;
            hook.y = mouseY;
            casted = true;
            lineSnapped = false;
        }

        if (mouseX >= ratioX*1376 && mouseX <= ratioX*1900 && mouseY >= 20*ratioY && mouseY <= 109*ratioY) 
        {
            feeding = true;
            fishing = false;
            stopOcean();
        }

        if (mouseX >= ratioX*1376 && mouseX <= ratioX*1900 && mouseY >= 150*ratioY && mouseY <= 225*ratioY) 
        {
            fishing = false;
            inventory = true;
            responding = false;
            stopOcean();
        }
    }
    if(feeding)
    {
        if (mouseX >= ratioX*400 && mouseX <= ratioX*750 && mouseY >= 850*ratioY && mouseY <= 1080*ratioY) // return
        {
            feeding = false;
            fishing = true;
            responding = false;
            playOcean();
        }
        else if (mouseX >= ratioX*10 && mouseX <= ratioX*360 && mouseY >= 850*ratioY && mouseY <= 1080*ratioY) 
        {
            feed();//feeds an phiast
        }
    }
    if(gameOver)
    {
        if (mouseX >= ratioX*400 && mouseX <= ratioX*750 && mouseY >= 850*ratioY && mouseY <= 1080*ratioY) 
        {
            gameOver = false;
            fishing = true;
            responding = false;
            playOcean();
        }
    }
    if(gameWon)
        {
            // reset game
            if (mouseX >= ratioX*400 && mouseX <= ratioX*750 && mouseY >= 850*ratioY && mouseY <= 1080*ratioY) 
            {
                resetGame()
                gameWon = false;
                fishing = true;
                responding = false;
                playOcean();
            }
            // start new
            if (mouseX >= ratioX*800 && mouseX <= ratioX*1050 && mouseY >= 850*ratioY && mouseY <= 1080*ratioY) 
            {
                gameWon = false;
                fishing = true;
                responding = false;
                playOcean();
            }
        }
    if(inventory)
    {
        if (mouseX >= ratioX*400 && mouseX <= ratioX*750 && mouseY >= 850*ratioY && mouseY <= 1080*ratioY) 
        {
            inventory = false;
            fishing = true;
            playOcean();

        }

            // Loop through all clickable items to check if the click was on an item
        for (let i = 0; i < clickableItems.length; i++) {
            const itemArea = clickableItems[i];
            if (mouseX >= itemArea.x && mouseX <= itemArea.x + itemArea.width &&
                mouseY >= itemArea.y && mouseY <= itemArea.y + itemArea.height) {

                // Toggle equip/unequip status
                if (itemArea.item.status === "active") {
                    itemArea.item.status = "inactive"; // Unequip item
                } else {
                    // Ensure only one item of the same type can be equipped at a time
                    playerInventory.gear.forEach(gear => {
                        if (gear.type === itemArea.item.type) {
                            gear.status = "inactive"; // Unequip other items of the same type
                        }
                    });
                    playerInventory.bait.forEach(bait => {
                        if (bait.type === itemArea.item.type) {
                            bait.status = "inactive"; // Unequip other items of the same type
                        }
                    });
                    itemArea.item.status = "active"; // Equip clicked item
                }
                break; // Exit the loop once an item is clicked
            }
        }
    }

}

function pauseToggle()
{
    pause = !pause;
}

function touchInput(event)
{
    // Get the touch coordinates relative to the canvas
    var touchX = event.clientX - canvas.getBoundingClientRect().left;
    var touchY = event.clientY - canvas.getBoundingClientRect().top;

    
    if(pause)// when in the pause screen
    {
        // Check if the click is inside the box
        if (touchX >= 450 && touchX <= 600 && touchY >= 200 && touchY <= 275) 
        {
            pause = false;
        }

        if (touchX >= 450 && touchX <= 600 && touchY >= 300 && touchY <= 375) 
        {
            option = true;
        }
    }
    else{
        if (touchX >= 0 && touchX <= 50 && touchY >= 0 && touchY <= 50) 
        {
            pause = true;
        }

    }

    if(option)
    {
        // Check if the click is inside the box
        if (touchX >= 450 && touchX <= 600 && touchY >= 200 && touchY <= 275) 
        {
            pause = false;
            option = false;
        }
        if (touchX >= 450 && touchX <= 600 && touchY >= 300 && touchY <= 375) 
        {
            audioMute = !audioMute;
            changeVolume();
        }
    }
}

function input(event) {
    // Take Input from the Player
    event.preventDefault();

if (event.type === "keydown") {
    if (event.key == " " &&!casted)
    {
        hook.x = 700;
        hook.y = 700;
        casted = true;
        lineSnapped = false;
    }
}
if (event.type === "keyup") {
    if (casted)
    {
        resetCast()
    }
}

}
