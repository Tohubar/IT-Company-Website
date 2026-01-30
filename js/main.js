$(document).ready(function () {
    const navToggle = document.querySelector('.mobile-toggle');
    const navbar = document.querySelector('.navbar');
    const chatWidget = document.querySelector('.chat-widget');
    const chatToggle = document.querySelector('.chat-toggle');
    const scrollTopButton = document.querySelector('.scroll-top');

    navToggle?.addEventListener('click', () => {
        navbar?.classList.toggle('show');
    });

    chatToggle?.addEventListener('click', () => {
        chatWidget?.classList.toggle('open');
    });

    const updateCountdown = (container) => {
        const targetDate = new Date(container.dataset.countdown);
        const now = new Date();
        const diff = targetDate - now;

        const clamp = (value) => (value < 0 ? 0 : value);
        const totalSeconds = clamp(Math.floor(diff / 1000));
        const days = Math.floor(totalSeconds / 86400);
        const hours = Math.floor((totalSeconds % 86400) / 3600);
        const minutes = Math.floor((totalSeconds % 3600) / 60);
        const seconds = totalSeconds % 60;

        const timeNodes = container.querySelectorAll('.time');
        if (timeNodes.length >= 4) {
            timeNodes[0].textContent = String(days).padStart(2, '0');
            timeNodes[1].textContent = String(hours).padStart(2, '0');
            timeNodes[2].textContent = String(minutes).padStart(2, '0');
            timeNodes[3].textContent = String(seconds).padStart(2, '0');
        }
    };

    const countdowns = document.querySelectorAll('[data-countdown]');
    if (countdowns.length) {
        setInterval(() => {
            countdowns.forEach((countdown) => updateCountdown(countdown));
        }, 1000);
    }

    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    observer.unobserve(entry.target);
                }
            });
        },
        { threshold: 0.2 }
    );

    document.querySelectorAll('.fade-in').forEach((el) => observer.observe(el));

    $(window).scroll(function () {
        if ($(this).scrollTop() > 140) {
            $(scrollTopButton).addClass('show');
        } else {
            $(scrollTopButton).removeClass('show');
        }
    });

    scrollTopButton?.addEventListener('click', () => {
        $('html, body').animate({ scrollTop: 0 }, 800, 'easeInOutExpo');
    });

    $('.recommended-carousel').owlCarousel({
        autoplay: true,
        dots: false,
        nav: true,
        loop: true,
        navText: [
            '<span class="carousel-nav"><i class="fas fa-chevron-left"></i></span>',
            '<span class="carousel-nav"><i class="fas fa-chevron-right"></i></span>',
        ],
        responsive: {
            0: { items: 1 },
            576: { items: 2 },
            992: { items: 3 },
        },
    });

    $('.testimonials-carousel').owlCarousel({
        autoplay: true,
        dots: true,
        loop: true,
        responsive: {
            0: { items: 1 },
            768: { items: 2 },
            992: { items: 3 },
        },
    });
});
