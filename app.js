const canvas = document.querySelector("canvas");
const ctx = canvas.getContext('2d');

canvas.width = 400;
canvas.height = 500;

let leftPressed = false;
let rightPressed = false;
const startBtn = document.querySelector(".startandstop");
const leftBtn = document.getElementById("leftBtn");
const rightBtn = document.getElementById("rightBtn");
const scoreDisplay = document.getElementById("score");
let score = 0;
let scoreInterval = null;
let speedIncrement = 0;
const maxIncrement = 5;

leftBtn.addEventListener("mousedown", () => { 
    leftPressed = true;
    if (!startGame) startingGame();
});
leftBtn.addEventListener("mouseup", () => leftPressed = false);
leftBtn.addEventListener("touchstart", (e) => {
    e.preventDefault();
    leftPressed = true;
    if (!startGame) startingGame();
});
leftBtn.addEventListener("touchend", (e) => { e.preventDefault(); leftPressed = false;})

rightBtn.addEventListener("mousedown", () => {
    rightPressed = true;
    if (!startGame) startingGame();
});
rightBtn.addEventListener("mouseup", () => rightPressed = false);
rightBtn.addEventListener("touchstart", (e) => {
    e.preventDefault(); 
    rightPressed = true;
    if (!startGame) startingGame();
});
rightBtn.addEventListener("touchend", (e) => { e.preventDefault(); rightPressed = false;})

window.addEventListener("keydown", function(e) {
    if (e.code === "ArrowLeft" || e.code === "KeyA") leftPressed = true;
    if (e.code === "ArrowRight" || e.code === "KeyD") rightPressed = true;
});

window.addEventListener("keyup", function(e) {
    if (e.code === "ArrowLeft" || e.code === "KeyA") leftPressed = false;
    if (e.code === "ArrowRight" || e.code === "KeyD") rightPressed = false;
});

function updatePaddle() {
    if (leftPressed && rect.x > 0) rect.x -= 3;
    if (rightPressed && rect.x + rect.width < canvas.width) rect.x += 3;
}

let rect = {
    x: 0,
    y: 0,
    width: 80,
    height: 10
}

let ball = {
    x: 0,
    y: 0,
    radius: 8,
    dx: 0,
    dy: 0,
};

rect.x = (canvas.width - rect.width) / 2;
rect.y = canvas.height - rect.height - 5;

let startGame = false;

function resetBallOnPaddle() {
    ball.x = (canvas.width - rect.width) / 2 + 40;
    ball.y = canvas.height - rect.height - 13;
    ball.dx = 0;
    ball.dy = 0;
}

function launchBall() {
    ball.dx = Math.random() < 0.5 ? 3 : -3;
    ball.dy = -3;
}

function resetGame() {
    rect.x = (canvas.width - rect.width) / 2;
    rect.y = canvas.height - rect.height - 5;
    resetBallOnPaddle();
    startGame = false;
    speedIncrement = 0;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawRect();
    drawBall();
    resetScore();
}

function drawRect() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "black";
    ctx.fillRect(rect.x, rect.y, rect.width, rect.height);
}

function drawBall() {
    ctx.beginPath();
    ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI*2);
    ctx.fillStyle = "red";
    ctx.fill();
    ctx.closePath();
}

function updateBallPosition() {
    ball.x += ball.dx;
    ball.y += ball.dy;
    if (ball.x - ball.radius <= 0 || ball.x + ball.radius >= canvas.width) {
        ball.dx *= -1;
    }
    if (ball.y - ball.radius <=0) {
        ball.dy *= -1;
        if (speedIncrement < maxIncrement) {
            speedIncrement++;
            ball.dy *= 1.2;
        }
    }
    if (ball.y + ball.radius >= canvas.height) {
        gameOver();
        window.alert("Game Over..")
    }
    if (ball.y + ball.radius >= rect.y && ball.x >= rect.x && ball.x <= rect.x + rect.width) {
        ball.dy *= -1;
    }
}

function startScore() {
    score = 0;
    scoreDisplay.textContent = score;
    scoreInterval = setInterval(()=> {
        score++;
        scoreDisplay.textContent = score;
    },1000);
}

function stopScore() {
    clearInterval(scoreInterval);
    scoreInterval = null;
}

function resetScore() {
    stopScore();
    score = 0;
    scoreDisplay.textContent = score;
}

function gameLoop() {
    if (startGame) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        updatePaddle();
        drawRect();
        drawBall();
        updateBallPosition();
        requestAnimationFrame(gameLoop);
    } else {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        drawRect();
        resetBallOnPaddle();
        drawBall();
    }
}

function gameOver() {
    startGame = false;
    resetScore();
    resetGame();
}

/*window.addEventListener("keydown", function(e) {
                switch (e.code) {
                    case 'ArrowLeft':
                    case 'KeyA' :
                        if(rect.x - 5 >= 0) {
                            rect.x -= 5;
                        }
                        break;
                    case 'ArrowRight':
                    case 'KeyD' :
                        if(rect.x + rect.width + 5 <= canvas.width) {
                            rect.x += 5;
                        }
                        break;
                }
        })*/

window.addEventListener("keydown", startingGame);

function startingGame(e) {
    if (!startGame) {
        startGame = true;
        launchBall();
        startScore();
        gameLoop();
    }
}

resetBallOnPaddle();
drawRect();
drawBall();

startBtn.addEventListener("click", () => {
    resetGame();
    startGame = false;
});