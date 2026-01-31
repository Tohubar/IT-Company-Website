const navToggle = document.querySelector('.nav-toggle');
const siteNav = document.querySelector('.site-nav');

if (navToggle && siteNav) {
    navToggle.addEventListener('click', () => {
        const isOpen = siteNav.classList.toggle('is-open');
        navToggle.setAttribute('aria-expanded', String(isOpen));
    });
}

const ageGate = document.getElementById('age-gate');
const ageConfirm = document.getElementById('age-confirm');
const ageDecline = document.getElementById('age-decline');
const AGE_KEY = 'velvet-bliss-age-verified';

const hideAgeGate = () => {
    if (ageGate) {
        ageGate.classList.add('hidden');
    }
};

if (localStorage.getItem(AGE_KEY) === 'true') {
    hideAgeGate();
}

if (ageConfirm) {
    ageConfirm.addEventListener('click', () => {
        localStorage.setItem(AGE_KEY, 'true');
        hideAgeGate();
    });
}

if (ageDecline) {
    ageDecline.addEventListener('click', () => {
        window.location.href = 'https://www.google.com';
    });
}
