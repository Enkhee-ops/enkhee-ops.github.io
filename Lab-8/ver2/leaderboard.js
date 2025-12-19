class Leaderboard {
    constructor() {
        this.storageKey = 'hangmanLeaderboard';
        this.loadLeaderboard();
    }

    loadLeaderboard() {
        try {
            const data = localStorage.getItem(this.storageKey);
            this.entries = data ? JSON.parse(data) : [];
        } catch (e) {
            console.error('Error loading leaderboard:', e);
            this.entries = [];
        }
    }

    saveLeaderboard() {
        try {
            localStorage.setItem(this.storageKey, JSON.stringify(this.entries));
        } catch (e) {
            console.error('Error saving leaderboard:', e);
        }
    }

    addEntry(username, score, levelReached, gameMode, timeTaken) {
        const entry = {
            id: Date.now() + Math.random().toString(36).substr(2, 9),
            username: username || 'Зочин',
            score: score,
            levelReached: levelReached,
            gameMode: gameMode,
            date: new Date().toISOString(),
            timeTaken: timeTaken || 0
        };

        this.entries.push(entry);
        

        this.entries.sort((a, b) => b.score - a.score);
        

        if (this.entries.length > 100) {
            this.entries = this.entries.slice(0, 100);
        }
        
        this.saveLeaderboard();
        return entry;
    }

    getEntries(filter = 'all') {
        if (filter === 'all') {
            return this.entries;
        }
        return this.entries.filter(entry => entry.gameMode === filter);
    }

    getTopScores(limit = 10, filter = 'all') {
        const filtered = this.getEntries(filter);
        return filtered.slice(0, limit);
    }

    getPersonalBest(username) {
        const userEntries = this.entries.filter(entry => entry.username === username);
        if (userEntries.length === 0) return null;
        
        return userEntries.reduce((best, current) => 
            current.score > best.score ? current : best
        );
    }

    getUserRank(username) {

        const sorted = [...this.entries].sort((a, b) => b.score - a.score);
        const index = sorted.findIndex(entry => entry.username === username);
        return index !== -1 ? index + 1 : null;
    }

    clearLeaderboard() {
        this.entries = [];
        this.saveLeaderboard();
    }

    formatDate(dateString) {
        const date = new Date(dateString);
        return date.toLocaleDateString('mn-MN', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit'
        });
    }

    formatTime(timeMs) {
        const totalSeconds = Math.floor(timeMs / 1000);
        const minutes = Math.floor(totalSeconds / 60);
        const seconds = totalSeconds % 60;
        return `${minutes}:${seconds.toString().padStart(2, '0')}`;
    }

    getStats() {
        const stats = {
            totalEntries: this.entries.length,
            topScore: this.entries.length > 0 ? Math.max(...this.entries.map(e => e.score)) : 0,
            averageScore: this.entries.length > 0 ? 
                Math.round(this.entries.reduce((sum, e) => sum + e.score, 0) / this.entries.length) : 0,
            mostPlayedMode: this.getMostPlayedMode(),
            recentEntries: this.entries.slice(0, 5)
        };
        return stats;
    }

    getMostPlayedMode() {
        const modeCounts = {};
        this.entries.forEach(entry => {
            modeCounts[entry.gameMode] = (modeCounts[entry.gameMode] || 0) + 1;
        });
        
        let mostPlayed = 'standard';
        let maxCount = 0;
        
        Object.entries(modeCounts).forEach(([mode, count]) => {
            if (count > maxCount) {
                mostPlayed = mode;
                maxCount = count;
            }
        });
        
        return mostPlayed;
    }
}


const leaderboard = new Leaderboard();
window.Leaderboard = leaderboard;