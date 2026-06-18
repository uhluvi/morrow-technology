/**
 * Morrow Technology — Site Scripts
 * ============================================
 * TODO: Update the CONFIG object below with your
 * real links when ready (Google Form, Calendly,
 * Stripe, HelpWire, phone number, etc.)
 * ============================================
 */

const CONFIG = {
  // Business contact
  email: 'morrowtechfl@gmail.com',
  phone: '954-994-6688',
  phoneTel: '+19549946688',

  // Action links — replace # placeholders with real URLs
  requestSupportUrl: 'https://calendly.com/morrowtechnology',
  stripe30MinUrl: '#',           // TODO: Stripe payment link — 30 min
  stripe60MinUrl: '#',           // TODO: Stripe payment link — 60 min
  stripeGeneralUrl: '#',           // TODO: General Stripe link (disclaimer)
  helpWireUrl: '#',                // TODO: HelpWire info or signup URL
};

document.addEventListener('DOMContentLoaded', () => {
  initMobileNav();
  initFooterYear();
  applyConfigLinks();
  initSmoothScroll();
});

/** Mobile navigation toggle */
function initMobileNav() {
  const toggle = document.querySelector('.nav-toggle');
  const menu = document.querySelector('.nav-menu');

  if (!toggle || !menu) return;

  toggle.addEventListener('click', () => {
    const isOpen = toggle.getAttribute('aria-expanded') === 'true';
    toggle.setAttribute('aria-expanded', String(!isOpen));
    menu.classList.toggle('is-open', !isOpen);
  });

  // Close menu when a nav link is clicked
  menu.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      toggle.setAttribute('aria-expanded', 'false');
      menu.classList.remove('is-open');
    });
  });

  // Close menu on escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      toggle.setAttribute('aria-expanded', 'false');
      menu.classList.remove('is-open');
    }
  });
}

/** Set current year in footer */
function initFooterYear() {
  const yearEl = document.getElementById('year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }
}

/**
 * Apply CONFIG links to buttons and anchors.
 * Search for data-link attributes or known IDs.
 */
function applyConfigLinks() {
  const mailto = `mailto:${CONFIG.email}`;

  // Request Support buttons (opens Calendly in new tab)
  document.querySelectorAll('#hero-request-support, #contact-request-support').forEach((el) => {
    el.href = CONFIG.requestSupportUrl;
    el.target = '_blank';
    el.rel = 'noopener noreferrer';
  });

  // Email buttons
  document.querySelectorAll('#hero-email, #contact-email-btn').forEach((el) => {
    el.href = mailto;
  });

  // Phone links
  document.querySelectorAll('#contact-phone, #footer-phone').forEach((el) => {
    el.href = `tel:${CONFIG.phoneTel}`;
    el.textContent = CONFIG.phone;
  });

  // Pricing Stripe links
  const pricingLinks = document.querySelectorAll('.pricing-card .btn');
  if (pricingLinks[0]) pricingLinks[0].href = CONFIG.stripe30MinUrl;
  if (pricingLinks[1]) pricingLinks[1].href = CONFIG.stripe60MinUrl;

  // HelpWire link in hero
  const helpWireLink = document.querySelector('.trust-line .inline-link');
  if (helpWireLink) helpWireLink.href = CONFIG.helpWireUrl;

  // Stripe link in pricing disclaimer
  const disclaimerStripe = document.querySelector('.disclaimer .inline-link');
  if (disclaimerStripe) disclaimerStripe.href = CONFIG.stripeGeneralUrl;
}

/** Smooth scroll for in-page anchor links */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', (e) => {
      const targetId = anchor.getAttribute('href');
      if (!targetId || targetId === '#') return;

      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });
}
