const userClickedPattern=[];//store the id's of the buttons pressed by the user
const gamePattern = []; //store the id's of the buttons that are choosen randomly
const buttonColors = ["red", "blue", "green", "yellow"];
var level=1;
var count=0;
var ans=true;

//randomly choose a colour from buttonColors array and play sound accordingly
function nextSequence() {
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);  //add element to the array

    $("#" + randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100); //flash the button selected
    
    playSound(randomChosenColor);  //playsound 


    $("h1").text("Level " +level);
    level++;

    userClickedPattern.length=0;
    
}


//select the button pressed by the user

$(".btn").click(function(event){
    var userChosenColor = event.target.id;
    userClickedPattern.push(userChosenColor); //add element in the array
    playSound(userChosenColor); //play sound
    animatePress(userChosenColor); //animate
    checkAnswer(userClickedPattern.length-1); // for checking the ans
    
})

//make sound when user click a button
function playSound(name){
    var audio=new Audio("sounds/" + name + ".mp3");
    audio.play();
}

//animate the buttons pressed

function animatePress(currentColor){
    $("#" + currentColor).addClass("pressed");//add the new class
    setTimeout(function(){
        $("#" + currentColor).removeClass("pressed");
    }, 120); //remove the new class after a timeout
}


//start the game
$(document).keypress(function(){
    count++;
    if (count === 1){
       setTimeout(function(){
        nextSequence();
       },1000);
    }
})



function checkAnswer(currentLevel) {
    // Check if the user's sequence up to the current level matches the game's sequence
    if (userClickedPattern[currentLevel] === gamePattern[currentLevel] ) {
        // Check if the user has completed the entire sequence for the current level
        if (userClickedPattern.length === gamePattern.length) {
            // User has completed the sequence, proceed to the next level
            setTimeout(function () {
                nextSequence();
            }, 1000);
        }
    } else {
        playSound("wrong");
        $("*").addClass("game-over");
        setTimeout(function(){
            $("*").removeClass("game-over");
        },200);
        $("h1").text("Game Over ! For Restart Reload the Page ! ");
    }
}










