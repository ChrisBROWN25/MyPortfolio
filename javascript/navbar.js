document.addEventListener('DOMContentLoaded', function() {
  // 1. Mobile Menu Toggle
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('navLinks');
  
  if (hamburger && navLinks) {
      hamburger.addEventListener('click', function() {
          hamburger.classList.toggle('active');
          navLinks.classList.toggle('active');

          document.body.style.overflow = 
              navLinks.classList.contains('active') ? 'hidden' : '';
      });

      document.querySelectorAll('.nav-links a').forEach(link => {
          link.addEventListener('click', () => {
              if (window.innerWidth <= 700) {
                  hamburger.classList.remove('active');
                  navLinks.classList.remove('active');
                  document.body.style.overflow = '';
              }
          });
      });
  }

// Theme handling section
const themeToggle = document.querySelector('.toggle-theme');
if (themeToggle) {
  updateThemeIcon();
  
  themeToggle.addEventListener('click', function() {
    const html = document.documentElement;
    const isLight = !html.classList.contains('light-mode');
    
    html.classList.toggle('light-mode', isLight);
    html.classList.toggle('dark-mode', !isLight);
    
    document.body.className = isLight ? 'light-mode' : 'dark-mode';
    
    localStorage.setItem('theme', isLight ? 'light' : 'dark');
    updateThemeIcon();
  });
}

function updateThemeIcon() {
  const icon = document.querySelector('.toggle-theme i');
  if (icon) {
    icon.className = document.documentElement.classList.contains('light-mode') 
      ? 'fa-solid fa-moon' 
      : 'fa-solid fa-sun';
  }
}
});