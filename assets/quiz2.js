// Starting Variables
var mainEl = document.querySelector("#main");
var timerEl = document.querySelector("#timer");
var timeLeft = 75;
var totalPoints = 0;
var end = false;

    // Global Functions for use in questions
var points = function() {
    totalPoints = totalPoints + 10;
    console.log("You have " + totalPoints + " points!");
}
var timer = function() {
    var timeInterval = setInterval(() => {
        if (end === false) {
            timerEl.textContent = timeLeft;
            timeLeft --;
            return timeLeft;
        } else {
            timerEl.textContent = "";
            clearInterval(timeInterval);
        }
    }, 1000);
    
    console.log("TIMER STARTED")
    if (end === true){
        timerEl.textContent = timeLeft;
    }
}

var start = function() {
    //div
var container = document.createElement("div");
container.className = "main-contain"
mainEl.appendChild(container);

    // Title
var hHead = document.createElement("h1");
hHead.className = "main-t";
hHead.textContent = "Welcome to the MV: Coding Quiz!";
container.appendChild(hHead);

    // Paragraph
var hPara = document.createElement("p");
hPara.className = "main-p";
hPara.textContent = "The following consists of 5 coding-based questions to answer. There's a time limit, and a penalty for each incorrect answer. Do you think you can get full marks? " +
"Press Get Started to begin."
container.appendChild(hPara);

    // start quick button
var startQuiz = document.createElement("button");
startQuiz.className = "start-btn";
startQuiz.textContent = "Get Started";
container.appendChild(startQuiz);

var hScore = document.createElement("button");
hScore.className = "view-hs";
hScore.textContent = "View High Scores";
container.appendChild(hScore);

    // removes home page elements
startQuiz.addEventListener("click", event => {
    timer();
    startQuiz.remove();
    hHead.remove();
    hPara.remove();
    hScore.remove();
    question();
});
}
start();

var highScores = function() {
        //div
    var highScoreContainer = document.createElement("div");
    highScoreContainer.className = "hs-contain";
    mainEl.appendChild(highScoreContainer);

    // high Score TITLE
    var title = document.createElement("h1");
    title.className = "view-hs";
    title.textContent = "View High Scores";
    highScoreContainer.appendChild(title);

    //displays high scores
        // displays player scores
    var initals = localStorage.getItem("initals");
    var score = localStorage.getItem("score");
    var leaderboardScore = document.createElement("p");
    leaderboardScore.className = "leaderboard-score";
    leaderboardScore.textContent = "1." + initals + " - " + score;
    highScoreContainer.appendChild(leaderboardScore);


        //div
    var leaderboard = document.createElement("div");
    leaderboard.className = "leaderboard";
    highScoreContainer.appendChild(leaderboard);
        //button "GO BACK"
    var goBack = document.createElement("button");
    goBack.className = "go-back-btn";
    goBack.textContent = "Go Back";
    goBack.addEventListener("click", event => {
        totalPoints = 0;
        end = false;
        timeLeft = 75;
        highScoreContainer.remove();
        start();
    })
    leaderboard.appendChild(goBack);
        // button "CLEAR HIGH SCORE"
    var clearHighScore = document.createElement("button");
    clearHighScore.className = "clear-hScore";
    clearHighScore.textContent = "Clear High Scores";
    clearHighScore.addEventListener("click", event => {
        //remove score from local storage
        localStorage.removeItem("initals")
        //remove initals from local storage
        localStorage.removeItem("score")
        //remove score from leaderboard
        leaderboardScore.remove();
    })
    leaderboard.appendChild(clearHighScore);
}

 /* End Score Result Entering */
var enterScore = function() {
    var doneContainer = document.createElement("div");
    doneContainer.className = "done-container";
    mainEl.appendChild(doneContainer);

    var done = document.createElement("h1");
    done.textContent = "All Done!";
    done.className = "done-title";
    doneContainer.appendChild(done);
  
    var score = document.createElement("h4");
    score.textContent = "Your final score is " + totalPoints;
    score.className = "score";
    doneContainer.appendChild(score); 

 
    var inputContainer = document.createElement("div");
    inputContainer.className = "input-container";
    doneContainer.appendChild(inputContainer);

 
    var label = document.createElement("label");
    label.textContent = "Enter Initials:";
    label.className = "label";
    label.setAttribute("for", "input");
    inputContainer.appendChild(label);
  
    var initalInput = document.createElement("Input");
    initalInput.className = "score-input";
    initalInput.setAttribute("id", "input")
    initalInput.setAttribute("name", "input");
    initalInput.setAttribute("type", "text");
    inputContainer.appendChild(initalInput);
 
    var submit = document.createElement("button");
    submit.textContent = "Submit";
    submit.className = "submit";
    submit.addEventListener("click", event => {
            // retreives user input
        var initals = document.getElementById("input").value;
        //store score in local storage
        localStorage.setItem("initals", initals);
        //store initals in local storage
        localStorage.setItem("score", totalPoints);
            // remove page content
        doneContainer.remove();
        //move to next page
        highScores();
    })
    inputContainer.appendChild(submit);
}

    /*End of Results */

const questions = [ 
    {
        question: "Commonly used data types DO Not include:",
        answers: ["1. Strings",
        "2. Booleans",
         "3. Alerts",
          "4. Numbers"],
        correctAnswer: "2"
    },
    {
        question: "The condition in an if / else statement is enclosed within _______.",
        answers: ["1. Quotes",
         "2. Curly brackets",
          "3. Parentheses",
           "4. Square Brackets"],
        correctAnswer: "1"
    },
    {
        question: "Arrays in Javascript can be used to store ______.",
        answers: ["1. Numbers and Strings",
         "2. Other Arrays",
          "3. Booleans",
           "4. All of the Above"],
        correctAnswer: "3"
    },
    {
        question: "String values must be enclosed within ________ when being assigned to variables.",
        answers: ["1. Commmas",
         "2. Curly brackets",
          "3. Quotes",
           "4. Parentheses"],
        correctAnswer: "2"
    },
    {
        question: "A very useful tool used during development and debugging for printing content to the debugger is:",
        answers: ["1. Javascript", "2. Terminal/Bash", "3. For Loops", "4. Console.log"],
        correctAnswer: "3"
    }
];


