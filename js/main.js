document.addEventListener('DOMContentLoaded', () => {
  const menuToggle = document.querySelector('.menu-toggle');
  const navbar = document.querySelector('.navbar');
  const ageGate = document.getElementById('ageGate');
  const confirmAge = document.getElementById('confirmAge');
  const leaveSite = document.getElementById('leaveSite');
  const cartToast = document.getElementById('cartToast');
  const addToCartButtons = document.querySelectorAll('.add-to-cart');

  if (menuToggle) {
    menuToggle.addEventListener('click', () => {
      navbar.classList.toggle('open');
    });
  }

  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', (event) => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        event.preventDefault();
        navbar.classList.remove('open');
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  const ageVerified = localStorage.getItem('ageVerified');
  if (ageVerified === 'true' && ageGate) {
    ageGate.style.display = 'none';
  }

  if (confirmAge) {
    confirmAge.addEventListener('click', () => {
      localStorage.setItem('ageVerified', 'true');
      ageGate.style.display = 'none';
    });
  }

  if (leaveSite) {
    leaveSite.addEventListener('click', () => {
      window.location.href = 'https://www.google.com';
    });
  }

  addToCartButtons.forEach((button) => {
    button.addEventListener('click', () => {
      cartToast.classList.add('show');
      setTimeout(() => cartToast.classList.remove('show'), 2000);
    });
  });
});
