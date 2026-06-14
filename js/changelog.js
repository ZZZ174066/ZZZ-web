const CHANGELOG = [
  {
    date: '2026-06-14',
    title: '界面动效',
    items: [
      '新增界面背景：漂移网格+粒子连线特效',
      '鼠标点击特效',
    ]
  },
  {
    date: '2026-06-14',
    title: '资源与部署',
    items: [
      '音乐、游戏、项目、网站图标迁移至阿里云 OSS',
      '站点部署至Github',
      '修复特殊文件名加载问题'
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
