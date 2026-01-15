const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');
const searchInput = document.getElementById('searchInput');
const searchSuggestions = document.getElementById('searchSuggestions');
const cartCount = document.getElementById('cartCount');
const miniCart = document.getElementById('miniCart');
const miniCartCount = document.getElementById('miniCartCount');
const miniCartAmount = document.getElementById('miniCartAmount');
const miniCartItems = document.getElementById('miniCartItems');
const miniCartTotal = document.getElementById('miniCartTotal');
const closeMiniCart = document.getElementById('closeMiniCart');
const fitForm = document.getElementById('fit-finder');
const fitResult = document.getElementById('fitResult');
const sortSelect = document.getElementById('sortSelect');
const productGrid = document.getElementById('productGrid');

let cartItems = 0;
let cartTotal = 0;

const suggestions = [
  'Lacy bras',
  'Cotton panties',
  'Lavender set',
  'Seamless bralette',
  'Sports underwear',
  'Size guide 34B'
];

navToggle?.addEventListener('click', () => {
  navLinks?.classList.toggle('open');
});

const renderSuggestions = (value) => {
  const filtered = suggestions.filter((item) => item.toLowerCase().includes(value.toLowerCase()));
  searchSuggestions.innerHTML = '';
  if (!value || filtered.length === 0) {
    searchSuggestions.style.display = 'none';
    return;
  }
  filtered.forEach((item) => {
    const li = document.createElement('li');
    li.textContent = item;
    li.addEventListener('click', () => {
      searchInput.value = item;
      searchSuggestions.style.display = 'none';
    });
    searchSuggestions.appendChild(li);
  });
  searchSuggestions.style.display = 'flex';
};

searchInput?.addEventListener('input', (event) => {
  renderSuggestions(event.target.value);
});

const updateCart = (price) => {
  cartItems += 1;
  cartTotal += price;
  cartCount.textContent = cartItems;
  miniCartCount.textContent = cartItems;
  miniCartAmount.textContent = `$${cartTotal.toFixed(2)}`;
  miniCartItems.textContent = cartItems;
  miniCartTotal.textContent = `$${cartTotal.toFixed(2)}`;
  miniCart.style.display = 'block';
};

const quickAddButtons = document.querySelectorAll('.add-cart');
quickAddButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const card = button.closest('.product-card');
    const price = Number(card?.dataset.price || 0);
    updateCart(price);
  });
});

closeMiniCart?.addEventListener('click', () => {
  miniCart.style.display = 'none';
});

const wishlistButtons = document.querySelectorAll('.wishlist');
wishlistButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const icon = button.querySelector('i');
    icon?.classList.toggle('fas');
    icon?.classList.toggle('far');
  });
});

fitForm?.addEventListener('submit', (event) => {
  event.preventDefault();
  const height = Number(document.getElementById('heightInput').value);
  const weight = Number(document.getElementById('weightInput').value);
  const preference = document.getElementById('fitPreference').value;
  if (!height || !weight) {
    fitResult.textContent = 'Please add height and weight for a recommendation.';
    return;
  }
  let size = 'S';
  if (weight > 140 || height > 65) {
    size = 'M';
  }
  if (weight > 170 || height > 70) {
    size = 'L';
  }
  if (preference === 'snug') {
    size = size === 'S' ? 'XS' : size;
  }
  if (preference === 'relaxed') {
    size = size === 'L' ? 'XL' : size;
  }
  fitResult.textContent = `Recommended size: ${size} (based on your preferences).`;
});

const filterButtons = document.querySelectorAll('.filters .chip');
filterButtons.forEach((button) => {
  button.addEventListener('click', () => {
    filterButtons.forEach((btn) => btn.classList.remove('active'));
    button.classList.add('active');
    const filter = button.dataset.filter;
    document.querySelectorAll('.product-card').forEach((card) => {
      if (filter === 'all' || card.dataset.category === filter) {
        card.style.display = 'block';
      } else {
        card.style.display = 'none';
      }
    });
  });
});

sortSelect?.addEventListener('change', () => {
  const cards = Array.from(document.querySelectorAll('.product-card'));
  const value = sortSelect.value;
  const sorted = cards.sort((a, b) => {
    const priceA = Number(a.dataset.price);
    const priceB = Number(b.dataset.price);
    const ratingA = Number(a.dataset.rating);
    const ratingB = Number(b.dataset.rating);
    if (value === 'low') return priceA - priceB;
    if (value === 'high') return priceB - priceA;
    if (value === 'rating') return ratingB - ratingA;
    if (value === 'new') return ratingB - ratingA;
    return 0;
  });
  productGrid.innerHTML = '';
  sorted.forEach((card) => productGrid.appendChild(card));
});

const reviewButtons = document.querySelectorAll('.review-filters .chip');
reviewButtons.forEach((button) => {
  button.addEventListener('click', () => {
    reviewButtons.forEach((btn) => btn.classList.remove('active'));
    button.classList.add('active');
    const filter = button.dataset.review;
    document.querySelectorAll('.review-card').forEach((card) => {
      if (filter === 'all' || card.dataset.review === filter) {
        card.style.display = 'block';
      } else {
        card.style.display = 'none';
      }
    });
  });
});

const revealElements = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.2 }
);

revealElements.forEach((element) => {
  revealObserver.observe(element);
});

window.addEventListener('click', (event) => {
  if (!event.target.closest('.search')) {
    searchSuggestions.style.display = 'none';
  }
});
