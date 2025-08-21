class SnakeGame {
    constructor() {
        this.canvas = document.getElementById('gameCanvas');
        this.ctx = this.canvas.getContext('2d');
        
        // 游戏配置
        this.GRID_SIZE = 20;
        this.CANVAS_WIDTH = this.canvas.width;
        this.CANVAS_HEIGHT = this.canvas.height;
        this.GRID_WIDTH = this.CANVAS_WIDTH / this.GRID_SIZE;
        this.GRID_HEIGHT = this.CANVAS_HEIGHT / this.GRID_SIZE;
        
        // 游戏状态
        this.snake = [];
        this.food = {};
        this.direction = 'right';
        this.nextDirection = 'right';
        this.score = 0;
        this.foodCount = 0;
        this.gameRunning = false;
        this.gamePaused = false;
        this.gameOver = false;
        this.gameMode = 'normal';
        
        // 游戏循环
        this.gameSpeed = 150; // 毫秒
        this.gameLoop = null;
        
        this.init();
    }
    
    init() {
        this.bindEvents();
        this.loadHighScore();
        this.showStartScreen();
    }
    
    bindEvents() {
        // 键盘事件
        document.addEventListener('keydown', (e) => this.handleKeyPress(e));
        
        // 按钮事件
        document.getElementById('startBtn').addEventListener('click', () => this.startGame());
        document.getElementById('pauseBtn').addEventListener('click', () => this.togglePause());
        document.getElementById('restartBtn').addEventListener('click', () => this.restartGame());
        
        // 模式切换按钮
        document.getElementById('easyModeBtn').addEventListener('click', () => this.setMode('easy'));
        document.getElementById('normalModeBtn').addEventListener('click', () => this.setMode('normal'));
        document.getElementById('hardModeBtn').addEventListener('click', () => this.setMode('hard'));
        
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
        
        switch(e.key) {
            case 'ArrowLeft':
                if (this.direction !== 'right') {
                    this.nextDirection = 'left';
                }
                break;
            case 'ArrowRight':
                if (this.direction !== 'left') {
                    this.nextDirection = 'right';
                }
                break;
            case 'ArrowUp':
                if (this.direction !== 'down') {
                    this.nextDirection = 'up';
                }
                break;
            case 'ArrowDown':
                if (this.direction !== 'up') {
                    this.nextDirection = 'down';
                }
                break;
            case ' ':
                this.togglePause();
                break;
            case 'r':
            case 'R':
                this.restartGame();
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
        
        title.textContent = '贪吃蛇';
        message.textContent = '使用方向键控制蛇的移动，吃掉食物增长身体';
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
    
    hideOverlay() {
        document.getElementById('gameOverlay').classList.add('hidden');
    }
    
    startGame() {
        this.initSnake();
        this.generateFood();
        this.score = 0;
        this.foodCount = 0;
        this.direction = 'right';
        this.nextDirection = 'right';
        this.gameRunning = true;
        this.gamePaused = false;
        this.gameOver = false;
        
        // 根据难度设置游戏速度
        this.setGameSpeed();
        
        this.updateScore();
        this.hideOverlay();
        this.startGameLoop();
    }
    
    restartGame() {
        this.stopGameLoop();
        this.startGame();
    }
    
    togglePause() {
        if (!this.gameRunning && !this.gameOver) return;
        
        if (this.gamePaused) {
            this.gamePaused = false;
            this.hideOverlay();
            this.startGameLoop();
        } else {
            this.gamePaused = true;
            this.stopGameLoop();
            this.showPauseScreen();
        }
    }
    
    initSnake() {
        this.snake = [
            {x: Math.floor(this.GRID_WIDTH / 2), y: Math.floor(this.GRID_HEIGHT / 2)}
        ];
    }
    
    generateFood() {
        let foodPosition;
        do {
            foodPosition = {
                x: Math.floor(Math.random() * this.GRID_WIDTH),
                y: Math.floor(Math.random() * this.GRID_HEIGHT)
            };
        } while (this.isSnakePosition(foodPosition));
        
        this.food = foodPosition;
    }
    
    isSnakePosition(position) {
        return this.snake.some(segment => segment.x === position.x && segment.y === position.y);
    }
    
    setGameSpeed() {
        switch(this.gameMode) {
            case 'easy':
                this.gameSpeed = 200;
                break;
            case 'normal':
                this.gameSpeed = 150;
                break;
            case 'hard':
                this.gameSpeed = 100;
                break;
        }
    }
    
    startGameLoop() {
        this.gameLoop = setInterval(() => {
            this.update();
            this.draw();
        }, this.gameSpeed);
    }
    
    stopGameLoop() {
        if (this.gameLoop) {
            clearInterval(this.gameLoop);
            this.gameLoop = null;
        }
    }
    
    update() {
        if (!this.gameRunning || this.gamePaused || this.gameOver) return;
        
        // 更新方向
        this.direction = this.nextDirection;
        
        // 计算新的头部位置
        const head = {...this.snake[0]};
        
        switch(this.direction) {
            case 'left':
                head.x--;
                break;
            case 'right':
                head.x++;
                break;
            case 'up':
                head.y--;
                break;
            case 'down':
                head.y++;
                break;
        }
        
        // 检查边界碰撞
        if (head.x < 0 || head.x >= this.GRID_WIDTH || 
            head.y < 0 || head.y >= this.GRID_HEIGHT) {
            this.showGameOverScreen();
            return;
        }
        
        // 检查自身碰撞
        if (this.isSnakePosition(head)) {
            this.showGameOverScreen();
            return;
        }
        
        // 添加新头部
        this.snake.unshift(head);
        
        // 检查是否吃到食物
        if (head.x === this.food.x && head.y === this.food.y) {
            this.score += 10;
            this.foodCount++;
            this.updateScore();
            this.generateFood();
            
            // 根据分数增加游戏速度
            if (this.score % 50 === 0 && this.gameSpeed > 50) {
                this.gameSpeed = Math.max(50, this.gameSpeed - 5);
                this.stopGameLoop();
                this.startGameLoop();
            }
        } else {
            // 移除尾部
            this.snake.pop();
        }
    }
    
    draw() {
        // 清空画布
        this.ctx.fillStyle = '#fff';
        this.ctx.fillRect(0, 0, this.CANVAS_WIDTH, this.CANVAS_HEIGHT);
        
        // 绘制网格
        this.drawGrid();
        
        // 绘制蛇
        this.drawSnake();
        
        // 绘制食物
        this.drawFood();
    }
    
    drawGrid() {
        this.ctx.strokeStyle = '#eee';
        this.ctx.lineWidth = 1;
        
        // 绘制垂直线
        for (let x = 0; x <= this.GRID_WIDTH; x++) {
            this.ctx.beginPath();
            this.ctx.moveTo(x * this.GRID_SIZE, 0);
            this.ctx.lineTo(x * this.GRID_SIZE, this.CANVAS_HEIGHT);
            this.ctx.stroke();
        }
        
        // 绘制水平线
        for (let y = 0; y <= this.GRID_HEIGHT; y++) {
            this.ctx.beginPath();
            this.ctx.moveTo(0, y * this.GRID_SIZE);
            this.ctx.lineTo(this.CANVAS_WIDTH, y * this.GRID_SIZE);
            this.ctx.stroke();
        }
    }
    
    drawSnake() {
        this.snake.forEach((segment, index) => {
            const x = segment.x * this.GRID_SIZE;
            const y = segment.y * this.GRID_SIZE;
            
            // 蛇头用深色，身体用浅色
            this.ctx.fillStyle = index === 0 ? '#000' : '#666';
            this.ctx.fillRect(x + 1, y + 1, this.GRID_SIZE - 2, this.GRID_SIZE - 2);
            
            // 绘制边框
            this.ctx.strokeStyle = '#000';
            this.ctx.lineWidth = 2;
            this.ctx.strokeRect(x + 1, y + 1, this.GRID_SIZE - 2, this.GRID_SIZE - 2);
        });
    }
    
    drawFood() {
        const x = this.food.x * this.GRID_SIZE;
        const y = this.food.y * this.GRID_SIZE;
        
        // 绘制食物（圆形）
        this.ctx.fillStyle = '#ff0000';
        this.ctx.beginPath();
        this.ctx.arc(
            x + this.GRID_SIZE / 2, 
            y + this.GRID_SIZE / 2, 
            (this.GRID_SIZE - 4) / 2, 
            0, 
            2 * Math.PI
        );
        this.ctx.fill();
        
        // 绘制食物边框
        this.ctx.strokeStyle = '#000';
        this.ctx.lineWidth = 2;
        this.ctx.stroke();
    }
    
    updateScore() {
        document.getElementById('score').textContent = this.score;
        document.getElementById('length').textContent = this.snake.length;
        document.getElementById('food').textContent = this.foodCount;
    }
    
    setMode(mode) {
        if (this.gameMode === mode) return;
        
        this.gameMode = mode;
        
        // 更新按钮状态
        document.querySelectorAll('.mode-btn').forEach(btn => btn.classList.remove('active'));
        document.querySelector(`[data-mode="${mode}"]`).classList.add('active');
        
        // 如果游戏正在运行，重新开始
        if (this.gameRunning) {
            this.restartGame();
        }
    }
    
    loadHighScore() {
        const highScore = localStorage.getItem('snakeHighScore') || 0;
        document.getElementById('highScore').textContent = highScore;
    }
    
    saveHighScore() {
        const currentHighScore = parseInt(localStorage.getItem('snakeHighScore') || 0);
        if (this.score > currentHighScore) {
            localStorage.setItem('snakeHighScore', this.score.toString());
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
    new SnakeGame();
});
