var time = document.querySelector(".timer");
var score = document.querySelector("#score");
var secondsLeft = 75;

const start = document.querySelector("#start");
const codersIntro = document.querySelector("#started");

var questionsEl = document.querySelector(".all-question");
let questionEl = document.querySelector("#question");
const ansWrong = document.querySelector("#choice");
let questionCount = 0;

const fEl = document.querySelector("#final-score");
let nameInput = document.querySelector("#name");
let resultAns = document.querySelector("#result-ans");

const hscoreEl = document.querySelector("#high-scores");
let scoreListEl = document.querySelector(".score-list");
let scoreList = [];

let submitScr = document.querySelector("#submit-score");
let clearScr = document.querySelector("#clearScores");
let viewScr = document.querySelector("#view-scores");
let goBack = document.querySelector("#goBack");

const ans = document.querySelectorAll("button.answer")

const ans1 = document.querySelector("#answer-1");
const ans2 = document.querySelector("#answer-2");
const ans3 = document.querySelector("#answer-3");
const ans4 = document.querySelector("#answer-4");

const questions = [ 
    {
        question: "A very useful tool used during development and debugging for printing content to the debugger is:",
        answers: ["1. Javascript",
         "2. Console.log",
          "3. For Loops",
           "4. Terminal/Bash"],
        rightAnswer: "3"
    },
    {
        question: "The condition in an if / else statement is enclosed within _______.",
        answers: ["1. Quotes",
         "2. Curly brackets",
          "3. Parentheses",
           "4. Square Brackets"],
        rightAnswer: "1"
    },
    {
        question: "Arrays in Javascript can be used to store ______.",
        answers: ["1. Numbers and Strings",
         "2. Other Arrays",
          "3. Booleans",
           "4. All of the Above"],
        rightAnswer: "3"
    },
    {
        question: "String values must be enclosed within ________ when being assigned to variables.",
        answers: ["1. Parentheses",
         "2. Quotes",
          "3. Curly brackets",
           "4. Commmas"],
        rightAnswer: "2"
    }
];


function setTime() {
    let timerInterval = setInterval(function () {
        secondsLeft--;
        time.textContent = `Time: ${secondsLeft} sec`;

        if (secondsLeft === 0 || questionCount === questions.length) {
            clearInterval(timerInterval);
            questionsEl.style.display = "none";
            fEl.style.display = "block";
            score.textContent = secondsLeft;
        }
    }, 1000);
}


function startQuiz() {
    codersIntro.style.display = "none";
    questionsEl.style.display = "block";
    questionCount = 0;

    setTime();
    setQuestion(questionCount);
}


function setQuestion(id) {
    if (id < questions.length) {
        questionEl.textContent = questions[id].question;
        ans1.textContent = questions[id].answers[0];
        ans2.textContent = questions[id].answers[1];
        ans3.textContent = questions[id].answers[2];
        ans4.textContent = questions[id].answers[3];
    }
}

function checkAnswer(event) {
    event.preventDefault();
 
    ansWrong.style.display = "block";
    let p = document.createElement("p");
    ansWrong.appendChild(p);
 
    setTimeout(function () {
        p.style.display = 'none';
    }, 3000);

    if (questions[questionCount].rightAnswer === event.target.value) {
        p.textContent = "That was right!";
    } 
    else if (questions[questionCount].rightAnswer !== event.target.value) {
        secondsLeft = secondsLeft - 10;
        p.textContent = "That was incorrect.";
    }
    if (questionCount < questions.length) {
        questionCount++;
    }
    setQuestion(questionCount);
}

function addScore(event) {
    event.preventDefault();

    fEl.style.display = "none";
    hscoreEl.style.display = "block";

    let init = nameInput.value.toUpperCase();
    scoreList.push({ name: init, score: secondsLeft });


    scoreList = scoreList.sort((a, b) => {
        if (a.score < b.score) {
          return 1;
        } else {
          return -1;
        }
      });
    
    scoreListEl.innerHTML="";
    for (let i = 0; i < scoreList.length; i++) {
        let li = document.createElement("li");
        li.textContent = `${scoreList[i].name}: ${scoreList[i].score}`;
        scoreListEl.append(li);
    }
    storeScores();
    displayScores();
}

function storeScores() {
    localStorage.setItem("scoreList", JSON.stringify(scoreList));
}

function displayScores() {
    let storedScoreList = JSON.parse(localStorage.getItem("scoreList"));
    if (storedScoreList !== null) {
        scoreList = storedScoreList;
    }
}

function clearScores() {
    localStorage.clear();
    scoreListEl.innerHTML="";
}

start.addEventListener("click", startQuiz);

ans.forEach(item => {
    item.addEventListener('click', checkAnswer);
});

submitScr.addEventListener("click", addScore);

goBack.addEventListener("click", function () {
    hscoreEl.style.display = "none";
    codersIntro.style.display = "block";
    secondsLeft = 75;
    time.textContent = `Time:${secondsLeft}s`;
});


if (score > 50) {
    resultAns.textContent = 'You scored a perfect score. Good work!';
    container.appendChild(resultAns);
}

clearScr.addEventListener("click", clearScores);

viewScr.addEventListener("click", function () {
    if (hscoreEl.style.display === "none") {
        hscoreEl.style.display = "block";
    } 
    else if (hscoreEl.style.display === "block") {
        hscoreEl.style.display = "none";
    } 
    else {
        return alert("There's no high scores yet. Fill the list with some attempts!");
    }
});

