let btnRef = document.querySelectorAll(".button-option");
let popupRef = document.querySelector(".popup");
let newgameBtn = document.getElementById("new-game");
let restartBtn = document.getElementById("restart");
let msgRef = document.getElementById("message");

//winning patterns array
let winningPattern = [ [0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];

//player 'X' play first
let xTurn = true;
let count = 0;

//Disable all buttons
const disableButtons = () => {
    btnRef.forEach((element) => (element.disabled=true));
    //enable popup
    popupRef.classList.remove("hide");
};

//Enable all button (For new game and restart)
const enableButtons = () => {
    btnRef.forEach((element) => {
        element.innerText = "";
        element.disabled = false;
    });
    //disable popup 
    popupRef.classList.add("hide");
};

//This function is executed when a player win
const winFunction = (letter) => {
    disableButtons();
    if (letter =="X"){
        msgRef.innerHTML = "&#x1F389; <br> 'X'Wins";
    }
    else{
        msgRef.innerHTML = "&#x1F389; <br> 'O'Wins";
    }
};

//Function for draw
const drawFunction = () => {
    disableButtons();
    msgRef.innerHTML = "&#x1F60E; <br> It's a draw";
}
//New game
newgameBtn.addEventListener("click", () => {
    count = 0;
    enableButtons();
});

//Restart game
restartBtn.addEventListener("click", () => {
    count = 0 ;
    enableButtons();
});

//Win logic
const winChecker = () => {
    //Loop through all win patterns
    for (let i of winningPattern){
        let[element1, element2, element3] = [
            btnRef[i[0]].innerText,
            btnRef[i[1]].innerText,
            btnRef[i[2]].innerText,
        ];
        //Check if elements are filled
        //3 empty elements are same and would give win as would
        if(element1 != "" && (element2 !="") & (element3 != "")){
            if (element1 == element2 && element2 == element3){
                winFunction(element1)
            }
        }
    }
}

//Display X/O on click
btnRef.forEach((element) => {
    element.addEventListener("click", () => {
        if (xTurn) {
            xTurn = false;
            //display X
            element.innerText = "X";
            element.disabled =true;
        }else{
            xTurn = true;
            //display O
            element.innerText = "O";
            element.disabled = true;
        }
        //Increment count on each click
        count += 1;
        if (count == 9){
            //it's a drow since there are a total of 9 boxes
            drawFunction();
        }
        //Check for win on every click
        winChecker();
    });
});
//Enable button and disable popup on page load
window.onload = enableButtons;