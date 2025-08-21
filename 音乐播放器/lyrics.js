// 歌词数据管理器
class LyricsManager {
    constructor() {
        this.lyricsCache = new Map();
        this.basePath = '歌词/';
    }
    async loadLyrics(fileName) {
        if (this.lyricsCache.has(fileName)) {
            return this.lyricsCache.get(fileName);
        }
        try {
            const response = await fetch(`${this.basePath}${fileName}`);
            if (!response.ok) {
                throw new Error(`无法加载歌词文件: ${fileName}`);
            }
            const lyricsText = await response.text();
            this.lyricsCache.set(fileName, lyricsText);
            return lyricsText;
        } catch (error) {
            console.error('加载歌词失败:', error);
            return null;
        }
    }
    async getAvailableLyrics() {
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
    clearCache() {
        this.lyricsCache.clear();
    }
    async preloadLyrics(fileNames) {
        const promises = fileNames.map(fileName => this.loadLyrics(fileName));
        await Promise.allSettled(promises);
    }
}
const lyricsManager = new LyricsManager();
async function getLyrics(fileName) {
    return await lyricsManager.loadLyrics(fileName);
}
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { lyricsManager, getLyrics };
} else {
    window.lyricsManager = lyricsManager;
    window.getLyrics = getLyrics;
}