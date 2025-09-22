const canvas = document.querySelector("canvas");
const ctx = canvas.getContext('2d');

canvas.width = 500;
canvas.height = 600;

let rect = {
    x: 0,
    y: 0,
    width: 80,
    height: 10
}

let ball = {
    x: (canvas.width - rect.width) / 2 + 40,
    y: canvas.height - rect.height - 13,
    radius: 8,
    dx: Math.random() < 0.5 ? 3 : -3,
    dy: 3,
    speed: 4
}

rect.x = (canvas.width - rect.width) / 2;
rect.y = canvas.height - rect.height - 5;

let startGame = false;

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
}

drawRect();
drawBall();

function gameLoop() {
    if (startGame) {
        drawRect();
        drawBall();
        updateBallPosition();
        requestAnimationFrame(gameLoop);
    }
}

window.addEventListener("keydown", function(e) {
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
        })

window.addEventListener("keydown", startingGame);

function startingGame(e) {
    if (!startGame && 
        (e.code === "ArrowLeft" || 
         e.code === "ArrowRight" || 
         e.code === "KeyA" || 
         e.code === "KeyD")) {
        startGame = true;
        gameLoop();
    }
}