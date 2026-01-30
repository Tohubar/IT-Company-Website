$(document).ready(function () {
    const $nav = $('.primary-nav');
    const $toggle = $('.menu-toggle');
    const $chatToggle = $('.chat-toggle');
    const $chatWindow = $('.chat-window');

    $toggle.on('click', function () {
        $nav.toggleClass('active');
        $(this).find('i').toggleClass('fa-bars fa-times');
    });

    $(window).on('scroll', function () {
        if ($(this).scrollTop() > 200) {
            $('.back-to-top').fadeIn('slow');
        } else {
            $('.back-to-top').fadeOut('slow');
        }
    });

    $('.back-to-top').on('click', function (event) {
        event.preventDefault();
        $('html, body').animate({ scrollTop: 0 }, 800);
    });

    $chatToggle.on('click', function () {
        $chatWindow.toggleClass('active');
    });

    if ($('.recommended-carousel').length) {
        $('.recommended-carousel').owlCarousel({
            autoplay: true,
            loop: true,
            margin: 10,
            nav: true,
            dots: false,
            navText: ['<span class="carousel-nav">‹</span>', '<span class="carousel-nav">›</span>'],
            responsive: {
                0: { items: 1 },
                768: { items: 2 },
                1024: { items: 3 }
            }
        });
    }

    if ($('.testimonials-carousel').length) {
        $('.testimonials-carousel').owlCarousel({
            autoplay: true,
            loop: true,
            margin: 12,
            dots: true,
            responsive: {
                0: { items: 1 },
                768: { items: 2 },
                1024: { items: 3 }
            }
        });
    }

    const revealItems = document.querySelectorAll('.reveal');
    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                }
            });
        },
        { threshold: 0.2 }
    );

    revealItems.forEach((item) => observer.observe(item));

    const updateCountdown = (targetDate, elements) => {
        const now = new Date().getTime();
        const distance = targetDate - now;
        if (distance < 0) {
            elements.forEach((el) => {
                if (el) {
                    el.textContent = '00';
                }
            });
            return;
        }

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((distance / (1000 * 60)) % 60);
        const seconds = Math.floor((distance / 1000) % 60);

        if (elements[0]) {
            elements[0].textContent = String(days).padStart(2, '0');
        }
        if (elements[1]) {
            elements[1].textContent = String(hours).padStart(2, '0');
        }
        if (elements[2]) {
            elements[2].textContent = String(minutes).padStart(2, '0');
        }
        if (elements[3]) {
            elements[3].textContent = String(seconds).padStart(2, '0');
        }
    };

    const heroDate = new Date();
    heroDate.setDate(heroDate.getDate() + 2);
    const flashDate = new Date();
    flashDate.setHours(flashDate.getHours() + 8);

    setInterval(() => {
        updateCountdown(heroDate.getTime(), [
            document.getElementById('countdown-days'),
            document.getElementById('countdown-hours'),
            document.getElementById('countdown-minutes'),
            document.getElementById('countdown-seconds')
        ]);
        updateCountdown(flashDate.getTime(), [
            null,
            document.getElementById('flash-hours'),
            document.getElementById('flash-minutes'),
            document.getElementById('flash-seconds')
        ]);
    }, 1000);
});
