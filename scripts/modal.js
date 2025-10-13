// Управление модальным окном проекта

document.addEventListener('DOMContentLoaded', function() {
    const modal = document.getElementById('projectModal');
    const projectCards = document.querySelectorAll('.project-card');
    const closeBtn = document.querySelector('.close');

    // Данные проектов (в реальном проекте это будет из базы данных)
    const projectsData = {
        '1': {
            title: 'Личный сайт',
            image: '../images/kanye-meme-1.jpeg',
            description: 'Портфолио с современным дизайном, созданное с использованием HTML и CSS. Включает адаптивную верстку и плавные анимации.',
            tags: ['HTML', 'CSS'],
            liveUrl: '#',
            codeUrl: '#'
        },
        '2': {
            title: 'Todo-приложение',
            image: '../images/kanye-meme-2.jpg',
            description: 'Интерактивное приложение для управления задачами с возможностью добавления, удаления и отметки выполненных задач. Данные хранятся в localStorage.',
            tags: ['JavaScript', 'LocalStorage'],
            liveUrl: '#',
            codeUrl: '#'
        },
        '3': {
            title: 'Интернет-магазин',
            image: '../images/kanye-meme-3.jpg',
            description: 'E-commerce приложение на React с корзиной покупок, фильтрацией товаров и оформлением заказа.',
            tags: ['React', 'Redux'],
            liveUrl: '#',
            codeUrl: '#'
        },
        '4': {
            title: 'Bootstrap портфолио',
            image: '../images/kanye-meme-4.jpeg',
            description: 'Адаптивный сайт-портфолио, созданный с использованием фреймворка Bootstrap. Полностью отзывчивый дизайн.',
            tags: ['HTML', 'Bootstrap'],
            liveUrl: '#',
            codeUrl: '#'
        },
        '5': {
            title: 'Калькулятор',
            image: '../images/kanye-meme-5.jpeg',
            description: 'Простой калькулятор на чистом JavaScript с поддержкой базовых арифметических операций.',
            tags: ['JavaScript'],
            liveUrl: '#',
            codeUrl: '#'
        },
        '6': {
            title: 'Погодное приложение',
            image: '../images/kanye-meme-6.jpg',
            description: 'Приложение для просмотра погоды с использованием API OpenWeatherMap. Показывает текущую погоду и прогноз на неделю.',
            tags: ['React', 'API'],
            liveUrl: '#',
            codeUrl: '#'
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
