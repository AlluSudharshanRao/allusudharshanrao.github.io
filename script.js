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

    // Close menu when any navigation link is chosen (hash or page nav).
    navLinks.querySelectorAll('a').forEach(function(a) {
      a.addEventListener('click', function() {
        setMenuOpen(false);
      });
    });

    // Close on Escape.
    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape') setMenuOpen(false);
    });

    // Close when clicking outside the nav.
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
})();
