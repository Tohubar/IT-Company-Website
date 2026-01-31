const navToggle = document.querySelector('.nav-toggle');
const siteNav = document.querySelector('.site-nav');

if (navToggle && siteNav) {
  navToggle.addEventListener('click', () => {
    const isOpen = siteNav.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', isOpen);
  });

  siteNav.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      siteNav.classList.remove('open');
      navToggle.setAttribute('aria-expanded', 'false');
    });
  });
}

const filterCards = ({ searchInput, levelFilter, departmentFilter, cards }) => {
  const searchTerm = searchInput?.value.toLowerCase() || '';
  const level = levelFilter?.value || 'all';
  const department = departmentFilter?.value || 'all';

  cards.forEach((card) => {
    const matchesSearch = card.textContent.toLowerCase().includes(searchTerm);
    const matchesLevel = level === 'all' || card.dataset.level === level;
    const matchesDepartment = department === 'all' || card.dataset.department === department;
    card.style.display = matchesSearch && matchesLevel && matchesDepartment ? 'grid' : 'none';
  });
};

const courseSearch = document.getElementById('course-search');
const levelFilter = document.getElementById('level-filter');
const departmentFilter = document.getElementById('department-filter');
const courseCards = document.querySelectorAll('#course-grid .card');

if (courseSearch && levelFilter && departmentFilter) {
  const handleCourseFilter = () =>
    filterCards({
      searchInput: courseSearch,
      levelFilter,
      departmentFilter,
      cards: courseCards,
    });

  ['input', 'change'].forEach((event) => {
    courseSearch.addEventListener(event, handleCourseFilter);
    levelFilter.addEventListener(event, handleCourseFilter);
    departmentFilter.addEventListener(event, handleCourseFilter);
  });
}

const researchSearch = document.getElementById('research-search');
const researchFilter = document.getElementById('research-filter');
const researchCards = document.querySelectorAll('#research-grid .card');

if (researchSearch && researchFilter) {
  const handleResearchFilter = () => {
    const searchTerm = researchSearch.value.toLowerCase();
    const area = researchFilter.value;

    researchCards.forEach((card) => {
      const matchesSearch = card.textContent.toLowerCase().includes(searchTerm);
      const matchesArea = area === 'all' || card.dataset.area === area;
      card.style.display = matchesSearch && matchesArea ? 'grid' : 'none';
    });
  };

  ['input', 'change'].forEach((event) => {
    researchSearch.addEventListener(event, handleResearchFilter);
    researchFilter.addEventListener(event, handleResearchFilter);
  });
}
