
var buttonColors=["red","blue","green","yellow"];
var gamePattern=[];
var userClickedPattern=[];
var level=0;//level of the game
var started=false;//default start
$(document).keypress(function(){
    if(!started){
        $("h1").text("Level "+level);
        nextSequence();//new func to keep track of game start or not
        started=true;
    }
});



//check which buuton clicked by user
$(".btn").click(function() {
    var userChosenColour=$(this).attr("id");
    userClickedPattern.push(userChosenColour);
    //add effects to chosen colour fade and sound
    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length-1);
});


//checking the answer
function checkAnswer(curlevel){
    //check if the most recent answer same as game pattern right most
    if(userClickedPattern[curlevel]===gamePattern[curlevel]){
        console.log("succes");
        //check if user has finshed the sequence
        if(userClickedPattern.length===gamePattern.length){
            setTimeout(function(){
                nextSequence();
            },1000);
        }
    }
    else{
        console.log("wrong");
        playSound("wrong");
        $("body").addClass("game-over");
        setTimeout(function() {
            $("body").removeClass("game-over");
        },200);
        $("#level-title").text("Game Over! Press Any key to restart");
        gamePattern=[];
        level=0;started=false;
    }
}
//next sequence function
function nextSequence(){
    userClickedPattern=[];
    level+=1;
    $("#level-title").text("Level "+level);
    var randNumber=Math.floor(Math.random()*4);//chose random no.
    var randomChosenColour=buttonColors[randNumber];// according ot random no. select color sing color array
    gamePattern.push(randomChosenColour);//add the rand colour to pattern
    console.log(randomChosenColour);
    $("#"+randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    //add effects to chosen colour fade and sound
   playSound(randomChosenColour);
}
function playSound(color){
    //add effects to chosen colour fade and sound
   
    var audio=new Audio("sounds/"+color+".mp3");
    audio.play();
}
function animatePress(curcolor){
    $("#"+curcolor).addClass("pressed");
    setTimeout(function(){
        $("#"+curcolor).removeClass("pressed");
    },100);
}
