const menuToggle = document.querySelector('.menu-toggle');
const navbar = document.querySelector('.navbar');
const backToTop = document.querySelector('.back-to-top');
const navSearchForm = document.querySelector('.nav-search');
const verseSearch = document.querySelector('#verse-search');
const verseResults = document.querySelectorAll('#verse-results li');
const accordionButtons = document.querySelectorAll('.accordion-btn');

menuToggle.addEventListener('click', () => {
  navbar.classList.toggle('open');
});

document.addEventListener('click', (event) => {
  if (!navbar.contains(event.target) && !menuToggle.contains(event.target)) {
    navbar.classList.remove('open');
  }
});

window.addEventListener('scroll', () => {
  if (window.scrollY > 200) {
    backToTop.classList.add('show');
  } else {
    backToTop.classList.remove('show');
  }
});

backToTop.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

navSearchForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const input = navSearchForm.querySelector('input');
  const query = input.value.trim().toLowerCase();
  if (!query) {
    return;
  }

  const searchable = document.querySelectorAll('[data-search]');
  let matched = null;
  searchable.forEach((item) => {
    if (item.dataset.search.toLowerCase().includes(query)) {
      matched = item;
    }
  });

  if (matched) {
    matched.scrollIntoView({ behavior: 'smooth', block: 'center' });
    matched.classList.add('highlight');
    setTimeout(() => matched.classList.remove('highlight'), 1500);
  }
});

if (verseSearch) {
  verseSearch.addEventListener('input', (event) => {
    const query = event.target.value.trim().toLowerCase();
    verseResults.forEach((item) => {
      const keywords = item.dataset.keywords;
      const text = item.textContent.toLowerCase();
      const show = keywords.includes(query) || text.includes(query) || query.length === 0;
      item.style.display = show ? 'list-item' : 'none';
    });
  });
}

accordionButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const isExpanded = button.getAttribute('aria-expanded') === 'true';
    accordionButtons.forEach((btn) => btn.setAttribute('aria-expanded', 'false'));
    if (!isExpanded) {
      button.setAttribute('aria-expanded', 'true');
    }
  });
});
