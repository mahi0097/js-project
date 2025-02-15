const QuesTions = [
    {
        question: "What is the capital of France?",
        answers: [
            { text: "Berlin", correct: false },
            { text: "Paris", correct: true },
            { text: "London", correct: false },
            { text: "Rome", correct: false },
        ]
    },
    {
        question: "Which planet is known as the 'Red Planet'?",
        answers: [
            { text: "Earth", correct: false },
            { text: "Mars", correct: true },
            { text: "Jupiter", correct: false },
            { text: "Saturn", correct: false },
        ]
    },
    {
        question: "Who painted the famous painting 'The Starry Night'?",
        answers: [
            { text: "Leonardo da Vinci", correct: false },
            { text: "Claude Monet", correct: false },
            { text: "Pablo Picasso", correct: false },
            { text: "Vincent Van Gogh", correct: true },
        ]
    },
    {
        question: "What is the largest mammal on Earth?",
        answers: [
            { text: "Elephant", correct: false },
            { text: "Rhinoceros", correct: false },
            { text: "Blue whale", correct: true },
            { text: "Hippopotamus", correct: false },
        ]
    },
    {
        question: "Which programming language is known for its simplicity and readability?",
        answers: [
            { text: "Python", correct: true },
            { text: "Java", correct: false },
            { text: "C", correct: false },
            { text: "Ruby", correct: false },
        ]
    },
];

const quest_Button = document.getElementById("question");
const answer_btun = document.querySelector(".box");
const next_btun = document.querySelector(".next");
let current_index = 0;
let score = 0;

function start_quiz() {
    current_index = 0;
    score = 0;
    next_btun.innerHTML = "Next";
    show_question();
}

function show_question() {
    reset_state();
    let currentQuestion = QuesTions[current_index];
    let QuestNo = current_index + 1;
    quest_Button.innerHTML = QuestNo + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("boxButn");

        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }

        button.addEventListener("click", () => check_answer(answer.correct, button));
        answer_btun.appendChild(button);
    });

    next_btun.style.display = "none";
}

function check_answer(isCorrect, button) {
    if (isCorrect) {
        button.classList.add("correct");
        score++;  // Increase score if correct
    } else {
        button.classList.add("incorrect");
    }

    // Disable all buttons and highlight correct one
    Array.from(answer_btun.children).forEach(butun => {
        if (butun.dataset.correct === "true") {
            butun.classList.add("correct");
        }
        butun.disabled = true;
    });

    next_btun.style.display = "block";
}

next_btun.addEventListener("click", () => {
    current_index++;
    if (current_index >= QuesTions.length) {
        quest_Button.innerHTML = `You got ${score} out of ${QuesTions.length}`;
        answer_btun.innerHTML = "";  // Clears the answer buttons
        quest_Button.style.fontSize = "24px"; // Increase font size for visibility
        quest_Button.style.fontWeight = "bold"; // Make score bold

        next_btun.style.display = "none"; 
    } else {
        show_question();
    }
});

function reset_state() {
    next_btun.style.display = "none";
    while (answer_btun.firstChild) {
        answer_btun.removeChild(answer_btun.firstChild);
    }
}

start_quiz();
