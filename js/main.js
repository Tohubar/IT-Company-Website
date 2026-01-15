$(document).ready(function(){
    const header = document.querySelector('.site-header');
    const menuToggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('.nav');
    const cartTrigger = document.querySelector('.cart-trigger');
    const miniCart = document.querySelector('.mini-cart');
    const miniCartClose = document.querySelector('.mini-cart-close');
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    const cartCount = document.querySelector('.cart-count');

    const toggleHeader = () => {
        if (window.scrollY > 40) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    };

    toggleHeader();
    window.addEventListener('scroll', toggleHeader);

    menuToggle.addEventListener('click', () => {
        nav.classList.toggle('open');
    });

    const openMiniCart = () => {
        miniCart.classList.add('open');
    };

    const closeMiniCart = () => {
        miniCart.classList.remove('open');
    };

    cartTrigger.addEventListener('click', openMiniCart);
    miniCartClose.addEventListener('click', closeMiniCart);

    addToCartButtons.forEach((button) => {
        button.addEventListener('click', () => {
            openMiniCart();
            const currentCount = parseInt(cartCount.textContent, 10) || 0;
            cartCount.textContent = currentCount + 1;
        });
    });
});
