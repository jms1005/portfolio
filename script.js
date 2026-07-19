// Mobile nav toggle
const navToggle = document.getElementById('navToggle');
const nav = document.getElementById('nav');

navToggle.addEventListener('click', () => {
  const isOpen = nav.classList.toggle('is-open');
  navToggle.classList.toggle('is-active', isOpen);
  navToggle.setAttribute('aria-expanded', isOpen);
});

nav.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    nav.classList.remove('is-open');
    navToggle.classList.remove('is-active');
    navToggle.setAttribute('aria-expanded', 'false');
  });
});

// Header background on scroll
const header = document.getElementById('header');
window.addEventListener('scroll', () => {
  header.style.boxShadow = window.scrollY > 8 ? '0 1px 0 rgba(0,0,0,0.04)' : 'none';
});

// Footer year
document.getElementById('year').textContent = new Date().getFullYear();

// Scroll-reveal animation
const revealTargets = document.querySelectorAll('.section, .project-card, .skill-card, .contact-card');
revealTargets.forEach((el) => el.classList.add('reveal'));

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12 }
);

revealTargets.forEach((el) => observer.observe(el));

// PDF slide viewer modal
(function () {
  const modal = document.getElementById('pdfModal');
  if (!modal || typeof pdfjsLib === 'undefined') return;

  pdfjsLib.GlobalWorkerOptions.workerSrc =
    'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';

  const titleEl = document.getElementById('pdfModalTitle');
  const pageEl = document.getElementById('pdfModalPage');
  const canvas = document.getElementById('pdfCanvas');
  const ctx = canvas.getContext('2d');
  const prevBtn = document.getElementById('pdfPrev');
  const nextBtn = document.getElementById('pdfNext');
  const viewport = canvas.parentElement;

  let pdfDoc = null;
  let currentPage = 1;
  let currentUrl = null;
  let renderTask = null;

  function renderPage(num) {
    if (!pdfDoc) return;
    currentPage = num;
    pageEl.textContent = `${num} / ${pdfDoc.numPages}`;
    prevBtn.disabled = num <= 1;
    nextBtn.disabled = num >= pdfDoc.numPages;

    if (renderTask) renderTask.cancel();

    pdfDoc.getPage(num).then((page) => {
      const dpr = window.devicePixelRatio || 1;
      const base = page.getViewport({ scale: 1 });
      const scale = Math.min(
        viewport.clientWidth / base.width,
        viewport.clientHeight / base.height
      );
      const pv = page.getViewport({ scale: scale * dpr });

      canvas.width = pv.width;
      canvas.height = pv.height;
      canvas.style.width = `${pv.width / dpr}px`;
      canvas.style.height = `${pv.height / dpr}px`;

      renderTask = page.render({ canvasContext: ctx, viewport: pv });
      renderTask.promise.catch((err) => {
        if (err && err.name !== 'RenderingCancelledException') console.error(err);
      });
    });
  }

  function openPdf(url, title) {
    modal.classList.add('is-open');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    titleEl.textContent = title || '';

    if (currentUrl === url && pdfDoc) {
      renderPage(currentPage);
      return;
    }

    currentUrl = url;
    pdfDoc = null;
    pageEl.textContent = '불러오는 중…';

    pdfjsLib.getDocument(url).promise.then((doc) => {
      pdfDoc = doc;
      renderPage(1);
    }).catch((err) => {
      console.error('PDF load failed', err);
      pageEl.textContent = 'PDF를 불러오지 못했습니다.';
    });
  }

  function closeModal() {
    modal.classList.remove('is-open');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  document.querySelectorAll('.js-pdf-trigger').forEach((el) => {
    el.addEventListener('click', (e) => {
      e.preventDefault();
      openPdf(el.getAttribute('data-pdf'), el.getAttribute('data-title'));
    });
  });

  modal.querySelectorAll('[data-pdf-close]').forEach((el) => {
    el.addEventListener('click', closeModal);
  });

  prevBtn.addEventListener('click', () => currentPage > 1 && renderPage(currentPage - 1));
  nextBtn.addEventListener('click', () => pdfDoc && currentPage < pdfDoc.numPages && renderPage(currentPage + 1));

  document.addEventListener('keydown', (e) => {
    if (!modal.classList.contains('is-open')) return;
    if (e.key === 'Escape') closeModal();
    if (e.key === 'ArrowLeft') prevBtn.click();
    if (e.key === 'ArrowRight') nextBtn.click();
  });

  let touchStartX = 0;
  modal.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].clientX;
  }, { passive: true });
  modal.addEventListener('touchend', (e) => {
    const dx = e.changedTouches[0].clientX - touchStartX;
    if (Math.abs(dx) < 40) return;
    dx < 0 ? nextBtn.click() : prevBtn.click();
  }, { passive: true });

  window.addEventListener('resize', () => {
    if (modal.classList.contains('is-open') && pdfDoc) renderPage(currentPage);
  });
})();
