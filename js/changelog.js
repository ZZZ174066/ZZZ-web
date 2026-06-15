const CHANGELOG = [
  {
    date: '2026-06-10',
    title: '资源加载',
    items: [
      '线上图片改为同源 /files/ 路径，由 Worker 代理 jsDelivr',
      '消除 Edge「Tracking Prevention blocked access to storage」控制台刷屏',
      '本地开发仍直连 jsDelivr，无需额外配置'
    ]
  },
  {
    date: '2026-06-14',
    title: '关于个人',
    items: [
      '新增四栏布局：基本信息、学习经历、工作经历、留言',
      '补充技能、学院与专业等信息字段',
      '统一栏内正文字号与字重，优化头像与信息排版'
    ]
  },
  {
    date: '2026-06-14',
    title: '网站分享',
    items: [
      '栏目标题点击切换为搜索框，支持按网站名或简介筛选',
      '栏内点击网站卡片不再退出搜索'
    ]
  },
  {
    date: '2026-06-14',
    title: '性能优化',
    items: [
      '音乐、游戏列表封面启用懒加载',
      '首次进入对应 Tab 后再初始化音乐/游戏模块'
    ]
  },
  {
    date: '2026-06-14',
    title: '资源与部署',
    items: [
      '图片改由 jsDelivr + GitHub 加速加载',
      '新增 Cloudflare Workers 部署配置，排除 .git 与 files 目录',
      '修复含 %、+ 等特殊文件名导致的部署失败'
    ]
  },
  {
    date: '2026-06-14',
    title: '界面动效',
    items: [
      '新增界面背景：漂移网格 + 粒子连线特效',
      '鼠标点击增加波纹特效'
    ]
  },
  {
    date: '2026-06-13',
    title: '模块调整',
    items: [
      '移除图片分享、动漫分享模块',
      '新增更新日志页面'
    ]
  },
  {
    date: '2026-06-10',
    title: '站点基础搭建',
    items: [
      '完成项目、音乐、游戏、网站分享模块',
      '统一筛选下拉、封面预览等交互组件',
      '添加入场动画'
    ]
  }
];

function renderChangelog(container) {
  container.innerHTML = '';

  const list = document.createElement('div');
  list.className = 'changelog-list';

  CHANGELOG.forEach((entry) => {
    const item = document.createElement('article');
    item.className = 'changelog-item';

    const head = document.createElement('div');
    head.className = 'changelog-head';

    const dateEl = document.createElement('time');
    dateEl.className = 'changelog-date';
    dateEl.dateTime = entry.date;
    dateEl.textContent = entry.date;

    const entryTitle = document.createElement('h3');
    entryTitle.className = 'changelog-entry-title';
    entryTitle.textContent = entry.title;

    head.appendChild(dateEl);
    head.appendChild(entryTitle);

    const ul = document.createElement('ul');
    ul.className = 'changelog-points';
    entry.items.forEach((text) => {
      const li = document.createElement('li');
      li.textContent = text;
      ul.appendChild(li);
    });

    item.appendChild(head);
    item.appendChild(ul);
    list.appendChild(item);
  });

  container.appendChild(list);
}

function initChangelogModule() {
  const container = document.getElementById('changelog-content');
  if (!container) return;
  renderChangelog(container);
}

AppCommon.onDomReady(initChangelogModule);
