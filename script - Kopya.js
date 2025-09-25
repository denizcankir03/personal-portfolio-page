// script.js
// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    
    const targetId = this.getAttribute('href');
    const targetElement = document.querySelector(targetId);
    
    if (targetElement) {
      window.scrollTo({
        top: targetElement.offsetTop - 80,
        behavior: 'smooth'
      });
    }
  });
});

// Add blood droplet effect to welcome section
document.addEventListener('DOMContentLoaded', function() {
  const welcomeSection = document.getElementById('welcome-section');
  
  // Create blood droplets
  for (let i = 0; i < 8; i++) {
    const droplet = document.createElement('div');
    droplet.className = 'blood-droplet';
    droplet.style.left = Math.random() * 100 + 'vw';
    droplet.style.animationDelay = Math.random() * 5 + 's';
    droplet.style.opacity = Math.random() * 0.4 + 0.1;
    welcomeSection.appendChild(droplet);
  }
  
  // Add subtle mask animation
  const masks = document.querySelectorAll('.mask');
  masks.forEach((mask, index) => {
    setTimeout(() => {
      mask.style.animation = 'pulse 4s ease-in-out infinite';
      mask.style.animationDelay = `${index * 0.3}s`;
    }, 200);
  });
});

// Add hover effect enhancement for social links
const socialLinks = document.querySelectorAll('.social-link');
socialLinks.forEach(link => {
  link.addEventListener('mouseenter', function() {
    this.style.transform = 'translateY(-5px) scale(1.1)';
  });
  
  link.addEventListener('mouseleave', function() {
    this.style.transform = 'translateY(0) scale(1)';
  });
});

// Add CSS animations via JavaScript
const style = document.createElement('style');
style.textContent = `
  @keyframes pulse {
    0%, 100% { transform: scale(1); }
    50% { transform: scale(1.05); }
  }
`;
document.head.appendChild(style);