"use strict";

(() => {
  const courses = Array.from(document.querySelectorAll("[data-course-reveal]"));
  if (!courses.length) return;

  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  const reveal = (course) => course.classList.add("is-visible");

  courses.forEach((course) => {
    course.addEventListener("focusin", () => reveal(course), { once: true });
  });

  if (reducedMotion.matches || !("IntersectionObserver" in window)) {
    courses.forEach(reveal);
    return;
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      reveal(entry.target);
      observer.unobserve(entry.target);
    });
  }, {
    rootMargin: "0px 0px -12% 0px",
    threshold: 0.18
  });

  courses.forEach((course) => observer.observe(course));
})();
