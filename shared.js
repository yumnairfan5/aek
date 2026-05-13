/* ===== shared.js — AEK Law Chambers ===== */

/* Page transition on link clicks */
document.addEventListener('DOMContentLoaded', () => {
  const overlay = document.getElementById('page-transition');

  // Fade in on load
  if (overlay) {
    overlay.classList.remove('active');
  }

  // Intercept internal links
  document.querySelectorAll('a[href]').forEach(link => {
    const href = link.getAttribute('href');
    if (!href || href.startsWith('#') || href.startsWith('http') || href.startsWith('mailto') || href.startsWith('tel') || href.startsWith('https')) return;
    link.addEventListener('click', e => {
      e.preventDefault();
      if (overlay) overlay.classList.add('active');
      setTimeout(() => { window.location.href = href; }, 280);
    });
  });

  // ---- Hamburger ----
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('nav-links');
  if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
      const isOpen = navLinks.classList.toggle('open');
      hamburger.classList.toggle('open', isOpen);
      hamburger.setAttribute('aria-expanded', isOpen);
    });
  }

  // ---- Scroll reveal ----
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

  // ---- Section rule draw ----
  const ruleObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        ruleObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  document.querySelectorAll('.reveal-rule').forEach(el => ruleObserver.observe(el));

  // ---- Hero stagger entrance ----
  const heroEls = document.querySelectorAll('.reveal-hero');
  heroEls.forEach((el, i) => {
    const delay = parseFloat(el.dataset.delay || i) * 0.15;
    setTimeout(() => el.classList.add('visible'), 100 + delay * 1000);
  });

  // ---- Court tags sequential stagger ----
  const tags = document.querySelectorAll('.court-tag');
  if (tags.length) {
    const tagObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          tags.forEach((tag, i) => {
            setTimeout(() => tag.classList.add('visible'), i * 80);
          });
          tagObserver.disconnect();
        }
      });
    }, { threshold: 0.5 });
    const bar = document.querySelector('.courts-bar');
    if (bar) tagObserver.observe(bar);
  }

  // ---- FAQ accordion ----
  document.querySelectorAll('.faq-q').forEach(btn => {
    btn.addEventListener('click', () => {
      const item = btn.closest('.faq-item');
      const isOpen = item.classList.contains('open');
      // close siblings
      btn.closest('.faq').querySelectorAll('.faq-item').forEach(i => i.classList.remove('open'));
      if (!isOpen) item.classList.add('open');
    });
  });

  // ---- Image practice cards — fires only when scrolled clearly into view ----
  const cardObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        cardObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0,
    rootMargin: '0px 0px -120px 0px'
  });

  document.querySelectorAll('.img-practice-card').forEach((card, i) => {
    // left col: 0s, right col: 0.25s — clearly visible stagger
    card.style.transitionDelay = `${(i % 2) * 0.25}s`;
    cardObserver.observe(card);
  });

  // ---- Testimonial card staggered reveal ----
  const testObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        testObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  document.querySelectorAll('.testimonial-card').forEach(card => testObserver.observe(card));
  const page = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-link').forEach(link => {
    const href = link.getAttribute('href') || '';
    if (href === page || (page === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });

  // ---- Nav shadow on scroll ----
  const nav = document.getElementById('site-nav');
  if (nav) {
    window.addEventListener('scroll', () => {
      nav.style.boxShadow = window.scrollY > 10 ? '0 2px 20px rgba(0,0,0,0.06)' : '';
    }, { passive: true });
  }
});
