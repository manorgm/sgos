var c;
var ctx;
var cX = 0;
var cY = 0;
var cWidth = 400;
var cHeight = 400;
var radius = 10;
var radiusApp = 5;
var locX = cWidth / 2;
var locY = cHeight / 2;
var moveX = 2;
var moveY = 2;
var currDir;
var start = false;
var locXApp;
var locYApp;
var appCounter = 0;

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
    ctx.fillStyle = 'lime';
    ctx.lineWidth = 3;
    ctx.strokeStyle = 'black';
    drawRect(cX, cY, cWidth, cHeight);
    ctx.fillStyle = 'green';
    ctx.lineWidth = 3;
    ctx.strokeStyle = 'black';
    drawCircle(locX, locY, radius, 0, 2 * Math.PI);
    ctx.fillStyle = 'red';
    ctx.lineWidth = 2;
    ctx.strokeStyle = 'black';
    drawCircle(locXApp, locYApp, radiusApp, 0, 2 * Math.PI);
}

/* Move snake and draw the new canvas */
function gameOn() {
    diffLevel();
    moveSnake();
    clearCanvas();
    drawCanvas();
}

function diffLevel () {
    /* Check if apple was eaten */
    if(Math.sqrt(Math.pow((locX-locXApp), 2) + Math.pow((locY-locYApp), 2)) < (radius + radiusApp)){
        appCounter += 1;
        genApple();
    }
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
    switch (currDir) {
        case 38:
            /* Up arrow was pressed */
            if (locY - moveY > 0) {
                locY -= moveY;
            }
            break;
        case 40:
            /* Down arrow was pressed */
            if (locY + moveY < cHeight) {
                locY += moveY;
            }
            break;
        case 37:
            /* Left arrow was pressed */
            if (locX - moveX > 0) {
                locX -= moveX;
            }
            break;
        case 39:
            /* Right arrow was pressed */
            if (locX + moveX < cWidth) {
                locX += moveX;
            }
            break;
    }
}

function genApple () {
    locXApp = Math.random() * (cWidth - radiusApp * 4);
    locYApp = Math.random() * (cHeight - radiusApp * 4);
}

init();
window.addEventListener('keydown', keyPress, true);