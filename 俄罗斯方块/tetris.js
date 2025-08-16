class Tetris {
    constructor() {
        this.canvas = document.getElementById('gameCanvas');
        this.ctx = this.canvas.getContext('2d');
        this.nextCanvas = document.getElementById('nextCanvas');
        this.nextCtx = this.nextCanvas.getContext('2d');
        
        // 游戏配置
        this.BOARD_WIDTH = 10;
        this.BOARD_HEIGHT = 20;
        this.BLOCK_SIZE = 30;
        this.gameMode = 'standard'; // 游戏模式：standard, wide, ultra-wide
        
        // 游戏状态
        this.board = [];
        this.currentPiece = null;
        this.nextPiece = null;
        this.score = 0;
        this.level = 1;
        this.lines = 0;
        this.gameRunning = false;
        this.gamePaused = false;
        this.gameOver = false;
        
        // 游戏循环
        this.dropTime = 0;
        this.dropInterval = 1000;
        this.lastTime = 0;
        
        // 方块形状定义（黑白配色）
        this.pieces = [
            // I 形
            [
                [1, 1, 1, 1]
            ],
            // O 形
            [
                [1, 1],
                [1, 1]
            ],
            // T 形
            [
                [0, 1, 0],
                [1, 1, 1]
            ],
            // S 形
            [
                [0, 1, 1],
                [1, 1, 0]
            ],
            // Z 形
            [
                [1, 1, 0],
                [0, 1, 1]
            ],
            // J 形
            [
                [1, 0, 0],
                [1, 1, 1]
            ],
            // L 形
            [
                [0, 0, 1],
                [1, 1, 1]
            ]
        ];
        
        // 方块颜色（黑白配色）
        this.colors = ['#fff', '#000'];
        
        this.init();
    }
    
    init() {
        this.initBoard();
        this.bindEvents();
        this.loadHighScore();
        this.showStartScreen();
    }
    
    initBoard() {
        this.board = [];
        for (let y = 0; y < this.BOARD_HEIGHT; y++) {
            this.board[y] = [];
            for (let x = 0; x < this.BOARD_WIDTH; x++) {
                this.board[y][x] = 0;
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
        document.getElementById('standardModeBtn').addEventListener('click', () => this.setMode('standard'));
        document.getElementById('wideModeBtn').addEventListener('click', () => this.setMode('wide'));
        document.getElementById('ultraWideModeBtn').addEventListener('click', () => this.setMode('ultra-wide'));
    }
    
    handleKeyPress(e) {
        if (!this.gameRunning || this.gamePaused) return;
        
        switch(e.key) {
            case 'ArrowLeft':
                this.movePiece(-1, 0);
                break;
            case 'ArrowRight':
                this.movePiece(1, 0);
                break;
            case 'ArrowDown':
                this.movePiece(0, 1);
                break;
            case 'ArrowUp':
                this.rotatePiece();
                break;
            case ' ':
                e.preventDefault();
                this.togglePause();
                break;
        }
    }
    
    showStartScreen() {
        const overlay = document.getElementById('gameOverlay');
        const title = document.getElementById('overlayTitle');
        const message = document.getElementById('overlayMessage');
        const startBtn = document.getElementById('startBtn');
        const pauseBtn = document.getElementById('pauseBtn');
        const restartBtn = document.getElementById('restartBtn');
        
        title.textContent = '俄罗斯方块';
        message.textContent = '按开始游戏按钮开始';
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
    }
    
    hideOverlay() {
        document.getElementById('gameOverlay').classList.add('hidden');
    }
    
    startGame() {
        this.initBoard();
        this.score = 0;
        this.level = 1;
        this.lines = 0;
        this.gameRunning = true;
        this.gamePaused = false;
        this.gameOver = false;
        this.dropInterval = 1000;
        
        this.updateScore();
        this.spawnPiece();
        this.spawnNextPiece();
        this.hideOverlay();
        
        this.gameLoop();
    }
    
    restartGame() {
        this.startGame();
    }
    
    togglePause() {
        if (!this.gameRunning) return;
        
        if (this.gamePaused) {
            this.gamePaused = false;
            this.hideOverlay();
            this.gameLoop();
        } else {
            this.gamePaused = true;
            this.showPauseScreen();
        }
    }
    
    spawnPiece() {
        if (this.nextPiece) {
            this.currentPiece = {
                shape: this.nextPiece.shape,
                x: Math.floor(this.BOARD_WIDTH / 2) - Math.floor(this.nextPiece.shape[0].length / 2),
                y: 0
            };
        } else {
            const randomIndex = Math.floor(Math.random() * this.pieces.length);
            this.currentPiece = {
                shape: this.pieces[randomIndex],
                x: Math.floor(this.BOARD_WIDTH / 2) - Math.floor(this.pieces[randomIndex][0].length / 2),
                y: 0
            };
        }
        
        // 检查游戏是否结束
        if (this.checkCollision(this.currentPiece.shape, this.currentPiece.x, this.currentPiece.y)) {
            this.gameOver = true;
            this.gameRunning = false;
            this.showGameOverScreen();
            this.saveHighScore();
        }
    }
    
    spawnNextPiece() {
        const randomIndex = Math.floor(Math.random() * this.pieces.length);
        this.nextPiece = {
            shape: this.pieces[randomIndex]
        };
        this.drawNextPiece();
    }
    
    movePiece(dx, dy) {
        if (!this.currentPiece) return;
        
        const newX = this.currentPiece.x + dx;
        const newY = this.currentPiece.y + dy;
        
        if (!this.checkCollision(this.currentPiece.shape, newX, newY)) {
            this.currentPiece.x = newX;
            this.currentPiece.y = newY;
            return true;
        }
        
        // 如果是向下移动失败，说明方块已经到底
        if (dy > 0) {
            this.placePiece();
            this.clearLines();
            this.spawnPiece();
            this.spawnNextPiece();
        }
        
        return false;
    }
    
    rotatePiece() {
        if (!this.currentPiece) return;
        
        const rotated = this.rotateMatrix(this.currentPiece.shape);
        if (!this.checkCollision(rotated, this.currentPiece.x, this.currentPiece.y)) {
            this.currentPiece.shape = rotated;
        }
    }
    
    rotateMatrix(matrix) {
        const rows = matrix.length;
        const cols = matrix[0].length;
        const rotated = [];
        
        for (let i = 0; i < cols; i++) {
            rotated[i] = [];
            for (let j = 0; j < rows; j++) {
                rotated[i][j] = matrix[rows - 1 - j][i];
            }
        }
        
        return rotated;
    }
    
    checkCollision(shape, x, y) {
        for (let row = 0; row < shape.length; row++) {
            for (let col = 0; col < shape[row].length; col++) {
                if (shape[row][col]) {
                    const newX = x + col;
                    const newY = y + row;
                    
                    if (newX < 0 || newX >= this.BOARD_WIDTH || 
                        newY >= this.BOARD_HEIGHT ||
                        (newY >= 0 && this.board[newY][newX])) {
                        return true;
                    }
                }
            }
        }
        return false;
    }
    
    placePiece() {
        if (!this.currentPiece) return;
        
        for (let row = 0; row < this.currentPiece.shape.length; row++) {
            for (let col = 0; col < this.currentPiece.shape[row].length; col++) {
                if (this.currentPiece.shape[row][col]) {
                    const x = this.currentPiece.x + col;
                    const y = this.currentPiece.y + row;
                    if (y >= 0) {
                        this.board[y][x] = 1;
                    }
                }
            }
        }
    }
    
    clearLines() {
        let linesCleared = 0;
        
        for (let y = this.BOARD_HEIGHT - 1; y >= 0; y--) {
            if (this.board[y].every(cell => cell === 1)) {
                this.board.splice(y, 1);
                this.board.unshift(new Array(this.BOARD_WIDTH).fill(0));
                linesCleared++;
                y++; // 重新检查这一行
            }
        }
        
        if (linesCleared > 0) {
            this.lines += linesCleared;
            this.score += linesCleared * 100 * this.level;
            this.level = Math.floor(this.lines / 10) + 1;
            this.dropInterval = Math.max(100, 1000 - (this.level - 1) * 100);
            this.updateScore();
        }
    }
    
    updateScore() {
        document.getElementById('score').textContent = this.score;
        document.getElementById('level').textContent = this.level;
        document.getElementById('lines').textContent = this.lines;
    }
    
    drawBoard() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        // 绘制已放置的方块
        for (let y = 0; y < this.BOARD_HEIGHT; y++) {
            for (let x = 0; x < this.BOARD_WIDTH; x++) {
                if (this.board[y][x]) {
                    this.drawBlock(x, y, 1);
                }
            }
        }
        
        // 绘制当前方块
        if (this.currentPiece) {
            this.drawPiece(this.currentPiece);
        }
        
        // 绘制网格
        this.drawGrid();
    }
    
    drawPiece(piece) {
        for (let row = 0; row < piece.shape.length; row++) {
            for (let col = 0; col < piece.shape[row].length; col++) {
                if (piece.shape[row][col]) {
                    this.drawBlock(piece.x + col, piece.y + row, 1);
                }
            }
        }
    }
    
    drawBlock(x, y, colorIndex) {
        const pixelX = x * this.BLOCK_SIZE;
        const pixelY = y * this.BLOCK_SIZE;
        
        this.ctx.fillStyle = this.colors[colorIndex];
        this.ctx.fillRect(pixelX, pixelY, this.BLOCK_SIZE, this.BLOCK_SIZE);
        
        // 绘制边框
        this.ctx.strokeStyle = this.colors[1 - colorIndex];
        this.ctx.lineWidth = 1;
        this.ctx.strokeRect(pixelX, pixelY, this.BLOCK_SIZE, this.BLOCK_SIZE);
    }
    
    drawGrid() {
        this.ctx.strokeStyle = '#000';
        this.ctx.lineWidth = 1;
        
        for (let x = 0; x <= this.BOARD_WIDTH; x++) {
            this.ctx.beginPath();
            this.ctx.moveTo(x * this.BLOCK_SIZE, 0);
            this.ctx.lineTo(x * this.BLOCK_SIZE, this.canvas.height);
            this.ctx.stroke();
        }
        
        for (let y = 0; y <= this.BOARD_HEIGHT; y++) {
            this.ctx.beginPath();
            this.ctx.moveTo(0, y * this.BLOCK_SIZE);
            this.ctx.lineTo(this.canvas.width, y * this.BLOCK_SIZE);
            this.ctx.stroke();
        }
    }
    
    drawNextPiece() {
        this.nextCtx.clearRect(0, 0, this.nextCanvas.width, this.nextCanvas.height);
        
        if (!this.nextPiece) return;
        
        const blockSize = 20;
        const offsetX = (this.nextCanvas.width - this.nextPiece.shape[0].length * blockSize) / 2;
        const offsetY = (this.nextCanvas.height - this.nextPiece.shape.length * blockSize) / 2;
        
        for (let row = 0; row < this.nextPiece.shape.length; row++) {
            for (let col = 0; col < this.nextPiece.shape[row].length; col++) {
                if (this.nextPiece.shape[row][col]) {
                    const x = offsetX + col * blockSize;
                    const y = offsetY + row * blockSize;
                    
                    this.nextCtx.fillStyle = '#000';
                    this.nextCtx.fillRect(x, y, blockSize, blockSize);
                    this.nextCtx.strokeStyle = '#fff';
                    this.nextCtx.lineWidth = 1;
                    this.nextCtx.strokeRect(x, y, blockSize, blockSize);
                }
            }
        }
    }
    
    gameLoop(currentTime = 0) {
        if (!this.gameRunning || this.gamePaused) return;
        
        const deltaTime = currentTime - this.lastTime;
        this.lastTime = currentTime;
        
        this.dropTime += deltaTime;
        
        if (this.dropTime >= this.dropInterval) {
            this.movePiece(0, 1);
            this.dropTime = 0;
        }
        
        this.drawBoard();
        requestAnimationFrame((time) => this.gameLoop(time));
    }
    
    setMode(mode) {
        if (this.gameMode === mode) return; // 如果已经是当前模式，不做任何操作
        
        this.gameMode = mode;
        
        // 更新按钮状态
        document.querySelectorAll('.mode-btn').forEach(btn => btn.classList.remove('active'));
        document.querySelector(`[data-mode="${mode}"]`).classList.add('active');
        
        // 根据模式设置游戏板宽度
        switch(mode) {
            case 'standard':
                this.BOARD_WIDTH = 10;
                this.canvas.width = 300; // 10 * 30
                break;
            case 'wide':
                this.BOARD_WIDTH = 20;
                this.canvas.width = 600; // 20 * 30
                break;
            case 'ultra-wide':
                this.BOARD_WIDTH = 30;
                this.canvas.width = 900; // 30 * 30
                break;
        }
        
        // 重新初始化游戏板
        this.initBoard();
        
        // 如果游戏正在运行，重新生成方块
        if (this.gameRunning) {
            this.spawnPiece();
        }
        
        // 重新绘制游戏板
        this.drawBoard();
    }
    
    loadHighScore() {
        const highScore = localStorage.getItem('tetrisHighScore') || 0;
        document.getElementById('highScore').textContent = highScore;
    }
    
    saveHighScore() {
        const currentHighScore = parseInt(localStorage.getItem('tetrisHighScore') || 0);
        if (this.score > currentHighScore) {
            localStorage.setItem('tetrisHighScore', this.score.toString());
            document.getElementById('highScore').textContent = this.score;
        }
    }
}

// 启动游戏
document.addEventListener('DOMContentLoaded', () => {
    new Tetris();
}); 