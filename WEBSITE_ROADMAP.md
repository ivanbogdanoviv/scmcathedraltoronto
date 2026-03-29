# Sts. Cyril and Methody Cathedral Website — Roadmap & Status

**Last updated:** March 26, 2026
**Site location:** `/home/vanko/Desktop/morelife/`
**Stack:** Static HTML / CSS / JavaScript — no backend, no framework

---

## ✅ COMPLETED

### Structure & Navigation
- [x] Dropdown navigation (OUR CHURCH, WORSHIP, COMMUNITY, GET INVOLVED groups)
- [x] Mobile hamburger menu with accordion dropdowns
- [x] Sticky navigation bar with gold bottom border
- [x] Language toggle (EN / BG) on all pages
- [x] Scroll-to-top button on all pages
- [x] Floating Action Buttons (Donate red, Events blue, Newsletter gold) on all pages

### Home Page
- [x] Hero slideshow (8 slides, zoom-out animation, dot indicators)
- [x] Orthodox cross overlay on hero background
- [x] 8-card action grid (Donate, Services, Events, Newsletter, Membership, Gallery, Halls, Contact)
- [x] Divine Services schedule section
- [x] Upcoming Events mini-calendar with 2026 events
- [x] Latest News & Announcements (3 cards)
- [x] Newsletter signup section (simulated — no backend)
- [x] Donation section with 4 ways to give
- [x] Visit Us section (address, phone, email, priest)
- [x] Newsletter modal (simulated subscription)

### Inner Pages
- [x] history.html — Full timeline (1910–present), clergy list, choir directors
- [x] parish.html — Leadership (Patriarch, Metropolitan, Priest), mission pillars, committee
- [x] staff.html — Executive committee, choir director, office hours
- [x] activities.html — Sunday School (notice: currently closed), Parish Choir, Ladies' Auxiliary
- [x] events.html — Upcoming events cards, full 2026 calendar, event photos section, video section
- [x] gallery.html — Filtered gallery (Community, Easter, Liturgy, Historical, School, Centennial)
- [x] bulletins.html — Bulletins archive with year/language/search filter
- [x] halls.html — Hall features, occasions, booking info
- [x] membership.html — Benefits, join CTA
- [x] contact.html — Address, hours, transit info, map
- [x] links.html — External Orthodox resources
- [x] services.html — Divine Services schedule, 6 Sacraments, 12 Great Feasts
- [x] donate.html — Impact cards, donation methods, pledge form

### Visual & Technical
- [x] Orthodox cross SVG (loading page cross) used everywhere — no ✠ unicode character remains
- [x] Loading/splash screen with animated cross and progress bar
- [x] Scroll-reveal animations on cards
- [x] Lightbox for gallery images (with filter-aware navigation)
- [x] Social media icons in footer (Facebook, YouTube, Email)
- [x] All pages: cross in page-hero banner (inner pages), visible at opacity 9%
- [x] Full bilingual translation system (English / Bulgarian)
- [x] 541 translation keys covering all pages

---

## 🔧 KNOWN ISSUES / NEEDS ATTENTION

### Translation Gaps
- [ ] **services.html** has extensive content not yet wired to `data-lang-key`:
  - Sacraments section (6 sacrament names, descriptions, contact prompts)
  - Great Feasts grid (12 feast names and dates)
  - Weekly schedule time labels
  - Breadcrumb text
  - All hardcoded section text needs keys added + Bulgarian translations added to language-toggle.js
- [ ] **donate.html** has hardcoded text not yet translated:
  - Impact cards ($25, $50, $150, $500 descriptions)
  - "Your donation funds…" section headers
  - Pledge/contact form labels and placeholders
  - Tax receipt notice
- [ ] **events.html** calendar entries are hardcoded (not using data-lang-key)
- [ ] **Hardcoded dates** (e.g., "April 2026", "May 11, 2026", "June 7, 2026") in events section need BG versions
- [ ] Newsletter inline success message ("Thank you! You have been subscribed…") needs BG translation
- [ ] `newsletter_placeholder` key not yet implemented (email input placeholder)
- [ ] Mobile nav dropdown link text is hardcoded in HTML (not using data-lang-key)

### Images Missing
- [ ] **Liturgy gallery** (`data-category="liturgy"`) — 15 items in HTML, but no `assets/images/gallery/liturgy/` folder exists. These images fail silently. Either add real liturgy photos or remove that filter category.
- [ ] **Historical gallery** (`data-category="historical"`) references `assets/images/historical/*.jpg` — folder exists with 8 files. Verify filenames match HTML paths (`historical_large_01.jpg` etc.)
- [ ] Several gallery entries reference images that do not exist on disk — `onerror="this.style.display='none'"` hides them but leaves blank space
- [ ] **Staff page** — clergy photos are placeholders (no actual photos in `assets/images/clergy/` subfolders for all priests)
- [ ] **Gallery school filter** — has 12 items, but Sunday School is currently closed. Consider eventually removing or archiving this filter

### Functional (No Backend)
- [ ] **Newsletter subscription** — currently simulated (no emails collected). Needs integration with a real service (see below)
- [ ] **Donate.html pledge form** — form submission is simulated. No data is saved or sent.

---

## 📋 WHAT NEEDS TO BE DONE NEXT

### Priority 1 — Content & Translation (High Impact)

**1. Complete services.html translation**
- Read services.html fully
- Add `data-lang-key` attributes to all text elements
- Add corresponding keys to `translations.en` and `translations.bg` in `js/language-toggle.js`
- Estimated: ~60–80 new keys

**2. Complete donate.html translation**
- Add `data-lang-key` attributes to impact cards, form labels, tax receipt note
- Add keys to language-toggle.js (both EN and BG)
- Estimated: ~25–35 new keys

**3. Fix mobile nav dropdown text**
- Each mobile dropdown (`nav-dropdown-mobile`) has hardcoded link text
- Add `data-lang-key` attributes matching the desktop nav links

**4. Translate newsletter inline success message**
- Currently hardcoded English in index.html
- Add `newsletter_inline_success` key to language-toggle.js
- Update HTML to use `data-lang-key`

### Priority 2 — Real Images

**5. Add real liturgy photos**
- Create folder `assets/images/gallery/liturgy/`
- Add photos named `liturgy_large_01.jpg`, `liturgy_large_02.jpg`, etc.
- OR remove the "Divine Liturgy" filter tab and reassign items

**6. Verify all gallery image paths**
- Run a script to check every `src` in gallery.html against actual files on disk
- Remove or fix broken `<img>` tags

**7. Add clergy photos**
- Create properly named photos in `assets/images/clergy/`
- Replace placeholder silhouette divs in staff.html and parish.html

### Priority 3 — Backend & Automation

**8. Newsletter email collection**

**Option A — Free (Mailchimp):**
- Create free Mailchimp account at mailchimp.com
- Create an Audience (mailing list)
- Get the embedded form action URL
- Replace the simulated form submit in `js/enhancements.js` with a real POST to Mailchimp's API endpoint
- Or embed Mailchimp's form HTML directly

**Option B — Free (EmailJS):**
- Sign up at emailjs.com (free up to 200 emails/month)
- Add `<script src="https://cdn.jsdelivr.net/npm/@emailjs/browser@4/dist/email.min.js"></script>`
- Replace form submit handler to call `emailjs.send(...)`
- No backend server needed — works with static HTML

**Option C — Formspree (simplest):**
- Sign up at formspree.io (free: 50 submissions/month)
- Change form action to `https://formspree.io/f/YOUR_ID`
- Remove the JavaScript simulation
- Formspree sends email to the address you specify

**Recommended:** Start with Formspree for simplicity. Upgrade to Mailchimp when you want to manage a proper mailing list with unsubscribes and campaigns.

**9. Donation processing**
- The donate.html pledge/contact form currently simulates submission
- Options:
  - **Formspree** (same as above) — form data emailed to church
  - **CanadaHelps** — Canadian charity donation platform (canadahelps.org), provides a donate widget/button, issues tax receipts automatically
  - **PayPal Donate Button** — simple, familiar to donors
  - **Stripe** — requires a developer and a backend (not static-site friendly)
- **Recommended:** Add a CanadaHelps "Donate Now" button (if registered as a charity). It handles tax receipts, accepts credit cards, and requires zero backend code.

**10. Contact form (contact.html)**
- The contact form, if it exists, needs to send messages to the church office
- Use Formspree (free) or EmailJS

### Priority 4 — Polish & SEO

**11. SEO / Meta tags**
- Add `<meta name="description">` to every page (currently missing or generic)
- Add Open Graph tags (`og:title`, `og:description`, `og:image`) for social sharing
- Add `<link rel="canonical">` tags
- Create `sitemap.xml`
- Create `robots.txt`

**12. Favicon**
- Add proper favicon in multiple sizes (16×16, 32×32, 180×180 Apple Touch)
- Create `assets/images/favicon.ico` from the cross SVG

**13. Performance**
- Convert large JPG images to WebP format for faster loading
- Add `width` and `height` attributes to all `<img>` tags to prevent layout shift
- Consider adding a service worker for offline caching

**14. Accessibility**
- Run axe or WAVE accessibility audit
- Ensure all interactive elements have visible focus states
- Verify color contrast ratios meet WCAG AA

**15. Domain & Hosting**
- Currently running locally with `python3 -m http.server 8080`
- For public hosting options (all support static HTML sites):
  - **GitHub Pages** — free, custom domain support
  - **Netlify** — free tier, easy drag-and-drop deploy, form handling
  - **Cloudflare Pages** — free, fast CDN, excellent performance
  - **Bluehost / GoDaddy** — shared hosting, more familiar for non-developers
- **Recommended:** Netlify — free, fast, form submission support (replaces Formspree), easy updates via drag-and-drop

---

## 🗂 FILE STRUCTURE OVERVIEW

```
morelife/
├── index.html              — Home page
├── history.html            — Cathedral history
├── parish.html             — Parish leadership & mission
├── staff.html              — Staff & office
├── activities.html         — School, Choir, Ladies' Auxiliary
├── events.html             — Events & 2026 calendar
├── gallery.html            — Filtered photo gallery
├── bulletins.html          — Parish bulletins archive
├── halls.html              — Hall rental
├── membership.html         — Membership info
├── contact.html            — Contact & directions
├── links.html              — Orthodox links
├── services.html           — Divine Services & Sacraments
├── donate.html             — Donations page
├── css/
│   ├── main.css            — Primary styles (all new styles appended here)
│   ├── navigation.css      — Nav-specific styles
│   └── responsive.css      — Media queries
├── js/
│   ├── main.js             — Gallery lightbox, filters, accordions
│   ├── language-toggle.js  — Bilingual EN/BG translation system (541 keys)
│   ├── enhancements.js     — FABs, mini-calendar, newsletter modal, hero dots
│   └── accordion.js        — Legacy accordion
└── assets/
    ├── images/
    │   ├── hero/           — Hero slideshow images
    │   ├── gallery/        — Gallery subfolders (centennial, easter, patrons-day, school, events-2016, events-2010, church-board)
    │   ├── historical/     — Historical photos (8 files)
    │   ├── icons/          — Cyril & Methody icons
    │   ├── clergy/         — Clergy photos
    │   ├── hall/           — Hall photos
    │   └── bulletins/      — Bulletin PDFs
    └── (no font files — using Google Fonts CDN)
```

---

## 🚀 QUICK START COMMANDS

**Run locally (accessible on your local network):**
```bash
cd /home/vanko/Desktop/morelife
python3 -m http.server 8080 --bind 0.0.0.0
```
Then open `http://YOUR_IP:8080` on any device on the same WiFi.

**Find your IP:**
```bash
hostname -I | awk '{print $1}'
```

**Stop the server:** Press `Ctrl + C` in the terminal running the server.

**Deploy to Netlify (when ready):**
1. Zip the entire `morelife/` folder
2. Go to app.netlify.com → "Add new site" → "Deploy manually"
3. Drag and drop the zip file
4. Your site is live in seconds

---

*This file is for reference only. Do not deploy it to the public site.*
