const body = document.body;
const themeToggle = document.querySelector('.theme-toggle');
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');
const popup = document.querySelector('.festival-popup');
const popupClose = document.querySelector('.close-popup');

const setTheme = (mode) => {
    body.classList.toggle('theme-dark', mode === 'dark');
    body.classList.toggle('theme-light', mode === 'light');
    themeToggle.setAttribute('aria-pressed', mode === 'dark');
    themeToggle.innerHTML = mode === 'dark'
        ? '<i class="fa-solid fa-sun"></i><span>Light Mode</span>'
        : '<i class="fa-solid fa-moon"></i><span>Dark Mode</span>';
    localStorage.setItem('theme', mode);
};

const savedTheme = localStorage.getItem('theme') || 'light';
setTheme(savedTheme);

themeToggle.addEventListener('click', () => {
    const isDark = body.classList.contains('theme-dark');
    setTheme(isDark ? 'light' : 'dark');
});

menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('open');
});

navLinks.addEventListener('click', (event) => {
    if (event.target.tagName === 'A') {
        navLinks.classList.remove('open');
    }
});

popupClose.addEventListener('click', () => {
    popup.classList.add('hidden');
});
