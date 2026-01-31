const navToggle = document.querySelector('.nav-toggle');
const siteNav = document.querySelector('.site-nav');
const submenuToggle = document.querySelector('.submenu-toggle');
const navLinks = document.querySelectorAll('.nav-list a');

if (navToggle) {
    navToggle.addEventListener('click', () => {
        const isOpen = siteNav.classList.toggle('open');
        navToggle.setAttribute('aria-expanded', String(isOpen));
        navToggle.innerHTML = isOpen ? '<i class="fa-solid fa-xmark"></i>' : '<i class="fa-solid fa-bars"></i>';
    });
}

if (submenuToggle) {
    submenuToggle.addEventListener('click', () => {
        const parent = submenuToggle.closest('.has-submenu');
        const isExpanded = parent.classList.toggle('open');
        submenuToggle.setAttribute('aria-expanded', String(isExpanded));
    });
}

const setActiveLink = () => {
    const scrollPosition = window.scrollY + 120;
    navLinks.forEach((link) => {
        const section = document.querySelector(link.getAttribute('href'));
        if (!section) return;
        const offsetTop = section.offsetTop;
        const offsetBottom = offsetTop + section.offsetHeight;
        if (scrollPosition >= offsetTop && scrollPosition < offsetBottom) {
            navLinks.forEach((item) => item.classList.remove('active'));
            link.classList.add('active');
        }
    });
};

window.addEventListener('scroll', setActiveLink);
window.addEventListener('load', setActiveLink);
