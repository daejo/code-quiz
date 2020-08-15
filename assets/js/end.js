var username = document.getElementById("username");
var submitScore = document.getElementById("submitScore");
var finalScore = document.getElementById("finalScore");
var mostRecentScore = localStorage.getItem("mostRecentScore");
finalScore.innerText = mostRecentScore;

saveHighScore = e => {
    console.log("clicked the save button!");
    e.preventDefault();
};

username.addEventListener("keyup", () =>{ //Makes Submit Button unaccessible without name input
    console.log(username.value);
    submitScore.disabled = !username.value;
});
 