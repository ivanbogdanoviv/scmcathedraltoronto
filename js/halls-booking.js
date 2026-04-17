/* ============================================================
   Halls Booking — Availability Calendar + Quote Calculator
   + Inquiry Form  (halls.html)
   ============================================================ */
(function () {
  'use strict';

  // ─── Pricing (mirrors server.js) ─────────────────────────────
  var PRICING = {
    wedding:    { full: 3500, half: 2100 },
    reception:  { full: 2500, half: 1500 },
    concert:    { full: 2000, half: 1200 },
    conference: { full: 1800, half: 1100 },
    community:  { full: 1200, half:  750 },
    memorial:   { full:  800, half:  500 },
    other:      { full: 1800, half: 1100 },
  };
  var ADDON_PRICES = { av: 200, bar: 300, piano: 150, kitchen: 150 };
  var DEPOSIT = 500;

  // ─── State ────────────────────────────────────────────────────
  var serverOnline   = false;
  var availability   = { bookedDates: [], pendingDates: [], heldDates: [] };
  var selectedDate   = '';
  var currentOffset  = 0;   // months offset from today for calendar start

  // ─── Helpers ──────────────────────────────────────────────────
  function fmt(n) { return n < 10 ? '0' + n : String(n); }

  function toISO(y, m, d) {
    return y + '-' + fmt(m + 1) + '-' + fmt(d);
  }

  function todayISO() {
    var d = new Date();
    return toISO(d.getFullYear(), d.getMonth(), d.getDate());
  }

  function formatMoney(n) {
    return '$' + n.toLocaleString('en-CA');
  }

  // ─── Detect server ────────────────────────────────────────────
  async function detectServer() {
    try {
      var r = await fetch('/api/ping', { signal: AbortSignal.timeout(2000) });
      serverOnline = r.ok;
    } catch (e) {
      serverOnline = false;
    }
    return serverOnline;
  }

  // ─── Availability Calendar ────────────────────────────────────
  async function loadAvailability() {
    if (!serverOnline) return;
    try {
      var r = await fetch('/api/availability');
      if (r.ok) availability = await r.json();
    } catch (e) { /* silent */ }
  }

  function getDateStatus(iso) {
    var today = todayISO();
    if (iso < today)                          return 'past';
    if (availability.bookedDates.indexOf(iso)  > -1) return 'booked';
    if (availability.pendingDates.indexOf(iso) > -1) return 'pending';
    if (availability.heldDates.indexOf(iso)    > -1) return 'held';
    return 'available';
  }

  var MONTH_NAMES = ['January','February','March','April','May','June',
                     'July','August','September','October','November','December'];
  var DOW_ABBR    = ['Su','Mo','Tu','We','Th','Fr','Sa'];

  function renderCalendarMonth(year, month) {
    var block = document.createElement('div');
    block.className = 'cal-month-block';

    var header = document.createElement('div');
    header.className = 'cal-month-header';
    header.textContent = MONTH_NAMES[month] + ' ' + year;
    block.appendChild(header);

    var dowRow = document.createElement('div');
    dowRow.className = 'cal-dow-row';
    DOW_ABBR.forEach(function (d) {
      var cell = document.createElement('div');
      cell.className = 'cal-dow';
      cell.textContent = d;
      dowRow.appendChild(cell);
    });
    block.appendChild(dowRow);

    var grid = document.createElement('div');
    grid.className = 'cal-days-grid';

    var firstDay = new Date(year, month, 1).getDay(); // 0=Sun
    var daysInMonth = new Date(year, month + 1, 0).getDate();
    var today = todayISO();

    // Empty leading cells
    for (var i = 0; i < firstDay; i++) {
      var empty = document.createElement('div');
      empty.className = 'cal-day empty';
      grid.appendChild(empty);
    }

    for (var d = 1; d <= daysInMonth; d++) {
      var iso    = toISO(year, month, d);
      var status = serverOnline ? getDateStatus(iso) : (iso < today ? 'past' : 'unknown');
      var cell   = document.createElement('div');
      cell.className = 'cal-day ' + status;
      if (iso === today) cell.classList.add('today');
      if (iso === selectedDate && status === 'available') cell.classList.add('selected');
      cell.textContent = d;
      cell.dataset.date = iso;

      if (status === 'available') {
        cell.title = 'Available — click to select';
        cell.addEventListener('click', function () {
          selectDate(this.dataset.date);
        });
      } else if (status === 'pending') {
        cell.title = 'Pending inquiry';
      } else if (status === 'booked') {
        cell.title = 'Booked';
      } else if (status === 'held') {
        cell.title = 'Held / Reserved';
      }

      grid.appendChild(cell);
    }

    block.appendChild(grid);
    return block;
  }

  function renderCalendar() {
    var wrap = document.getElementById('avail-calendar');
    if (!wrap) return;
    wrap.innerHTML = '';

    if (!serverOnline) {
      wrap.innerHTML =
        '<div class="cal-offline-msg">' +
        '<strong>Live calendar not available</strong>' +
        'Start the local booking server to see live availability.<br>' +
        '<code style="font-size:0.82rem;background:rgba(0,0,0,0.06);padding:2px 6px;border-radius:4px;">node server.js</code>' +
        '<br><br>Or call us at <strong>416-368-2828</strong> to check dates.' +
        '</div>';
      return;
    }

    var now   = new Date();
    var year  = now.getFullYear();
    var month = now.getMonth() + currentOffset;

    // Normalise overflow months
    year  += Math.floor(month / 12);
    month  = ((month % 12) + 12) % 12;

    for (var i = 0; i < 3; i++) {
      var y = year + Math.floor((month + i) / 12);
      var m = (month + i) % 12;
      wrap.appendChild(renderCalendarMonth(y, m));
    }

    // Navigation buttons
    var nav = document.createElement('div');
    nav.style.cssText = 'display:flex;justify-content:center;gap:16px;margin-top:16px;width:100%';

    var prev = document.createElement('button');
    prev.textContent = '← Earlier months';
    prev.style.cssText = 'background:none;border:1.5px solid rgba(44,24,16,0.25);padding:8px 18px;border-radius:6px;cursor:pointer;font-family:Open Sans,sans-serif;font-size:0.82rem;color:#2C1810;';
    prev.addEventListener('click', function () { currentOffset -= 3; renderCalendar(); });

    var next = document.createElement('button');
    next.textContent = 'Later months →';
    next.style.cssText = prev.style.cssText;
    next.addEventListener('click', function () { currentOffset += 3; renderCalendar(); });

    if (currentOffset <= 0) prev.disabled = true;
    nav.appendChild(prev);
    nav.appendChild(next);
    wrap.appendChild(nav);
  }

  function selectDate(iso) {
    selectedDate = iso;
    // Update calendar highlight
    document.querySelectorAll('.cal-day.available').forEach(function (el) {
      el.classList.toggle('selected', el.dataset.date === iso);
    });
    // Pre-fill form date
    var dateField = document.getElementById('iq-preferred-date');
    if (dateField) {
      dateField.value = iso;
      dateField.classList.remove('invalid');
    }
    // Scroll to form
    var formSec = document.getElementById('inquiry');
    if (formSec) {
      formSec.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  // ─── Quote Calculator ─────────────────────────────────────────
  function calcQuote() {
    var type      = (document.getElementById('iq-event-type')  || {}).value;
    var duration  = (document.getElementById('iq-duration')    || {}).value || 'full';
    var addons    = Array.from(document.querySelectorAll('.iq-addon:checked')).map(function (c) { return c.value; });

    var prices = PRICING[type] || PRICING.other;
    var base   = type ? (prices[duration] || prices.full) : 0;
    var addonTotal = addons.reduce(function (s, a) { return s + (ADDON_PRICES[a] || 0); }, 0);
    var total  = base + addonTotal + (base > 0 ? DEPOSIT : 0);

    return { base: base, addons: addonTotal, deposit: base > 0 ? DEPOSIT : 0, total: total };
  }

  function updateQuotePanel() {
    var q = calcQuote();

    var qEmpty  = document.getElementById('quote-empty');
    var qRows   = document.getElementById('quote-rows');
    var qBase   = document.getElementById('q-base');
    var qAddon  = document.getElementById('q-addon');
    var qAddonR = document.getElementById('q-addon-row');
    var qDep    = document.getElementById('q-deposit');
    var qTotal  = document.getElementById('q-total');

    if (!qRows) return;

    if (q.base === 0) {
      if (qEmpty) qEmpty.style.display = 'block';
      qRows.style.display = 'none';
      return;
    }
    if (qEmpty) qEmpty.style.display = 'none';
    qRows.style.display = 'block';

    if (qBase)   qBase.textContent  = formatMoney(q.base);
    if (qAddonR) qAddonR.style.display = q.addons > 0 ? 'flex' : 'none';
    if (qAddon)  qAddon.textContent  = formatMoney(q.addons);
    if (qDep)    qDep.textContent   = formatMoney(q.deposit);
    if (qTotal)  qTotal.textContent = formatMoney(q.total);
  }

  // ─── Inquiry Form ─────────────────────────────────────────────
  function validateForm() {
    var ok = true;
    ['iq-name','iq-email','iq-event-type','iq-preferred-date'].forEach(function (id) {
      var el = document.getElementById(id);
      if (!el) return;
      if (!el.value.trim()) {
        el.classList.add('invalid');
        ok = false;
      } else {
        el.classList.remove('invalid');
      }
    });
    // Email format
    var emailEl = document.getElementById('iq-email');
    if (emailEl && emailEl.value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailEl.value)) {
      emailEl.classList.add('invalid');
      ok = false;
    }
    return ok;
  }

  function getFormData() {
    function val(id)  { var e = document.getElementById(id); return e ? e.value.trim() : ''; }
    var addons = Array.from(document.querySelectorAll('.iq-addon:checked')).map(function (c) { return c.value; });
    return {
      name:            val('iq-name'),
      email:           val('iq-email'),
      phone:           val('iq-phone'),
      eventType:       val('iq-event-type'),
      preferredDate:   val('iq-preferred-date'),
      altDate:         val('iq-alt-date'),
      startTime:       val('iq-start-time'),
      endTime:         val('iq-end-time'),
      duration:        val('iq-duration'),
      guestCount:      val('iq-guests'),
      addons:          addons,
      specialRequests: val('iq-requests'),
      hearAboutUs:     val('iq-how'),
    };
  }

  async function submitInquiry(data) {
    if (serverOnline) {
      var r = await fetch('/api/inquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!r.ok) {
        var err = await r.json().catch(function () { return {}; });
        throw new Error(err.error || 'Server error');
      }
      return await r.json();
    }
    // Offline fallback — open mailto
    var q = calcQuote();
    var body =
      'Name: ' + data.name + '\n' +
      'Email: ' + data.email + '\n' +
      'Phone: ' + (data.phone || '') + '\n\n' +
      'Event Type: ' + data.eventType + '\n' +
      'Preferred Date: ' + data.preferredDate + '\n' +
      'Duration: ' + data.duration + '\n' +
      'Guests: ' + data.guestCount + '\n' +
      'Add-ons: ' + (data.addons.join(', ') || 'none') + '\n\n' +
      'Special Requests:\n' + (data.specialRequests || 'none') + '\n\n' +
      'Estimated Total: ' + formatMoney(q.total);

    window.location.href =
      'mailto:scmcathedraltoronto@hotmail.com' +
      '?subject=' + encodeURIComponent('Hall Rental Inquiry — ' + data.preferredDate) +
      '&body='    + encodeURIComponent(body);

    return { ok: true, fallback: true };
  }

  function showResult(type, html) {
    var el = document.getElementById('inquiry-result');
    if (!el) return;
    el.className = 'inquiry-result ' + type + ' visible';
    el.innerHTML = html;
    el.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }

  function initForm() {
    var form = document.getElementById('hall-inquiry-form');
    if (!form) return;

    // Show offline notice if server not running
    if (!serverOnline) {
      var note = document.getElementById('form-offline-note');
      if (note) note.classList.add('visible');
    }

    // Live quote updates
    ['iq-event-type','iq-duration'].forEach(function (id) {
      var el = document.getElementById(id);
      if (el) el.addEventListener('change', updateQuotePanel);
    });
    document.querySelectorAll('.iq-addon').forEach(function (el) {
      el.addEventListener('change', updateQuotePanel);
    });

    // Clear invalid state on input
    form.querySelectorAll('input, select, textarea').forEach(function (el) {
      el.addEventListener('input', function () { this.classList.remove('invalid'); });
    });

    // Submit
    form.addEventListener('submit', async function (e) {
      e.preventDefault();
      if (!validateForm()) {
        // Shake the button
        var btn = form.querySelector('.inquiry-submit-btn');
        if (btn) { btn.style.animation = 'none'; setTimeout(function () { btn.style.animation = ''; }, 10); }
        return;
      }

      var btn = form.querySelector('.inquiry-submit-btn');
      var origText = btn ? btn.textContent : '';
      if (btn) { btn.disabled = true; btn.textContent = 'Sending…'; }

      try {
        var result = await submitInquiry(getFormData());
        if (result.fallback) {
          showResult('success',
            '<div class="inquiry-result-icon">✉</div>' +
            '<h3>Email Client Opened</h3>' +
            '<p>Please send the email to complete your inquiry. We will respond within 1–2 business days.</p>'
          );
        } else {
          var q = result.quote || {};
          showResult('success',
            '<div class="inquiry-result-icon">✅</div>' +
            '<h3>Inquiry Received!</h3>' +
            '<p>Thank you! A confirmation has been sent to your email. We will contact you within 1–2 business days to confirm availability.</p>' +
            (q.total ? '<p style="margin-top:12px;font-size:0.85rem;color:#777">Estimated total: <strong>' + formatMoney(q.total) + '</strong></p>' : '')
          );
          form.style.display = 'none';
        }
      } catch (err) {
        showResult('error',
          '<div class="inquiry-result-icon">⚠</div>' +
          '<h3>Submission Failed</h3>' +
          '<p>' + (err.message || 'An error occurred. Please try again or call 416-368-2828.') + '</p>'
        );
        if (btn) { btn.disabled = false; btn.textContent = origText; }
      }
    });
  }

  // ─── Init ─────────────────────────────────────────────────────
  document.addEventListener('DOMContentLoaded', async function () {
    await detectServer();
    await loadAvailability();
    renderCalendar();
    initForm();
    updateQuotePanel();
  });

})();
