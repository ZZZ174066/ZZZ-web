const PICTURE_NATURES = ['电脑壁纸', '手机壁纸', '头像', '表情包', '其他'];

const PICTURES = [
  {
    id: '0001',
    name: '琪亚娜·卡斯兰娜 空之律者',
    url: 'https://i0.hdslb.com/bfs/article/c39242c2040ab35af83cc2d14ef461db18d1b80d.jpg',
    natures: ['电脑壁纸'],
    tags: ['崩坏三']
  },
  {
    id: '0002',
    name: '琪亚娜·卡斯兰娜 夏日泳装',
    url: 'https://gd-hbimg.huaban.com/020d3251b2a8aa14f70dd310e69af265c26a2107343d02-o5P3rZ',
    natures: ['电脑壁纸'],
    tags: ['崩坏三']
  },
  {
    id: '0009',
    name: '德丽莎·阿波卡利斯 生日',
    url: 'https://gd-hbimg.huaban.com/89a8effcccafdd5713ceafa53aae3e3febc2586f58ade2-7khpO0',
    natures: ['电脑壁纸'],
    tags: ['崩坏三']
  },
  {
    id: '0012',
    name: '德丽莎·阿波卡利斯 天命难逃',
    url: 'https://act-upload.mihoyo.com/bh3-wiki/2024/08/12/75216984/cec5875d5cb87a57eda885247119a98e_1683274862435943674.png',
    natures: ['电脑壁纸'],
    tags: ['崩坏三']
  },
  {
    id: '0013',
    name: '符华 人为崩落',
    url: 'https://i2.hdslb.com/bfs/archive/160fbfbca72bd880b548b99560ca4ae74fea3697.jpg',
    natures: ['电脑壁纸'],
    tags: ['崩坏三']
  },
  {
    id: '0015',
    name: '符华',
    url: 'https://gd-hbimg.huaban.com/b7dc465d7d538073f14216e5eea2003389755ae17b969f-F4AusY',
    natures: ['电脑壁纸'],
    tags: ['崩坏三']
  },
  {
    id: '0016',
    name: '识之律者 泳装',
    url: 'https://gd-hbimg.huaban.com/b7d5f51e8dcee5b7ae3fc386b3c4ad4d8f8fb7048c6d55-YVA43w',
    natures: ['电脑壁纸'],
    tags: ['崩坏三']
  },
  {
    id: '0017',
    name: '李素裳 识之律者',
    url: 'https://pic.rmb.bdstatic.com/bjh/209ccb722ce85e2587b8edc674c9c3839201.jpeg@h_1280',
    natures: ['电脑壁纸'],
    tags: ['崩坏三']
  },
  {
    id: '0018',
    name: '丽塔 窈窕谍影',
    url: 'https://i2.hdslb.com/bfs/archive/93d0f9b3cd36c29b22d8c129d10cc9dccd79ef32.jpg',
    natures: ['电脑壁纸'],
    tags: ['崩坏三']
  },
  {
    id: '0019',
    name: '丽塔·洛丝薇瑟 缭乱星棘',
    url: 'https://pic.rmb.bdstatic.com/bjh/c9f48b1297231443463f1e0db3421e53.png',
    natures: ['电脑壁纸'],
    tags: ['崩坏三']
  },
  {
    id: '0020',
    name: '丽塔·洛丝薇瑟 失落迷迭',
    url: 'https://i0.hdslb.com/bfs/archive/b3f3ee1deb1b823abd136e0b5ce011c36f1bcfc3.jpg',
    natures: ['电脑壁纸'],
    tags: ['崩坏三']
  },
  {
    id: '0021',
    name: '雷电芽衣 镇×偃月叩晓',
    url: 'https://upload-bbs.miyoushe.com/upload/2026/02/03/171401465/24c90212aee6789a452e866a2b1fc004_3573466150101162257.webp?x-oss-process=image//resize,s_600/quality,q_80/auto-orient,0/interlace,1/format,webp',
    natures: ['电脑壁纸'],
    tags: ['崩坏三']
  },
  {
    id: '0022',
    name: '琪亚娜·卡斯兰娜 新春贺图',
    url: 'https://act-upload.mihoyo.com/bh3-wiki/2025/01/26/75216984/e5d80131132973b1448fbac609caded5_9187620786462458702.png',
    natures: ['电脑壁纸'],
    tags: ['崩坏三']
  },
  {
    id: '0023',
    name: '八重樱 生日贺图',
    url: 'https://upload-bbs.miyoushe.com/upload/2025/12/28/320927337/67c99b24946ec93989cd3b68386431a9_6560492543964694651.jpg?x-oss-process=image//resize,s_600/quality,q_80/auto-orient,0/interlace,1/format,jpg',
    natures: ['电脑壁纸'],
    tags: ['崩坏三']
  },
  {
    id: '0025',
    name: '阿琳姐妹 科学怪人&鬼魂玛丽',
    url: 'https://uploadstatic.mihoyo.com/bh3-wiki/2022/03/24/50494840/309340fc2bf6a5bd33c218df8a0af791_3234259626592406538.png',
    natures: ['电脑壁纸'],
    tags: ['崩坏三']
  },

  {
    id: '0028',
    name: '雷电芽衣 夜雨春澜',
    url: 'https://uploadstatic.mihoyo.com/bh3-wiki/2022/04/13/75216984/cd468f66bb8b0d559428d42334b0d361_1638234829845120376.png',
    natures: ['电脑壁纸'],
    tags: ['崩坏三']
  },
  {
    id: '0030',
    name: '布朗尼',
    url: 'https://uploadstatic.mihoyo.com/bh3-wiki/2022/03/24/50494840/c4ee42e05335c7b22da441f9b2c6a039_7841648679082509520.png',
    natures: ['电脑壁纸'],
    tags: ['崩坏三']
  },
  {
    id: '0033',
    name: '月下誓约·予爱以心',
    url: 'https://act-upload.mihoyo.com/bh3-wiki/2023/09/30/75216984/38f7bf650fdc5a831e956141b999b7c0_3875900278476422615.png',
    natures: ['电脑壁纸'],
    tags: ['崩坏三']
  },
  {
    id: '0037',
    name: '月下初拥',
    url: 'https://uploadstatic.mihoyo.com/bh3-wiki/2022/03/24/50494840/bd339e528134c7ff794433a4e3c3c8de_3553430119473893434.jpg',
    natures: ['电脑壁纸'],
    tags: ['崩坏三']
  },
  {
    id: '0043',
    name: '幽兰黛尔 尼伯龙根梦歌',
    url: 'https://uploadstatic.mihoyo.com/bh3-wiki/2022/10/06/75216984/17a275753fa01c1ac8034be8a2ee2486_3433886009370952153.jpg',
    natures: ['电脑壁纸'],
    tags: ['崩坏三']
  },
  {
    id: '0045',
    name: '爱莉希雅 嗨♪爱愿妖精♥',
    url: 'https://act-upload.mihoyo.com/bh3-wiki/2025/09/26/50494840/688e538e400f66b0abfdcfaa84061656_2035245401418284595.png',
    natures: ['电脑壁纸'],
    tags: ['崩坏三']
  },
  {
    id: '0046',
    name: '梅比乌斯 噬界之蛇',
    url: 'https://uploadstatic.mihoyo.com/bh3-wiki/2022/10/25/75216984/6a579e7e52f819d3a3407e1b2ee61978_1774155618637568012.jpg',
    natures: ['电脑壁纸'],
    tags: ['崩坏三']
  },
  {
    id: '0050',
    name: '渡鸦 午夜马天尼',
    url: 'https://uploadstatic.mihoyo.com/bh3-wiki/2022/06/20/50494840/5d6bbcbe8caa9536b23bbd8dd2394163_88213556508918288.png',
    natures: ['电脑壁纸'],
    tags: ['崩坏三']
  },
  {
    id: '0051',
    name: '卡萝尔·佩珀 生日贺图',
    url: 'https://uploadstatic.mihoyo.com/bh3-wiki/2022/09/23/75216984/1e9b548eddd007e3a0fb1988360116df_7300319782459651464.jpg',
    natures: ['电脑壁纸'],
    tags: ['崩坏三']
  },
  {
    id: '0052',
    name: '卡萝尔·佩珀 咪啾特调',
    url: 'https://uploadstatic.mihoyo.com/bh3-wiki/2022/11/03/75216984/9bf86897b52737a7ad5d2cd8884d43f0_6172890514653177680.png',
    natures: ['电脑壁纸'],
    tags: ['崩坏三']
  },
  {
    id: '0053',
    name: '帕朵菲利丝 帕朵的课堂',
    url: 'https://uploadstatic.mihoyo.com/bh3-wiki/2022/03/23/73514954/86eee28bb3cbf409c9c049b26087966c_8468249647549872367.png',
    natures: ['电脑壁纸'],
    tags: ['崩坏三']
  },
  {
    id: '0054',
    name: '帕朵菲利丝 掠集之兽',
    url: 'https://uploadstatic.mihoyo.com/bh3-wiki/2022/03/23/73514954/10600321ea0499f89855b80e38faf41a_724530368834017905.png',
    natures: ['电脑壁纸'],
    tags: ['崩坏三']
  },
  {
    id: '0060',
    name: '格蕾修 绘星之卷',
    url: 'https://act-upload.mihoyo.com/bh3-wiki/2023/11/11/75216984/eceb97c8b9980f4dc42df1b0be7c671c_7534948743872819823.png',
    natures: ['电脑壁纸'],
    tags: ['崩坏三']
  },
  {
    id: '0061',
    name: '李素裳 一客逍遥',
    url: 'https://act-upload.mihoyo.com/bh3-wiki/2025/03/30/75216984/9c2139c8a978e08a3a9b9d38d57f647f_7190247344984673511.png',
    natures: ['电脑壁纸'],
    tags: ['崩坏三']
  },
  {
    id: '0063',
    name: '爱衣·休伯利安Λ 时帆旅人',
    url: 'https://uploadstatic.mihoyo.com/bh3-wiki/2022/11/14/75216984/e8b6fd88b31841ffbd27ebe1d44b2646_8664982411572816053.png',
    natures: ['电脑壁纸'],
    tags: ['崩坏三']
  },
  {
    id: '0064',
    name: '琪亚娜·卡斯兰娜 爱衣·休伯利安Λ 普罗米亚联动',
    url: 'https://act-upload.mihoyo.com/bh3-wiki/2023/08/25/75216984/a869ce353bfb07a901c74c5fecb3dcdf_4927353605725003868.png',
    natures: ['电脑壁纸'],
    tags: ['崩坏三']
  },
  {
    id: '0067',
    name: '时雨绮罗 糖露星霜',
    url: 'https://act-upload.mihoyo.com/bh3-wiki/2023/06/02/75216984/2df144a9293df8f8d7c2437f17b7b009_3094283295652968010.png',
    natures: ['电脑壁纸'],
    tags: ['崩坏三']
  },
  {
    id: '0070',
    name: '瑟莉姆 享乐狂宴·邀影',
    url: 'https://act-upload.mihoyo.com/bh3-wiki/2024/04/09/75216984/a540b596720fdee5690500bc33a4368b_2250665392384858577.png',
    natures: ['电脑壁纸'],
    tags: ['崩坏三']
  },
  {
    id: '0072',
    name: '松雀 瞒天乐游·曙影',
    url: 'https://act-upload.mihoyo.com/bh3-wiki/2024/07/01/75216984/0184ed0ba276fbc416b1469dfbb3aaba_8407125196275573194.png',
    natures: ['电脑壁纸'],
    tags: ['崩坏三']
  },
  {
    id: '0073',
    name: '薇塔 孑遗千星',
    url: 'https://act-upload.mihoyo.com/bh3-wiki/2024/09/22/75216984/16de7766a642388d21e4c76cacfde801_5165224128247218265.png',
    natures: ['电脑壁纸'],
    tags: ['崩坏三']
  },
  {
    id: '0076',
    name: '安比·德玛拉',
    url: 'https://image-assets.soutushenqi.com/UserUploadWallpaper_upload/1744783082003.jpg',
    natures: ['电脑壁纸'],
    tags: ['绝区零']
  },
  {
    id: '0077',
    name: '安比·德玛拉',
    url: 'https://image-assets.soutushenqi.com/UserUploadWallpaper_upload/1744783065114.jpg',
    natures: ['电脑壁纸'],
    tags: ['绝区零']
  },
  {
    id: '0078',
    name: '苍角',
    url: 'https://gd-hbimg.huaban.com/86ef9c1b3366e8929db52bffb1a6ee75044c8db13c9e55-725b1h',
    natures: ['电脑壁纸'],
    tags: ['绝区零']
  },
  {
    id: '0079',
    name: '妮可·德玛拉',
    url: 'https://gd-hbimg.huaban.com/595524dcce278f81fb9a950126db54e94fbebc2215d3b7-uwD5oy',
    natures: ['电脑壁纸'],
    tags: ['绝区零']
  },
  {
    id: '0080',
    name: '妮可·德玛拉',
    url: 'https://gd-hbimg.huaban.com/480f7e822b64d33c7c04e1febd95a0be6ff5204d80cd75-Tit6BF',
    natures: ['电脑壁纸'],
    tags: ['绝区零']
  },
  {
    id: '0082',
    name: '可琳·威克斯',
    url: 'https://gd-hbimg.huaban.com/19ab42cd797ad0a321ef051a348e4fc274d113282aa9b0-zhcCPI',
    natures: ['电脑壁纸'],
    tags: ['绝区零']
  },
  {
    id: '0083',
    name: '艾莲·乔',
    url: 'https://gd-hbimg.huaban.com/f4ca609a62a2473e302dd831833b24fd7bedb9e960e36f-Low5WD',
    natures: ['电脑壁纸'],
    tags: ['绝区零']
  },
  {
    id: '0084',
    name: '维多利亚家政',
    url: 'https://gd-hbimg.huaban.com/ae87f2b1f5f2824070dcc4392b2b46fe72e0d72311bf52-WuFf7A',
    natures: ['电脑壁纸'],
    tags: ['绝区零']
  },
  {
    id: '0085',
    name: '狡兔屋',
    url: 'https://image-assets.soutushenqi.com/UserUploadWallpaper_upload/1744782913254.jpg',
    natures: ['电脑壁纸'],
    tags: ['绝区零']
  },
  {
    id: '0086',
    name: '狡兔屋',
    url: 'https://b0.bdstatic.com/ugc/f02T0Fi9IE-W_P0IOt6oswf75eea195f522daac47e668af94079c4.jpg',
    natures: ['电脑壁纸'],
    tags: ['绝区零']
  },
  {
    id: '0087',
    name: '白祇重工',
    url: 'https://img.71acg.net/sykb~bbs/default/20240329/1434102927681',
    natures: ['电脑壁纸'],
    tags: ['绝区零']
  },
  {
    id: '0088',
    name: '卡吕冬之子',
    url: 'https://i1.hdslb.com/bfs/archive/37a39991c0319d98b014738f63533889d0dbfa5f.jpg',
    natures: ['电脑壁纸'],
    tags: ['绝区零']
  },
  {
    id: '0089',
    name: '刑侦特勤组',
    url: 'https://i1.hdslb.com/bfs/archive/654e3dc4d14df7d6981e1a914945a075f0278633.jpg',
    natures: ['电脑壁纸'],
    tags: ['绝区零']
  },
  {
    id: '0090',
    name: '对空六课',
    url: 'https://gd-hbimg.huaban.com/f1961af6da294e25b3418d553c892a054fe95c4d105ff4-FfSJdo',
    natures: ['电脑壁纸'],
    tags: ['绝区零']
  },
  {
    id: '0091',
    name: '月城柳',
    url: 'https://t14.baidu.com/it/u=3489442569,2641646999&fm=225&app=113&f=JPEG?w=3840&h=2160&s=92B43088864142EC523A67CA0300709E',
    natures: ['电脑壁纸'],
    tags: ['绝区零']
  },
  {
    id: '0092',
    name: '天琴座',
    url: 'https://image-assets.soutushenqi.com/UserUploadWallpaper_upload/1744987982540.jpg',
    natures: ['电脑壁纸'],
    tags: ['绝区零']
  },
  {
    id: '0093',
    name: '奥波勒斯小队',
    url: 'https://i1.hdslb.com/bfs/archive/9e4c80716ea07da46857d00da9c4bb5696c1b00c.jpg',
    natures: ['电脑壁纸'],
    tags: ['绝区零']
  },
  {
    id: '0094',
    name: '仪玄',
    url: 'https://image-assets.soutushenqi.com/UserUploadWallpaper_upload/1748955763093.jpg',
    natures: ['电脑壁纸'],
    tags: ['绝区零']
  },
  {
    id: '0095',
    name: '橘福福',
    url: 'https://i0.hdslb.com/bfs/archive/9bc635263228b7554ed0267c7a75b3c4d7d43351.jpg',
    natures: ['电脑壁纸'],
    tags: ['绝区零']
  },
  {
    id: '0096',
    name: '云岿山',
    url: 'https://image-assets.soutushenqi.com/UserUploadWallpaper_upload/1751274578928.jpg',
    natures: ['电脑壁纸'],
    tags: ['绝区零']
  },
  {
    id: '0097',
    name: '浮波柚叶 爱丽丝·泰姆菲尔德',
    url: 'https://image-assets.soutushenqi.com/UserUploadWallpaper_upload/1755697421638.jpg',
    natures: ['电脑壁纸'],
    tags: ['绝区零']
  },
  {
    id: '0098',
    name: '浮波柚叶 爱丽丝·泰姆菲尔德',
    url: 'https://gd-hbimg.huaban.com/f1577de23c1a20f8e7b2551e81473a7a0a47782c326ed0-19D3fO',
    natures: ['电脑壁纸'],
    tags: ['绝区零']
  },
  {
    id: '0099',
    name: '浮波柚叶 爱丽丝·泰姆菲尔德',
    url: 'https://image-assets.soutushenqi.com/UserUploadWallpaper_upload/1755697433888.jpg',
    natures: ['电脑壁纸'],
    tags: ['绝区零']
  },
  {
    id: '0100',
    name: '怪啖屋',
    url: 'https://img2.huashi6.com/images/resource/thumbnail/2025/12/17/151459_69988548325.jpg?imageMogr2/quality/100/interlace/1/thumbnail/2000x%3E|watermark/2/text/6Kem56uZQOWFlOeOluS6jOS4gw/gravity/South/fill/I2ZmZmZmZg/fontsize/400/font/5b6u6L2v6ZuF6buR/dy/20',
    natures: ['电脑壁纸'],
    tags: ['绝区零']
  },
  {
    id: '0101',
    name: '「席德」',
    url: 'https://image-assets.soutushenqi.com/UserUploadWallpaper_upload/1757679222645.jpeg',
    natures: ['电脑壁纸'],
    tags: ['绝区零']
  },
  {
    id: '0104',
    name: '坎卜斯黑枝',
    url: 'https://i1.hdslb.com/bfs/archive/60b3e5172ece9538f1525f1fca382498547a9ab6.jpg',
    natures: ['电脑壁纸'],
    tags: ['绝区零']
  },
  {
    id: '0105',
    name: '琉音',
    url: 'https://assets-hs-cdn.soutushenqi.com/ai_images/279da5bc-56dd-4986-95b5-f2059cd0fabe.png',
    natures: ['电脑壁纸'],
    tags: ['绝区零']
  },
  {
    id: '0106',
    name: '叶瞬光',
    url: 'https://i2.hdslb.com/bfs/archive/98accdb5e1ee7b475dc359dbc462f1225b8a4f46.jpg',
    natures: ['电脑壁纸'],
    tags: ['绝区零']
  },
  {
    id: '0107',
    name: '妄想天使',
    url: 'https://i0.hdslb.com/bfs/archive/ef88aadeab61b501a5569cde9bdc150a5c58b52d.jpg',
    natures: ['电脑壁纸'],
    tags: ['绝区零']
  },
  {
    id: '0108',
    name: '妄想天使',
    url: 'https://i2.hdslb.com/bfs/archive/8c1d4a13237a0b1e1da8af156e68e2511cfb366b.jpg',
    natures: ['电脑壁纸'],
    tags: ['绝区零']
  },
  {
    id: '0110',
    name: '妄想天使',
    url: 'https://i1.hdslb.com/bfs/archive/f2f729fc092846c3b0f9a05c85aabe58638c0cbe.jpg',
    natures: ['电脑壁纸'],
    tags: ['绝区零']
  },
  {
    id: '0112',
    name: '妄想天使',
    url: 'https://i2.hdslb.com/bfs/archive/ccf63bd7cdf815aff2b61e7095ad23046a80313a.jpg',
    natures: ['电脑壁纸'],
    tags: ['绝区零']
  },
  {
    id: '0113',
    name: '奥菲丝&「鬼火」',
    url: 'https://i0.hdslb.com/bfs/archive/8def7be3b8a8d95b59eaac810340a1ae3b83d418.jpg',
    natures: ['电脑壁纸'],
    tags: ['绝区零']
  },
  {
    id: '0114',
    name: '三月七',
    url: 'https://gd-hbimg.huaban.com/dd41018a2bb0f88c03644bfc17ee214f3f42736ad323e9-2aTHQL',
    natures: ['电脑壁纸'],
    tags: ['崩坏：星穹铁道']
  },
  {
    id: '0115',
    name: '三月七',
    url: 'https://c-ssl.duitang.com/uploads/blog/202408/05/EWSM54x3fVMVzdj.png',
    natures: ['电脑壁纸'],
    tags: ['崩坏：星穹铁道']
  },
  {
    id: '0116',
    name: '列车组',
    url: 'https://gd-hbimg.huaban.com/3f97dfd22e9916347edd45b73d4433f321d7daea10a0de-4DTiAX',
    natures: ['电脑壁纸'],
    tags: ['崩坏：星穹铁道']
  },
  {
    id: '0117',
    name: '列车组',
    url: 'https://gd-hbimg.huaban.com/392677a720f1658de3bdbf0f63ad97bd004c40b11252bb-hIROmk',
    natures: ['电脑壁纸'],
    tags: ['崩坏：星穹铁道']
  },
  {
    id: '0118',
    name: '艾丝妲',
    url: 'https://c-ssl.duitang.com/uploads/blog/202309/14/YxSX3BAYUqyx1y7.jpeg',
    natures: ['电脑壁纸'],
    tags: ['崩坏：星穹铁道']
  },
  {
    id: '0119',
    name: '黑塔',
    url: 'https://gd-hbimg.huaban.com/a3f334b0197c70536e2ad35247305d7a380e8d624bff10-CKVczt',
    natures: ['电脑壁纸'],
    tags: ['崩坏：星穹铁道']
  },
  {
    id: '0120',
    name: '大黑塔',
    url: 'https://c-ssl.duitang.com/uploads/blog/202503/08/n6SXgVaoF9oQzV5.png',
    natures: ['电脑壁纸'],
    tags: ['崩坏：星穹铁道']
  },
  {
    id: '0121',
    name: '黑塔',
    url: 'https://c-ssl.duitang.com/uploads/blog/202305/04/20230504191806_d3821.jpeg',
    natures: ['电脑壁纸'],
    tags: ['崩坏：星穹铁道']
  },
  {
    id: '0122',
    name: '希露瓦',
    url: 'https://img-baofun.zhhainiao.com/pcwallpaper_ugc_mobile/static/53fedff123887fc8a197dfa1a2a3c151.jpg?x-oss-process=image%2fresize%2cm_lfit%2cw_3840%2ch_2160',
    natures: ['电脑壁纸'],
    tags: ['崩坏：星穹铁道']
  },
  {
    id: '0123',
    name: '佩拉',
    url: 'https://gd-hbimg.huaban.com/b3611ec9c4482f3e309f5c688318cf71a236a8ba308633-IKc50R',
    natures: ['电脑壁纸'],
    tags: ['崩坏：星穹铁道']
  },
  {
    id: '0124',
    name: '佩拉',
    url: 'https://gd-hbimg.huaban.com/bd0b525765fe495b9365ccc4b927b0a8df063c042be2dc-KS76ms',
    natures: ['电脑壁纸'],
    tags: ['崩坏：星穹铁道']
  },
  {
    id: '0125',
    name: '青雀',
    url: 'https://image-assets.soutushenqi.com/UserUploadWallpaper_upload/1754933349826.jpg',
    natures: ['电脑壁纸'],
    tags: ['崩坏：星穹铁道']
  },
  {
    id: '0126',
    name: '停云',
    url: 'https://image-assets.soutushenqi.com/UserUploadWallpaper_upload/1735208067428.png',
    natures: ['电脑壁纸'],
    tags: ['崩坏：星穹铁道']
  },
  {
    id: '0127',
    name: '托帕',
    url: 'https://gd-hbimg.huaban.com/cf93cd1d8dd8196311f3b0270ad71e3748a71f64fe1cb-78P7Pg',
    natures: ['电脑壁纸'],
    tags: ['崩坏：星穹铁道']
  },
  {
    id: '0128',
    name: '流萤&知更鸟',
    url: 'https://image-assets.soutushenqi.com/UserUploadWallpaper_upload/1741483506682.jpg',
    natures: ['电脑壁纸'],
    tags: ['崩坏：星穹铁道']
  },
  {
    id: '0129',
    name: '知更鸟',
    url: 'https://i0.hdslb.com/bfs/article/d5aeae3990e9a37c5ef677815fda1e68286431045.jpg',
    natures: ['电脑壁纸'],
    tags: ['崩坏：星穹铁道']
  },
  {
    id: '0130',
    name: '知更鸟',
    url: 'https://image-assets.soutushenqi.com/moment/1731034570118.jpeg',
    natures: ['电脑壁纸'],
    tags: ['崩坏：星穹铁道']
  },
  {
    id: '0131',
    name: '云璃',
    url: 'https://gd-hbimg.huaban.com/f0149eddcdbf6b24f4626817875d90463e9f6111a7a92d-QmTy8f',
    natures: ['电脑壁纸'],
    tags: ['崩坏：星穹铁道']
  },
  {
    id: '0132',
    name: '黄泉',
    url: 'https://i1.hdslb.com/bfs/archive/57b77ba476167cd655555be5bd34d692377fb916.jpg',
    natures: ['电脑壁纸'],
    tags: ['崩坏：星穹铁道']
  },
  {
    id: '0133',
    name: '黄泉',
    url: 'https://gd-hbimg.huaban.com/845e8703935cd75dde3e855f9367dc02b2adc0d3c4b7fc-QzHXqY',
    natures: ['电脑壁纸'],
    tags: ['崩坏：星穹铁道']
  },
  {
    id: '0134',
    name: '银狼',
    url: 'https://i1.hdslb.com/bfs/archive/deddf3adad2b57cee6e6a9db5ddbb189559eb759.jpg',
    natures: ['电脑壁纸'],
    tags: ['崩坏：星穹铁道']
  },
  {
    id: '0135',
    name: '赛飞儿',
    url: 'https://image-assets.soutushenqi.com/UserUploadWallpaper_upload/1755339224422.png',
    natures: ['电脑壁纸'],
    tags: ['崩坏：星穹铁道']
  },
  {
    id: '0136',
    name: '昔涟',
    url: 'https://gd-hbimg.huabanimg.com/a900e252c0264e8c2bc16b1f90aff6e3231525b8a378bd-iWT8Hp',
    natures: ['电脑壁纸'],
    tags: ['崩坏：星穹铁道']
  },
  {
    id: '0137',
    name: '昔涟',
    url: 'https://gd-hbimg.huaban.com/87c6f52e440e8f198197431692429968c41c8069bbdfae-KYZBek',
    natures: ['电脑壁纸'],
    tags: ['崩坏：星穹铁道']
  },
  {
    id: '0138',
    name: '长夜月',
    url: 'https://gd-hbimg.huaban.com/6be01678868ea348c6565815b09833b8c42468c67662ba-woCs1U',
    natures: ['电脑壁纸'],
    tags: ['崩坏：星穹铁道']
  },
  {
    id: '0139',
    name: '花火',
    url: 'https://gd-hbimg.huaban.com/cbdd07e453519408aa0f0d0382ecca630ed8101d595edb-qzqVzI',
    natures: ['电脑壁纸'],
    tags: ['崩坏：星穹铁道']
  },
  {
    id: '0140',
    name: '长夜月',
    url: 'https://assets-hs-cdn.soutushenqi.com/ai_images/d85997cb-cc13-4bec-9cb9-3ed6bd1de059.png',
    natures: ['电脑壁纸'],
    tags: ['崩坏：星穹铁道']
  },
  {
    id: '0141',
    name: '流萤&遐蝶',
    url: 'https://image-assets.soutushenqi.com/UserUploadWallpaper_upload/1748677436724.jpg',
    natures: ['电脑壁纸'],
    tags: ['崩坏：星穹铁道']
  },
  {
    id: '0142',
    name: '遐蝶',
    url: 'https://image-assets.soutushenqi.com/UserUploadWallpaper_upload/1737391090173.png',
    natures: ['电脑壁纸'],
    tags: ['崩坏：星穹铁道']
  },
  {
    id: '0143',
    name: '飞霄',
    url: 'https://gd-hbimg.huaban.com/bdbd6f5f331ddd0af2b999a4da35c481012a567f64d102-DnUi8i',
    natures: ['电脑壁纸'],
    tags: ['崩坏：星穹铁道']
  },
  {
    id: '0144',
    name: '爻光',
    url: 'https://i1.hdslb.com/bfs/archive/78e8a097a2158c3efb26fa6010f5aabd5544364d.jpg',
    natures: ['电脑壁纸'],
    tags: ['崩坏：星穹铁道']
  }
];

const PICTURE_TAG_NONE = '暂无';

const pictureFilterState = {
  nature: PICTURE_NATURES[0],
  tag: PICTURE_TAG_NONE
};

function isPictureVideo(picture) {
  return /\.mp4(\?|$)/i.test(String(picture && picture.url));
}

function getPictureNatures(picture) {
  if (!picture || !Array.isArray(picture.natures)) return [];
  return picture.natures.map((item) => String(item).trim()).filter(Boolean);
}

function getPictureTags(picture) {
  if (!picture || !Array.isArray(picture.tags)) return [];
  return picture.tags.map((item) => String(item).trim()).filter(Boolean);
}

function getPictureName(picture) {
  const name = picture && picture.name;
  if (!name || String(name).trim() === '' || name === '暂无') return '暂无';
  return String(name).trim();
}

function comparePictureLabel(a, b) {
  return String(a).localeCompare(String(b), 'zh-CN');
}

function getPicturesByNature(nature) {
  return PICTURES.filter((picture) => getPictureNatures(picture).includes(nature));
}

function getValidPictures(list) {
  return list.filter((picture) => String(picture.url || '').trim());
}

function countPicturesByNature(nature) {
  return getValidPictures(getPicturesByNature(nature)).length;
}

function countPicturesByTag(nature, tag) {
  const pool = getValidPictures(getPicturesByNature(nature));
  if (tag === PICTURE_TAG_NONE) return pool.length;
  return pool.filter((picture) => getPictureTags(picture).includes(tag)).length;
}

function getSecondaryTagsForNature(nature) {
  return getSortedSecondaryTags(getValidPictures(getPicturesByNature(nature)));
}

function getDefaultTagForNature(nature) {
  const tags = getSecondaryTagsForNature(nature);
  return tags.length ? tags[0] : PICTURE_TAG_NONE;
}

function normalizePictureTag(nature, tag) {
  const tags = getSecondaryTagsForNature(nature);
  if (!tags.length) return PICTURE_TAG_NONE;
  if (tag === PICTURE_TAG_NONE || !tags.includes(tag)) return tags[0];
  return tag;
}

function getTagCounts(pictures) {
  const counts = new Map();
  pictures.forEach((picture) => {
    getPictureTags(picture).forEach((tag) => {
      counts.set(tag, (counts.get(tag) || 0) + 1);
    });
  });
  return counts;
}

function getSortedSecondaryTags(pictures) {
  const counts = getTagCounts(pictures);
  return [...counts.keys()].sort((a, b) => {
    const countDiff = (counts.get(b) || 0) - (counts.get(a) || 0);
    if (countDiff !== 0) return countDiff;
    return comparePictureLabel(a, b);
  });
}

function getSortedPictures(list) {
  return [...list].sort((a, b) => AppCommon.compareByName(getPictureName(a), getPictureName(b)));
}

function getFilteredPictures() {
  const pool = getValidPictures(getPicturesByNature(pictureFilterState.nature));
  const filtered = pictureFilterState.tag === PICTURE_TAG_NONE
    ? pool
    : pool.filter((picture) => getPictureTags(picture).includes(pictureFilterState.tag));
  return getSortedPictures(filtered);
}

function createPictureFilterButton(label, count, isActive, onClick) {
  const button = document.createElement('button');
  button.type = 'button';
  button.className = 'picture-filter-btn ui-interactive' + (isActive ? ' is-active' : '');
  button.textContent = label + ' (' + count + ')';
  button.addEventListener('click', onClick);
  return button;
}

function renderPicturePrimaryFilters(container) {
  container.innerHTML = '';
  PICTURE_NATURES.forEach((nature) => {
    container.appendChild(createPictureFilterButton(
      nature,
      countPicturesByNature(nature),
      pictureFilterState.nature === nature,
      () => {
        if (pictureFilterState.nature === nature) return;
        pictureFilterState.nature = nature;
        pictureFilterState.tag = getDefaultTagForNature(nature);
        refreshPictureModule();
      }
    ));
  });
}

function renderPictureSecondaryFilters(container) {
  container.hidden = false;
  container.innerHTML = '';

  const tags = getSecondaryTagsForNature(pictureFilterState.nature);
  pictureFilterState.tag = normalizePictureTag(pictureFilterState.nature, pictureFilterState.tag);
  const options = tags.length ? tags : [PICTURE_TAG_NONE];

  options.forEach((tag) => {
    container.appendChild(createPictureFilterButton(
      tag,
      countPicturesByTag(pictureFilterState.nature, tag),
      pictureFilterState.tag === tag,
      () => {
        if (pictureFilterState.tag === tag) return;
        pictureFilterState.tag = tag;
        renderPictureSecondaryFilters(container);
        refreshPictureGrid();
      }
    ));
  });
}

function openPicturePreview(picture) {
  AppCommon.openMediaPreview(picture.url, isPictureVideo(picture));
}

function createPictureItem(picture) {
  const item = document.createElement('article');
  item.className = 'picture-item';
  const pictureName = getPictureName(picture);

  const frame = document.createElement('button');
  frame.type = 'button';
  frame.className = 'picture-item-frame ui-interactive';
  frame.setAttribute('aria-label', '查看图片：' + pictureName);

  if (isPictureVideo(picture)) {
    const video = document.createElement('video');
    video.className = 'picture-item-media';
    video.src = picture.url;
    video.muted = true;
    video.loop = true;
    video.autoplay = true;
    video.playsInline = true;
    video.preload = 'metadata';
    frame.appendChild(video);
  } else {
    const img = document.createElement('img');
    img.className = 'picture-item-media';
    img.src = picture.url;
    img.alt = '';
    img.loading = 'lazy';
    img.decoding = 'async';
    frame.appendChild(img);
  }

  frame.addEventListener('click', () => openPicturePreview(picture));

  const nameEl = document.createElement('p');
  nameEl.className = 'picture-item-name';
  nameEl.textContent = pictureName;
  nameEl.title = pictureName;

  item.appendChild(frame);
  item.appendChild(nameEl);
  return item;
}

function getPictureColumnCount(container) {
  const value = getComputedStyle(container).getPropertyValue('--picture-cols').trim();
  const count = parseInt(value, 10);
  return Number.isFinite(count) && count > 0 ? count : 5;
}

function pickMasonryColumn(columns, index, colCount, balanced) {
  if (balanced) return index % colCount;
  const maxHeight = Math.max(...columns.map((col) => col.offsetHeight));
  if (maxHeight <= 0) return index % colCount;
  let target = 0;
  for (let i = 1; i < columns.length; i++) {
    if (columns[i].offsetHeight < columns[target].offsetHeight) target = i;
  }
  return target;
}

function layoutPictureMasonry(container, items, balanced) {
  const colCount = getPictureColumnCount(container);
  container.innerHTML = '';

  const columns = Array.from({ length: colCount }, () => {
    const col = document.createElement('div');
    col.className = 'picture-grid-column';
    container.appendChild(col);
    return col;
  });

  items.forEach((item, index) => {
    columns[pickMasonryColumn(columns, index, colCount, balanced)].appendChild(item);
  });
}

let pictureMasonryFrame = null;
function schedulePictureMasonry(container, balanced) {
  if (!container || !container._masonryItems || !container._masonryItems.length) return;
  if (pictureMasonryFrame) cancelAnimationFrame(pictureMasonryFrame);
  pictureMasonryFrame = requestAnimationFrame(() => {
    pictureMasonryFrame = requestAnimationFrame(() => {
      pictureMasonryFrame = null;
      if (!container._masonryItems || !container._masonryItems.length) return;
      layoutPictureMasonry(container, container._masonryItems, !!balanced);
    });
  });
}

function queuePictureMasonryRelayout(container) {
  if (!container) return;
  if (container._masonryRelayoutQueued) return;
  container._masonryRelayoutQueued = true;
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      container._masonryRelayoutQueued = false;
      schedulePictureMasonry(container, false);
    });
  });
}

function bindPictureMasonryMedia(item, container) {
  const media = item.querySelector('.picture-item-media');
  if (!media) return;
  const relayout = () => queuePictureMasonryRelayout(container);
  if (media.tagName === 'IMG') {
    if (media.complete) relayout();
    else media.addEventListener('load', relayout, { once: true });
    media.addEventListener('error', relayout, { once: true });
  } else {
    media.addEventListener('loadeddata', relayout, { once: true });
    media.addEventListener('loadedmetadata', relayout, { once: true });
    media.addEventListener('error', relayout, { once: true });
  }
}

function renderPictureGrid(container) {
  const pictures = getFilteredPictures();
  container.innerHTML = '';
  container._masonryItems = null;

  if (!pictures.length) {
    container.innerHTML = '<p class="picture-empty">暂无图片</p>';
    return;
  }

  const items = pictures.map((picture) => createPictureItem(picture));
  container._masonryItems = items;
  items.forEach((item) => bindPictureMasonryMedia(item, container));
  layoutPictureMasonry(container, items, true);
  queuePictureMasonryRelayout(container);
}

function refreshPictureGrid() {
  const gridEl = document.getElementById('picture-grid');
  if (gridEl) renderPictureGrid(gridEl);
}

function refreshPictureModule() {
  const primaryEl = document.getElementById('picture-filter-primary');
  const secondaryEl = document.getElementById('picture-filter-secondary');
  const gridEl = document.getElementById('picture-grid');
  if (primaryEl) renderPicturePrimaryFilters(primaryEl);
  if (secondaryEl) renderPictureSecondaryFilters(secondaryEl);
  if (gridEl) renderPictureGrid(gridEl);
}

function initPictureMasonryObservers(gridEl) {
  if (!gridEl || gridEl.dataset.masonryObserversBound) return;
  gridEl.dataset.masonryObserversBound = 'true';

  const relayout = () => queuePictureMasonryRelayout(gridEl);
  window.addEventListener('resize', relayout);

  if (typeof ResizeObserver !== 'undefined') {
    new ResizeObserver(relayout).observe(gridEl);
  }

  document.querySelectorAll('.nav-btn[data-section="images"]').forEach((btn) => {
    btn.addEventListener('click', () => {
      requestAnimationFrame(() => queuePictureMasonryRelayout(gridEl));
    });
  });
}

let pictureModuleReady = false;

function initPictureModule() {
  if (pictureModuleReady) {
    refreshPictureModule();
    queuePictureMasonryRelayout(document.getElementById('picture-grid'));
    return;
  }

  const gridEl = document.getElementById('picture-grid');
  initPictureMasonryObservers(gridEl);

  pictureFilterState.nature = PICTURE_NATURES[0];
  pictureFilterState.tag = getDefaultTagForNature(pictureFilterState.nature);
  refreshPictureModule();
  pictureModuleReady = true;
}

window.PictureModule = { init: initPictureModule };
