var gamePattern = [];
var userClickedPattern = [];
var buttonColors = ["red", "blue", "green", "yellow"];
var gameLevel = 0;
var started = false;


$(document).keypress(function(event) {
  if (gameLevel === 0) {
    started = true;
    nextSecuence();
  } else {
    //
  }
});

function nextSecuence() {
  let randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColor = buttonColors[randomNumber];
  var buttonId = "#" + randomChosenColor;
  var soundName = getSoundName(randomChosenColor);
  $(buttonId).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(soundName);
  gameLevel++;
  $("h1").text("Level " + gameLevel);

  gamePattern.push(randomChosenColor);
  console.log("GAME: " + gamePattern);
  userClickedPattern = [];

  return randomNumber;
}



$(".btn").click(function() {
  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);
  $(this).fadeIn(100).fadeOut(100).fadeIn(100);
  var soundName = getSoundName(userChosenColour);
  playSound(soundName);

  checkAnswer(userClickedPattern.length - 1);
});

function playSound(soundName) {
  var soundPlay = new Audio(soundName).play();
}

function getSoundName(idName) {
  return "sounds/" + idName + ".mp3";
}

function checkAnswer(gameLevel) {
  if (userClickedPattern[gameLevel] === gamePattern[gameLevel]) {

    //check if finished nextSecuence
    if (userClickedPattern.length === gamePattern.length) {

      // call nextSecuence after a delay
      setTimeout(function() {
        nextSecuence();
      }, 1000);
    }
  } else {
    gameOver();
  }
}

function gameOver() {
  var gameOverSound = new Audio("sounds/wrong.mp3");
  gameOverSound.play();
  $("body").addClass("game-over");
  // remove the applied style after a little time
  setTimeout(function() {
    $("body").removeClass("game-over");
  }, 200);
  gameLevel = 0;
  gamePattern = [];
  started = false;
  $("h1").text("GAME OVER! Press Any Key to Restart");
}
