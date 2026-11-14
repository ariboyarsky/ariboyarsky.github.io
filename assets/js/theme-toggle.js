/*
 * Light / dark mode toggle.
 * The initial theme is set in _includes/head.html before first paint.
 * An explicit choice is saved in localStorage; without one, the site
 * follows the operating system setting, including live changes to it.
 */
(function () {
  var root = document.documentElement;
  var button = document.getElementById('theme-toggle');
  var themeColor = document.querySelector('meta[name="theme-color"]');
  if (!button) return;

  function savedTheme() {
    try {
      var value = localStorage.getItem('theme');
      return value === 'light' || value === 'dark' ? value : null;
    } catch (e) {
      return null;
    }
  }

  function currentTheme() {
    return root.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
  }

  function applyTheme(theme) {
    var isDark = theme === 'dark';
    root.setAttribute('data-theme', theme);
    button.setAttribute('aria-pressed', isDark ? 'true' : 'false');
    button.setAttribute('title', isDark ? 'Switch to light mode' : 'Switch to dark mode');
    if (themeColor) themeColor.setAttribute('content', isDark ? '#1a1c20' : '#ffffff');
  }

  applyTheme(currentTheme());

  button.addEventListener('click', function () {
    var next = currentTheme() === 'dark' ? 'light' : 'dark';
    applyTheme(next);
    try { localStorage.setItem('theme', next); } catch (e) {}
  });

  if (window.matchMedia) {
    var query = window.matchMedia('(prefers-color-scheme: dark)');
    var onSystemChange = function (event) {
      if (!savedTheme()) applyTheme(event.matches ? 'dark' : 'light');
    };
    if (query.addEventListener) query.addEventListener('change', onSystemChange);
    else if (query.addListener) query.addListener(onSystemChange);
  }
})();
