// Scroll fluide sur les liens de navigation
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener("click", function(e) {
    e.preventDefault();
    document.querySelector(this.getAttribute("href")).scrollIntoView({
      behavior: "smooth"
    });
  });
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

// Initialisation EmailJS avec ton User ID
    emailjs.init("F38ACmNnMwm_sZeRG");

    const form = document.getElementById('contact-form');
    const status = document.getElementById('form-status');

    form.addEventListener('submit', function (event) {
      event.preventDefault(); // Empêche le rechargement de la page

      // Envoi du formulaire
      emailjs.sendForm('service_3kj3yex', 'template_9jo2gcs', this)
        .then(function (response) {
          status.textContent = "Message envoyé avec succès ! ✅";
          status.style.color = "green";
          form.reset(); // Réinitialise le formulaire
        }, function (error) {
          status.textContent = "Erreur lors de l'envoi : " + error.text;
          status.style.color = "red";
        });
    });