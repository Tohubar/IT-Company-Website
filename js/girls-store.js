const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");

if (menuToggle && navLinks) {
  menuToggle.addEventListener("click", () => {
    navLinks.classList.toggle("open");
  });
}

const tabButtons = document.querySelectorAll("[data-tab]");
const tabPanels = document.querySelectorAll(".tab-panel");

if (tabButtons.length) {
  tabButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const target = button.dataset.tab;
      tabButtons.forEach((btn) => btn.classList.remove("active"));
      tabPanels.forEach((panel) => {
        panel.hidden = panel.dataset.panel !== target;
      });
      button.classList.add("active");
    });
  });
}

const quantityControls = document.querySelectorAll(".quantity-control");

quantityControls.forEach((control) => {
  const input = control.querySelector("input");
  const minus = control.querySelector(".qty-minus");
  const plus = control.querySelector(".qty-plus");

  if (!input || !minus || !plus) return;

  minus.addEventListener("click", () => {
    const current = parseInt(input.value, 10) || 1;
    input.value = Math.max(1, current - 1);
  });

  plus.addEventListener("click", () => {
    const current = parseInt(input.value, 10) || 1;
    input.value = current + 1;
  });
});
