var drumButtons = document.getElementsByClassName("drum");
for(var i=0; i<drumButtons.length; i++){
    drumButtons[i].addEventListener("click", function (){
        playAudio(this.innerHTML);
        addAnimation(this.innerHTML);
    });
}

document.addEventListener("keydown", function(event){
    playAudio(event.key);
    addAnimation(event.key);
});

function playAudio(key) {
    var audio;
    switch (key) {
        case "w":
            audio = new Audio("sounds/tom-1.mp3");
            break;
        case "a":
            audio = new Audio("sounds/tom-2.mp3");
            break;
        case "s":
            audio = new Audio("sounds/tom-3.mp3");
            break;
        case "d":
            audio = new Audio("sounds/tom-4.mp3");
            break;
        case "j":
            audio = new Audio("sounds/snare.mp3");
            break;
        case "k":
            audio = new Audio("sounds/crash.mp3");
            break;
        case "l":
            audio = new Audio("sounds/kick-bass.mp3");
            break;
        default:
            console.log("No audio assigned to '" + this.innerHTML + "'");
            return;
    }
    audio.play();
}

function addAnimation(key)
{
    var drumObject = document.querySelector("." + key);
    if(drumObject != null)
    {
        drumObject.classList.add("pressed");
        setTimeout(function() {
            drumObject.classList.remove("pressed");
        }, 100);
    }
}