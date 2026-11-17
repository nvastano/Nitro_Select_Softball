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

// Tryout registration form → Google Sheets
const tryoutForm = document.getElementById('tryoutForm');
if (tryoutForm) {
  const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbwc8crNGc0q0X-GsaZD6QL9jKppXEF-EbDdB_AHVUzAFams2Q6TZMyE-UxfICR9Xg4s/exec';
  const status = document.getElementById('formStatus');

  tryoutForm.addEventListener('submit', async e => {
    e.preventDefault();
    const btn = tryoutForm.querySelector('button[type="submit"]');
    btn.disabled = true;
    btn.textContent = 'Sending…';
    status.textContent = '';

    const data = Object.fromEntries(new FormData(tryoutForm));
    try {
      await fetch(SCRIPT_URL, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: { 'Content-Type': 'application/json' },
        mode: 'no-cors'
      });
      status.textContent = '✓ Registration received! We\'ll be in touch.';
      status.style.color = '#6fcf97';
      tryoutForm.reset();
    } catch {
      status.textContent = 'Something went wrong. Please email us directly.';
      status.style.color = '#eb5757';
    } finally {
      btn.disabled = false;
      btn.textContent = 'Submit';
    }
  });
}
