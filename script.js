let boxes = document.querySelectorAll(".box");
let reset = document.querySelector(".reset");
let newbtn = document.querySelector(".newbtn");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");

let turnO = JSON.parse(localStorage.getItem("turnO")) || true;

let winPatterns = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

// Function to reset the game state
const resetGame = () => {
    boxes.forEach((box) => {
        box.innerText = "";
        box.disabled = false;
    });
    msgContainer.classList.add("hide");
    turnO = true;
    saveGameState();
};

// Event listener for the reset button
reset.addEventListener("click", resetGame);

// Event listener for the boxes
boxes.forEach((box) => {
    box.addEventListener("click", () => {
        console.log("box was clicked");

        if (turnO) {
            box.innerText = "O";
            turnO = false;
        } else {
            box.innerText = "X";
            turnO = true;
        }
        box.disabled = true;

        checkWinner();
        saveGameState();
    });
});

const showWinner = (winner) => {
    msg.innerHTML = `Congratulations, the winner is ${winner}`;
    msgContainer.classList.remove("hide");

    // Disable all boxes 
    boxes.forEach((box) => {
        box.disabled = true;
    });
};

const checkWinner = () => {
    let isDraw = true;
    for (let pattern of winPatterns) {
        let pos1Val = boxes[pattern[0]].innerText;
        let pos2Val = boxes[pattern[1]].innerText;
        let pos3Val = boxes[pattern[2]].innerText;

        if (pos1Val !== "" && pos2Val !== "" && pos3Val !== "") {
            if (pos1Val === pos2Val && pos2Val === pos3Val) {
                console.log("Winner", pos1Val);
                showWinner(pos1Val);
                return;
            }
        }
    }
    
    // Check for a draw
    boxes.forEach((box) => {
        if (box.innerText === "") {
            isDraw = false;
        }
    });
    
    if (isDraw) {
        msg.innerHTML = "No winner found, it's a draw!";
        msgContainer.classList.remove("hide");
    }
};

// Function to save the game state 
const saveGameState = () => {
    localStorage.setItem("turnO", JSON.stringify(turnO));
};