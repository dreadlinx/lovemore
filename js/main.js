document.addEventListener('DOMContentLoaded', function () {
  var hamburger = document.getElementById('hamburger');
  var navMenu = document.getElementById('nav-menu');

  if (hamburger && navMenu) {
    hamburger.addEventListener('click', function () {
      var isOpen = navMenu.classList.toggle('active');
      hamburger.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
      hamburger.setAttribute('aria-label', isOpen ? 'Close menu' : 'Open menu');
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });
  }

  // On small screens, tapping a dropdown parent link toggles its submenu
  // instead of navigating away, since there is no hover on touch devices.
  var mq = window.matchMedia('(max-width: 900px)');
  document.querySelectorAll('.dropdown > .nav-link').forEach(function (link) {
    link.addEventListener('click', function (e) {
      if (mq.matches) {
        e.preventDefault();
        this.parentElement.classList.toggle('active');
      }
    });
  });

  // Close the mobile menu after a real navigation link is tapped.
  document.querySelectorAll('.nav-menu a:not(.dropdown > .nav-link)').forEach(function (link) {
    link.addEventListener('click', function () {
      if (mq.matches && navMenu.classList.contains('active')) {
        navMenu.classList.remove('active');
        hamburger.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      }
    });
  });

  // Keep the footer year correct without needing a yearly content edit.
  var yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();
});
