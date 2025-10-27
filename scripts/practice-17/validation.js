// Валидация формы с поддержкой A11y
(function() {
    const form = document.getElementById('contactForm');
    const messageTextarea = document.getElementById('message');
    const messageCounter = document.getElementById('message-counter');
    const formStatus = document.getElementById('formStatus');
    
    // Счетчик символов
    if (messageTextarea && messageCounter) {
        messageTextarea.addEventListener('input', function() {
            const length = this.value.length;
            const maxLength = this.getAttribute('maxlength');
            messageCounter.textContent = `${length}/${maxLength}`;
            
            // Предупреждение при приближении к лимиту
            if (length >= maxLength * 0.9) {
                messageCounter.style.color = 'var(--error-color)';
            } else {
                messageCounter.style.color = 'var(--text-secondary)';
            }
        });
    }
    
    // Валидация формы
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            let isValid = true;
            
            // Сброс предыдущих ошибок
            clearErrors();
            
            // Валидация имени
            const name = document.getElementById('name');
            if (!name.value.trim()) {
                showError('name', 'Пожалуйста, введите ваше имя');
                isValid = false;
            }
            
            // Валидация email
            const email = document.getElementById('email');
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!email.value.trim()) {
                showError('email', 'Пожалуйста, введите email');
                isValid = false;
            } else if (!emailPattern.test(email.value)) {
                showError('email', 'Введите корректный email адрес');
                isValid = false;
            }
            
            // Валидация телефона (опционально, но если заполнен - проверяем формат)
            const phone = document.getElementById('phone');
            if (phone.value.trim()) {
                const phonePattern = /^[\d\s\-\+\(\)]+$/;
                if (!phonePattern.test(phone.value)) {
                    showError('phone', 'Введите корректный номер телефона');
                    isValid = false;
                }
            }
            
            // Валидация темы
            const subject = document.getElementById('subject');
            if (!subject.value.trim()) {
                showError('subject', 'Пожалуйста, укажите тему сообщения');
                isValid = false;
            }
            
            // Валидация сообщения
            const message = document.getElementById('message');
            if (!message.value.trim()) {
                showError('message', 'Пожалуйста, введите текст сообщения');
                isValid = false;
            } else if (message.value.trim().length < 10) {
                showError('message', 'Сообщение должно содержать минимум 10 символов');
                isValid = false;
            }
            
            // Валидация согласия
            const agreement = document.getElementById('agreement');
            if (!agreement.checked) {
                showError('agreement', 'Необходимо согласиться с политикой обработки данных');
                isValid = false;
            }
            
            // Отправка формы или показ ошибки
            if (isValid) {
                showFormStatus('Форма успешно отправлена! Спасибо за обращение.', 'success');
                form.reset();
                messageCounter.textContent = '0/500';
                
                // Фокус на статус для screen reader
                formStatus.setAttribute('tabindex', '-1');
                formStatus.focus();
            } else {
                showFormStatus('Пожалуйста, исправьте ошибки в форме', 'error');
                
                // Фокус на первом поле с ошибкой
                const firstError = form.querySelector('[aria-invalid="true"]');
                if (firstError) {
                    firstError.focus();
                }
            }
        });
        
        // Сброс формы
        form.addEventListener('reset', function() {
            clearErrors();
            clearFormStatus();
            messageCounter.textContent = '0/500';
        });
        
        // Real-time валидация при потере фокуса
        const inputs = form.querySelectorAll('input, textarea');
        inputs.forEach(input => {
            input.addEventListener('blur', function() {
                validateField(this);
            });
            
            // Убираем ошибку при начале ввода
            input.addEventListener('input', function() {
                if (this.getAttribute('aria-invalid') === 'true') {
                    clearFieldError(this.id);
                }
            });
        });
    }
    
    // Показать ошибку для поля
    function showError(fieldId, message) {
        const field = document.getElementById(fieldId);
        const errorElement = document.getElementById(`${fieldId}-error`);
        
        if (field && errorElement) {
            field.setAttribute('aria-invalid', 'true');
            errorElement.textContent = message;
            field.setAttribute('aria-describedby', `${fieldId}-error ${field.getAttribute('aria-describedby') || ''}`);
        }
    }
    
    // Очистить ошибку поля
    function clearFieldError(fieldId) {
        const field = document.getElementById(fieldId);
        const errorElement = document.getElementById(`${fieldId}-error`);
        
        if (field && errorElement) {
            field.setAttribute('aria-invalid', 'false');
            errorElement.textContent = '';
            
            // Убираем error из aria-describedby
            const describedBy = field.getAttribute('aria-describedby');
            if (describedBy) {
                const newDescribedBy = describedBy.replace(`${fieldId}-error`, '').trim();
                if (newDescribedBy) {
                    field.setAttribute('aria-describedby', newDescribedBy);
                } else {
                    field.removeAttribute('aria-describedby');
                }
            }
        }
    }
    
    // Очистить все ошибки
    function clearErrors() {
        const fields = form.querySelectorAll('[aria-invalid="true"]');
        fields.forEach(field => {
            clearFieldError(field.id);
        });
    }
    
    // Валидация отдельного поля
    function validateField(field) {
        const value = field.value.trim();
        const fieldId = field.id;
        
        switch(fieldId) {
            case 'name':
                if (!value) {
                    showError(fieldId, 'Пожалуйста, введите ваше имя');
                } else {
                    clearFieldError(fieldId);
                }
                break;
                
            case 'email':
                const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!value) {
                    showError(fieldId, 'Пожалуйста, введите email');
                } else if (!emailPattern.test(value)) {
                    showError(fieldId, 'Введите корректный email адрес');
                } else {
                    clearFieldError(fieldId);
                }
                break;
                
            case 'phone':
                if (value) {
                    const phonePattern = /^[\d\s\-\+\(\)]+$/;
                    if (!phonePattern.test(value)) {
                        showError(fieldId, 'Введите корректный номер телефона');
                    } else {
                        clearFieldError(fieldId);
                    }
                } else {
                    clearFieldError(fieldId);
                }
                break;
                
            case 'subject':
                if (!value) {
                    showError(fieldId, 'Пожалуйста, укажите тему сообщения');
                } else {
                    clearFieldError(fieldId);
                }
                break;
                
            case 'message':
                if (!value) {
                    showError(fieldId, 'Пожалуйста, введите текст сообщения');
                } else if (value.length < 10) {
                    showError(fieldId, 'Сообщение должно содержать минимум 10 символов');
                } else {
                    clearFieldError(fieldId);
                }
                break;
        }
    }
    
    // Показать статус формы
    function showFormStatus(message, type) {
        formStatus.textContent = message;
        formStatus.className = `form-status ${type}`;
    }
    
    // Очистить статус формы
    function clearFormStatus() {
        formStatus.textContent = '';
        formStatus.className = 'form-status';
    }
})();
