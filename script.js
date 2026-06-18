/**
 * Morrow Technology — Site Scripts
 * ============================================
 * TODO: Update the CONFIG object below with your
 * email, phone number, Calendly URL, and HelpWire URL.
 * ============================================
 */

const CONFIG = {
  email: 'morrowtechfl@gmail.com',
  phone: '954-994-6688',
  phoneTel: '+19549946688',
  calendlyUrl: 'https://calendly.com/morrowtechnology',
  helpWireUrl: 'https://www.helpwire.app/',
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

  menu.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      toggle.setAttribute('aria-expanded', 'false');
      menu.classList.remove('is-open');
    });
  });

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

/** Apply CONFIG links — keeps one place to update URLs later */
function applyConfigLinks() {
  const mailto = `mailto:${CONFIG.email}`;

  document.querySelectorAll(
    '#hero-request-support, #contact-request-support, .pricing-book-btn, .cta-band .btn'
  ).forEach((el) => {
    el.href = CONFIG.calendlyUrl;
    el.target = '_blank';
    el.rel = 'noopener noreferrer';
  });

  document.querySelectorAll('#hero-email, #contact-email-btn').forEach((el) => {
    el.href = mailto;
  });

  document.querySelectorAll('#contact-phone, #footer-phone').forEach((el) => {
    el.href = `tel:${CONFIG.phoneTel}`;
    el.textContent = CONFIG.phone;
  });

  const quoteBtn = document.getElementById('pricing-quote-btn');
  if (quoteBtn) quoteBtn.href = mailto;

  const helpWireLink = document.getElementById('helpwire-link');
  if (helpWireLink) helpWireLink.href = CONFIG.helpWireUrl;
}

/** Scroll to the very top of the page */
function scrollToTop(smooth = true) {
  const behavior = smooth ? 'smooth' : 'auto';

  window.scrollTo({ top: 0, left: 0, behavior });
  document.documentElement.scrollTop = 0;
  document.body.scrollTop = 0;

  if (smooth) {
    window.setTimeout(() => {
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
    }, 450);
  }
}

/** Smooth scroll for in-page anchor links only */
function initSmoothScroll() {
  if (window.location.hash === '#top') {
    scrollToTop(false);
  }

  const siteLogo = document.getElementById('site-logo');

  if (siteLogo) {
    siteLogo.addEventListener('click', (e) => {
      e.preventDefault();
      scrollToTop(true);
    });
  }

  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    if (anchor.id === 'site-logo') return;

    anchor.addEventListener('click', (e) => {
      const targetId = anchor.getAttribute('href');
      if (!targetId || targetId === '#') return;

      if (targetId === '#top') {
        e.preventDefault();
        scrollToTop(true);
        return;
      }

      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });
}
