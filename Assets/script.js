
let timeEl = document.querySelector("p.time");
let secondsLeft = 60;
let scoreEl = document.querySelector("#score");
const introEl = document.querySelector("#intro");
const questionsEl = document.querySelector("#questions");
let questionEl = document.querySelector("#question");
let questionCount = 0;
const yaynayEl = document.querySelector("#yaynay");
const finalEl = document.querySelector("#final");
let initialsInput = document.querySelector("#initials");
const highscoresEl = document.querySelector("#highscores");
let scoreListEl = document.querySelector("#score-list");
let scoreList = [];

// buttons
const startBtn = document.querySelector("#start");
const ansBtn = document.querySelectorAll("button.ansBtn")
const ansBtn1 = document.querySelector("#answer1");
const ansBtn2 = document.querySelector("#answer2");
const ansBtn3 = document.querySelector("#answer3");
const ansBtn4 = document.querySelector("#answer4");
const submitBtn = document.querySelector("#submit-score");
const goBackBtn = document.querySelector("#goback");
const clearScrBtn = document.querySelector("#clearscores");
const viewScoresBtn = document.querySelector("#view-scores");

// Questions
const questions = [ // array of objects
    {
        question: "Which of the following is considered the programming language of the internet?",
        answers: ["JavaScript", "C#", "SQL", "AWS"],
        answer: "0"
    },
    {
        question: "What is the index of the first element in an array?",
        answers: ["1", "0", "array.length", "undefined"],
        answer: "1"
    },
    {
        question: "Which of these is NOT a flex direction property?",
        answers: ["row", "column", "wrap", "column-reverse"],
        answer: "2"
    },
    {
        question: "HTML is an acronym for:",
        answers: ["HyperText Markup Language", "HyperText Machine Language", "HyperToken Markup Language", "HyperToken Machine Language"],
        answer: "0"
    },
    {
        question: "In HTML, an ordered list is created using which tag?",
        answers: ["<UL>", "<NL>", "<OL>", "<AL>"],
        answer: "2"
    }
];

// timer
function setTime() {
    let timerInterval = setInterval(function () {
        secondsLeft--;
        timeEl.textContent = `Time:${secondsLeft}s`;

        if (secondsLeft === 0 || questionCount === questions.length) {
            clearInterval(timerInterval);
            questionsEl.style.display = "none";
            finalEl.style.display = "block";
            scoreEl.textContent = secondsLeft;
        }
    }, 1000);
}

// start quiz
function startQuiz() {
    introEl.style.display = "none";
    questionsEl.style.display = "block";
    questionCount = 0;
    setTime();
    setQuestion(questionCount);
}

// function to set question
function setQuestion(id) {
    if (id < questions.length) {
        questionEl.textContent = questions[id].question;
        ansBtn1.textContent = questions[id].answers[0];
        ansBtn2.textContent = questions[id].answers[1];
        ansBtn3.textContent = questions[id].answers[2];
        ansBtn4.textContent = questions[id].answers[3];
    }
}

// function to check answer and then move to next question
function checkAnswer(event) {
    event.preventDefault();

    // show section for yaynay and append message
    yaynayEl.style.display = "block";
    let p = document.createElement("p");
    yaynayEl.appendChild(p);

    // time out after 1 second
    setTimeout(function () {
        p.style.display = 'none';
    }, 1000);

    // answer checker
    if (questions[questionCount].answer === event.target.value) {
        p.textContent = "Correct!";
    } else if (questions[questionCount].answer !== event.target.value) {
        p.textContent = "Wrong!";
    }

    // increment so the questions index is increased
    if (questionCount < questions.length) {
        questionCount++;
    }
    // call setQuestion to bring in next question when any ansBtn is clicked
    setQuestion(questionCount);
}

function addScore(event) {
    event.preventDefault();

    finalEl.style.display = "none";
    highscoresEl.style.display = "block";

    let init = initialsInput.value.toUpperCase();
    scoreList.push({ initials: init, score: secondsLeft });

    // sort scores
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
        li.textContent = `${scoreList[i].initials}: ${scoreList[i].score}`;
        scoreListEl.append(li);
    }
    storeScores();
    displayScores();
}

function storeScores() {
    localStorage.setItem("scoreList", JSON.stringify(scoreList));
}

function displayScores() {
    // Get stored scores
    let storedScoreList = JSON.parse(localStorage.getItem("scoreList"));

    // update list
    if (storedScoreList !== null) {
        scoreList = storedScoreList;
    }
}

// clear scores
function clearScores() {
    localStorage.clear();
    scoreListEl.innerHTML="";
}

// EventListeners
// Start timer and display first question when click start quiz
startBtn.addEventListener("click", startQuiz);

// Check answers loop
ansBtn.forEach(item => {
    item.addEventListener('click', checkAnswer);
});

// Add score
submitBtn.addEventListener("click", addScore);

// Go Back Button
goBackBtn.addEventListener("click", function () {
    highscoresEl.style.display = "none";
    introEl.style.display = "block";
    secondsLeft = 75;
    timeEl.textContent = `Time:${secondsLeft}s`;
});

// Clear the scores
clearScrBtn.addEventListener("click", clearScores);

// View/Hide High Scores Button
viewScoresBtn.addEventListener("click", function () {
    if (highscoresEl.style.display === "none") {
        highscoresEl.style.display = "block";
    } else if (highscoresEl.style.display === "block") {
        highscoresEl.style.display = "none";
    } else {
        return alert("No scores to show.");
    }
});