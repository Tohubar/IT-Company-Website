const body = document.body;
const themeToggle = document.getElementById('theme-toggle');
const contrastToggle = document.getElementById('contrast-toggle');
const mobileMenu = document.getElementById('mobile-menu');
const mobileNav = document.getElementById('mobile-nav');
const toast = document.getElementById('toast');
const notifyBtn = document.getElementById('notify-btn');

const setTheme = (mode) => {
  if (mode === 'dark') {
    body.classList.add('dark');
    document.documentElement.classList.add('dark');
    themeToggle.textContent = '☀️';
  } else {
    body.classList.remove('dark');
    document.documentElement.classList.remove('dark');
    themeToggle.textContent = '🌙';
  }
  body.dataset.theme = mode;
};

const storedTheme = localStorage.getItem('theme') || 'light';
setTheme(storedTheme);

if (themeToggle) {
  themeToggle.addEventListener('click', () => {
    const nextTheme = body.dataset.theme === 'dark' ? 'light' : 'dark';
    setTheme(nextTheme);
    localStorage.setItem('theme', nextTheme);
  });
}

if (contrastToggle) {
  contrastToggle.addEventListener('click', () => {
    body.classList.toggle('high-contrast');
  });
}

if (mobileMenu) {
  mobileMenu.addEventListener('click', () => {
    mobileNav.classList.toggle('hidden');
  });
}

const showToast = (message) => {
  if (!toast) return;
  toast.textContent = message;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 3000);
};

if (notifyBtn) {
  notifyBtn.addEventListener('click', () => {
    showToast('Festival alerts enabled! Upcoming: Navratri starts in 5 days.');
  });
}

const festivals = [
  { day: 3, title: 'Ganesh Chaturthi' },
  { day: 9, title: 'Radha Ashtami' },
  { day: 15, title: 'Purnima Vrata' },
  { day: 21, title: 'Navratri Begins' },
  { day: 28, title: 'Durga Puja' }
];

const calendar = document.getElementById('calendar');
const festivalList = document.getElementById('festival-list');

if (calendar) {
  const days = Array.from({ length: 30 }, (_, index) => index + 1);
  days.forEach((day) => {
    const dayEl = document.createElement('div');
    const match = festivals.find((fest) => fest.day === day);
    dayEl.className = 'rounded-xl border border-maroon/10 p-2 text-xs dark:border-gold/10';
    if (match) {
      dayEl.classList.add('bg-gold/30', 'text-maroon', 'font-semibold');
      dayEl.innerHTML = `<div>${day}</div><div class="text-[10px]">${match.title}</div>`;
    } else {
      dayEl.textContent = day;
    }
    calendar.appendChild(dayEl);
  });
}

if (festivalList) {
  festivals.forEach((festival) => {
    const li = document.createElement('li');
    li.className = 'flex items-center justify-between rounded-xl border border-maroon/10 px-4 py-2 dark:border-gold/10';
    li.innerHTML = `<span>${festival.title}</span><span class="text-xs">Day ${festival.day}</span>`;
    festivalList.appendChild(li);
  });
}

const searchInputs = document.querySelectorAll('#global-search, #mobile-nav input[type="text"]');
searchInputs.forEach((input) => {
  input.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
      showToast(`Searching for: ${event.target.value}`);
    }
  });
});
