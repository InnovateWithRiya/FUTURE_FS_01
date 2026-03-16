document.documentElement.classList.add("js");

const toggle = document.querySelector(".theme-toggle");
const icon = document.querySelector(".toggle-icon");
const label = document.querySelector(".toggle-text");

const setTheme = (mode) => {
  if (mode === "light") {
    document.documentElement.setAttribute("data-theme", "light");
    icon.textContent = "L";
    label.textContent = "Day";
    return;
  }

  document.documentElement.setAttribute("data-theme", "dark");
  icon.textContent = "D";
  label.textContent = "Night";
};

const storedTheme = localStorage.getItem("portfolio-theme");
const systemPrefersLight = window.matchMedia("(prefers-color-scheme: light)").matches;
const initialTheme = storedTheme || (systemPrefersLight ? "light" : "dark");
setTheme(initialTheme);

toggle.addEventListener("click", () => {
  const currentTheme =
    document.documentElement.getAttribute("data-theme") === "light"
      ? "light"
      : "dark";
  const nextTheme = currentTheme === "light" ? "dark" : "light";
  localStorage.setItem("portfolio-theme", nextTheme);
  setTheme(nextTheme);
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

document.querySelectorAll(".reveal").forEach((section) => {
  observer.observe(section);
});
