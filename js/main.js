const navToggle = document.querySelector('.nav-toggle');
const nav = document.querySelector('.nav');
const cartCount = document.getElementById('cartCount');
const cartIcon = document.getElementById('cartIcon');
const addToCartButtons = document.querySelectorAll('.add-to-cart');
const ageGate = document.getElementById('ageGate');
const confirmAge = document.getElementById('confirmAge');

if (navToggle) {
  navToggle.addEventListener('click', () => {
    nav.classList.toggle('open');
  });
}

const cartState = {
  count: 0,
};

const updateCart = () => {
  cartCount.textContent = cartState.count;
  if (cartState.count > 0) {
    cartIcon.parentElement.classList.add('active');
  } else {
    cartIcon.parentElement.classList.remove('active');
  }
};

addToCartButtons.forEach((button) => {
  button.addEventListener('click', () => {
    cartState.count += 1;
    updateCart();
  });
});

const hideAgeGate = () => {
  if (ageGate) {
    ageGate.style.display = 'none';
  }
};

if (confirmAge) {
  confirmAge.addEventListener('click', () => {
    localStorage.setItem('velvetAgeVerified', 'true');
    hideAgeGate();
  });
}

if (localStorage.getItem('velvetAgeVerified') === 'true') {
  hideAgeGate();
}

const carousel = document.getElementById('trendingCarousel');
if (carousel) {
  const track = carousel.querySelector('.carousel-track');
  const items = Array.from(track.children);
  let index = 0;

  const updateCarousel = () => {
    items.forEach((item, i) => {
      item.style.transform = `translateX(${(i - index) * 105}%)`;
    });
  };

  carousel.querySelector('.prev').addEventListener('click', () => {
    index = (index - 1 + items.length) % items.length;
    updateCarousel();
  });

  carousel.querySelector('.next').addEventListener('click', () => {
    index = (index + 1) % items.length;
    updateCarousel();
  });

  updateCarousel();
}
