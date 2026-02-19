# Kreamorn Investments (Pvt) Ltd Static Website

Premium, conversion-focused multi-page static website for a Zimbabwean microfinance institution, optimized for GitHub Pages and online loan applications.

## Project structure

- `index.html` – Home page
- `services.html` – Loan products and requirements
- `apply.html` – Main conversion page with online application form
- `about.html` – Company profile
- `contact.html` – Contact form and placeholders
- `privacy.html` – Privacy policy
- `terms.html` – Terms and conditions
- `responsible-lending.html` – Responsible lending commitment
- `css/styles.css` – Shared design system and responsive styling
- `js/main.js` – Global config, WhatsApp links, contact placeholders, reveal animations
- `js/apply.js` – Apply form conditional logic + submit handling
- `js/contact.js` – Contact form submit handling
- `assets/` – Favicon and OG placeholders

## Quick start (local)

1. Clone or download the repository.
2. Open `index.html` in your browser OR run a simple static server:
   - Python: `python -m http.server 8080`
3. Visit `http://localhost:8080`.

## Deploy to GitHub Pages

1. Push this project to a GitHub repository.
2. Open **Repository Settings → Pages**.
3. Under **Build and deployment**, set:
   - **Source**: Deploy from a branch
   - **Branch**: `main` (or your default branch), folder `/ (root)`
4. Save and wait for deployment.
5. Your site will be available at the GitHub Pages URL shown in settings.

## Form endpoint configuration (single place)

Edit `js/main.js`:

```js
const SITE_CONFIG = {
  applyEndpoint: '/api/apply',
  contactEndpoint: '/api/contact',
  whatsappUrl: 'https://wa.me/263770000000?text=Hello%20Kreamorn%20Investments%2C%20I%20need%20loan%20assistance.'
};
```

Update `applyEndpoint` and `contactEndpoint` to your real backend endpoint.

---

## Option 1: Formspree (email forwarding)

### Apply form
1. Create a Formspree account at https://formspree.io.
2. Create a new form endpoint.
3. Copy endpoint URL (e.g. `https://formspree.io/f/xyzabcde`).
4. Set `SITE_CONFIG.applyEndpoint` in `js/main.js`.

### Contact form
1. Create a second Formspree form (or reuse same endpoint if desired).
2. Set `SITE_CONFIG.contactEndpoint` in `js/main.js`.

Formspree supports file uploads on paid tiers; if unavailable, remove file inputs or use Option 2.

---

## Option 2: Google Apps Script → Google Sheet logging

1. Create a Google Sheet with columns matching your form fields.
2. Open **Extensions → Apps Script**.
3. Add a `doPost(e)` script that parses incoming form data and appends a row.
4. Deploy as **Web App**:
   - Execute as: Me
   - Access: Anyone with the link (or appropriate restriction)
5. Copy web app URL and paste into:
   - `SITE_CONFIG.applyEndpoint`
   - `SITE_CONFIG.contactEndpoint`

### Minimal Apps Script example

```javascript
function doPost(e) {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Applications');
  var data = JSON.parse(e.postData.contents || '{}');
  sheet.appendRow([
    new Date(),
    data.fullName || '',
    data.idNumber || '',
    data.phone || '',
    data.email || '',
    data.loanType || '',
    data.loanAmount || ''
  ]);
  return ContentService
    .createTextOutput(JSON.stringify({ ok: true }))
    .setMimeType(ContentService.MimeType.JSON);
}
```

If you keep `FormData` submission (current implementation), parse request parameters instead of JSON.

## Edit contact placeholders

Update `CONTACT_DETAILS` in `js/main.js`:

```js
const CONTACT_DETAILS = {
  phone: '+263 77 000 0000',
  email: 'info@kreamorn.co.zw',
  address: 'Harare CBD, Zimbabwe (Placeholder Address)'
};
```

## Notes

- This is a static site; no server-side loan approval logic is included.
- Compliance pages are general informational text and not legal advice.
