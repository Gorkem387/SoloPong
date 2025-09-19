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

rect.x = (canvas.width - rect.width) / 2;
rect.y = canvas.height - rect.height - 5;

let startGame = false;

function drawRect() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "black";
    ctx.fillRect(rect.x, rect.y, rect.width, rect.height);
}

drawRect();

window.addEventListener("keydown", function(e) {
                switch (e.code) {
                    case 'ArrowLeft':
                        if(rect.x - 5 >= 0) {
                            rect.x -= 5;
                        }
                        break;
                    case 'ArrowRight':
                        if(rect.x + rect.width + 5 <= canvas.width) {
                            rect.x += 5;
                        }
                        break;
                }

                drawRect();
        })

window.addEventListener('keydown', startingGame);

function startingGame(e) {
    if (e.code) {
        startGame = true;
    }
}