var username = document.getElementById("username");
var submitScore = document.getElementById("submitScore");
var finalScore = document.getElementById("finalScore");
var mostRecentScore = localStorage.getItem("mostRecentScore");
finalScore.innerText = mostRecentScore;

var highScores = JSON.parse(localStorage.getItem("highScores")) || []; //Convert strings to objects.

saveHighScore = e => {
    console.log("clicked the save button!");
    e.preventDefault();

    var score = {
        score: mostRecentScore,
        name: username.value,
    };
    highScores.push(score);
    highScores.sort((a, b) => b.score - a.score);
    highScores.splice(5);

    localStorage.setItem("highScores", JSON.stringify(highScores)); //Converts objects to Strings
    window.location.assign("./highscore.html");
};


