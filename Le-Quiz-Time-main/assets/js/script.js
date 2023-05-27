
var questions = [
    {
        title: "Commonly used data types DO NOT Include:",
        choices: ["strings", "booleans", "alerts", "numbers"],
        answer: "alerts"
    },
    {
        title: "The condition in an if/else statement is enclosed with _______.",
        choices: ["quotes", "curly brackets", "parenthesis", "square brackets"],
        answer: "parenthesis"
    },
    {
        title: "Arrays in JavaScript can be used to store _______.",
        choices: ["numbers and strings", "other arrays", "booleans", "all of the above"],
        answer: "all of the above"
    },
    {
        title: "String values must be enclosed within ______ when being assigned to variables.",
        choices: ["commas", "curly brackets", "quotes", "parenthesis"],
        answer: "quotes"
    },
    {
        title: "A very useful tool used during development and debugging for printing content to the debugger is:",
        choices: ["Javascript", "terminal/bash", "for loops", "console.log"],
        answer: "console.log"
    },
    
];


var score = 0;
var questionIndex = 0;

var questionsEl = document.querySelector("#questions");
var timerEl = document.querySelector("#currentTime");
var choicesEl = document.querySelector("#choices");
var submitBtn = document.querySelector("#submit");
var startBtn = document.querySelector("#start");
var initialsEl = document.querySelector("#initials");
var timerId;

var secondsLeft = 75;


function startQuiz(){
    document.querySelector("#start-screen").setAttribute("class", "hide");
    questionsEl.removeAttribute("class");
    timerId = setInterval(countdown, 1000);
    timerEl.textContent = secondsLeft;
    render();
}

function countdown() {
    secondsLeft --;
    timerEl.textContent = secondsLeft;
    if (secondsLeft <= 0) {
        allDone();
    };
}


function render() {
    var currentQuestion = questions [questionIndex];
    document.querySelector("#question-title").textContent = currentQuestion.title;
    choicesEl.innerHTML = ""

    for (var i = 0; i < currentQuestion.choices.length; i++) {
    var choice = currentQuestion.choices [i];
    var button = document.createElement("button");
    button.setAttribute("class", "choice");
    button.setAttribute("value", choice);
    button.textContent = i + 1 + ". " + choice;
    choicesEl.appendChild(button);
    }
}


function compare(event) {
    var element = event.target;

    if (!element.matches(".choice")) {
        return
    }

        if (element.value !== questions[questionIndex].answer) {
            secondsLeft -= 10;
            if (secondsLeft < 0) {
                secondsLeft = 0
            }
            // createDiv.textContent = "Correct! The answer is: " + questions[questionsIndex].answer;

        }else{
            score ++
            // createDiv.textContent = "Wrong! the answer is: " + questions[questionsIndex].answer;
        }
    questionIndex++;
    
    if (secondsLeft <= 0 || questionIndex === questions.length) {
        allDone();
        // createDiv.textContent = "End of the Quiz!" + " " + "You got " + score + "/" + questions.length + "Correct!";
    }else{
        render();
    }
}


function allDone(){
    questionsDiv.innerHTML = "";
    currentTime.innerHTML = "";

    var createH1 = document.createElement("h1");
    createH1.setAttribute("id", "createH1");
    createH1.textContent = "All Done!"

    questionsDiv.appendChild(createH1);
}

function saveHighscore() {
    var initials = initialsEl.value.trim();

    if (initials !== '') {
        var highScore =
          JSON.parse(window.localStorage.getItem('Highscores')) || [];

        var newScore = {
            score: time,
            initials: initials,
        };

        // to save to local storage
        highScore.push(newScore);
        window.localStorage.setItem('highscore', JSON.stringify(highScore));

        // to redirect to the next page
        window.location.href = 'highScore.html';
    }
}

function checkForEnter(event) {
    if (event.key === 'Enter') {
        saveHighscore();
    }
}

var createP = document.createElement("p");
createP.setAttribute("id", "createP");

questions.appendChild(createP);

if (secondsLeft >= 0) {
    var timeRemaining = secondsLeft;
    var createP2 = document.createElement("p");
    clearInterval(holdInterval);
    createP.textContent = "Your final score is: " + timeRemaining;

    questions.appendChild(createP2);
}


var createLabel = document.createElement("label");
createLabel.setAttribute("id", "createLabel");
createLabel.textContent = "Enter Your Initials: ";

questionsDiv.appendChild(createLabel);


var createInput = document.createElement("input");
createInput.setAttribute("type", "text");
createInput.setAttribute("id", "initials");
createInput.textContent = "";

questionsDiv.appendChild(createInput);


var createSubmit = document.createElement("button");
createSubmit.setAttribute("id", "Submit");
createSubmit.setAttribute("type", "submit");
createSubmit.textContent = "Submit";

questions.appendChild(createSubmit);

// 
createSubmit.addEventListener("click", function () {
    var initials = createInput.value;

    if (initials === null) {
        // 
        initials.addEventListener('click', )
        // 
        console.log("No value entered!");
    }else{
        var finalScore = {
            initials: initials,
            score: timeRemaining
        }
        console.log(finalScore);

        var allScores = localStorage.getItem("allScores");
        if (allScores === null) {
            allScores = [];
        }else{
            allScores = JSON.parse(allScores);
        }
        allScores.push(finalScore);
        
        var newScore = JSON.stringify(allScores);
        localStorage.setItem("allScores", newScore);

        window.location.replace("./highScore.html");
    }
});

submitBtn.onclick = saveHighscore;

startBtn.onclick = startQuiz;

choicesEl.onclick = questionsEl;

initialsEl.onkeyup = checkForEnter;

import { highScore, clear, goBack, allScores, createLi } from './highScore';
