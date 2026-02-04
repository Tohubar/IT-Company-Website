const body = document.body;
const themeToggle = document.querySelector('.theme-toggle');
const menuToggle = document.querySelector('.menu-toggle');
const siteNav = document.querySelector('.site-nav');

const setTheme = (theme) => {
    const lightLabel = themeToggle?.dataset.lightLabel || 'Light';
    const darkLabel = themeToggle?.dataset.darkLabel || 'Dark';
    if (theme === 'dark') {
        body.setAttribute('data-theme', 'dark');
        themeToggle.querySelector('.theme-icon').textContent = '☀️';
        themeToggle.querySelector('.theme-label').textContent = lightLabel;
    } else {
        body.removeAttribute('data-theme');
        themeToggle.querySelector('.theme-icon').textContent = '🌙';
        themeToggle.querySelector('.theme-label').textContent = darkLabel;
    }
    localStorage.setItem('theme', theme);
};

const storedTheme = localStorage.getItem('theme');
if (storedTheme) {
    setTheme(storedTheme);
}

themeToggle?.addEventListener('click', () => {
    const current = body.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
    setTheme(current === 'dark' ? 'light' : 'dark');
});

menuToggle?.addEventListener('click', () => {
    const isOpen = siteNav.classList.toggle('open');
    menuToggle.setAttribute('aria-expanded', isOpen);
});

document.querySelectorAll('.site-nav a').forEach((link) => {
    link.addEventListener('click', () => {
        siteNav.classList.remove('open');
        menuToggle.setAttribute('aria-expanded', 'false');
    });
});
