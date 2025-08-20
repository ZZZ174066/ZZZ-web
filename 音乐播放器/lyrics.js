// 歌词数据管理器
class LyricsManager {
    constructor() {
        this.lyricsCache = new Map();
        this.basePath = '歌词/';
    }

    // 异步加载歌词文件
    async loadLyrics(fileName) {
        // 如果已缓存，直接返回
        if (this.lyricsCache.has(fileName)) {
            return this.lyricsCache.get(fileName);
        }

        try {
            const response = await fetch(`${this.basePath}${fileName}`);
            if (!response.ok) {
                throw new Error(`无法加载歌词文件: ${fileName}`);
            }
            
            const lyricsText = await response.text();
            
            // 缓存歌词
            this.lyricsCache.set(fileName, lyricsText);
            
            return lyricsText;
        } catch (error) {
            console.error('加载歌词失败:', error);
            return null;
        }
    }

    // 获取所有可用的歌词文件列表
    async getAvailableLyrics() {
        // 基于提供的歌词文件夹内容返回文件列表
        return [
            "一点.txt",
            "赛博朋克：边缘行者.txt",
            "Wild.txt",
            "Hush.txt",
            "infinity.txt",
            "The Ocean.txt",
            "Wrap Me In Plastic.txt",
            "BODY SHAMING.txt",
            "Kẻ Cắp Gặp Bà Già.txt",
            "See Tình.txt",
            "Cure For Me.txt",
            "Betty Boop.txt",
            "Shut up My Moms Calling.txt",
            "Crucified.txt",
            "Lightning moment.txt",
            "GoneBad.txt",
            "Shake And Sway.txt",
            "If We Never Broke Up.txt",
            "Verbatim.txt",
            "L.I.F.E.txt",
            "Shivers.txt",
            "Insomnia.txt",
            "雑踏、僕らの街.txt",
            "Thrift Shop.txt",
            "UNO.txt",
            "MONTAGEM CORAL.txt",
            "Gentle Man.txt",
            "江南Style.txt",
            "New Face.txt",
            "DADDY.txt",
            "Axel F.txt",
            "妄想哀歌.txt",
            "ヒミツ.txt",
            "花束.txt",
            "Просто.txt",
            "春娇与志明.txt",
            "New Rules(Remix).txt",
            "NOX LUX.txt",
            "溯.txt",
            "All My People.txt",
            "Once Upon a Time.txt",
            "诶嘿.txt",
            "又活了一天.txt",
            "Waiting for Love.txt",
            "怪物.txt",
            "群青.txt",
            "夜に駆ける.txt",
            "印尼宽带.txt",
            "nuits d'été.txt",
            "Sofia.txt",
            "Disco Panzer.txt",
            "Мой мармеладный.txt",
            "Мокрые губы.txt",
            "Cyka Blyat.txt",
            "one spot.txt",
            "ねぇねぇねぇ.txt",
            "强风大背头.txt",
            "ПOд ЛyHOЙ.txt",
            "Dreamy Day.txt",
            "草蛇惊一.txt",
            "Where Is Your Love.txt",
            "飢えた鳥たち.txt",
            "OTTAMA GAZER.txt",
            "深蓝与夜的呼吸.txt",
            "普通DISCO.txt",
            "阳光开朗大男孩.txt",
            "Never Gonna Give You Up.txt",
            "Gimme More x step on up.txt",
            "Зая.txt",
            "ヤキモチ.txt",
            "アイドル.txt",
            "樱花樱花想见你.txt",
            "SPECIALZ.txt",
            "真夜中のドアStay With Me.txt",
            "改革春风吹满地.txt",
            "Xin Đừng Nhấc Máy（Remix）.txt",
            "I Miss You.txt"
        ];
    }

    // 清空缓存
    clearCache() {
        this.lyricsCache.clear();
    }

    // 预加载指定的歌词文件
    async preloadLyrics(fileNames) {
        const promises = fileNames.map(fileName => this.loadLyrics(fileName));
        await Promise.allSettled(promises);
    }
}

// 创建全局歌词管理器实例
const lyricsManager = new LyricsManager();

// 为了保持向后兼容性，提供一个函数来获取歌词
async function getLyrics(fileName) {
    return await lyricsManager.loadLyrics(fileName);
}

// 导出管理器和兼容函数
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { lyricsManager, getLyrics };
} else {
    window.lyricsManager = lyricsManager;
    window.getLyrics = getLyrics;
}
