document.addEventListener("DOMContentLoaded", () => {
    const choices = document.querySelectorAll(".img");
    const scoreElement = document.querySelector(".score-box");
    const userScoreElement = document.querySelector(".your-score");
    const compScoreElement = document.querySelector(".comp-score");
    const resetButton = document.querySelector(".reset-btn");

    let userScore = 0;
    let compScore = 0;

    // Initialize scores to 0 when the page loads
    userScoreElement.innerHTML = userScore;
    compScoreElement.innerHTML = compScore;

    // Function to display the winner
    const showWinner = (userWin) => {
        if (userWin) {
            scoreElement.innerHTML = "You won this match!";
            userScore++;
            userScoreElement.innerHTML = userScore;
        } else {
            scoreElement.innerHTML = "You lost this match!";
            compScore++;
            compScoreElement.innerHTML = compScore;
        }
    };

    // Function to handle a draw
    const drawFun = () => {
        scoreElement.innerHTML = "This round was a draw!";
    };

    // Function to get the computer's choice
    const compInput = () => {
        const choices = ["rock", "paper", "scissors"];
        const compChoiceIndex = Math.floor(Math.random() * 3);
        return choices[compChoiceIndex];
    };

    // Main game logic
    const playGame = (userChoice) => {
        const compChoice = compInput();
        if (userChoice === compChoice) {
            drawFun();
        } else {
            let userWin = true;
            if (userChoice === "rock") {
                userWin = compChoice === "paper" ? false : true;
            } else if (userChoice === "paper") {
                userWin = compChoice === "scissors" ? false : true;
            } else {
                userWin = compChoice === "rock" ? false : true;
            }
            showWinner(userWin);
        }
    };

    // Add click event listeners to choices
    choices.forEach((choice, index) => {
        const userChoice = ["rock", "paper", "scissors"][index];
        choice.addEventListener("click", () => {
            playGame(userChoice);
        });
    });

    // Add event listener to reset button
    resetButton.addEventListener("click", () => {
        console.log("Reset button clicked");
        userScore = 0;
        compScore = 0;
        userScoreElement.innerHTML = userScore;
        compScoreElement.innerHTML = compScore;
        scoreElement.innerHTML = " ";
    });
});
