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
const themeIcon = document.getElementById('theme-icon');
const rootElement = document.documentElement; // this is the <html> tag

// A helper function that switches the look to a given theme ('light' or 'dark').
function applyTheme(theme) {
  if (theme === 'light') {
    rootElement.classList.add('light'); // adds class="light" to <html> -> CSS light variables kick in
    themeIcon.textContent = '☀️';        // show a sun (click to go back to dark)
  } else {
    rootElement.classList.remove('light'); // back to the dark defaults
    themeIcon.textContent = '🌙';          // show a moon
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
   2. AUTO-UPDATING FOOTER YEAR
--------------------------------------------------------------------------- */

// Find the <span id="year"></span> in the footer and put the current year in it.
// This means you never have to manually update the copyright year.
const yearSpan = document.getElementById('year');
yearSpan.textContent = new Date().getFullYear();
