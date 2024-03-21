// Start game on random keydown
$(document).on("keydown", () => {
    if(!gameStarted)
    {
        startGame()
    }
});

// Sound For each button
$(".btn").on("click", (event) => {
    playColor($(event.target).attr("id"));
    $(event.target).addClass("pressed");
    setTimeout(() => $(event.target).removeClass("pressed"), 100);
});

// Check next button, if correct, check if level is complete. If wrong, end the game. 
$(".btn").on("click", (event) => {
    if(gameStarted)
    {
        if(checked < sequenceTillNow.length)
        {
            if(sequenceTillNow[checked] == $(event.target).attr("id"))
            {
                checked++;
                if(checked == sequenceTillNow.length)
                {
                    setTimeout(() => createLevel(sequenceTillNow.length + 1), 1000);
                }
            }
            else
            {
                $("body").addClass("game-over");
                setTimeout(()=>{$("body").removeClass("game-over")}, 200);
                $("#level-title").text("Game Over, Press Any Key to Restart");
                playSound("sounds/wrong.mp3");
                gameStarted = false;

            }
        }
    }
});

// Start game and create level 1
function startGame(){
    gameStarted = true;
    sequenceTillNow = [];
    createLevel(1);
    
}

// Create each level and add a block to the sequence each time.
function createLevel(levelNum)
{
    checked = 0;
    $("#level-title").text("Level " + levelNum);
    var color = getNextItem();
    sequenceTillNow.push(color);
    simon(color);
}

// Give the block a fade out and fade in on simon calling it.
function simon(color){
    $("#" + color).fadeOut(50).fadeIn(50);
    playColor(color);
}

// Get random color for next block chosen by simon.
function getNextItem(){
    var rand = Math.floor(4*Math.random());
    return $(".btn")[rand].getAttribute("id");
}

// Play sound of a particular color
function playColor(color){
    var audioFile = "sounds/" + color + ".mp3";
    playSound(audioFile);
}

// Play a particular sound file
function playSound(audioFile){
    var audio = new Audio(audioFile);
    audio.volume = 0.2;
    audio.play();
}

var gameStarted = false;
var sequenceTillNow = [];
var checked = 0;