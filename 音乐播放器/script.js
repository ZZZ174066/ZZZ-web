const LYRICS_TIME_OFFSET = {
    "真夜中のドアStay With Me.txt": 0,
    "SPECIALZ.txt": 0,
    "さくら ~あなたに出会えてよかった~.txt": 0,
    "アイドル.txt": 0,
    "ヤキモチ.txt": 0,
    "Зая.txt": 0,
    "Gimme More x step on up.txt": 0,
    "Never Gonna Give You Up.txt": 0,
    "阳光开朗大男孩.txt": -1,
    "普通DISCO.txt": 0,
    "深蓝与夜的呼吸.txt": 0,
    "OTTAMA GAZER.txt": 0,
    "飢えた鳥たち.txt": 0,
    "Where Is Your Love.txt": 0,
    "ПOд ЛyHOЙ.txt": 0,
    "草蛇惊一.txt": 0.5,
    "Cyka Blyat.txt": 0,
    "Мокрые губы.txt": 0.3,
    "Мой мармеладный.txt": -2.8,
    "Disco Panzer.txt": -3,
    "Sofia.txt": -1.8,
    "nuits d'été.txt": -2.8,
    "印尼宽带.txt": 0,
    "夜に駆ける.txt": 0,
    "群青.txt": 0,
    "怪物.txt": -1,
    "Waiting for Love.txt": 0,
    "又活了一天.txt": 0,
    "诶嘿.txt": 0.5,
    "Once Upon a Time.txt": 0,
    "All My People.txt": 0,
    "溯.txt": -1.3,
    "NOX LUX.txt": 0,
    "New Rules(Remix).txt": 0.5,
    "春娇与志明.txt": 0.3,
    "Просто.txt": 0,
    "花束.txt": 0,
    "ヒミツ.txt": 0,
    "妄想哀歌.txt": 0,
    "Axel F.txt": 0,
    "DADDY.txt": 0,
    "New Face.txt": 0,
    "江南Style.txt": 0,
    "Gentle Man.txt": 0,
    "MONTAGEM CORAL.txt": 0,
    "一点.txt": 0,
    "赛博朋克：边缘行者.txt": 0,
    "Wild.txt": 0,
    "Hush.txt": 0,
    "infinity.txt": 0,
    "The Ocean.txt": 0,
    "Wrap Me In Plastic.txt": 0,
    "BODY SHAMING.txt": 0,
    "Kẻ Cắp Gặp Bà Già.txt": 0,
    "See Tình.txt": 0,
    "Cure For Me.txt": 0,
    "Betty Boop.txt": 0,
    "Shut up My Moms Calling.txt": 0,
    "Crucified.txt": 0,
    "GoneBad.txt": 0,
    "Lightning moment.txt": 0,
    "Shake And Sway.txt": 0,
    "If We Never Broke Up.txt": 0,
    "Verbatim.txt": 0,
    "L.I.F.E.txt": 0,
    "Shivers.txt": 0,
    "Insomnia.txt": 0,
    "雑踏、僕らの街.txt": 0,
    "Thrift Shop.txt": 0,
    "UNO.txt": 0,
    "改革春风吹满地.txt": 0,
    "Xin Đừng Nhấc Máy（Remix）.txt": 0,
    "I Miss You.txt": 0
};

class VideoPlayer {
    constructor() {
        this.video = document.getElementById('videoPlayer');
        this.playlist = []; // 现在是空数组，将通过动态扫描填充
        this.musicFiles = []; // 存储扫描到的音乐文件信息
        this.currentIndex = 0;
        this.playMode = 'list';
        this.lyrics = [];
        this.lyricsContainer = document.getElementById('lyricsContainer');
        this.progressFill = document.getElementById('progressFill');
        this.currentTimeDisplay = document.getElementById('currentTime');
        this.totalTimeDisplay = document.getElementById('totalTime');
        this.progressBar = document.querySelector('.progress-bar');
        this.volumeFill = document.getElementById('volumeFill');
        this.speedFill = document.getElementById('speedFill');
        this.volumeBar = document.querySelector('.volume-bar');
        this.speedBar = document.querySelector('.speed-bar');
        this.volumeValue = document.getElementById('volumeValue');
        this.speedValue = document.getElementById('speedValue');
        this.isDragging = false;
        this.isVolumeDragging = false;
        this.isSpeedDragging = false;
        
        this.isCorrectionMode = false;
        this.correctedLines = [];
        this.correctedSet = new Set();
        this.lyricsCorrectBtn = document.getElementById('lyricsCorrectBtn');
        this.currentLyricsFile = null;
        
        // 先扫描文件，然后初始化播放器
        this.scanMusicFiles().then(() => {
            this.initializePlayer();
            this.bindEvents();
            this.loadLyrics();
            this.initInkSplashEffect();
        }).catch(error => {
            console.error('扫描音乐文件失败:', error);
            this.showError('无法扫描音乐文件，请检查文件夹是否存在');
        });
    }

    // 扫描音乐文件
    async scanMusicFiles() {
        try {
            // 尝试使用PHP扫描文件
            const response = await fetch('./scan_files.php');
            const data = await response.json();
            
            if (data.success && data.files && data.files.length > 0) {
                this.musicFiles = data.files;
                this.generatePlaylist();
                console.log(`成功扫描到 ${data.count} 个音乐文件`);
            } else {
                throw new Error(data.error || '未找到音乐文件');
            }
        } catch (error) {
            console.warn('PHP扫描失败，尝试使用备用方案:', error);
            // 如果PHP扫描失败，使用备用的静态文件列表
            this.useFallbackPlaylist();
        }
    }

    // 生成播放列表HTML
    generatePlaylist() {
        const playlistContainer = document.querySelector('.playlist-container');
        playlistContainer.innerHTML = ''; // 清空现有内容
        
        this.musicFiles.forEach((fileInfo, index) => {
            const playlistItem = document.createElement('div');
            playlistItem.className = 'playlist-item';
            if (index === 0) {
                playlistItem.classList.add('active');
            }
            
            playlistItem.dataset.video = fileInfo.file;
            playlistItem.dataset.lyrics = fileInfo.lyricsFile || '';
            
            const songName = document.createElement('span');
            songName.className = 'song-name';
            songName.textContent = fileInfo.displayName;
            
            playlistItem.appendChild(songName);
            playlistContainer.appendChild(playlistItem);
        });
        
        // 更新playlist引用
        this.playlist = document.querySelectorAll('.playlist-item');
        
        // 重新绑定播放列表事件
        this.bindPlaylistEvents();
        
        // 为新生成的播放列表项添加墨水飞溅效果
        this.playlist.forEach(item => {
            this.addInkSplashToButton(item);
        });
    }

    // 备用播放列表（如果动态扫描失败）
    useFallbackPlaylist() {
        console.log('使用备用播放列表');
        
        // 创建一个基本的文件列表作为备用
        const fallbackFiles = [
            { file: 'All My People.mp4', displayName: 'All My People', lyricsFile: 'All My People.txt' },
            { file: 'Axel F.mp4', displayName: 'Axel F', lyricsFile: 'Axel F.txt' },
            { file: 'Betty Boop.mp4', displayName: 'Betty Boop', lyricsFile: 'Betty Boop.txt' }
        ];
        
        this.musicFiles = fallbackFiles;
        this.generatePlaylist();
    }

    // 显示错误信息
    showError(message) {
        const playlistContainer = document.querySelector('.playlist-container');
        playlistContainer.innerHTML = `
            <div class="error-message" style="padding: 20px; text-align: center; color: #666;">
                <p>${message}</p>
                <button onclick="location.reload()" style="margin-top: 10px; padding: 8px 16px; border: 2px solid #000; background: white; cursor: pointer;">重新加载</button>
            </div>
        `;
    }

    initializePlayer() {
        // 确保有播放列表项
        if (this.playlist.length > 0) {
            this.video.src = `../音乐/${this.playlist[this.currentIndex].dataset.video}`;
            this.updateActivePlaylistItem();
        }
        
        // 设置播放模式
        this.setPlayMode(this.playMode);
        
        // 设置默认音量和播放速度
        this.video.volume = 0.5;
        this.video.playbackRate = 1.0;
        this.volumeFill.style.width = '50%';
        this.speedFill.style.width = '50%';
    }

    // 为播放列表项绑定事件
    bindPlaylistEvents() {
        this.playlist.forEach((item, index) => {
            item.addEventListener('click', () => {
                this.playTrack(index);
            });
        });
    }

    bindEvents() {
        // 为播放列表项绑定事件
        this.bindPlaylistEvents();


        const searchIcon = document.getElementById('searchIcon');
        const searchInput = document.getElementById('searchInput');
        const sectionTitle = document.querySelector('.section-title');
        
        if (searchIcon && searchInput) {
            searchIcon.addEventListener('click', () => {
                if (searchInput.style.display === 'none') {

                    searchInput.style.display = 'block';
                    searchInput.focus();
                    sectionTitle.style.visibility = 'hidden';
                } else {

                    searchInput.style.display = 'none';
                    sectionTitle.style.visibility = 'visible';
                    searchInput.value = '';
                    this.showAllPlaylistItems();
                }
            });


            searchInput.addEventListener('input', (e) => {
                const searchTerm = e.target.value.toLowerCase();
                this.filterPlaylist(searchTerm);
            });


            searchInput.addEventListener('keydown', (e) => {
                if (e.key === 'Escape') {
                    searchInput.style.display = 'none';
                    sectionTitle.style.visibility = 'visible';
                    searchInput.value = '';
                    this.showAllPlaylistItems();
                }
            });
        }


        document.getElementById('prevBtn').addEventListener('click', () => this.previous());
        document.getElementById('nextBtn').addEventListener('click', () => this.next());
        document.getElementById('randomStartBtn').addEventListener('click', () => this.randomStart());
        document.getElementById('playPauseBtn').addEventListener('click', () => this.togglePlayPause());


        document.getElementById('playModeBtn').addEventListener('click', () => this.cyclePlayMode());


        if (this.lyricsCorrectBtn) {
            this.lyricsCorrectBtn.addEventListener('click', () => this.toggleCorrectionMode());
        }


        this.video.addEventListener('ended', () => this.onVideoEnded());
        this.video.addEventListener('timeupdate', () => {
            this.updateLyrics();
            this.updateProgress();
        });
        this.video.addEventListener('play', () => {
            this.updatePlayPauseButton();
        });
        this.video.addEventListener('pause', () => this.updatePlayPauseButton());
        this.video.addEventListener('loadedmetadata', () => this.updateTotalTime());
        

        this.progressBar.addEventListener('click', (e) => this.seekTo(e));
        

        this.video.addEventListener('click', () => this.togglePlayPause());
        

        this.progressBar.addEventListener('mousedown', (e) => this.startDragging(e));
        document.addEventListener('mousemove', (e) => this.dragging(e));
        document.addEventListener('mouseup', () => this.stopDragging());
        

        this.volumeBar.addEventListener('mousedown', (e) => this.startVolumeDragging(e));
        document.addEventListener('mousemove', (e) => this.volumeDragging(e));
        document.addEventListener('mouseup', () => this.stopVolumeDragging());
        

        this.speedBar.addEventListener('mousedown', (e) => this.startSpeedDragging(e));
        document.addEventListener('mousemove', (e) => this.speedDragging(e));
        document.addEventListener('mouseup', () => this.stopSpeedDragging());
    }

    playTrack(index) {
        this.currentIndex = index;
        const videoFile = this.playlist[index].dataset.video;
        const lyricsFile = this.playlist[index].dataset.lyrics;
        
        this.video.src = `../音乐/${videoFile}`;
        this.video.load();
        

        this.video.volume = parseFloat(this.volumeValue.textContent) / 100;
        this.video.playbackRate = parseFloat(this.speedValue.textContent.replace('x', ''));
        
        this.video.play();
        
        this.updateActivePlaylistItem();
        this.loadLyrics(lyricsFile);
    }

    previous() {
        let newIndex = this.currentIndex - 1;
        

        switch (this.playMode) {
            case 'single':

                newIndex = this.currentIndex;
                break;
            case 'list':

                if (newIndex < 0) {
                    newIndex = this.playlist.length - 1;
                }
                break;
            case 'shuffle':

                newIndex = Math.floor(Math.random() * this.playlist.length);
                break;
        }
        
        this.playTrack(newIndex);
    }

    next() {
        let newIndex = this.currentIndex + 1;
        

        switch (this.playMode) {
            case 'single':

                newIndex = this.currentIndex;
                break;
            case 'list':

                if (newIndex >= this.playlist.length) {
                    newIndex = 0;
                }
                break;
            case 'shuffle':

                newIndex = Math.floor(Math.random() * this.playlist.length);
                break;
        }
        
        this.playTrack(newIndex);
    }

    togglePlayPause() {
        if (this.video.paused) {
            this.video.play();
        } else {
            this.video.pause();
        }
    }

    updatePlayPauseButton() {
        const btn = document.getElementById('playPauseBtn');
        if (this.video.paused) {
            btn.textContent = '▶';
        } else {
            btn.textContent = '⏸';
        }
    }

    cyclePlayMode() {
        // 循环切换播放模式：列表循环 -> 单曲循环 -> 随机播放 -> 列表循环
        switch (this.playMode) {
            case 'list':
                this.playMode = 'single';
                document.getElementById('playModeBtn').textContent = '单曲循环';
                console.log('已切换到单曲循环模式');
                break;
            case 'single':
                this.playMode = 'shuffle';
                document.getElementById('playModeBtn').textContent = '随机播放';
                console.log('已切换到随机播放模式');
                break;
            case 'shuffle':
                this.playMode = 'list';
                document.getElementById('playModeBtn').textContent = '列表循环';
                console.log('已切换到列表循环模式');
                break;
        }
    }

    setPlayMode(mode) {
        this.playMode = mode;
        
        // 更新按钮状态和文本
        const playModeBtn = document.getElementById('playModeBtn');
        if (playModeBtn) {
        switch(mode) {
            case 'single':
                    playModeBtn.textContent = '单曲循环';
                break;
            case 'list':
                    playModeBtn.textContent = '列表循环';
                break;
            case 'shuffle':
                    playModeBtn.textContent = '随机播放';
                break;
            }
        }
    }

    onVideoEnded() {
        // 若处于矫正模式，则在歌曲结束时导出本次矫正结果并退出矫正
        if (this.isCorrectionMode && this.correctedLines.length > 0) {
            this.exportCorrectionToTxt();
            this.isCorrectionMode = false;
            if (this.lyricsCorrectBtn) {
                this.lyricsCorrectBtn.classList.remove('active');
                this.lyricsCorrectBtn.textContent = '歌词矫正';
            }
            this.displayLyrics();
        }
        switch (this.playMode) {
            case 'single':
                this.video.currentTime = 0;
                this.video.play();
                break;
            case 'list':
                this.next();
                break;
            case 'shuffle':
                this.next();
                break;
        }
    }

    updateActivePlaylistItem() {
        this.playlist.forEach((item, index) => {
            item.classList.toggle('active', index === this.currentIndex);
        });
    }

    loadLyrics(lyricsFile = null) {
        if (!lyricsFile && this.playlist.length > 0) {
            lyricsFile = this.playlist[this.currentIndex].dataset.lyrics;
        }
        this.currentLyricsFile = lyricsFile;
        // 离开当前歌曲时重置矫正（不丢数据，仅清空标记）
        this.correctedLines = [];
        this.correctedSet = new Set();
        
        if (!lyricsFile) {
            this.lyrics = [];
            this.displayLyrics();
            return;
        }
        
        // 尝试动态加载歌词文件
        this.loadLyricsFromFile(lyricsFile).then(lyricsText => {
            if (lyricsText) {
                this.lyrics = this.parseLyrics(lyricsText);
            } else {
                // 如果动态加载失败，尝试从内置歌词数据中获取
                const data = LYRICS_DATA[lyricsFile];
                if (data) {
                    if (Array.isArray(data)) {
                        this.lyrics = data.slice().sort((a, b) => a.time - b.time);
                    } else if (typeof data === 'string') {
                        this.lyrics = this.parseLyrics(data);
                    } else {
                        this.lyrics = [];
                    }
                } else {
                    console.warn('未找到歌词文件:', lyricsFile);
                    this.lyrics = [];
                }
            }
            this.displayLyrics();
        }).catch(error => {
            console.error('加载歌词失败:', error);
            this.lyrics = [];
            this.displayLyrics();
        });
    }

    // 动态加载歌词文件
    async loadLyricsFromFile(lyricsFile) {
        try {
            const response = await fetch(`./歌词/${lyricsFile}`);
            if (response.ok) {
                const text = await response.text();
                return text;
            } else {
                console.warn(`歌词文件不存在: ${lyricsFile}`);
                return null;
            }
        } catch (error) {
            console.warn(`加载歌词文件失败: ${lyricsFile}`, error);
            return null;
        }
    }

    parseLyrics(lyricsText) {
        // 解析多种时间标签格式：
        // [mm:ss.xx] 或 [mm:ss.xxx] 或 [ssss.xx]（如[0003.34]）以及可选的尾随标记（如 -1）
        const result = [];
        if (!lyricsText) return result;
        const lines = lyricsText.split('\n');
        const timeTagRegex1 = /^\[(\d{1,2}):(\d{1,2})(?:\.(\d{1,3}))?(?:-[^\]]+)?\](.*)$/; // mm:ss(.ms)
        const timeTagRegex2 = /^\[(\d{1,4})(?:\.(\d{1,3}))?(?:-[^\]]+)?\](.*)$/;           // s(.ms)
        for (const rawLine of lines) {
            const line = rawLine.trimEnd();
            if (!line) continue;
            let m = line.match(timeTagRegex1);
            let text = '';
            let time = null;
            if (m) {
                const minutes = parseInt(m[1], 10) || 0;
                const seconds = parseInt(m[2], 10) || 0;
                const fraction = parseInt(m[3] || '0', 10);
                const frac = isNaN(fraction) ? 0 : (m[3].length === 3 ? fraction / 1000 : fraction / 100);
                time = minutes * 60 + seconds + frac;
                text = (m[4] || '').trim();
            } else {
                m = line.match(timeTagRegex2);
                if (m) {
                    const secondsWhole = parseInt(m[1], 10) || 0;
                    const fraction = parseInt(m[2] || '0', 10);
                    const frac = isNaN(fraction) ? 0 : (m[2] && m[2].length === 3 ? fraction / 1000 : fraction / 100);
                    time = secondsWhole + frac;
                    text = (m[3] || '').trim();
                }
            }
            if (time !== null) {
                result.push({ time, text });
            }
        }
        result.sort((a, b) => a.time - b.time);
        return result;
    }

    displayLyrics() {
        this.lyricsContainer.innerHTML = '';
        if (this.lyrics.length === 0) {
            this.lyricsContainer.innerHTML = '<div class="lyrics-line">暂无歌词</div>';
            return;
        }
        this.lyrics.forEach(lyric => {
            const line = document.createElement('div');
            line.className = 'lyrics-line';
            line.textContent = lyric.text;
            line.dataset.time = lyric.time;
            // 矫正模式下：禁用点击跳转，启用矫正
            if (this.isCorrectionMode) {
                line.addEventListener('click', () => this.handleLyricClick(lyric));
            } else {
                line.addEventListener('click', () => {
                    this.seekToLyric(lyric.time);
                });
            }
            this.lyricsContainer.appendChild(line);
        });
    }

    updateLyrics() {
        // 矫正模式下，不执行自动跟随与高亮
        if (this.isCorrectionMode) return;
        let currentTime = this.video.currentTime;
        const lyricsFile = this.playlist[this.currentIndex].dataset.lyrics;
        const offset = LYRICS_TIME_OFFSET[lyricsFile] || 0;
        currentTime += offset;
        const lines = this.lyricsContainer.querySelectorAll('.lyrics-line');
        lines.forEach(line => {
            line.classList.remove('active');
        });
        let activeLine = null;
        let currentLyricsText = '';
        for (let i = this.lyrics.length - 1; i >= 0; i--) {
            if (currentTime >= this.lyrics[i].time) {
                activeLine = this.lyricsContainer.querySelector(`[data-time="${this.lyrics[i].time}"]`);
                currentLyricsText = this.lyrics[i].text;
                break;
            }
        }
        if (activeLine) {
            activeLine.classList.add('active');
            const container = this.lyricsContainer;
            if (container) {
                const centerTop = activeLine.offsetTop - Math.max(0, (container.clientHeight - activeLine.offsetHeight) / 2);
                const maxTop = Math.max(0, container.scrollHeight - container.clientHeight);
                const clampedTop = Math.min(maxTop, Math.max(0, centerTop));
                container.scrollTo({ top: clampedTop, behavior: 'smooth' });
            }
            
            // 发送当前歌词到父页面（用于界面歌词显示）
            try {
                window.parent.postMessage({
                    type: 'updateInterfaceLyrics',
                    lyrics: currentLyricsText
                }, '*');
            } catch (err) {
                // 忽略错误
            }
        }
    }

    updateProgress() {
        if (this.video.duration) {
            const progress = (this.video.currentTime / this.video.duration) * 100;
            this.progressFill.style.width = progress + '%';
            this.currentTimeDisplay.textContent = this.formatTime(this.video.currentTime);
            
            // 更新滑块位置
            const progressThumb = this.progressFill.querySelector('.progress-thumb');
            if (progressThumb) {
                progressThumb.style.right = `-16px`;
            }
        }
    }

    updateTotalTime() {
        this.totalTimeDisplay.textContent = this.formatTime(this.video.duration);
    }

    seekTo(e) {
        const rect = this.progressBar.getBoundingClientRect();
        const clickX = e.clientX - rect.left;
        const percentage = clickX / rect.width;
        const newTime = percentage * this.video.duration;
        this.video.currentTime = newTime;
    }

    formatTime(seconds) {
        if (isNaN(seconds)) return '00:00';
        const mins = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }

    startDragging(e) {
        this.isDragging = true;
        this.dragging(e);
    }

    dragging(e) {
        if (!this.isDragging) return;
        
        const rect = this.progressBar.getBoundingClientRect();
        let clickX = e.clientX - rect.left;
        
        // 限制在进度条范围内
        clickX = Math.max(0, Math.min(clickX, rect.width));
        
        const percentage = clickX / rect.width;
        const newTime = percentage * this.video.duration;
        
        // 更新进度条显示
        this.progressFill.style.width = percentage * 100 + '%';
        this.currentTimeDisplay.textContent = this.formatTime(newTime);
        
        // 实时更新视频时间
        this.video.currentTime = newTime;
    }

    stopDragging() {
        this.isDragging = false;
    }

    seekToLyric(time) {
        // 矫正模式下禁用点击跳转
        if (this.isCorrectionMode) return;
        const lyricsFile = this.playlist[this.currentIndex].dataset.lyrics;
        const offset = LYRICS_TIME_OFFSET[lyricsFile] || 0;
        const adjustedTime = time - offset;
        this.video.currentTime = Math.max(0, adjustedTime);
    }

    randomStart() {
        // 随机选择一首歌
        const randomIndex = Math.floor(Math.random() * this.playlist.length);
        this.playTrack(randomIndex);
    }

    // 音量控制方法
    startVolumeDragging(e) {
        this.isVolumeDragging = true;
        this.volumeDragging(e);
    }

    volumeDragging(e) {
        if (!this.isVolumeDragging) return;
        
        const rect = this.volumeBar.getBoundingClientRect();
        let clickX = e.clientX - rect.left;
        clickX = Math.max(0, Math.min(clickX, rect.width));
        
        const percentage = clickX / rect.width;
        const volume = Math.round(percentage * 100);
        this.volumeFill.style.width = percentage * 100 + '%';
        this.video.volume = percentage;
        this.volumeValue.textContent = volume;
    }

    stopVolumeDragging() {
        this.isVolumeDragging = false;
    }

    // 速度控制方法
    startSpeedDragging(e) {
        this.isSpeedDragging = true;
        this.speedDragging(e);
    }

    speedDragging(e) {
        if (!this.isSpeedDragging) return;
        
        const rect = this.speedBar.getBoundingClientRect();
        let clickX = e.clientX - rect.left;
        clickX = Math.max(0, Math.min(clickX, rect.width));
        
        const percentage = clickX / rect.width;
        this.speedFill.style.width = percentage * 100 + '%';
        
        // 计算播放速度：0.0x 到 2.0x，每次调整0.25的倍数
        const speed = percentage * 2.0;
        const roundedSpeed = Math.round(speed * 4) / 4; // 四舍五入到0.25的倍数
        this.video.playbackRate = roundedSpeed;
        this.speedValue.textContent = roundedSpeed.toFixed(2).replace(/\.0$/, '') + 'x';
    }

    stopSpeedDragging() {
        this.isSpeedDragging = false;
    }

    // 初始化墨水飞溅效果
    initInkSplashEffect() {
        // 为所有控制按钮添加墨水飞溅效果
        const controlButtons = document.querySelectorAll('.control-btn');
        controlButtons.forEach(button => {
            this.addInkSplashToButton(button);
        });

        // 为播放列表项添加墨水飞溅效果
        const playlistItems = document.querySelectorAll('.playlist-item');
        playlistItems.forEach(item => {
            this.addInkSplashToButton(item);
        });

        // 为歌词行添加墨水飞溅效果
        const lyricsLines = document.querySelectorAll('.lyrics-line');
        lyricsLines.forEach(line => {
            this.addInkSplashToButton(line);
        });
    }

    // 为按钮添加墨水飞溅效果
    addInkSplashToButton(element) {
        // 添加点击事件
        element.addEventListener('mousedown', (e) => {
            this.createInkSplash(e, element);
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

    toggleCorrectionMode() {
        this.isCorrectionMode = !this.isCorrectionMode;
        if (this.lyricsCorrectBtn) {
            this.lyricsCorrectBtn.classList.toggle('active', this.isCorrectionMode);
            this.lyricsCorrectBtn.textContent = this.isCorrectionMode ? '结束矫正' : '歌词矫正';
        }
        // 进入/退出时重绘列表以更新事件绑定
        this.displayLyrics();
        // 退出矫正时若有数据则导出
        if (!this.isCorrectionMode && this.correctedLines.length > 0) {
            this.exportCorrectionToTxt();
        }
    }

    handleLyricClick(lyric) {
        // 防重复：以“时间+文本”唯一标识同一行
        const key = `${lyric.time}|${lyric.text}`;
        if (this.correctedSet.has(key)) return;
        const now = this.video.currentTime;
        const lyricsFile = this.currentLyricsFile || (this.playlist[this.currentIndex]?.dataset.lyrics || '未命名.txt');
        const offset = LYRICS_TIME_OFFSET[lyricsFile] || 0;
        const stamped = this.formatStamp(now + offset);
        const line = `[${stamped}]${lyric.text}`;
        this.correctedLines.push(line);
        this.correctedSet.add(key);
        // 视觉标记
        const dom = this.lyricsContainer.querySelector(`[data-time="${lyric.time}"]`);
        if (dom) {
            dom.classList.add('corrected');
        }
    }

    formatStamp(sec) {
        const minutes = Math.floor(sec / 60);
        const seconds = Math.floor(sec % 60);
        const ms = Math.round((sec - Math.floor(sec)) * 1000);
        const mm = String(minutes).padStart(2, '0');
        const ss = String(seconds).padStart(2, '0');
        const mmm = String(ms).padStart(3, '0');
        return `${mm}:${ss}.${mmm}`;
    }

    exportCorrectionToTxt() {
        const content = this.correctedLines.join('\n');
        const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        const base = (this.currentLyricsFile || 'lyrics').replace(/\.[^/.]+$/, '');
        a.download = `${base}.txt`;
        a.href = url;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        // 清空本次数据，避免重复导出
        this.correctedLines = [];
        this.correctedSet = new Set();
    }

    // 搜索播放列表
    filterPlaylist(searchTerm) {
        const playlistItems = document.querySelectorAll('.playlist-item');
        
        playlistItems.forEach(item => {
            const songName = item.querySelector('.song-name').textContent.toLowerCase();
            if (searchTerm === '' || songName.includes(searchTerm)) {
                item.style.display = 'block';
            } else {
                item.style.display = 'none';
            }
        });
    }

    // 显示所有播放列表项
    showAllPlaylistItems() {
        const playlistItems = document.querySelectorAll('.playlist-item');
        playlistItems.forEach(item => {
            item.style.display = 'block';
        });
    }

}

// 页面加载完成后初始化播放器
document.addEventListener('DOMContentLoaded', () => {
    new VideoPlayer();
});

// 添加键盘快捷键支持
document.addEventListener('keydown', (e) => {
    switch(e.code) {
        case 'Space':
            e.preventDefault();
            const playPauseBtn = document.getElementById('playPauseBtn');
            playPauseBtn.click();
            break;
        case 'ArrowLeft':
            e.preventDefault();
            document.getElementById('prevBtn').click();
            break;
        case 'ArrowRight':
            e.preventDefault();
            document.getElementById('nextBtn').click();
            break;
    }
}); 

// 背景播放：与父页面通信，最小化到迷你控制条
(function(){
    function setupBackgroundPlayMessaging(){
        const bgBtn = document.getElementById('backgroundPlayBtn');
        if (bgBtn) {
            bgBtn.addEventListener('click', function(){
                try {
                    // 发送当前播放状态到父页面
                    const videoPlayer = document.getElementById('videoPlayer');
                    const currentState = {
                        type: 'requestBackgroundPlay',
                        currentTime: videoPlayer ? videoPlayer.currentTime : 0,
                        paused: videoPlayer ? videoPlayer.paused : true,
                        currentSrc: videoPlayer ? videoPlayer.currentSrc : '',
                        volume: videoPlayer ? videoPlayer.volume : 1,
                        playbackRate: videoPlayer ? videoPlayer.playbackRate : 1
                    };
                    window.parent.postMessage(currentState, '*');
                } catch (err) {
                    console.error('postMessage requestBackgroundPlay failed', err);
                }
            });
        }

        // 界面歌词按钮
        const interfaceLyricsBtn = document.getElementById('interfaceLyricsBtn');
        if (interfaceLyricsBtn) {
            interfaceLyricsBtn.addEventListener('click', function(){
                try {
                    this.classList.toggle('active');
                    const isActive = this.classList.contains('active');
                    window.parent.postMessage({ type: 'interfaceLyricsToggle', isActive }, '*');
                } catch (err) {
                    console.error('postMessage interfaceLyricsToggle failed', err);
                }
            });
        }

        // 音律显示按钮（仅模拟）
        const meterToggleBtn = document.getElementById('meterToggleBtn');
        if (meterToggleBtn) {
            meterToggleBtn.addEventListener('click', function(){
                try {
                    this.classList.toggle('active');
                    const isActive = this.classList.contains('active');
                    window.parent.postMessage({ type: 'meterToggle', isActive }, '*');
                } catch (err) {
                    console.error('postMessage meterToggle failed', err);
                }
            });
        }

        // 父页面发来的控制指令：prev / togglePlay / next / requestState
        window.addEventListener('message', function(e){
            const data = e.data || {};
            if (!data || data.type !== 'control') return;
            try {
                switch(data.action){
                    case 'prev': {
                        const btn = document.getElementById('prevBtn');
                        if (btn) btn.click();
                        break;
                    }
                    case 'next': {
                        const btn = document.getElementById('nextBtn');
                        if (btn) btn.click();
                        break;
                    }
                    case 'togglePlay': {
                        const btn = document.getElementById('playPauseBtn');
                        if (btn) btn.click();
                        break;
                    }
                }
            } catch (err) {
                console.error('handle control message failed', err);
            }
        });

        // 处理播放状态同步
        window.addEventListener('message', function(e){
            const data = e.data || {};
            if (!data || data.type !== 'syncPlaybackState') return;
            try {
                const videoPlayer = document.getElementById('videoPlayer');
                if (videoPlayer && data.currentSrc) {
                    // 设置相同的视频源
                    if (videoPlayer.src !== data.currentSrc) {
                        videoPlayer.src = data.currentSrc;
                    }
                    // 同步播放状态
                    videoPlayer.currentTime = data.currentTime || 0;
                    videoPlayer.volume = data.volume || 1;
                    videoPlayer.playbackRate = data.playbackRate || 1;
                    
                    // 根据暂停状态决定是否播放
                    if (!data.paused) {
                        videoPlayer.play().catch(() => {});
                    }
                }
            } catch (err) {
                console.error('sync playback state failed', err);
            }
        });

        // 监听来自播放器的播放状态变化
        const videoPlayer = document.getElementById('videoPlayer');
        if (videoPlayer) {
            // 音频分析相关变量
            let audioContext = null;
            let analyser = null;
            let sourceNode = null;
            let rafId = 0;
            const FREQ_BARS = 48; // 与主页面保持一致
            const freqArray = new Uint8Array(1024);

            function ensureAudioGraph() {
                if (audioContext) return;
                try {
                    audioContext = new (window.AudioContext || window.webkitAudioContext)();
                    analyser = audioContext.createAnalyser();
                    analyser.fftSize = 2048;
                    analyser.smoothingTimeConstant = 0.85;
                    
                    // 创建音频源节点
                    sourceNode = audioContext.createMediaElementSource(videoPlayer);
                    
                    // 连接音频图：source -> analyser -> destination
                    sourceNode.connect(analyser);
                    analyser.connect(audioContext.destination);
                    
                    console.log('音频分析图初始化成功');
                } catch (err) {
                    console.error('音频分析初始化失败:', err);
                }
            }

            function sampleAndPost() {
                if (!analyser) return;
                analyser.getByteFrequencyData(freqArray);
                
                // 将频谱数据压缩成48个条，重点采样中频段
                const bars = [];
                const totalBars = FREQ_BARS;
                
                // 重点采样中频段（人声和主要乐器频率）
                const lowFreqStart = Math.floor(freqArray.length * 0.1);
                const midFreqStart = Math.floor(freqArray.length * 0.2);
                const highFreqStart = Math.floor(freqArray.length * 0.6);
                
                for (let i = 0; i < totalBars; i++) {
                    let sum = 0;
                    let count = 0;
                    
                    if (i < totalBars * 0.3) {
                        // 低频段：较少采样
                        const start = lowFreqStart + (i / (totalBars * 0.3)) * (midFreqStart - lowFreqStart);
                        const end = start + 2;
                        for (let j = Math.floor(start); j < Math.min(end, freqArray.length); j++) {
                            sum += freqArray[j];
                            count++;
                        }
                    } else if (i < totalBars * 0.7) {
                        // 中频段：密集采样（重点区域）
                        const start = midFreqStart + ((i - totalBars * 0.3) / (totalBars * 0.4)) * (highFreqStart - midFreqStart);
                        const end = start + 8;
                        for (let j = Math.floor(start); j < Math.min(end, freqArray.length); j++) {
                            sum += freqArray[j];
                            count++;
                        }
                    } else {
                        // 高频段：增加采样密度
                        const start = highFreqStart + ((i - totalBars * 0.7) / (totalBars * 0.3)) * (freqArray.length - highFreqStart);
                        const end = start + 6;
                        for (let j = Math.floor(start); j < Math.min(end, freqArray.length); j++) {
                            sum += freqArray[j];
                            count++;
                        }
                    }
                    
                    const avg = count > 0 ? sum / count : 0;
                    let normalized = Math.min(1, avg / 255);
                    
                    // 增强中频段的响应
                    if (i >= totalBars * 0.3 && i < totalBars * 0.7) {
                        normalized = Math.pow(normalized, 0.6);
                    } else if (i >= totalBars * 0.7) {
                        normalized = Math.pow(normalized, 0.7);
                    }
                    
                    bars.push(normalized);
                }
                
                try {
                    window.parent.postMessage({ type: 'meterData', bars }, '*');
                } catch (_) {}
                
                rafId = window.requestAnimationFrame(sampleAndPost);
            }

            function startMeter() {
                ensureAudioGraph();
                if (audioContext && audioContext.state === 'suspended') {
                    audioContext.resume().catch(() => {});
                }
                if (!rafId) {
                    rafId = window.requestAnimationFrame(sampleAndPost);
                }
            }

            function stopMeter() {
                if (rafId) {
                    window.cancelAnimationFrame(rafId);
                    rafId = 0;
                }
                try {
                    window.parent.postMessage({ type: 'meterPause' }, '*');
                } catch (_) {}
            }

            videoPlayer.addEventListener('play', function() {
                try {
                    window.parent.postMessage({
                        type: 'playbackStateChanged',
                        isPlaying: true
                    }, '*');
                } catch (err) {
                    // 忽略错误
                }
                startMeter();
            });

            videoPlayer.addEventListener('pause', function() {
                try {
                    window.parent.postMessage({
                        type: 'playbackStateChanged',
                        isPlaying: false
                    }, '*');
                } catch (err) {
                    // 忽略错误
                }
                stopMeter();
            });

            videoPlayer.addEventListener('ended', function() {
                stopMeter();
            });
        }

        // 处理界面歌词和音律显示状态同步
        window.addEventListener('message', function(e){
            const data = e.data || {};
            if (data.type === 'interfaceLyricsToggle') {
                const interfaceLyricsBtn = document.getElementById('interfaceLyricsBtn');
                if (interfaceLyricsBtn) {
                    if (data.isActive) {
                        interfaceLyricsBtn.classList.add('active');
                    } else {
                        interfaceLyricsBtn.classList.remove('active');
                    }
                }
            } else if (data.type === 'meterToggle') {
                const meterToggleBtn = document.getElementById('meterToggleBtn');
                if (meterToggleBtn) {
                    if (data.isActive) {
                        meterToggleBtn.classList.add('active');
                    } else {
                        meterToggleBtn.classList.remove('active');
                    }
                }
            }
        });
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', setupBackgroundPlayMessaging);
    } else {
        setupBackgroundPlayMessaging();
    }
})(); 