/* ============================================================
   AI AVATAR VIDEOS — script.js
   YouTube iframes handle their own playback controls.
   This script handles page-level interactions and polish.
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

  // Animate cards into view on scroll
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.video-card, .hero-card').forEach(card => {
    observer.observe(card);
  });

  // Cyan glow pulse on tool badge hover
  document.querySelectorAll('.tool-badge').forEach(badge => {
    badge.addEventListener('mouseenter', () => {
      badge.style.boxShadow = '0 0 12px rgba(0, 212, 255, 0.4)';
    });
    badge.addEventListener('mouseleave', () => {
      badge.style.boxShadow = 'none';
    });
  });

});
