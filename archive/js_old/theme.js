// Функция для управления темой
function initThemeToggle() {
    const htmlElement = document.documentElement;
    const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
    
    // Проверяем сохраненную тему или системные настройки
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        htmlElement.setAttribute('data-theme', savedTheme);
    } else if (prefersDarkScheme.matches) {
        htmlElement.setAttribute('data-theme', 'dark');
    }

    // Добавляем кнопку переключения темы в шапку
    const header = document.querySelector('.header');
    const themeToggle = document.createElement('button');
    themeToggle.className = 'theme-toggle';
    themeToggle.setAttribute('aria-label', 'Переключить тему');
    themeToggle.innerHTML = `
        <span class="theme-toggle__text theme-toggle__text--light">Темная тема</span>
        <span class="theme-toggle__icon theme-toggle__icon--sun">☀️</span>
        <span class="theme-toggle__text theme-toggle__text--dark">Светлая тема</span>
        <span class="theme-toggle__icon theme-toggle__icon--moon">🌙</span>
    `;
    
    // Создаем контейнер в шапке для флекс-выравнивания
    const headerContainer = document.createElement('div');
    headerContainer.className = 'header__container';
    
    // Перемещаем существующий заголовок и добавляем кнопку в контейнер
    const title = header.querySelector('.header__title');
    header.innerHTML = '';
    headerContainer.appendChild(title);
    headerContainer.appendChild(themeToggle);
    header.appendChild(headerContainer);

    // Обработчик клика по кнопке
    themeToggle.addEventListener('click', () => {
        const currentTheme = htmlElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        htmlElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
    });
}

// Инициализируем переключатель темы после загрузки DOM
document.addEventListener('DOMContentLoaded', initThemeToggle);