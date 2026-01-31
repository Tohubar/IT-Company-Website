const header = document.querySelector('.header');
const navToggle = document.querySelector('.nav-toggle');
const navbar = document.querySelector('.navbar');
const bookingForm = document.getElementById('booking-form');
const bookingSummary = document.querySelector('.booking-summary');
const filters = {
    category: document.getElementById('filter-category'),
    price: document.getElementById('filter-price'),
    occupancy: document.getElementById('filter-occupancy'),
    view: document.getElementById('filter-view')
};
const resetFilters = document.getElementById('reset-filters');
const roomCards = document.querySelectorAll('.room-card');

const roomRates = {
    standard: 220,
    deluxe: 320,
    suite: 480
};

const priceBand = (price) => {
    if (price < 250) return 'low';
    if (price <= 400) return 'mid';
    return 'high';
};

const calculateNights = (checkin, checkout) => {
    const start = new Date(checkin);
    const end = new Date(checkout);
    const diff = end - start;
    return diff > 0 ? Math.ceil(diff / (1000 * 60 * 60 * 24)) : 0;
};

const updateBookingSummary = (message) => {
    bookingSummary.textContent = message;
};

const handleBooking = (event) => {
    event.preventDefault();
    const formData = new FormData(bookingForm);
    const checkin = formData.get('checkin');
    const checkout = formData.get('checkout');
    const roomType = formData.get('roomType');
    const rooms = Number(formData.get('rooms'));
    const guests = Number(formData.get('guests'));

    const nights = calculateNights(checkin, checkout);

    if (!nights) {
        updateBookingSummary('Please select valid check-in and check-out dates.');
        return;
    }

    const baseRate = roomRates[roomType] || 220;
    const extraGuestFee = guests > 2 ? (guests - 2) * 25 : 0;
    const total = (baseRate + extraGuestFee) * rooms * nights;

    updateBookingSummary(
        `Availability confirmed for ${nights} night(s). Estimated total: $${total.toFixed(2)}. A confirmation email will be sent upon booking completion.`
    );
};

const filterRooms = () => {
    const category = filters.category.value;
    const price = filters.price.value;
    const occupancy = filters.occupancy.value;
    const view = filters.view.value;

    roomCards.forEach((card) => {
        const cardCategory = card.dataset.category;
        const cardPrice = priceBand(Number(card.dataset.price));
        const cardOccupancy = card.dataset.occupancy;
        const cardView = card.dataset.view;

        const matchesCategory = category === 'all' || cardCategory === category;
        const matchesPrice = price === 'all' || cardPrice === price;
        const matchesOccupancy = occupancy === 'all' || cardOccupancy === occupancy;
        const matchesView = view === 'all' || cardView === view;

        card.style.display = matchesCategory && matchesPrice && matchesOccupancy && matchesView ? 'block' : 'none';
    });
};

const handleScroll = () => {
    if (window.scrollY > 20) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
};

navToggle.addEventListener('click', () => {
    const isOpen = navbar.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', String(isOpen));
});

navbar.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
        navbar.classList.remove('open');
        navToggle.setAttribute('aria-expanded', 'false');
    });
});

Object.values(filters).forEach((filter) => {
    filter.addEventListener('change', filterRooms);
});

resetFilters.addEventListener('click', () => {
    Object.values(filters).forEach((filter) => {
        filter.value = 'all';
    });
    filterRooms();
});

bookingForm.addEventListener('submit', handleBooking);
window.addEventListener('scroll', handleScroll);

updateBookingSummary('Select your dates to view availability and pricing.');
filterRooms();
