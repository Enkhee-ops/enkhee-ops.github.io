
console.log('Hangman Game loaded');


let currentScreen = 'mainMenu';
let gameTimer = null;
let selectedPosition = null;
let gameMode = 'standard';
let gameCategory = 'animals';
let playerName = '';
let lives = 6;
let score = 0;
let currentLevel = 1;
let gameActive = false;
let timeRemaining = 180000; 
let gameStartTime = 0; 
let currentWord = '';
let revealedLetters = [];
let triedLetters = {};
let hangmanParts = 0;
let freezeActive = false;
let freezeEndTime = 0;
let doublePointsActive = false;


const SoundSystem = {
    enabled: true,
    
    init: function() {

        const saved = localStorage.getItem('hangmanSoundEnabled');
        this.enabled = saved === null || saved === 'true';
    },
    
    play: function(soundId) {
        if (!this.enabled) return;
        
        try {
            const audio = document.getElementById(soundId);
            if (audio) {
                audio.currentTime = 0;
                const playPromise = audio.play();
                if (playPromise !== undefined) {
                    playPromise.catch(() => {
            
                    });
                }
            }
        } catch (e) {
     
        }
    },
    
    toggle: function() {
        this.enabled = !this.enabled;
        localStorage.setItem('hangmanSoundEnabled', this.enabled);
        return this.enabled;
    }
};


document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM loaded, initializing game...');
    SoundSystem.init();
    initializeGame();
});

function initializeGame() {
    console.log('Initializing game...');
    

    loadSavedUsername();
    

    initializeMainMenu();
    
  
    initializeGameScreen();
    

    initializePopups();
    
   
    switchScreen('mainMenu');
    
    console.log('Game initialized successfully');
}

function initializeMainMenu() {
    console.log('Initializing main menu...');
    
    
    const usernameInput = document.getElementById('username');
    if (usernameInput) {
        usernameInput.addEventListener('input', function() {
            if (this.value.trim().length >= 2) {
                localStorage.setItem('hangmanUsername', this.value.trim());
                document.getElementById('usernameError').style.display = 'none';
            }
        });
    }
    
    
    document.querySelectorAll('.mode-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            document.querySelectorAll('.mode-btn').forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            gameMode = this.dataset.mode;
            console.log('Game mode selected:', gameMode);
        });
    });
    
  
    document.querySelectorAll('.category-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            document.querySelectorAll('.category-btn').forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            gameCategory = this.dataset.category;
            console.log('Category selected:', gameCategory);
        });
    });
    
  
    const startBtn = document.getElementById('startGameBtn');
    if (startBtn) {
        startBtn.addEventListener('click', startGame);
        console.log('Start button initialized');
    }
    
    
    const leaderboardBtn = document.getElementById('viewLeaderboardBtn');
    if (leaderboardBtn) {
        leaderboardBtn.addEventListener('click', showLeaderboard);
    }
    

    const howToPlayBtn = document.getElementById('howToPlayBtn');
    if (howToPlayBtn) {
        howToPlayBtn.addEventListener('click', showHowToPlay);
    }
}

function initializeGameScreen() {
    console.log('Initializing game screen...');
    
 
    createMongolianKeyboard();
    
   
    document.getElementById('clearPositionBtn').addEventListener('click', clearSelectedPosition);
    document.getElementById('hintBtn').addEventListener('click', showHint);
    document.getElementById('nextLevelBtn').addEventListener('click', nextLevel);
    document.getElementById('restartGameBtn').addEventListener('click', restartGame);
    document.getElementById('mainMenuBtn').addEventListener('click', returnToMainMenu);
    document.getElementById('pauseBtn').addEventListener('click', pauseGame);
    
 
    document.querySelectorAll('.powerup-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const powerupType = this.dataset.powerup;
            const cost = parseInt(this.dataset.cost) || 50; 
            usePowerup(powerupType, cost);
        });
    });
}

function initializePopups() {
    console.log('Initializing popups...');
    
    
    document.getElementById('closeLeaderboardBtn').addEventListener('click', closeLeaderboard);
    document.getElementById('clearLeaderboardBtn').addEventListener('click', clearLeaderboard);
    
    
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            updateLeaderboard(this.dataset.filter);
        });
    });
    
    
    document.getElementById('closeHowToPlayBtn').addEventListener('click', closeHowToPlay);
    
    
    document.getElementById('resumeGameBtn').addEventListener('click', resumeGameFromPause);
    document.getElementById('restartFromPauseBtn').addEventListener('click', restartGame);
    document.getElementById('mainMenuFromPauseBtn').addEventListener('click', returnToMainMenu);
    
    
    document.getElementById('continueGameBtn').addEventListener('click', continueGame);
    
    
    document.getElementById('playAgainBtn').addEventListener('click', playAgain);
    document.getElementById('gameOverMenuBtn').addEventListener('click', returnToMainMenu);
}

function loadSavedUsername() {
    const savedUsername = localStorage.getItem('hangmanUsername');
    if (savedUsername) {
        document.getElementById('username').value = savedUsername;
    }
}

function createMongolianKeyboard() {
    const keyboard = document.getElementById('alphabetKeyboard');
    if (!keyboard) return;
    
    keyboard.innerHTML = '';
    
    const mongolianAlphabet = [
        'А', 'Б', 'В', 'Г', 'Д', 'Е', 'Ё', 'Ж', 'З', 'И',
        'Й', 'К', 'Л', 'М', 'Н', 'О', 'Ө', 'П', 'Р', 'С',
        'Т', 'У', 'Ү', 'Ф', 'Х', 'Ц', 'Ч', 'Ш', 'Щ', 'Ъ',
        'Ы', 'Ь', 'Э', 'Ю', 'Я'
    ];
    
    mongolianAlphabet.forEach(letter => {
        const key = document.createElement('button');
        key.className = 'letter-key';
        key.textContent = letter;
        key.dataset.letter = letter;
        
        key.addEventListener('click', function() {
            handleLetterClick(letter);
        });
        
        keyboard.appendChild(key);
    });
}

function switchScreen(screenName) {
    console.log('Switching to screen:', screenName);
    
    
    document.querySelectorAll('.popup-screen').forEach(popup => {
        popup.classList.remove('active');
    });
    
    
    document.getElementById('mainMenu').classList.remove('active');
    document.getElementById('gameScreen').classList.remove('active');
    
    
    const screen = document.getElementById(screenName);
    if (screen) {
        screen.classList.add('active');
        currentScreen = screenName;
    }
}

function startGame() {
    console.log('Starting game...');
    
    
    const usernameInput = document.getElementById('username');
    playerName = usernameInput.value.trim();
    
    if (!playerName) {
        playerName = 'Зочин';
        usernameInput.value = playerName;
    }
    
    if (playerName.length < 2) {
        document.getElementById('usernameError').textContent = 'Нэрээ оруулна уу (дор хаяж 2 тэмдэгт)';
        document.getElementById('usernameError').style.display = 'block';
        return;
    }
    
    
    localStorage.setItem('hangmanUsername', playerName);
    
    
    resetGameState();
    
    
    generateWord();
    
    
    updateGameUI();
    
    
    startTimer();
    
    
    switchScreen('gameScreen');
    
    console.log('Game started with:', { playerName, gameMode, gameCategory });
}

function resetGameState() {
    lives = 6;
    score = 0;
    currentLevel = 1;
    gameActive = true;
    selectedPosition = null;
    hangmanParts = 0;
    timeRemaining = 180000;
    gameStartTime = Date.now();
    currentWord = '';
    revealedLetters = [];
    triedLetters = {};
    freezeActive = false;
    freezeEndTime = 0;
    doublePointsActive = false;
    
    
    if (gameTimer) {
        clearInterval(gameTimer);
        gameTimer = null;
    }
}

function generateWord() {
    
    const wordDatabase = getWordDatabase();
    const categoryWords = wordDatabase[gameCategory] || wordDatabase.animals;
    const randomWord = categoryWords[Math.floor(Math.random() * categoryWords.length)];
    
    currentWord = randomWord.word.toUpperCase();
    revealedLetters = new Array(currentWord.length).fill(false);
    triedLetters = {};
    
    
    for (let i = 0; i < currentWord.length; i++) {
        triedLetters[i] = new Set();
    }
    
    
    document.getElementById('questionText').textContent = randomWord.question;
    document.getElementById('wordLength').textContent = currentWord.length;
    
    
    window.currentHint = randomWord.hint;
}

function getWordDatabase() {
    return {
  animals: [
    {  word: "ХАЛИМ", question: "Хамгийн том хөхтөн амьтан?", hint: "Далайд амьдардаг аварга биетэй" },
    {  word: "МОРЬ",question: "Монголын үндэсний амьтан?", hint: "Нүүдэлчдийн үнэнч хүлэг" },
    { word: "ЧОНО", question: "Шаргал өнгөтэй махчин амьтан?", hint: "Бүлгээрээ ан авдаг" },
    {  word: "ТЭМЭЭ", question: "Цөлийн ус хадгалдаг амьтан?", hint: "Бөхтэй" },
        ],
    vehicles: [
    {  word: "АЭРОСТАТ",question: "Агаарын бөмбөлөг?", hint: "Хийтэй" },
    {  word: "АСФАЛЬТДУГУЙ",question: "Замын ажилд ашигладаг?", hint: "Нягтруулна" },
    {  word: "ВАГОН", question: "Төмөр замын буудал?", hint: "Суудалтай" },
    {  word: "БУЛЬДОЗЕР",question: "Уул уурхайн машин?", hint: "Газар шороо" }
        ],
       geography: [    
    {  word: "ӨМНӨДАФРИК",question: "Африкийн хамгийн өмнөд улс?", hint: "Хоёр далайтай" },
    {  word: "ВАШИНГТОН", question: "Америкийн нийслэл?", hint: "DC" },
    {  word: "КАНБЕРРА", question: "Австралийн нийслэл?", hint: "Сидней биш" },
    {  word: "РОМ", question: "Италийн нийслэл?", hint: "Эртний хот" },
    {  word: "НОМХОН", question: "Дэлхийн хамгийн их далай?", hint: "Pacific" }
  ],
       
        general: [
    {  word: "MONITOR",question: "Компьютерийн дэлгэц?", hint: "Display" },
    {  word: "KEYBOARD",question: "Мэдээлэл оруулах төхөөрөмж?", hint: "Гар" },
    {  word: "MOUSE", question: "Хулгана?", hint: "Заагч" },
    {  word: "BROWSER", question: "Интернэт хөтөч?", hint: "Chrome" },
    {  word: "INSTALL", question: "Програм суулгах?", hint: "Setup" }
        ]
    };
}
function updateGameUI() {
    
    document.getElementById('currentPlayer').textContent = `Тоглогч: ${playerName}`;
    document.getElementById('currentCategory').textContent = `Сэдэв: ${gameCategory}`;
    
    
    document.getElementById('currentLevel').textContent = currentLevel;
    document.getElementById('remainingLives').textContent = lives;
    document.getElementById('currentScore').textContent = score;
    
    
    updateTimerDisplay();
    
    
    updateWordSlots();
    
    
    updateHangmanDrawing();
    
    
    updateKeyboard();
    
    
    updatePowerupButtons();
}

function updatePowerupButtons() {
    document.querySelectorAll('.powerup-btn').forEach(btn => {
        const cost = parseInt(btn.dataset.cost) || 50;
        if (score >= cost) {
            btn.disabled = false;
            btn.style.opacity = '1';
        } else {
            btn.disabled = true;
            btn.style.opacity = '0.5';
        }
    });
}

function updateWordSlots() {
    const slotsContainer = document.getElementById('wordSlots');
    if (!slotsContainer) return;
    
    slotsContainer.innerHTML = '';
    
    for (let i = 0; i < currentWord.length; i++) {
        const slot = document.createElement('div');
        slot.className = 'word-slot';
        slot.dataset.position = i;
        
        
        if (i === selectedPosition) {
            slot.classList.add('selected');
        }
        
        
        const positionNumber = document.createElement('div');
        positionNumber.className = 'position-number';
        positionNumber.textContent = i + 1;
        slot.appendChild(positionNumber);
        
        
        const letterDisplay = document.createElement('div');
        letterDisplay.className = 'letter-display';
        
        if (revealedLetters[i]) {
            
            letterDisplay.textContent = currentWord[i];
            slot.classList.add('correct');
        } else {
            
            letterDisplay.textContent = '?';
        }
        
        slot.appendChild(letterDisplay);
        
        
        slot.addEventListener('click', function() {
            selectPosition(i);
        });
        
        slotsContainer.appendChild(slot);
    }
}

function selectPosition(position) {
    if (position >= 0 && position < currentWord.length) {
        selectedPosition = position;
        updateWordSlots();
        SoundSystem.play('clickSound');
        return true;
    }
    return false;
}

function clearSelectedPosition() {
    selectedPosition = null;
    updateWordSlots();
    SoundSystem.play('clickSound');
}

function handleLetterClick(letter) {
    if (selectedPosition === null) {
        alert('Эхлээд байрлалаа сонгоно уу! Байрлалын дугаарыг дарна уу.');
        return;
    }
    
    if (revealedLetters[selectedPosition]) {
        alert('Энэ байрлалд үсэг аль хэдийн таагдсан байна!');
        return;
    }
    
    
    if (!triedLetters[selectedPosition]) {
        triedLetters[selectedPosition] = new Set();
    }
    
    if (triedLetters[selectedPosition].has(letter)) {
        alert('Энэ үсгийг энэ байрлалд аль хэдийн туршсан байна!');
        return;
    }
    
    triedLetters[selectedPosition].add(letter);
    
    
    if (currentWord[selectedPosition] === letter) {
        
        revealedLetters[selectedPosition] = true;
        
        
        const points = calculatePoints(true);
        score += points;
        
        SoundSystem.play('correctSound');
        
        
        updateKeyboard();
        
        
        const wordComplete = revealedLetters.every(revealed => revealed);
        
        if (wordComplete) {
            
            setTimeout(() => showLevelComplete(points), 500);
        }
    } else {
        
        lives--;
        hangmanParts++;
        
        SoundSystem.play('wrongSound');
        
        if (lives <= 0) {
            
            setTimeout(() => showGameOver(), 1000);
        }
    }
    
    
    updateGameUI();
}

function calculatePoints(isCorrect) {
    if (!isCorrect) return 0;
    
    let points = 100; 
    
    
    const elapsed = (Date.now() - gameStartTime) / 1000; 
    const timeBonus = Math.max(0, 100 - Math.floor(elapsed / 10));
    points += timeBonus;
    
    
    const lifeBonus = lives * 20;
    points += lifeBonus;
    
    
    const levelMultiplier = 1 + (currentLevel - 1) * 0.2;
    points = Math.floor(points * levelMultiplier);
    
    
    if (doublePointsActive) {
        points *= 2;
        doublePointsActive = false;
    }
    
    return points;
}

function updateKeyboard() {
    const keys = document.querySelectorAll('.letter-key');
    keys.forEach(key => {
        const letter = key.dataset.letter;
        
        
        key.classList.remove('correct', 'incorrect', 'used');
        
        
        let triedAnywhere = false;
        let correctAnywhere = false;
        
        for (let pos = 0; pos < currentWord.length; pos++) {
            if (triedLetters[pos] && triedLetters[pos].has(letter)) {
                triedAnywhere = true;
                if (currentWord[pos] === letter) {
                    correctAnywhere = true;
                }
            }
        }
        
        if (correctAnywhere) {
            key.classList.add('correct');
        } else if (triedAnywhere) {
            key.classList.add('incorrect');
        }
    });
}

function updateHangmanDrawing() {
    const parts = document.querySelectorAll('.hangman-part');
    
    
    parts.forEach((part, index) => {
        if (index < hangmanParts) {
            part.style.display = 'block';
        } else {
            part.style.display = 'none';
        }
    });
    
    
    const statusElement = document.getElementById('hangmanStatus');
    if (statusElement) {
        statusElement.textContent = `Амь: ${lives}`;
        if (lives <= 2) {
            statusElement.style.color = 'red';
        } else if (lives <= 4) {
            statusElement.style.color = 'orange';
        } else {
            statusElement.style.color = 'green';
        }
    }
}


function startTimer() {
    if (gameTimer) clearInterval(gameTimer);
    
    if (gameMode === 'timed') {
        
        timeRemaining = 180000;
        
        gameTimer = setInterval(() => {
            if (freezeActive && Date.now() < freezeEndTime) {
                return; 
            }
            
            timeRemaining -= 1000;
            
            if (timeRemaining <= 0) {
                clearInterval(gameTimer);
                timeRemaining = 0;
                showGameOver(true);
            }
            
            updateTimerDisplay();
        }, 1000);
    } else {
        
        gameStartTime = Date.now();
        
        gameTimer = setInterval(() => {
            updateTimerDisplay();
        }, 1000);
    }
}

function updateTimerDisplay() {
    const timerElement = document.getElementById('gameTimer');
    if (!timerElement) return;
    
    if (gameMode === 'timed') {
        
        const totalSeconds = Math.floor(timeRemaining / 1000);
        const minutes = Math.floor(totalSeconds / 60);
        const seconds = totalSeconds % 60;
        timerElement.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        
        
        if (timeRemaining < 30000) { 
            timerElement.style.color = 'red';
        } else {
            timerElement.style.color = '';
        }
    } else {
        
        const elapsed = Date.now() - gameStartTime;
        const totalSeconds = Math.floor(elapsed / 1000);
        const minutes = Math.floor(totalSeconds / 60);
        const seconds = totalSeconds % 60;
        timerElement.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        timerElement.style.color = '';
    }
}

function showHint() {
    if (window.currentHint) {
        alert(`Тусламж: ${window.currentHint}`);
    } else {
        alert('Тусламж байхгүй байна');
    }
    SoundSystem.play('clickSound');
}

function usePowerup(powerupType, cost) {
    if (score < cost) {
        alert(`Таны оноо хангалтгүй байна! Энэ чадвар ${cost} оноо шаарддаг.`);
        return;
    }
    
    
    score -= cost;
    
    SoundSystem.play('clickSound');
    
    let resultMessage = '';
    
    switch(powerupType) {
        case 'reveal':
            
            const unrevealed = [];
            for (let i = 0; i < revealedLetters.length; i++) {
                if (!revealedLetters[i]) unrevealed.push(i);
            }
            
            if (unrevealed.length > 0) {
                const randomIndex = unrevealed[Math.floor(Math.random() * unrevealed.length)];
                revealedLetters[randomIndex] = true;
                resultMessage = `${randomIndex + 1} дугаар байрлалд "${currentWord[randomIndex]}" үсэг илрүүлэв!`;
                
                
                if (revealedLetters.every(r => r)) {
                    setTimeout(() => showLevelComplete(calculatePoints(true)), 500);
                }
            } else {
                resultMessage = 'Бүх үсэг аль хэдийн илрүүлэгдсэн байна!';
            }
            break;
            
        case 'life':
            lives = Math.min(6, lives + 1);
            resultMessage = 'Нэг амь нэмэгдлээ!';
            break;
            
        case 'freeze':
            if (gameMode === 'timed') {
                freezeActive = true;
                freezeEndTime = Date.now() + 10000; 
                
                
                setTimeout(() => {
                    freezeActive = false;
                }, 10000);
                
                resultMessage = 'Цаг 10 секунд зогсолоо!';
            } else {
                resultMessage = 'Энэ чадвар зөвхөн цагтай горимд ажиллана!';
                
                score += cost;
            }
            break;
            
        case 'double':
            doublePointsActive = true;
            resultMessage = 'Дараагийн зөв таамаглалд 2 дахин их оноо авах болно!';
            break;
            
        case 'skip':
            nextLevel();
            resultMessage = 'Одоогийн үг алгаслаа!';
            return; 
            
        default:
            resultMessage = 'Тодорхойгүй чадвар!';
            
            score += cost;
    }
    
    if (resultMessage) {
        alert(resultMessage);
    }
    
    
    updateGameUI();
}

function showLevelComplete(levelScore) {
    
    const elapsed = (Date.now() - gameStartTime) / 1000;
    const timeBonus = Math.max(0, 100 - Math.floor(elapsed / 10));
    const lifeBonus = lives * 20;
    const levelMultiplier = 1 + (currentLevel - 1) * 0.2;
    const baseScore = 100;
    
    
    document.getElementById('baseScore').textContent = baseScore;
    document.getElementById('timeBonus').textContent = timeBonus;
    document.getElementById('lifeBonus').textContent = lifeBonus;
    document.getElementById('levelTotalScore').textContent = levelScore;
    document.getElementById('completedLevel').textContent = currentLevel;
    document.getElementById('remainingAfterLevel').textContent = lives;
    
    
    document.getElementById('levelCompleteScreen').classList.add('active');
    
    SoundSystem.play('winSound');
}
function continueGame() {

    nextLevel();
    

    document.getElementById('levelCompleteScreen').classList.remove('active');
}

function nextLevel() {
    currentLevel++;
    selectedPosition = null;
    hangmanParts = 0;
    
    
    generateWord();
    
    
    gameStartTime = Date.now();
    
    
    updateGameUI();
}

function showGameOver(timeUp = false) {
    
    if (gameTimer) {
        clearInterval(gameTimer);
        gameTimer = null;
    }
    
    
    let finalTime;
    if (gameMode === 'timed') {
        finalTime = 180000 - timeRemaining;
    } else {
        finalTime = Date.now() - gameStartTime;
    }
    
    
    saveToLeaderboard(playerName, score, currentLevel, gameMode, finalTime);
    
    
    const totalSeconds = Math.floor(finalTime / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    const formattedTime = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    
    
    document.getElementById('finalLevel').textContent = currentLevel;
    document.getElementById('finalTime').textContent = formattedTime;
    document.getElementById('finalScore').textContent = score;
    document.getElementById('correctWord').textContent = currentWord;
    
    
    let message = 'Тоглоом дууссан!';
    if (timeUp) message = 'Хугацаа дууссан!';
    if (lives <= 0) message = 'Бүх амь дууссан!';
    
    document.getElementById('gameOverMessage').textContent = message;
    
    
    document.getElementById('gameOverScreen').classList.add('active');
    
    SoundSystem.play('loseSound');
}

function playAgain() {
    
    document.getElementById('gameOverScreen').classList.remove('active');
    
    
    resetGameState();
    generateWord();
    updateGameUI();
    startTimer();
    
    SoundSystem.play('clickSound');
}

function restartGame() {
    if (confirm('Тоглоомоо дахин эхлүүлэх үү?')) {
        
        document.querySelectorAll('.popup-screen').forEach(popup => {
            popup.classList.remove('active');
        });
        
        
        resetGameState();
        generateWord();
        updateGameUI();
        startTimer();
        
        SoundSystem.play('clickSound');
    }
}

function returnToMainMenu() {
    if (gameActive) {
        if (!confirm('Тоглоомоо зогсоож үндсэн цэс рүү буцах уу?')) {
            return;
        }
    }
    
    
    if (gameTimer) {
        clearInterval(gameTimer);
        gameTimer = null;
    }
    
    gameActive = false;
    switchScreen('mainMenu');
    SoundSystem.play('clickSound');
}

function pauseGame() {
    
    if (gameTimer) {
        clearInterval(gameTimer);
        gameTimer = null;
    }
    
    
    document.getElementById('pausedTime').textContent = document.getElementById('gameTimer').textContent;
    document.getElementById('pausedLevel').textContent = currentLevel;
    document.getElementById('pausedScore').textContent = score;
    document.getElementById('pausedLives').textContent = lives;
    
    
    document.getElementById('pauseScreen').classList.add('active');
    
    SoundSystem.play('clickSound');
}

function resumeGameFromPause() {
    
    startTimer();
    
    
    document.getElementById('pauseScreen').classList.remove('active');
    
    SoundSystem.play('clickSound');
}


const LeaderboardManager = {
    key: 'hangmanScores',
    
    save: function(username, score, level, mode, time) {
        try {
            let scores = this.getAll();
            
            scores.push({
                id: Date.now(),
                username: username,
                score: score,
                level: level,
                mode: mode,
                time: time,
                date: new Date().toLocaleDateString('mn-MN')
            });
            
            
            scores.sort((a, b) => b.score - a.score);
            
            
            if (scores.length > 20) {
                scores = scores.slice(0, 20);
            }
            
            localStorage.setItem(this.key, JSON.stringify(scores));
            return true;
        } catch (e) {
            console.error('Error saving to leaderboard:', e);
            return false;
        }
    },
    
    getAll: function() {
        try {
            const data = localStorage.getItem(this.key);
            return data ? JSON.parse(data) : [];
        } catch (e) {
            console.error('Error reading leaderboard:', e);
            return [];
        }
    },
    
    getByMode: function(mode) {
        const scores = this.getAll();
        if (mode === 'all') return scores;
        return scores.filter(score => score.mode === mode);
    },
    
    clear: function() {
        try {
            localStorage.removeItem(this.key);
            return true;
        } catch (e) {
            console.error('Error clearing leaderboard:', e);
            return false;
        }
    }
};

function saveToLeaderboard(username, score, level, mode, time) {
    if (score > 0) {
        LeaderboardManager.save(username, score, level, mode, time);
    }
}

function showLeaderboard() {
    updateLeaderboard('all');
    document.getElementById('leaderboardScreen').classList.add('active');
    SoundSystem.play('clickSound');
}

function updateLeaderboard(filter) {
    const tableBody = document.getElementById('leaderboardTable');
    if (!tableBody) return;
    
    const scores = LeaderboardManager.getByMode(filter);
    
    tableBody.innerHTML = '';
    
    if (scores.length === 0) {
        tableBody.innerHTML = `
            <tr>
                <td colspan="7" style="text-align: center; padding: 40px;">
                    Онооны самбар хоосон байна. Тоглоом тоглоод оноо аваарай!
                </td>
            </tr>
        `;
    } else {
        scores.forEach((score, index) => {
            const row = document.createElement('tr');
            
            
            if (score.username === playerName) {
                row.style.backgroundColor = 'rgba(52, 152, 219, 0.1)';
            }
            
            
            const totalSeconds = Math.floor(score.time / 1000);
            const minutes = Math.floor(totalSeconds / 60);
            const seconds = totalSeconds % 60;
            const timeStr = `${minutes}:${seconds.toString().padStart(2, '0')}`;
            
            
            const modeNames = {
                standard: 'Энгийн',
                infinite: 'Төгсгөлгүй',
                timed: 'Цагтай'
            };
            
            row.innerHTML = `
                <td>${index + 1}</td>
                <td>${score.username}</td>
                <td>${score.score.toLocaleString()}</td>
                <td>${score.level}</td>
                <td>${timeStr}</td>
                <td>${modeNames[score.mode] || score.mode}</td>
                <td>${score.date}</td>
            `;
            
            tableBody.appendChild(row);
        });
    }
    
    
    updatePersonalBest();
}

function updatePersonalBest() {
    const allScores = LeaderboardManager.getAll();
    const playerScores = allScores.filter(score => score.username === playerName);
    const personalBest = playerScores.length > 0 ? 
        playerScores.reduce((best, current) => current.score > best.score ? current : best) : 
        null;
    
    const element = document.getElementById('personalBest');
    if (!element) return;
    
    if (personalBest) {
        
        const totalSeconds = Math.floor(personalBest.time / 1000);
        const minutes = Math.floor(totalSeconds / 60);
        const seconds = totalSeconds % 60;
        const timeStr = `${minutes}:${seconds.toString().padStart(2, '0')}`;
        
        
        const modeNames = {
            standard: 'Энгийн',
            infinite: 'Төгсгөлгүй',
            timed: 'Цагтай'
        };
        
        element.innerHTML = `
            <div><strong>Оноо:</strong> ${personalBest.score.toLocaleString()}</div>
            <div><strong>Шат:</strong> ${personalBest.level}</div>
            <div><strong>Цаг:</strong> ${timeStr}</div>
            <div><strong>Горим:</strong> ${modeNames[personalBest.mode] || personalBest.mode}</div>
            <div><strong>Огноо:</strong> ${personalBest.date}</div>
        `;
    } else {
        element.textContent = 'Шилдэг амжилт байхгүй';
    }
}


function clearLeaderboard() {
    if (confirm('Онооны самбарыг бүрмөсөн устгах уу? Энэ үйлдлийг буцаах боломжгүй.')) {
        if (LeaderboardManager.clear()) {
            updateLeaderboard('all');
            alert('Онооны самбар амжилттай цэвэрлэгдлээ!');
        } else {
            alert('Онооны самбарыг цэвэрлэхэд алдаа гарлаа!');
        }
    }
    SoundSystem.play('clickSound');
}

function closeLeaderboard() {
    document.getElementById('leaderboardScreen').classList.remove('active');
    SoundSystem.play('clickSound');
}

function showHowToPlay() {
    document.getElementById('howToPlayScreen').classList.add('active');
    SoundSystem.play('clickSound');
}

function closeHowToPlay() {
    document.getElementById('howToPlayScreen').classList.remove('active');
    SoundSystem.play('clickSound');
}
