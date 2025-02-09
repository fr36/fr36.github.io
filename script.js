let currentLang = 'zh'; // 默认语言是中文

// 加载配置文件
fetch('config.json')
  .then(response => response.json())
  .then(data => {
    const updateContent = (lang) => {
      const langData = data[lang];

      // 更新个人信息
      document.getElementById('name').textContent = langData.name;
      document.getElementById('bio').textContent = langData.bio;
      document.getElementById('email').href = `mailto:${langData.contact.email}`;
      document.getElementById('email').textContent = langData.contact.email;
      document.getElementById('phone').textContent = langData.contact.phone;

      // 更新页面标题
      document.getElementById('contact-title').textContent = lang === 'zh' ? '联系' : 'Contact';
      document.getElementById('research-areas-title').textContent = lang === 'zh' ? '研究领域' : 'Research Areas';
      document.getElementById('recent-projects-title').textContent = lang === 'zh' ? '近期项目' : 'Recent Projects';
      document.getElementById('papers-title').textContent = lang === 'zh' ? '已发表论文' : 'Published Papers';

      // 更新研究领域
      const researchList = document.getElementById('research-list');
      researchList.innerHTML = '';
      langData.researchAreas.forEach(area => {
        const li = document.createElement('li');
        li.textContent = area;
        researchList.appendChild(li);
      });

      // 更新近期项目
      const projectsList = document.getElementById('projects-list');
      projectsList.innerHTML = '';
      langData.recentProjects.forEach(project => {
        const li = document.createElement('li');
        const projectLink = data.shared.projectLinks[project.linkKey];
        li.innerHTML = `
          <a href="${projectLink}" target="_blank" class="project-card">
            <img src="${project.image}" alt="${project.title}" style="max-width: 100%; height: auto;">
            <strong>${project.title}</strong>
            <p>${project.description}</p>
          </a>
        `;
        projectsList.appendChild(li);
      });

      // 更新发表论文
      const papersList = document.getElementById('papers-list');
      papersList.innerHTML = '';
      langData.papers.forEach(paper => {
        const li = document.createElement('li');
        li.innerHTML = `<strong>${paper.title}</strong> - <em>${paper.journal}</em> (${paper.year})`;
        papersList.appendChild(li);
      });
    };

    // 初始加载英文内容
    updateContent(currentLang);

    // 语言切换按钮事件
    document.getElementById('en-btn').addEventListener('click', () => {
      currentLang = 'en';
      updateContent(currentLang);
    });

    document.getElementById('zh-btn').addEventListener('click', () => {
      currentLang = 'zh';
      updateContent(currentLang);
    });
  });
