const navToggle = document.querySelector('.nav-toggle');
const navbar = document.querySelector('.navbar');
const backToTop = document.querySelector('.back-to-top');
const techAccordions = document.querySelectorAll('.tech-accordion');

if (navToggle) {
  navToggle.addEventListener('click', () => {
    const isOpen = navbar.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', String(isOpen));
    navToggle.querySelector('i').classList.toggle('fa-times', isOpen);
    navToggle.querySelector('i').classList.toggle('fa-bars', !isOpen);
  });
}

window.addEventListener('scroll', () => {
  if (window.scrollY > 400) {
    backToTop.classList.add('show');
  } else {
    backToTop.classList.remove('show');
  }
});

techAccordions.forEach((accordion) => {
  accordion.addEventListener('click', () => {
    const isActive = accordion.classList.contains('active');
    techAccordions.forEach((item) => {
      item.classList.remove('active');
      item.setAttribute('aria-expanded', 'false');
    });
    if (!isActive) {
      accordion.classList.add('active');
      accordion.setAttribute('aria-expanded', 'true');
    }
  });
});

const navLinks = document.querySelectorAll('.navbar a');
navLinks.forEach((link) => {
  link.addEventListener('click', () => {
    navbar.classList.remove('open');
    if (navToggle) {
      navToggle.setAttribute('aria-expanded', 'false');
      const icon = navToggle.querySelector('i');
      icon.classList.remove('fa-times');
      icon.classList.add('fa-bars');
    }
  });
});
