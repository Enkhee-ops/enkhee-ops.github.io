
class HangmanGame {
    constructor() {
        this.resetGame();
        this.loadSavedProgress();
    }

    resetGame() {
        this.state = {
            gameMode: 'standard',
            category: 'animals',
            username: '',
            currentLevel: 1,
            score: 0,
            lives: 6,
            totalLives: 6,
            usedPowerups: [],
            activePowerups: {},

            startTime: null,
            elapsedTime: 0,
            isPaused: false,
            gameActive: false,
            currentQuestion: null,
            currentAnswer: '',
            revealedLetters: [],
            triedLetters: {},
            correctGuesses: 0,
            totalGuesses: 0,
            selectedPosition: null,
            freezeTimeRemaining: 0,
            doublePointsActive: false,
            levelStartTime: null
        };
    }

    loadSavedProgress() {
        try {
            const saved = localStorage.getItem('hangmanProgress');
            if (saved) {
                const data = JSON.parse(saved);

                this.state.username = data.username || '';

            }
        } catch (e) {
            console.log('Could not load saved progress');
        }
    }

    saveProgress() {
        try {
            const data = {
                username: this.state.username,

                lastPlayed: new Date().toISOString()
            };
            localStorage.setItem('hangmanProgress', JSON.stringify(data));
        } catch (e) {
            console.log('Could not save progress');
        }
    }

    startGame(mode, category, username) {
        this.resetGame();
        this.state.gameMode = mode;
        this.state.category = category;
        this.state.username = username || 'Зочин';
        this.state.gameActive = true;
        this.state.startTime = Date.now();
        this.state.levelStartTime = Date.now();
        
        this.saveProgress();
        this.startNewLevel();
    }

    startNewLevel() {
        const categoryQuestions = QUESTION_CATEGORIES[this.state.category];
        if (!categoryQuestions || categoryQuestions.length === 0) {
            console.error('No questions available for category:', this.state.category);
            return;
        }

   
        const randomIndex = Math.floor(Math.random() * categoryQuestions.length);
        this.state.currentQuestion = categoryQuestions[randomIndex];
        this.state.currentAnswer = this.state.currentQuestion.answer.toUpperCase();
        
   
        this.state.revealedLetters = new Array(this.state.currentAnswer.length).fill(false);
        this.state.triedLetters = {};
        this.state.correctGuesses = 0;
        this.state.totalGuesses = 0;
        this.state.selectedPosition = null;
        this.state.levelStartTime = Date.now();
        

        for (let i = 0; i < this.state.currentAnswer.length; i++) {
            this.state.triedLetters[i] = new Set();
        }
    }

    selectPosition(position) {
        if (position >= 0 && position < this.state.currentAnswer.length) {
            this.state.selectedPosition = position;
            return true;
        }
        return false;
    }

    guessLetter(letter, position = null) {
        if (!this.state.gameActive) return { success: false, message: 'Тоглоом идэвхгүй байна' };
        
        const pos = position !== null ? position : this.state.selectedPosition;
        if (pos === null) {
            return { success: false, message: 'Эхлээд байрлалаа сонгоно уу' };
        }

        letter = letter.toUpperCase();
        

        if (this.state.triedLetters[pos].has(letter)) {
            return { success: false, message: 'Энэ үсгийг энэ байрлалд аль хэдийн туршсан байна' };
        }

        this.state.totalGuesses++;
        this.state.triedLetters[pos].add(letter);

        if (this.state.currentAnswer[pos] === letter) {
            this.state.correctGuesses++;
            this.state.revealedLetters[pos] = true;
            

            const points = this.calculatePoints(true, pos);
            

            const levelComplete = this.state.revealedLetters.every(revealed => revealed);
            
            return {
                success: true,
                correct: true,
                position: pos,
                letter: letter,
                points: points,
                levelComplete: levelComplete
            };
        } else {

            this.state.lives--;
            
            return {
                success: true,
                correct: false,
                position: pos,
                letter: letter,
                livesLost: 1,
                gameOver: this.state.lives <= 0
            };
        }
    }

    calculatePoints(isCorrect, position) {
        if (!isCorrect) return 0;

        const difficulty = getDifficultyConfig(this.state.currentLevel);
        let points = difficulty.basePoints;
        
 
        const timeTaken = (Date.now() - this.state.levelStartTime) / 1000;
        const maxTime = 60; 
        const timeFactor = Math.max(0, 1 - (timeTaken / maxTime));
        points += Math.round(difficulty.timeBonus * timeFactor);
        

        const lifeFactor = this.state.lives / this.state.totalLives;
        points += Math.round(difficulty.lifeBonus * lifeFactor);
        
  
        if (this.state.doublePointsActive) {
            points *= 2;
            this.state.doublePointsActive = false;
        }
        
        return points;
    }

    usePowerup(powerupType) {
        if (!this.state.gameActive) return { success: false, message: 'Тоглоом идэвхгүй байна' };
        
        const powerup = POWER_UPS[powerupType];
        if (!powerup) return { success: false, message: 'Буруу тусгай чадвар' };
        
        if (this.state.score < powerup.cost) {
            return { success: false, message: 'Таны оноо хангалтгүй байна' };
        }
        
        this.state.score -= powerup.cost;
        this.state.usedPowerups.push(powerupType);
        
        let result = { success: true, powerup: powerupType };
        
        switch (powerupType) {
            case 'reveal':
                const unrevealedPositions = [];
                for (let i = 0; i < this.state.revealedLetters.length; i++) {
                    if (!this.state.revealedLetters[i]) {
                        unrevealedPositions.push(i);
                    }
                }
                
                if (unrevealedPositions.length > 0) {
                    const randomPos = unrevealedPositions[Math.floor(Math.random() * unrevealedPositions.length)];
                    const letter = this.state.currentAnswer[randomPos];
                    this.state.revealedLetters[randomPos] = true;
                    this.state.correctGuesses++;
                    result.revealedPosition = randomPos;
                    result.revealedLetter = letter;
                    
    
                    result.levelComplete = this.state.revealedLetters.every(revealed => revealed);
                }
                break;
                
            case 'life':
                this.state.lives = Math.min(this.state.totalLives, this.state.lives + 1);
                result.livesAdded = 1;
                break;
                
            case 'freeze':
                this.state.freezeTimeRemaining = 10;
                result.freezeDuration = 10;
                break;
                
            case 'double':
                this.state.doublePointsActive = true;
                result.active = true;
                break;
                
            case 'skip':
                this.startNewLevel();
                result.skipped = true;
                break;
        }
        
        return result;
    }

    completeLevel() {
        const difficulty = getDifficultyConfig(this.state.currentLevel);
        const levelScore = this.calculateLevelScore();
        
        this.state.score += levelScore;
        this.state.currentLevel++;
        

        
        return {
            level: this.state.currentLevel - 1,
            score: levelScore,
            totalScore: this.state.score,
            remainingLives: this.state.lives,
            timeTaken: Date.now() - this.state.levelStartTime
        };
    }

    calculateLevelScore() {
        const difficulty = getDifficultyConfig(this.state.currentLevel);
        let score = difficulty.basePoints;
        
 
        const timeTaken = (Date.now() - this.state.levelStartTime) / 1000;
        const maxTime = 60;
        const timeFactor = Math.max(0, 1 - (timeTaken / maxTime));
        score += Math.round(difficulty.timeBonus * timeFactor);
        
   
        const lifeFactor = this.state.lives / this.state.totalLives;
        score += Math.round(difficulty.lifeBonus * lifeFactor);
        
    
        const accuracy = this.state.totalGuesses > 0 ? this.state.correctGuesses / this.state.totalGuesses : 1;
        score = Math.round(score * accuracy);
        
        return score;
    }


    getGameState() {
        return {
            ...this.state,
            currentTime: Date.now(),
            answerLength: this.state.currentAnswer ? this.state.currentAnswer.length : 0,
            progress: this.state.revealedLetters.filter(r => r).length / (this.state.currentAnswer?.length || 1),
            isTimedMode: GAME_MODES[this.state.gameMode].hasTimer,
            timeLimit: GAME_MODES[this.state.gameMode].timeLimit
        };
    }

    getCurrentQuestion() {
        return this.state.currentQuestion;
    }

    getHint() {
        return this.state.currentQuestion?.hint || 'Тусламж байхгүй байна';
    }

    pauseGame() {
        if (this.state.gameActive && !this.state.isPaused) {
            this.state.isPaused = true;
            this.state.elapsedTime += Date.now() - this.state.startTime;
            return true;
        }
        return false;
    }

    resumeGame() {
        if (this.state.gameActive && this.state.isPaused) {
            this.state.isPaused = false;
            this.state.startTime = Date.now();
            return true;
        }
        return false;
    }

    getElapsedTime() {
        if (this.state.isPaused) {
            return this.state.elapsedTime;
        } else if (this.state.startTime) {
            return this.state.elapsedTime + (Date.now() - this.state.startTime);
        }
        return 0;
    }

    formatTime(ms) {
        const totalSeconds = Math.floor(ms / 1000);
        const minutes = Math.floor(totalSeconds / 60);
        const seconds = totalSeconds % 60;
        return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    }

    getHangmanStage() {
        const livesLost = this.state.totalLives - this.state.lives;
        return Math.min(6, Math.max(0, livesLost));
    }
}


const game = new HangmanGame();
window.HangmanGame = game;