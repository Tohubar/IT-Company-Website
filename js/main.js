document.addEventListener('DOMContentLoaded', () => {
  const root = document.documentElement;
  const themeToggle = document.querySelector('.theme-toggle');
  const navToggle = document.querySelector('.nav-toggle');
  const header = document.querySelector('.site-header');
  const popup = document.querySelector('.puja-popup');
  const popupClose = document.querySelector('.puja-popup__close');

  const storedTheme = localStorage.getItem('theme');
  if (storedTheme) {
    root.setAttribute('data-theme', storedTheme);
  }

  const updateThemeLabel = () => {
    if (!themeToggle) return;
    const icon = themeToggle.querySelector('.theme-toggle__icon');
    const text = themeToggle.querySelector('.theme-toggle__text');
    const isLight = root.getAttribute('data-theme') === 'light';
    icon.textContent = isLight ? '☀' : '☾';
    text.textContent = isLight ? 'Light' : 'Dark';
  };

  updateThemeLabel();

  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const isLight = root.getAttribute('data-theme') === 'light';
      const nextTheme = isLight ? 'dark' : 'light';
      root.setAttribute('data-theme', nextTheme);
      localStorage.setItem('theme', nextTheme);
      updateThemeLabel();
    });
  }

  if (navToggle && header) {
    navToggle.addEventListener('click', () => {
      header.classList.toggle('nav-open');
    });

    header.querySelectorAll('.nav-links a').forEach((link) => {
      link.addEventListener('click', () => header.classList.remove('nav-open'));
    });
  }

  if (popup && popupClose) {
    const dismissed = sessionStorage.getItem('pujaPopupDismissed');
    if (!dismissed) {
      popup.classList.add('active');
    }

    popupClose.addEventListener('click', () => {
      popup.classList.remove('active');
      sessionStorage.setItem('pujaPopupDismissed', 'true');
    });
  }

  document.querySelectorAll('[data-audio-player]').forEach((player) => {
    const audio = player.querySelector('audio');
    const button = player.querySelector('[data-audio-toggle]');
    const status = player.querySelector('.audio-status');

    if (!audio || !button) return;

    button.addEventListener('click', () => {
      if (audio.paused) {
        audio.play();
        button.textContent = 'Pause';
        if (status) status.textContent = 'Now playing';
      } else {
        audio.pause();
        button.textContent = 'Play';
        if (status) status.textContent = 'Paused';
      }
    });

    audio.addEventListener('ended', () => {
      button.textContent = 'Play';
      if (status) status.textContent = 'Ready to play';
    });
  });

  const calendars = document.querySelectorAll('.puja-calendar');
  if (calendars.length) {
    const today = new Date();
    const month = today.toLocaleString('default', { month: 'long' });
    const year = today.getFullYear();

    calendars.forEach((calendar) => {
      const highlight = calendar.dataset.highlight;
      const highlightDate = highlight ? new Date(highlight) : null;

      const startOfMonth = new Date(year, today.getMonth(), 1);
      const endOfMonth = new Date(year, today.getMonth() + 1, 0);
      const totalDays = endOfMonth.getDate();
      const startDay = startOfMonth.getDay();

      calendar.innerHTML = `
        <h3>${month} ${year}</h3>
        <div class="calendar-grid">
          ${['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
            .map((day) => `<div class="calendar-label">${day}</div>`)
            .join('')}
          ${Array.from({ length: startDay }).map(() => '<div class="calendar-day"></div>').join('')}
          ${Array.from({ length: totalDays })
            .map((_, index) => {
              const day = index + 1;
              const current = new Date(year, today.getMonth(), day);
              const isHighlight =
                highlightDate &&
                current.toDateString() === highlightDate.toDateString();
              return `<div class="calendar-day${isHighlight ? ' highlight' : ''}">${day}</div>`;
            })
            .join('')}
        </div>
      `;
    });
  }
});
