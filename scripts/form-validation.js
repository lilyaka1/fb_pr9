// Валидация контактной формы

document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');

    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();

            // Получаем значения полей
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const message = document.getElementById('message').value.trim();

            // Простая валидация
            let isValid = true;
            let errorMessage = '';

            // Проверка имени
            if (name.length < 2) {
                isValid = false;
                errorMessage += 'Имя должно содержать минимум 2 символа.\n';
            }

            // Проверка email
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                isValid = false;
                errorMessage += 'Введите корректный email адрес.\n';
            }

            // Проверка сообщения
            if (message.length < 10) {
                isValid = false;
                errorMessage += 'Сообщение должно содержать минимум 10 символов.\n';
            }

            if (isValid) {
                // Форма валидна
                alert('Спасибо за сообщение! Мы свяжемся с вами в ближайшее время.\n\n(В реальном проекте здесь будет отправка данных на сервер)');
                contactForm.reset();
            } else {
                // Показываем ошибки
                alert('Пожалуйста, исправьте следующие ошибки:\n\n' + errorMessage);
            }
        });

        // Визуальная обратная связь при вводе
        const inputs = contactForm.querySelectorAll('input, textarea');
        inputs.forEach(input => {
            input.addEventListener('blur', function() {
                if (this.value.trim() === '') {
                    this.style.borderColor = '#dc3545';
                } else {
                    this.style.borderColor = '#28a745';
                }
            });

            input.addEventListener('focus', function() {
                this.style.borderColor = '#0066cc';
            });
        });
    }
});
