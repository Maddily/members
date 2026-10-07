const menuBtn = document.querySelector(".menu-btn");
const nav = document.querySelector("nav");

if (window.innerWidth < 640) {
  // Initially hide the nav on mobile screens
  nav && nav.classList.add("nav-collapsed");

  menuBtn && menuBtn.addEventListener("click", toggleMenu);
}

function toggleMenu() {
  const menuIcon = menuBtn.querySelector(".menu-icon");
  const xIcon = menuBtn.querySelector(".x-icon");

  // Display/hide the navigation
  nav.classList.toggle("nav-collapsed");
  // Switch between menu and close buttons
  menuIcon.classList.toggle("hidden");
  xIcon.classList.toggle("hidden");
}
