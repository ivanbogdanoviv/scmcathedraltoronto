/* ============================================================
   Sts. Cyril & Methody — Form Submissions → Google Sheets
   ============================================================ */

var SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbymi4HORDzNi5GZVPr0DQ4xqpHxm2SW5bzLwMgEO5jODdqv8MAKWxThB0BcAn9_I5os/exec';

function sendToSheets(data, onSuccess, onError) {
  fetch(SCRIPT_URL, {
    method: 'POST',
    mode: 'no-cors',
    body: JSON.stringify(data)
  })
    .then(function () { onSuccess(); })
    .catch(function (err) { onError(err.toString()); });
}

function val(id) {
  var el = document.getElementById(id);
  return el ? el.value.trim() : '';
}

function setBtn(btn, text, disabled) {
  if (!btn) return;
  btn.textContent = text;
  btn.disabled = disabled;
}

/* ── Hall Booking ─────────────────────────────────────────── */
(function () {
  var form = document.getElementById('hall-inquiry-form');
  var result = document.getElementById('inquiry-result');
  var offlineNote = document.getElementById('form-offline-note');
  if (!form) return;

  if (offlineNote) offlineNote.style.display = 'none';

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var btn = form.querySelector('button[type="submit"]');
    var name = val('iq-name');
    var email = val('iq-email');

    if (!name || !email) {
      showResult(result, 'Please fill in your name and email address.', false);
      return;
    }

    var addons = Array.from(form.querySelectorAll('.iq-addon:checked')).map(function (c) { return c.value; }).join(', ');

    var data = {
      formType: 'hall',
      name: name,
      email: email,
      phone: val('iq-phone'),
      eventType: val('iq-event-type'),
      eventDate: val('iq-preferred-date') + (val('iq-alt-date') ? ' (alt: ' + val('iq-alt-date') + ')' : ''),
      guestCount: val('iq-guests'),
      hall: val('iq-duration'),
      hours: val('iq-start-time') + (val('iq-end-time') ? '–' + val('iq-end-time') : ''),
      catering: addons || 'None',
      message: (val('iq-requests') || '') + (val('iq-how') ? ' | Heard via: ' + val('iq-how') : '')
    };

    setBtn(btn, 'Sending…', true);

    sendToSheets(data, function () {
      setBtn(btn, 'Send Inquiry & Get Quote', false);
      form.reset();
      showResult(result, '✓ Your inquiry has been received! We will contact you within 1 business day.', true);
    }, function () {
      setBtn(btn, 'Send Inquiry & Get Quote', false);
      showResult(result, '✗ Something went wrong. Please call us at 416-368-2828.', false);
    });
  });
})();

/* ── School Enrolment ─────────────────────────────────────── */
(function () {
  var form = document.getElementById('school-enrol-form');
  var msg = document.getElementById('enrol-msg');
  if (!form) return;

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var btn = form.querySelector('button[type="submit"]');
    var parentName = val('parent-name');
    var phone = val('parent-phone');

    if (!parentName || !phone) {
      showMsg(msg, 'Please fill in your name and phone number.', false);
      return;
    }

    var data = {
      formType: 'school',
      parentName: parentName,
      email: val('parent-email'),
      phone: phone,
      childName: val('child-name'),
      childDob: val('child-dob'),
      grade: val('child-lang'),
      previousExp: '',
      message: val('enrol-notes')
    };

    setBtn(btn, 'Sending…', true);

    sendToSheets(data, function () {
      setBtn(btn, 'Submit Enrolment Inquiry', false);
      form.reset();
      showMsg(msg, '✓ Enrolment inquiry received! We will contact you before the next Sunday.', true);
    }, function () {
      setBtn(btn, 'Submit Enrolment Inquiry', false);
      showMsg(msg, '✗ Something went wrong. Please call 416-368-2828.', false);
    });
  });
})();

/* ── Donation Intent ──────────────────────────────────────── */
(function () {
  var form = document.getElementById('donation-contact-form');
  var success = document.getElementById('donation-success');
  if (!form) return;

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var btn = form.querySelector('button[type="submit"]');
    var name = val('donor-name');
    var email = val('donor-email');

    if (!name || !email) {
      alert('Please fill in your name and email address.');
      return;
    }

    var data = {
      formType: 'donation',
      name: name,
      email: email,
      phone: val('donor-phone'),
      purpose: val('donation-purpose'),
      message: val('donation-message')
    };

    setBtn(btn, 'Sending…', true);

    sendToSheets(data, function () {
      form.style.display = 'none';
      if (success) success.style.display = 'block';
    }, function () {
      setBtn(btn, '❤ Submit Donation Intent', false);
      alert('Something went wrong. Please call us at 416-368-2828 or email scmcathedraltoronto@hotmail.com');
    });
  });
})();

/* ── Helpers ──────────────────────────────────────────────── */
function showResult(el, text, ok) {
  if (!el) return;
  el.textContent = text;
  el.style.display = 'block';
  el.style.padding = '14px 18px';
  el.style.borderRadius = '8px';
  el.style.marginTop = '16px';
  el.style.fontFamily = "'PT Serif', serif";
  el.style.fontSize = '0.95rem';
  el.style.background = ok ? '#f0faf0' : '#fff0f0';
  el.style.color = ok ? '#2a6a2a' : '#b00';
  el.style.border = ok ? '1px solid #b6ddb6' : '1px solid #f5b5b5';
}

function showMsg(el, text, ok) {
  if (!el) return;
  el.textContent = text;
  el.style.display = 'block';
  el.style.padding = '12px 16px';
  el.style.borderRadius = '6px';
  el.style.background = ok ? '#f0faf0' : '#fff0f0';
  el.style.color = ok ? '#2a6a2a' : '#b00';
}
