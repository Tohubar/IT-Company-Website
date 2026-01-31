const navToggle = document.querySelector('.nav-toggle');
const siteNav = document.querySelector('.site-nav');

if (navToggle && siteNav) {
    navToggle.addEventListener('click', () => {
        const isOpen = siteNav.classList.toggle('open');
        navToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });
}

const scriptureSearch = document.querySelector('#scripture-search');
const searchableBlocks = document.querySelectorAll('[data-searchable]');

const filterSearchables = (query) => {
    const normalizedQuery = query.toLowerCase().trim();

    searchableBlocks.forEach((block) => {
        const items = block.querySelectorAll('[data-tags]');
        items.forEach((item) => {
            const tags = item.dataset.tags || '';
            const content = item.textContent.toLowerCase();
            const matches = tags.includes(normalizedQuery) || content.includes(normalizedQuery);
            item.style.display = matches || normalizedQuery.length === 0 ? 'block' : 'none';
        });
    });
};

if (scriptureSearch) {
    scriptureSearch.addEventListener('input', (event) => {
        filterSearchables(event.target.value);
    });
}

const siteSearchForm = document.querySelector('.site-search');

if (siteSearchForm && scriptureSearch) {
    siteSearchForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const query = siteSearchForm.querySelector('input')?.value || '';
        scriptureSearch.value = query;
        filterSearchables(query);
        document.querySelector('#scriptures')?.scrollIntoView({ behavior: 'smooth' });
    });
}
