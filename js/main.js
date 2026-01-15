const navToggle = document.querySelector('.nav-toggle');
const primaryNav = document.querySelector('.primary-nav');
const cartToggle = document.querySelector('.cart-toggle');
const miniCart = document.querySelector('.mini-cart');
const closeCart = document.querySelector('.close-cart');
const dropdownToggle = document.querySelector('.dropdown-toggle');

if (navToggle && primaryNav) {
    navToggle.addEventListener('click', () => {
        primaryNav.classList.toggle('open');
    });
}

if (dropdownToggle) {
    dropdownToggle.addEventListener('click', () => {
        const expanded = dropdownToggle.getAttribute('aria-expanded') === 'true';
        dropdownToggle.setAttribute('aria-expanded', (!expanded).toString());
    });
}

if (cartToggle && miniCart) {
    cartToggle.addEventListener('click', () => {
        miniCart.classList.toggle('open');
        miniCart.setAttribute('aria-hidden', (!miniCart.classList.contains('open')).toString());
    });
}

if (closeCart && miniCart) {
    closeCart.addEventListener('click', () => {
        miniCart.classList.remove('open');
        miniCart.setAttribute('aria-hidden', 'true');
    });
}

window.addEventListener('scroll', () => {
    if (window.innerWidth < 900 && primaryNav?.classList.contains('open')) {
        primaryNav.classList.remove('open');
    }
});
