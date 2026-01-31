document.addEventListener('DOMContentLoaded', () => {
    const menuToggle = document.querySelector('.menu-toggle');
    const navbar = document.querySelector('.navbar');
    const counters = document.querySelectorAll('.counter');
    const filters = document.querySelectorAll('#filter-country, #filter-program, #filter-need');

    if (menuToggle) {
        menuToggle.addEventListener('click', () => {
            navbar.classList.toggle('nav-open');
        });
    }

    const runCounters = () => {
        counters.forEach(counter => {
            const target = Number(counter.dataset.target || 0);
            const updateCount = () => {
                const current = Number(counter.innerText);
                const increment = Math.ceil(target / 80);
                if (current < target) {
                    counter.innerText = Math.min(current + increment, target);
                    requestAnimationFrame(updateCount);
                }
            };
            updateCount();
        });
    };

    runCounters();

    const filterScholarships = () => {
        const selected = {
            country: document.querySelector('#filter-country')?.value || 'all',
            program: document.querySelector('#filter-program')?.value || 'all',
            need: document.querySelector('#filter-need')?.value || 'all'
        };

        document.querySelectorAll('.scholarship-card').forEach(card => {
            const matchesCountry = selected.country === 'all' || card.dataset.country === selected.country;
            const matchesProgram = selected.program === 'all' || card.dataset.program === selected.program;
            const matchesNeed = selected.need === 'all' || card.dataset.need === selected.need;
            card.style.display = matchesCountry && matchesProgram && matchesNeed ? 'block' : 'none';
        });
    };

    if (filters.length) {
        filters.forEach(filter => filter.addEventListener('change', filterScholarships));
    }
});
