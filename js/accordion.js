/* ============================================================
   Accordion System
   Sts. Cyril and Methody Cathedral
   ============================================================ */

(function () {
  'use strict';

  /**
   * Initialize all accordion elements on the page.
   * Usage: <div class="accordion" [data-exclusive="true"]>
   *          <div class="accordion-header" role="button" tabindex="0" aria-expanded="false">
   *            <h3 class="accordion-title">Title</h3>
   *            <span class="accordion-icon">▼</span>
   *          </div>
   *          <div class="accordion-body">...content...</div>
   *        </div>
   */
  function initAccordions() {
    const accordions = document.querySelectorAll('.accordion');

    accordions.forEach(function (accordion) {
      const header = accordion.querySelector('.accordion-header');
      const body   = accordion.querySelector('.accordion-body');
      if (!header || !body) return;

      // Ensure ARIA is set correctly on load
      const isOpen = accordion.classList.contains('open');
      header.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
      header.setAttribute('role', 'button');
      if (!header.hasAttribute('tabindex')) header.setAttribute('tabindex', '0');

      // Click handler
      header.addEventListener('click', function () {
        toggleAccordion(accordion);
      });

      // Keyboard: Enter or Space
      header.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          toggleAccordion(accordion);
        }
      });
    });
  }

  function toggleAccordion(accordion) {
    const isOpen = accordion.classList.contains('open');
    const header = accordion.querySelector('.accordion-header');

    // Exclusive mode: close siblings
    if (accordion.dataset.exclusive === 'true' || accordion.closest('[data-exclusive-group]')) {
      const group = accordion.closest('[data-exclusive-group]') || accordion.parentElement;
      group.querySelectorAll('.accordion.open').forEach(function (sibling) {
        if (sibling !== accordion) {
          closeAccordion(sibling);
        }
      });
    }

    if (isOpen) {
      closeAccordion(accordion);
    } else {
      openAccordion(accordion);
    }
  }

  function openAccordion(accordion) {
    const header = accordion.querySelector('.accordion-header');
    const body   = accordion.querySelector('.accordion-body');
    accordion.classList.add('open');
    header.setAttribute('aria-expanded', 'true');
    // Force reflow for max-height animation
    if (body) {
      body.style.maxHeight = body.scrollHeight + 'px';
      // After content changes, recalculate
      body.addEventListener('transitionend', function onTransitionEnd() {
        body.style.maxHeight = 'none'; // Allow dynamic content
        body.removeEventListener('transitionend', onTransitionEnd);
      }, { once: true });
    }
  }

  function closeAccordion(accordion) {
    const header = accordion.querySelector('.accordion-header');
    const body   = accordion.querySelector('.accordion-body');
    if (body) {
      // Set explicit height before collapsing for smooth animation
      body.style.maxHeight = body.scrollHeight + 'px';
      requestAnimationFrame(function () {
        body.style.maxHeight = '0';
      });
    }
    accordion.classList.remove('open');
    if (header) header.setAttribute('aria-expanded', 'false');
  }

  // ============================================================
  // Timeline item initialization
  // ============================================================
  function initTimeline() {
    const timelineItems = document.querySelectorAll('.timeline-content[data-expandable]');
    timelineItems.forEach(function (item) {
      item.style.cursor = 'pointer';
      item.addEventListener('click', function () {
        const details = item.querySelector('.timeline-details');
        if (details) {
          const isVisible = details.style.display === 'block';
          details.style.display = isVisible ? 'none' : 'block';
          item.classList.toggle('expanded', !isVisible);
        }
      });
    });
  }

  // ============================================================
  // Public API
  // ============================================================
  window.AccordionSystem = {
    init: function () {
      initAccordions();
      initTimeline();
    },
    openAll: function () {
      document.querySelectorAll('.accordion:not(.open)').forEach(openAccordion);
    },
    closeAll: function () {
      document.querySelectorAll('.accordion.open').forEach(closeAccordion);
    },
    toggle: toggleAccordion,
    open: openAccordion,
    close: closeAccordion
  };

  // Auto-init on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', window.AccordionSystem.init);
  } else {
    window.AccordionSystem.init();
  }

})();
