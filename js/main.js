const body = document.body;
const themeToggle = document.getElementById('themeToggle');
const ageGate = document.getElementById('ageGate');
const ageConfirm = document.getElementById('ageConfirm');
const cartCount = document.getElementById('cartCount');
const cartIcon = document.querySelector('.cart');
const heroSlides = document.querySelectorAll('.hero-slide');
const heroTitle = document.getElementById('heroTitle');
const heroCopy = document.getElementById('heroCopy');
const heroDots = document.getElementById('heroDots');
const priceRange = document.getElementById('priceRange');
const priceValue = document.getElementById('priceValue');
const productCards = document.querySelectorAll('.product-card');
const sizeFilters = document.querySelectorAll('.filter-size');
const typeFilters = document.querySelectorAll('.filter-type');
const paginationButtons = document.querySelectorAll('.page-btn');
const addToCartButtons = document.querySelectorAll('.add-to-cart');

const state = {
    cart: 0,
    currentSlide: 0,
    currentPage: 1,
    itemsPerPage: 4,
};

const applyTheme = (theme) => {
    body.setAttribute('data-theme', theme);
    themeToggle.textContent = theme === 'dark' ? 'Dark Mode' : 'Light Mode';
    themeToggle.setAttribute('aria-pressed', theme === 'light');
};

const storedTheme = localStorage.getItem('theme');
if (storedTheme) {
    applyTheme(storedTheme);
}

themeToggle.addEventListener('click', () => {
    const newTheme = body.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    applyTheme(newTheme);
    localStorage.setItem('theme', newTheme);
});

const storedAge = localStorage.getItem('ageVerified');
if (storedAge === 'true') {
    ageGate.classList.add('hidden');
}

ageConfirm.addEventListener('click', () => {
    localStorage.setItem('ageVerified', 'true');
    ageGate.classList.add('hidden');
});

const updateCart = () => {
    cartCount.textContent = state.cart;
    if (state.cart > 0) {
        cartIcon.classList.add('active');
    }
};

addToCartButtons.forEach((button) => {
    button.addEventListener('click', () => {
        state.cart += 1;
        updateCart();
    });
});

const buildHeroDots = () => {
    heroSlides.forEach((_, index) => {
        const dot = document.createElement('button');
        dot.setAttribute('aria-label', `Slide ${index + 1}`);
        if (index === state.currentSlide) {
            dot.classList.add('active');
        }
        dot.addEventListener('click', () => {
            state.currentSlide = index;
            updateHero();
        });
        heroDots.appendChild(dot);
    });
};

const updateHero = () => {
    heroSlides.forEach((slide, index) => {
        slide.classList.toggle('active', index === state.currentSlide);
    });
    const activeSlide = heroSlides[state.currentSlide];
    heroTitle.textContent = activeSlide.dataset.title;
    heroCopy.textContent = activeSlide.dataset.copy;
    heroDots.querySelectorAll('button').forEach((dot, index) => {
        dot.classList.toggle('active', index === state.currentSlide);
    });
};

buildHeroDots();
updateHero();

setInterval(() => {
    state.currentSlide = (state.currentSlide + 1) % heroSlides.length;
    updateHero();
}, 6000);

const filterProducts = () => {
    const maxPrice = parseInt(priceRange.value, 10);
    const activeSizes = Array.from(sizeFilters).filter((input) => input.checked).map((input) => input.value);
    const activeTypes = Array.from(typeFilters).filter((input) => input.checked).map((input) => input.value);

    const filtered = Array.from(productCards).filter((card) => {
        const price = parseInt(card.dataset.price, 10);
        const size = card.dataset.size;
        const type = card.dataset.type;
        return price <= maxPrice && activeSizes.includes(size) && activeTypes.includes(type);
    });

    renderPagination(filtered);
};

const renderPagination = (filteredCards) => {
    const start = (state.currentPage - 1) * state.itemsPerPage;
    const end = start + state.itemsPerPage;

    productCards.forEach((card) => {
        card.style.display = 'none';
    });

    filteredCards.slice(start, end).forEach((card) => {
        card.style.display = 'grid';
    });

    paginationButtons.forEach((button) => {
        button.classList.toggle('active', parseInt(button.dataset.page, 10) === state.currentPage);
    });
};

priceRange.addEventListener('input', () => {
    priceValue.textContent = `Up to $${priceRange.value}`;
    state.currentPage = 1;
    filterProducts();
});

sizeFilters.forEach((filter) => {
    filter.addEventListener('change', () => {
        state.currentPage = 1;
        filterProducts();
    });
});

typeFilters.forEach((filter) => {
    filter.addEventListener('change', () => {
        state.currentPage = 1;
        filterProducts();
    });
});

paginationButtons.forEach((button) => {
    button.addEventListener('click', () => {
        state.currentPage = parseInt(button.dataset.page, 10);
        filterProducts();
    });
});

filterProducts();

const observer = new IntersectionObserver(
    (entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
            }
        });
    },
    { threshold: 0.2 }
);

document.querySelectorAll('.reveal').forEach((section) => {
    observer.observe(section);
});
