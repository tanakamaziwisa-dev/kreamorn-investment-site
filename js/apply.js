function byId(id) { return document.getElementById(id); }

const applyForm = byId('loanApplicationForm');

if (applyForm) {
  const loanType = byId('loanType');
  const salaryFields = byId('salaryFields');
  const businessFields = byId('businessFields');
  const payslipInput = byId('payslipUpload');
  const businessDocsInput = byId('businessDocsUpload');
  const statusBox = byId('applyStatus');

  function updateConditionalFields() {
    const selected = loanType.value;
    const isSalary = selected === 'salary';
    const isBusiness = selected === 'business';

    salaryFields.hidden = !isSalary;
    businessFields.hidden = !isBusiness;

    salaryFields.querySelectorAll('input').forEach(input => {
      input.required = isSalary;
    });

    businessFields.querySelectorAll('input').forEach(input => {
      input.required = isBusiness;
    });

    payslipInput.required = isSalary;
    businessDocsInput.required = false;
  }

  function setStatus(type, message) {
    statusBox.className = `status-message ${type === 'success' ? 'status-success' : 'status-error'}`;
    statusBox.style.display = 'block';
    statusBox.textContent = message;
  }

  loanType.addEventListener('change', updateConditionalFields);
  updateConditionalFields();

  applyForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    const honeypot = byId('websiteField');
    if (honeypot.value) {
      setStatus('error', 'Submission blocked.');
      return;
    }

    const formData = new FormData(applyForm);
    try {
      const response = await fetch(SITE_CONFIG.applyEndpoint, {
        method: 'POST',
        body: formData
      });

      if (!response.ok) {
        throw new Error('Submission failed');
      }

      setStatus('success', 'Thank you. Your application has been submitted successfully. For urgent support, use WhatsApp Now.');
      applyForm.reset();
      updateConditionalFields();
    } catch (error) {
      setStatus('error', 'We could not submit your application right now. Please retry shortly or use WhatsApp Now for immediate support.');
    }
  });
}
