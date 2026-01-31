const ageGate = document.getElementById('ageGate');
const ageAccept = document.getElementById('ageAccept');
const menuToggle = document.getElementById('menuToggle');
const siteNav = document.getElementById('siteNav');
const searchInput = document.getElementById('searchInput');
const filterSize = document.getElementById('filterSize');
const filterPrice = document.getElementById('filterPrice');
const filterMaterial = document.getElementById('filterMaterial');
const filterType = document.getElementById('filterType');
const productGrid = document.getElementById('productGrid');
const faqQuestions = document.querySelectorAll('.faq-question');
const chatWidget = document.getElementById('chatWidget');
const openChat = document.getElementById('openChat');
const closeChat = document.getElementById('closeChat');
const chatForm = document.getElementById('chatForm');
const chatInput = document.getElementById('chatInput');
const chatBody = document.getElementById('chatBody');
const openSearch = document.getElementById('openSearch');

const productCards = Array.from(document.querySelectorAll('.product-card'));

const applyFilters = () => {
  const query = searchInput.value.toLowerCase();
  const size = filterSize.value;
  const price = filterPrice.value;
  const material = filterMaterial.value;
  const type = filterType.value;

  productCards.forEach((card) => {
    const matchesQuery = card.dataset.name.toLowerCase().includes(query);
    const matchesSize = size === 'all' || card.dataset.size === size;
    const matchesPrice = price === 'all' || card.dataset.price === price;
    const matchesMaterial = material === 'all' || card.dataset.material === material;
    const matchesType = type === 'all' || card.dataset.type === type;

    card.style.display = matchesQuery && matchesSize && matchesPrice && matchesMaterial && matchesType ? 'grid' : 'none';
  });
};

const handleAgeGate = () => {
  if (localStorage.getItem('ageVerified') === 'true') {
    ageGate.classList.add('hidden');
  }
};

ageAccept?.addEventListener('click', () => {
  localStorage.setItem('ageVerified', 'true');
  ageGate.classList.add('hidden');
});

menuToggle?.addEventListener('click', () => {
  siteNav.classList.toggle('active');
});

openSearch?.addEventListener('click', () => {
  searchInput.focus();
});

[searchInput, filterSize, filterPrice, filterMaterial, filterType].forEach((el) => {
  el?.addEventListener('input', applyFilters);
  el?.addEventListener('change', applyFilters);
});

faqQuestions.forEach((question) => {
  question.addEventListener('click', () => {
    const answer = question.nextElementSibling;
    const isOpen = answer.style.display === 'block';
    document.querySelectorAll('.faq-answer').forEach((item) => {
      item.style.display = 'none';
    });
    answer.style.display = isOpen ? 'none' : 'block';
  });
});

openChat?.addEventListener('click', () => {
  chatWidget.classList.add('active');
});

closeChat?.addEventListener('click', () => {
  chatWidget.classList.remove('active');
});

chatForm?.addEventListener('submit', (event) => {
  event.preventDefault();
  const message = chatInput.value.trim();
  if (!message) {
    return;
  }
  const userMessage = document.createElement('div');
  userMessage.className = 'chat-message user';
  userMessage.textContent = message;
  chatBody.appendChild(userMessage);

  const botMessage = document.createElement('div');
  botMessage.className = 'chat-message bot';
  botMessage.textContent = 'Thanks! A specialist will reply shortly with personalized recommendations.';
  chatBody.appendChild(botMessage);
  chatBody.scrollTop = chatBody.scrollHeight;
  chatInput.value = '';
});

handleAgeGate();
applyFilters();
