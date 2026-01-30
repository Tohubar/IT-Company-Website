const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');
const header = document.querySelector('.site-header');

if (menuToggle) {
    menuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        menuToggle.classList.toggle('open');
    });
}

window.addEventListener('scroll', () => {
    if (window.scrollY > 20) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

const countdownTimer = document.querySelector('.countdown-timer');
const timerFields = {
    days: document.getElementById('days'),
    hours: document.getElementById('hours'),
    minutes: document.getElementById('minutes'),
    seconds: document.getElementById('seconds')
};

if (countdownTimer) {
    const endTime = new Date(countdownTimer.dataset.endtime).getTime();
    const updateTimer = () => {
        const now = new Date().getTime();
        const distance = Math.max(endTime - now, 0);
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((distance / (1000 * 60)) % 60);
        const seconds = Math.floor((distance / 1000) % 60);
        timerFields.days.textContent = String(days).padStart(2, '0');
        timerFields.hours.textContent = String(hours).padStart(2, '0');
        timerFields.minutes.textContent = String(minutes).padStart(2, '0');
        timerFields.seconds.textContent = String(seconds).padStart(2, '0');
    };
    updateTimer();
    setInterval(updateTimer, 1000);
}

const flashTimer = document.getElementById('flash-timer');
if (flashTimer) {
    let totalSeconds = 6 * 60 * 60 + 12 * 60 + 45;
    setInterval(() => {
        totalSeconds = totalSeconds > 0 ? totalSeconds - 1 : 0;
        const hours = String(Math.floor(totalSeconds / 3600)).padStart(2, '0');
        const minutes = String(Math.floor((totalSeconds % 3600) / 60)).padStart(2, '0');
        const seconds = String(totalSeconds % 60).padStart(2, '0');
        flashTimer.textContent = `${hours}:${minutes}:${seconds}`;
    }, 1000);
}

const revealElements = document.querySelectorAll('.reveal');
const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
        }
    });
}, { threshold: 0.2 });

revealElements.forEach((el) => observer.observe(el));

const track = document.querySelector('.carousel-track');
const items = document.querySelectorAll('.carousel-item');
const nextButton = document.querySelector('.carousel-control.next');
const prevButton = document.querySelector('.carousel-control.prev');
let currentIndex = 0;

const getMaxIndex = (itemWidth) => {
    if (!track) return 0;
    const visibleCount = Math.max(Math.floor(track.parentElement.offsetWidth / itemWidth), 1);
    return Math.max(items.length - visibleCount, 0);
};

const updateCarousel = () => {
    if (!track || items.length === 0) return;
    const itemWidth = items[0].getBoundingClientRect().width + 20;
    const maxIndex = getMaxIndex(itemWidth);
    if (currentIndex > maxIndex) {
        currentIndex = 0;
    }
    if (currentIndex < 0) {
        currentIndex = maxIndex;
    }
    track.style.transform = `translateX(-${currentIndex * itemWidth}px)`;
};

if (nextButton && prevButton) {
    nextButton.addEventListener('click', () => {
        currentIndex += 1;
        updateCarousel();
    });

    prevButton.addEventListener('click', () => {
        currentIndex -= 1;
        updateCarousel();
    });
}

window.addEventListener('resize', updateCarousel);

if (track) {
    updateCarousel();
    setInterval(() => {
        currentIndex += 1;
        updateCarousel();
    }, 4000);
}
