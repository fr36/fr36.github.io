let currentLang = 'zh'; // 默认语言是中文

// 更新按钮激活状态的函数
function updateButtonStates(lang) {
    document.getElementById('en-btn').classList.toggle('active-lang', lang === 'en');
    document.getElementById('zh-btn').classList.toggle('active-lang', lang === 'zh');
}

// 加载配置文件
fetch('config.json')
    .then(response => response.json())
    .then(data => {
        const updateContent = (lang) => {
            const langData = data[lang];
            const sharedData = data.shared;

            try {
                // 更新按钮状态
                updateButtonStates(lang);

                // 更新个人信息
                document.getElementById('name').textContent = langData.name;
                document.getElementById('bio').textContent = langData.bio;

                // 使用 sharedData 中的联系方式
                document.getElementById('email').href = `mailto:${sharedData.contact.email}`;
                document.getElementById('email').textContent = sharedData.contact.email;
                document.getElementById('phone').textContent = sharedData.contact.phone;

                // 更新页面标题
                document.getElementById('contact-title').textContent = lang === 'zh' ? '联系' : 'Contact';
                document.getElementById('research-areas-title').textContent = lang === 'zh' ? '在校研究领域' : 'In-School Research Areas';
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
                            <div class="img-container">
                                <img src="${project.image}" alt="${project.title}" onload="adjustImageClass(this)">
                            </div>
                            <strong>${project.title}</strong>
                            <p>${project.description}</p>
                            <div class="tooltip">${project.description}</div>
                        </a>
                    `;
                    projectsList.appendChild(li);
                });

                // 更新发表论文
                const papersList = document.getElementById('papers-list');
                papersList.innerHTML = '';
                langData.papers.forEach(paper => {
                    const li = document.createElement('li');
                    li.textContent = paper.title;
                    papersList.appendChild(li);
                });

            } catch (error) {
                console.error('Error updating content:', error);
            }
        };

        // 初始加载内容
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

        // 初始设置按钮状态
        updateButtonStates(currentLang);
    })
    .catch(error => {
        console.error('Error loading config:', error);
    });

// 根据图片的长宽比调整类
function adjustImageClass(img) {
    if (img.naturalWidth > img.naturalHeight * 1.2) {
        // 宽图
        img.classList.add('landscape');
        img.classList.remove('portrait');
    } else if (img.naturalHeight > img.naturalWidth * 1.2) {
        // 高图
        img.classList.add('portrait');
        img.classList.remove('landscape');
    } else {
        // 接近正方形的图片
        img.classList.remove('landscape');
        img.classList.remove('portrait');
    }
}
