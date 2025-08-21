class Game2048 {
    constructor() {
        this.board = [];
        this.score = 0;
        this.moves = 0;
        this.maxTile = 0;
        this.gameRunning = false;
        this.gamePaused = false;
        this.gameOver = false;
        this.gameWon = false;
        this.gameMode = 'classic';
        
        this.BOARD_SIZE = 4;
        this.EMPTY_CELL = 0;
        
        this.init();
    }
    
    init() {
        this.initBoard();
        this.createGameBoard();
        this.bindEvents();
        this.loadHighScore();
        this.showStartScreen();
    }
    
    initBoard() {
        this.board = [];
        for (let i = 0; i < this.BOARD_SIZE; i++) {
            this.board[i] = [];
            for (let j = 0; j < this.BOARD_SIZE; j++) {
                this.board[i][j] = this.EMPTY_CELL;
            }
        }
    }
    
    createGameBoard() {
        const gameBoard = document.getElementById('gameBoard');
        gameBoard.innerHTML = '';
        
        for (let i = 0; i < this.BOARD_SIZE; i++) {
            for (let j = 0; j < this.BOARD_SIZE; j++) {
                const cell = document.createElement('div');
                cell.className = 'game-cell';
                cell.id = `cell-${i}-${j}`;
                gameBoard.appendChild(cell);
            }
        }
    }
    
    bindEvents() {
        // 键盘事件
        document.addEventListener('keydown', (e) => this.handleKeyPress(e));
        
        // 按钮事件
        document.getElementById('startBtn').addEventListener('click', () => this.startGame());
        document.getElementById('pauseBtn').addEventListener('click', () => this.togglePause());
        document.getElementById('restartBtn').addEventListener('click', () => this.restartGame());
        
        // 模式切换按钮
        document.getElementById('classicModeBtn').addEventListener('click', () => this.setMode('classic'));
        document.getElementById('endlessModeBtn').addEventListener('click', () => this.setMode('endless'));
        
        // 为所有按钮添加墨水飞溅效果
        this.addInkSplashToButtons();
    }
    
    handleKeyPress(e) {
        if (!this.gameRunning || this.gamePaused || this.gameOver) {
            if (e.key === ' ') {
                e.preventDefault();
                this.togglePause();
            } else if (e.key.toLowerCase() === 'r') {
                e.preventDefault();
                this.restartGame();
            }
            return;
        }
        
        e.preventDefault();
        let moved = false;
        
        switch(e.key) {
            case 'ArrowLeft':
                moved = this.moveLeft();
                break;
            case 'ArrowRight':
                moved = this.moveRight();
                break;
            case 'ArrowUp':
                moved = this.moveUp();
                break;
            case 'ArrowDown':
                moved = this.moveDown();
                break;
            case ' ':
                this.togglePause();
                return;
            case 'r':
            case 'R':
                this.restartGame();
                return;
        }
        
        if (moved) {
            this.moves++;
            this.addRandomTile();
            this.updateDisplay();
            this.updateScore();
            
            if (this.checkWin()) {
                if (this.gameMode === 'classic') {
                    this.showWinScreen();
                } else {
                    // 无尽模式：达到2048后继续游戏，只标记为已获胜但不停止
                    if (!this.gameWon) {
                        this.gameWon = true;
                        this.saveHighScore();
                        // 显示短暂提示但不停止游戏
                        this.showEndlessWinMessage();
                    }
                }
            }
            
            if (this.checkGameOver()) {
                this.showGameOverScreen();
            }
        }
    }
    
    showStartScreen() {
        const overlay = document.getElementById('gameOverlay');
        const title = document.getElementById('overlayTitle');
        const message = document.getElementById('overlayMessage');
        const startBtn = document.getElementById('startBtn');
        const pauseBtn = document.getElementById('pauseBtn');
        const restartBtn = document.getElementById('restartBtn');
        
        title.textContent = '2048 游戏';
        if (this.gameMode === 'classic') {
            message.textContent = '经典模式：达到2048即可获胜';
        } else {
            message.textContent = '无尽模式：挑战数字极限！';
        }
        startBtn.style.display = 'inline-block';
        pauseBtn.style.display = 'none';
        restartBtn.style.display = 'none';
        overlay.classList.remove('hidden');
    }
    
    showPauseScreen() {
        const overlay = document.getElementById('gameOverlay');
        const title = document.getElementById('overlayTitle');
        const message = document.getElementById('overlayMessage');
        const startBtn = document.getElementById('startBtn');
        const pauseBtn = document.getElementById('pauseBtn');
        const restartBtn = document.getElementById('restartBtn');
        
        title.textContent = '游戏暂停';
        message.textContent = '按继续游戏按钮继续';
        startBtn.style.display = 'none';
        pauseBtn.style.display = 'inline-block';
        restartBtn.style.display = 'inline-block';
        overlay.classList.remove('hidden');
    }
    
    showGameOverScreen() {
        const overlay = document.getElementById('gameOverlay');
        const title = document.getElementById('overlayTitle');
        const message = document.getElementById('overlayMessage');
        const startBtn = document.getElementById('startBtn');
        const pauseBtn = document.getElementById('pauseBtn');
        const restartBtn = document.getElementById('restartBtn');
        
        title.textContent = '游戏结束';
        message.textContent = `最终分数: ${this.score}`;
        startBtn.style.display = 'none';
        pauseBtn.style.display = 'none';
        restartBtn.style.display = 'inline-block';
        overlay.classList.remove('hidden');
        
        this.gameOver = true;
        this.gameRunning = false;
        this.saveHighScore();
    }
    
    showWinScreen() {
        const overlay = document.getElementById('gameOverlay');
        const title = document.getElementById('overlayTitle');
        const message = document.getElementById('overlayMessage');
        const startBtn = document.getElementById('startBtn');
        const pauseBtn = document.getElementById('pauseBtn');
        const restartBtn = document.getElementById('restartBtn');
        
        title.textContent = '恭喜获胜！';
        if (this.gameMode === 'classic') {
            message.textContent = `经典模式胜利！达到2048，分数: ${this.score}`;
        } else {
            message.textContent = `无尽模式继续中...当前分数: ${this.score}`;
        }
        startBtn.style.display = 'none';
        pauseBtn.style.display = 'none';
        restartBtn.style.display = 'inline-block';
        overlay.classList.remove('hidden');
        
        this.gameWon = true;
        this.saveHighScore();
    }
    
    hideOverlay() {
        document.getElementById('gameOverlay').classList.add('hidden');
    }
    
    startGame() {
        this.initBoard();
        this.score = 0;
        this.moves = 0;
        this.maxTile = 0;
        this.gameRunning = true;
        this.gamePaused = false;
        this.gameOver = false;
        this.gameWon = false;
        
        // 根据难度添加初始方块
        this.addInitialTiles();
        
        this.updateDisplay();
        this.updateScore();
        this.hideOverlay();
    }
    
    restartGame() {
        this.startGame();
    }
    
    togglePause() {
        if (!this.gameRunning && !this.gameOver) return;
        
        if (this.gamePaused) {
            this.gamePaused = false;
            this.hideOverlay();
        } else {
            this.gamePaused = true;
            this.showPauseScreen();
        }
    }
    
    addInitialTiles() {
        // 两种模式都是2个初始方块
        for (let i = 0; i < 2; i++) {
            this.addRandomTile();
        }
    }
    
    addRandomTile() {
        const emptyCells = [];
        
        for (let i = 0; i < this.BOARD_SIZE; i++) {
            for (let j = 0; j < this.BOARD_SIZE; j++) {
                if (this.board[i][j] === this.EMPTY_CELL) {
                    emptyCells.push({row: i, col: j});
                }
            }
        }
        
        if (emptyCells.length === 0) return;
        
        const randomIndex = Math.floor(Math.random() * emptyCells.length);
        const {row, col} = emptyCells[randomIndex];
        
        // 两种模式都使用相同的概率：90%是2，10%是4
        const newValue = Math.random() < 0.9 ? 2 : 4;
        
        this.board[row][col] = newValue;
    }
    
    moveLeft() {
        let moved = false;
        
        for (let i = 0; i < this.BOARD_SIZE; i++) {
            const row = this.board[i].slice();
            const newRow = this.processLine(row);
            
            if (!this.arraysEqual(row, newRow)) {
                moved = true;
                this.board[i] = newRow;
            }
        }
        
        return moved;
    }
    
    moveRight() {
        let moved = false;
        
        for (let i = 0; i < this.BOARD_SIZE; i++) {
            const row = this.board[i].slice().reverse();
            const newRow = this.processLine(row).reverse();
            
            if (!this.arraysEqual(this.board[i], newRow)) {
                moved = true;
                this.board[i] = newRow;
            }
        }
        
        return moved;
    }
    
    moveUp() {
        let moved = false;
        
        for (let j = 0; j < this.BOARD_SIZE; j++) {
            const col = [];
            for (let i = 0; i < this.BOARD_SIZE; i++) {
                col.push(this.board[i][j]);
            }
            
            const newCol = this.processLine(col);
            
            if (!this.arraysEqual(col, newCol)) {
                moved = true;
                for (let i = 0; i < this.BOARD_SIZE; i++) {
                    this.board[i][j] = newCol[i];
                }
            }
        }
        
        return moved;
    }
    
    moveDown() {
        let moved = false;
        
        for (let j = 0; j < this.BOARD_SIZE; j++) {
            const col = [];
            for (let i = 0; i < this.BOARD_SIZE; i++) {
                col.push(this.board[i][j]);
            }
            col.reverse();
            
            const newCol = this.processLine(col).reverse();
            
            const originalCol = [];
            for (let i = 0; i < this.BOARD_SIZE; i++) {
                originalCol.push(this.board[i][j]);
            }
            
            if (!this.arraysEqual(originalCol, newCol)) {
                moved = true;
                for (let i = 0; i < this.BOARD_SIZE; i++) {
                    this.board[i][j] = newCol[i];
                }
            }
        }
        
        return moved;
    }
    
    processLine(line) {
        // 移除空格并移动到左边
        const filtered = line.filter(val => val !== this.EMPTY_CELL);
        const merged = [];
        let skip = false;
        
        for (let i = 0; i < filtered.length; i++) {
            if (skip) {
                skip = false;
                continue;
            }
            
            if (i < filtered.length - 1 && filtered[i] === filtered[i + 1]) {
                const mergedValue = filtered[i] * 2;
                merged.push(mergedValue);
                this.score += mergedValue;
                this.maxTile = Math.max(this.maxTile, mergedValue);
                skip = true;
            } else {
                merged.push(filtered[i]);
            }
        }
        
        // 填充空格
        while (merged.length < this.BOARD_SIZE) {
            merged.push(this.EMPTY_CELL);
        }
        
        return merged;
    }
    
    arraysEqual(arr1, arr2) {
        return arr1.length === arr2.length && arr1.every((val, index) => val === arr2[index]);
    }
    
    updateDisplay() {
        for (let i = 0; i < this.BOARD_SIZE; i++) {
            for (let j = 0; j < this.BOARD_SIZE; j++) {
                const cell = document.getElementById(`cell-${i}-${j}`);
                const value = this.board[i][j];
                
                cell.className = 'game-cell';
                if (value !== this.EMPTY_CELL) {
                    cell.textContent = value;
                    cell.classList.add(`tile-${value}`);
                } else {
                    cell.textContent = '';
                }
            }
        }
    }
    
    updateScore() {
        document.getElementById('score').textContent = this.score;
        document.getElementById('moves').textContent = this.moves;
        document.getElementById('maxTile').textContent = this.maxTile;
    }
    
    checkWin() {
        // 经典模式：只在第一次达到2048时返回true
        // 无尽模式：只在第一次达到2048时返回true，之后继续游戏
        if (this.gameWon) return false;
        
        for (let i = 0; i < this.BOARD_SIZE; i++) {
            for (let j = 0; j < this.BOARD_SIZE; j++) {
                if (this.board[i][j] === 2048) {
                    return true;
                }
            }
        }
        return false;
    }
    
    showEndlessWinMessage() {
        // 创建短暂的获胜提示
        const winMessage = document.createElement('div');
        winMessage.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: rgba(0, 0, 0, 0.9);
            color: white;
            padding: 20px 40px;
            border-radius: 10px;
            font-size: 1.5rem;
            font-weight: bold;
            z-index: 10000;
            border: 3px solid #fff;
            text-align: center;
        `;
        winMessage.textContent = '🎉 达到2048！无尽模式继续！';
        document.body.appendChild(winMessage);
        
        // 3秒后自动消失
        setTimeout(() => {
            if (winMessage.parentNode) {
                winMessage.parentNode.removeChild(winMessage);
            }
        }, 3000);
    }
    
    checkGameOver() {
        // 检查是否还有空格
        for (let i = 0; i < this.BOARD_SIZE; i++) {
            for (let j = 0; j < this.BOARD_SIZE; j++) {
                if (this.board[i][j] === this.EMPTY_CELL) {
                    return false;
                }
            }
        }
        
        // 检查是否还能合并
        for (let i = 0; i < this.BOARD_SIZE; i++) {
            for (let j = 0; j < this.BOARD_SIZE; j++) {
                const current = this.board[i][j];
                
                // 检查右边
                if (j < this.BOARD_SIZE - 1 && current === this.board[i][j + 1]) {
                    return false;
                }
                
                // 检查下边
                if (i < this.BOARD_SIZE - 1 && current === this.board[i + 1][j]) {
                    return false;
                }
            }
        }
        
        return true;
    }
    
    setMode(mode) {
        if (this.gameMode === mode) return;
        
        this.gameMode = mode;
        
        // 更新按钮状态
        document.querySelectorAll('.mode-btn').forEach(btn => btn.classList.remove('active'));
        document.querySelector(`[data-mode="${mode}"]`).classList.add('active');
        
        // 更新开始界面信息
        this.showStartScreen();
        
        // 如果游戏正在运行，重新开始
        if (this.gameRunning) {
            this.startGame();
        }
    }
    
    loadHighScore() {
        const highScore = localStorage.getItem('2048HighScore') || 0;
        document.getElementById('highScore').textContent = highScore;
    }
    
    saveHighScore() {
        const currentHighScore = parseInt(localStorage.getItem('2048HighScore') || 0);
        if (this.score > currentHighScore) {
            localStorage.setItem('2048HighScore', this.score.toString());
            document.getElementById('highScore').textContent = this.score;
        }
    }
    
    // 为所有按钮添加墨水飞溅效果
    addInkSplashToButtons() {
        const buttons = document.querySelectorAll('.game-btn, .mode-btn');
        buttons.forEach(button => {
            button.addEventListener('mousedown', (e) => this.createInkSplash(e, button));
        });
    }
    
    // 创建墨水飞溅效果
    createInkSplash(event, element) {
        const rect = element.getBoundingClientRect();
        const elementWidth = rect.width;
        const elementHeight = rect.height;

        // 动态创建12个墨水滴
        for (let i = 0; i < 12; i++) {
            const inkDrop = document.createElement('div');
            inkDrop.className = 'ink-drop';
            inkDrop.style.cssText = `
                position: fixed;
                width: ${8 + Math.random() * 12}px;
                height: ${8 + Math.random() * 12}px;
                background: #000;
                border-radius: 50%;
                opacity: 0;
                pointer-events: none;
                z-index: 9999;
                box-shadow: 0 0 4px rgba(0, 0, 0, 0.5), 0 0 8px rgba(0, 0, 0, 0.3);
                filter: blur(0.5px);
            `;
            document.body.appendChild(inkDrop);

            // 在控件四周边缘随机选择起始位置（基于页面坐标）
            let startX, startY;
            const side = Math.floor(Math.random() * 4); // 0:上, 1:右, 2:下, 3:左
            
            switch(side) {
                case 0: // 上边
                    startX = rect.left + Math.random() * elementWidth;
                    startY = rect.top;
                    break;
                case 1: // 右边
                    startX = rect.right;
                    startY = rect.top + Math.random() * elementHeight;
                    break;
                case 2: // 下边
                    startX = rect.left + Math.random() * elementWidth;
                    startY = rect.bottom;
                    break;
                case 3: // 左边
                    startX = rect.left;
                    startY = rect.top + Math.random() * elementHeight;
                    break;
            }
            
            // 计算飞溅方向（从边缘向外，添加更多随机性）
            const centerX = rect.left + elementWidth / 2;
            const centerY = rect.top + elementHeight / 2;
            const baseAngle = Math.atan2(startY - centerY, startX - centerX);
            const randomAngle = baseAngle + (Math.random() - 0.5) * 1.0; // 更大的角度随机性
            const distance = 80 + Math.random() * 120; // 更大的飞溅距离
            const finalX = Math.cos(randomAngle) * distance;
            const finalY = Math.sin(randomAngle) * distance;

            inkDrop.style.left = `${startX}px`;
            inkDrop.style.top = `${startY}px`;
            inkDrop.style.transform = 'translate(0, 0) scale(1)';
            inkDrop.style.opacity = '1';

            // 随机延迟动画
            const delay = Math.random() * 150;
            const rotation = (Math.random() - 0.5) * 360; // 随机旋转角度
            setTimeout(() => {
                inkDrop.style.transition = 'all 0.8s ease-out';
                inkDrop.style.transform = `translate(${finalX}px, ${finalY}px) scale(${0.3 + Math.random() * 0.7}) rotate(${rotation}deg)`;
                inkDrop.style.opacity = '0';
            }, delay);

            // 清理元素
            setTimeout(() => {
                if (inkDrop.parentNode) {
                    inkDrop.parentNode.removeChild(inkDrop);
                }
            }, 800 + delay);
        }
    }
}

// 启动游戏
document.addEventListener('DOMContentLoaded', () => {
    new Game2048();
});
