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

      // Animate nav links with GSAP when hamburger is clicked
      const hamburger = document.getElementById('hamburger');
      const navLinks = document.querySelectorAll('.nav-links li');

      if (hamburger) {
        hamburger.addEventListener('click', () => {
          gsap.fromTo(
            navLinks,
            { x: -50, opacity: 0 },
            { x: 0, opacity: 1, stagger: 0.08, duration: 0.5, ease: "power2.out" }
          );
        });
      }

      // Optional: Animate logo on nav link click
      const logo = document.querySelector('.logo');
      document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
          gsap.fromTo(
            logo,
            { scale: 1 },
            { scale: 1.2, duration: 0.2, yoyo: true, repeat: 1, ease: "power1.inOut" }
          );
        });
      });
    })
    .catch(err => {
      console.error('Failed to load navbar:', err);
    });

  // Theme functions
  function initTheme() {
    const toggleTheme = document.querySelector('.toggle-theme');
    if (!toggleTheme) return;
    const themeIcon = toggleTheme.querySelector('i');
    // Set default to light mode if no theme is saved
    let savedTheme = localStorage.getItem('theme');
    if (!savedTheme) {
      savedTheme = 'light';
      localStorage.setItem('theme', 'light');
    }
    if (savedTheme === 'light') {
      document.body.classList.add('light-mode');
      themeIcon.classList.remove('fa-sun');
      themeIcon.classList.add('fa-moon');
    } else {
      document.body.classList.remove('light-mode');
      themeIcon.classList.remove('fa-moon');
      themeIcon.classList.add('fa-sun');
    }

    toggleTheme.addEventListener('click', () => {
      document.body.classList.toggle('light-mode');
      if (document.body.classList.contains('light-mode')) {
        themeIcon.classList.remove('fa-sun');
        themeIcon.classList.add('fa-moon');
        localStorage.setItem('theme', 'light');
      } else {
        themeIcon.classList.remove('fa-moon');
        themeIcon.classList.add('fa-sun');
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

  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('navLinks');
  if (hamburger && navLinks) {
    hamburger.onclick = () => {
      navLinks.classList.toggle('active');
      hamburger.classList.toggle('active');
    };
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

// Preview project image in modal
document.querySelectorAll('.project-image-slider img').forEach(img => {
  img.style.cursor = 'pointer';
  img.addEventListener('click', function() {
      const modal = document.getElementById('image-modal');
      const modalImg = document.getElementById('image-modal-img');
      modal.style.display = 'flex';
      modalImg.src = this.src;
      modalImg.alt = this.alt || 'Project Preview';
  });
});

document.querySelector('.image-modal-close').onclick = function() {
  document.getElementById('image-modal').style.display = 'none';
};
document.getElementById('image-modal').onclick = function(e) {
  if (e.target === this) this.style.display = 'none';
};

// Project images for each card
const projectImages = [
  [
    'images/nucatalogue/project1.png',
    'images/nucatalogue/project2.png',
    'images/nucatalogue/project3.png',
    'images/nucatalogue/project4.png',
    'images/nucatalogue/project5.png'
  ],
  [
    'images/nul-queue/project1.png',
    'images/nul-queue/project2.png',
    'images/nul-queue/project3.png',
    'images/nul-queue/project4.png',
    'images/nul-queue/project5.png'
  ],
  [
    'images/neti-cms/project1.png',
    'images/neti-cms/project2.png',
    'images/neti-cms/project3.png',
    'images/neti-cms/project4.png',
    'images/neti-cms/project5.png'
  ]
];
let currentIndexes = [0, 0, 0]; // <-- Fix: add a third index

function nextImage(cardIdx) {
  const img = document.getElementById(`project-img-${cardIdx}`);
  gsap.to(img, {
    x: -80,
    opacity: 0,
    duration: 0.25,
    onComplete: () => {
      currentIndexes[cardIdx] = (currentIndexes[cardIdx] + 1) % projectImages[cardIdx].length;
      img.src = projectImages[cardIdx][currentIndexes[cardIdx]];
      gsap.fromTo(
        img,
        { x: 80, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.25 }
      );
    }
  });
}

function prevImage(cardIdx) {
  const img = document.getElementById(`project-img-${cardIdx}`);
  gsap.to(img, {
    x: 80,
    opacity: 0,
    duration: 0.25,
    onComplete: () => {
      currentIndexes[cardIdx] = (currentIndexes[cardIdx] - 1 + projectImages[cardIdx].length) % projectImages[cardIdx].length;
      img.src = projectImages[cardIdx][currentIndexes[cardIdx]];
      gsap.fromTo(
        img,
        { x: -80, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.25 }
      );
    }
  });
}


