/* =====================================================
   SCROLL PROGRESS BAR
===================================================== */
const scrollProgress = document.getElementById("scrollProgress");

window.addEventListener("scroll", () => {
  const scrollTop = window.scrollY;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  const progress = (scrollTop / docHeight) * 100;
  scrollProgress.style.width = progress + "%";
});

/* =====================================================
   NAVBAR: SCROLLED STATE + ACTIVE LINK HIGHLIGHT
===================================================== */
const navbar = document.getElementById("navbar");
const sections = document.querySelectorAll("section[id]");
const navLinks = document.querySelectorAll(".nav-link");

window.addEventListener("scroll", () => {
  // Scrolled shadow
  navbar.classList.toggle("scrolled", window.scrollY > 30);

  // Active link highlight
  let current = "";
  sections.forEach(section => {
    if (window.scrollY >= section.offsetTop - 100) {
      current = section.getAttribute("id");
    }
  });

  navLinks.forEach(link => {
    link.classList.remove("active");
    if (link.getAttribute("href") === "#" + current) {
      link.classList.add("active");
    }
  });
});

/* =====================================================
   HAMBURGER MENU
===================================================== */
const hamburger = document.getElementById("hamburger");
const mobileMenu = document.getElementById("mobileMenu");

hamburger.addEventListener("click", () => {
  mobileMenu.classList.toggle("open");
});

// Close mobile menu on link click
document.querySelectorAll(".mobile-menu .nav-link").forEach(link => {
  link.addEventListener("click", () => {
    mobileMenu.classList.remove("open");
  });
});

/* =====================================================
   DARK / LIGHT MODE TOGGLE
===================================================== */
const themeToggle = document.getElementById("themeToggle");
const themeIcon = document.getElementById("themeIcon");
const root = document.documentElement;

// Load saved preference
const savedTheme = localStorage.getItem("theme") || "dark";
root.setAttribute("data-theme", savedTheme);
updateThemeIcon(savedTheme);

themeToggle.addEventListener("click", () => {
  const current = root.getAttribute("data-theme");
  const next = current === "dark" ? "light" : "dark";
  root.setAttribute("data-theme", next);
  localStorage.setItem("theme", next);
  updateThemeIcon(next);
});

function updateThemeIcon(theme) {
  themeIcon.className = theme === "dark" ? "fas fa-sun" : "fas fa-moon";
}

/* =====================================================
   TYPING ANIMATION
===================================================== */
const roles = ["MCA Student", "Front-End Developer", "React Developer", "Problem Solver"];
let roleIndex = 0, charIndex = 0;
const typingEl = document.getElementById("typing");

function typeRole() {
  if (charIndex < roles[roleIndex].length) {
    typingEl.textContent += roles[roleIndex].charAt(charIndex++);
    setTimeout(typeRole, 80);
  } else {
    setTimeout(eraseRole, 1800);
  }
}

function eraseRole() {
  if (charIndex > 0) {
    typingEl.textContent = roles[roleIndex].substring(0, --charIndex);
    setTimeout(eraseRole, 45);
  } else {
    roleIndex = (roleIndex + 1) % roles.length;
    setTimeout(typeRole, 300);
  }
}

typeRole();

/* =====================================================
   ANIMATED SKILL BARS (Intersection Observer)
===================================================== */
const skillFills = document.querySelectorAll(".skill-fill");

const skillObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("animated");
      skillObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.3 });

skillFills.forEach(fill => skillObserver.observe(fill));

/* =====================================================
   BACK TO TOP BUTTON
===================================================== */
const backToTop = document.getElementById("backToTop");

window.addEventListener("scroll", () => {
  backToTop.classList.toggle("visible", window.scrollY > 400);
});

backToTop.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

/* =====================================================
   CONTACT FORM
===================================================== */
document.getElementById("contactForm").addEventListener("submit", function(e) {
  e.preventDefault();

  const name    = document.getElementById("name").value.trim();
  const email   = document.getElementById("email").value.trim();
  const message = document.getElementById("message").value.trim();
  const formNote = document.getElementById("formNote");

  if (!name || !email || !message) {
    formNote.textContent = "Please fill in all fields.";
    formNote.style.color = "#ff6b6b";
    return;
  }

  const subject = `Portfolio Contact from ${name}`;
  const body =
    `Name: ${name}%0D%0AEmail: ${email}%0D%0A%0D%0AMessage:%0D%0A${encodeURIComponent(message)}`;

  window.location.href = `mailto:sadhish37341@gmail.com?subject=${encodeURIComponent(subject)}&body=${body}`;

  formNote.textContent = "✓ Opening your mail client...";
  formNote.style.color = "var(--accent)";
  this.reset();
  setTimeout(() => formNote.textContent = "", 4000);
});

/* =====================================================
   SCROLL REVEAL (sections fade in)
===================================================== */
const revealEls = document.querySelectorAll(".section-inner, .project-card, .contact-card, .skill-bar-item");

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = "1";
      entry.target.style.transform = "translateY(0)";
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

revealEls.forEach(el => {
  el.style.opacity = "0";
  el.style.transform = "translateY(24px)";
  el.style.transition = "opacity 0.6s ease, transform 0.6s ease";
  revealObserver.observe(el);
});