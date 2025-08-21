class CardManager {
    constructor() {
        this.currentCardType = 'game'; // 当前卡片类型
        this.games = [];
        this.animes = [];
        this.selectedItem = null;
        this.currentSort = 'name';
        this.currentFilter = 'all';
        this.isEditing = false;
        this.editingIndex = -1;
        
        this.initializeElements();
        this.bindEvents();
        this.setupInkSplashEffect();
        this.switchCardType('game'); // 初始化为游戏卡片
    }

    initializeElements() {
        // 获取DOM元素
        this.cardsGrid = document.getElementById('cardsGrid');
        this.filterList = document.getElementById('filterList');
        this.searchInput = document.getElementById('searchInput');
        this.searchBtn = document.getElementById('searchBtn');
        this.cardTypeSelect = document.getElementById('cardTypeSelect');
        this.sortButtons = document.getElementById('sortButtons');
        
        // 按钮元素
        this.importBtn = document.getElementById('importBtn');
        this.exportBtn = document.getElementById('exportBtn');
        this.addBtn = document.getElementById('addBtn');
        this.statsBtn = document.getElementById('statsBtn');
        this.editBtn = document.getElementById('editBtn');
        this.deleteBtn = document.getElementById('deleteBtn');
        
        // 排序按钮
        this.sortBtns = document.querySelectorAll('.sort-btn');
        
        // 模态框元素
        this.contentModal = document.getElementById('contentModal');
        this.contentForm = document.getElementById('contentForm');
        this.modalTitle = document.getElementById('modalTitle');
        this.closeModal = document.getElementById('closeModal');
        this.saveContent = document.getElementById('saveContent');
        this.cancelContent = document.getElementById('cancelContent');
        
        // 统计模态框元素
        this.statsModal = document.getElementById('statsModal');
        this.closeStatsModal = document.getElementById('closeStatsModal');
        this.statsContainer = document.getElementById('statsContainer');
        
        // 表单输入元素
        this.nameLabel = document.getElementById('nameLabel');
        this.contentName = document.getElementById('contentName');
        this.gameFields = document.querySelector('.game-fields');
        this.animeFields = document.querySelector('.anime-fields');
        
        // 游戏字段
        this.originalPriceInput = document.getElementById('originalPrice');
        this.purchasePriceInput = document.getElementById('purchasePrice');
        this.playTimeInput = document.getElementById('playTime');
        this.achievementCurrentInput = document.getElementById('achievementCurrent');
        this.achievementTotalInput = document.getElementById('achievementTotal');
        
        // 动漫字段
        this.animeYearInput = document.getElementById('animeYear');
        this.animeCountryInput = document.getElementById('animeCountry');
        this.animeRatingInput = document.getElementById('animeRating');
        
        this.contentTagsInput = document.getElementById('contentTagsInput');
        this.contentImageInput = document.getElementById('contentImage');
        
        // 详细信息元素
        this.detailHeader = document.getElementById('detailHeader');
        this.previewImage = document.getElementById('previewImage');
        this.contentTags = document.getElementById('contentTags');
        this.detailInfo = document.getElementById('detailInfo');
        this.yearDisplay = document.getElementById('yearDisplay');
        this.countryDisplay = document.getElementById('countryDisplay');
        this.ratingProgress = document.getElementById('ratingProgress');
        
        // 文件输入
        this.importInput = document.getElementById('importInput');
    }

    bindEvents() {
        // 卡片类型切换
        this.cardTypeSelect.addEventListener('change', (e) => {
            this.switchCardType(e.target.value);
        });
        
        // 搜索功能
        this.searchBtn.addEventListener('click', () => this.handleSearch());
        this.searchInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.handleSearch();
        });
        
        // 操作按钮
        this.importBtn.addEventListener('click', () => this.handleImport());
        this.exportBtn.addEventListener('click', () => this.handleExport());
        this.addBtn.addEventListener('click', () => this.showAddModal());
        this.statsBtn.addEventListener('click', () => this.showStatsModal());
        this.editBtn.addEventListener('click', () => this.showEditModal());
        this.deleteBtn.addEventListener('click', () => this.handleDelete());
        
        // 模态框事件
        this.closeModal.addEventListener('click', () => this.hideModal());
        this.cancelContent.addEventListener('click', () => this.hideModal());
        this.saveContent.addEventListener('click', () => this.handleSave());
        
        // 点击模态框外部关闭
        this.contentModal.addEventListener('click', (e) => {
            if (e.target === this.contentModal) this.hideModal();
        });
        
        // 统计模态框事件
        this.closeStatsModal.addEventListener('click', () => this.hideStatsModal());
        this.statsModal.addEventListener('click', (e) => {
            if (e.target === this.statsModal) this.hideStatsModal();
        });
        
        // 文件导入
        this.importInput.addEventListener('change', (e) => this.handleFileImport(e));
        
        // 图片预览
        this.contentImageInput.addEventListener('change', (e) => this.handleImagePreview(e));
    }

    switchCardType(type) {
        this.currentCardType = type;
        this.selectedItem = null;
        
        // 更新界面元素
        this.updateSortButtons();
        this.updateSearchPlaceholder();
        this.updateCardsGridClass();
        this.updatePreviewImageClass();
        this.resetDetailView();
        
        // 重新渲染
        this.renderCards();
        this.renderFilters();
    }

    updateCardsGridClass() {
        if (this.currentCardType === 'anime') {
            this.cardsGrid.classList.add('anime-mode');
        } else {
            this.cardsGrid.classList.remove('anime-mode');
        }
    }

    updatePreviewImageClass() {
        if (this.currentCardType === 'anime') {
            this.previewImage.classList.add('anime-preview');
        } else {
            this.previewImage.classList.remove('anime-preview');
        }
    }

    updateSortButtons() {
        if (this.currentCardType === 'game') {
            this.sortButtons.innerHTML = `
                <button class="sort-btn active" data-sort="name">按名称排序</button>
                <button class="sort-btn" data-sort="time">按时长排序</button>
                <button class="sort-btn" data-sort="price">按价格排序</button>
                <button class="sort-btn" data-sort="achievement">按成就排序</button>
            `;
        } else if (this.currentCardType === 'anime') {
            this.sortButtons.innerHTML = `
                <button class="sort-btn active" data-sort="name">按名称排序</button>
                <button class="sort-btn" data-sort="year">按年份排序</button>
                <button class="sort-btn" data-sort="rating">按评分排序</button>
                <button class="sort-btn" data-sort="country">按国家排序</button>
            `;
        }
        
        // 重新绑定排序按钮事件
        this.sortBtns = document.querySelectorAll('.sort-btn');
        this.sortBtns.forEach(btn => {
            btn.addEventListener('click', () => this.handleSort(btn.dataset.sort));
        });
        
        this.currentSort = 'name';
    }

    updateSearchPlaceholder() {
        if (this.currentCardType === 'game') {
            this.searchInput.placeholder = '搜索游戏...';
        } else if (this.currentCardType === 'anime') {
            this.searchInput.placeholder = '搜索动漫...';
        }
        this.searchInput.value = '';
    }

    resetDetailView() {
        if (this.currentCardType === 'game') {
            this.detailHeader.textContent = '游戏名称';
            this.detailInfo.innerHTML = `
                <div class="price-row">
                    <div class="price-item">
                        <div class="price-label">原价</div>
                        <div class="price-value" id="originalPriceDisplay">--</div>
                    </div>
                    <div class="price-item">
                        <div class="price-label">购入价</div>
                        <div class="price-value" id="purchasePriceDisplay">--</div>
                    </div>
                </div>
                <div class="info-item">
                    <span class="info-label">时长：</span>
                    <span class="info-value" id="gameTime">游戏时长</span>
                </div>
                <div class="achievement-section">
                    <div class="achievement-label">成就 (0/0)</div>
                    <div class="achievement-bar">
                        <div class="achievement-progress" id="achievementProgress" style="width: 0%"></div>
                    </div>
                </div>
            `;
        } else if (this.currentCardType === 'anime') {
            this.detailHeader.textContent = '动漫名称';
            this.detailInfo.innerHTML = `
                <div class="info-item">
                    <span class="info-label">年份：</span>
                    <span class="info-value" id="yearDisplay">2025</span>
                </div>
                <div class="info-item">
                    <span class="info-label">国家：</span>
                    <span class="info-value" id="countryDisplay">日本</span>
                </div>
                <div class="achievement-section">
                    <div class="achievement-label">评分：5.0</div>
                    <div class="achievement-bar">
                        <div class="achievement-progress" id="ratingProgress" style="width: 50%"></div>
                    </div>
                </div>
            `;
        }
        
        this.previewImage.innerHTML = '图片预览';
        this.contentTags.innerHTML = `
            <span class="tag">标签</span>
            <span class="tag">标签</span>
            <span class="tag">标签</span>
        `;
    }

    getCurrentData() {
        return this.currentCardType === 'game' ? this.games : this.animes;
    }

    setCurrentData(data) {
        if (this.currentCardType === 'game') {
            this.games = data;
        } else {
            this.animes = data;
        }
    }

    renderCards() {
        const currentData = this.getCurrentData();
        let filteredData = [...currentData];
        
        // 应用搜索过滤
        const searchTerm = this.searchInput.value.toLowerCase();
        if (searchTerm) {
            filteredData = filteredData.filter(item => 
                item.name.toLowerCase().includes(searchTerm) ||
                item.tags.some(tag => tag.toLowerCase().includes(searchTerm))
            );
        }
        
        // 应用标签过滤
        if (this.currentFilter !== 'all') {
            filteredData = filteredData.filter(item => 
                item.tags.includes(this.currentFilter)
            );
        }
        
        // 应用排序
        filteredData.sort((a, b) => {
            switch (this.currentSort) {
                case 'name':
                    return a.name.localeCompare(b.name);
                case 'time':
                    return (b.playTime || 0) - (a.playTime || 0);
                case 'price':
                    return (b.originalPrice || 0) - (a.originalPrice || 0);
                case 'achievement':
                    const aPercent = (a.achievementCurrent || 0) / (a.achievementTotal || 1);
                    const bPercent = (b.achievementCurrent || 0) / (b.achievementTotal || 1);
                    return bPercent - aPercent;
                case 'year':
                    return (b.year || 0) - (a.year || 0);
                case 'rating':
                    return (b.rating || 0) - (a.rating || 0);
                case 'country':
                    return (a.country || '').localeCompare(b.country || '');
                default:
                    return 0;
            }
        });
        
        // 渲染卡片
        this.cardsGrid.innerHTML = '';
        filteredData.forEach((item, index) => {
            const cardElement = this.createCard(item, index);
            this.cardsGrid.appendChild(cardElement);
        });
        
        // 如果有选中的项目，更新详细信息
        if (this.selectedItem) {
            this.updateDetails(this.selectedItem);
        }
    }

    createCard(item, index) {
        const card = document.createElement('div');
        card.className = 'game-card';
        card.dataset.itemId = item.id;
        
        if (this.currentCardType === 'anime') {
            card.classList.add('anime-card');
            
            // 创建动漫卡片的结构
            const tagsHtml = item.tags.map(tag => `<span class="card-tag">${tag}</span>`).join('');
            const ratingWidth = (item.rating / 10) * 100;
            
            card.innerHTML = `
                <div class="card-content">
                    <div class="card-left">
                        <div class="card-preview">
                            ${item.imageData ? `<img src="${item.imageData}" alt="${item.name}">` : '预览图片'}
                        </div>
                    </div>
                    <div class="card-right">
                        <div class="card-name">${item.name}</div>
                        <div class="card-tags">
                            ${tagsHtml}
                        </div>
                        <div class="card-info-section">
                            <div class="card-basic-info">
                                年份：${item.year}　　国家：${item.country}
                            </div>
                            <div class="card-rating">
                                <div class="rating-label">评分：${item.rating}</div>
                            </div>
                        </div>
                    </div>
                </div>
            `;
        } else {
            // 游戏卡片的原始结构
            const achievementDisplay = (item.achievementTotal === 0) ? '无成就' : 
                `${Math.round((item.achievementCurrent / item.achievementTotal) * 100)}%`;
            const priceDisplay = (item.originalPrice === 0) ? '免费' : `${item.originalPrice.toFixed(2)}¥`;
        
        card.innerHTML = `
                <div class="card-name">${item.name}</div>
            <div class="card-preview">
                    ${item.imageData ? `<img src="${item.imageData}" alt="${item.name}">` : '预览图片'}
            </div>
            <div class="card-info">
                <div>原价: ${priceDisplay}</div>
                    <div>时长: ${item.playTime}h</div>
                <div>成就: ${achievementDisplay}</div>
            </div>
        `;
        }
        
        card.addEventListener('click', () => this.selectItem(item));
        
        return card;
    }

    selectItem(item) {
        this.selectedItem = item;
        
        // 更新卡片选中状态
        document.querySelectorAll('.game-card').forEach(card => {
            card.classList.remove('selected');
        });
        
        const selectedCard = document.querySelector(`[data-item-id="${item.id}"]`);
        if (selectedCard) {
            selectedCard.classList.add('selected');
        }
        
        // 更新详细信息
        this.updateDetails(item);
    }

    updateDetails(item) {
        this.detailHeader.textContent = item.name;
        
        // 更新预览图片
        if (item.imageData) {
            this.previewImage.innerHTML = `<img src="${item.imageData}" alt="${item.name}">`;
        } else {
            this.previewImage.innerHTML = '图片预览';
        }
        
        // 更新标签
        this.contentTags.innerHTML = '';
        item.tags.forEach(tag => {
            const tagElement = document.createElement('span');
            tagElement.className = 'tag';
            tagElement.textContent = tag;
            this.contentTags.appendChild(tagElement);
        });
        
        // 根据卡片类型更新详细信息
        if (this.currentCardType === 'game') {
            this.updateGameDetails(item);
        } else if (this.currentCardType === 'anime') {
            this.updateAnimeDetails(item);
        }
    }

    updateGameDetails(game) {
        this.detailInfo.innerHTML = `
            <div class="price-row">
                <div class="price-item">
                    <div class="price-label">原价</div>
                    <div class="price-value">${game.originalPrice === 0 ? '免费' : `¥${game.originalPrice.toFixed(2)}`}</div>
                </div>
                <div class="price-item">
                    <div class="price-label">购入价</div>
                    <div class="price-value">${game.purchasePrice === 0 ? '免费' : `¥${game.purchasePrice.toFixed(2)}`}</div>
                </div>
            </div>
            <div class="info-item">
                <span class="info-label">时长：</span>
                <span class="info-value">${game.playTime}小时</span>
            </div>
            <div class="achievement-section">
                <div class="achievement-label">${game.achievementTotal === 0 ? '无成就' : `成就 (${game.achievementCurrent}/${game.achievementTotal})`}</div>
                <div class="achievement-bar">
                    <div class="achievement-progress" style="width: ${game.achievementTotal === 0 ? 0 : (game.achievementCurrent / game.achievementTotal) * 100}%"></div>
                </div>
            </div>
        `;
    }

    updateAnimeDetails(anime) {
        this.detailInfo.innerHTML = `
            <div class="info-item">
                <span class="info-label">年份：</span>
                <span class="info-value">${anime.year}</span>
            </div>
            <div class="info-item">
                <span class="info-label">国家：</span>
                <span class="info-value">${anime.country}</span>
            </div>
            <div class="achievement-section">
                <div class="achievement-label">评分：${anime.rating}</div>
                <div class="achievement-bar">
                    <div class="achievement-progress" style="width: ${(anime.rating / 10) * 100}%"></div>
                </div>
            </div>
        `;
    }

    renderFilters() {
        // 收集所有标签
        const currentData = this.getCurrentData();
        const allTags = new Set();
        currentData.forEach(item => {
            item.tags.forEach(tag => allTags.add(tag));
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

    showAddModal() {
        this.isEditing = false;
        this.modalTitle.textContent = this.currentCardType === 'game' ? '添加游戏' : '添加动漫';
        this.nameLabel.textContent = this.currentCardType === 'game' ? '游戏名称：' : '动漫名称：';
        this.updateModalFields();
        this.contentForm.reset();
        this.contentModal.style.display = 'block';
    }

    showEditModal() {
        if (!this.selectedItem) {
            alert('请先选择一个项目');
            return;
        }
        
        this.isEditing = true;
        const currentData = this.getCurrentData();
        this.editingIndex = currentData.findIndex(item => item.id === this.selectedItem.id);
        this.modalTitle.textContent = this.currentCardType === 'game' ? '编辑游戏' : '编辑动漫';
        this.nameLabel.textContent = this.currentCardType === 'game' ? '游戏名称：' : '动漫名称：';
        
        this.updateModalFields();
        this.fillFormData(this.selectedItem);
        this.contentModal.style.display = 'block';
    }

    updateModalFields() {
        if (this.currentCardType === 'game') {
            this.gameFields.style.display = 'block';
            this.animeFields.style.display = 'none';
        } else if (this.currentCardType === 'anime') {
            this.gameFields.style.display = 'none';
            this.animeFields.style.display = 'block';
        }
    }

    fillFormData(item) {
        this.contentName.value = item.name;
        
        if (this.currentCardType === 'game') {
            this.originalPriceInput.value = item.originalPrice || '';
            this.purchasePriceInput.value = item.purchasePrice || '';
            this.playTimeInput.value = item.playTime || '';
            this.achievementCurrentInput.value = item.achievementCurrent || '';
            this.achievementTotalInput.value = item.achievementTotal || '';
        } else if (this.currentCardType === 'anime') {
            this.animeYearInput.value = item.year || '';
            this.animeCountryInput.value = item.country || '';
            this.animeRatingInput.value = item.rating || '';
        }
        
        this.contentTagsInput.value = item.tags.join(' ');
    }

    hideModal() {
        this.contentModal.style.display = 'none';
        this.contentForm.reset();
    }

    handleSave() {
        // 验证表单
        if (!this.contentForm.checkValidity()) {
            this.contentForm.reportValidity();
            return;
        }
        
        // 收集表单数据
        const itemData = {
            name: this.contentName.value,
            tags: this.contentTagsInput.value.split(' ').map(tag => tag.trim()).filter(tag => tag),
            imageData: null
        };
        
        // 根据卡片类型添加特定字段
        if (this.currentCardType === 'game') {
            itemData.originalPrice = parseFloat(this.originalPriceInput.value) || 0;
            itemData.purchasePrice = parseFloat(this.purchasePriceInput.value) || 0;
            itemData.playTime = parseFloat(this.playTimeInput.value) || 0;
            itemData.achievementCurrent = parseInt(this.achievementCurrentInput.value) || 0;
            itemData.achievementTotal = parseInt(this.achievementTotalInput.value) || 0;
        } else if (this.currentCardType === 'anime') {
            itemData.year = parseInt(this.animeYearInput.value) || 2025;
            itemData.country = this.animeCountryInput.value || '日本';
            itemData.rating = parseFloat(this.animeRatingInput.value) || 5.0;
        }
        
        // 处理图片
        if (this.contentImageInput.files[0]) {
            const reader = new FileReader();
            reader.onload = (e) => {
                itemData.imageData = e.target.result;
                this.saveItemData(itemData);
            };
            reader.readAsDataURL(this.contentImageInput.files[0]);
        } else {
            // 如果是编辑模式且没有选择新图片，保留原图片
            if (this.isEditing && this.selectedItem.imageData) {
                itemData.imageData = this.selectedItem.imageData;
            }
            this.saveItemData(itemData);
        }
    }

    saveItemData(itemData) {
        const currentData = this.getCurrentData();
        
        if (this.isEditing) {
            // 更新现有项目
            itemData.id = this.selectedItem.id;
            currentData[this.editingIndex] = itemData;
            this.selectedItem = itemData;
        } else {
            // 添加新项目
            itemData.id = Date.now(); // 简单的ID生成
            currentData.push(itemData);
        }
        
        this.setCurrentData(currentData);
        this.hideModal();
        this.renderCards();
        this.renderFilters();
        
        if (this.isEditing) {
            this.updateDetails(itemData);
        }
    }

    handleDelete() {
        if (!this.selectedItem) {
            alert('请先选择一个项目');
            return;
        }
        
        const typeName = this.currentCardType === 'game' ? '游戏' : '动漫';
        if (confirm(`确定要删除${typeName}"${this.selectedItem.name}"吗？`)) {
            const currentData = this.getCurrentData();
            const index = currentData.findIndex(item => item.id === this.selectedItem.id);
            if (index !== -1) {
                currentData.splice(index, 1);
                this.setCurrentData(currentData);
                this.selectedItem = null;
                this.renderCards();
                this.renderFilters();
                this.resetDetailView();
            }
        }
    }

    showStatsModal() {
        this.updateStats();
        this.statsModal.style.display = 'block';
    }

    hideStatsModal() {
        this.statsModal.style.display = 'none';
    }

    updateStats() {
        const currentData = this.getCurrentData();
        this.statsContainer.innerHTML = '';
        
        if (this.currentCardType === 'game') {
            const totalGames = currentData.length;
            let totalOriginalPrice = 0;
            let totalPurchasePrice = 0;
            let totalPlayTime = 0;

            currentData.forEach(game => {
                totalOriginalPrice += game.originalPrice || 0;
                totalPurchasePrice += game.purchasePrice || 0;
                totalPlayTime += game.playTime || 0;
            });

            this.statsContainer.innerHTML = `
                <div class="stat-item">
                    <div class="stat-label">游戏总数</div>
                    <div class="stat-value">${totalGames}</div>
                    <div class="stat-unit">款</div>
                </div>
                <div class="stat-item">
                    <div class="stat-label">游戏总价</div>
                    <div class="stat-value">${totalOriginalPrice === 0 ? '免费' : `¥${totalOriginalPrice.toFixed(2)}`}</div>
                    <div class="stat-unit"></div>
                </div>
                <div class="stat-item">
                    <div class="stat-label">购入总价</div>
                    <div class="stat-value">${totalPurchasePrice === 0 ? '免费' : `¥${totalPurchasePrice.toFixed(2)}`}</div>
                    <div class="stat-unit"></div>
                </div>
                <div class="stat-item">
                    <div class="stat-label">总游戏时长</div>
                    <div class="stat-value">${totalPlayTime.toFixed(1)}</div>
                    <div class="stat-unit">小时</div>
                </div>
            `;
        } else if (this.currentCardType === 'anime') {
            const totalAnimes = currentData.length;
            const countries = {};
            let totalRating = 0;
            let ratingCount = 0;

            currentData.forEach(anime => {
                if (anime.country) {
                    countries[anime.country] = (countries[anime.country] || 0) + 1;
                }
                if (anime.rating > 0) {
                    totalRating += anime.rating;
                    ratingCount++;
                }
            });

            const avgRating = ratingCount > 0 ? (totalRating / ratingCount).toFixed(1) : '0.0';
            const topCountry = Object.keys(countries).reduce((a, b) => countries[a] > countries[b] ? a : b, '无');

            this.statsContainer.innerHTML = `
                <div class="stat-item">
                    <div class="stat-label">动漫总数</div>
                    <div class="stat-value">${totalAnimes}</div>
                    <div class="stat-unit">部</div>
                </div>
                <div class="stat-item">
                    <div class="stat-label">平均评分</div>
                    <div class="stat-value">${avgRating}</div>
                    <div class="stat-unit">分</div>
                </div>
                <div class="stat-item">
                    <div class="stat-label">主要国家</div>
                    <div class="stat-value">${topCountry}</div>
                    <div class="stat-unit"></div>
                </div>
            `;
        }
    }

    handleImport() {
        this.importInput.click();
    }

    handleFileImport(event) {
        const files = Array.from(event.target.files);
        if (files.length === 0) return;
        
        // 先询问用户是否要清除现有数据
        const currentData = this.getCurrentData();
        if (currentData.length > 0) {
            if (!confirm('导入会清除当前数据，确定继续吗？')) {
                event.target.value = '';
                return;
            }
        }
        
        // 清除现有数据
        this.setCurrentData([]);
        this.selectedItem = null;
        
        // 查找对应的文件夹
        const folderName = this.currentCardType === 'game' ? '游戏表单' : '动漫表单';
        const txtFiles = files.filter(file => 
            file.name.endsWith('.txt') && 
            (file.webkitRelativePath.includes(`${folderName}/`) || !file.webkitRelativePath.includes('/'))
        );
        const imageFiles = files.filter(file => 
            file.name.match(/\.(jpg|jpeg|png|gif)$/i) &&
            (file.webkitRelativePath.includes(`${folderName}/`) || !file.webkitRelativePath.includes('/'))
        );
        
        if (txtFiles.length === 0) {
            alert(`未找到${folderName}文件夹中的信息文件，请选择正确的文件夹`);
            return;
        }
        
        let processedCount = 0;
        const totalCount = txtFiles.length;
        
        // 处理每个txt文件
        txtFiles.forEach(txtFile => {
            const reader = new FileReader();
            reader.onload = (e) => {
                try {
                    const itemData = JSON.parse(e.target.result);
                    
                    // 查找对应的图片文件
                    const itemName = txtFile.name.replace('.txt', '');
                    const imageFile = imageFiles.find(img => {
                        const imgName = img.name.replace(/\.(jpg|jpeg|png|gif)$/i, '');
                        return imgName.toLowerCase() === itemName.toLowerCase();
                    });
                    
                    if (imageFile) {
                        const imageReader = new FileReader();
                        imageReader.onload = (imgEvent) => {
                            itemData.imageData = imgEvent.target.result;
                            this.importItemData(itemData);
                            processedCount++;
                            this.checkImportComplete(processedCount, totalCount);
                        };
                        imageReader.readAsDataURL(imageFile);
                    } else {
                        this.importItemData(itemData);
                        processedCount++;
                        this.checkImportComplete(processedCount, totalCount);
                    }
                } catch (error) {
                    console.error('解析数据失败:', error);
                    alert(`文件 ${txtFile.name} 解析失败`);
                    processedCount++;
                    this.checkImportComplete(processedCount, totalCount);
                }
            };
            reader.readAsText(txtFile);
        });
        
        event.target.value = '';
    }
    
    checkImportComplete(processed, total) {
        if (processed === total) {
            this.renderCards();
            this.renderFilters();
            this.resetDetailView();
            alert(`导入完成！`);
        }
    }

    importItemData(itemData) {
        // 确保数据格式正确
        itemData.id = Date.now() + Math.random();
        itemData.tags = Array.isArray(itemData.tags) ? itemData.tags : [];
        
        if (this.currentCardType === 'game') {
            itemData.originalPrice = parseFloat(itemData.originalPrice) || 0;
            itemData.purchasePrice = parseFloat(itemData.purchasePrice) || 0;
            itemData.playTime = parseFloat(itemData.playTime) || 0;
            itemData.achievementCurrent = parseInt(itemData.achievementCurrent) || 0;
            itemData.achievementTotal = parseInt(itemData.achievementTotal) || 0;
        } else if (this.currentCardType === 'anime') {
            itemData.year = parseInt(itemData.year) || 2025;
            itemData.country = itemData.country || '日本';
            itemData.rating = parseFloat(itemData.rating) || 5.0;
        }
        
        const currentData = this.getCurrentData();
        currentData.push(itemData);
        this.setCurrentData(currentData);
    }

    async handleExport() {
        const currentData = this.getCurrentData();
        if (currentData.length === 0) {
            alert('没有数据可导出');
            return;
        }
        
        try {
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
            const dirHandle = await window.showDirectoryPicker({
                mode: 'readwrite',
                startIn: 'downloads'
            });
            
            // 创建对应的文件夹
            const folderName = this.currentCardType === 'game' ? '游戏表单' : '动漫表单';
            const mainDir = await dirHandle.getDirectoryHandle(folderName, {
                create: true
            });
            
            // 创建子文件夹
            const infoFolderName = this.currentCardType === 'game' ? '游戏信息' : '动漫信息';
            const imageFolderName = this.currentCardType === 'game' ? '游戏图片' : '动漫图片';
            
            const infoDir = await mainDir.getDirectoryHandle(infoFolderName, {
                create: true
            });
            const imageDir = await mainDir.getDirectoryHandle(imageFolderName, {
                create: true
            });
            
            const currentData = this.getCurrentData();
            
            // 导出每个项目的数据
            for (const item of currentData) {
                // 创建信息txt文件
                const itemInfo = {
                    name: item.name,
                    tags: item.tags
                };
                
                if (this.currentCardType === 'game') {
                    itemInfo.originalPrice = item.originalPrice;
                    itemInfo.purchasePrice = item.purchasePrice;
                    itemInfo.playTime = item.playTime;
                    itemInfo.achievementCurrent = item.achievementCurrent;
                    itemInfo.achievementTotal = item.achievementTotal;
                } else if (this.currentCardType === 'anime') {
                    itemInfo.year = item.year;
                    itemInfo.country = item.country;
                    itemInfo.rating = item.rating;
                }
                
                const txtContent = JSON.stringify(itemInfo, null, 2);
                const txtFileHandle = await infoDir.getFileHandle(`${item.name}.txt`, {
                    create: true
                });
                const txtWritable = await txtFileHandle.createWritable();
                await txtWritable.write(txtContent);
                await txtWritable.close();
                
                // 如果有图片数据，导出图片文件
                if (item.imageData) {
                    const base64Data = item.imageData.split(',')[1];
                    const byteCharacters = atob(base64Data);
                    const byteNumbers = new Array(byteCharacters.length);
                    for (let i = 0; i < byteCharacters.length; i++) {
                        byteNumbers[i] = byteCharacters.charCodeAt(i);
                    }
                    const byteArray = new Uint8Array(byteNumbers);
                    
                    const imgFileHandle = await imageDir.getFileHandle(`${item.name}.jpg`, {
                        create: true
                    });
                    const imgWritable = await imgFileHandle.createWritable();
                    await imgWritable.write(byteArray);
                    await imgWritable.close();
                }
            }
            
            alert(`导出完成！已创建"${folderName}"文件夹。`);
        } catch (error) {
            if (error.name === 'AbortError') {
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
                console.log('图片已选择:', file.name);
            };
            reader.readAsDataURL(file);
        }
    }

    // 墨水飞溅特效
    setupInkSplashEffect() {
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
    new CardManager();
});