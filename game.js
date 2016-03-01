var c;
var ctx;
var cX = 0;
var cY = 0;
var cWidth = 400;
var cHeight = 400;
var radius = 10;
var radiusApp = 5;
var move = 2;
var currDir = 38;
var start = false;
var locXApp;
var locYApp;
var appCounter = 1;
var changeSize = 3;
var arrSnake = [
    [cWidth / 2, cHeight / 2, radius],
    [cWidth / 2, cHeight / 2, radius]
];
var arrSnakeTmp = [];
var iPos;
var grd;

/* Initialize canvas and redraw every set interval */
function init() {
    c = document.getElementById('mainCanvas');
    c.width = cWidth;
    c.height = cHeight;
    ctx = c.getContext("2d");
    genApple();
    drawCanvas();
}

/* Draw default canvas objects */
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

/* Move snake and draw the new canvas */
function gameOn() {
    diffLevel();
    clearCanvas();
    drawCanvas();
}

function diffLevel() {

    /* Check if apple was eaten */
    if (Math.sqrt(Math.pow((arrSnake[arrSnake.length - 1][0] - locXApp), 2) +
            Math.pow((arrSnake[arrSnake.length - 1][1] - locYApp), 2)) <
        (radius + radiusApp)) {
        appCounter += 1;
        genApple();
        iPos = 0;
    } else {
        iPos = 1;
    }

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
    };

    arrSnake = arrSnakeTmp.slice();
    arrSnakeTmp = [];
}

/* Clear current canvas contents */
function clearCanvas() {
    ctx.clearRect(cX, cY, cWidth, cHeight);
}

/* Draw circles as main snake and apples */
function drawCircle(aX, aY, aRat, aSAng, aEAng) {
    ctx.beginPath();
    ctx.arc(aX, aY, aRat, aSAng, aEAng, false);
    ctx.fill();
    ctx.stroke();
}

/* Draw main canvas */
function drawRect(aX, aY, aWidth, aHeight) {
    ctx.beginPath();
    ctx.rect(aX, aY, aWidth, aHeight);
    ctx.fill();
    ctx.stroke();
}

/* Key press listener */
function keyPress(evt) {

    /* Check if game has begun */
    if (!start) {
        start = true;
        currDir = evt.keyCode;
        setInterval(gameOn, 10);
    } else {
        currDir = evt.keyCode;
    }
}

function moveSnake() {

    // Check which arrow has been pressed
    switch (currDir) {
        case 38:
            /* Up arrow was pressed */
            if (arrSnake[arrSnake.length - 1][1] - move > 0) {
                arrSnake[arrSnake.length - 1][1] -= move;
            }
            break;
        case 40:
            /* Down arrow was pressed */
            if (arrSnake[arrSnake.length - 1][1] + move < cHeight) {
                arrSnake[arrSnake.length - 1][1] += move;
            }
            break;
        case 37:
            /* Left arrow was pressed */
            if (arrSnake[arrSnake.length - 1][0] - move > 0) {
                arrSnake[arrSnake.length - 1][0] -= move;
            }
            break;
        case 39:
            /* Right arrow was pressed */
            if (arrSnake[arrSnake.length - 1][0] + move < cWidth) {
                arrSnake[arrSnake.length - 1][0] += move;
            }
            break;
    }
}

// Generate random apple location
function genApple() {
    locXApp = Math.random() * (0.9 * cWidth);
    locYApp = Math.random() * (0.9 * cHeight);
}

// Begin game and listen for keyboard inputs
init();
window.addEventListener('keydown', keyPress, true);