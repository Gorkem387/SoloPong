const canvas = document.querySelector("canvas");
const ctx = canvas.getContext('2d');

canvas.width = 500;
canvas.height = 600;

let leftPressed = false;
let rightPressed = false;

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
    speed: 4
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
    ball.x = Math.random() * (canvas.width - ball.radius * 2) + ball.radius;
    ball.y = Math.random() * (canvas.height * 0.3) +20;
    ball.dx = Math.random() < 0.5 ? 3 : -3;
    ball.dy = 3;
}

function resetGame() {
    rect.x = (canvas.width - rect.width) / 2;
    rect.y = canvas.height - rect.height - 5;
    resetBallOnPaddle();
    startGame = false;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawRect();
    drawBall();
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
        if (ball.dy > 0) {
            ball.dy += 1;
        } else {
            ball.dy -= 1;
        }
    }
    if (ball.y + ball.radius >= canvas.height) {
        gameOver();
    }
    if (ball.y + ball.radius >= rect.y && ball.x >= rect.x && ball.x <= rect.x + rect.width) {
        ball.dy *= -1;
    }
}

drawRect();
drawBall();

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
    if (!startGame && 
        (e.code === "ArrowLeft" || 
         e.code === "ArrowRight" || 
         e.code === "KeyA" || 
         e.code === "KeyD")) {
        startGame = true;
        launchBall();
        gameLoop();
    }
}

resetBallOnPaddle();
drawRect();
drawBall();