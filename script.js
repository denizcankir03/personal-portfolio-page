// Menu Toggle Functionality
const menuToggle = document.getElementById('menuToggle');
const menuOverlay = document.getElementById('menuOverlay');

// Toggle menu
menuToggle.addEventListener('click', () => {
  menuOverlay.classList.toggle('active');
});

// Close menu when clicking on links
document.querySelectorAll('.menu-link').forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    menuOverlay.classList.remove('active');
    
    // Smooth scroll to target
    const targetId = link.getAttribute('href');
    const targetElement = document.querySelector(targetId);
    if (targetElement) {
      window.scrollTo({
        top: targetElement.offsetTop - 80,
        behavior: 'smooth'
      });
    }
  });
});

// Close menu when clicking outside
menuOverlay.addEventListener('click', (e) => {
  if (e.target === menuOverlay) {
    menuOverlay.classList.remove('active');
  }
});

// Add subtle animation to sections on load
document.addEventListener('DOMContentLoaded', function() {
  const sections = document.querySelectorAll('section');
  
  sections.forEach((section, index) => {
    setTimeout(() => {
      section.style.opacity = '0';
      section.style.transform = 'translateY(30px)';
      section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
      
      setTimeout(() => {
        section.style.opacity = '1';
        section.style.transform = 'translateY(0)';
      }, 100);
    }, index * 200);
  });
});

// Guestbook functionality
document.addEventListener('DOMContentLoaded', function() {
  const guestbookForm = document.getElementById('guestbookForm');
  const guestbookEntries = document.getElementById('guestbookEntries');
  
  // Load existing entries from localStorage
  loadGuestbookEntries();
  
  // Handle form submission
  guestbookForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const nameInput = document.getElementById('visitorName');
    const messageInput = document.getElementById('visitorMessage');
    
    const name = nameInput.value.trim();
    const message = messageInput.value.trim();
    
    if (name && message) {
      // Create new entry
      const entry = {
        id: Date.now(),
        name: name,
        message: message,
        timestamp: new Date().toLocaleString()
      };
      
      // Add to storage
      addEntryToStorage(entry);
      
      // Display entry
      displayEntry(entry);
      
      // Reset form
      guestbookForm.reset();
    }
  });
  
  // Load entries from localStorage
  function loadGuestbookEntries() {
    const entries = JSON.parse(localStorage.getItem('guestbookEntries')) || [];
    
    // Sort by timestamp (newest first)
    entries.sort((a, b) => b.id - a.id);
    
    entries.forEach(entry => {
      displayEntry(entry);
    });
  }
  
  // Add entry to localStorage
  function addEntryToStorage(entry) {
    let entries = JSON.parse(localStorage.getItem('guestbookEntries')) || [];
    entries.push(entry);
    localStorage.setItem('guestbookEntries', JSON.stringify(entries));
  }
  
  // Display entry on page
  function displayEntry(entry) {
    const entryElement = document.createElement('div');
    entryElement.className = 'guestbook-entry';
    entryElement.innerHTML = `
      <div class="guestbook-entry-header">
        <div class="guestbook-entry-name">${entry.name}</div>
        <div class="guestbook-entry-time">${entry.timestamp}</div>
      </div>
      <div class="guestbook-entry-message">${entry.message}</div>
    `;
    
    // Add to the top of the list
    if (guestbookEntries.firstChild) {
      guestbookEntries.insertBefore(entryElement, guestbookEntries.firstChild);
    } else {
      guestbookEntries.appendChild(entryElement);
    }
  }
});


// Smooth transitions between sections
document.querySelectorAll('.menu-link').forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    
    const targetId = link.getAttribute('href');
    const targetElement = document.querySelector(targetId);
    
    // Fade out current section
    document.querySelector('main').style.opacity = '0';
    document.querySelector('main').style.transition = 'opacity 0.5s ease';
    
    setTimeout(() => {
      // Scroll to target
      window.scrollTo({
        top: targetElement.offsetTop - 80,
        behavior: 'smooth'
      });
      
      // Close menu if open
      menuOverlay.classList.remove('active');
      
      // Fade in new section
      setTimeout(() => {
        document.querySelector('main').style.opacity = '1';
      }, 300);
    }, 500);
  });
});

// Close menu when clicking on links (existing code, keep this)
document.querySelectorAll('.menu-link').forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    menuOverlay.classList.remove('active');
    
    // Use the new transition instead of direct scroll
    // The new transition code above handles the scroll and fade
  });
});

// Animate skill bars when in viewport
const animateSkillBars = () => {
  const skillBars = document.querySelectorAll('.progress-bar');
  
  skillBars.forEach(bar => {
    const rect = bar.getBoundingClientRect();
    const windowHeight = window.innerHeight;
    
    if (rect.top < windowHeight * 0.75) {
      const width = bar.getAttribute('data-width');
      bar.style.width = width;
    }
  });
};

window.addEventListener('scroll', animateSkillBars);

// Trigger once on load in case section is already visible
window.addEventListener('load', animateSkillBars);

// FAB functionality
const fab = document.getElementById('up-button');

// Scroll to top when FAB is clicked - ONLY this function
fab.addEventListener('click', () => {
  window.scrollTo({
    top: 0,
    left: 0,
    behavior: 'smooth'
  });
});

// Show/hide FAB based on scroll position
window.addEventListener('scroll', () => {
  if (window.scrollY > 300) {
    fab.style.display = 'block';
  } else {
    fab.style.display = 'none';
  }
});

// Theme toggle functionality
const themeToggle = document.getElementById('themeToggle');
let isDarkTheme = true;

// Initialize theme based on localStorage or default
if (localStorage.getItem('theme') === 'light') {
  document.body.classList.add('light-theme');
  themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
  isDarkTheme = false;
}

themeToggle.addEventListener('click', () => {
  isDarkTheme = !isDarkTheme;
  
  if (isDarkTheme) {
    document.body.classList.remove('light-theme');
    themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
    localStorage.setItem('theme', 'dark');
  } else {
    document.body.classList.add('light-theme');
    themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
    localStorage.setItem('theme', 'light');
  }
});

// Scroll progress indicator
const scrollProgressBar = document.querySelector('.scroll-progress-bar');

window.addEventListener('scroll', () => {
  const scrollTop = window.pageYOffset;
  const docHeight = document.body.offsetHeight;
  const winHeight = window.innerHeight;
  const scrollPercent = scrollTop / (docHeight - winHeight);
  const scrollPercentRounded = Math.round(scrollPercent * 100);
  
  if (scrollProgressBar) {
    scrollProgressBar.style.width = `${scrollPercentRounded}%`;
  }
});

// Typewriter effect for the welcome message
const typewriterElement = document.getElementById('typewriter-name');
const fullText = 'Deniz';
let charIndex = 0;
let isDeleting = false;
let isEnd = false;

function typewriter() {
  if (charIndex < fullText.length && !isDeleting) {
    typewriterElement.textContent += fullText.charAt(charIndex);
    charIndex++;
    setTimeout(typewriter, 150); // 150ms per character
  } else if (charIndex === fullText.length && !isEnd) {
    isEnd = true;
    setTimeout(() => {
      isDeleting = true;
      typewriter();
    }, 1000); // Pause at end for 1 second
  } else if (isDeleting && charIndex > 0) {
    typewriterElement.textContent = fullText.substring(0, charIndex - 1);
    charIndex--;
    setTimeout(typewriter, 75); // 75ms per character when deleting
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    isEnd = false;
    setTimeout(typewriter, 500); // Pause before starting again
  }
}

// Start the typewriter effect when page loads
document.addEventListener('DOMContentLoaded', () => {
  setTimeout(typewriter, 1000); // Start after 1 second delay
});

// Particle background effect
class Particle {
  constructor() {
    this.x = Math.random() * window.innerWidth;
    this.y = Math.random() * window.innerHeight;
    this.size = Math.random() * 2 + 1;
    this.speedX = Math.random() * 1 - 0.5;
    this.speedY = Math.random() * 1 - 0.5;
  }

  update() {
    this.x += this.speedX;
    this.y += this.speedY;

    if (this.x > window.innerWidth || this.x < 0) {
      this.speedX = -this.speedX;
    }
    if (this.y > window.innerHeight || this.y < 0) {
      this.speedY = -this.speedY;
    }
  }

  // ... diğer kodlar ...
draw(ctx) {
  // Light theme için siyah tonları, dark theme için açık tonları kullan
  if (document.body.classList.contains('light-theme')) {
    ctx.fillStyle = 'rgba(51, 51, 51, 0.5)'; // #333 (siyah) tonu
  } else {
    ctx.fillStyle = 'rgba(245, 245, 220, 0.5)'; // #f5f5dc (krem) tonu
  }
  ctx.beginPath();
  ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
  ctx.fill();
}
// ... diğer kodlar ...
}

class ParticleSystem {
  constructor() {
    this.canvas = document.createElement('canvas');
    this.ctx = this.canvas.getContext('2d');
    this.particles = [];
    this.init();
  }

  init() {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
    document.getElementById('particles-js').appendChild(this.canvas);

    // Create particles
    for (let i = 0; i < 50; i++) {
      this.particles.push(new Particle());
    }

    this.animate();
  }

  animate = () => {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    // Update and draw particles
    for (let i = 0; i < this.particles.length; i++) {
      this.particles[i].update();
      this.particles[i].draw(this.ctx);
    }

    // Draw connections between nearby particles
    for (let i = 0; i < this.particles.length; i++) {
      for (let j = i; j < this.particles.length; j++) {
        const dx = this.particles[i].x - this.particles[j].x;
        const dy = this.particles[i].y - this.particles[j].y;
        const distance = Math.sqrt(dx * dx + dy * dy);

       // ... animate fonksiyonunun içinde ...
if (distance < 100) {
  this.ctx.beginPath();
  // Light theme için siyah, dark theme için krem tonu
  if (document.body.classList.contains('light-theme')) {
    this.ctx.strokeStyle = 'rgba(0, 0, 0, 0.1)'; // #333 (siyah) tonu
  } else {
    this.ctx.strokeStyle = 'rgba(245, 245, 220, 0.1)'; // #f5f5dc (krem) tonu
  }
  this.ctx.lineWidth = 0.5;
  this.ctx.moveTo(this.particles[i].x, this.particles[i].y);
  this.ctx.lineTo(this.particles[j].x, this.particles[j].y);
  this.ctx.stroke();
}
// ... diğer kodlar ...
      }
    }

    requestAnimationFrame(this.animate);
  }
}

// Initialize particle system when page loads
document.addEventListener('DOMContentLoaded', () => {
  new ParticleSystem();
});

// Handle window resize
window.addEventListener('resize', () => {
  const particlesContainer = document.getElementById('particles-js');
  if (particlesContainer.firstChild) {
    particlesContainer.firstChild.width = window.innerWidth;
    particlesContainer.firstChild.height = window.innerHeight;
  }
});

// Scroll spy navigation
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.menu-link');

window.addEventListener('scroll', () => {
  let current = '';
  
  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;
    
    if (pageYOffset >= (sectionTop - 200)) {
      current = section.getAttribute('id');
    }
  });
  
  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href').substring(1) === current) {
      link.classList.add('active');
    }
  });
});

// Secret Menu Functionality
const secretMenu = document.getElementById('secretMenu');
const closeSecretMenu = document.getElementById('closeSecretMenu');

// Function to open the secret menu
function openSecretMenu() {
  secretMenu.style.display = 'block';
}

// Function to close the secret menu
function closeSecretMenuFunc() {
  secretMenu.style.display = 'none';
}

// Event listeners
closeSecretMenu.addEventListener('click', closeSecretMenuFunc);

// Close if user clicks outside the modal content
window.addEventListener('click', (event) => {
  if (event.target === secretMenu) {
    closeSecretMenuFunc();
  }
});

// Trigger the secret menu by double-clicking the "Anteiku" word
const kissatenWord = document.querySelector('.kissaten-word');
if (kissatenWord) {
  kissatenWord.addEventListener('dblclick', openSecretMenu);
}

// Optional: Trigger with a keyboard shortcut (e.g., pressing 'S')
document.addEventListener('keydown', (event) => {
  if (event.key === 's' || event.key === 'S') {
    openSecretMenu();
  }
});

// Resume Modal Functionality
const resumeModal = document.getElementById('resumeModal');
const closeResumeBtn = document.getElementById('closeResume');

// Function to open the resume modal
function openResume() {
  resumeModal.style.display = 'block';
  // Prevent background scrolling when modal is open
  document.body.style.overflow = 'hidden';
}

// Function to close the resume modal
function closeResume() {
  resumeModal.style.display = 'none';
  // Re-enable background scrolling
  document.body.style.overflow = 'auto';
}

// Event listeners
closeResumeBtn.addEventListener('click', closeResume);

// Close if user clicks outside the modal content
window.addEventListener('click', (event) => {
  if (event.target === resumeModal) {
    closeResume();
  }
});

// Trigger the resume modal by clicking a "View CV" button/link somewhere in your site
// For example, you can add this button/link in the "About Me" section or Contact section:
// <a href="#" onclick="openResume()">View CV</a>
// Or you can create a dedicated button in the header or footer.
// Example button in the "About Me" section:
// <a href="#" class="cv-btn" onclick="openResume()">View CV</a>

// Optional: Trigger with a keyboard shortcut (e.g., pressing 'C')
document.addEventListener('keydown', (event) => {
  if (event.key === 'c' || event.key === 'C') {
    openResume();
  }
});