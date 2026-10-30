const menuBtn = document.getElementById("menuBtn");
const panel = document.getElementById("mobileMenu");
const backdrop = document.getElementById("backdrop");
const drawer = document.getElementById("drawer");
let closeTimer;

function setMenu(open) {
  clearTimeout(closeTimer);
  menuBtn.setAttribute("aria-expanded", open);
  menuBtn.setAttribute("aria-label", open ? "Close menu" : "Open menu");
  panel.setAttribute("aria-hidden", !open);
  document.body.classList.toggle("overflow-hidden", open);

  if (open) {
    panel.classList.remove("invisible");
    requestAnimationFrame(() => {
      backdrop.classList.remove("opacity-0");
      backdrop.classList.add("opacity-100");
      drawer.classList.remove("translate-x-full");
    });
  } else {
    backdrop.classList.remove("opacity-100");
    backdrop.classList.add("opacity-0");
    drawer.classList.add("translate-x-full");
    closeTimer = setTimeout(() => panel.classList.add("invisible"), 300);
  }
}

const isOpen = () => menuBtn.getAttribute("aria-expanded") === "true";

menuBtn.addEventListener("click", () => setMenu(!isOpen()));
backdrop.addEventListener("click", () => setMenu(false));
drawer.querySelectorAll("a").forEach((a) => a.addEventListener("click", () => setMenu(false)));

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && isOpen()) {
    setMenu(false);
    menuBtn.focus();
  }
});

window.addEventListener("resize", () => {
  if (window.innerWidth >= 640 && isOpen()) setMenu(false);
});
