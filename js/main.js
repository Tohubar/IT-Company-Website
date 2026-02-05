const navToggle = document.querySelector('.nav-toggle');
const navMenu = document.querySelector('.nav-menu');

if (navToggle && navMenu) {
  navToggle.addEventListener('click', () => {
    const isOpen = navMenu.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', isOpen);
  });
}

const faqItems = document.querySelectorAll('.faq-item');
faqItems.forEach((item) => {
  const button = item.querySelector('.faq-question');
  button.addEventListener('click', () => {
    const isActive = item.classList.contains('active');
    faqItems.forEach((other) => other.classList.remove('active'));
    if (!isActive) {
      item.classList.add('active');
    }
  });
});

const copyButtons = document.querySelectorAll('.copy-btn');
copyButtons.forEach((button) => {
  button.addEventListener('click', async () => {
    const targetId = button.dataset.copyTarget;
    const text = document.getElementById(targetId)?.textContent?.trim();
    if (!text) {
      return;
    }
    try {
      await navigator.clipboard.writeText(text);
      button.classList.add('copied');
      button.textContent = 'Copied';
      setTimeout(() => {
        button.classList.remove('copied');
        button.textContent = 'Copy';
      }, 1600);
    } catch (error) {
      button.textContent = 'Failed';
    }
  });
});
