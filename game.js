var c;
var ctx;
var cX = 0;
var cY = 0;
var cWidth = 400;
var cHeight = 400;
var radius = 10;
var locX = cWidth / 2;
var locY = cHeight / 2;
var moveX = 5;
var moveY = 5;

/* Initialize canvas and redraw every set interval */
function init() {
    c = document.getElementById('mainCanvas');
    c.width = cWidth;
    c.height = cHeight;
    ctx = c.getContext("2d");
    return setInterval(drawCanvas, 10);
}

/* Draw default canvas objects */
function drawCanvas() {
    clearCanvas();
    ctx.fillStyle = 'lime';
    ctx.lineWidth = 3;
    ctx.strokeStyle = 'black';
    drawRect(cX, cY, cWidth, cHeight);
    ctx.fillStyle = 'green';
    ctx.lineWidth = 3;
    ctx.strokeStyle = 'black';
    drawCircle(locX, locY, radius, 0, 2 * Math.PI);
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
    switch (evt.keyCode) {
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

function moveSnake (aLocX, aLocY) {
	return (locXNew, locYNew);
}

init();
window.addEventListener('keydown', keyPress, true);