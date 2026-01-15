const menuToggle = document.querySelector('.menu-toggle');
const navbar = document.querySelector('.navbar');
const cartButton = document.getElementById('cartButton');
const miniCart = document.getElementById('miniCart');
const cartCount = document.getElementById('cartCount');
const wishlistCount = document.getElementById('wishlistCount');
const quickAddButtons = document.querySelectorAll('.quick-add');
const wishlistButtons = document.querySelectorAll('.wishlist');
const searchInput = document.getElementById('searchInput');
const searchSuggestions = document.getElementById('searchSuggestions');
const thumbnails = document.querySelectorAll('.thumbnail');
const mainProductImage = document.getElementById('mainProductImage');
const fitForm = document.getElementById('fitForm');
const fitResult = document.getElementById('fitResult');

const suggestions = [
  '34B blush lace bra',
  'cotton seamless brief',
  'lace lingerie set',
  'wireless bralette',
  'maternity support'
];

menuToggle?.addEventListener('click', () => {
  navbar.classList.toggle('active');
});

cartButton?.addEventListener('click', () => {
  miniCart.classList.toggle('active');
});

quickAddButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const currentCount = Number(cartCount.textContent);
    cartCount.textContent = currentCount + 1;
    miniCart.classList.add('active');
  });
});

wishlistButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const currentCount = Number(wishlistCount.textContent);
    wishlistCount.textContent = currentCount + 1;
    button.classList.toggle('active');
  });
});

searchInput?.addEventListener('input', (event) => {
  const value = event.target.value.toLowerCase();
  if (!value) {
    searchSuggestions.classList.remove('active');
    searchSuggestions.innerHTML = '';
    return;
  }
  const filtered = suggestions.filter((item) => item.includes(value));
  searchSuggestions.innerHTML = filtered.map((item) => `<p>${item}</p>`).join('');
  searchSuggestions.classList.add('active');
});

searchSuggestions?.addEventListener('click', (event) => {
  if (event.target.tagName === 'P') {
    searchInput.value = event.target.textContent;
    searchSuggestions.classList.remove('active');
  }
});

thumbnails.forEach((thumb) => {
  thumb.addEventListener('click', () => {
    thumbnails.forEach((item) => item.classList.remove('active'));
    thumb.classList.add('active');
    mainProductImage.src = thumb.src.replace('w=300', 'w=900');
  });
});

fitForm?.addEventListener('submit', (event) => {
  event.preventDefault();
  fitResult.textContent = 'Suggested size: 34B · Lightly supportive fit.';
});

window.addEventListener('click', (event) => {
  if (!miniCart.contains(event.target) && !cartButton.contains(event.target)) {
    miniCart.classList.remove('active');
  }
});
