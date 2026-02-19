const contactForm = document.getElementById('contactForm');

if (contactForm) {
  const statusBox = document.getElementById('contactStatus');

  function setStatus(type, message) {
    statusBox.className = `status-message ${type === 'success' ? 'status-success' : 'status-error'}`;
    statusBox.style.display = 'block';
    statusBox.textContent = message;
  }

  contactForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    const data = new FormData(contactForm);
    try {
      const response = await fetch(SITE_CONFIG.contactEndpoint, { method: 'POST', body: data });
      if (!response.ok) throw new Error('Failed');
      setStatus('success', 'Message sent successfully. Our team will contact you shortly.');
      contactForm.reset();
    } catch {
      setStatus('error', 'Message could not be sent right now. Please contact us via WhatsApp or phone.');
    }
  });
}
