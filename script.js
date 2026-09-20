// ---------- Burger menu ----------
const burger = document.getElementById('burger');
const navLinks = document.getElementById('nav-links');
if (burger) {
  burger.addEventListener('click', () => navLinks.classList.toggle('show'));
  document.querySelectorAll('#nav-links a').forEach(link => {
    link.addEventListener('click', () => navLinks.classList.remove('show'));
  });
}

// ---------- Active nav link on scroll (home page only) ----------
const sections = document.querySelectorAll('section[id]');
if (sections.length) {
  window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
      if (pageYOffset >= section.offsetTop - 200) current = section.id;
    });
    document.querySelectorAll('#nav-links a').forEach(link => {
      link.classList.toggle('active', link.getAttribute('href') === '#' + current);
    });
  });
}

// ---------- Scroll reveal ----------
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => { if (entry.isIntersecting) entry.target.classList.add('in'); });
}, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

document.querySelectorAll('.reveal').forEach(el => {
  if (reduceMotion) { el.classList.add('in'); } else { revealObserver.observe(el); }
});

// ---------- PDF viewer modal ----------
const pdfModal = document.getElementById('pdf-modal');
if (pdfModal) {
  const pdfViewer = document.getElementById('pdf-viewer');
  const pdfTitle = document.getElementById('pdf-title');
  const pdfClose = document.getElementById('pdf-close');

  document.querySelectorAll('[data-pdf]').forEach(btn => {
    btn.addEventListener('click', () => {
      const pdfPath = btn.getAttribute('data-pdf');
      pdfViewer.src = pdfPath;
      pdfTitle.textContent = pdfPath;
      pdfModal.style.display = 'flex';
    });
  });
  function closePdf() { pdfModal.style.display = 'none'; pdfViewer.src = ''; }
  pdfClose.addEventListener('click', closePdf);
  pdfModal.addEventListener('click', (e) => { if (e.target === pdfModal) closePdf(); });
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closePdf(); });
}

// ---------- Project detail modals ----------
const projectModalOverlay = document.getElementById('project-modal-overlay');
if (projectModalOverlay) {
  const projectModalBody = document.getElementById('project-modal-body');
  const projectModalClose = document.getElementById('project-modal-close');

  function openProjectModal(targetId) {
    const template = document.getElementById(targetId);
    if (!template) return;
    projectModalBody.innerHTML = '';
    projectModalBody.appendChild(template.content.cloneNode(true));
    projectModalOverlay.classList.add('show');
  }
  function closeProjectModal() {
    projectModalOverlay.classList.remove('show');
  }

  document.querySelectorAll('.modal-card').forEach(card => {
    card.addEventListener('click', () => openProjectModal(card.getAttribute('data-target')));
  });
  projectModalClose.addEventListener('click', closeProjectModal);
  projectModalOverlay.addEventListener('click', (e) => {
    if (e.target === projectModalOverlay) closeProjectModal();
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeProjectModal();
  });
}

// ---------- Project filters (projects-index.html) ----------
const filterButtons = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');
const projectGrid = document.getElementById('project-grid');
const projectGridEmpty = document.getElementById('project-grid-empty');

if (filterButtons.length && projectCards.length) {
  function applyFilter(filter) {
    let visibleCount = 0;
    projectCards.forEach(card => {
      const match = filter === 'all' || card.getAttribute('data-category') === filter;
      if (match) {
        card.hidden = false;
        requestAnimationFrame(() => card.classList.remove('is-leaving'));
        visibleCount++;
      } else {
        card.classList.add('is-leaving');
        setTimeout(() => {
          if (card.classList.contains('is-leaving')) card.hidden = true;
        }, 220);
      }
    });
    if (projectGridEmpty) projectGridEmpty.hidden = visibleCount !== 0;
  }

  filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      filterButtons.forEach(b => {
        b.classList.remove('active');
        b.setAttribute('aria-pressed', 'false');
      });
      btn.classList.add('active');
      btn.setAttribute('aria-pressed', 'true');
      applyFilter(btn.getAttribute('data-filter'));
    });
  });

  const validFilters = ['academique', 'personnel', 'stage'];
  const params = new URLSearchParams(window.location.search);
  const hashFilter = window.location.hash.replace('#', '');
  const initial = params.get('filter') || (validFilters.includes(hashFilter) ? hashFilter : null);
  if (initial) {
    const initialBtn = document.querySelector('.filter-btn[data-filter="' + initial + '"]');
    if (initialBtn) {
      initialBtn.click();
      if (projectGrid) {
        window.requestAnimationFrame(() => projectGrid.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'start' }));
      }
    }
  }
}

// ---------- Parcours (accordéon) ----------
document.querySelectorAll('.parcours-row').forEach(row => {
  row.addEventListener('click', () => {
    const expanded = row.getAttribute('aria-expanded') === 'true';
    row.setAttribute('aria-expanded', String(!expanded));
  });
});