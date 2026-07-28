const header = document.querySelector(".site-header");
const menuToggle = document.querySelector(".menu-toggle");
const menuLinks = document.querySelectorAll(".primary-nav a");
const agentCta = document.querySelector(".agent-cta");

function setMenu(open, returnFocus = true) {
  if (!header || !menuToggle) return;

  const wasOpen = header.dataset.open === "true";
  header.dataset.open = String(open);
  menuToggle.setAttribute("aria-expanded", String(open));
  menuToggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
  document.body.classList.toggle("menu-open", open);

  if (open) {
    window.requestAnimationFrame(() => menuLinks[0]?.focus());
  } else if (wasOpen && returnFocus) {
    menuToggle.focus();
  }
}

if (header && menuToggle) {
  menuToggle.addEventListener("click", () => {
    setMenu(header.dataset.open !== "true");
  });

  menuLinks.forEach((link) => {
    link.addEventListener("click", () => setMenu(false, false));
  });

  document.addEventListener("keydown", (event) => {
    const isOpen = header.dataset.open === "true";

    if (event.key === "Escape" && isOpen) {
      setMenu(false);
      return;
    }

    if (event.key !== "Tab" || !isOpen) return;

    const focusableItems = [menuToggle, ...menuLinks, agentCta].filter(Boolean);
    const firstItem = focusableItems[0];
    const lastItem = focusableItems[focusableItems.length - 1];

    if (event.shiftKey && document.activeElement === firstItem) {
      event.preventDefault();
      lastItem.focus();
    } else if (!event.shiftKey && document.activeElement === lastItem) {
      event.preventDefault();
      firstItem.focus();
    }
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth >= 1024) setMenu(false, false);
  });
}
