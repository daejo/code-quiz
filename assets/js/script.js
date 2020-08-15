var question = document.getElementById("question");
var choices = Array.from(document.getElementsByClassName("choice-text"));
var scoreText = document.getElementById("score");
var startButton = document.getElementById("start"); //Links html start button with variable.
var timerEl = document.querySelector("#timer"); //Links timer display with variable 
var quizTime = 180; //Number of seconds 180seconds
var score = []; //Scoreboard
var right; //Number of correct answers
var wrong; //Number of incorrect answers
var CORRECT_BONUS = 10;
var DECREMENT_TIME = 10;
var MAX_QUESTIONS = 5;
var currentQuestion = {};
var acceptingAnswers = true;
var score = "0";
var questionCounter = 0;
var availableQuestions = [];

var questions = [ //Questions array
    {
        question: "A very useful tool used during development and debugging for printing content to the debugger is:",
        choice1: "JavaScript",
        choice2: "terminal/bash",
        choice3: "for loops",
        choice4: "console.log",
        answer: 4
    },
    {
        question: "Commonly used data types DO NOT INCLUDE:",
        choice1: "strings",
        choice2: "booleans",
        choice3: "alerts",
        choice4: "numbers",
        answer: 3
    },
    {
        question: "The condition in an if/else statement is enclosed with _____.",
        choice1: "quotes",
        choice2: "curly brackets",
        choice3: "parenthesis",
        choice4: "square brackets",
        answer: 3 
    },
    {
        question: "String values must be enclosed within _____ when being assigned to variables.",
        choice1: "commas",
        choice2: "curly brackets",
        choice3: "quotes",
        choice4: "parenthesis",
        answer: 3  
    },
    {
        question: "Arrays in JavaScript can be used to store:",
        choice1: "numbers and strings",
        choice2: "other arrays",
        choice3: "booleans",
        choice4: "all of the above",
        answer: 4
    }
]

function startTimer() { //Timer function
    var timeInterval = setInterval(function() { //Sets up seconds timer. 1second = 1000milliseconds
    if (quizTime > 1) {
        timerEl.textContent = quizTime;
        quizTime--;
    } else if (quizTime === 1) {
        timerEl.textContent = quizTime;
        quizTime--;
    } else {
        timerEl.textContent = "";
        clearInterval(timeInterval);
        alert("YOU RAN OUT OF TIME! TRY AGAIN.");
        location.reload() //Reloads page when time runs out.
    }
    }, 1000);
};

function startGame() { //Starts and resets game.
    questionCounter = 0;
    score = 0;
    availableQuestions = [...questions];
    getNewQuestion();
};

function getNewQuestion() { //Loads next question.

    if(availableQuestions.length === 0 || questionCounter > MAX_QUESTIONS) {
        localStorage.setItem("mostRecentScore", score);

        return window.location.assign("/end.html")
    }

    questionCounter++;
    var questionIndex = Math.floor(Math.random() * availableQuestions.length); //Function to get random questions
    currentQuestion = availableQuestions[questionIndex];
    question.innerText = currentQuestion.question;

    choices.forEach( choice => {
       var number = choice.dataset["number"];
       choice.innerText = currentQuestion["choice" + number];  
    });

    availableQuestions.splice(questionIndex, 1);

    acceptingAnswers = true;
};

choices.forEach(choice => { //function for choices made.
    choice.addEventListener("click", e => {
        if (!acceptingAnswers) return;

        acceptingAnswers = false;
        var selectedChoice = e.target;
        var selectedAnswer = selectedChoice.dataset["number"];

        var classToApply = //changes the classes accordingly if its correct or incorrect.
            selectedAnswer == currentQuestion.answer ? "correct" : "incorrect";

            if(classToApply === "correct") {
                incrementScore(CORRECT_BONUS);
            }else if(classToApply === "incorrect") {
                decrementScore(DECREMENT_TIME);
            };

        selectedChoice.parentElement.classList.add(classToApply); //Changes choice color depending if its right or wrong.
        setTimeout ( () => {
            selectedChoice.parentElement.classList.remove(classToApply);
            getNewQuestion();
        }, 1000);
        
    });
});

incrementScore = num => {
    score += num;
    scoreText.innerText = score;
}

decrementTime = num => {
    timer -= num;
    timerEl.innerText = timer;
}

startGame();
startTimer();

 