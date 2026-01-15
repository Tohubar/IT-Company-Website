const bannerCloses = document.querySelectorAll('[data-banner-close]');
const banners = document.querySelectorAll('[data-banner]');

bannerCloses.forEach((button) => {
  button.addEventListener('click', () => {
    const banner = button.closest('[data-banner]');
    if (banner) {
      banner.style.display = 'none';
    }
  });
});

const cart = document.querySelector('[data-cart]');
const cartToggle = document.querySelector('[data-cart-toggle]');
const cartClose = document.querySelector('[data-cart-close]');
const cartCount = document.querySelector('[data-cart-count]');
const cartItemsPanel = document.querySelector('[data-cart-items-panel]');
const cartItemsSummary = document.querySelector('[data-cart-items]');
const cartTotalPanel = document.querySelector('[data-cart-total-panel]');
const cartTotal = document.querySelector('[data-cart-total]');

const cartState = [];

const updateCartUI = () => {
  const total = cartState.reduce((sum, item) => sum + item.price, 0);
  cartCount.textContent = cartState.length;
  cartTotalPanel.textContent = `$${total.toFixed(2)}`;
  cartTotal.textContent = `$${total.toFixed(2)}`;

  const renderItems = (container) => {
    container.innerHTML = '';
    if (!cartState.length) {
      const empty = document.createElement('li');
      empty.textContent = 'Your cart is empty.';
      container.appendChild(empty);
      return;
    }

    cartState.forEach((item) => {
      const li = document.createElement('li');
      li.className = 'cart-item';
      li.innerHTML = `<span>${item.name}</span><strong>$${item.price.toFixed(2)}</strong>`;
      container.appendChild(li);
    });
  };

  renderItems(cartItemsPanel);
  renderItems(cartItemsSummary);
};

cartToggle.addEventListener('click', () => {
  cart.classList.add('open');
});

cartClose.addEventListener('click', () => {
  cart.classList.remove('open');
});

const addButtons = document.querySelectorAll('[data-add-cart]');
addButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const name = button.dataset.name;
    const price = Number(button.dataset.price);
    cartState.push({ name, price });
    updateCartUI();
    cart.classList.add('open');
  });
});

const wishlistButtons = document.querySelectorAll('[data-wishlist]');
wishlistButtons.forEach((button) => {
  button.addEventListener('click', () => {
    button.classList.toggle('active');
    button.textContent = button.classList.contains('active') ? 'Saved' : 'Wishlist';
  });
});

const sizeModal = document.querySelector('[data-size-modal]');
const openSizeGuide = document.querySelector('[data-size-guide]');
const closeSizeGuide = document.querySelector('[data-size-close]');

openSizeGuide.addEventListener('click', () => {
  sizeModal.classList.add('active');
});

closeSizeGuide.addEventListener('click', () => {
  sizeModal.classList.remove('active');
});

sizeModal.addEventListener('click', (event) => {
  if (event.target === sizeModal) {
    sizeModal.classList.remove('active');
  }
});

const fitForm = document.querySelector('[data-fit-form]');
const fitResult = document.querySelector('[data-fit-result]');

fitForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const bust = Number(fitForm.elements.bust.value);
  const underbust = Number(fitForm.elements.underbust.value);
  const size = bust - underbust <= 4 ? 'XS' : bust - underbust <= 6 ? 'S' : bust - underbust <= 8 ? 'M' : 'L';
  fitResult.textContent = `Recommended size: ${size} (based on your measurements)`;
});

const searchInput = document.getElementById('searchInput');
const suggestionsBox = document.getElementById('searchSuggestions');
const suggestions = ['Lace bralette', 'Silk balconette', 'Seamless panties', 'Luxe sets', 'Cotton essentials'];

searchInput.addEventListener('input', () => {
  const value = searchInput.value.toLowerCase();
  suggestionsBox.innerHTML = '';
  if (!value) {
    suggestionsBox.classList.remove('active');
    return;
  }
  suggestions.filter((item) => item.toLowerCase().includes(value)).forEach((match) => {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.textContent = match;
    btn.addEventListener('click', () => {
      searchInput.value = match;
      suggestionsBox.classList.remove('active');
    });
    suggestionsBox.appendChild(btn);
  });
  suggestionsBox.classList.add('active');
});

const filters = {
  size: document.querySelector('[data-filter-size]'),
  material: document.querySelector('[data-filter-material]'),
  price: document.querySelector('[data-filter-price]'),
};

const productCards = Array.from(document.querySelectorAll('.product-card'));

const filterProducts = () => {
  const sizeValue = filters.size.value;
  const materialValue = filters.material.value;
  const priceValue = filters.price.value;

  productCards.forEach((card) => {
    const cardPrice = Number(card.dataset.price);
    const matchesSize = sizeValue === 'all' || card.dataset.size === sizeValue;
    const matchesMaterial = materialValue === 'all' || card.dataset.material === materialValue;
    const matchesPrice = priceValue === 'all'
      || (priceValue === 'under50' && cardPrice < 50)
      || (priceValue === '50to80' && cardPrice >= 50 && cardPrice <= 80)
      || (priceValue === 'over80' && cardPrice > 80);

    card.style.display = matchesSize && matchesMaterial && matchesPrice ? 'grid' : 'none';
  });
};

Object.values(filters).forEach((select) => {
  select.addEventListener('change', filterProducts);
});

const viewers = document.querySelectorAll('[data-viewer]');
const rotateElements = document.querySelectorAll('[data-rotate]');
let rotateAngle = 0;

const animateRotation = () => {
  rotateAngle += 0.2;
  rotateElements.forEach((element) => {
    element.style.transform = `rotateX(15deg) rotateY(${rotateAngle}deg)`;
  });
  requestAnimationFrame(animateRotation);
};

animateRotation();

viewers.forEach((viewer) => {
  let isDragging = false;
  let startX = 0;
  let currentY = 0;

  viewer.addEventListener('pointerdown', (event) => {
    isDragging = true;
    startX = event.clientX;
    viewer.setPointerCapture(event.pointerId);
  });

  viewer.addEventListener('pointermove', (event) => {
    if (!isDragging) return;
    const deltaX = event.clientX - startX;
    currentY += deltaX * 0.4;
    viewer.querySelector('[data-rotate]').style.transform = `rotateX(20deg) rotateY(${currentY}deg)`;
    startX = event.clientX;
  });

  viewer.addEventListener('pointerup', () => {
    isDragging = false;
  });
});

const zoomInButtons = document.querySelectorAll('[data-zoom-in]');
const zoomOutButtons = document.querySelectorAll('[data-zoom-out]');

zoomInButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const viewer = button.closest('.viewer');
    if (viewer) viewer.querySelector('[data-rotate]').style.transform += ' scale(1.05)';
  });
});

zoomOutButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const viewer = button.closest('.viewer');
    if (viewer) viewer.querySelector('[data-rotate]').style.transform += ' scale(0.95)';
  });
});

updateCartUI();
