// Модальное окно с поддержкой A11y
(function() {
    const modal = document.getElementById('modal');
    const openModalBtn = document.getElementById('openModalBtn');
    const closeButtons = document.querySelectorAll('[data-close-modal]');
    
    let previousActiveElement = null;
    
    // Открытие модального окна
    function openModal() {
        previousActiveElement = document.activeElement;
        modal.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
        
        // Устанавливаем фокус на первый интерактивный элемент
        const focusableElements = modal.querySelectorAll(
            'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        if (focusableElements.length > 0) {
            focusableElements[0].focus();
        }
        
        // Добавляем обработчики
        document.addEventListener('keydown', handleKeyDown);
        trapFocus();
    }
    
    // Закрытие модального окна
    function closeModal() {
        modal.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
        
        // Возвращаем фокус на элемент, который открыл модалку
        if (previousActiveElement) {
            previousActiveElement.focus();
        }
        
        // Удаляем обработчики
        document.removeEventListener('keydown', handleKeyDown);
    }
    
    // Обработка Escape
    function handleKeyDown(e) {
        if (e.key === 'Escape') {
            closeModal();
        }
    }
    
    // Ловушка фокуса (focus trap)
    function trapFocus() {
        const focusableElements = modal.querySelectorAll(
            'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        
        if (focusableElements.length === 0) return;
        
        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];
        
        modal.addEventListener('keydown', function(e) {
            if (e.key !== 'Tab') return;
            
            if (e.shiftKey) {
                // Shift + Tab
                if (document.activeElement === firstElement) {
                    e.preventDefault();
                    lastElement.focus();
                }
            } else {
                // Tab
                if (document.activeElement === lastElement) {
                    e.preventDefault();
                    firstElement.focus();
                }
            }
        });
    }
    
    // События
    if (openModalBtn) {
        openModalBtn.addEventListener('click', openModal);
    }
    
    closeButtons.forEach(button => {
        button.addEventListener('click', closeModal);
    });
})();
