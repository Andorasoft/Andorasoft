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

// ==============================
// Cambio de fondo del navbar al hacer scroll
// ==============================
var navbar = document.getElementById("navbar")
var lastScrollTop = 0

window.addEventListener("scroll", () => {
  var scrollTop = window.pageYOffset || document.documentElement.scrollTop

  if (scrollTop > 100) {
    navbar.style.background = "rgba(255, 255, 255, 0.95)"
  } else {
    navbar.style.background = "rgba(255, 255, 255, 0.8)"
  }

  lastScrollTop = scrollTop
})

// ==============================
// Captura y manejo de datos del formulario de contacto
// ==============================
document.getElementById("contactForm").addEventListener("submit", function (e) {
  e.preventDefault()

  var formData = new FormData(this)
  var data = {
    name: formData.get("name"),
    email: formData.get("email"),
    company: formData.get("company"),
    project: formData.get("project"),
  }

  console.log("Datos del formulario:", data)
  alert("¡Gracias por tu mensaje! Te contactaremos en las próximas 24 horas.")
  this.reset()
})

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
