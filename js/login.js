const THEME_KEY = "it-company-theme";
const body = document.body;
const overlay = document.getElementById("overlay");
const themeToggle = document.getElementById("themeToggle");
const passwordToggle = document.getElementById("togglePassword");
const passwordInput = document.getElementById("password");

const applyTheme = (theme) => {
  if (theme === "dark") {
    body.classList.remove("light", "bg-slate-100", "text-slate-900");
    body.classList.add("dark", "bg-slate-900", "text-white");
    overlay.classList.remove("bg-slate-50/70");
    overlay.classList.add("bg-slate-950/70");
    themeToggle.textContent = "Switch to Light";
  } else {
    body.classList.remove("dark", "bg-slate-900", "text-white");
    body.classList.add("light", "bg-slate-100", "text-slate-900");
    overlay.classList.remove("bg-slate-950/70");
    overlay.classList.add("bg-slate-50/70");
    themeToggle.textContent = "Switch to Dark";
  }
};

const savedTheme = localStorage.getItem(THEME_KEY) || "dark";
applyTheme(savedTheme);

themeToggle.addEventListener("click", () => {
  const nextTheme = body.classList.contains("dark") ? "light" : "dark";
  localStorage.setItem(THEME_KEY, nextTheme);
  applyTheme(nextTheme);
});

passwordToggle.addEventListener("click", () => {
  const isHidden = passwordInput.type === "password";
  passwordInput.type = isHidden ? "text" : "password";
  passwordToggle.textContent = isHidden ? "Hide" : "Show";
});

window.addEventListener("load", () => {
  document.body.classList.add("is-loaded");
});
