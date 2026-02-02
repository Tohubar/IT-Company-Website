const navToggle = document.querySelector('.nav-toggle');
const primaryNav = document.querySelector('.primary-nav');
const searchInput = document.querySelector('#search');
const searchTargets = document.querySelectorAll('[data-search]');
const revealTargets = document.querySelectorAll('.reveal');
const festivalCards = document.querySelectorAll('.festival-card');
const yearTarget = document.querySelector('#year');

if (navToggle && primaryNav) {
  navToggle.addEventListener('click', () => {
    const isOpen = primaryNav.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', String(isOpen));
  });
}

if (searchInput) {
  searchInput.addEventListener('input', (event) => {
    const query = event.target.value.trim().toLowerCase();
    searchTargets.forEach((card) => {
      const haystack = card.dataset.search || '';
      const isMatch = haystack.includes(query) || query.length === 0;
      card.style.display = isMatch ? 'block' : 'none';
    });
  });
}

if (yearTarget) {
  yearTarget.textContent = new Date().getFullYear();
}

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  },
  { threshold: 0.2 }
);

revealTargets.forEach((target) => revealObserver.observe(target));

const formatCountdown = (distance) => {
  const days = Math.floor(distance / (1000 * 60 * 60 * 24));
  const hours = Math.floor((distance / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((distance / (1000 * 60)) % 60);
  return `${days}d ${hours}h ${minutes}m to celebration`;
};

const updateFestivalCountdowns = () => {
  const now = new Date().getTime();
  festivalCards.forEach((card) => {
    const targetDate = card.getAttribute('data-date');
    const countdownEl = card.querySelector('.countdown');
    if (!targetDate || !countdownEl) {
      return;
    }
    const distance = new Date(targetDate).getTime() - now;
    countdownEl.textContent = distance > 0 ? formatCountdown(distance) : 'Celebration underway!';
  });
};

updateFestivalCountdowns();
setInterval(updateFestivalCountdowns, 60000);
