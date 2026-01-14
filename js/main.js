const courseGrid = document.getElementById("courseGrid");
const courseCount = document.getElementById("courseCount");
const searchForm = document.getElementById("searchForm");
const courseSearch = document.getElementById("courseSearch");
const difficultyFilter = document.getElementById("difficultyFilter");
const formatFilter = document.getElementById("formatFilter");
const durationFilter = document.getElementById("durationFilter");
const modeToggle = document.querySelector(".mode-toggle");
const navToggle = document.querySelector(".nav-toggle");
const navMenu = document.getElementById("navMenu");
const breadcrumbCurrent = document.getElementById("breadcrumbCurrent");
const chatToggle = document.getElementById("chatToggle");
const chatWidget = document.getElementById("chatWidget");

const sections = document.querySelectorAll("section[id]");
const fadeIns = document.querySelectorAll(".fade-in");

const applyTheme = (theme) => {
  document.body.setAttribute("data-theme", theme);
  const isDark = theme === "dark";
  modeToggle.setAttribute("aria-pressed", isDark.toString());
  modeToggle.innerHTML = isDark
    ? "<i class=\"fa-solid fa-sun\"></i><span>Light</span>"
    : "<i class=\"fa-solid fa-moon\"></i><span>Dark</span>";
};

const savedTheme = localStorage.getItem("theme") || "light";
applyTheme(savedTheme);

modeToggle.addEventListener("click", () => {
  const current = document.body.getAttribute("data-theme") || "light";
  const next = current === "light" ? "dark" : "light";
  localStorage.setItem("theme", next);
  applyTheme(next);
});

navToggle.addEventListener("click", () => {
  const isOpen = navMenu.classList.toggle("open");
  navToggle.setAttribute("aria-expanded", isOpen.toString());
});

const filterCourses = () => {
  const query = courseSearch.value.toLowerCase();
  const difficulty = difficultyFilter.value;
  const format = formatFilter.value;
  const duration = durationFilter.value;
  let visible = 0;

  courseGrid.querySelectorAll(".course-card").forEach((card) => {
    const matchesQuery = card.textContent.toLowerCase().includes(query);
    const matchesDifficulty = !difficulty || card.dataset.difficulty === difficulty;
    const matchesFormat = !format || card.dataset.format === format;
    const matchesDuration = !duration || card.dataset.duration === duration;

    if (matchesQuery && matchesDifficulty && matchesFormat && matchesDuration) {
      card.style.display = "block";
      visible += 1;
    } else {
      card.style.display = "none";
    }
  });

  courseCount.textContent = `Showing ${visible} program${visible === 1 ? "" : "s"}`;
};

searchForm.addEventListener("submit", (event) => {
  event.preventDefault();
  filterCourses();
});

[courseSearch, difficultyFilter, formatFilter, durationFilter].forEach((input) => {
  input.addEventListener("input", filterCourses);
});

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      }
    });
  },
  { threshold: 0.2 }
);

fadeIns.forEach((item) => observer.observe(item));

const updateBreadcrumb = () => {
  let activeSection = "Innovation";
  sections.forEach((section) => {
    const rect = section.getBoundingClientRect();
    if (rect.top <= 120 && rect.bottom >= 120) {
      activeSection = section.id.replace(/-/g, " ");
    }
  });
  breadcrumbCurrent.textContent = activeSection.replace(/^\w/, (c) => c.toUpperCase());
};

window.addEventListener("scroll", updateBreadcrumb);
updateBreadcrumb();

if (chatToggle && chatWidget) {
  chatToggle.addEventListener("click", () => {
    const isOpen = chatWidget.style.display === "block";
    chatWidget.style.display = isOpen ? "none" : "block";
    chatToggle.textContent = isOpen ? "Open Chat" : "Close Chat";
  });
}

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("./sw.js").catch(() => null);
  });
}

filterCourses();
