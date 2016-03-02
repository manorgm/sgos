var c;
var ctx;
var cX = 0;
var cY = 0;
var cWidth = 300;
var cHeight = 300;
var radius = 10;
var radiusApp = 5;
var move = 2;
var currDir;
var lastDir;
var beginGame = false;
var endGame = false;
var locXApp;
var locYApp;
var appCounter = 1;
var changeSize = 3;
var arrSnake = [
    [cWidth / 2, cHeight / 2, radius],
    [cWidth / 2, (cHeight / 2) + move, radius]
];
var arrSnakeTmp = [];
var iPos;
var grd;
var nAmount = 3;

// Initialize canvas and redraw every set interval
function init() {
    c = document.getElementById('mainCanvas');
    c.width = cWidth;
    c.height = cHeight;
    ctx = c.getContext("2d");
    genApple();
    drawCanvas();
}

// Draw default canvas objects
function drawCanvas() {

    // Draw background
    grd = ctx.createLinearGradient(0, 200, 300, 0);
    grd.addColorStop(0, "#00cc00");
    grd.addColorStop(0.5, "#00b300");
    grd.addColorStop(1, "#009900");
    ctx.fillStyle = grd;
    ctx.lineWidth = 3;
    ctx.strokeStyle = 'black';
    drawRect(cX, cY, cWidth, cHeight);

    // Draw the snake
    ctx.fillStyle = 'green';
    ctx.lineWidth = 3;
    ctx.strokeStyle = '#003300';

    // Loop through all snake parts
    for (var i = 0; i < arrSnake.length; i++) {
        drawCircle(arrSnake[i][0], arrSnake[i][1], arrSnake[i][2], 0, 2 * Math.PI);
    }

    // Draw the apple
    ctx.fillStyle = 'red';
    ctx.lineWidth = 2;
    ctx.strokeStyle = 'black';
    drawCircle(locXApp, locYApp, radiusApp, 0, 2 * Math.PI);
}

// Move snake and draw the new canvas
function gameOn() {
    snakeExt();
    checkEnd();
    levelUp();
    clearCanvas();
    drawCanvas();
}

function snakeExt() {

    // Check if apple was eaten
    if (Math.sqrt(Math.pow((arrSnake[arrSnake.length - 1][0] - locXApp), 2) +
            Math.pow((arrSnake[arrSnake.length - 1][1] - locYApp), 2)) <
        (radius + radiusApp)) {
        appCounter += 1;
        genApple();
        iPos = 0;
    } else {
        iPos = 1;
    }

    // Grow snake by amount defined
    for (var i = 0; i < nAmount; i++) {

        // Grow and move snake accordingly
        for (var i = iPos; i < arrSnake.length; i++) {
            if (i == (arrSnake.length - 1)) {
                arrSnakeTmp.push(arrSnake[arrSnake.length - 1].slice());
                moveSnake();
                arrSnakeTmp.push(arrSnake[arrSnake.length - 1].slice());
            } else {
                arrSnakeTmp.push(arrSnake[i].slice());
                arrSnakeTmp[arrSnakeTmp.length - 1][2] = radius / (arrSnake.length / i);
            }
        }
        arrSnake = arrSnakeTmp.slice();
        arrSnakeTmp = [];
    }
}

// Clear current canvas contents
function clearCanvas() {
    ctx.clearRect(cX, cY, cWidth, cHeight);
}

// Draw circles as main snake and apples
function drawCircle(aX, aY, aRat, aSAng, aEAng) {
    ctx.beginPath();
    ctx.arc(aX, aY, aRat, aSAng, aEAng, false);
    ctx.fill();
    ctx.stroke();
}

// Draw main canvas
function drawRect(aX, aY, aWidth, aHeight) {
    ctx.beginPath();
    ctx.rect(aX, aY, aWidth, aHeight);
    ctx.fill();
    ctx.stroke();
}

// Key press listener
function keyPress(evt) {

    // Check if game has begun
    if (!beginGame) {
        beginGame = true;
        var intId = setInterval(gameOn, 10);
    }

    // Checks if opposite directions were entered
    if ((evt.keyCode + 2 != currDir) && (evt.keyCode - 2 != currDir)) {
        currDir = evt.keyCode;
    }
}

function moveSnake() {

    // Check which arrow has been pressed
    switch (currDir) {
        case 38:
            // Up arrow was pressed
            if (arrSnake[arrSnake.length - 1][1] - (radius - move * 2) * 2 <= 0) {
                endGame = true;
            } else {
                arrSnake[arrSnake.length - 1][1] -= move;
            }
            break;
        case 40:
            // Down arrow was pressed
            if (arrSnake[arrSnake.length - 1][1] + (radius - move * 2) * 2 >= cHeight) {
                endGame = true;
            } else {
                arrSnake[arrSnake.length - 1][1] += move;
            }
            break;
        case 37:
            // Left arrow was pressed
            if (arrSnake[arrSnake.length - 1][0] - (radius - move * 2) * 2 <= 0) {
                endGame = true;
            } else {
                arrSnake[arrSnake.length - 1][0] -= move;
            }
            break;
        case 39:
            // Right arrow was pressed
            if (arrSnake[arrSnake.length - 1][0] + (radius - move * 2) * 2 >= cWidth) {
                endGame = true;
            } else {
                arrSnake[arrSnake.length - 1][0] += move;
            }
            break;
    }

    // Chech if the snake hit itself
    checkFailSelf();
}

// Generate random apple location
function genApple() {
    locXApp = Math.random() * 0.9 * cWidth + radius;
    locYApp = Math.random() * 0.9 * cHeight + radius;

    // Check apple is in bounds
    if (locXApp >= cWidth) {
        locXApp - (radius * 2 + move + 1);
    } else if (locYApp >= cHeight) {
        locYApp - (radius * 2 + move + 1);
    }
}

// Checks if snake hit itself
function checkFailSelf() {
    var nLength = 100;

    // Checks current snake length
    if (arrSnake.length > 50) {
        // Loop through every snake part
        for (var i = arrSnake.length - (nLength + 1); i >= 0; i--) {

            // Check if two snake parts overlap
            if (Math.sqrt(Math.pow((arrSnake[arrSnake.length - 1][0] - arrSnake[i][0]), 2) +
                    Math.pow((arrSnake[arrSnake.length - 1][1] - arrSnake[i][1]), 2)) <
                radius * 4) {
                endGame = true;
            }
        }
    }
}

// Increases game level
function levelUp() {

    // Check amount of apples eaten and increase level accordingly
    if (((appCounter + 1) % 20 == 0) && move < 3) {
        move++;
    }
}

// Checks if game ended
function checkEnd() {

    // Check if game ended
    if (endGame) {
        var strEnd = "Game over man, game over!";
        ctx.fillStyle = 'black';
        ctx.font = "20px Arial"
        ctx.fillText(strEnd, (cWidth / 2 - strEnd.length * 10 / 2), cHeight / 2);
        window.clearInterval(intId);
        window.removeEventListener('keydown', keyPress);
    }
}

// Begin game and listen for keyboard inputs
init();
window.addEventListener('keydown', keyPress);