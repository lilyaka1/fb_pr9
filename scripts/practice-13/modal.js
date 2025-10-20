// Управление модальным окном проекта

document.addEventListener('DOMContentLoaded', function() {
    const modal = document.getElementById('projectModal');
    const projectCards = document.querySelectorAll('.project-card');
    const closeBtn = document.querySelector('.close');

    // Данные проектов с реальными ссылками на GitHub
    const projectsData = {
        '1': {
            title: 'Film Recommendation System',
            image: '../images/IMG_9215.JPG',
            description: 'Умная система рекомендаций фильмов на основе машинного обучения. Анализирует предпочтения пользователя и предлагает персонализированные рекомендации.',
            tags: ['Python', 'ML', 'Pandas', 'Scikit-learn'],
            liveUrl: 'https://github.com/lilyaka1/Film-recommendation-system',
            codeUrl: 'https://github.com/lilyaka1/Film-recommendation-system'
        },
        '2': {
            title: 'ChatGPT Telegram Bot',
            image: '../images/IMG_6799.PNG',
            description: 'Телеграм бот с интеграцией OpenAI ChatGPT API. Позволяет общаться с нейросетью прямо в мессенджере.',
            tags: ['Python', 'AI', 'Telegram API', 'OpenAI'],
            liveUrl: 'https://github.com/lilyaka1',
            codeUrl: 'https://github.com/lilyaka1'
        },
        '3': {
            title: 'Учебные проекты',
            image: '../images/IMG_0751.JPG',
            description: 'Коллекция учебных проектов по фронтенд и бэкенд разработке. Включает контрольные работы и практические задания.',
            tags: ['HTML/CSS', 'JavaScript', 'Bootstrap', 'БЭМ'],
            liveUrl: 'https://lilyaka1.github.io/',
            codeUrl: 'https://github.com/lilyaka1'
        },
        '4': {
            title: 'Портфолио БЭМ',
            image: '../images/IMG_9242.jpeg',
            description: 'Сайт-портфолио разработанный с использованием методологии БЭМ. Демонстрирует навыки организации кода и структурирования стилей.',
            tags: ['HTML', 'CSS', 'БЭМ'],
            liveUrl: 'https://lilyaka1.github.io/fb_pr9/index_v1.html',
            codeUrl: 'https://github.com/lilyaka1/fb_pr9'
        },
        '5': {
            title: 'Bootstrap Portfolio',
            image: '../images/IMG_0001.PNG',
            description: 'Адаптивное портфолио созданное на Bootstrap 5. Включает современные компоненты и отзывчивый дизайн.',
            tags: ['Bootstrap', 'HTML', 'JavaScript'],
            liveUrl: 'https://lilyaka1.github.io/fb_pr9/pages/index_v2.html',
            codeUrl: 'https://github.com/lilyaka1/fb_pr9'
        },
        '6': {
            title: 'Практика 13',
            image: '../images/memee.jpg',
            description: 'Современное портфолио с темной темой и дизайном вдохновленным альбомом MBDTF. Включает переключатель темы и интерактивные элементы.',
            tags: ['HTML/CSS', 'JavaScript', 'Dark Theme'],
            liveUrl: 'https://lilyaka1.github.io/fb_pr9/',
            codeUrl: 'https://github.com/lilyaka1/fb_pr9'
        }
    };

    // Открытие модального окна при клике на карточку проекта
    projectCards.forEach(card => {
        card.addEventListener('click', function() {
            const projectId = this.getAttribute('data-id');
            const project = projectsData[projectId];

            if (project) {
                // Заполняем модальное окно данными
                document.getElementById('modalTitle').textContent = project.title;
                document.getElementById('modalImage').src = project.image;
                document.getElementById('modalDescription').textContent = project.description;
                
                // Добавляем теги
                const tagsContainer = document.getElementById('modalTags');
                tagsContainer.innerHTML = '';
                project.tags.forEach(tag => {
                    const tagSpan = document.createElement('span');
                    tagSpan.className = 'tag';
                    tagSpan.textContent = tag;
                    tagsContainer.appendChild(tagSpan);
                });

                // Устанавливаем ссылки
                const liveLink = document.getElementById('modalLiveLink');
                const githubLink = document.getElementById('modalGithubLink');
                if (liveLink) liveLink.href = project.liveUrl;
                if (githubLink) githubLink.href = project.codeUrl;

                // Показываем модальное окно
                modal.style.display = 'block';
            }
        });
    });

    // Закрытие модального окна
    if (closeBtn) {
        closeBtn.addEventListener('click', function() {
            modal.style.display = 'none';
        });
    }

    // Закрытие модального окна при клике вне его
    window.addEventListener('click', function(event) {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });

    // Закрытие модального окна по Escape
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape' && modal.style.display === 'block') {
            modal.style.display = 'none';
        }
    });
});
