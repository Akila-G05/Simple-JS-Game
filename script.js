
var runsound = new Audio("run.mp3");
var jumpsound = new Audio("jump.mp3");
var deadsound = new Audio("dead.mp3");


function keycheck(event) {
    var keycode = event.which;

    if (keycode == 13) {    //Enter
        if (runWorker == 0) {
            runWorker = setInterval(run, 100);
            runsound.play();

            backgroundWorker = setInterval(background, 100);
            scoreWorker = setInterval(updatescore, 100)

            boxworker = setInterval(moveboxes, 100);
        }

        document.getElementById("welcome").style.visibility = "hidden";

    }

    if (keycode == 32) {    //Space
        if (jumpWorker == 0) {
            clearInterval(runWorker);
            runsound.pause();

            jumpWorker = setInterval(jump, 120);
            jumpsound.play();
        }

        document.getElementById("welcome").style.visibility = "hidden";
    }
}



//run
var runImageNumber = 0;
var runWorker = 0;

function run() {
    runImageNumber = runImageNumber + 1;

    if (runImageNumber == 9) {
        runImageNumber = 1;
    }

    document.getElementById("boy").src = "Run (" + runImageNumber + ").png"
}



//backgroundMove
var backgroundPositionX = 0;
var backgroundWorker = 0;

function background() {
    backgroundPositionX = backgroundPositionX - 20;

    document.getElementById("background").style.backgroundPositionX = backgroundPositionX + "px";
}



//jump
var jumpImageNumber = 1;
var jumpWorker = 0;

var boyMarginTop = 357;

function jump() {

    if (jumpImageNumber <= 6) {
        boyMarginTop = boyMarginTop - 20;
        document.getElementById("boy").style.marginTop = boyMarginTop + "px";
    }

    if (jumpImageNumber >= 7) {
        boyMarginTop = boyMarginTop + 20;
        document.getElementById("boy").style.marginTop = boyMarginTop + "px";
    }


    jumpImageNumber = jumpImageNumber + 1;

    if (jumpImageNumber == 13) {
        jumpImageNumber = 1;
        clearInterval(jumpWorker);
        runWorker = setInterval(run, 100);
        runsound.play();
        jumpWorker = 0;
    }

    if (backgroundWorker == 0) {
        backgroundWorker = setInterval(background, 100);
    }

    if (scoreWorker == 0) {
        scoreWorker = setInterval(updatescore, 100);
    }

    if (boxworker == 0) {
        boxworker = setInterval(moveboxes, 100);
    }

    document.getElementById("boy").src = "Jump (" + jumpImageNumber + ").png"
}



//score
var score = 0;
var scoreWorker = 0;

function updatescore() {
    score = score + 10;

    document.getElementById("score").innerHTML = score;
}



var bml = 150;

function createboxes() {
    for (var i = 0; i < 20; i++) {


        var box = document.createElement("div");
        box.className = "box";
        box.id = "box" + i;

        if (i <= 5) {
            bml = bml + 450;
        }

        if (i <= 5) {
            bml = bml + 200;
        }

        if (i <= 6) {
            bml = bml + 250;
        }

        if (i <= 8) {
            bml = bml + 260;
        }



        box.style.marginLeft = bml + "px";

        document.getElementById("background").appendChild(box);
    }
}


var boxworker = 0;

function moveboxes() {
    for (var i = 0; i < 20; i++) {
        var newbox = document.getElementById("box" + i);
        var boxml = getComputedStyle(newbox).marginLeft;
        var newboxml = parseInt(boxml) - 25;
        newbox.style.marginLeft = newboxml + "px"; 

        // alert(newboxml);
        // 180 - 60

        if (newboxml >= 60 & newboxml <= 160) {

            if (boyMarginTop > 322) {

                clearInterval(runWorker);
                runWorker = -1;
                runsound.pause();

                clearInterval(jumpWorker);
                jumpWorker = -1;
                jumpsound.pause();

                clearInterval(backgroundWorker);
                backgroundWorker = -1;

                clearInterval(boxworker);
                boxworker = -1;

                clearInterval(scoreWorker);
                scoreWorker = -1;

                deadWorker = setInterval(dead, 100);
                deadsound.play();

            }
        }
    }
}


var deadImageNumber = 1;
var deadWorker = 0;

function dead() {
    deadImageNumber = deadImageNumber + 1;

    if (deadImageNumber == 11) {
        deadImageNumber = 10;
        document.getElementById("boy").style.marginTop = "357";
        document.getElementById("end").style.visibility = "visible";
        document.getElementById("endscore").innerHTML = score;

    }

    document.getElementById("boy").src = "Dead (" + deadImageNumber + ").png"
}

function reload() {
    location.reload();
}

document.getElementById("")



