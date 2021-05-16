// alert("Welcome!");

var buttonColours = ["red","blue","green","yellow"];
var gamePattern = [];
userClickedPattern = [];

var started = false;

var level = 0;

$(document).keypress(function(){
  if(started === false)
  {
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }
});

$(".btn").click(function(){
  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);

  playSound(userChosenColour);
  animatePress(userChosenColour);

  var lastIndex = userClickedPattern.length-1;
  checkAnswer(lastIndex);
});


function checkAnswer(currentLevel){
  if(userClickedPattern[currentLevel] === gamePattern[currentLevel])
  {

  if(userClickedPattern.length === gamePattern.length )
  {
    setTimeout(function(){
      nextSequence();
    },1000);
  }
}
  else {
  var audio = new Audio("sounds/wrong.mp3");
  audio.play();
  $("body").addClass("game-over");
  setTimeout(function(){
    $("body").removeClass("game-over");
  },200);
  $("#level-title").text("Level " + level+ "\n"+  " Game Over, Press Any Key to Restart"  );
  startOver();
}

}

function nextSequence()
{
    userClickedPattern = [];
  level++;
  $("#level-title").text("Level "+ level);
  var randomNumber = Math.floor(Math.random()*4);

var randomChosenColour = buttonColours[randomNumber];
gamePattern.push(randomChosenColour);

$( "#"+randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
playSound(randomChosenColour);
}

function startOver(){
  level = 0;
  started = false;
  gamePattern = [];
}


function playSound(name)
{
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function animatePress(currentColour){
  $("#" + currentColour).addClass("pressed");
  setTimeout(function(){
    $("#" + currentColour).removeClass("pressed");
  },100);
}
