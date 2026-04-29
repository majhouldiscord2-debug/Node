document.addEventListener('DOMContentLoaded', () => {
    // Custom cursor glow
    const cursorGlow = document.querySelector('.cursor-glow');
    document.addEventListener('mousemove', (e) => {
        cursorGlow.style.left = e.clientX + 'px';
        cursorGlow.style.top = e.clientY + 'px';
    });

    // Language translations
    const translations = {
        en: {
            nav_home: "Home",
            nav_packages: "Packages",
            nav_pricing: "Pricing",
            nav_contact: "Contact",
            nav_cta: "Get Started"
        },
        fr: {
            nav_home: "Accueil",
            nav_packages: "Forfaits",
            nav_pricing: "Tarifs",
            nav_contact: "Contact",
            nav_cta: "Commencer"
        },
        ar: {
            nav_home: "الرئيسية",
            nav_packages: "الباقات",
            nav_pricing: "الأسعار",
            nav_contact: "اتصل بنا",
            nav_cta: "ابدأ الآن"
        }
    };

    const langBtn = document.getElementById('langBtn');
    const langDropdown = document.querySelector('.lang-dropdown');

    if (langBtn) {
        langBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            langDropdown.classList.toggle('active');
        });

        document.querySelectorAll('.lang-dropdown button').forEach(btn => {
            btn.addEventListener('click', () => {
                const lang = btn.getAttribute('data-lang');
                setLanguage(lang);
                langDropdown.classList.remove('active');
            });
        });

        document.addEventListener('click', () => {
            langDropdown.classList.remove('active');
        });
    }

    function setLanguage(lang) {
        langBtn.textContent = lang.toUpperCase();
        document.documentElement.lang = lang;
        document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';

        document.querySelectorAll('[data-i18n]').forEach(el => {
            const key = el.getAttribute('data-i18n');
            if (translations[lang][key]) {
                el.textContent = translations[lang][key];
            }
        });

        localStorage.setItem('preferredLang', lang);
    }

    // Load preferred language
    const savedLang = localStorage.getItem('preferredLang') || 'en';
    setLanguage(savedLang);

    // Navbar scroll effect
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Reveal animations on scroll
    const revealElements = document.querySelectorAll('.reveal');
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, { threshold: 0.1 });

    revealElements.forEach(el => revealObserver.observe(el));

    // Simple Tilt effect for cards
    const tiltCards = document.querySelectorAll('[data-tilt]');
    tiltCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 15;
            const rotateY = (centerX - x) / 15;
            
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px)`;
            
            // Dynamic glow based on mouse position
            const glowX = (x / rect.width) * 100;
            const glowY = (y / rect.height) * 100;
            card.style.background = `radial-gradient(circle at ${glowX}% ${glowY}%, rgba(249, 115, 22, 0.08) 0%, var(--card-bg) 60%)`;
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0)`;
            card.style.background = `var(--card-bg)`;
        });
    });

    // Mobile menu toggle
    const mobileToggle = document.querySelector('.mobile-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    if (mobileToggle) {
        mobileToggle.addEventListener('click', () => {
            mobileToggle.classList.toggle('active');
            navLinks.classList.toggle('active');
            document.body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : '';
        });
    }

    // Contact form handling
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const btn = contactForm.querySelector('button');
            const originalText = btn.textContent;
            
            btn.textContent = 'Sending...';
            btn.disabled = true;
            
            // Simulate API call
            setTimeout(() => {
                btn.textContent = 'Message Sent!';
                btn.style.background = '#10b981'; // Green success
                contactForm.reset();
                
                setTimeout(() => {
                    btn.textContent = originalText;
                    btn.style.background = 'var(--accent)';
                    btn.disabled = false;
                }, 3000);
            }, 1500);
        });
    }
});
