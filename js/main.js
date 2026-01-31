const menuToggle = document.querySelector('.menu-toggle');
const navbar = document.querySelector('.navbar');
const globalSearch = document.querySelector('#global-search');
const filterSearch = document.querySelector('#filter-search');
const filterType = document.querySelector('#filter-type');
const filterYear = document.querySelector('#filter-year');
const filterFuel = document.querySelector('#filter-fuel');
const filterTransmission = document.querySelector('#filter-transmission');
const filterPrice = document.querySelector('#filter-price');
const carCards = Array.from(document.querySelectorAll('.car-card'));
const calculateButton = document.querySelector('#calculate');
const paymentOutput = document.querySelector('#payment');
const submenuLinks = document.querySelectorAll('[data-filter]');

const filters = {
  search: '',
  type: 'all',
  year: 'all',
  fuel: 'all',
  transmission: 'all',
  price: 'all',
};

const formatCurrency = (value) =>
  new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(value);

const matchesFilters = (card) => {
  const type = card.dataset.type;
  const year = card.dataset.year;
  const fuel = card.dataset.fuel;
  const transmission = card.dataset.transmission;
  const price = Number(card.dataset.price);
  const text = card.innerText.toLowerCase();

  if (filters.search && !text.includes(filters.search)) return false;
  if (filters.type !== 'all' && filters.type !== type) return false;
  if (filters.year !== 'all' && filters.year !== year) return false;
  if (filters.fuel !== 'all' && filters.fuel !== fuel) return false;
  if (filters.transmission !== 'all' && filters.transmission !== transmission) return false;

  if (filters.price === 'under-30' && price >= 30000) return false;
  if (filters.price === '30-50' && (price < 30000 || price > 50000)) return false;
  if (filters.price === '50-plus' && price <= 50000) return false;

  return true;
};

const applyFilters = () => {
  carCards.forEach((card) => {
    card.style.display = matchesFilters(card) ? 'flex' : 'none';
  });
};

const handleFilterChange = (key, value) => {
  filters[key] = value;
  applyFilters();
};

if (menuToggle) {
  menuToggle.addEventListener('click', () => {
    const isOpen = navbar.classList.toggle('open');
    menuToggle.setAttribute('aria-expanded', isOpen);
  });
}

if (globalSearch) {
  globalSearch.addEventListener('input', (event) => {
    filters.search = event.target.value.toLowerCase();
    applyFilters();
  });
}

if (filterSearch) {
  filterSearch.addEventListener('input', (event) => {
    filters.search = event.target.value.toLowerCase();
    applyFilters();
  });
}

if (filterType) {
  filterType.addEventListener('change', (event) => {
    handleFilterChange('type', event.target.value);
  });
}

if (filterYear) {
  filterYear.addEventListener('change', (event) => {
    handleFilterChange('year', event.target.value);
  });
}

if (filterFuel) {
  filterFuel.addEventListener('change', (event) => {
    handleFilterChange('fuel', event.target.value);
  });
}

if (filterTransmission) {
  filterTransmission.addEventListener('change', (event) => {
    handleFilterChange('transmission', event.target.value);
  });
}

if (filterPrice) {
  filterPrice.addEventListener('change', (event) => {
    handleFilterChange('price', event.target.value);
  });
}

submenuLinks.forEach((link) => {
  link.addEventListener('click', () => {
    const type = link.dataset.filter;
    if (filterType) {
      filterType.value = type;
    }
    handleFilterChange('type', type);
  });
});

if (calculateButton) {
  calculateButton.addEventListener('click', () => {
    const amount = Number(document.querySelector('#loan-amount').value);
    const term = Number(document.querySelector('#loan-term').value);
    const rate = Number(document.querySelector('#loan-rate').value) / 100 / 12;

    if (!amount || !term) {
      paymentOutput.textContent = '$0';
      return;
    }

    const payment = rate === 0
      ? amount / term
      : (amount * rate) / (1 - Math.pow(1 + rate, -term));

    paymentOutput.textContent = formatCurrency(payment);
  });
}

applyFilters();
