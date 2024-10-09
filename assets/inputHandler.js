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
    if(fishing && casted)
    {
        console.log(event.deltaY);
        if(event.deltaY > 1)
        {
            amountReeled += reelSpeed;
            console.log(amountReeled);
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
    // Get the mouse coordinates relative to the canvas
    var mouseX = event.clientX - canvas.getBoundingClientRect().left;
    var mouseY = event.clientY - canvas.getBoundingClientRect().top;

    mouseUp = false;

    let ratioY = canvas.clientHeight / 1080;

    if(pause)// when in the pause screen
    {
        // Check if the click is inside the box
        if (mouseX >= 450 && mouseX <= 600 && mouseY >= 200 && mouseY <= 275) 
        {
            pause = false;
        }

        if (mouseX >= 450 && mouseX <= 600 && mouseY >= 300 && mouseY <= 375) 
        {
            option = true;
        }
    }

    if(option)
    {
        // Check if the click is inside the box
        if (mouseX >= 450 && mouseX <= 600 && mouseY >= 200 && mouseY <= 275) 
        {
            pause = false;
            option = false;
        }

        if (mouseX >= 450 && mouseX <= 600 && mouseY >= 300 && mouseY <= 375) 
        {
            audioMute = !audioMute;
            changeVolume();
        }

        // for music volume slider
        if (mouseX >= 100 && mouseX <= 300 && mouseY >= 200 && mouseY <= 225) 
        {
            isDragging = true;
            
            handleMouseMoveMusic(event);
            changeVolume();

        }
        //for
        if (mouseX >= 100 && mouseX <= 300 && mouseY >= 300 && mouseY <= 325) 
        {
            isDragging = true;
            handleMouseMoveSFX(event);
            changeVolume();
        }


    }
    // while the player is in the fishing screen
    if(fishing)
    {
        if (mouseY > 600*ratioY)
        {
            hookX = mouseX;
            hookY = mouseY;
            casted = true;
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

let sprintState = 0; // bool for sprinting
function input(event) {
    // Take Input from the Player
    // console.log("Input");
    console.log(event);
    console.log("Event type: " + event.type);
    // console.log("Keycode: " + event.key);
if (event.type === "keydown") {
    switch (event.key) {
        case "a": // Left Arrow
            gamerInput = new GamerInput("Left");
            blueButton.classList.add("pressed");
            break; //Left key
        case "w": // Up Arrow
            gamerInput = new GamerInput("Up");
            yellowButton.classList.add("pressed");
            break; //Up key
        case "d": // Right Arrow
            gamerInput = new GamerInput("Right");
            redButton.classList.add("pressed");
            break; //Right key
        case "s": // Down Arrow
            gamerInput = new GamerInput("Down");
            greenButton.classList.add("pressed");
            break; //h key
        case "h":// sprint
            if (!cooldownState) // if there is no cooldown on
            {
            sprintState = true;
            }
            sprintButton.classList.add("pressed");
            break; //Down key
        case "e": // e key;
            interactButton.classList.add("pressed");
            if (canInteract == true)
            {
                switchState = !switchState ;// means it is toogled
                console.log("toggled");
            }
            break;
        case "Escape":
            pause = !pause;// toggles pause
            console.log(pause);
            break;
        case "1":
            break;


        default:
            gamerInput = new GamerInput("None"); //No Input
            sprintState = false;
    }
}}
