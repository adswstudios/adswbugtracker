document.addEventListener('DOMContentLoaded', () => {
    // --- ИНИЦИАЛИЗАЦИЯ EMAILJS ---
    if (typeof emailjs !== 'undefined') {
        emailjs.init("Tmaz4Zl9sqCp74qhx");
    }

    // --- АНИМАЦИЯ ЧАСТИЦ (LEAVESNOTES CANVAS EFFECT) ---
    const canvas = document.getElementById('particles-canvas');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        let particles = [];

        function resizeCanvas() {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        }

        window.addEventListener('resize', resizeCanvas);
        resizeCanvas();

        class Particle {
            constructor() {
                this.reset();
            }

            reset() {
                this.x = Math.random() * canvas.width;
                this.y = Math.random() * canvas.height;
                this.radius = Math.random() * 2.5 + 1;
                this.alpha = Math.random() * 0.4 + 0.1;
                this.speedX = (Math.random() - 0.5) * 0.3;
                this.speedY = (Math.random() - 0.5) * 0.3;
            }

            update() {
                this.x += this.speedX;
                this.y += this.speedY;

                if (this.x < 0 || this.x > canvas.width || this.y < 0 || this.y > canvas.height) {
                    this.reset();
                }
            }

            draw() {
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(200, 210, 230, ${this.alpha})`;
                ctx.fill();
            }
        }

        function initParticles() {
            particles = [];
            const count = Math.floor((canvas.width * canvas.height) / 25000);
            for (let i = 0; i < count; i++) {
                particles.push(new Particle());
            }
        }

        function animateParticles() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            particles.forEach(p => {
                p.update();
                p.draw();
            });
            requestAnimationFrame(animateParticles);
        }

        initParticles();
        animateParticles();
    }

    // --- МУЛЬТИЯЗЫЧНОСТЬ (I18N) ---
    const translations = {
        ru: {
            "home": "Главная",
            "report_bug": "Сообщить об ошибке",
            "hero_title": "Центр отслеживания ошибок ПО",
            "hero_text": "Помогите нам улучшить наши продукты! Сообщайте о найденных ошибках, и мы оперативно их исправим.",
            "feature1_title": "Быстрая отчетность",
            "feature1_text": "Сообщайте об ошибках в несколько кликов с помощью интуитивной формы",
            "feature2_title": "Прямая отправка",
            "feature2_text": "Отчеты отправляются напрямую в нашу службу поддержки",
            "feature3_title": "Мультиязычность",
            "feature3_text": "Поддержка русского и английского языков для удобства пользователей",
            "report_title": "Сообщить об ошибке",
            "email_label": "Ваш Email",
            "email_placeholder": "Введите ваш email для обратной связи",
            "software_label": "Название ПО",
            "software_placeholder": "Введите название программного обеспечения",
            "bug_title_label": "Название ошибки",
            "bug_title_placeholder": "Кратко опишите проблему",
            "description_label": "Подробное описание",
            "description_placeholder": "Опишите, как воспроизвести ошибку, что вы делали, когда она произошла, и что вы ожидали вместо этого",
            "priority_label": "Приоритет ошибки",
            "priority_low": "Низкий",
            "priority_medium": "Средний",
            "priority_high": "Высокий",
            "priority_critical": "Критичный",
            "submit_button": "Отправить отчет",
            "confirmation_title": "Отчет успешно отправлен!",
            "confirmation_text": "Спасибо за ваше сообщение. Наша команда рассмотрит его в ближайшее время и свяжется с вами при необходимости.",
            "rights": "Все права защищены.",
            "footer_text": "Отслеживание ошибок для улучшения качества программного обеспечения"
        },
        en: {
            "home": "Home",
            "report_bug": "Report Bug",
            "hero_title": "Software Bug Tracking Center",
            "hero_text": "Help us improve our products! Report any bugs you find and we'll fix them promptly.",
            "feature1_title": "Quick Reporting",
            "feature1_text": "Report bugs in just a few clicks with our intuitive form",
            "feature2_title": "Direct Submission",
            "feature2_text": "Reports are sent directly to our support team",
            "feature3_title": "Multilingual Support",
            "feature3_text": "Support for Russian and English languages for user convenience",
            "report_title": "Report a Bug",
            "email_label": "Your Email",
            "email_placeholder": "Enter your email for feedback",
            "software_label": "Software Name",
            "software_placeholder": "Enter software name",
            "bug_title_label": "Bug Title",
            "bug_title_placeholder": "Briefly describe the issue",
            "description_label": "Detailed Description",
            "description_placeholder": "Describe how to reproduce the bug, what you were doing when it occurred, and what you expected instead",
            "priority_label": "Bug Priority",
            "priority_low": "Low",
            "priority_medium": "Medium",
            "priority_high": "High",
            "priority_critical": "Critical",
            "submit_button": "Submit Report",
            "confirmation_title": "Report Successfully Sent!",
            "confirmation_text": "Thank you for your report. Our team will review it shortly and contact you if needed.",
            "rights": "All rights reserved.",
            "footer_text": "Bug tracking for improving software quality"
        }
    };

    let currentLang = 'ru';

    function applyTranslations(lang) {
        currentLang = lang;
        
        // Перевод текста у элементов
        document.querySelectorAll('[data-i18n]').forEach(element => {
            const key = element.getAttribute('data-i18n');
            if (translations[lang] && translations[lang][key]) {
                element.textContent = translations[lang][key];
            }
        });

        // Перевод плейсхолдеров
        document.querySelectorAll('[data-i18n-placeholder]').forEach(element => {
            const key = element.getAttribute('data-i18n-placeholder');
            if (translations[lang] && translations[lang][key]) {
                element.placeholder = translations[lang][key];
            }
        });
        
        // Переключение визуального активного состояния кнопок языков
        document.querySelectorAll('.lang-btn').forEach(btn => {
            btn.classList.toggle('active', btn.getAttribute('data-lang') === lang);
        });
    }

    // Слушатель кликов для переключателя языков
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const lang = this.getAttribute('data-lang');
            applyTranslations(lang);
        });
    });

    // --- ПЕРЕКЛЮЧЕНИЕ ТЕМЫ ---
    function setTheme(theme) {
        if (theme === 'dark') {
            document.body.classList.remove('light-theme');
        } else {
            document.body.classList.add('light-theme');
        }
        localStorage.setItem('theme', theme);
        
        document.querySelectorAll('.theme-btn').forEach(btn => {
            btn.classList.toggle('active', btn.getAttribute('data-theme') === theme);
        });
    }

    document.querySelectorAll('.theme-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            setTheme(this.getAttribute('data-theme'));
        });
    });

    // --- ВЫБОР ПРИОРИТЕТА ---
    document.querySelectorAll('.priority-option').forEach(option => {
        option.addEventListener('click', function() {
            document.querySelectorAll('.priority-option').forEach(opt => opt.classList.remove('selected'));
            this.classList.add('selected');
        });
    });

    // --- ОТПРАВКА ФОРМЫ ---
    const form = document.getElementById('bug-report-form');
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const selectedPriority = document.querySelector('.priority-option.selected');
            const priorityText = selectedPriority ? selectedPriority.textContent.trim() : 'Medium';

            const templateParams = {
                user_email: document.getElementById('user-email').value,
                software_name: document.getElementById('software-name').value,
                bug_title: document.getElementById('bug-title').value,
                bug_description: document.getElementById('bug-description').value,
                priority: priorityText,
                language: currentLang
            };
            
            emailjs.send('service_jtmdw5f', 'template_q6hobca', templateParams)
                .then(() => {
                    const confirmation = document.getElementById('confirmation');
                    if (confirmation) {
                        confirmation.style.display = 'block';
                        confirmation.scrollIntoView({ behavior: 'smooth' });
                    }
                    
                    this.reset();
                    document.querySelectorAll('.priority-option').forEach(opt => opt.classList.remove('selected'));
                    const defaultPriority = document.querySelectorAll('.priority-option')[1];
                    if (defaultPriority) defaultPriority.classList.add('selected');
                })
                .catch(error => {
                    console.error('FAILED...', error);
                    alert(currentLang === 'ru' 
                        ? 'Ошибка отправки отчета. Пожалуйста, попробуйте еще раз.' 
                        : 'Failed to send report. Please try again.');
                });
        });
    }

    // --- ИНИЦИАЛИЗАЦИЯ ПРИ ЗАГРУЗКЕ ---
    applyTranslations('ru');
    setTheme(localStorage.getItem('theme') || 'dark');
});