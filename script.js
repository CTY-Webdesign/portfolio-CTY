// Burger menu
const burger = document.getElementById('burger');
const navLinks = document.getElementById('nav-links');

burger.addEventListener('click', () => {
  navLinks.classList.toggle('show');
});

// Close menu on link click
document.querySelectorAll('nav a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('show');
  });
});

// Modals
const projectCards = document.querySelectorAll('.project-card');
const modals = document.querySelectorAll('.modal');
const modalCloses = document.querySelectorAll('.modal-close');

projectCards.forEach(card => {
  card.addEventListener('click', () => {
    const modalId = card.getAttribute('data-modal');
    const modal = document.getElementById(modalId);
    if (modal) {
      modal.classList.add('active');
    }
  });
});

modalCloses.forEach(closeBtn => {
  closeBtn.addEventListener('click', () => {
    closeBtn.closest('.modal').classList.remove('active');
  });
});

modals.forEach(modal => {
  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.classList.remove('active');
    }
  });
});

// Initialiser EmailJS avec votre User ID
(function () {
  emailjs.init("F38ACmNnMwm_sZeRG"); // Remplacez par votre User ID EmailJS
})();

// Form submission
const contactForm = document.getElementById('contact-form');
const formStatus = document.getElementById('form-status');

contactForm.addEventListener('submit', (e) => {
  e.preventDefault();

  formStatus.textContent = 'Envoi en cours...';
  formStatus.style.color = 'var(--accent)';

  emailjs.sendForm('service_3kj3yex', 'template_9jo2gcs', contactForm)
    .then(function (response) {
      console.log('SUCCESS!', response);
      formStatus.textContent = '✓ Message envoyé avec succès !';
      formStatus.style.color = 'var(--accent)';
      contactForm.reset();
    }, function (error) {
      // AFFICHER L'ERREUR COMPLÈTE
      console.error('ERREUR COMPLÈTE:', error);
      console.error('Message:', error.text);
      console.error('Status:', error.status);

      formStatus.textContent = '✗ Erreur: ' + error.text;
      formStatus.style.color = '#ff4444';
    });
});

// Scroll animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, observerOptions);

document.querySelectorAll('.project-card, .skill-card, .timeline-item').forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(20px)';
  el.style.transition = 'all 0.6s ease-out';
  observer.observe(el);
});

// Active nav link on scroll
const sections = document.querySelectorAll('section');
const navLinksArray = document.querySelectorAll('nav a');

window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;
    if (pageYOffset >= (sectionTop - 200)) {
      current = section.getAttribute('id');
    }
  });

  navLinksArray.forEach(link => {
    link.style.color = 'var(--text)';
    if (link.getAttribute('href').slice(1) === current) {
      link.style.color = 'var(--accent)';
    }
  });
});