// PAGE LOADER
window.addEventListener('load', () => {
    const loader = document.getElementById('page-loader');
    if (loader) {
        setTimeout(() => loader.classList.add('hidden'), 2000);
    }
});

// DARK/LIGHT MODE
const themeToggle = document.getElementById('theme-toggle');
const themeToggleMobile = document.getElementById('theme-toggle-mobile');
const html = document.documentElement;

const savedTheme = localStorage.getItem('theme') || 'dark';
html.setAttribute('data-theme', savedTheme);
updateThemeIcon(savedTheme);

if (themeToggle) themeToggle.addEventListener('click', toggleTheme);
if (themeToggleMobile) themeToggleMobile.addEventListener('click', toggleTheme);

function toggleTheme() {
    const currentTheme = html.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    html.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeIcon(newTheme);
}

function updateThemeIcon(theme) {
    document.querySelectorAll('.theme-switch-slider i').forEach(icon => {
        icon.className = theme === 'dark' ? 'fas fa-moon' : 'fas fa-sun';
    });
}

// NAVBAR SCROLL
window.addEventListener('scroll', () => {
    const navbar = document.getElementById('navbar');
    if (navbar) {
        navbar.classList.toggle('navbar-scrolled', window.scrollY > 50);
    }
});

// MENU MOBILE
const mobileMenuButton = document.getElementById('mobile-menu-button');
const mobileMenu = document.getElementById('mobile-menu');
if (mobileMenuButton && mobileMenu) {
    const mobileMenuIcon = mobileMenuButton.querySelector('i');
    mobileMenuButton.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden');
        if (mobileMenu.classList.contains('hidden')) {
            mobileMenuIcon.classList.replace('fa-times', 'fa-bars');
        } else {
            mobileMenuIcon.classList.replace('fa-bars', 'fa-times');
        }
    });
}

// FADE IN ANIMATION
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) entry.target.classList.add('visible');
    });
}, { threshold: 0.1 });

document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));

// SMOOTH SCROLL
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        const target = document.querySelector(targetId);
        if (target) {
            e.preventDefault();
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});

// CAROUSEL (si présent sur la page)
document.addEventListener('DOMContentLoaded', function() {
    const slides = document.querySelectorAll('.project-slide');
    if (slides.length === 0) return;

    const dots = document.querySelectorAll('.carousel-dots .dot');
    const prevBtn = document.querySelector('.carousel-prev');
    const nextBtn = document.querySelector('.carousel-next');
    
    let currentSlide = 0;
    let autoplayTimer;

    function showSlide(index) {
        currentSlide = (index + slides.length) % slides.length;
        slides.forEach((slide, i) => {
            slide.classList.toggle('active', i === currentSlide);
        });
        dots.forEach((dot, i) => {
            dot.classList.toggle('active', i === currentSlide);
        });
    }

    function nextSlide() { showSlide(currentSlide + 1); }
    function prevSlide() { showSlide(currentSlide - 1); }

    function startAutoplay() {
        autoplayTimer = setInterval(nextSlide, 5000);
    }

    function stopAutoplay() {
        clearInterval(autoplayTimer);
    }

    if (nextBtn) nextBtn.addEventListener('click', () => { nextSlide(); stopAutoplay(); startAutoplay(); });
    if (prevBtn) prevBtn.addEventListener('click', () => { prevSlide(); stopAutoplay(); startAutoplay(); });

    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => { showSlide(index); stopAutoplay(); startAutoplay(); });
    });

    const carousel = document.querySelector('.projects-carousel');
    if (carousel) {
        carousel.addEventListener('mouseenter', stopAutoplay);
        carousel.addEventListener('mouseleave', startAutoplay);
    }

    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') { prevSlide(); stopAutoplay(); startAutoplay(); }
        else if (e.key === 'ArrowRight') { nextSlide(); stopAutoplay(); startAutoplay(); }
    });

    startAutoplay();
    showSlide(0);
});