const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');
const likeButton = document.getElementById('likeButton');
const likeCount = document.getElementById('likeCount');
const androidButton = document.getElementById('androidMode');

if (navToggle) {
  navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('is-open');
  });
}

if (likeButton) {
  likeButton.addEventListener('click', () => {
    const current = Number(likeCount.textContent);
    likeCount.textContent = current + 1;
  });
}

if (androidButton) {
  androidButton.addEventListener('click', () => {
    document.body.classList.toggle('android-mode');
  });
}

document.querySelectorAll('[data-carousel]').forEach((carousel) => {
  const track = carousel.querySelector('[data-carousel-track]');
  const slides = Array.from(track.children);
  let index = 0;

  const update = () => {
    track.style.transform = `translateX(-${index * 100}%)`;
  };

  carousel.querySelectorAll('[data-carousel-button]').forEach((button) => {
    button.addEventListener('click', () => {
      const direction = button.dataset.carouselButton === 'next' ? 1 : -1;
      index = (index + direction + slides.length) % slides.length;
      update();
    });
  });

  setInterval(() => {
    index = (index + 1) % slides.length;
    update();
  }, 6000);
});
