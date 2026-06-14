const ABOUT_PROFILE = {
  avatar: 'ZZZ.png',
  basic: [
    { label: '昵称', value: 'ZZZ' },
    { label: '性别', value: '男' },
    { label: '种族', value: '人类' },
    { label: '年龄', value: '22' },
    { label: '爱好', value: '不爱出门，喜欢听音乐、打游戏、看动漫以及学习编程，平时喜欢开发一些小程序、网页、游戏等。' },
    { label: '技能', value: 'Java后端开发，前端网页开发，C++程序开发，C#程序开发，MFC程序开发，WPF程序开发，Axure原型制作，HbuilderX移动应用开发。' }
  ],
  education: [
    {
      level: '小学：',
      detail: '——',
      period: '2010.09 - 2016.06'
    },
    {
      level: '初中：',
      detail: '——',
      period: '2016.09 - 2019.06'
    },
    {
      level: '高中：',
      detail: '——',
      period: '2019.09 - 2022.06'
    },
    {
      level: '大学：',
      detail: '西南交通大学',
      college: '计算机与人工智能学院',
      major: '软件工程',
      period: '2022.09 - 2026.06'
    }
  ],
  work: [
    {
      company: '成都乐创孵化中心',
      role: '全栈开发实习生',
      period: '2024.07 - 2024.07'
    },
    {
      company: '四川华迪信息技术有限公司',
      role: 'C#开发实习生',
      period: '2025.07 - 2025.07'
    },
    {
      company: '成都思越智能装备股份有限公司',
      role: '实习软件工程师',
      period: '2025.12 - 2026.01'
    }
  ],
  messagePlaceholder: '暂无留言'
};

function getAboutAvatarUrl() {
  if (window.ASSETS_BASE) return window.ASSETS_BASE + ABOUT_PROFILE.avatar;
  return AppCommon.resolveAsset('files/' + ABOUT_PROFILE.avatar);
}

function createAboutColumn(title) {
  const column = document.createElement('section');
  column.className = 'about-column about-panel-box';

  const heading = document.createElement('h2');
  heading.className = 'about-column-title';
  heading.textContent = title;

  const body = document.createElement('div');
  body.className = 'about-column-body';

  column.appendChild(heading);
  column.appendChild(body);
  return { column, body };
}

function renderAboutBasic(body) {
  const avatarBtn = document.createElement('button');
  avatarBtn.type = 'button';
  avatarBtn.className = 'about-avatar ui-interactive';
  avatarBtn.setAttribute('aria-label', '查看头像');

  const avatarImg = document.createElement('img');
  avatarImg.className = 'about-avatar-img';
  avatarImg.src = getAboutAvatarUrl();
  avatarImg.alt = '头像';
  avatarBtn.appendChild(avatarImg);

  avatarBtn.addEventListener('click', () => {
    AppCommon.openImagePreview(getAboutAvatarUrl());
  });

  const list = document.createElement('dl');
  list.className = 'about-info-list';

  ABOUT_PROFILE.basic.forEach((item) => {
    const row = document.createElement('div');
    row.className = 'about-info-row';

    const dt = document.createElement('dt');
    dt.textContent = item.label + '：';

    const dd = document.createElement('dd');
    dd.textContent = item.value;

    row.appendChild(dt);
    row.appendChild(dd);
    list.appendChild(row);
  });

  body.appendChild(avatarBtn);
  body.appendChild(list);
}

function renderAboutCards(body, items, type) {
  const list = document.createElement('div');
  list.className = 'about-card-list';

  items.forEach((item) => {
    const card = document.createElement('article');
    card.className = 'about-card';

    if (type === 'education') {
      const headline = document.createElement('h3');
      headline.className = 'about-card-title';
      const school = item.detail && item.detail !== '-' ? item.detail : '';
      headline.textContent = item.level + school;

      const period = document.createElement('p');
      period.className = 'about-card-period';
      period.textContent = item.period;

      card.appendChild(headline);
      if (item.college) {
        const college = document.createElement('p');
        college.className = 'about-card-detail';
        college.textContent = '学院：' + item.college;
        card.appendChild(college);
      }
      if (item.major) {
        const major = document.createElement('p');
        major.className = 'about-card-detail';
        major.textContent = '专业：' + item.major;
        card.appendChild(major);
      }
      card.appendChild(period);
    } else {
      const company = document.createElement('h3');
      company.className = 'about-card-title';
      company.textContent = item.company;

      const role = document.createElement('p');
      role.className = 'about-card-detail';
      role.textContent = item.role;

      const period = document.createElement('p');
      period.className = 'about-card-period';
      period.textContent = item.period;

      card.appendChild(company);
      card.appendChild(role);
      card.appendChild(period);
    }

    list.appendChild(card);
  });

  body.appendChild(list);
}

function renderAboutMessage(body) {
  const empty = document.createElement('p');
  empty.className = 'about-message-empty';
  empty.textContent = ABOUT_PROFILE.messagePlaceholder;
  body.appendChild(empty);
}

function renderAboutModule(container) {
  container.innerHTML = '';

  const basicCol = createAboutColumn('基本信息');
  renderAboutBasic(basicCol.body);

  const eduCol = createAboutColumn('学习经历');
  renderAboutCards(eduCol.body, ABOUT_PROFILE.education, 'education');

  const workCol = createAboutColumn('工作经历');
  renderAboutCards(workCol.body, ABOUT_PROFILE.work, 'work');

  const msgCol = createAboutColumn('留言');
  renderAboutMessage(msgCol.body);

  container.appendChild(basicCol.column);
  container.appendChild(eduCol.column);
  container.appendChild(workCol.column);
  container.appendChild(msgCol.column);
}

function initAboutModule() {
  const container = document.getElementById('about-layout');
  if (!container) return;
  AppCommon.initImagePreview();
  renderAboutModule(container);
}

AppCommon.onDomReady(initAboutModule);
