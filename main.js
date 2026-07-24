// Mobile nav toggle
const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');

navToggle.addEventListener('click', () => {
  const open = navLinks.classList.toggle('open');
  navToggle.setAttribute('aria-expanded', open);
});

// Mobile dropdown toggle
document.querySelectorAll('.nav-dropdown-toggle').forEach(trigger => {
  trigger.addEventListener('click', e => {
    e.preventDefault();
    trigger.closest('.nav-dropdown').classList.toggle('open');
  });
});

// Close nav on link click (mobile), skip dropdown triggers
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    if (link.classList.contains('nav-dropdown-toggle')) return;
    navLinks.classList.remove('open');
    navToggle.setAttribute('aria-expanded', false);
    document.querySelectorAll('.nav-dropdown.open').forEach(dd => dd.classList.remove('open'));
  });
});

// Active nav link on scroll
const sections = document.querySelectorAll('section[id]');
const links = document.querySelectorAll('.nav-links a[href^="#"]');

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      links.forEach(l => l.classList.remove('active'));
      const active = document.querySelector(`.nav-links a[href="#${entry.target.id}"]`);
      if (active) active.classList.add('active');
    }
  });
}, { rootMargin: '-40% 0px -55% 0px' });

sections.forEach(s => observer.observe(s));
