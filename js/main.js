/* ============================================================
   Main JavaScript
   Sts. Cyril and Methody Cathedral
   ============================================================ */

(function () {
  'use strict';

  // ============================================================
  // DOM READY
  // ============================================================
  document.addEventListener('DOMContentLoaded', function () {
    initHeroSlideshow();
    initPageLoader();
    initOrthodoxCross();
    initScrollToTop();
    initMobileNav();
    initActiveNavLink();
    initLazyLoad();
    initGallery();
    initPhotoViewers();
    initGalleryFilters();
    initBulletinFilters();
    initSmoothScroll();
  });

  // ============================================================
  // SCROLL TO TOP BUTTON
  // ============================================================
  function initScrollToTop() {
    var btn = document.getElementById('scrollTop');
    if (!btn) return;

    window.addEventListener('scroll', function () {
      if (window.pageYOffset > 300) {
        btn.classList.add('visible');
      } else {
        btn.classList.remove('visible');
      }
    }, { passive: true });

    btn.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // ============================================================
  // MOBILE NAV HAMBURGER
  // ============================================================
  function initMobileNav() {
    var hamburger = document.getElementById('hamburger');
    var nav       = document.getElementById('nav-menu');
    var overlay   = document.getElementById('nav-overlay');
    var body      = document.body;
    if (!hamburger) return;

    function openNav() {
      hamburger.classList.add('open');
      hamburger.setAttribute('aria-expanded', 'true');
      body.classList.add('nav-mobile-open');
      body.style.overflow = 'hidden';
    }

    function closeNav() {
      hamburger.classList.remove('open');
      hamburger.setAttribute('aria-expanded', 'false');
      body.classList.remove('nav-mobile-open');
      body.style.overflow = '';
    }

    hamburger.addEventListener('click', function () {
      if (body.classList.contains('nav-mobile-open')) {
        closeNav();
      } else {
        openNav();
      }
    });

    if (overlay) {
      overlay.addEventListener('click', closeNav);
    }

    // Close on nav link click (mobile)
    if (nav) {
      nav.querySelectorAll('a').forEach(function (link) {
        link.addEventListener('click', function () {
          if (window.innerWidth <= 768) closeNav();
        });
      });
    }

    // ESC key closes nav
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && body.classList.contains('nav-mobile-open')) {
        closeNav();
      }
    });

    // Close on window resize to desktop
    window.addEventListener('resize', function () {
      if (window.innerWidth > 768 && body.classList.contains('nav-mobile-open')) {
        closeNav();
      }
    }, { passive: true });
  }

  // ============================================================
  // ACTIVE NAV LINK
  // ============================================================
  function initActiveNavLink() {
    var path = window.location.pathname;
    var filename = path.split('/').pop() || 'index.html';
    if (filename === '') filename = 'index.html';

    var links = document.querySelectorAll('.nav-menu a');
    links.forEach(function (link) {
      var href = link.getAttribute('href');
      if (href === filename) {
        link.classList.add('active');
      }
    });
  }

  // ============================================================
  // SMOOTH SCROLLING
  // ============================================================
  function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
      anchor.addEventListener('click', function (e) {
        var targetId = this.getAttribute('href').slice(1);
        if (!targetId) return;
        var target = document.getElementById(targetId);
        if (!target) return;
        e.preventDefault();
        var navHeight = document.querySelector('.site-nav')
          ? document.querySelector('.site-nav').offsetHeight : 56;
        var top = target.getBoundingClientRect().top + window.pageYOffset - navHeight - 16;
        window.scrollTo({ top: top, behavior: 'smooth' });
      });
    });
  }

  // ============================================================
  // LAZY LOAD IMAGES
  // ============================================================
  function initLazyLoad() {
    if (!('IntersectionObserver' in window)) return;

    var images = document.querySelectorAll('img[data-src]');
    if (!images.length) return;

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          var img = entry.target;
          img.src = img.dataset.src;
          if (img.dataset.srcset) img.srcset = img.dataset.srcset;
          img.removeAttribute('data-src');
          observer.unobserve(img);
        }
      });
    }, { rootMargin: '200px 0px' });

    images.forEach(function (img) { observer.observe(img); });
  }

  // ============================================================
  // GALLERY LIGHTBOX
  // ============================================================
  var galleryImages = [];
  var currentLightboxIndex = 0;
  var touchStartX = 0;

  // Build galleryImages from whichever .gallery-item elements are currently visible
  function buildGalleryFromVisible() {
    var all = document.querySelectorAll('.gallery-item');
    galleryImages = [];
    all.forEach(function (item) {
      if (item.style.display === 'none') return;
      var img = item.querySelector('img');
      galleryImages.push({
        src:   item.dataset.large || (img ? img.src : null),
        alt:   img ? img.alt : (item.getAttribute('aria-label') || 'Gallery image'),
        emoji: '🖼️'
      });
    });
    return galleryImages;
  }

  function initGallery() {
    var lightbox = document.getElementById('lightbox');
    if (!lightbox) return;

    var closeBtn = document.getElementById('lightbox-close');
    var prevBtn  = document.getElementById('lightbox-prev');
    var nextBtn  = document.getElementById('lightbox-next');

    // Hide tile when image 404s
    document.querySelectorAll('.gallery-item').forEach(function (item) {
      var img = item.querySelector('img');
      if (img) {
        img.addEventListener('error', function () { item.style.display = 'none'; });
      }
      item.style.cursor = 'pointer';
    });

    // Single delegated click handler on the grid — catches clicks on the item,
    // its overlay, the magnifier span, or the image itself on all devices/browsers.
    var grid = document.getElementById('gallery-grid');
    if (grid) {
      grid.addEventListener('click', function (e) {
        var item = e.target.closest('.gallery-item');
        if (!item || item.style.display === 'none') return;

        var visible = [];
        document.querySelectorAll('.gallery-item').forEach(function (el) {
          if (el.style.display !== 'none') visible.push(el);
        });
        var idx = visible.indexOf(item);
        if (idx === -1) return;

        galleryImages = visible.map(function (el) {
          var elImg = el.querySelector('img');
          return {
            src:   el.dataset.large || (elImg ? elImg.src : null),
            alt:   elImg ? elImg.alt : (el.getAttribute('aria-label') || 'Gallery image'),
            emoji: '🖼️'
          };
        });
        openLightbox(idx);
      });

      // Keyboard: tab to item, press Enter/Space
      grid.addEventListener('keydown', function (e) {
        if (e.key !== 'Enter' && e.key !== ' ') return;
        var item = e.target.closest('.gallery-item');
        if (!item) return;
        e.preventDefault();
        item.click();
      });
    }

    // Make items keyboard-focusable
    document.querySelectorAll('.gallery-item').forEach(function (item) {
      item.setAttribute('tabindex', '0');
      item.setAttribute('role', 'button');
    });

    // Close handlers
    if (closeBtn) closeBtn.addEventListener('click', closeLightbox);
    lightbox.addEventListener('click', function (e) {
      if (e.target === lightbox) closeLightbox();
    });

    // Navigation
    if (prevBtn) prevBtn.addEventListener('click', function (e) { e.stopPropagation(); lightboxPrev(); });
    if (nextBtn) nextBtn.addEventListener('click', function (e) { e.stopPropagation(); lightboxNext(); });

    // Keyboard nav
    document.addEventListener('keydown', function (e) {
      if (!lightbox.classList.contains('active')) return;
      if (e.key === 'Escape')     closeLightbox();
      if (e.key === 'ArrowLeft')  lightboxPrev();
      if (e.key === 'ArrowRight') lightboxNext();
    });

    // Touch/swipe
    lightbox.addEventListener('touchstart', function (e) {
      touchStartX = e.changedTouches[0].clientX;
    }, { passive: true });
    lightbox.addEventListener('touchend', function (e) {
      var diff = touchStartX - e.changedTouches[0].clientX;
      if (Math.abs(diff) > 50) {
        if (diff > 0) lightboxNext(); else lightboxPrev();
      }
    }, { passive: true });
  }

  function openLightbox(index) {
    var lightbox  = document.getElementById('lightbox');
    var contentEl = document.getElementById('lightbox-content');
    if (!lightbox || !galleryImages.length) return;

    currentLightboxIndex = index;
    updateLightboxContent(contentEl);
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';

    var closeBtn = document.getElementById('lightbox-close');
    if (closeBtn) setTimeout(function () { closeBtn.focus(); }, 50);
  }

  function closeLightbox() {
    var lightbox = document.getElementById('lightbox');
    if (!lightbox) return;
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
  }

  function lightboxPrev() {
    currentLightboxIndex = (currentLightboxIndex - 1 + galleryImages.length) % galleryImages.length;
    updateLightboxContent(document.getElementById('lightbox-content'));
  }

  function lightboxNext() {
    currentLightboxIndex = (currentLightboxIndex + 1) % galleryImages.length;
    updateLightboxContent(document.getElementById('lightbox-content'));
  }

  function updateLightboxContent(contentEl) {
    if (!contentEl || !galleryImages.length) return;
    var item = galleryImages[currentLightboxIndex];
    if (item.src && item.src !== window.location.href) {
      contentEl.innerHTML = '<img src="' + escapeHtml(item.src) + '" alt="' + escapeHtml(item.alt) + '" class="lightbox-img">';
    } else {
      contentEl.innerHTML = '<div class="lightbox-placeholder">' + item.emoji + '</div>';
    }
    // Update counter
    var counter = document.getElementById('lb-counter');
    if (counter) counter.textContent = (currentLightboxIndex + 1) + ' / ' + galleryImages.length;
  }

  // ============================================================
  // GALLERY FILTER BUTTONS
  // ============================================================
  function initGalleryFilters() {
    var filterBtns = document.querySelectorAll('.filter-btn[data-filter]');
    if (!filterBtns.length) return;

    filterBtns.forEach(function (btn) {
      btn.addEventListener('click', function () {
        var filter = this.dataset.filter;

        filterBtns.forEach(function (b) { b.classList.remove('active'); });
        this.classList.add('active');

        document.querySelectorAll('.gallery-item[data-category]').forEach(function (item) {
          if (filter === 'all' || item.dataset.category === filter) {
            item.style.display = '';
          } else {
            item.style.display = 'none';
          }
        });
      });
    });
  }

  // ============================================================
  // BULLETIN FILTERS
  // ============================================================
  function initBulletinFilters() {
    var yearFilter   = document.getElementById('year-filter');
    var langFilter   = document.getElementById('lang-filter');
    var searchInput  = document.getElementById('bulletin-search');

    function applyFilters() {
      var year = yearFilter ? yearFilter.value : 'all';
      var lang = langFilter ? langFilter.value : 'all';
      var q    = searchInput ? searchInput.value.toLowerCase().trim() : '';

      // Year: show/hide accordion wrappers
      document.querySelectorAll('.accordion[data-year]').forEach(function (acc) {
        var show = (year === 'all' || acc.dataset.year === year);
        acc.style.display = show ? '' : 'none';
      });

      // Bulletin cards: filter by lang and search
      document.querySelectorAll('.bulletin-card').forEach(function (card) {
        var cardLang = card.dataset.lang || 'all';
        var matchLang = (lang === 'all' || cardLang === lang);
        var matchQ    = (!q || card.textContent.toLowerCase().includes(q));
        card.style.display = (matchLang && matchQ) ? '' : 'none';
      });
    }

    if (yearFilter)  yearFilter.addEventListener('change', applyFilters);
    if (langFilter)  langFilter.addEventListener('change', applyFilters);
    if (searchInput) searchInput.addEventListener('input',  applyFilters);
  }

  // ============================================================
  // UTILITY
  // ============================================================
  function escapeHtml(str) {
    if (!str) return '';
    return str
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  // ============================================================
  // HERO SLIDESHOW
  // ============================================================
  function initHeroSlideshow() {
    var slides = document.querySelectorAll('#hero-slideshow .hero-slide');
    if (slides.length < 2) return;

    var INTERVAL = 5000;
    var current = 0;
    var paused = false;
    var timer = null;

    function activateSlide(idx) {
      slides[current].classList.remove('active');
      current = (idx + slides.length) % slides.length;
      var next = slides[current];
      next.style.animation = 'none';
      next.offsetHeight; // reflow — force animation restart
      next.style.animation = '';
      next.classList.add('active');

    }

    function goTo(idx) {
      clearTimeout(timer);
      activateSlide(idx);
      scheduleNext();
    }

    function scheduleNext() {
      clearTimeout(timer);
      if (!paused) {
        timer = setTimeout(function () {
          activateSlide(current + 1);
          scheduleNext();
        }, INTERVAL);
      }
    }

    // Pause on hover
    var hero = document.getElementById('hero-slideshow');
    hero.addEventListener('mouseenter', function () { paused = true; clearTimeout(timer); });
    hero.addEventListener('mouseleave', function () { paused = false; scheduleNext(); });

    scheduleNext();
  }

  // ============================================================
  // PHOTO VIEWERS — makes data-photo-grid images lightbox-clickable
  // ============================================================
  function initPhotoViewers() {
    var grids = document.querySelectorAll('[data-photo-grid]');
    if (!grids.length) return;

    // Ensure lightbox exists (inject if not in gallery.html)
    if (!document.getElementById('lightbox')) {
      var lb = document.createElement('div');
      lb.id = 'lightbox';
      lb.className = 'lightbox';
      lb.setAttribute('role', 'dialog');
      lb.setAttribute('aria-modal', 'true');
      lb.setAttribute('aria-label', 'Photo viewer');
      lb.innerHTML =
        '<button class="lightbox-close" id="lightbox-close" aria-label="Close photo viewer">\u2715</button>' +
        '<button class="lightbox-prev" id="lightbox-prev" aria-label="Previous photo">&#8249;</button>' +
        '<div id="lightbox-content" style="display:flex;align-items:center;justify-content:center;width:100%;min-height:60vh"></div>' +
        '<button class="lightbox-next" id="lightbox-next" aria-label="Next photo">&#8250;</button>' +
        '<p id="lb-counter" class="lightbox-counter"></p>';
      document.body.appendChild(lb);

      // Wire up close/prev/next since initGallery won't run (no #lightbox at that time)
      lb.querySelector('#lightbox-close').addEventListener('click', closeLightbox);
      lb.addEventListener('click', function (e) { if (e.target === lb) closeLightbox(); });
      lb.querySelector('#lightbox-prev').addEventListener('click', function (e) { e.stopPropagation(); lightboxPrev(); });
      lb.querySelector('#lightbox-next').addEventListener('click', function (e) { e.stopPropagation(); lightboxNext(); });
    }

    // Collect all images in data-photo-grid containers
    var viewerImages = [];
    grids.forEach(function (grid) {
      grid.querySelectorAll('img').forEach(function (img) {
        if (img.src && !img.src.endsWith('/')) viewerImages.push(img);
      });
    });

    if (!viewerImages.length) return;

    // Replace global galleryImages with these for lightbox navigation
    galleryImages = viewerImages.map(function (img) {
      return { src: img.src, alt: img.alt || '', emoji: '\uD83D\uDDBC\uFE0F' };
    });

    viewerImages.forEach(function (img, i) {
      img.style.cursor = 'pointer';
      img.title = 'Click to enlarge';
      // Wrap in a position:relative container for the hover overlay
      var wrap = document.createElement('div');
      wrap.style.cssText = 'position:relative;overflow:hidden;border-radius:inherit;cursor:pointer';
      img.parentNode.insertBefore(wrap, img);
      wrap.appendChild(img);
      var overlay = document.createElement('div');
      overlay.className = 'gallery-overlay';
      overlay.innerHTML = '<span aria-hidden="true">\uD83D\uDD0D</span>';
      wrap.appendChild(overlay);
      wrap.addEventListener('click', function () { openLightbox(i); });
    });
  }

  // ============================================================
  // PAGE LOADER
  // ============================================================
  function initPageLoader() {
    var loader = document.getElementById('page-loader');
    if (!loader) return;
    setTimeout(function () {
      loader.classList.add('fade-out');
      setTimeout(function () { loader.style.display = 'none'; }, 650);
    }, 2500);
  }

  // ============================================================
  // EASTERN ORTHODOX CROSS REPLACEMENT
  // ============================================================
  function initOrthodoxCross() {
    var svgHtml = '<svg class="orthodox-cross-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 22 30" aria-hidden="true" fill="currentColor">'
      + '<rect x="9" y="0" width="4" height="30" rx="0.5"/>'
      + '<rect x="4.5" y="3" width="13" height="2.8" rx="0.5"/>'
      + '<rect x="0" y="11" width="22" height="3.5" rx="0.5"/>'
      + '<polygon points="2.5,20 19.5,24.5 19.5,22 2.5,17.5"/>'
      + '</svg>';

    // Replace ✠ in known cross wrapper elements
    document.querySelectorAll('.cross-divider, .footer-cross, .service-icon').forEach(function (el) {
      if (el.textContent.indexOf('\u2720') !== -1) {
        el.innerHTML = svgHtml;
      }
    });

    // Replace ✠ in link/button text (e.g. "✠ Divine Services")
    document.querySelectorAll('a.btn, button').forEach(function (el) {
      if (el.innerHTML.indexOf('\u2720') !== -1) {
        el.innerHTML = el.innerHTML.replace(/✠/g, svgHtml);
      }
    });
  }


})();
