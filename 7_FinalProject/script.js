'use strict';

/* ════════════════════════════════════════════════════════════════
   AI HYPER-PRODUCTIVITY — script.js
   All JavaScript for the interactive site.
   Organized into clearly labeled feature blocks.
   Every section is commented so you know exactly what it does
   and WHY it was written that way.
   ════════════════════════════════════════════════════════════════ */


/* ── HELPER: Wait for the DOM to be fully loaded ────────────────
   We wrap everything in DOMContentLoaded so we never try to
   query elements that don't exist yet. This is safer than
   putting scripts at the bottom of the body (though we do that
   too — belt AND suspenders approach).
─────────────────────────────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {

  /* ══════════════════════════════════════════════════════════
     BLOCK 1: SCROLL PROGRESS BAR
     Creates a thin line at the very top of the viewport that
     fills from left to right as the user scrolls down the page.
     The gradient matches the brand colors (purple → teal).
  ══════════════════════════════════════════════════════════ */

  // Create the bar element programmatically (not hardcoded in HTML)
  const progressBar = document.createElement('div');

  // Inline styles for the progress bar
  progressBar.style.cssText = `
    position: fixed;        /* Always visible regardless of scroll */
    top: 0;                 /* Sits at the very top of the page */
    left: 0;                /* Starts from the left edge */
    height: 3px;            /* Thin but visible */
    width: 0%;              /* Starts empty — grows as user scrolls */
    background: linear-gradient(90deg, #534AB7, #1D9E75); /* Purple → Teal */
    z-index: 9999;          /* Above everything, including the navbar */
    transition: width 0.1s linear; /* Smooth but near-instant update */
    pointer-events: none;   /* Clicks pass through to content below */
  `;

  // Add the bar to the page
  document.body.appendChild(progressBar);

  // Update bar width on every scroll event
  window.addEventListener('scroll', () => {
    // Total scrollable distance = full doc height minus viewport height
    const docHeight  = document.documentElement.scrollHeight - window.innerHeight;
    // Current percentage scrolled (0 → 100)
    const pct        = docHeight > 0 ? (window.scrollY / docHeight) * 100 : 0;
    // Apply the percentage as a width
    progressBar.style.width = `${pct}%`;
  }, { passive: true }); // passive: true = browser can optimize scroll without waiting for JS


  /* ══════════════════════════════════════════════════════════
     BLOCK 2: NAVBAR SCROLL SHADOW
     Adds a CSS class to the navbar when the user scrolls
     past 20px. The class triggers a box-shadow in CSS.
  ══════════════════════════════════════════════════════════ */

  const navbar = document.getElementById('navbar');

  window.addEventListener('scroll', () => {
    // classList.toggle(class, condition) — adds if true, removes if false
    navbar.classList.toggle('scrolled', window.scrollY > 20);
  }, { passive: true });


  /* ══════════════════════════════════════════════════════════
     BLOCK 3: MOBILE HAMBURGER MENU
     On small screens, the nav links are hidden and replaced
     by a hamburger icon. Clicking it toggles the mobile
     dropdown menu open and closed.
  ══════════════════════════════════════════════════════════ */

  const hamburger = document.getElementById('nav-hamburger'); // The ☰ button
  const mobileNav = document.getElementById('nav-mobile');     // The dropdown

  if (hamburger && mobileNav) {
    hamburger.addEventListener('click', () => {
      // Toggle the .open class on the mobile menu
      mobileNav.classList.toggle('open');
    });

    // When a mobile nav link is clicked, close the menu
    // querySelectorAll returns a NodeList — we convert to array with spread
    [...mobileNav.querySelectorAll('a')].forEach(link => {
      link.addEventListener('click', () => {
        mobileNav.classList.remove('open');
      });
    });
  }


  /* ══════════════════════════════════════════════════════════
     BLOCK 4: SMOOTH SCROLL FOR ALL NAV LINKS
     Intercepts clicks on anchor links (href starting with #)
     and smoothly scrolls to the target element with a 70px
     offset to account for the fixed navbar height.
  ══════════════════════════════════════════════════════════ */

  // Grab ALL anchor links — both desktop nav and mobile nav
  const allNavLinks = document.querySelectorAll('.nav-links a, .nav-mobile a');

  allNavLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href');

      // Only intercept if it's an in-page anchor (#something)
      if (href && href.startsWith('#')) {
        e.preventDefault(); // Stop browser's default jump behavior

        const targetEl = document.querySelector(href); // Find the section

        if (targetEl) {
          // Calculate position: top of element minus navbar height (70px)
          const navOffset = 70;
          const top = targetEl.getBoundingClientRect().top + window.scrollY - navOffset;

          // Scroll smoothly
          window.scrollTo({ top, behavior: 'smooth' });
        }
      }
    });
  });


  /* ══════════════════════════════════════════════════════════
     BLOCK 5: ACTIVE NAV LINK HIGHLIGHTING ON SCROLL
     Uses IntersectionObserver to detect which section is
     currently visible. The corresponding nav link gets an
     .nav-active class (styled in CSS as purple highlight).
  ══════════════════════════════════════════════════════════ */

  // All sections with an id attribute (hero, overview, swot, etc.)
  const sections  = document.querySelectorAll('section[id]');
  const navLinks  = document.querySelectorAll('.nav-links a');

  const navObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id'); // e.g., "swot"

        // Remove active from all links first
        navLinks.forEach(link => link.classList.remove('nav-active'));

        // Find the link that points to this section and highlight it
        navLinks.forEach(link => {
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('nav-active');
          }
        });
      }
    });
  }, {
    threshold: 0.35,         // Section must be 35% visible to trigger
    rootMargin: '-60px 0px 0px 0px' // Offset for fixed navbar
  });

  // Observe every section
  sections.forEach(s => navObserver.observe(s));


  /* ══════════════════════════════════════════════════════════
     BLOCK 6: HERO SCROLL BUTTON
     The "Scroll to explore" hint at the bottom of the hero
     section clicks through to the overview section.
  ══════════════════════════════════════════════════════════ */

  const scrollBtn = document.querySelector('.hero-scroll-hint');
  if (scrollBtn) {
    scrollBtn.addEventListener('click', () => {
      const overview = document.getElementById('overview');
      if (overview) {
        const top = overview.getBoundingClientRect().top + window.scrollY - 70;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  }


  /* ══════════════════════════════════════════════════════════
     BLOCK 7: COUNTER ANIMATION (Hero Stats)
     Animates numbers from 0 to their target value using
     requestAnimationFrame for smooth 60fps rendering.
     Uses a cubic ease-out curve so it decelerates at the end.
  ══════════════════════════════════════════════════════════ */

  /**
   * animateCounter — counts from 0 to target over duration ms
   * @param {HTMLElement} el       - The element to update
   * @param {number}      target   - Final value to count to
   * @param {number}      duration - Animation duration in ms
   */
  function animateCounter(el, target, duration) {
    const start  = performance.now(); // Start timestamp
    const isLarge = target > 100;    // Large numbers get toLocaleString formatting (commas)

    // Step function called ~60 times per second by requestAnimationFrame
    const step = (now) => {
      const elapsed  = now - start;
      // progress goes from 0.0 to 1.0 over the duration
      const progress = Math.min(elapsed / duration, 1);
      // Cubic ease-out: fast start, slow end — feels natural
      const eased    = 1 - Math.pow(1 - progress, 3);
      // Current display value
      const current  = Math.round(eased * target);

      // Format with commas for big numbers (e.g., 976 → "976")
      el.textContent = isLarge ? current.toLocaleString() : current;

      // Keep animating until progress reaches 1.0
      if (progress < 1) requestAnimationFrame(step);
    };

    requestAnimationFrame(step); // Kick off the animation loop
  }

  // Only run counters once — track whether they've started
  let countersStarted = false;
  const counters = document.querySelectorAll('.hero-stat-val[data-target]');

  // IntersectionObserver watches the stats bar — starts animation when visible
  const heroStats = document.querySelector('.hero-stats');
  if (heroStats) {
    const heroObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !countersStarted) {
          countersStarted = true; // Only ever run once

          // Stagger each counter slightly so they don't all start together
          counters.forEach((el, i) => {
            const target = parseInt(el.dataset.target, 10); // Read target from HTML attribute
            setTimeout(() => animateCounter(el, target, 1600), i * 200); // 200ms stagger
          });
        }
      });
    }, { threshold: 0.4 }); // 40% of stats bar must be visible

    heroObserver.observe(heroStats);
  }


  /* ══════════════════════════════════════════════════════════
     BLOCK 8: FADE-UP SCROLL ANIMATION
     Elements with class .fade-up start invisible (opacity: 0,
     translateY: 24px). When they enter the viewport, we add
     .visible which CSS transitions them into view.
  ══════════════════════════════════════════════════════════ */

  const fadeElements = document.querySelectorAll('.fade-up');

  const fadeObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible'); // CSS handles the actual animation
        fadeObserver.unobserve(entry.target);  // Stop watching once animated (performance)
      }
    });
  }, {
    threshold: 0.10,                    // 10% visible = trigger
    rootMargin: '0px 0px -40px 0px'    // 40px bottom margin = don't trigger too early
  });

  fadeElements.forEach(el => fadeObserver.observe(el));


  /* ══════════════════════════════════════════════════════════
     BLOCK 9: CARD TILT EFFECT ON HOVER (3D Transform)
     When the mouse moves over a card, we calculate how far
     the cursor is from the center of the card and apply a
     small 3D rotation. Feels like the card is tracking the mouse.
  ══════════════════════════════════════════════════════════ */

  /**
   * addTilt — adds 3D mouse-tracking effect to a group of cards
   * @param {NodeList} cards     - Elements to apply tilt to
   * @param {number}   intensity - Max rotation degrees (smaller = subtler)
   */
  function addTilt(cards, intensity) {
    cards.forEach(card => {
      // Track mouse position relative to card center
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect(); // Card's position on screen

        // x, y: normalized -0.5 to +0.5, where 0 is the center
        const x = (e.clientX - rect.left)  / rect.width  - 0.5;
        const y = (e.clientY - rect.top)   / rect.height - 0.5;

        // Apply 3D rotation: X-axis rotates around the horizontal (y affects it),
        //                    Y-axis rotates around the vertical (x affects it)
        card.style.transform = `translateY(-3px) rotateX(${-y * intensity}deg) rotateY(${x * intensity}deg)`;
      });

      // Reset transform smoothly when mouse leaves
      card.addEventListener('mouseleave', () => {
        card.style.transform = '';
        // Add transition ONLY on mouseleave for smooth snap-back
        card.style.transition = 'transform 0.4s ease, box-shadow 0.3s ease, border-color 0.3s ease';
      });

      // Remove transition on mouseenter so tilt tracks instantly
      card.addEventListener('mouseenter', () => {
        card.style.transition = 'none';
      });
    });
  }

  // Apply tilt to various card groups with different intensities
  // Lower intensity = more subtle tilt
  addTilt(document.querySelectorAll('.deliverable-card'), 4);
  addTilt(document.querySelectorAll('.market-card'),      3);
  addTilt(document.querySelectorAll('.persona-card'),     3);
  addTilt(document.querySelectorAll('.funding-stage'),    3);
  addTilt(document.querySelectorAll('.fin-kpi-card'),     3);  // [NEW]
  addTilt(document.querySelectorAll('.copy-variant'),     2);  // [NEW]


  /* ══════════════════════════════════════════════════════════
     BLOCK 10: CLICKABLE DELIVERABLE CARDS (Overview Grid)
     Each card has a data-section attribute pointing to the
     section id it should navigate to when clicked.
     Also handles keyboard Enter/Space for accessibility.
  ══════════════════════════════════════════════════════════ */

  const clickableCards = document.querySelectorAll('.clickable-card');

  clickableCards.forEach(card => {
    // Mouse click handler
    card.addEventListener('click', () => {
      scrollToSection(card.dataset.section); // Navigate to target section
    });

    // Keyboard handler — allow Enter and Space to trigger navigation
    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault(); // Prevent spacebar scrolling the page
        scrollToSection(card.dataset.section);
      }
    });
  });

  /**
   * scrollToSection — smooth-scrolls to a section by its id
   * @param {string} sectionId - The id of the target section
   */
  function scrollToSection(sectionId) {
    if (!sectionId) return;
    const target = document.getElementById(sectionId);
    if (target) {
      const top = target.getBoundingClientRect().top + window.scrollY - 70;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  }


  /* ══════════════════════════════════════════════════════════
     BLOCK 11: SWOT ITEM EXPANSION
     Each list item in the SWOT board is clickable.
     Clicking toggles a detail paragraph that appears below the item.
     The detail text is stored in a data-detail attribute on the <li>.
     Only one item per quadrant can be open at a time.
  ══════════════════════════════════════════════════════════ */

  const swotItems = document.querySelectorAll('.swot-item');

  swotItems.forEach(item => {
    // When a SWOT item is clicked...
    item.addEventListener('click', () => {
      const parentList = item.parentElement; // The <ul> containing this item
      const isActive   = item.classList.contains('swot-active'); // Is this already open?

      // ── Close all items in this quadrant first ──
      // This enforces "only one open at a time" behavior per quadrant
      parentList.querySelectorAll('.swot-item').forEach(sibling => {
        sibling.classList.remove('swot-active');
        // Remove any existing detail box
        const existingDetail = sibling.nextElementSibling;
        if (existingDetail && existingDetail.classList.contains('swot-detail')) {
          existingDetail.remove();
        }
      });

      // ── If the clicked item wasn't already open, open it ──
      if (!isActive) {
        item.classList.add('swot-active');

        // Create the detail box element
        const detail = document.createElement('div');
        detail.classList.add('swot-detail', 'visible');
        detail.textContent = item.dataset.detail; // Pull text from HTML attribute

        // Insert immediately after the clicked <li>
        item.insertAdjacentElement('afterend', detail);

        // Smooth scroll to keep the detail visible
        // Small delay so the element is in the DOM before scrolling
        setTimeout(() => {
          detail.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }, 50);
      }
    });
  });


  /* ══════════════════════════════════════════════════════════
     BLOCK 12: PERSONA MODAL SYSTEM
     Clicking a persona card opens a full-screen modal overlay.
     The modal closes via:
       - The ✕ close button
       - Clicking the dark backdrop outside the modal box
       - Pressing the Escape key
  ══════════════════════════════════════════════════════════ */

  // ── Open modals ──

  // Marcus card → open marcus modal
  const marcusCard = document.getElementById('marcus-card');
  if (marcusCard) {
    marcusCard.addEventListener('click', ()  => openModal('modal-marcus'));
    marcusCard.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        openModal('modal-marcus');
      }
    });
  }

  // Vanessa card → open vanessa modal
  const vanessaCard = document.getElementById('vanessa-card');
  if (vanessaCard) {
    vanessaCard.addEventListener('click', ()  => openModal('modal-vanessa'));
    vanessaCard.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        openModal('modal-vanessa');
      }
    });
  }

  // ── Close buttons inside modals ──
  // Each close button has data-modal="modal-id" telling us which overlay to close
  document.querySelectorAll('.modal-close').forEach(btn => {
    btn.addEventListener('click', () => {
      closeModal(btn.dataset.modal);
    });
  });

  // ── Close when clicking the dark backdrop (outside the box) ──
  document.querySelectorAll('.modal-overlay').forEach(overlay => {
    overlay.addEventListener('click', (e) => {
      // Only close if the click was on the overlay itself, NOT the box inside it
      if (e.target === overlay) {
        closeModal(overlay.id);
      }
    });
  });

  // ── Close with Escape key ──
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      // Close any open modals
      document.querySelectorAll('.modal-overlay.open').forEach(overlay => {
        closeModal(overlay.id);
      });
    }
  });

  /**
   * openModal — makes the specified modal visible
   * @param {string} modalId - The id of the .modal-overlay element
   */
  function openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
      modal.classList.add('open'); // CSS switches display: none to display: flex
      document.body.style.overflow = 'hidden'; // Prevent background page scroll
    }
  }

  /**
   * closeModal — hides the specified modal
   * @param {string} modalId - The id of the .modal-overlay element
   */
  function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
      modal.classList.remove('open'); // Hide the overlay
      document.body.style.overflow = ''; // Restore page scrolling
    }
  }


  /* ══════════════════════════════════════════════════════════
     BLOCK 13: MARKET SIZE BAR CHART (Chart.js)
     Renders a grouped bar chart comparing 2024 vs 2030 market
     sizes for the three key markets. Uses the brand color palette.
  ══════════════════════════════════════════════════════════ */

  const marketCanvas = document.getElementById('marketChart');

  if (marketCanvas && typeof Chart !== 'undefined') {
    const marketCtx = marketCanvas.getContext('2d'); // 2D drawing context

    new Chart(marketCtx, {
      // Chart type: grouped bar chart
      type: 'bar',

      data: {
        // X-axis labels — the three markets
        labels: ['Edge AI', 'Personal AI Assistant', 'Agentic AI'],

        datasets: [
          {
            // 2024 "today" values — baseline
            label: '2024 (Current)',
            data: [8.7, 2.2, 5.1], // Billions USD
            backgroundColor: [
              'rgba(83, 74, 183, 0.75)',  // Purple (Edge AI)
              'rgba(29, 158, 117, 0.75)', // Teal (Personal AI)
              'rgba(216, 90, 48, 0.75)',  // Coral (Agentic AI)
            ],
            borderColor: [
              'rgba(83, 74, 183, 1)',
              'rgba(29, 158, 117, 1)',
              'rgba(216, 90, 48, 1)',
            ],
            borderWidth: 2,
            borderRadius: 6, // Rounded bar tops
          },
          {
            // 2030 projected values — the opportunity
            label: '2030 (Projected)',
            data: [57, 56, 52], // Billions USD
            backgroundColor: [
              'rgba(83, 74, 183, 0.25)',  // Same colors but lighter/transparent
              'rgba(29, 158, 117, 0.25)',
              'rgba(216, 90, 48, 0.25)',
            ],
            borderColor: [
              'rgba(83, 74, 183, 0.7)',
              'rgba(29, 158, 117, 0.7)',
              'rgba(216, 90, 48, 0.7)',
            ],
            borderWidth: 2,
            borderRadius: 6,
            borderDash: [4, 4], // Dashed border for projected (future) bars
          }
        ]
      },

      options: {
        responsive: true,       // Resize with window
        maintainAspectRatio: true,

        plugins: {
          legend: {
            position: 'top',   // Legend above chart
            labels: {
              font: { family: 'Inter', size: 12, weight: '600' },
              color: '#444441',
              padding: 20,
            }
          },
          tooltip: {
            callbacks: {
              // Format tooltip value as "$X billion"
              label: (ctx) => ` ${ctx.dataset.label}: $${ctx.parsed.y}B`
            },
            backgroundColor: '#1E1C2E',
            titleColor: '#FFFFFF',
            bodyColor: 'rgba(255,255,255,0.8)',
            padding: 12,
            cornerRadius: 8,
          }
        },

        scales: {
          x: {
            // X-axis styling
            grid: { display: false }, // No vertical grid lines
            ticks: {
              font: { family: 'Inter', size: 13, weight: '600' },
              color: '#444441',
            }
          },
          y: {
            // Y-axis shows USD billions
            beginAtZero: true,
            grid: {
              color: 'rgba(0,0,0,0.06)',  // Subtle horizontal lines
              drawBorder: false,
            },
            ticks: {
              font: { family: 'Inter', size: 12 },
              color: '#888780',
              // Append "$" and "B" to every y-axis tick
              callback: (val) => `$${val}B`
            }
          }
        },

        // Animation on chart draw
        animation: {
          duration: 1200,
          easing: 'easeOutQuart',
        }
      }
    });
  }


  /* ══════════════════════════════════════════════════════════
     BLOCK 14: FINANCIAL MODEL DATA (36-Month)
     We calculate monthly Revenue, Costs, and Net Profit
     for all 36 months programmatically based on the
     business model assumptions defined in the HTML.

     GROWTH MODEL:
       Mo  1– 6: Beta phase — $0 revenue, ~$1K/mo costs
       Mo  7–12: Early adopters at $99/mo, 8 new users/mo
       Mo 13–18: Public launch, normal pricing, 20 new users/mo
       Mo 19–24: Angel capital deployed, 40 new users/mo
       Mo 25–30: Approaching VC, 80 new users/mo
       Mo 31–36: VC capital deployed, 150 new users/mo
       Churn: 3% per month (hardware moat keeps this low)
  ══════════════════════════════════════════════════════════ */

  // Arrays to hold computed values for all 36 months
  const revenueData = [];  // Monthly revenue in USD
  const costData    = [];  // Monthly operating costs in USD
  const profitData  = [];  // Monthly net profit (revenue - costs) — can be negative
  const monthLabels = [];  // X-axis labels: "Mo 1", "Mo 2", etc.

  // Track cumulative subscribers across months (they persist unless they churn)
  let totalSubscribers = 0;
  const CHURN_RATE = 0.03; // 3% monthly churn rate

  // Loop through all 36 months and compute values
  for (let month = 1; month <= 36; month++) {
    monthLabels.push(`Mo ${month}`); // Label for chart X-axis

    let revenue, costs, newUsers, arpu;

    /* ── PHASE 1: Beta (Months 1–6) ──
       No paying customers yet. Running on personal budget.
       Hardware purchased, software being built, 20 beta testers (free).
    */
    if (month <= 6) {
      newUsers = 0;         // Beta users don't pay
      arpu     = 0;         // Average revenue per user = $0 during beta
      costs    = 900 + (month * 50); // Modest costs growing slightly as we build
      revenue  = 0;

    /* ── PHASE 2: Early Adopters (Months 7–12) ──
       Charged at the higher $99/mo early-adopter price.
       Word-of-mouth from beta = 8 new paid signups per month.
       Hardware revenue from new signups (1 device each, $320 margin).
    */
    } else if (month <= 12) {
      newUsers = 8;        // 8 new subscribers per month
      arpu     = 99;       // Early adopter premium price
      costs    = 1500 + ((month - 6) * 150); // Growing infra + minimal support costs

      // Apply churn: 3% of existing subscribers leave each month
      totalSubscribers = Math.floor(totalSubscribers * (1 - CHURN_RATE)) + newUsers;
      // Revenue = recurring subscription + hardware margin for new users
      revenue = (totalSubscribers * arpu) + (newUsers * 320); // $320 = hardware margin

    /* ── PHASE 3: Public Launch (Months 13–18) ──
       Normal pricing ($59 avg ARPU — mix of family and prosumer plans).
       Product Hunt burst, press coverage = 20 new users/month.
    */
    } else if (month <= 18) {
      newUsers = 20;
      arpu     = 65;       // Blended ARPU: mix of $29, $59, $99 plans
      costs    = 3500 + ((month - 12) * 400);

      totalSubscribers = Math.floor(totalSubscribers * (1 - CHURN_RATE)) + newUsers;
      revenue = (totalSubscribers * arpu) + (newUsers * 320);

    /* ── PHASE 4: Angel Scale (Months 19–24) ──
       $50K-$250K angel capital deployed. Marketing spend increases.
       40 new users/month from paid acquisition + organic.
    */
    } else if (month <= 24) {
      newUsers = 40;
      arpu     = 62;
      costs    = 7000 + ((month - 18) * 1200); // Staff + marketing costs jump here

      totalSubscribers = Math.floor(totalSubscribers * (1 - CHURN_RATE)) + newUsers;
      revenue = (totalSubscribers * arpu) + (newUsers * 320);

    /* ── PHASE 5: Pre-VC Scale (Months 25–30) ──
       80 new users/month. Revenue proving out for Series A pitch.
       Costs scale with team growth.
    */
    } else if (month <= 30) {
      newUsers = 80;
      arpu     = 60;
      costs    = 14000 + ((month - 24) * 2500);

      totalSubscribers = Math.floor(totalSubscribers * (1 - CHURN_RATE)) + newUsers;
      revenue = (totalSubscribers * arpu) + (newUsers * 320);

    /* ── PHASE 6: VC Capital Deployed (Months 31–36) ──
       Series A closed. $3M–$10M to accelerate hiring and marketing.
       150 new users/month. National press. Enterprise discussions.
    */
    } else {
      newUsers = 150;
      arpu     = 59;       // Price normalizes as volume grows
      costs    = 35000 + ((month - 30) * 6000); // Major team expansion

      totalSubscribers = Math.floor(totalSubscribers * (1 - CHURN_RATE)) + newUsers;
      revenue = (totalSubscribers * arpu) + (newUsers * 320);
    }

    // Round to nearest dollar and push to arrays
    revenueData.push(Math.round(revenue));
    costData.push(Math.round(costs));
    profitData.push(Math.round(revenue - costs)); // Negative = still burning cash
  }


  /* ══════════════════════════════════════════════════════════
     BLOCK 15: FINANCIAL MODEL LINE CHART (Chart.js)
     Renders the 36-month P&L as three overlapping lines:
       • Revenue (purple solid)
       • Operating Costs (coral solid)
       • Net Profit/Loss (teal with fill — shaded area below)
     Vertical phase bands drawn as chart annotations.
  ══════════════════════════════════════════════════════════ */

  const finCanvas = document.getElementById('financialChart');

  if (finCanvas && typeof Chart !== 'undefined') {
    const finCtx = finCanvas.getContext('2d');

    // ── Gradient fill for Net Profit line (green when positive, shows shape) ──
    // Gradients in Chart.js must be created using the canvas context
    const profitGradient = finCtx.createLinearGradient(0, 0, 0, 380);
    profitGradient.addColorStop(0, 'rgba(29, 158, 117, 0.25)');  // Teal, semi-transparent at top
    profitGradient.addColorStop(1, 'rgba(29, 158, 117, 0.02)');  // Nearly invisible at bottom

    new Chart(finCtx, {
      type: 'line',

      data: {
        labels: monthLabels, // "Mo 1" through "Mo 36"

        datasets: [
          {
            // ── REVENUE LINE ──
            label: 'Monthly Revenue',
            data: revenueData,
            borderColor: '#534AB7',          // Brand purple
            backgroundColor: 'transparent', // No fill
            borderWidth: 2.5,
            pointRadius: 0,        // No dots on each data point (too cluttered at 36 points)
            pointHoverRadius: 5,   // But show dots on hover
            pointHoverBackgroundColor: '#534AB7',
            tension: 0.4,          // Slight curve on the line
          },
          {
            // ── COSTS LINE ──
            label: 'Operating Costs',
            data: costData,
            borderColor: '#D85A30',          // Coral
            backgroundColor: 'transparent',
            borderWidth: 2.5,
            borderDash: [6, 3],    // Dashed line = costs (vs solid = revenue)
            pointRadius: 0,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: '#D85A30',
            tension: 0.4,
          },
          {
            // ── NET PROFIT LINE ──
            label: 'Net Profit / Loss',
            data: profitData,
            borderColor: '#1D9E75',          // Teal
            backgroundColor: profitGradient, // Shaded fill below the line
            borderWidth: 2.5,
            fill: true,            // Fills area below the line
            pointRadius: 0,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: '#1D9E75',
            tension: 0.4,
          }
        ]
      },

      options: {
        responsive: true,
        maintainAspectRatio: true,

        interaction: {
          // When hovering, highlight ALL datasets at that x position
          mode: 'index',
          intersect: false,
        },

        plugins: {
          legend: {
            position: 'top',
            labels: {
              font: { family: 'Inter', size: 12, weight: '600' },
              color: '#444441',
              padding: 20,
              usePointStyle: true, // Circle bullets in legend instead of rectangles
            }
          },
          tooltip: {
            backgroundColor: '#1E1C2E',
            titleColor: '#FFFFFF',
            bodyColor: 'rgba(255,255,255,0.8)',
            padding: 14,
            cornerRadius: 8,
            callbacks: {
              // Format each tooltip line as "$XX,XXX"
              label: (ctx) => {
                const val = ctx.parsed.y;
                // Show negative values in red-ish text with a minus sign
                const formatted = `$${Math.abs(val).toLocaleString()}`;
                const label = ctx.dataset.label;
                return ` ${label}: ${val < 0 ? '-' : ''}${formatted}`;
              },
              // Add phase label to tooltip title
              title: (items) => {
                const mo = items[0].dataIndex + 1; // 0-indexed → 1-indexed
                let phase = '';
                if (mo <= 6)        phase = ' (Beta)';
                else if (mo <= 12)  phase = ' (Early Adopters)';
                else if (mo <= 18)  phase = ' (Public Launch)';
                else if (mo <= 24)  phase = ' (Angel Scale)';
                else if (mo <= 30)  phase = ' (Pre-VC)';
                else                phase = ' (VC Scale)';
                return `Month ${mo}${phase}`;
              }
            }
          },

          // ── Vertical Phase Boundary Lines ──
          // We draw these as custom annotations using a Chart.js plugin
          // Since we're not using the annotation plugin, we do it via afterDraw hook
        },

        scales: {
          x: {
            grid: { display: false },
            ticks: {
              font: { family: 'Inter', size: 11 },
              color: '#888780',
              // Only show every 6th label to avoid overcrowding (Mo 1, Mo 7, Mo 13...)
              maxTicksLimit: 7,
              maxRotation: 0, // Don't rotate labels
            }
          },
          y: {
            grid: {
              color: 'rgba(0,0,0,0.06)',
              drawBorder: false,
            },
            ticks: {
              font: { family: 'Inter', size: 11 },
              color: '#888780',
              // Format as "$XX,XXX" — use K for thousands
              callback: (val) => {
                if (Math.abs(val) >= 1000) {
                  return `$${(val / 1000).toFixed(0)}K`;
                }
                return `$${val}`;
              }
            }
          }
        },

        animation: {
          duration: 1400,
          easing: 'easeOutQuart',
        }
      },

      // ── Custom Plugin: Draw Phase Bands ──
      // This runs AFTER Chart.js draws the chart and overlays colored zones
      plugins: [{
        id: 'phaseBands',
        afterDraw: (chart) => {
          const ctx   = chart.ctx;                          // Canvas context
          const xAxis = chart.scales.x;                    // X-axis scale object
          const yAxis = chart.scales.y;                    // Y-axis scale object
          const top   = yAxis.top;                         // Top of chart area
          const bot   = yAxis.bottom;                      // Bottom of chart area

          // Define the phase ranges and their colors
          const phases = [
            { from: 0,  to: 5,  color: 'rgba(29, 158, 117, 0.06)',  label: 'Bootstrap' },   // Mo 1–6
            { from: 6,  to: 11, color: 'rgba(83, 74, 183, 0.06)',   label: 'Early Adopters' }, // Mo 7–12
            { from: 12, to: 17, color: 'rgba(29, 158, 117, 0.06)',  label: 'Public Launch' },// Mo 13–18
            { from: 18, to: 23, color: 'rgba(83, 74, 183, 0.06)',   label: 'Angel Scale' },  // Mo 19–24
            { from: 24, to: 29, color: 'rgba(196, 124, 10, 0.06)',  label: 'Pre-VC' },       // Mo 25–30
            { from: 30, to: 35, color: 'rgba(216, 90, 48, 0.08)',   label: 'VC Scale' },     // Mo 31–36
          ];

          phases.forEach(phase => {
            // Get x-pixel positions for start and end of each phase
            // getPixelForValue converts data index → pixel position
            const startX = xAxis.getPixelForValue(phase.from);
            const endX   = xAxis.getPixelForValue(phase.to);

            // Draw a semi-transparent colored rectangle over this phase
            ctx.save();
            ctx.fillStyle = phase.color;
            ctx.fillRect(startX, top, endX - startX, bot - top);
            ctx.restore();
          });
        }
      }]
    });
  }


  /* ══════════════════════════════════════════════════════════
     BLOCK 16: FUNDING EQUITY BAR ANIMATION
     The equity bars in the Funding section animate their heights
     in when the section comes into view (IntersectionObserver).
     We use CSS height transitions — the initial heights are set
     inline in the HTML; we animate them by adding a class.
  ══════════════════════════════════════════════════════════ */

  // The equity tracker container
  const equityTracker = document.querySelector('.equity-tracker');

  if (equityTracker) {
    let equityAnimated = false; // Only animate once

    const equityObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !equityAnimated) {
          equityAnimated = true;

          // Add .animated class to trigger CSS height transitions
          // The bars start at height: 0 conceptually and expand to their target heights
          // (Heights are set inline in HTML and CSS transitions handle the animation)
          equityTracker.classList.add('animated');
        }
      });
    }, { threshold: 0.3 }); // 30% visible

    equityObserver.observe(equityTracker);
  }


  /* ══════════════════════════════════════════════════════════
     BLOCK 17: LAZY LOAD CHARTS WHEN VISIBLE
     Chart.js renders to a canvas immediately when created,
     but we want the charts to animate IN when the user scrolls
     to them. We delay chart creation until the canvas is visible.
  ══════════════════════════════════════════════════════════ */
  // NOTE: The chart code above (Blocks 13 & 15) runs on DOMContentLoaded,
  // which means charts render when the page loads, not when scrolled to.
  // Chart.js animation (1200–1400ms) handles the visual reveal.
  // For a more advanced approach, charts could be created inside an
  // IntersectionObserver — this would be the next enhancement.


  /* ══════════════════════════════════════════════════════════
     BLOCK 18: DOCUMENT KEYBOARD SHORTCUTS
     Quick keyboard shortcuts for power users navigating the report.
     These won't conflict with browser shortcuts (we use numbers 1–8).
  ══════════════════════════════════════════════════════════ */

  // Map digit keys to section IDs
  const keyMap = {
    '1': 'overview',
    '2': 'swot',
    '3': 'market',
    '4': 'financial',
    '5': 'personas',
    '6': 'funding',
    '7': 'gtm',
    '8': 'results',
  };

  document.addEventListener('keydown', (e) => {
    // Ignore if the user is typing in an input field
    if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;

    // Ignore if a modal is open (keyboard should control the modal instead)
    const openModal = document.querySelector('.modal-overlay.open');
    if (openModal) return;

    // Check if a number key was pressed
    if (keyMap[e.key]) {
      e.preventDefault();
      scrollToSection(keyMap[e.key]);
    }
  });


  /* ══════════════════════════════════════════════════════════
     BLOCK 19: DYNAMIC YEAR IN FOOTER
     Automatically update the copyright year so the footer
     doesn't go stale. Small but professional touch.
  ══════════════════════════════════════════════════════════ */

  // (No footer year element in the current HTML, but good pattern to include)
  // If you add a <span id="footer-year"></span> to the footer,
  // this will populate it automatically:
  const yearEl = document.getElementById('footer-year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();


  /* ══════════════════════════════════════════════════════════
     BLOCK 20: COMPETITIVE TABLE ROW HOVER DETAILS
     When hovering over a competitor row in the market table,
     briefly highlight the row with a stronger border to draw
     attention. This enhances the existing CSS hover state.
  ══════════════════════════════════════════════════════════ */

  const compRows = document.querySelectorAll('.comp-tbl-row');
  compRows.forEach(row => {
    row.addEventListener('mouseenter', () => {
      // Briefly pulse the row border
      row.style.outline = '2px solid rgba(83, 74, 183, 0.3)';
      row.style.outlineOffset = '-2px';
    });
    row.addEventListener('mouseleave', () => {
      row.style.outline = '';
      row.style.outlineOffset = '';
    });
  });


  /* ══════════════════════════════════════════════════════════
     BLOCK 21: MARKET CHART LAZY INIT
     Only initialize the market chart when its canvas enters
     the viewport. This prevents any rendering flash on load.
  ══════════════════════════════════════════════════════════ */
  // The charts are initialized above on DOMContentLoaded.
  // Chart.js animations take care of the visual reveal.
  // This note documents that lazy-init can be implemented here
  // if performance becomes a concern on lower-end devices.


  /* ══════════════════════════════════════════════════════════
     BLOCK 22: SWOT SUMMARY BAR — HOVER TOOLTIP ENHANCEMENT
     The three SWOT summary items (Win, Risk, Action) at the
     bottom of the SWOT section get a brief pulse when entering
     the viewport to draw attention to them.
  ══════════════════════════════════════════════════════════ */

  const swotSummary = document.querySelector('.swot-summary');
  if (swotSummary) {
    const ssObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          // Add a brief class for CSS pulse animation if desired
          swotSummary.classList.add('summary-visible');
          ssObserver.unobserve(swotSummary); // Only trigger once
        }
      });
    }, { threshold: 0.3 });

    ssObserver.observe(swotSummary);
  }


  /* ══════════════════════════════════════════════════════════
     BLOCK 23: INIT LOG
     Console log on startup so we know JS loaded correctly.
     Useful during development and testing.
  ══════════════════════════════════════════════════════════ */

  console.log('%c AI Hyper-Productivity Report Loaded', [
    'background: #534AB7',
    'color: #fff',
    'padding: 6px 12px',
    'border-radius: 4px',
    'font-weight: bold',
  ].join(';'));

  console.log('%c Keyboard shortcuts: Press 1–8 to jump to sections', [
    'color: #1D9E75',
    'font-weight: 600',
  ].join(';'));

}); // End DOMContentLoaded
