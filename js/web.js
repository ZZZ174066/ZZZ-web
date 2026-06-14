const WEB_CATEGORIES = [
  { id: 'study', label: '学习工作' },
  { id: 'tools', label: '实用工具' },
  { id: 'game', label: '游戏娱乐' }
];

const WEBSITES = [
  {
    id: '0001',
    name: '西南交大办事大厅',
    category: '学习工作',
    description: '通往西南交大各种网站',
    url: 'https://cas.swjtu.edu.cn/',
    icon: 'files/web/交大教务网.jpg'
  },
  {
    id: '0002',
    name: 'DeepSeek',
    category: '学习工作',
    description: '与DeepSeek进行对话',
    url: 'https://chat.deepseek.com/',
    icon: 'files/web/DeepSeek.jpg'
  },
  {
    id: '0003',
    name: 'Kimi',
    category: '学习工作',
    description: '与Kimi对话，制作PPT',
    url: 'https://www.kimi.com/',
    icon: 'files/web/kimi.jpg'
  },
  {
    id: '0004',
    name: 'U校园',
    category: '学习工作',
    description: '在线学习英语',
    url: 'https://u.unipus.cn/',
    icon: 'files/web/U校园.jpg'
  },
  {
    id: '0005',
    name: '智慧树',
    category: '学习工作',
    description: '学分课程运营服务平台',
    url: 'https://www.zhihuishu.com/',
    icon: 'files/web/智慧树.jpg'
  },
  {
    id: '0006',
    name: '中国大学MOOC',
    category: '学习工作',
    description: '在线网课学习平台',
    url: 'https://www.icourse163.org/',
    icon: 'files/web/慕课.jpg'
  },
  {
    id: '0007',
    name: '学信网',
    category: '学习工作',
    description: '学籍/学位在线验证',
    url: 'https://www.chsi.com.cn/',
    icon: 'files/web/学信网.jpg'
  },
  {
    id: '0008',
    name: '维普资讯（维普网）',
    category: '学习工作',
    description: '论文查重，查AIGC',
    url: 'https://www.cqvip.com/',
    icon: 'files/web/维普网.jpg'
  },
  {
    id: '0009',
    name: '中国知网',
    category: '学习工作',
    description: '论文查找，论文查重',
    url: 'https://www.cnki.net/',
    icon: 'files/web/知网.jpg'
  },
  {
    id: '0010',
    name: 'GeoGebra',
    category: '学习工作',
    description: '坐标绘图，3D绘图等',
    url: 'https://www.geogebra.org/',
    icon: 'files/web/数学绘图.jpg'
  },
  {
    id: '0011',
    name: '懒人办公',
    category: '学习工作',
    description: '进行各种PDF相关操作',
    url: 'https://www.lanren.work/pdf/',
    icon: 'files/web/懒人办公.jpg'
  },
  {
    id: '0012',
    name: 'CSDN',
    category: '学习工作',
    description: '专业开发者社区',
    url: 'https://www.csdn.net/',
    icon: 'files/web/CSDN.jpg'
  },
  {
    id: '0013',
    name: 'GitHub',
    category: '实用工具',
    description: '软件源代码托管服务平台',
    url: 'https://github.com/',
    icon: 'files/web/github.jpg'
  },
  {
    id: '0014',
    name: '博思白板',
    category: '实用工具',
    description: '软件工程相关图绘制',
    url: 'https://boardmix.cn/',
    icon: 'files/web/博思白板.jpg'
  },
  {
    id: '0015',
    name: '阿里巴巴矢量图标库',
    category: '实用工具',
    description: '下载各种矢量图标',
    url: 'https://www.iconfont.cn/',
    icon: 'files/web/矢量图标库.jpg'
  },
  {
    id: '0016',
    name: 'Element Plus',
    category: '实用工具',
    description: '基于Vue3的组件库',
    url: 'https://element-plus.org/zh-CN/',
    icon: 'files/web/Element组件.jpg'
  },
  {
    id: '0017',
    name: '123APPS',
    category: '实用工具',
    description: '提供多种文件编辑操作',
    url: 'https://online-audio-converter.com/cn/#',
    icon: 'files/web/音频转换器.jpg'
  },
  {
    id: '0018',
    name: '蓝胖云',
    category: '实用工具',
    description: 'Clash Verge续费',
    url: 'https://e23.lanpangyun.me/',
    icon: 'files/web/蓝胖云.jpg'
  },
  {
    id: '0019',
    name: '爱发电',
    category: '实用工具',
    description: '创作者粉丝赞助平台',
    url: 'https://afdian.com/',
    icon: 'files/web/爱发电.jpg'
  },
  {
    id: '0020',
    name: 'FreeConvert',
    category: '实用工具',
    description: '不同类型文件相互转换',
    url: 'https://www.freeconvert.com/',
    icon: 'files/web/文件转换器.jpg'
  },
  {
    id: '0021',
    name: '谷歌地球',
    category: '实用工具',
    description: '卫星地图',
    url: 'https://earth.google.com/',
    icon: 'files/web/谷歌地球.jpg'
  },
  {
    id: '0022',
    name: 'SQLPub',
    category: '实用工具',
    description: '免费的云端数据库',
    url: 'https://console.sqlpub.com/',
    icon: 'files/web/SQLPub.jpg'
  },
  {
    id: '0023',
    name: '刘明野工具箱',
    category: '实用工具',
    description: '收录了各种娱乐工具的网站',
    url: 'https://tools.liumingye.cn/',
    icon: 'files/web/刘明野工具箱.jpg'
  },
  {
    id: '0024',
    name: '搜图神器',
    category: '实用工具',
    description: '各种壁纸、表情包等',
    url: 'https://www.soutushenqi.com/',
    icon: 'files/web/搜图神器.jpg'
  },
  {
    id: '0025',
    name: '宝可梦肉鸽',
    category: '游戏娱乐',
    description: '肉鸽类的宝可梦游戏',
    url: 'https://pokerogue.net/',
    icon: 'files/web/宝可梦肉鸽.jpg'
  },
  {
    id: '0026',
    name: '绝区零成就',
    category: '游戏娱乐',
    description: '记录绝区零的成就完成',
    url: 'https://zzz.liyin.space/',
    icon: 'files/web/ZZZ成就.jpg'
  },
  {
    id: '0027',
    name: 'CS开箱模拟器',
    category: '游戏娱乐',
    description: '模拟CS开箱的娱乐网站',
    url: 'https://convars.com/',
    icon: 'files/web/CS开箱模拟器.jpg'
  },
  {
    id: '0028',
    name: 'TouchGal',
    category: '游戏娱乐',
    description: '隐藏，一站式Galgame文化社区',
    url: 'https://www.touchgal.ink/',
    icon: 'files/web/touchgal.jpg'
  },
  {
    id: '0029',
    name: '听宇方舟干货站',
    category: '游戏娱乐',
    description: '方舟资源、实用指令等',
    url: 'http://www.teandy.com/',
    icon: 'files/web/听宇方舟.jpg'
  },
  {
    id: '0030',
    name: 'GameBanana',
    category: '游戏娱乐',
    description: '提供各类二游mod下载',
    url: 'https://gamebanana.com/',
    icon: 'files/web/香蕉网.jpg'
  },
  {
    id: '0031',
    name: '喵斯快跑',
    category: '游戏娱乐',
    description: '喵斯快跑官网',
    url: 'https://musedash.peropero.net/',
    icon: 'files/web/喵斯快跑.jpg'
  },
  {
    id: '0032',
    name: 'MuteFun无声乐趣',
    category: '游戏娱乐',
    description: '日漫、美漫、特摄观看',
    url: 'https://www.2kdm.com/',
    icon: 'files/web/MuteFun.jpg'
  },
  {
    id: '0033',
    name: '萌娘百科',
    category: '游戏娱乐',
    description: '二次元ACG文化百科全书',
    url: 'https://www.2kdm.com/',
    icon: 'files/web/萌娘百科.jpg'
  },
  {
    id: '0034',
    name: 'GD音乐台',
    category: '游戏娱乐',
    description: '免费听歌、下歌网站',
    url: 'https://music.gdstudio.org/',
    icon: 'files/web/GD音乐台.jpg'
  },
  {
    id: '0035',
    name: 'YouTuBe',
    category: '游戏娱乐',
    description: '美国视频网站',
    url: 'https://www.youtube.com/',
    icon: 'files/web/YouTuBe.jpg'
  },
  {
    id: '0036',
    name: 'bilibili',
    category: '游戏娱乐',
    description: '中国视频网站',
    url: 'https://www.bilibili.com/',
    icon: 'files/web/bilibili.jpg'
  },
  {
    id: '0037',
    name: 'NicoNico',
    category: '游戏娱乐',
    description: '日本视频网站',
    url: 'https://www.nicovideo.jp/',
    icon: 'files/web/NicoNico.jpg'
  },
  {
    id: '0038',
    name: 'Rule34',
    category: '游戏娱乐',
    description: '隐藏，动漫视频网站',
    url: 'https://rule34video.com/',
    icon: 'files/web/rule34.jpg'
  },
  {
    id: '0039',
    name: 'X',
    category: '游戏娱乐',
    description: 'Twitter (推特)',
    url: 'https://x.com/',
    icon: 'files/web/X.jpg'
  },
  {
    id: '0040',
    name: 'Hanime1',
    category: '游戏娱乐',
    description: '隐藏，动漫视频网站',
    url: 'https://hanime1.me/',
    icon: 'files/web/Hanime1.jpg'
  },
  {
    id: '0041',
    name: 'iwara',
    category: '游戏娱乐',
    description: '隐藏，动漫视频网站',
    url: 'https://www.iwara.tv/',
    icon: 'files/web/iwara.jpg'
  },
  {
    id: '0042',
    name: 'Pixiv',
    category: '游戏娱乐',
    description: '隐藏，P站同人画师平台',
    url: 'https://www.pixiv.net/',
    icon: 'files/web/pixiv.jpg'
  },
  {
    id: '0043',
    name: 'Pixiv Fanbox',
    category: '游戏娱乐',
    description: '隐藏，P站画师赞助平台',
    url: 'https://www.fanbox.cc/',
    icon: 'files/web/Pixiv Fanbox.jpg'
  },
  {
    id: '0044',
    name: '寄子游戏社区',
    category: '游戏娱乐',
    description: '隐藏，各类破解游戏和mod',
    url: 'https://jijizizi.cn/',
    icon: 'files/web/寄子.jpg'
  },
  {
    id: '0045',
    name: 'ChatGPT',
    category: '学习工作',
    description: '与OpenAI进行对话',
    url: 'https://chat.openai.com/',
    icon: 'files/web/ChatGPT.jpg'
  },
  {
    id: '0046',
    name: '千问',
    category: '学习工作',
    description: '与千问进行对话',
    url: 'https://www.qianwen.com/',
    icon: 'files/web/千问.jpg'
  },
  {
    id: '0047',
    name: 'TRAE',
    category: '学习工作',
    description: 'AI写代码',
    url: 'https://www.trae.cn/work',
    icon: 'files/web/TRAE.jpg'
  },
  {
    id: '0048',
    name: '草料二维码',
    category: '实用工具',
    description: '生成各种二维码',
    url: 'https://cli.im/',
    icon: 'files/web/草料二维码.jpg'
  },
  {
    id: '0049',
    name: 'CloudFlare',
    category: '实用工具',
    description: 'CloudFlare管理面板',
    url: 'https://dash.cloudflare.com/',
    icon: 'files/web/CloudFlare.jpg'
  },
  {
    id: '0050',
    name: 'ZZZ的空间',
    category: '游戏娱乐',
    description: 'CloudFlare',
    url: 'https://zzz.3104971604.workers.dev/',
    icon: 'files/web/ZZZ的空间.jpg'
  },
  {
    id: '0051',
    name: 'Everything',
    category: '实用工具',
    description: '文件快速搜索工具',
    url: 'https://www.voidtools.com/zh-cn/',
    icon: 'files/web/Everything.jpg'
  },
  {
    id: '0052',
    name: 'Steam',
    category: '游戏娱乐',
    description: 'Steam游戏平台',
    url: 'https://store.steampowered.com/',
    icon: 'files/web/Steam.jpg'
  },
  {
    id: '0053',
    name: 'geekuninstaller/',
    category: '实用工具',
    description: '完全卸载软件',
    url: 'https://geekuninstaller.com/',
    icon: 'files/web/geekuninstaller.jpg'
  },
  {
    id: '0054',
    name: '皮卡丘的音乐站',
    category: '游戏娱乐',
    description: '免费美观的音乐站',
    url: 'http://qjjlb.quanjian.com.cn/musicdl/',
    icon: 'files/web/皮卡丘的音乐站.gif'
  }
];

function isHiddenWebSite(site) {
  return /^隐藏[，,]/.test(String(site.description || '').trim());
}

function getWebSiteDisplayDescription(site) {
  const description = String(site.description || '').trim();
  if (isHiddenWebSite(site)) {
    return description.replace(/^隐藏[，,]/, '');
  }
  return description;
}

function getWebsitesByCategory(category) {
  return WEBSITES
    .filter((site) => site.category === category)
    .sort((a, b) => AppCommon.compareByName(a.name, b.name));
}

function createWebSiteItem(site) {
  const link = document.createElement('a');
  link.className = 'web-site-item ui-interactive';
  link.href = site.url;
  link.target = '_blank';
  link.rel = 'noopener noreferrer';
  link.dataset.searchText = (site.name + ' ' + site.description).toLowerCase();

  if (isHiddenWebSite(site)) {
    link.dataset.hiddenSite = 'true';
    link.classList.add('web-site-item--secret');
  }

  const iconWrap = document.createElement('span');
  iconWrap.className = 'web-site-icon-wrap';

  const icon = document.createElement('img');
  icon.className = 'web-site-icon';
  icon.src = AppCommon.resolveAsset(site.icon);
  icon.alt = site.name;
  icon.loading = 'lazy';
  icon.decoding = 'async';
  iconWrap.appendChild(icon);

  const info = document.createElement('div');
  info.className = 'web-site-info';

  const nameEl = document.createElement('p');
  nameEl.className = 'web-site-name';
  nameEl.textContent = site.name;

  const descEl = document.createElement('p');
  descEl.className = 'web-site-desc';
  descEl.textContent = getWebSiteDisplayDescription(site);

  info.appendChild(nameEl);
  info.appendChild(descEl);
  link.appendChild(iconWrap);
  link.appendChild(info);
  return link;
}

let activeWebSearch = null;

function webItemMatchesFilter(item, query) {
  const normalized = String(query || '').trim().toLowerCase();
  const isHidden = item.dataset.hiddenSite === 'true';
  const showsHidden = normalized.includes('隐藏');
  const text = item.dataset.searchText || '';

  if (!normalized) return !isHidden;
  if (isHidden && !showsHidden) return false;
  return text.includes(normalized);
}

function applyWebColumnFilter(listEl, query) {
  const items = listEl.querySelectorAll('.web-site-item');
  let visibleCount = 0;

  items.forEach((item) => {
    const match = webItemMatchesFilter(item, query);
    item.hidden = !match;
    if (match) visibleCount += 1;
  });

  let emptyEl = listEl.querySelector('.web-search-empty');
  if (items.length && visibleCount === 0) {
    if (!emptyEl) {
      emptyEl = document.createElement('p');
      emptyEl.className = 'web-empty web-search-empty';
      emptyEl.textContent = '未找到匹配网站';
      listEl.appendChild(emptyEl);
    }
    emptyEl.hidden = false;
  } else if (emptyEl) {
    emptyEl.hidden = true;
  }
}

function closeWebColumnSearch() {
  if (!activeWebSearch) return;

  const state = activeWebSearch;
  activeWebSearch = null;
  state.searchInput.value = '';
  state.searchInput.hidden = true;
  state.titleBtn.hidden = false;
  applyWebColumnFilter(state.listEl, '');
}

function openWebColumnSearch(column, titleBtn, searchInput, listEl) {
  if (activeWebSearch && activeWebSearch.column !== column) {
    closeWebColumnSearch();
  }

  activeWebSearch = { column, titleBtn, searchInput, listEl };
  titleBtn.hidden = true;
  searchInput.hidden = false;
  searchInput.focus();
  searchInput.select();
}

function bindWebColumnSearch(column, titleBtn, searchInput, listEl) {
  titleBtn.addEventListener('click', (event) => {
    event.stopPropagation();
    openWebColumnSearch(column, titleBtn, searchInput, listEl);
  });

  searchInput.addEventListener('input', () => {
    applyWebColumnFilter(listEl, searchInput.value);
  });

  searchInput.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      event.preventDefault();
      closeWebColumnSearch();
    }
  });
}

function initWebSearchGlobal() {
  if (initWebSearchGlobal.done) return;
  initWebSearchGlobal.done = true;

  document.addEventListener('pointerdown', (event) => {
    if (!activeWebSearch) return;
    if (activeWebSearch.column.contains(event.target)) return;
    closeWebColumnSearch();
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') closeWebColumnSearch();
  });
}

function renderWebColumn(container, category) {
  container.innerHTML = '';

  const titleBtn = document.createElement('button');
  titleBtn.type = 'button';
  titleBtn.className = 'web-column-title ui-interactive';
  titleBtn.textContent = category.label;

  const searchInput = document.createElement('input');
  searchInput.type = 'search';
  searchInput.className = 'web-column-title-input';
  searchInput.placeholder = '搜索网站名或简介';
  searchInput.setAttribute('aria-label', category.label + ' 搜索');
  searchInput.hidden = true;

  container.appendChild(titleBtn);
  container.appendChild(searchInput);

  const list = document.createElement('div');
  list.className = 'web-site-list';

  const sites = getWebsitesByCategory(category.label);
  if (!sites.length) {
    list.innerHTML = '<p class="web-empty">暂无网站</p>';
  } else {
    sites.forEach((site) => {
      list.appendChild(createWebSiteItem(site));
    });
  }

  container.appendChild(list);
  applyWebColumnFilter(list, '');
  bindWebColumnSearch(container, titleBtn, searchInput, list);
}

function initWebModule() {
  const layout = document.getElementById('web-layout');
  if (!layout) return;

  initWebSearchGlobal();
  layout.innerHTML = '';
  WEB_CATEGORIES.forEach((category) => {
    const column = document.createElement('section');
    column.className = 'web-column web-panel-box';
    column.dataset.category = category.id;
    renderWebColumn(column, category);
    layout.appendChild(column);
  });
}

AppCommon.onDomReady(initWebModule);
