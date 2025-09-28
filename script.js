// Scroll fluide sur les liens de navigation
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener("click", function(e) {
    e.preventDefault();
    document.querySelector(this.getAttribute("href")).scrollIntoView({
      behavior: "smooth"
    });
  });
});

// Message lors de l’envoi du formulaire
const form = document.querySelector("form");
form.addEventListener("submit", function(e) {
  e.preventDefault();
  alert("Merci pour votre message ! Je vous répondrai bientôt.");
  form.reset();
});

// Gestion des modals
const modalBtns = document.querySelectorAll(".btn-modal");
const modals = document.querySelectorAll(".modal");
const closes = document.querySelectorAll(".close");

// Ouvrir modal
modalBtns.forEach(btn => {
  btn.addEventListener("click", () => {
    const modalId = btn.getAttribute("data-modal");
    document.getElementById(modalId).style.display = "block";
  });
});

// Fermer modal via bouton X
closes.forEach(close => {
  close.addEventListener("click", () => {
    close.parentElement.parentElement.style.display = "none";
  });
});

// Fermer modal si clic en dehors
window.addEventListener("click", e => {
  modals.forEach(modal => {
    if (e.target === modal) {
      modal.style.display = "none";
    }
  });
});

// Menu burger
const burger = document.getElementById("burger");
const navLinks = document.getElementById("nav-links");

burger.addEventListener("click", () => {
  navLinks.classList.toggle("show");
});

// EmailJS pour le formulaire de contact
emailjs.init("F38ACmNnMwm_sZeRG");

document.getElementById('contact-form').addEventListener('submit', function(event) {
  event.preventDefault();

  emailjs.sendForm('service_3kj3yex', 'template_1h1bx1o', this)
    .then(function() {
      alert('Message envoyé avec succès !');
      document.getElementById('contact-form').reset();
    }, function(error) {
      alert('Erreur lors de l\'envoi : ' + JSON.stringify(error));
    });
});
