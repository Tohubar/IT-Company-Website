const navToggle = document.querySelector('.nav-toggle');
const navMenu = document.querySelector('.navbar');
const navLinks = document.querySelectorAll('.navbar a');

if (navToggle) {
    navToggle.addEventListener('click', () => {
        const isOpen = navMenu.classList.toggle('open');
        navToggle.setAttribute('aria-expanded', String(isOpen));
    });
}

navLinks.forEach((link) => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('open');
        navToggle.setAttribute('aria-expanded', 'false');
    });
});

const observer = new IntersectionObserver(
    (entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('in-view');
                observer.unobserve(entry.target);
            }
        });
    },
    { threshold: 0.15 }
);

document.querySelectorAll('[data-animate]').forEach((el) => observer.observe(el));

const sections = document.querySelectorAll('section');
const activateNavLink = () => {
    let currentId = '';
    sections.forEach((section) => {
        const sectionTop = section.offsetTop - 120;
        if (window.scrollY >= sectionTop) {
            currentId = section.getAttribute('id');
        }
    });
    navLinks.forEach((link) => {
        link.classList.toggle('active', link.getAttribute('href') === `#${currentId}`);
    });
};

window.addEventListener('scroll', activateNavLink);
activateNavLink();

const ritualSteps = document.querySelectorAll('#ritual-steps li');
const nextStepButton = document.getElementById('next-step');
let currentStep = 0;

const setActiveStep = () => {
    ritualSteps.forEach((step, index) => {
        step.classList.toggle('active', index === currentStep);
    });
};

if (nextStepButton) {
    nextStepButton.addEventListener('click', () => {
        currentStep = (currentStep + 1) % ritualSteps.length;
        setActiveStep();
    });
}

const scriptureSearch = document.getElementById('scripture-search');
const scriptureCards = document.querySelectorAll('#scripture-grid .info-card');

if (scriptureSearch) {
    scriptureSearch.addEventListener('input', (event) => {
        const query = event.target.value.toLowerCase();
        scriptureCards.forEach((card) => {
            const text = card.textContent.toLowerCase();
            card.style.display = text.includes(query) ? 'block' : 'none';
        });
    });
}
