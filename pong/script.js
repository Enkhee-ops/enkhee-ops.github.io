const canvas = document.getElementById('pongCanvas');
const ctx = canvas.getContext('2d');

// Game State
let gameState = {
    playing: false,
    paused: false,
    scorePlayer: 0,
    scoreAI: 0,
    winScore: 11,
    ball: { x: canvas.width / 2, y: canvas.height / 2, vx: 5, vy: 3, radius: 8 },
    paddlePlayer: { x: 20, y: canvas.height / 2 - 50, width: 12, height: 100, vy: 0 },
    paddleAI: { x: canvas.width - 32, y: canvas.height / 2 - 50, width: 12, height: 100, vy: 0 },
    aiSpeed: 4, // Difficulty (easy-med-hard: 3,4,5)
    keys: {},
    mouseY: canvas.height / 2
};

// Audio Context for sounds
let audioCtx;
function initAudio() {
    audioCtx = new (window.AudioContext || window.webkitAudioContext)();
}
function playSound(frequency, duration, type = 'sine') {
    const oscillator = audioCtx.createOscillator();
    const gainNode = audioCtx.createGain();
    oscillator.connect(gainNode);
    gainNode.connect(audioCtx.destination);
    oscillator.frequency.value = frequency;
    oscillator.type = type;
    gainNode.gain.setValueAtTime(0.3, audioCtx.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + duration);
    oscillator.start(audioCtx.currentTime);
    oscillator.stop(audioCtx.currentTime + duration);
}

// Event Listeners
window.addEventListener('keydown', (e) => {
    gameState.keys[e.key.toLowerCase()] = true;
    if (e.key === 'p' || e.key === 'P') togglePause();
    if (e.key === 'Escape') {
        if (gameState.playing) showMenu();
    }
    if (e.key.toLowerCase() === 'r' && !gameState.playing) restartGame();
});
window.addEventListener('keyup', (e) => {
    gameState.keys[e.key.toLowerCase()] = false;
});
canvas.addEventListener('mousemove', (e) => {
    const rect = canvas.getBoundingClientRect();
    gameState.mouseY = e.clientY - rect.top;
});
canvas.addEventListener('click', () => {
    if (!gameState.playing) startGame();
});

// Game Functions
function startGame() {
    gameState.playing = true;
    gameState.paused = false;
    resetBall();
    hideAllOverlays();
    initAudio();
    gameLoop();
}

function restartGame() {
    gameState.scorePlayer = 0;
    gameState.scoreAI = 0;
    resetBall();
    hideAllOverlays();
    gameState.playing = true;
}

function togglePause() {
    gameState.paused = !gameState.paused;
    document.getElementById('pauseOverlay').classList.toggle('hidden', !gameState.paused);
}

function showMenu() {
    gameState.playing = false;
    document.getElementById('menuOverlay').classList.remove('hidden');
    document.getElementById('pauseOverlay').classList.add('hidden');
    document.getElementById('gameOverOverlay').classList.add('hidden');
}

function gameOver(winner) {
    gameState.playing = false;
    document.getElementById('winnerText').textContent = winner === 'player' ? 'Player Wins!' : 'AI Wins!';
    document.getElementById('gameOverOverlay').classList.remove('hidden');
}

function resetBall() {
    gameState.ball.x = canvas.width / 2;
    gameState.ball.y = canvas.height / 2;
    gameState.ball.vx = (Math.random() > 0.5 ? 1 : -1) * 5;
    gameState.ball.vy = (Math.random() - 0.5) * 6;
}

function update() {
    if (!gameState.playing || gameState.paused) return;

    // Player paddle (mouse priority)
    let targetY = gameState.mouseY - gameState.paddlePlayer.height / 2;
    gameState.paddlePlayer.y += (targetY - gameState.paddlePlayer.y) * 0.2; // Smooth follow

    // Keyboard fallback
    if (gameState.keys['w'] || gameState.keys['arrowup']) gameState.paddlePlayer.y -= 6;
    if (gameState.keys['s'] || gameState.keys['arrowdown']) gameState.paddlePlayer.y += 6;

    // Clamp paddles
    gameState.paddlePlayer.y = Math.max(0, Math.min(canvas.height - gameState.paddlePlayer.height, gameState.paddlePlayer.y));
    gameState.paddleAI.y = Math.max(0, Math.min(canvas.height - gameState.paddleAI.height, gameState.paddleAI.y));

    // AI paddle
    const aiTarget = gameState.ball.y - gameState.paddleAI.height / 2;
    gameState.paddleAI.y += (aiTarget - gameState.paddleAI.y) * 0.15;

    // Ball movement
    gameState.ball.x += gameState.ball.vx;
    gameState.ball.y += gameState.ball.vy;

    // Wall bounce
    if (gameState.ball.y <= gameState.ball.radius || gameState.ball.y >= canvas.height - gameState.ball.radius) {
        gameState.ball.vy *= -1;
        playSound(400, 0.1);
    }

    // Paddle collision
    if (collides(gameState.ball, gameState.paddlePlayer) || collides(gameState.ball, gameState.paddleAI)) {
        gameState.ball.vx *= -1;
        gameState.ball.vy += (gameState.ball.y - (collides(gameState.ball, gameState.paddlePlayer) ? gameState.paddlePlayer.y : gameState.paddleAI.y)) * 0.15;
        playSound(600, 0.1, 'square');
        gameState.ball.vx *= 1.05;
        gameState.ball.vy *= 1.05;
    }

    // Score
    if (gameState.ball.x < 0) {
        gameState.scoreAI++;
        playSound(200, 0.3, 'sawtooth');
        if (gameState.scoreAI >= gameState.winScore) gameOver('ai');
        else resetBall();
    }
    if (gameState.ball.x > canvas.width) {
        gameState.scorePlayer++;
        playSound(200, 0.3, 'sawtooth');
        if (gameState.scorePlayer >= gameState.winScore) gameOver('player');
        else resetBall();
    }
}

function collides(ball, paddle) {
    return ball.x <= paddle.x + paddle.width + ball.radius &&
           ball.x >= paddle.x - ball.radius &&
           ball.y <= paddle.y + paddle.height + ball.radius &&
           ball.y >= paddle.y - ball.radius;
}

function draw() {
    ctx.fillStyle = '#000';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.shadowColor = '#00f';
    ctx.shadowBlur = 20;

    // Center line
    ctx.strokeStyle = '#fff';
    ctx.lineWidth = 4;
    ctx.setLineDash([20, 20]);
    ctx.beginPath();
    ctx.moveTo(canvas.width / 2, 0);
    ctx.lineTo(canvas.width / 2, canvas.height);
    ctx.stroke();
    ctx.setLineDash([]);

    // Paddles
    ctx.fillStyle = '#fff';
    ctx.shadowBlur = 15;
    ctx.fillRect(gameState.paddlePlayer.x, gameState.paddlePlayer.y, gameState.paddlePlayer.width, gameState.paddlePlayer.height);
    ctx.fillRect(gameState.paddleAI.x, gameState.paddleAI.y, gameState.paddleAI.width, gameState.paddleAI.height);

    // Ball
    ctx.shadowBlur = 25;
    ctx.beginPath();
    ctx.arc(gameState.ball.x, gameState.ball.y, gameState.ball.radius, 0, Math.PI * 2);
    ctx.fill();

    // Score
    ctx.shadowBlur = 0;
    ctx.font = 'bold 72px Courier New';
    ctx.textAlign = 'center';
    ctx.fillText(gameState.scorePlayer, canvas.width * 0.25, 90);
    ctx.fillText(gameState.scoreAI, canvas.width * 0.75, 90);

    // Controls hint
    ctx.font = '20px Courier New';
    ctx.fillText('Mouse/W S | P Pause | ESC Menu', canvas.width / 2, 30);
}

function gameLoop() {
    update();
    draw();
    requestAnimationFrame(gameLoop);
}

function hideAllOverlays() {
    document.querySelectorAll('.overlay').forEach(el => el.classList.add('hidden'));
}

// Init
showMenu();
window.addEventListener('load', () => {
    function resize() {
        const maxW = window.innerWidth * 0.9;
        const maxH = window.innerHeight * 0.9;
        const ratio = 800 / 600;
        if (maxW / maxH > ratio) {
            canvas.height = maxH;
            canvas.width = maxH * ratio;
        } else {
            canvas.width = maxW;
            canvas.height = maxW / ratio;
        }
    }
    resize();
    window.addEventListener('resize', resize);
});