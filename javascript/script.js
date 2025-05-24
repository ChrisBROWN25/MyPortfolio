// Fetch and inject navbar, then initialize all features after navbar is loaded
document.addEventListener('DOMContentLoaded', function () {
  const nav = document.querySelector('.navbar');
  if (!nav) return; // Exit if .navbar not found

  fetch('navbar.html')
    .then(res => res.text())
    .then(data => {
      nav.innerHTML = data;

      // Now that navbar is loaded, initialize features
      initTheme();
      initHamburger();
      highlightActiveNav();
    })
    .catch(err => {
      console.error('Failed to load navbar:', err);
    });

  // Theme functions
  function initTheme() {
    const toggleTheme = document.querySelector('.toggle-theme');
    if (!toggleTheme) return;
    const themeIcon = toggleTheme.querySelector('i');
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light') {
      document.body.classList.add('light-mode');
      themeIcon.classList.remove('fa-moon');
      themeIcon.classList.add('fa-sun');
    } else {
      document.body.classList.remove('light-mode');
      themeIcon.classList.remove('fa-sun');
      themeIcon.classList.add('fa-moon');
    }

    toggleTheme.addEventListener('click', () => {
      document.body.classList.toggle('light-mode');
      if (document.body.classList.contains('light-mode')) {
        themeIcon.classList.remove('fa-moon');
        themeIcon.classList.add('fa-sun');
        localStorage.setItem('theme', 'light');
      } else {
        themeIcon.classList.remove('fa-sun');
        themeIcon.classList.add('fa-moon');
        localStorage.setItem('theme', 'dark');
      }
    });
  }

  // Hamburger menu functions
  function initHamburger() {
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('navLinks');
    if (hamburger && navLinks) {
      hamburger.onclick = () => {
        navLinks.classList.toggle('active');
        hamburger.classList.toggle('active');
      };
      // Close mobile nav on link click
      navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
          navLinks.classList.remove('active');
          hamburger.classList.remove('active');
        });
      });
    }
  }

  // Highlight active nav link
  function highlightActiveNav() {
    const navLinkEls = document.querySelectorAll('.nav-links li a');
    const pathSegments = window.location.pathname.split('/');
    const currentPage = pathSegments[pathSegments.length - 1] || 'index.html';
    navLinkEls.forEach(link => {
      const linkPathSegments = link.getAttribute('href').split('/');
      const linkPage = linkPathSegments[linkPathSegments.length - 1];
      if (linkPage === currentPage) {
        link.classList.add('active');
      }
    });
  }
});

