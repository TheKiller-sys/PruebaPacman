const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const scoreElement = document.getElementById('score');

const SIZE = 20;
const ROWS = canvas.height / SIZE;
const COLS = canvas.width / SIZE;

let score = 0;

const map = [
    [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
    [1,0,0,0,0,1,0,0,0,0,0,0,0,0,1,0,0,0,0,1],
    [1,0,1,1,0,1,0,1,1,1,1,1,1,0,1,0,1,1,0,1],
    [1,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,1],
    [1,0,1,1,0,1,1,1,0,1,1,0,1,1,1,0,1,1,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,1,1,0,1,0,1,1,1,1,1,1,0,1,0,1,1,0,1],
    [1,0,0,0,0,1,0,0,0,1,1,0,0,0,1,0,0,0,0,1],
    [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]
];

let pacman = { x: 1, y: 1, dir: { x: 0, y: 0 }, nextDir: { x: 0, y: 0 } };
let ghost = { x: 18, y: 7, dir: { x: -1, y: 0 } };

function drawMap() {
    for (let r = 0; r < ROWS; r++) {
        for (let c = 0; c < COLS; c++) {
            if (map[r][c] === 1) {
                ctx.fillStyle = 'blue';
                ctx.fillRect(c * SIZE, r * SIZE, SIZE, SIZE);
            } else if (map[r][c] === 0) {
                ctx.fillStyle = 'white';
                ctx.beginPath();
                ctx.arc(c * SIZE + SIZE / 2, r * SIZE + SIZE / 2, 2, 0, Math.PI * 2);
                ctx.fill();
            }
        }
    }
}

function drawPacman() {
    ctx.fillStyle = 'yellow';
    ctx.beginPath();
    let centerX = pacman.x * SIZE + SIZE / 2;
    let centerY = pacman.y * SIZE + SIZE / 2;
    let startAngle = 0.2 * Math.PI;
    let endAngle = 1.8 * Math.PI;

    if (pacman.dir.x === 1) { startAngle = 0.2 * Math.PI; endAngle = 1.8 * Math.PI; }
    else if (pacman.dir.x === -1) { startAngle = 1.2 * Math.PI; endAngle = 0.8 * Math.PI; }
    else if (pacman.dir.y === -1) { startAngle = 1.7 * Math.PI; endAngle = 1.3 * Math.PI; }
    else if (pacman.dir.y === 1) { startAngle = 0.7 * Math.PI; endAngle = 0.3 * Math.PI; }

    ctx.arc(centerX, centerY, SIZE / 2 - 2, startAngle, endAngle);
    ctx.lineTo(centerX, centerY);
    ctx.fill();
}

function drawGhost() {
    ctx.fillStyle = 'red';
    ctx.fillRect(ghost.x * SIZE + 2, ghost.y * SIZE + 2, SIZE - 4, SIZE - 4);
}

function movePacman() {
    let nextX = pacman.x + pacman.nextDir.x;
    let nextY = pacman.y + pacman.nextDir.y;

    if (nextX >= 0 && nextX < COLS && nextY >= 0 && nextY < ROWS && map[nextY][nextX] !== 1) {
        pacman.dir = pacman.nextDir;
    }

    let newX = pacman.x + pacman.dir.x;
    let newY = pacman.y + pacman.dir.y;

    if (newX >= 0 && newX < COLS && newY >= 0 && newY < ROWS && map[newY][newX] !== 1) {
        pacman.x = newX;
        pacman.y = newY;
    }

    if (map[pacman.y][pacman.x] === 0) {
        map[pacman.y][pacman.x] = 2;
        score += 10;
        scoreElement.innerText = score;
    }
}

function moveGhost() {
    const dirs = [{ x: 1, y: 0 }, { x: -1, y: 0 }, { x: 0, y: 1 }, { x: 0, y: -1 }];
    if (Math.random() < 0.2 || (ghost.x + ghost.dir.x < 0 || ghost.x + ghost.dir.x >= COLS || ghost.y + ghost.dir.y < 0 || ghost.y + ghost.dir.y >= ROWS || map[ghost.y + ghost.dir.y][ghost.x + ghost.dir.x] === 1)) {
        ghost.dir = dirs[Math.floor(Math.random() * dirs.length)];
    }

    let newX = ghost.x + ghost.dir.x;
    let newY = ghost.y + ghost.dir.y;

    if (newX >= 0 && newX < COLS && newY >= 0 && newY < ROWS && map[newY][newX] !== 1) {
        ghost.x = newX;
        ghost.y = newY;
    }
}

function update() {
    movePacman();
    moveGhost();

    if (pacman.x === ghost.x && pacman.y === ghost.y) {
        alert('Game Over! Score: ' + score);
        location.reload();
    }

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawMap();
    drawPacman();
    drawGhost();
}

window.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowUp') pacman.nextDir = { x: 0, y: -1 };
    if (e.key === 'ArrowDown') pacman.nextDir = { x: 0, y: 1 };
    if (e.key === 'ArrowLeft') pacman.nextDir = { x: -1, y: 0 };
    if (e.key === 'ArrowRight') pacman.nextDir = { x: 1, y: 0 };
});

setInterval(update, 200);
