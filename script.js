/* ===========================================================================
   script.js  —  the small bits of INTERACTIVITY on the page
   ===========================================================================
   This file does two simple things:
     1. Light/dark theme toggle (and remembers your choice).
     2. Fills in the current year in the footer automatically.

   Note: this script is loaded at the BOTTOM of index.html, so by the time it
   runs, all the HTML elements it talks to already exist on the page.
   =========================================================================== */


/* ---------------------------------------------------------------------------
   1. LIGHT / DARK THEME TOGGLE
--------------------------------------------------------------------------- */

// Grab the elements we need from the page.
// document.getElementById finds an element by its id="" attribute.
const toggleButton = document.getElementById('theme-toggle');
const rootElement = document.documentElement; // this is the <html> tag

// A helper that switches the look to a given theme ('light' or 'dark').
// The sun/moon icons are swapped purely by CSS based on the 'light' class.
function applyTheme(theme) {
  if (theme === 'light') {
    rootElement.classList.add('light'); // adds class="light" to <html> -> CSS light variables kick in
  } else {
    rootElement.classList.remove('light'); // back to the dark defaults
  }
}

// When the page loads, check if the visitor chose a theme before.
// localStorage is a tiny storage box in the browser that survives refreshes.
const savedTheme = localStorage.getItem('theme'); // null if they've never chosen
applyTheme(savedTheme || 'dark'); // default to dark if nothing saved

// When the toggle button is clicked, flip the theme and remember the choice.
toggleButton.addEventListener('click', function () {
  // If <html> currently has the 'light' class, we're in light mode now.
  const isLight = rootElement.classList.contains('light');
  const nextTheme = isLight ? 'dark' : 'light'; // flip it

  applyTheme(nextTheme);                  // update the look
  localStorage.setItem('theme', nextTheme); // save for next visit
});


/* ---------------------------------------------------------------------------
   2. HEADER LOGO: "JE" -> PHOTO ON SCROLL
   ---------------------------------------------------------------------------
   Instead of listening to every scroll event and measuring positions ourselves,
   we let the browser watch the big hero photo for us with an IntersectionObserver.
   The browser only calls us back at the moment the photo enters or leaves the
   screen — which is efficient and reads more clearly than a pixel threshold.

     - hero avatar visible  -> show "JE" in the header
     - hero avatar scrolled off-screen -> cross-fade to the small photo

   The CSS does the actual fading; we just toggle the "scrolled" class.
--------------------------------------------------------------------------- */
const siteHeader = document.querySelector('.site-header');
const heroAvatar = document.querySelector('.hero .avatar');

// The callback runs whenever the watched element crosses the threshold.
// 'entries' is a list (one per watched element); we only watch one, so [0].
const logoObserver = new IntersectionObserver(
  function (entries) {
    const heroIsVisible = entries[0].isIntersecting;
    // Once the hero photo is fully hidden under the header, swap the logo.
    siteHeader.classList.toggle('scrolled', !heroIsVisible);
  },
  {
    // The header is 73px tall and sits on top of the page. A negative top
    // rootMargin pulls the detection edge down to the header's bottom, so the
    // avatar counts as "gone" exactly when it disappears beneath the header.
    rootMargin: '-73px 0px 0px 0px',
  }
);

// Start watching. The callback also fires once right away with the initial
// state, so we don't need a separate "set on load" call.
if (heroAvatar) {
  logoObserver.observe(heroAvatar);
}


/* ---------------------------------------------------------------------------
   3. SCROLL-REVEAL ANIMATION
   ---------------------------------------------------------------------------
   Each section fades and slides up as it scrolls into view. We add the hiding
   class to <html> first so that, if JavaScript is disabled, nothing is ever
   hidden — the content stays fully visible.
--------------------------------------------------------------------------- */
const revealTargets = document.querySelectorAll('.hero, .section');

// Turn on the "hidden until revealed" CSS only now that JS is running.
document.documentElement.classList.add('reveal-on');

const revealObserver = new IntersectionObserver(
  function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        revealObserver.unobserve(entry.target); // reveal once, then stop watching
      }
    });
  },
  // Start the reveal a little before the element is fully in view.
  { rootMargin: '0px 0px -10% 0px', threshold: 0.08 }
);

revealTargets.forEach(function (target) {
  target.classList.add('reveal');
  revealObserver.observe(target);
});


/* ---------------------------------------------------------------------------
   4. APPLE-TV-STYLE CURSOR TILT (the "What I bring" cards)
   ---------------------------------------------------------------------------
   As the pointer moves over a card, we tilt it toward the cursor in 3D and move
   a soft highlight to match. Only runs on devices with a real pointer (so phones
   are unaffected) and is skipped for visitors who prefer reduced motion.
--------------------------------------------------------------------------- */
const canHover = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (canHover && !prefersReducedMotion) {
  const MAX_TILT = 7; // degrees at the very edge of a card
  const RESET = 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)';

  document.querySelectorAll('.card').forEach(function (card) {
    // A hair of easing while tracking keeps it smooth, not jittery.
    card.addEventListener('pointerenter', function () {
      card.style.transition = 'transform 0.08s ease-out';
    });

    card.addEventListener('pointermove', function (e) {
      const rect = card.getBoundingClientRect();
      const px = (e.clientX - rect.left) / rect.width;  // 0 (left) … 1 (right)
      const py = (e.clientY - rect.top) / rect.height;  // 0 (top)  … 1 (bottom)

      const rotateY = (px - 0.5) * MAX_TILT * 2;   // left/right
      const rotateX = (0.5 - py) * MAX_TILT * 2;   // up/down

      card.style.transform =
        'perspective(800px) rotateX(' + rotateX + 'deg) rotateY(' + rotateY + 'deg) translateY(-4px)';
      // Position the faint sheen under the cursor.
      card.style.setProperty('--mx', px * 100 + '%');
      card.style.setProperty('--my', py * 100 + '%');
    });

    // On leave, spring smoothly back to flat.
    card.addEventListener('pointerleave', function () {
      card.style.transition = RESET;
      card.style.transform = '';
    });
  });
}


/* ---------------------------------------------------------------------------
   5. ACTIVE SECTION HIGHLIGHT (header nav + mobile dock)
   ---------------------------------------------------------------------------
   Watches the sections that have a matching nav/dock link and marks the link
   for whichever section is currently in the middle of the viewport.
--------------------------------------------------------------------------- */
const navAndDockLinks = document.querySelectorAll('.nav a, .dock a');

if (navAndDockLinks.length) {
  // Which sections do we actually have links for? (e.g. "#projects")
  const linkedHashes = [];
  navAndDockLinks.forEach(function (a) {
    const hash = a.getAttribute('href');
    if (hash && hash.charAt(0) === '#' && linkedHashes.indexOf(hash) === -1) {
      linkedHashes.push(hash);
    }
  });

  function setActiveSection(hash) {
    navAndDockLinks.forEach(function (a) {
      a.classList.toggle('active', a.getAttribute('href') === hash);
    });
  }

  const sectionSpy = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          setActiveSection('#' + entry.target.id);
        }
      });
    },
    // Only the slim band through the middle of the screen counts as "active",
    // so exactly one section lights up at a time as you scroll.
    { rootMargin: '-45% 0px -45% 0px', threshold: 0 }
  );

  linkedHashes.forEach(function (hash) {
    const section = document.querySelector(hash);
    if (section) {
      sectionSpy.observe(section);
    }
  });
}


/* ---------------------------------------------------------------------------
   6. AUTO-UPDATING FOOTER YEAR
--------------------------------------------------------------------------- */

// Find the <span id="year"></span> in the footer and put the current year in it.
// This means you never have to manually update the copyright year.
const yearSpan = document.getElementById('year');
yearSpan.textContent = new Date().getFullYear();
