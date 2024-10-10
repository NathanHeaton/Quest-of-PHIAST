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
    if(fishing && casted && fishSpawned)
    {

        console.log(event.deltaY);
        if(event.deltaY > 1)
        {
            amountReeled += reelSpeed;
            LineSnapAmount += lineStrength / 2;
            animatedLineIn(1);//pulling in

        }
        else // line slowly goes back
        {
            amountReeled -= reelSpeed / 2;
            LineSnapAmount -= lineStrength * 2;
            console.log("line :"+ LineSnapAmount);
            animatedLineIn(-1);// letting out
        }

        // resets progress if line snaps
        if (LineSnapAmount > 255)
        {
            console.log("line snapped");
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
    // Get the mouse coordinates relative to the canvas
    var mouseX = event.clientX - canvas.getBoundingClientRect().left;
    var mouseY = event.clientY - canvas.getBoundingClientRect().top;

    mouseUp = false;

    let ratioY = canvas.clientHeight / 1080;
    let ratioX = canvas.clientWidth / 1920;

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
            hook.x = mouseX;
            hook.y = mouseY;
            casted = true;
            lineSnapped = false;
        }

        if (mouseX >= ratioX*1500 && mouseX <= ratioX*1900 && mouseY >= 20*ratioY && mouseY <= 140*ratioY) 
        {
            feeding = true;
            fishing = false;
        }
    }
    if(feeding)
        {
            if (mouseX >= ratioX*400 && mouseX <= ratioX*750 && mouseY >= 850*ratioY && mouseY <= 1080*ratioY) 
            {
                feeding = false;
                fishing = true;
                responding = false;
            }
            else if (mouseX >= ratioX*10 && mouseX <= ratioX*360 && mouseY >= 850*ratioY && mouseY <= 1080*ratioY) 
            {
                feed();//feeds an phiast
                console.log("feeding")
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
if (event.type === "keydown") {
    switch (event.key) {
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
