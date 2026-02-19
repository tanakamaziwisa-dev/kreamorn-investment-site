const SITE_CONFIG = {
  applyEndpoint: '/api/apply',
  contactEndpoint: '/api/contact',
  whatsappUrl: 'https://wa.me/263770000000?text=Hello%20Kreamorn%20Investments%2C%20I%20need%20loan%20assistance.'
};

const CONTACT_DETAILS = {
  phone: '+263 77 000 0000',
  email: 'info@kreamorn.co.zw',
  address: 'Harare CBD, Zimbabwe (Placeholder Address)'
};

function setContactPlaceholders() {
  document.querySelectorAll('[data-contact="phone"]').forEach(el => el.textContent = CONTACT_DETAILS.phone);
  document.querySelectorAll('[data-contact="email"]').forEach(el => el.textContent = CONTACT_DETAILS.email);
  document.querySelectorAll('[data-contact="address"]').forEach(el => el.textContent = CONTACT_DETAILS.address);
  document.querySelectorAll('[data-contact-link="phone"]').forEach(el => el.href = `tel:${CONTACT_DETAILS.phone.replace(/\s+/g, '')}`);
  document.querySelectorAll('[data-contact-link="email"]').forEach(el => el.href = `mailto:${CONTACT_DETAILS.email}`);
}

function setupReveal() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
}

document.querySelectorAll('[data-whatsapp-link]').forEach(el => {
  el.href = SITE_CONFIG.whatsappUrl;
});

setContactPlaceholders();
setupReveal();
