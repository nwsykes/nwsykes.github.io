const root = document.documentElement;
const panels = [...document.querySelectorAll('[data-panel]')];
const conceptButtons = [...document.querySelectorAll('[data-concept]')];
const themeButton = document.querySelector('.theme-toggle');
const themeMeta = document.querySelector('meta[name="theme-color"]');

function selectConcept(name, updateHash = true) {
  const selected = panels.some((panel) => panel.dataset.panel === name) ? name : 'space';
  panels.forEach((panel) => {
    const active = panel.dataset.panel === selected;
    panel.classList.toggle('is-active', active);
    panel.setAttribute('aria-hidden', String(!active));
  });
  conceptButtons.forEach((button) => button.setAttribute('aria-pressed', String(button.dataset.concept === selected)));
  if (updateHash) history.replaceState(null, '', `#${selected}`);
  window.scrollTo({ top: 0, behavior: 'instant' });
}

function setTheme(theme) {
  const dark = theme === 'dark';
  root.dataset.theme = dark ? 'dark' : 'light';
  themeButton.setAttribute('aria-pressed', String(dark));
  themeButton.setAttribute('aria-label', dark ? 'Switch to light mode' : 'Switch to dark mode');
  themeMeta.setAttribute('content', dark ? '#111317' : '#ffffff');
  localStorage.setItem('portfolio-theme', dark ? 'dark' : 'light');
}

conceptButtons.forEach((button) => button.addEventListener('click', () => selectConcept(button.dataset.concept)));
themeButton.addEventListener('click', () => setTheme(root.dataset.theme === 'dark' ? 'light' : 'dark'));

selectConcept(location.hash.slice(1), false);
setTheme(localStorage.getItem('portfolio-theme') || 'light');
