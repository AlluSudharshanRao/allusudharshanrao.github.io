(function() {
  var yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  var toggle = document.querySelector('.nav-toggle');
  var navLinks = document.querySelector('.nav-links');
  function setMenuOpen(open) {
    if (!toggle || !navLinks) return;
    navLinks.classList.toggle('is-open', open);
    toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
  }

  if (toggle && navLinks) {
    toggle.addEventListener('click', function() {
      var open = !navLinks.classList.contains('is-open');
      setMenuOpen(open);
    });

    navLinks.querySelectorAll('a').forEach(function(a) {
      a.addEventListener('click', function() {
        setMenuOpen(false);
      });
    });

    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape') setMenuOpen(false);
    });

    document.addEventListener('click', function(e) {
      if (!navLinks.classList.contains('is-open')) return;
      var nav = toggle.closest('.nav');
      if (nav && !nav.contains(e.target)) setMenuOpen(false);
    });
  }

  var header = document.getElementById('header');
  if (header) {
    window.addEventListener('scroll', function() {
      header.classList.toggle('is-scrolled', window.scrollY > 50);
    }, { passive: true });
  }

  var prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (!prefersReducedMotion && 'IntersectionObserver' in window) {
    var revealSelectors = '.section, .project-card, .card, .blog-card, .timeline-item, .contact-item';
    document.querySelectorAll(revealSelectors).forEach(function(el) {
      el.classList.add('reveal');
    });

    var observer = new IntersectionObserver(
      function(entries) {
        entries.forEach(function(entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { rootMargin: '0px 0px -40px 0px', threshold: 0.08 }
    );

    document.querySelectorAll('.reveal').forEach(function(el) {
      observer.observe(el);
    });
  }
})();
