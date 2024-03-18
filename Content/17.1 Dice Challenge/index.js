function chooseWinner()
{
    var p1Roll = Math.floor(Math.random()*6 + 1);
    var p2Roll = Math.floor(Math.random()*6 + 1);
    var dice1 = document.querySelector(".img1");
    var dice2 = document.querySelector(".img2")
    dice1.setAttribute("src", "images/dice" + p1Roll + ".png");
    dice2.setAttribute("src", "images/dice" + p2Roll + ".png");
    var resultDisplay = document.querySelector("h1");
    if(p1Roll > p2Roll)
    {
        resultDisplay.textContent = dice1.previousElementSibling.textContent + " Wins!";
    }
    else if(p1Roll < p2Roll)
    {
        resultDisplay.textContent = dice2.previousElementSibling.textContent + " Wins!";
    }
    else
    {
        resultDisplay.textContent = "It's a Draw";
    }
}

chooseWinner();