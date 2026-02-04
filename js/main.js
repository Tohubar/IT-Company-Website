const rootElement = document.documentElement;
const themeToggle = document.querySelector(".theme-toggle");
const navToggle = document.querySelector(".nav-toggle");
const navMenu = document.querySelector(".nav-menu");
const tabs = document.querySelectorAll(".tab");
const panels = document.querySelectorAll(".tab-panel");

const setTheme = (theme) => {
  rootElement.setAttribute("data-theme", theme);
  if (themeToggle) {
    const isDark = theme === "dark";
    themeToggle.setAttribute("aria-pressed", String(isDark));
    themeToggle.textContent = isDark
      ? "আলো মোড"
      : "শান্ত রাত্রি মোড";
  }
  localStorage.setItem("theme", theme);
};

const savedTheme = localStorage.getItem("theme");
if (savedTheme) {
  setTheme(savedTheme);
}

themeToggle?.addEventListener("click", () => {
  const current = rootElement.getAttribute("data-theme") || "light";
  setTheme(current === "light" ? "dark" : "light");
});

navToggle?.addEventListener("click", () => {
  const isOpen = navMenu.classList.toggle("open");
  navToggle.setAttribute("aria-expanded", String(isOpen));
});

navMenu?.addEventListener("click", (event) => {
  if (event.target instanceof HTMLAnchorElement) {
    navMenu.classList.remove("open");
    navToggle.setAttribute("aria-expanded", "false");
  }
});

tabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    tabs.forEach((item) => item.classList.remove("active"));
    panels.forEach((panel) => panel.classList.remove("active"));
    tab.classList.add("active");
    const key = tab.getAttribute("data-tab");
    const target = document.querySelector(`[data-tab-panel="${key}"]`);
    target?.classList.add("active");
  });
});
