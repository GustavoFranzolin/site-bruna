const navToggle = document.querySelector("[data-nav-toggle]");
const navMenu = document.querySelector("[data-nav-menu]");
const header = document.querySelector("[data-header]");
const teacherPhoto = document.querySelector("[data-teacher-photo]");

if (navToggle && navMenu) {
  // Mobile navigation keeps the same anchor links and closes after each choice.
  navToggle.addEventListener("click", () => {
    const isOpen = navMenu.classList.toggle("is-open");
    navToggle.setAttribute("aria-expanded", String(isOpen));
  });

  navMenu.addEventListener("click", (event) => {
    const link = event.target.closest("a");
    if (!link) return;

    navMenu.classList.remove("is-open");
    navToggle.setAttribute("aria-expanded", "false");
  });
}

document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  // Smooth scrolling accounts for the sticky header so section titles remain visible.
  anchor.addEventListener("click", (event) => {
    const targetId = anchor.getAttribute("href");
    const target = targetId ? document.querySelector(targetId) : null;

    if (!target) return;

    event.preventDefault();
    const headerHeight = header ? header.offsetHeight : 0;
    const top = target.getBoundingClientRect().top + window.scrollY - headerHeight + 1;

    window.scrollTo({
      top,
      behavior: "smooth"
    });
  });
});

document.querySelectorAll(".faq-question").forEach((button) => {
  // Accordion answers use measured height for a smooth open and close interaction.
  button.addEventListener("click", () => {
    const item = button.closest(".faq-item");
    const answer = item ? item.querySelector(".faq-answer") : null;
    const isOpen = button.getAttribute("aria-expanded") === "true";

    button.setAttribute("aria-expanded", String(!isOpen));

    if (!answer) return;
    answer.style.maxHeight = isOpen ? "0px" : `${answer.scrollHeight}px`;
  });
});

if (teacherPhoto) {
  teacherPhoto.addEventListener("error", () => {
    const wrapper = teacherPhoto.closest(".teacher-photo");
    if (wrapper) wrapper.classList.add("is-placeholder");
  });
}
