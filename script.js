// ==============================
// Scroll suave al hacer click en los enlaces de la navbar
// ==============================
document.querySelectorAll(".nav a").forEach((link) => {
  link.addEventListener("click", function (e) {
    e.preventDefault()
    var targetId = this.getAttribute("href")
    var targetSection = document.querySelector(targetId)

    if (targetSection) {
      var headerHeight = document.querySelector(".header").offsetHeight
      var targetPosition = targetSection.getBoundingClientRect().top + window.pageYOffset - headerHeight

      window.scrollTo({
        top: targetPosition,
        behavior: "smooth",
      })
    }
  })
})
 













/* ==========================
   Modo oscuro - Toggle
========================== */
// Seleccionamos el toggle
const toggle = document.getElementById("darkModeToggle");

// Función para aplicar la preferencia de tema
function applyTheme(theme) {
  if (theme === "dark") {
    document.body.classList.add("dark-mode");
    navbar.style.background = "rgba(0, 0, 0, 0.6)";
  } else {
    document.body.classList.remove("dark-mode");
    // Chequeamos scroll para light mode
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    navbar.style.background = scrollTop > 100 ? "rgba(255, 255, 255, 0.95)" : "rgba(255, 255, 255, 0.8)";
  }
}
 
// Toggle dark mode al hacer click
toggle.addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");
  const theme = document.body.classList.contains("dark-mode") ? "dark" : "light";
  localStorage.setItem("theme", theme);
  applyTheme(theme);
});

// Aplicar tema al cargar la página según localStorage
window.addEventListener("DOMContentLoaded", () => {
  const theme = localStorage.getItem("theme") || "light";
  applyTheme(theme);
});

// =============================
// Cambio de fondo del navbar al hacer scroll
// =============================
var navbar = document.getElementById("navbar");

window.addEventListener("scroll", () => {
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

  if (document.body.classList.contains("dark-mode")) {
    // Dark mode: siempre negro translúcido
    navbar.style.background = "rgba(0, 0, 0, 0.6)";
  } else {
    // Light mode: cambia al hacer scroll
    navbar.style.background = scrollTop > 100 ? "rgba(255, 255, 255, 0.95)" : "rgba(255, 255, 255, 0.8)";
  }
});















// ==============================
// Observer para animaciones al aparecer en pantalla
// ==============================
var observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
}

var observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = "1"
      entry.target.style.transform = "translateY(0)"
    }
  })
}, observerOptions)











// ==============================
// Inicialización de animaciones para elementos al cargar la página
// ==============================
document.addEventListener("DOMContentLoaded", () => {
  var animatedElements = document.querySelectorAll(".service-card, .feature-card, .testimonial-card, .portfolio-item")

  animatedElements.forEach((el) => {
    el.style.opacity = "0"
    el.style.transform = "translateY(30px)"
    el.style.transition = "opacity 0.6s ease, transform 0.6s ease"
    observer.observe(el)
  })
})











// ==============================
// Efecto parallax suave en Hero Section
// ==============================
window.addEventListener("scroll", () => {
  var scrolled = window.pageYOffset
  var hero = document.querySelector(".hero")
  var heroContent = document.querySelector(".hero-content")

  if (hero && heroContent && scrolled < window.innerHeight) {
    heroContent.style.transform = "translateY(" + scrolled * 0.1 + "px)"
  }
})











// ==============================
// Animación hover en botones primarios
// ==============================
document.querySelectorAll(".btn-primary").forEach((btn) => {
  btn.addEventListener("mouseenter", function () {
    this.style.transform = "translateY(-2px)"
  })

  btn.addEventListener("mouseleave", function () {
    this.style.transform = "translateY(0)"
  })
})
















// ==============================
// Captura y manejo de datos del formulario (Vercel)
// ==============================

document.getElementById("contactForm").addEventListener("submit", async function (e) {
  e.preventDefault();

  const formData = {
    name: this.name.value,
    email: this.email.value,
    company: this.company.value,
    project: this.project.value,
  };

  try {
    const response = await fetch("/api/Data", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    if (response.ok) {
      alert("✅ ¡Gracias por tu mensaje! Te contactaremos en las próximas 24 horas.");
      this.reset();
    } else {
      const errorText = await response.text();
      alert("❌ Error al enviar el mensaje: " + errorText);
    }
  } catch (error) {
    console.error("Error de conexión:", error);
    alert("⚠️ Error de conexión con el servidor.");
  }
});















