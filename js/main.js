const root = document.documentElement;
const menuToggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.nav');
const themeToggle = document.querySelector('.theme-toggle');
const backToTop = document.querySelector('.back-to-top');
const languageChips = document.querySelectorAll('.language-switcher .chip');
const tabs = document.querySelectorAll('.tab');
const tabPanels = document.querySelectorAll('.tab-panel');

const applyTheme = (theme) => {
  root.setAttribute('data-theme', theme);
  themeToggle.setAttribute('aria-pressed', theme === 'dark');
  themeToggle.querySelector('.theme-toggle__icon').textContent = theme === 'dark' ? '☀' : '☾';
};

const storedTheme = localStorage.getItem('sanatan-theme');
if (storedTheme) {
  applyTheme(storedTheme);
}

themeToggle.addEventListener('click', () => {
  const nextTheme = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
  applyTheme(nextTheme);
  localStorage.setItem('sanatan-theme', nextTheme);
});

menuToggle.addEventListener('click', () => {
  const isOpen = nav.classList.toggle('is-open');
  menuToggle.setAttribute('aria-expanded', isOpen);
});

nav.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    nav.classList.remove('is-open');
    menuToggle.setAttribute('aria-expanded', 'false');
  });
});

languageChips.forEach((chip) => {
  chip.addEventListener('click', () => {
    languageChips.forEach((item) => item.classList.remove('is-active'));
    chip.classList.add('is-active');
  });
});

tabs.forEach((tab) => {
  tab.addEventListener('click', () => {
    const target = tab.dataset.tab;
    tabs.forEach((item) => {
      item.classList.toggle('is-active', item === tab);
      item.setAttribute('aria-selected', item === tab);
    });
    tabPanels.forEach((panel) => {
      panel.classList.toggle('is-active', panel.dataset.panel === target);
    });
  });
});

window.addEventListener('scroll', () => {
  const shouldShow = window.scrollY > 300;
  backToTop.classList.toggle('is-visible', shouldShow);
});

backToTop.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});
