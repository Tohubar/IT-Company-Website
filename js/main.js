const menuToggle = document.querySelector('.menu-toggle');
const siteNav = document.querySelector('.site-nav');
const header = document.querySelector('.site-header');

if (menuToggle && siteNav) {
  menuToggle.addEventListener('click', () => {
    const isOpen = siteNav.classList.toggle('open');
    menuToggle.setAttribute('aria-expanded', isOpen);
  });
}

window.addEventListener('scroll', () => {
  if (window.scrollY > 40) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
});

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  },
  { threshold: 0.2 }
);

document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));

const steps = document.querySelectorAll('.rituals-steps .step');
const stepDetail = document.querySelector('.step-detail');

steps.forEach((step) => {
  step.addEventListener('click', () => {
    steps.forEach((item) => item.classList.remove('active'));
    step.classList.add('active');
    if (stepDetail) {
      stepDetail.innerHTML = `<h4>${step.dataset.title}</h4><p>${step.dataset.detail}</p>`;
    }
  });
});

const deityCards = document.querySelectorAll('.deity-card');

deityCards.forEach((card) => {
  card.addEventListener('mousemove', (event) => {
    const rect = card.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * 6;
    const rotateY = ((x - centerX) / centerX) * -6;
    card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
  });

  card.addEventListener('mouseleave', () => {
    card.style.transform = 'rotateX(0deg) rotateY(0deg)';
  });
});

const searchInput = document.getElementById('site-search');
const searchableItems = document.querySelectorAll('[data-search]');

if (searchInput) {
  searchInput.addEventListener('input', (event) => {
    const query = event.target.value.toLowerCase().trim();
    searchableItems.forEach((item) => {
      const terms = item.dataset.search || '';
      const match = terms.toLowerCase().includes(query) || query === '';
      item.style.display = match ? '' : 'none';
    });
  });
}

const upcomingList = document.getElementById('upcoming-list');
const festivalCards = document.querySelectorAll('.festival-card');

if (upcomingList && festivalCards.length) {
  const festivalData = Array.from(festivalCards).map((card) => {
    const dateValue = card.dataset.date;
    return {
      name: card.querySelector('h3')?.textContent || 'Festival',
      date: dateValue ? new Date(dateValue) : null
    };
  });

  const today = new Date();
  const upcoming = festivalData
    .filter((festival) => festival.date && festival.date >= today)
    .sort((a, b) => a.date - b.date)
    .slice(0, 3);

  upcomingList.innerHTML = upcoming.length
    ? upcoming
        .map(
          (festival) =>
            `<li>${festival.name} • ${festival.date.toLocaleDateString(undefined, {
              month: 'long',
              day: 'numeric',
              year: 'numeric'
            })}</li>`
        )
        .join('')
    : '<li>Stay tuned for upcoming festival dates.</li>';

  const calendarCells = document.querySelectorAll('.calendar-grid .calendar-cell');
  calendarCells.forEach((cell) => {
    if (cell.textContent === today.getDate().toString()) {
      cell.classList.add('highlight');
    }
  });
}

const navLinks = document.querySelectorAll('.site-nav a');

navLinks.forEach((link) => {
  link.addEventListener('click', () => {
    siteNav.classList.remove('open');
    menuToggle.setAttribute('aria-expanded', 'false');
  });
});
