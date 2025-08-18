class GameCardManager {
    constructor() {
        this.games = [];
        this.selectedGame = null;
        this.currentSort = 'name';
        this.currentFilter = 'all';
        this.isEditing = false;
        this.editingIndex = -1;
        
        this.initializeElements();
        this.bindEvents();
        this.loadSampleData();
        this.renderCards();
        this.renderFilters();
        this.setupInkSplashEffect();
    }

    initializeElements() {
        // 获取DOM元素
        this.cardsGrid = document.getElementById('cardsGrid');
        this.filterList = document.getElementById('filterList');
        this.searchInput = document.getElementById('searchInput');
        this.searchBtn = document.getElementById('searchBtn');
        this.cardTypeSelect = document.getElementById('cardTypeSelect');
        
        // 按钮元素
        this.importBtn = document.getElementById('importBtn');
        this.exportBtn = document.getElementById('exportBtn');
        this.addGameBtn = document.getElementById('addGameBtn');
        this.editBtn = document.getElementById('editBtn');
        this.deleteBtn = document.getElementById('deleteBtn');
        
        // 排序按钮
        this.sortBtns = document.querySelectorAll('.sort-btn');
        
        // 模态框元素
        this.gameModal = document.getElementById('gameModal');
        this.gameForm = document.getElementById('gameForm');
        this.modalTitle = document.getElementById('modalTitle');
        this.closeModal = document.getElementById('closeModal');
        this.saveGame = document.getElementById('saveGame');
        this.cancelGame = document.getElementById('cancelGame');
        
        // 表单输入元素
        this.gameNameInput = document.getElementById('gameName');
        this.originalPriceInput = document.getElementById('originalPrice');
        this.purchasePriceInput = document.getElementById('purchasePrice');
        this.playTimeInput = document.getElementById('playTime');
        this.achievementCurrentInput = document.getElementById('achievementCurrent');
        this.achievementTotalInput = document.getElementById('achievementTotal');
        this.gameTagsInput = document.getElementById('gameTagsInput');
        this.gameImageInput = document.getElementById('gameImage');
        
        // 详细信息元素
        this.detailHeader = document.querySelector('.detail-header');
        this.previewImage = document.getElementById('previewImage');
        this.gameTagsDisplay = document.getElementById('gameTags');
        this.originalPriceDisplay = document.getElementById('originalPriceDisplay');
        this.purchasePriceDisplay = document.getElementById('purchasePriceDisplay');
        this.gameTimeDisplay = document.getElementById('gameTime');
        this.achievementProgress = document.getElementById('achievementProgress');
        
        // 文件输入
        this.importInput = document.getElementById('importInput');
    }

    bindEvents() {
        // 搜索功能
        this.searchBtn.addEventListener('click', () => this.handleSearch());
        this.searchInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.handleSearch();
        });
        
        // 排序按钮
        this.sortBtns.forEach(btn => {
            btn.addEventListener('click', () => this.handleSort(btn.dataset.sort));
        });
        
        // 操作按钮
        this.importBtn.addEventListener('click', () => this.handleImport());
        this.exportBtn.addEventListener('click', () => this.handleExport());
        this.addGameBtn.addEventListener('click', () => this.showAddGameModal());
        this.editBtn.addEventListener('click', () => this.showEditGameModal());
        this.deleteBtn.addEventListener('click', () => this.handleDelete());
        
        // 模态框事件
        this.closeModal.addEventListener('click', () => this.hideModal());
        this.cancelGame.addEventListener('click', () => this.hideModal());
        this.saveGame.addEventListener('click', () => this.handleSaveGame());
        
        // 点击模态框外部关闭
        this.gameModal.addEventListener('click', (e) => {
            if (e.target === this.gameModal) this.hideModal();
        });
        
        // 文件导入
        this.importInput.addEventListener('change', (e) => this.handleFileImport(e));
        
        // 图片预览
        this.gameImageInput.addEventListener('change', (e) => this.handleImagePreview(e));
    }

    loadSampleData() {
        // 加载示例数据
        this.games = [];
    }

    renderCards() {
        let filteredGames = [...this.games];
        
        // 应用搜索过滤
        const searchTerm = this.searchInput.value.toLowerCase();
        if (searchTerm) {
            filteredGames = filteredGames.filter(game => 
                game.name.toLowerCase().includes(searchTerm) ||
                game.tags.some(tag => tag.toLowerCase().includes(searchTerm))
            );
        }
        
        // 应用标签过滤
        if (this.currentFilter !== 'all') {
            filteredGames = filteredGames.filter(game => 
                game.tags.includes(this.currentFilter)
            );
        }
        
        // 应用排序
        filteredGames.sort((a, b) => {
            switch (this.currentSort) {
                case 'name':
                    return a.name.localeCompare(b.name);
                case 'time':
                    return b.playTime - a.playTime;
                case 'price':
                    return b.originalPrice - a.originalPrice;
                case 'achievement':
                    const aPercent = a.achievementCurrent / a.achievementTotal;
                    const bPercent = b.achievementCurrent / b.achievementTotal;
                    return bPercent - aPercent;
                default:
                    return 0;
            }
        });
        
        // 渲染卡片
        this.cardsGrid.innerHTML = '';
        filteredGames.forEach((game, index) => {
            const cardElement = this.createGameCard(game, index);
            this.cardsGrid.appendChild(cardElement);
        });
        
        // 如果有选中的游戏，更新详细信息
        if (this.selectedGame) {
            this.updateGameDetails(this.selectedGame);
        }
    }

    createGameCard(game, index) {
        const card = document.createElement('div');
        card.className = 'game-card';
        card.dataset.gameId = game.id;
        
        const achievementDisplay = game.achievementTotal === 0 ? '无成就' : `${Math.round((game.achievementCurrent / game.achievementTotal) * 100)}%`;
        const priceDisplay = game.originalPrice === 0 ? '免费' : `${game.originalPrice.toFixed(2)}¥`;
        
        card.innerHTML = `
            <div class="card-name">${game.name}</div>
            <div class="card-preview">
                ${game.imageData ? `<img src="${game.imageData}" alt="${game.name}">` : '预览图片'}
            </div>
            <div class="card-info">
                <div>原价: ${priceDisplay}</div>
                <div>时长: ${game.playTime}h</div>
                <div>成就: ${achievementDisplay}</div>
            </div>
        `;
        
        card.addEventListener('click', () => this.selectGame(game));
        
        return card;
    }

    selectGame(game) {
        this.selectedGame = game;
        
        // 更新卡片选中状态
        document.querySelectorAll('.game-card').forEach(card => {
            card.classList.remove('selected');
        });
        
        const selectedCard = document.querySelector(`[data-game-id="${game.id}"]`);
        if (selectedCard) {
            selectedCard.classList.add('selected');
        }
        
        // 更新详细信息
        this.updateGameDetails(game);
    }

    updateGameDetails(game) {
        this.detailHeader.textContent = game.name;
        
        // 更新预览图片
        if (game.imageData) {
            this.previewImage.innerHTML = `<img src="${game.imageData}" alt="${game.name}">`;
        } else {
            this.previewImage.innerHTML = '图片预览';
        }
        
        // 更新标签
        this.gameTagsDisplay.innerHTML = '';
        game.tags.forEach(tag => {
            const tagElement = document.createElement('span');
            tagElement.className = 'tag';
            tagElement.textContent = tag;
            this.gameTagsDisplay.appendChild(tagElement);
        });
        
        // 更新价格和时长
        this.originalPriceDisplay.textContent = game.originalPrice === 0 ? '免费' : `¥${game.originalPrice.toFixed(2)}`;
        this.purchasePriceDisplay.textContent = game.purchasePrice === 0 ? '免费' : `¥${game.purchasePrice.toFixed(2)}`;
        this.gameTimeDisplay.textContent = `${game.playTime}小时`;
        
        // 更新成就进度
        const achievementLabel = document.querySelector('.achievement-label');
        if (game.achievementTotal === 0) {
            this.achievementProgress.style.width = '0%';
            achievementLabel.textContent = '无成就';
        } else {
            const achievementPercent = (game.achievementCurrent / game.achievementTotal) * 100;
            this.achievementProgress.style.width = `${achievementPercent}%`;
            achievementLabel.textContent = `成就 (${game.achievementCurrent}/${game.achievementTotal})`;
        }
    }

    renderFilters() {
        // 收集所有标签
        const allTags = new Set();
        this.games.forEach(game => {
            game.tags.forEach(tag => allTags.add(tag));
        });
        
        // 渲染筛选标签
        this.filterList.innerHTML = '';
        
        // 添加"全部"选项
        const allFilter = document.createElement('div');
        allFilter.className = 'filter-item active';
        allFilter.textContent = '全部';
        allFilter.addEventListener('click', () => this.setFilter('all', allFilter));
        this.filterList.appendChild(allFilter);
        
        // 添加标签筛选
        Array.from(allTags).sort().forEach(tag => {
            const filterItem = document.createElement('div');
            filterItem.className = 'filter-item';
            filterItem.textContent = tag;
            filterItem.addEventListener('click', () => this.setFilter(tag, filterItem));
            this.filterList.appendChild(filterItem);
        });
    }

    setFilter(filter, element) {
        this.currentFilter = filter;
        
        // 更新筛选按钮状态
        document.querySelectorAll('.filter-item').forEach(item => {
            item.classList.remove('active');
        });
        element.classList.add('active');
        
        // 重新渲染卡片
        this.renderCards();
    }

    handleSearch() {
        this.renderCards();
    }

    handleSort(sortType) {
        this.currentSort = sortType;
        
        // 更新排序按钮状态
        this.sortBtns.forEach(btn => {
            btn.classList.remove('active');
        });
        
        const activeBtn = document.querySelector(`[data-sort="${sortType}"]`);
        if (activeBtn) {
            activeBtn.classList.add('active');
        }
        
        this.renderCards();
    }

    showAddGameModal() {
        this.isEditing = false;
        this.modalTitle.textContent = '添加游戏';
        this.gameForm.reset();
        this.gameModal.style.display = 'block';
    }

    showEditGameModal() {
        if (!this.selectedGame) {
            alert('请先选择一个游戏');
            return;
        }
        
        this.isEditing = true;
        this.editingIndex = this.games.findIndex(game => game.id === this.selectedGame.id);
        this.modalTitle.textContent = '编辑游戏';
        
        // 调试信息
        console.log('正在编辑的游戏:', this.selectedGame);
        console.log('原价输入框元素:', this.originalPriceInput);
        console.log('购入价输入框元素:', this.purchasePriceInput);
        
        // 填充表单数据
        this.gameNameInput.value = this.selectedGame.name;
        this.originalPriceInput.value = this.selectedGame.originalPrice || '';
        this.purchasePriceInput.value = this.selectedGame.purchasePrice || '';
        this.playTimeInput.value = this.selectedGame.playTime || '';
        this.achievementCurrentInput.value = this.selectedGame.achievementCurrent || '';
        this.achievementTotalInput.value = this.selectedGame.achievementTotal || '';
        this.gameTagsInput.value = this.selectedGame.tags.join(' ');
        
        // 调试：检查值是否正确设置
        console.log('设置后的原价值:', this.originalPriceInput.value);
        console.log('设置后的购入价值:', this.purchasePriceInput.value);
        
        // 注意：文件输入框无法预设值，但可以在界面上提示用户当前有图片
        if (this.selectedGame.imageData) {
            console.log('当前游戏有图片，编辑时可重新选择图片或保留原图');
        }
        
        this.gameModal.style.display = 'block';
    }

    hideModal() {
        this.gameModal.style.display = 'none';
        this.gameForm.reset();
    }

    handleSaveGame() {
        // 验证表单
        if (!this.gameForm.checkValidity()) {
            this.gameForm.reportValidity();
            return;
        }
        
        // 收集表单数据
        const gameData = {
            name: this.gameNameInput.value,
            originalPrice: parseFloat(this.originalPriceInput.value),
            purchasePrice: parseFloat(this.purchasePriceInput.value),
            playTime: parseFloat(this.playTimeInput.value),
            achievementCurrent: parseInt(this.achievementCurrentInput.value),
            achievementTotal: parseInt(this.achievementTotalInput.value),
            tags: this.gameTagsInput.value.split(' ').map(tag => tag.trim()).filter(tag => tag),
            imageData: null
        };
        
        // 处理图片
        if (this.gameImageInput.files[0]) {
            const reader = new FileReader();
            reader.onload = (e) => {
                gameData.imageData = e.target.result;
                this.saveGameData(gameData);
            };
            reader.readAsDataURL(this.gameImageInput.files[0]);
        } else {
            // 如果是编辑模式且没有选择新图片，保留原图片
            if (this.isEditing && this.selectedGame.imageData) {
                gameData.imageData = this.selectedGame.imageData;
            }
            this.saveGameData(gameData);
        }
    }

    saveGameData(gameData) {
        if (this.isEditing) {
            // 更新现有游戏
            gameData.id = this.selectedGame.id;
            this.games[this.editingIndex] = gameData;
            this.selectedGame = gameData;
        } else {
            // 添加新游戏
            gameData.id = Date.now(); // 简单的ID生成
            this.games.push(gameData);
        }
        
        this.hideModal();
        this.renderCards();
        this.renderFilters();
        
        if (this.isEditing) {
            this.updateGameDetails(gameData);
        }
    }

    handleDelete() {
        if (!this.selectedGame) {
            alert('请先选择一个游戏');
            return;
        }
        
        if (confirm(`确定要删除游戏"${this.selectedGame.name}"吗？`)) {
            const index = this.games.findIndex(game => game.id === this.selectedGame.id);
            if (index !== -1) {
                this.games.splice(index, 1);
                this.selectedGame = null;
                this.renderCards();
                this.renderFilters();
                
                // 清空详细信息
                this.detailHeader.textContent = '游戏名称';
                this.previewImage.innerHTML = '图片预览';
                this.gameTagsDisplay.innerHTML = '<span class="tag">标签</span><span class="tag">标签</span><span class="tag">标签</span>';
                this.originalPriceDisplay.textContent = '--';
                this.purchasePriceDisplay.textContent = '--';
                this.gameTimeDisplay.textContent = '游戏时长';
                this.achievementProgress.style.width = '50%';
            }
        }
    }

    handleImport() {
        this.importInput.click();
    }

    handleFileImport(event) {
        const files = Array.from(event.target.files);
        if (files.length === 0) return;
        
        // 先询问用户是否要清除现有数据
        if (this.games.length > 0) {
            if (!confirm('导入会清除当前数据，确定继续吗？')) {
                event.target.value = ''; // 清空文件输入
                return;
            }
        }
        
        // 清除现有游戏数据
        this.games = [];
        this.selectedGame = null;
        
        // 查找txt文件和图片文件
        const txtFiles = files.filter(file => 
            file.name.endsWith('.txt') && 
            (file.webkitRelativePath.includes('游戏信息/') || !file.webkitRelativePath.includes('/'))
        );
        const imageFiles = files.filter(file => 
            file.name.match(/\.(jpg|jpeg|png|gif)$/i) &&
            (file.webkitRelativePath.includes('游戏图片/') || !file.webkitRelativePath.includes('/'))
        );
        
        if (txtFiles.length === 0) {
            alert('未找到游戏信息文件，请选择正确的文件夹');
            return;
        }
        
        let processedCount = 0;
        const totalCount = txtFiles.length;
        
        // 处理每个txt文件
        txtFiles.forEach(txtFile => {
            const reader = new FileReader();
            reader.onload = (e) => {
                try {
                    const gameData = JSON.parse(e.target.result);
                    
                    // 查找对应的图片文件
                    const gameName = txtFile.name.replace('.txt', '');
                    const imageFile = imageFiles.find(img => {
                        const imgName = img.name.replace(/\.(jpg|jpeg|png|gif)$/i, '');
                        return imgName.toLowerCase() === gameName.toLowerCase();
                    });
                    
                    if (imageFile) {
                        const imageReader = new FileReader();
                        imageReader.onload = (imgEvent) => {
                            gameData.imageData = imgEvent.target.result;
                            this.importGameData(gameData);
                            processedCount++;
                            this.checkImportComplete(processedCount, totalCount);
                        };
                        imageReader.readAsDataURL(imageFile);
                    } else {
                        this.importGameData(gameData);
                        processedCount++;
                        this.checkImportComplete(processedCount, totalCount);
                    }
                } catch (error) {
                    console.error('解析游戏数据失败:', error);
                    alert(`文件 ${txtFile.name} 解析失败`);
                    processedCount++;
                    this.checkImportComplete(processedCount, totalCount);
                }
            };
            reader.readAsText(txtFile);
        });
        
        // 清空文件输入，允许重复选择同一文件夹
        event.target.value = '';
    }
    
    checkImportComplete(processed, total) {
        if (processed === total) {
            this.renderCards();
            this.renderFilters();
            
            // 清空详细信息显示
            this.detailHeader.textContent = '游戏名称';
            this.previewImage.innerHTML = '图片预览';
            this.gameTagsDisplay.innerHTML = '<span class="tag">标签</span><span class="tag">标签</span><span class="tag">标签</span>';
            this.originalPriceDisplay.textContent = '--';
            this.purchasePriceDisplay.textContent = '--';
            this.gameTimeDisplay.textContent = '游戏时长';
            this.achievementProgress.style.width = '50%';
            
            alert(`导入完成！`);
        }
    }

    importGameData(gameData) {
        // 确保数据格式正确
        gameData.id = Date.now() + Math.random(); // 生成唯一ID
        gameData.originalPrice = parseFloat(gameData.originalPrice) || 0;
        gameData.purchasePrice = parseFloat(gameData.purchasePrice) || 0;
        gameData.playTime = parseFloat(gameData.playTime) || 0;
        gameData.achievementCurrent = parseInt(gameData.achievementCurrent) || 0;
        gameData.achievementTotal = parseInt(gameData.achievementTotal) || 1;
        gameData.tags = Array.isArray(gameData.tags) ? gameData.tags : [];
        
        this.games.push(gameData);
        this.renderCards();
        this.renderFilters();
    }

    async handleExport() {
        if (this.games.length === 0) {
            alert('没有游戏数据可导出');
            return;
        }
        
        try {
            // 检查浏览器是否支持文件系统访问API
            if ('showDirectoryPicker' in window) {
                await this.exportWithDirectoryPicker();
            } else {
                alert('您的浏览器不支持文件夹导出，请使用Chrome或Edge浏览器。');
            }
        } catch (error) {
            console.error('导出失败:', error);
            if (error.name !== 'AbortError') {
                alert('导出失败，请重试。');
            }
        }
    }
    
    async exportWithDirectoryPicker() {
        try {
            // 让用户选择保存位置
            const dirHandle = await window.showDirectoryPicker({
                mode: 'readwrite',
                startIn: 'downloads'
            });
            
            // 创建游戏表单文件夹
            const gameFormDir = await dirHandle.getDirectoryHandle('游戏表单', {
                create: true
            });
            
            // 创建子文件夹
            const gameInfoDir = await gameFormDir.getDirectoryHandle('游戏信息', {
                create: true
            });
            const gameImageDir = await gameFormDir.getDirectoryHandle('游戏图片', {
                create: true
            });
            
            // 导出每个游戏的数据
            for (const game of this.games) {
                // 创建游戏信息txt文件
                const gameInfo = {
                    name: game.name,
                    originalPrice: game.originalPrice,
                    purchasePrice: game.purchasePrice,
                    playTime: game.playTime,
                    achievementCurrent: game.achievementCurrent,
                    achievementTotal: game.achievementTotal,
                    tags: game.tags
                };
                
                const txtContent = JSON.stringify(gameInfo, null, 2);
                const txtFileHandle = await gameInfoDir.getFileHandle(`${game.name}.txt`, {
                    create: true
                });
                const txtWritable = await txtFileHandle.createWritable();
                await txtWritable.write(txtContent);
                await txtWritable.close();
                
                // 如果有图片数据，导出图片文件
                if (game.imageData) {
                    const base64Data = game.imageData.split(',')[1];
                    const byteCharacters = atob(base64Data);
                    const byteNumbers = new Array(byteCharacters.length);
                    for (let i = 0; i < byteCharacters.length; i++) {
                        byteNumbers[i] = byteCharacters.charCodeAt(i);
                    }
                    const byteArray = new Uint8Array(byteNumbers);
                    
                    const imgFileHandle = await gameImageDir.getFileHandle(`${game.name}.jpg`, {
                        create: true
                    });
                    const imgWritable = await imgFileHandle.createWritable();
                    await imgWritable.write(byteArray);
                    await imgWritable.close();
                }
            }
            
            alert(`导出完成！已创建"游戏表单"文件夹。`);
        } catch (error) {
            if (error.name === 'AbortError') {
                // 用户取消了操作
                return;
            }
            throw error;
        }
    }
    


    handleImagePreview(event) {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                // 可以在这里添加图片预览功能
                console.log('图片已选择:', file.name);
            };
            reader.readAsDataURL(file);
        }
    }

    // 墨水飞溅特效
    setupInkSplashEffect() {
        // 为所有可点击元素添加墨水飞溅效果
        const clickableElements = document.querySelectorAll(
            '.action-btn, .detail-btn, .sort-btn, .filter-item, .search-section button, .modal-footer button'
        );
        
        clickableElements.forEach(element => {
            element.addEventListener('mousedown', (e) => {
                this.createInkSplash(e, element);
            });
        });
    }

    createInkSplash(event, element) {
        const rect = element.getBoundingClientRect();
        const elementWidth = rect.width;
        const elementHeight = rect.height;

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

            let startX, startY;
            const side = Math.floor(Math.random() * 4);
            
            switch(side) {
                case 0:
                    startX = rect.left + Math.random() * elementWidth;
                    startY = rect.top;
                    break;
                case 1:
                    startX = rect.right;
                    startY = rect.top + Math.random() * elementHeight;
                    break;
                case 2:
                    startX = rect.left + Math.random() * elementWidth;
                    startY = rect.bottom;
                    break;
                case 3:
                    startX = rect.left;
                    startY = rect.top + Math.random() * elementHeight;
                    break;
            }
            
            const centerX = rect.left + elementWidth / 2;
            const centerY = rect.top + elementHeight / 2;
            const baseAngle = Math.atan2(startY - centerY, startX - centerX);
            const randomAngle = baseAngle + (Math.random() - 0.5) * 1.0;
            const distance = 80 + Math.random() * 120;
            const finalX = Math.cos(randomAngle) * distance;
            const finalY = Math.sin(randomAngle) * distance;

            inkDrop.style.left = `${startX}px`;
            inkDrop.style.top = `${startY}px`;
            inkDrop.style.transform = 'translate(0, 0) scale(1)';
            inkDrop.style.opacity = '1';

            const delay = Math.random() * 150;
            const rotation = (Math.random() - 0.5) * 360;
            setTimeout(() => {
                inkDrop.style.transition = 'all 0.8s ease-out';
                inkDrop.style.transform = `translate(${finalX}px, ${finalY}px) scale(${0.3 + Math.random() * 0.7}) rotate(${rotation}deg)`;
                inkDrop.style.opacity = '0';
            }, delay);

            setTimeout(() => {
                if (inkDrop.parentNode) {
                    inkDrop.parentNode.removeChild(inkDrop);
                }
            }, 800 + delay);
        }
    }
}

// 页面加载完成后初始化卡片管理器
document.addEventListener('DOMContentLoaded', () => {
    new GameCardManager();
});
