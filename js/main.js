const slides = Array.from(document.querySelectorAll('.hero-slide'));
const ageGate = document.getElementById('ageGate');
const ageConfirm = document.getElementById('ageConfirm');
const ageDecline = document.getElementById('ageDecline');
const toast = document.getElementById('cartToast');
const addToCartButtons = document.querySelectorAll('.add-to-cart');
const themeToggle = document.getElementById('themeToggle');
const toggleLabel = themeToggle?.querySelector('.toggle-label');
const menuToggle = document.getElementById('menuToggle');
const siteNav = document.getElementById('siteNav');

let slideIndex = 0;

const showSlide = (index) => {
  slides.forEach((slide, idx) => {
    slide.classList.toggle('is-active', idx === index);
  });
};

const startSlider = () => {
  if (!slides.length) return;
  showSlide(slideIndex);
  setInterval(() => {
    slideIndex = (slideIndex + 1) % slides.length;
    showSlide(slideIndex);
  }, 5000);
};

const showToast = () => {
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 2500);
};

addToCartButtons.forEach((button) => {
  button.addEventListener('click', () => {
    showToast();
  });
});

ageConfirm?.addEventListener('click', () => {
  ageGate.style.display = 'none';
});

ageDecline?.addEventListener('click', () => {
  ageGate.querySelector('p').textContent = 'Please return when you are 18+ to continue shopping safely.';
  ageDecline.disabled = true;
});

themeToggle?.addEventListener('click', () => {
  document.body.classList.toggle('light-mode');
  const isLight = document.body.classList.contains('light-mode');
  if (toggleLabel) {
    toggleLabel.textContent = isLight ? 'Light' : 'Dark';
  }
});

menuToggle?.addEventListener('click', () => {
  siteNav.classList.toggle('open');
});

startSlider();
