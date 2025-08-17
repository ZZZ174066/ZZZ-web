let activeMenuItem = null;

document.addEventListener('DOMContentLoaded', function() {
    const menuItems = document.querySelectorAll('.menu-item');
    const subInterface = document.getElementById('subInterface');
    const playerPlaceholder = document.querySelector('.player-placeholder');
    
    menuItems.forEach((item, index) => {
        item.addEventListener('click', function() {
            const menuText = this.querySelector('span').textContent.trim();
            if (menuText === '音乐播放器' && document.body.classList.contains('mini-player-active')) {
                return;
            }
            if (activeMenuItem) {
                activeMenuItem.classList.remove('active');
            }
            this.classList.add('active');
            this.style.transform = 'none';
            activeMenuItem = this;
            
            switch(menuText) {
                case '音乐播放器':
                    showMusicPlayer();
                    break;
                case '资料卡':
                    showPlaceholder('个人资料卡');
                    break;
                case '个人履历':
                    showPlaceholder('个人履历');
                    break;
                case '奇怪的东西':
                    showPlaceholder('奇怪的东西');
                    break;
                case '游戏卡片管理':
                    openGameCardManager();
                    break;
                case '智汇出行系统':
                    openZhihuiTravelSystem();
                    break;
                case '3D机器人':
                    showPlaceholder('3D机器人');
                    break;
                case '跑酷小游戏':
                    showPlaceholder('跑酷小游戏');
                    break;
                case '俄罗斯方块':
                    openTetrisGame();
                    break;
                case '2048':
                    showPlaceholder('2048');
                    break;
                case '赛车游戏':
                    showPlaceholder('赛车游戏');
                    break;
                case '贪吃蛇':
                    showPlaceholder('贪吃蛇');
                    break;
                case '坦克大战':
                    showPlaceholder('坦克大战');
                    break;
                default:
                    showPlaceholder('功能开发中...');
            }
        });
        
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-3px)';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = this.classList.contains('active') ? 'none' : 'translateY(0)';
        });

        item.addEventListener('mousedown', function(e) {
            createInkSplash(e, this);
        });
    });

    function createInkSplash(event, element) {
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
    
    function showMusicPlayer() {
        const subInterface = document.getElementById('subInterface');
        if (document.body.classList.contains('mini-player-active')) {
            restoreFromBackground();
        }
        subInterface.classList.add('active');
        
        subInterface.innerHTML = `
            <div class="close-button" id="closeBtn">✕</div>
            <div class="player-container">
                <iframe src="音乐播放器/player-sub.html" width="100%" height="100%" frameborder="0"></iframe>
            </div>
        `;
        
        document.getElementById('closeBtn').addEventListener('click', closeSubInterface);
    }
    
    function showPlaceholder(title) {
        if (document.body.classList.contains('mini-player-active')) {
            const panel = ensureForegroundPanel();
            panel.classList.add('active');
            panel.innerHTML = `
                <div class="close-button" id="closeBtn">✕</div>
                <div class="placeholder-content">
                    <h2>${title}</h2>
                    <p>此功能正在开发中，敬请期待...</p>
                </div>
            `;
            
            panel.removeEventListener('click', panel._placeholderCloseHandler);
            
            panel._placeholderCloseHandler = function(e) {
                if (e.target.classList.contains('close-button')) {
                    panel.classList.remove('active');
                    if (activeMenuItem) {
                        activeMenuItem.classList.remove('active');
                        activeMenuItem.style.transform = 'none';
                        activeMenuItem = null;
                    }
                }
            };
            
            panel.addEventListener('click', panel._placeholderCloseHandler);
            return;
        }
        
        if (window.interfaceLyrics && window.interfaceLyrics.isActive()) {
            window.interfaceLyrics.hide();
            const iframe = document.querySelector('.sub-interface iframe');
            if (iframe && iframe.contentWindow) {
                try {
                    iframe.contentWindow.postMessage({
                        type: 'interfaceLyricsToggle',
                        isActive: false
                    }, '*');
                } catch (err) {}
            }
        }
        
        if (window.meterControl && window.meterControl.isVisible()) {
            window.meterControl.hide();
            const iframe = document.querySelector('.sub-interface iframe');
            if (iframe && iframe.contentWindow) {
                try {
                    iframe.contentWindow.postMessage({
                        type: 'meterToggle',
                        isActive: false
                    }, '*');
                } catch (err) {}
            }
        }
        
        const subInterface = document.getElementById('subInterface');
        subInterface.classList.add('active');
        
        subInterface.innerHTML = `
            <div class="close-button" id="closeBtn">✕</div>
            <div class="placeholder-content">
                <h2>${title}</h2>
                <p>此功能正在开发中，敬请期待...</p>
            </div>
        `;
        
        document.getElementById('closeBtn').addEventListener('click', closeSubInterface);
    }
    
    
    function closeSubInterface() {
        if (window.interfaceLyrics && window.interfaceLyrics.isActive()) {
            window.interfaceLyrics.reset();
            const iframe = document.querySelector('.sub-interface iframe');
            if (iframe && iframe.contentWindow) {
                try {
                    iframe.contentWindow.postMessage({
                        type: 'interfaceLyricsToggle',
                        isActive: false
                    }, '*');
                } catch (err) {}
            }
        }
        
        if (window.meterControl && window.meterControl.isVisible()) {
            window.meterControl.hide();
            const iframe = document.querySelector('.sub-interface iframe');
            if (iframe && iframe.contentWindow) {
                try {
                    iframe.contentWindow.postMessage({
                        type: 'meterToggle',
                        isActive: false
                    }, '*');
                } catch (err) {}
            }
        }
        
        subInterface.classList.remove('active');
        
        const allMenuItems = document.querySelectorAll('.left-menu .menu-item');
        allMenuItems.forEach(item => {
            item.classList.remove('active', 'pinned-active');
            item.style.transform = 'none';
        });
        
        activeMenuItem = null;
        
        setTimeout(() => {
            subInterface.innerHTML = `
                <div class="close-button" id="closeBtn">✕</div>
                <div class="player-placeholder">
                    <h2>音乐播放器</h2>
                    <p>点击"音乐播放器"开始播放音乐</p>
                </div>
            `;
            
            document.getElementById('closeBtn').addEventListener('click', closeSubInterface);
        }, 500);
    }
    
    
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeSubInterface();
        }
    });
    
    const backgroundImage = document.querySelector('.background-image');
    backgroundImage.addEventListener('error', function() {
        this.style.background = 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
    });
    
    window.addEventListener('load', function() {
        document.body.style.opacity = '0';
        document.body.style.transition = 'opacity 1s ease-in-out';
        
        setTimeout(() => {
            document.body.style.opacity = '1';
        }, 100);
    });
});

const additionalStyles = `
    .menu-item.active, .menu-item.pinned-active {
        background: #000 !important;
        color: white !important;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3) !important;
    }
    
    .menu-item.active.bordered, .menu-item.pinned-active.bordered {
        background: #000 !important;
        color: white !important;
        border-color: #000 !important;
    }
    
    .close-button {
        position: absolute;
        top: 10px;
        right: 15px;
        width: 30px;
        height: 30px;
        background: transparent;
        color: #000;
        border: none;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 24px;
        font-weight: bold;
        cursor: pointer;
        z-index: 2000;
        transition: all 0.3s ease;
        font-family: Arial, sans-serif;
    }
    
    .close-button:hover {
        transform: scale(1.2);
        color: #333;
    }
    
    .player-container {
        width: 100%;
        height: 100%;
        overflow: hidden;
    }
    
    .player-container iframe {
        width: 100%;
        height: 100%;
        border: none;
    }
    
    .placeholder-content {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        height: 100%;
        color: #333;
        text-align: center;
    }
    
    .placeholder-content h2 {
        font-size: 2.5rem;
        margin-bottom: 20px;
        color: #000;
    }
    
    .placeholder-content p {
        font-size: 1.3rem;
        color: #666;
        margin-bottom: 30px;
    }
    

`;

// 将样式添加到页面
const styleSheet = document.createElement('style');
styleSheet.textContent = additionalStyles;
document.head.appendChild(styleSheet); 

// 迷你后台播放器 UI
(function(){
    let miniPlayer = null;
    let isBackground = false;

    let isPlaying = false; // 跟踪播放状态

    function ensureMiniPlayer(){
        if (miniPlayer) return miniPlayer;
        miniPlayer = document.createElement('div');
        miniPlayer.className = 'mini-player';
        miniPlayer.innerHTML = `
            <div class="mini-player-controls">
                <button class="mini-btn" data-action="prev">⏮</button>
                <button class="mini-btn" data-action="togglePlay">⏸</button>
                <button class="mini-btn" data-action="next">⏭</button>
                <button class="mini-btn" data-action="restore">↩</button>
            </div>
        `;
        document.body.appendChild(miniPlayer);

        miniPlayer.addEventListener('click', function(e){
            const btn = e.target.closest('.mini-btn');
            if (btn) {
                const action = btn.getAttribute('data-action');
                if (action === 'restore') {
                    restoreFromBackground();
                } else if (action === 'togglePlay') {
                    togglePlayPause();
                } else {
                    postToIframe({ type: 'control', action });
                }
                return;
            }
        });

        // 为迷你播放器按键添加墨水飞溅特效
        miniPlayer.addEventListener('mousedown', function(e) {
            const btn = e.target.closest('.mini-btn');
            if (btn) {
                createMiniInkSplash(e, btn);
            }
        });
        return miniPlayer;
    }

    function createMiniInkSplash(event, element) {
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

    function togglePlayPause(){
        isPlaying = !isPlaying;
        updatePlayPauseButton();
        postToIframe({ type: 'control', action: 'togglePlay' });
    }

    function updatePlayPauseButton(){
        const toggleBtn = miniPlayer?.querySelector('[data-action="togglePlay"]');
        if (toggleBtn) {
            toggleBtn.textContent = isPlaying ? '⏸' : '▶';
        }
    }



    function postToIframe(message){
        const iframe = document.querySelector('.sub-interface iframe');
        if (iframe && iframe.contentWindow) {
            try { iframe.contentWindow.postMessage(message, '*'); } catch(_){}
        }
    }

    function enterBackground(){
        if (isBackground) return;

        isBackground = true;
        ensureMiniPlayer().style.display = 'flex';
        document.body.classList.add('mini-player-active');

        // 隐藏但不移除播放器容器，保持播放不断
        const sub = document.getElementById('subInterface');
        if (sub) sub.classList.add('player-hidden');

        // 固定高亮左侧"音乐播放器"按键
        const menuItems = document.querySelectorAll('.left-menu .menu-item');
        menuItems.forEach(mi => {
            const text = mi.querySelector('span') ? mi.querySelector('span').textContent.trim() : '';
            if (text === '音乐播放器') {
                mi.classList.add('pinned-active');
            }
        });
    }

    function restoreFromBackground(){
        if (!isBackground) return;

        // 显示播放器容器（不重建 iframe，避免打断）
        const sub = document.getElementById('subInterface');
        if (sub) {
            sub.classList.remove('player-hidden');
            sub.classList.add('active');
        }

        // 关闭并清空前景面板（其它界面）
        const panel = document.getElementById('foreground-panel');
        if (panel) {
            panel.classList.remove('active');
            panel.innerHTML = '';
        }

        // 更新左侧菜单：仅高亮"音乐播放器"
        const allMenu = document.querySelectorAll('.left-menu .menu-item');
        allMenu.forEach(mi => mi.classList.remove('active', 'pinned-active'));
        let musicMenuItem = null;
        allMenu.forEach(mi => {
            const text = mi.querySelector('span') ? mi.querySelector('span').textContent.trim() : '';
            if (text === '音乐播放器') musicMenuItem = mi;
        });
        if (musicMenuItem) {
            musicMenuItem.classList.add('active');
            try { activeMenuItem = musicMenuItem; } catch (_) {}
        }

        // 确保播放器内容存在：若没有 iframe，则载入（有则不动，避免重置播放）
        if (sub && !sub.querySelector('iframe')) {
            sub.innerHTML = `
                <div class="close-button" id="closeBtn">✕</div>
                <div class="player-container">
                    <iframe src="player-sub.html" width="100%" height="100%" frameborder="0"></iframe>
                </div>
            `;
            const closeBtn = document.getElementById('closeBtn');
            if (closeBtn) closeBtn.addEventListener('click', closeSubInterface);
        }

        document.body.classList.remove('mini-player-active');
        if (miniPlayer) miniPlayer.style.display = 'none';
        isBackground = false;
    }

    // 监听来自播放器的播放状态变化
    window.addEventListener('message', function(e){
        const data = e.data || {};
        if (data.type === 'requestBackgroundPlay') {
            enterBackground();
        } else if (data.type === 'playbackStateChanged') {
            isPlaying = data.isPlaying;
            updatePlayPauseButton();
        }
    });
})();

// 注入迷你播放器样式
(function(){
    const css = `
    .mini-player {
        position: fixed;
        top: 31px;
        right: 12px;
        display: none;
        gap: 8px;
        align-items: center;
        background: rgba(255,255,255,0.95);
        border: 3px solid #000;
        border-radius: 8px;
        padding: 5px 7px;
        box-shadow: 0 10px 30px rgba(0,0,0,0.5);
        z-index: 2000;
        display: none;
        flex-direction: row;
    }
    .mini-player-controls { display: flex; gap: 6px; }
    .mini-btn {
        border: 3px solid #000;
        border-radius: 6px;
        background: #fff;
        color: #000;
        width: 40px; height: 40px;
        font-size: 22px;
        padding: 0;
        display: flex; align-items: center; justify-content: center;
        cursor: pointer;
        box-shadow: 0 5px 15px rgba(0,0,0,0.4);
        transition: all .2s ease;
    }
    .mini-btn:hover { background: #000; color: #fff; transform: translateY(-3px); box-shadow: 0 10px 30px rgba(0,0,0,0.7); }
    
    /* 隐藏但不移除播放器容器，确保播放不断 */
    .sub-interface.player-hidden { opacity: 0; pointer-events: none; }
    
    /* 前景面板内容样式 */
    #foreground-panel .placeholder-content {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        height: 100%;
        color: #333;
        text-align: center;
    }
    
    #foreground-panel .placeholder-content h2 {
        font-size: 2.5rem;
        margin-bottom: 20px;
        color: #000;
    }
    
    #foreground-panel .placeholder-content p {
        font-size: 1.3rem;
        color: #666;
        margin-bottom: 30px;
    }
    `;
    const style = document.createElement('style');
    style.textContent = css;
    document.head.appendChild(style);
})();

// 覆盖迷你播放器按钮尺寸以匹配原播放器
(function(){
	const style = document.createElement('style');
	style.textContent = `
	.mini-btn {
		border: 3px solid #000;
		border-radius: 6px;
		background: #fff;
		color: #000;
		width: 40px; height: 40px;
		font-size: 22px;
		padding: 0;
		display: flex; align-items: center; justify-content: center;
		cursor: pointer;
		box-shadow: 0 5px 15px rgba(0,0,0,0.4);
		transition: all .2s ease;
	}
	.mini-btn:hover { background: #000; color: #fff; transform: translateY(-3px); box-shadow: 0 10px 30px rgba(0,0,0,0.7); }
	
	/* 界面歌词按钮选中状态样式 */
	.control-btn.active {
		background: #000 !important;
		color: white !important;
		box-shadow: 0 10px 30px rgba(0, 0, 0, 0.7) !important;
	}
	`;
	document.head.appendChild(style);
})();

// 模拟音律显示（与真实音频无关）
(function(){
	let meterBox = null;
	let meterBars = [];
	let meterAnimId = 0;
	const NUM_BARS = 48;

	function ensureMeterBox(){
		if (meterBox) return meterBox;
		meterBox = document.createElement('div');
		meterBox.id = 'simulated-meter-box';
		meterBox.style.cssText = `
			position: fixed;
			top: 100px; /* 界面歌词和迷你播放器下方，下移10px */
			right: 12px;
			width: 628px;
			height: 56px;
			background: #fff;
			border: 3px solid #000;
			border-radius: 8px;
			padding: 6px 10px;
			box-shadow: 0 10px 30px rgba(0,0,0,0.5);
			z-index: 2000; /* 在迷你播放器下方一层 */
			display: none;
		`;
		const inner = document.createElement('div');
		inner.style.cssText = 'position:absolute;left:0;right:0;top:0;bottom:0;display:flex;align-items:flex-end;gap:3px;padding:8px 12px 4px 12px;';
		for (let i = 0; i < NUM_BARS; i++) {
			const bar = document.createElement('div');
			bar.style.cssText = 'flex:1;background:#000;height:8px;border-radius:4px 4px 0 0;';
			meterBars.push(bar);
			inner.appendChild(bar);
		}
		meterBox.appendChild(inner);
		document.body.appendChild(meterBox);
		return meterBox;
	}

	function setMeterVisible(visible){
		const el = ensureMeterBox();
		el.style.display = visible ? 'block' : 'none';
	}

			function animateMeter(){
			// 使用真实音频数据或保持当前状态
			if (meterAnimId) {
				meterAnimId = requestAnimationFrame(animateMeter);
			}
		}

			function renderMeter(bars){
			// 根据真实音频数据更新音律条高度
			const len = Math.min(bars.length, meterBars.length);
			for (let i = 0; i < len; i++) {
				let v = Math.max(0, Math.min(1, bars[i]));
				// 增强视觉效果：更大的动态范围
				v = Math.pow(v, 0.4); // 提升低幅值
				v = Math.max(0.03, v); // 确保最小高度
				const heightPercent = Math.round(v * 90); // 0-90%
				meterBars[i].style.height = heightPercent + '%';
			}
		}

		function pauseMeter(){
			// 音频暂停时缓慢衰减
			for (const bar of meterBars) {
				const h = parseInt(bar.style.height || '0');
				const nh = Math.max(3, Math.floor(h * 0.85)); // 衰减到最小3%
				bar.style.height = nh + '%';
			}
		}

		function startMeter(){
			if (!meterAnimId) meterAnimId = requestAnimationFrame(animateMeter);
		}
		function stopMeter(){
			if (meterAnimId) cancelAnimationFrame(meterAnimId);
			meterAnimId = 0;
		}

					window.addEventListener('message', function(e){
			const data = e.data || {};
			if (data.type === 'meterToggle') {
				if (data.isActive) {
					setMeterVisible(true);
					startMeter();
				} else {
					stopMeter();
					setMeterVisible(false);
				}
			} else if (data.type === 'meterData') {
				// 接收真实音频数据并更新音律显示
				if (data.bars && data.bars.length > 0) {
					renderMeter(data.bars);
				}
			} else if (data.type === 'meterPause') {
				// 音频暂停时的衰减效果
				pauseMeter();
			}
		});
		
		// 确保音律显示框被创建
		ensureMeterBox();
		
		// 暴露音律显示框给全局使用
		window.meterBox = meterBox;
		
		// 暴露音律显示控制函数给全局使用
		window.meterControl = {
			hide: () => {
				if (meterBox) {
					meterBox.style.display = 'none';
				}
			},
			isVisible: () => {
				return meterBox && meterBox.style.display === 'block';
			}
		};
	})();

// 界面歌词显示功能
(function(){
    let interfaceLyrics = null;
    let isInterfaceLyricsActive = false;

    function ensureInterfaceLyrics(){
        if (interfaceLyrics) return interfaceLyrics;
        interfaceLyrics = document.createElement('div');
        interfaceLyrics.id = 'interface-lyrics';
        interfaceLyrics.style.cssText = `
            position: fixed;
            top: 30px;
            right: 240px;
            width: 400px;
            height: 56px;
            background: #fff;
            border: 3px solid #000;
            border-radius: 8px;
            padding: 8px 12px;
            box-shadow: 0 10px 30px rgba(0,0,0,0.5);
            z-index: 2001;
            display: none;
            font-family: 'Microsoft YaHei', Arial, sans-serif;
        `;
        document.body.appendChild(interfaceLyrics);
        return interfaceLyrics;
    }

    function showInterfaceLyrics(lyricsText){
        if (!isInterfaceLyricsActive) return;
        const lyricsDiv = ensureInterfaceLyrics();
        lyricsDiv.innerHTML = `
            <div style="font-size: 18px; line-height: 1.2; color: #000; height: 40px; overflow: hidden; text-align: center; font-weight: bold; display: flex; align-items: center; justify-content: center;">${lyricsText || '暂无歌词'}</div>
        `;
        lyricsDiv.style.display = 'block';
    }

    function hideInterfaceLyrics(){
        if (interfaceLyrics) {
            interfaceLyrics.style.display = 'none';
        }
    }

    function toggleInterfaceLyrics(){
        isInterfaceLyricsActive = !isInterfaceLyricsActive;
        if (isInterfaceLyricsActive) {
            // 显示界面歌词
            showInterfaceLyrics('正在加载歌词...');
        } else {
            // 隐藏界面歌词
            hideInterfaceLyrics();
        }
        return isInterfaceLyricsActive;
    }

    // 监听来自播放器的消息
    window.addEventListener('message', function(e){
        const data = e.data || {};
        if (data.type === 'interfaceLyricsToggle') {
            isInterfaceLyricsActive = data.isActive;
            if (isInterfaceLyricsActive) {
                showInterfaceLyrics('正在加载歌词...');
            } else {
                hideInterfaceLyrics();
            }
        } else if (data.type === 'updateInterfaceLyrics' && isInterfaceLyricsActive) {
            showInterfaceLyrics(data.lyrics);
        }
    });

    // 暴露给全局使用
    window.interfaceLyrics = {
        show: showInterfaceLyrics,
        hide: hideInterfaceLyrics,
        toggle: toggleInterfaceLyrics,
        isActive: () => isInterfaceLyricsActive,
        reset: () => {
            isInterfaceLyricsActive = false;
            hideInterfaceLyrics();
        }
    };
})();

// 前景容器管理
(function(){
    window.ensureForegroundPanel = function ensureForegroundPanel(){
        let panel = document.getElementById('foreground-panel');
        if (!panel) {
            panel = document.createElement('div');
            panel.id = 'foreground-panel';
            // 放置在中央内容区域中，与sub-interface同级
            const centerContent = document.querySelector('.center-content');
            if (centerContent) {
                centerContent.appendChild(panel);
            }
        }
        return panel;
    }
})(); 

// 智汇出行系统功能
function openZhihuiTravelSystem() {
    if (document.body.classList.contains('mini-player-active')) {
        // 在迷你播放器状态下，使用前景面板显示
        const panel = ensureForegroundPanel();
        panel.classList.add('active');
        panel.innerHTML = `
            <div class="close-button" id="closeBtn">✕</div>
            <div class="zhihui-travel-container">
                <iframe src="智汇出行/login.html" 
                        frameborder="0" 
                        style="width: 100%; height: 100%; border: none;">
                </iframe>
            </div>
        `;
        
        // 移除之前的事件监听器，避免重复绑定
        panel.removeEventListener('click', panel._zhihuiCloseHandler);
        
        // 创建新的事件处理函数并保存引用
        panel._zhihuiCloseHandler = function(e) {
            if (e.target.classList.contains('close-button')) {
                panel.classList.remove('active');
                // 重置菜单项状态
                if (activeMenuItem) {
                    activeMenuItem.classList.remove('active');
                    activeMenuItem.style.transform = 'none';
                    activeMenuItem = null;
                }
                // 确保所有菜单项都重置状态
                const allMenuItems = document.querySelectorAll('.left-menu .menu-item');
                allMenuItems.forEach(item => {
                    item.classList.remove('active');
                    item.style.transform = 'none';
                });
            }
        };
        
        // 添加事件监听器
        panel.addEventListener('click', panel._zhihuiCloseHandler);
        return;
    }
    
    // 非迷你播放器状态下，关闭界面歌词和音律显示
    if (window.interfaceLyrics && window.interfaceLyrics.isActive()) {
        window.interfaceLyrics.hide();
    }
    
    if (window.meterControl && window.meterControl.isVisible()) {
        window.meterControl.hide();
    }
    
    const subInterface = document.getElementById('subInterface');
    subInterface.classList.add('active');
    
    // 创建iframe来加载智汇出行系统
    subInterface.innerHTML = `
        <div class="close-button" id="closeBtn">✕</div>
        <div class="zhihui-travel-container">
            <iframe src="智汇出行/login.html" 
                    frameborder="0" 
                    style="width: 100%; height: 100%; border: none;">
            </iframe>
        </div>
    `;
    
    // 为智汇出行系统添加专门的关闭处理
    document.getElementById('closeBtn').addEventListener('click', function() {
        // 关闭智汇出行系统
        subInterface.classList.remove('active');
        if (activeMenuItem) {
            activeMenuItem.classList.remove('active');
            activeMenuItem.style.transform = 'none';
            activeMenuItem = null;
        }
        
        // 确保所有菜单项都重置状态
        const allMenuItems = document.querySelectorAll('.left-menu .menu-item');
        allMenuItems.forEach(item => {
            item.classList.remove('active');
            item.style.transform = 'none';
        });
        
        // 恢复占位符
        setTimeout(() => {
            subInterface.innerHTML = `
                <div class="close-button" id="closeBtn">✕</div>
                <div class="player-placeholder">
                    <h2>音乐播放器</h2>
                    <p>点击"音乐播放器"开始播放音乐</p>
                </div>
            `;
            
            // 添加关闭按钮事件监听
            document.getElementById('closeBtn').addEventListener('click', closeSubInterface);
        }, 500);
    });
} 

// 游戏卡片管理功能
function openGameCardManager() {
    if (document.body.classList.contains('mini-player-active')) {
        // 在迷你播放器状态下，使用前景面板显示
        const panel = ensureForegroundPanel();
        panel.classList.add('active');
        panel.innerHTML = `
            <div class="close-button" id="closeBtn">✕</div>
            <div class="card-manager-container">
                <iframe src="卡片管理/index.html" 
                        frameborder="0" 
                        style="width: 100%; height: 100vh; border: none; display: block;">
                </iframe>
            </div>
        `;
        
        // 移除之前的事件监听器，避免重复绑定
        panel.removeEventListener('click', panel._cardManagerCloseHandler);
        
        // 创建新的事件处理函数并保存引用
        panel._cardManagerCloseHandler = function(e) {
            if (e.target.classList.contains('close-button')) {
                panel.classList.remove('active');
                // 重置菜单项状态
                if (activeMenuItem) {
                    activeMenuItem.classList.remove('active');
                    activeMenuItem.style.transform = 'none';
                    activeMenuItem = null;
                }
                // 确保所有菜单项都重置状态
                const allMenuItems = document.querySelectorAll('.left-menu .menu-item');
                allMenuItems.forEach(item => {
                    item.classList.remove('active');
                    item.style.transform = 'none';
                });
            }
        };
        
        // 添加事件监听器
        panel.addEventListener('click', panel._cardManagerCloseHandler);
        return;
    }
    
    // 非迷你播放器状态下，关闭界面歌词和音律显示
    if (window.interfaceLyrics && window.interfaceLyrics.isActive()) {
        window.interfaceLyrics.hide();
    }
    
    if (window.meterControl && window.meterControl.isVisible()) {
        window.meterControl.hide();
    }
    
    const subInterface = document.getElementById('subInterface');
    subInterface.classList.add('active');
    
    // 创建iframe来加载游戏卡片管理系统
    subInterface.innerHTML = `
        <div class="close-button" id="closeBtn">✕</div>
        <div class="card-manager-container">
            <iframe src="卡片管理/index.html" 
                    frameborder="0" 
                    style="width: 100%; height: 100vh; border: none; display: block;">
            </iframe>
        </div>
    `;
    
    // 为游戏卡片管理系统添加专门的关闭处理
    document.getElementById('closeBtn').addEventListener('click', function() {
        // 关闭游戏卡片管理系统
        subInterface.classList.remove('active');
        if (activeMenuItem) {
            activeMenuItem.classList.remove('active');
            activeMenuItem.style.transform = 'none';
            activeMenuItem = null;
        }
        
        // 确保所有菜单项都重置状态
        const allMenuItems = document.querySelectorAll('.left-menu .menu-item');
        allMenuItems.forEach(item => {
            item.classList.remove('active');
            item.style.transform = 'none';
        });
        
        // 恢复占位符
        setTimeout(() => {
            subInterface.innerHTML = `
                <div class="close-button" id="closeBtn">✕</div>
                <div class="player-placeholder">
                    <h2>音乐播放器</h2>
                    <p>点击"音乐播放器"开始播放音乐</p>
                </div>
            `;
            
            // 添加关闭按钮事件监听
            document.getElementById('closeBtn').addEventListener('click', closeSubInterface);
        }, 500);
    });
}

// 俄罗斯方块游戏功能
function openTetrisGame() {
    if (document.body.classList.contains('mini-player-active')) {
        // 在迷你播放器状态下，使用前景面板显示
        const panel = ensureForegroundPanel();
        panel.classList.add('active');
        panel.innerHTML = `
            <div class="close-button" id="closeBtn">✕</div>
            <div class="tetris-container">
                <iframe src="俄罗斯方块/tetris-embed.html" 
                        frameborder="0" 
                        style="width: 100%; height: 100vh; border: none; display: block;">
                </iframe>
            </div>
        `;
        
        // 移除之前的事件监听器，避免重复绑定
        panel.removeEventListener('click', panel._tetrisCloseHandler);
        
        // 创建新的事件处理函数并保存引用
        panel._tetrisCloseHandler = function(e) {
            if (e.target.classList.contains('close-button')) {
                panel.classList.remove('active');
                // 重置菜单项状态
                if (activeMenuItem) {
                    activeMenuItem.classList.remove('active');
                    activeMenuItem.style.transform = 'none';
                    activeMenuItem = null;
                }
                // 确保所有菜单项都重置状态
                const allMenuItems = document.querySelectorAll('.left-menu .menu-item');
                allMenuItems.forEach(item => {
                    item.classList.remove('active');
                    item.style.transform = 'none';
                });
                
                // 特别确保俄罗斯方块菜单项被重置
                const tetrisMenuItem = Array.from(allMenuItems).find(item => 
                    item.querySelector('span').textContent.trim() === '俄罗斯方块'
                );
                if (tetrisMenuItem) {
                    tetrisMenuItem.classList.remove('active');
                    tetrisMenuItem.style.transform = 'none';
                }
            }
        };
        
        // 添加事件监听器
        panel.addEventListener('click', panel._tetrisCloseHandler);
        return;
    }
    
    // 非迷你播放器状态下，关闭界面歌词和音律显示
    if (window.interfaceLyrics && window.interfaceLyrics.isActive()) {
        window.interfaceLyrics.hide();
    }
    
    if (window.meterControl && window.meterControl.isVisible()) {
        window.meterControl.hide();
    }
    
    const subInterface = document.getElementById('subInterface');
    subInterface.classList.add('active');
    
    // 创建iframe来加载俄罗斯方块游戏
    subInterface.innerHTML = `
        <div class="close-button" id="closeBtn">✕</div>
        <div class="tetris-container">
            <iframe src="俄罗斯方块/tetris-embed.html" 
                    frameborder="0" 
                    style="width: 100%; height: 100vh; border: none; display: block;">
            </iframe>
        </div>
    `;
    
    // 为俄罗斯方块游戏添加专门的关闭处理
    document.getElementById('closeBtn').addEventListener('click', function() {
        // 关闭俄罗斯方块游戏
        subInterface.classList.remove('active');
        if (activeMenuItem) {
            activeMenuItem.classList.remove('active');
            activeMenuItem.style.transform = 'none';
            activeMenuItem = null;
        }
        
        // 确保所有菜单项都重置状态
        const allMenuItems = document.querySelectorAll('.left-menu .menu-item');
        allMenuItems.forEach(item => {
            item.classList.remove('active');
            item.style.transform = 'none';
        });
        
        // 特别确保俄罗斯方块菜单项被重置
        const tetrisMenuItem = Array.from(allMenuItems).find(item => 
            item.querySelector('span').textContent.trim() === '俄罗斯方块'
        );
        if (tetrisMenuItem) {
            tetrisMenuItem.classList.remove('active');
            tetrisMenuItem.style.transform = 'none';
        }
        
        // 恢复占位符
        setTimeout(() => {
            subInterface.innerHTML = `
                <div class="close-button" id="closeBtn">✕</div>
                <div class="player-placeholder">
                    <h2>音乐播放器</h2>
                    <p>点击"音乐播放器"开始播放音乐</p>
                </div>
            `;
            
            // 添加关闭按钮事件监听
            document.getElementById('closeBtn').addEventListener('click', closeSubInterface);
        }, 500);
    });
}