// ---------- Burger menu ----------
const burger = document.getElementById('burger');
const navLinks = document.getElementById('nav-links');
if (burger) {
  function setMenu(open) {
    navLinks.classList.toggle('show', open);
    burger.setAttribute('aria-expanded', String(open));
  }
  burger.addEventListener('click', () => setMenu(!navLinks.classList.contains('show')));
  document.querySelectorAll('#nav-links a').forEach(link => {
    link.addEventListener('click', () => setMenu(false));
  });
}

// ---------- Active nav link on scroll (home page only) ----------
const sections = document.querySelectorAll('section[id]');
if (sections.length) {
  window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
      if (window.scrollY >= section.offsetTop - 200) current = section.id;
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
  let pdfTriggerBtn = null;

  document.querySelectorAll('[data-pdf]').forEach(btn => {
    btn.addEventListener('click', () => {
      const pdfPath = btn.getAttribute('data-pdf');
      pdfTriggerBtn = btn;
      pdfViewer.src = pdfPath;
      pdfTitle.textContent = pdfPath;
      pdfModal.style.display = 'flex';
      pdfClose.focus();
    });
  });
  function closePdf() {
    if (pdfModal.style.display !== 'flex') return;
    pdfModal.style.display = 'none';
    pdfViewer.src = '';
    if (pdfTriggerBtn) { pdfTriggerBtn.focus(); pdfTriggerBtn = null; }
  }
  pdfClose.addEventListener('click', closePdf);
  pdfModal.addEventListener('click', (e) => { if (e.target === pdfModal) closePdf(); });
  document.addEventListener('keydown', (e) => {
    if (pdfModal.style.display !== 'flex') return;
    if (e.key === 'Escape') closePdf();
    if (e.key === 'Tab') { e.preventDefault(); pdfClose.focus(); }
  });
}

// ---------- Onglets des projets (sans JS, tous les panneaux restent visibles) ----------
document.querySelectorAll('.project-tabs').forEach(container => {
  const panels = Array.from(container.querySelectorAll(':scope > .tab-panel'));
  if (!panels.length) return;

  const tablist = document.createElement('div');
  tablist.className = 'tablist';
  tablist.setAttribute('role', 'tablist');
  const projectTitle = container.closest('.project-block')?.querySelector('.poster-title');
  if (projectTitle) tablist.setAttribute('aria-label', 'Détails — ' + projectTitle.textContent.replace(/\s+/g, ' ').trim());

  const tabs = panels.map(panel => {
    const heading = panel.querySelector('.tab-panel-title');
    const tab = document.createElement('button');
    tab.type = 'button';
    tab.className = 'tab';
    tab.id = panel.id + '-tab';
    tab.textContent = heading.textContent.trim();
    tab.setAttribute('role', 'tab');
    tab.setAttribute('aria-controls', panel.id);
    panel.setAttribute('role', 'tabpanel');
    panel.setAttribute('aria-labelledby', tab.id);
    panel.tabIndex = 0;
    heading.hidden = true;
    tablist.appendChild(tab);
    return tab;
  });

  function select(index, moveFocus) {
    tabs.forEach((tab, i) => {
      const selected = i === index;
      tab.setAttribute('aria-selected', String(selected));
      tab.tabIndex = selected ? 0 : -1;
      panels[i].hidden = !selected;
    });
    if (moveFocus) tabs[index].focus();
  }

  tablist.addEventListener('click', (e) => {
    const tab = e.target.closest('[role="tab"]');
    if (tab) select(tabs.indexOf(tab), false);
  });
  tablist.addEventListener('keydown', (e) => {
    const current = tabs.indexOf(document.activeElement);
    if (current === -1) return;
    const keys = {
      ArrowRight: (current + 1) % tabs.length,
      ArrowLeft: (current - 1 + tabs.length) % tabs.length,
      Home: 0,
      End: tabs.length - 1,
    };
    if (!(e.key in keys)) return;
    e.preventDefault();
    select(keys[e.key], true);
  });

  container.insertBefore(tablist, panels[0]);
  container.classList.add('is-enhanced');
  select(0, false);
});
