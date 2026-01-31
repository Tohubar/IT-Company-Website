const navToggle = document.getElementById('navToggle');
const primaryNav = document.getElementById('primaryNav');

if (navToggle && primaryNav) {
    navToggle.addEventListener('click', () => {
        const isOpen = primaryNav.classList.toggle('open');
        navToggle.setAttribute('aria-expanded', String(isOpen));
    });
}

const slides = Array.from(document.querySelectorAll('.carousel-slide'));
const dotsContainer = document.getElementById('carouselDots');
let activeIndex = 0;

if (slides.length && dotsContainer) {
    slides.forEach((_, index) => {
        const dot = document.createElement('button');
        dot.setAttribute('type', 'button');
        dot.addEventListener('click', () => {
            setSlide(index);
        });
        dotsContainer.appendChild(dot);
    });

    const dots = Array.from(dotsContainer.children);

    const setSlide = (index) => {
        slides[activeIndex].classList.remove('active');
        dots[activeIndex].classList.remove('active');
        activeIndex = index;
        slides[activeIndex].classList.add('active');
        dots[activeIndex].classList.add('active');
    };

    setSlide(0);

    setInterval(() => {
        const nextIndex = (activeIndex + 1) % slides.length;
        setSlide(nextIndex);
    }, 5000);
}

const toast = document.getElementById('cartToast');
const cartButtons = document.querySelectorAll('.add-to-cart');

if (toast) {
    cartButtons.forEach((button) => {
        button.addEventListener('click', () => {
            toast.classList.add('show');
            clearTimeout(window.toastTimer);
            window.toastTimer = setTimeout(() => {
                toast.classList.remove('show');
            }, 2000);
        });
    });
}

const ageGate = document.getElementById('ageGate');
const confirmAge = document.getElementById('confirmAge');
const denyAge = document.getElementById('denyAge');

if (ageGate) {
    const isConfirmed = localStorage.getItem('ageConfirmed');
    if (isConfirmed) {
        ageGate.classList.add('hidden');
        ageGate.setAttribute('aria-hidden', 'true');
    } else {
        ageGate.setAttribute('aria-hidden', 'false');
    }

    if (confirmAge) {
        confirmAge.addEventListener('click', () => {
            localStorage.setItem('ageConfirmed', 'true');
            ageGate.classList.add('hidden');
            ageGate.setAttribute('aria-hidden', 'true');
        });
    }

    if (denyAge) {
        denyAge.addEventListener('click', () => {
            window.location.href = 'https://www.google.com';
        });
    }
}
