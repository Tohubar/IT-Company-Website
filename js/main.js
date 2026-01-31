const ageGate = document.getElementById('ageGate');
const confirmAgeButton = document.getElementById('confirmAge');
const menuToggle = document.querySelector('.menu-toggle');
const siteNav = document.querySelector('.site-nav');
const cartCount = document.getElementById('cartCount');
const addToCartButtons = document.querySelectorAll('.add-to-cart');

const AGE_KEY = 'velvetNoirAgeVerified';

const showAgeGate = () => {
  if (!ageGate) {
    return;
  }
  ageGate.classList.add('active');
  ageGate.setAttribute('aria-hidden', 'false');
};

const hideAgeGate = () => {
  if (!ageGate) {
    return;
  }
  ageGate.classList.remove('active');
  ageGate.setAttribute('aria-hidden', 'true');
};

const initAgeGate = () => {
  if (!ageGate) {
    return;
  }
  const verified = localStorage.getItem(AGE_KEY);
  if (!verified) {
    showAgeGate();
  }
};

if (confirmAgeButton) {
  confirmAgeButton.addEventListener('click', () => {
    localStorage.setItem(AGE_KEY, 'true');
    hideAgeGate();
  });
}

if (menuToggle && siteNav) {
  menuToggle.addEventListener('click', () => {
    siteNav.classList.toggle('active');
  });
}

let cartTotal = 0;
addToCartButtons.forEach((button) => {
  button.addEventListener('click', () => {
    cartTotal += 1;
    if (cartCount) {
      cartCount.textContent = cartTotal;
    }
  });
});

window.addEventListener('DOMContentLoaded', initAgeGate);
