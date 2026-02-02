const navToggle = document.querySelector('.nav-toggle');
const navbar = document.querySelector('.navbar');
const searchForm = document.querySelector('.search');
const searchInput = searchForm ? searchForm.querySelector('input') : null;
const revealItems = document.querySelectorAll('.reveal');
const searchableCards = document.querySelectorAll('[data-keywords]');

const toggleMenu = () => {
    navbar.classList.toggle('open');
};

if (navToggle) {
    navToggle.addEventListener('click', toggleMenu);
}

const closeMenuOnScroll = () => {
    if (navbar.classList.contains('open')) {
        navbar.classList.remove('open');
    }
};

window.addEventListener('scroll', closeMenuOnScroll);

const revealObserver = new IntersectionObserver(
    (entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                revealObserver.unobserve(entry.target);
            }
        });
    },
    { threshold: 0.2 }
);

revealItems.forEach((item) => revealObserver.observe(item));

const clearHighlights = () => {
    searchableCards.forEach((card) => card.classList.remove('highlight'));
};

const handleSearch = (event) => {
    event.preventDefault();
    if (!searchInput) {
        return;
    }

    const query = searchInput.value.trim().toLowerCase();
    if (!query) {
        return;
    }

    clearHighlights();

    let matchedElement = null;
    searchableCards.forEach((card) => {
        const keywords = card.dataset.keywords || '';
        if (keywords.toLowerCase().includes(query)) {
            matchedElement = matchedElement || card;
            card.classList.add('highlight');
        }
    });

    if (!matchedElement) {
        const section = document.querySelector(`#${query.replace(/\s+/g, '-')}`);
        if (section) {
            matchedElement = section;
        }
    }

    if (matchedElement) {
        matchedElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
};

if (searchForm) {
    searchForm.addEventListener('submit', handleSearch);
}
