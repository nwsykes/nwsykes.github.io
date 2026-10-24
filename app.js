const root = document.documentElement;
const header = document.querySelector('.site-header');
const viewButtons = [...document.querySelectorAll('[data-view]')];
const panels = [...document.querySelectorAll('[data-panel]')];
const themeToggle = document.querySelector('.theme-toggle');
const menuToggle = document.querySelector('.menu-toggle');
const backToTop = document.querySelector('.back-to-top');
const themeMeta = document.querySelector('meta[name="theme-color"]');

function selectView(name, updateHash = true) {
  const selected = panels.some((panel) => panel.dataset.panel === name) ? name : 'videos';
  panels.forEach((panel) => {
    const active = panel.dataset.panel === selected;
    panel.classList.toggle('is-active', active);
    panel.setAttribute('aria-hidden', String(!active));
  });
  viewButtons.forEach((button) => button.setAttribute('aria-pressed', String(button.dataset.view === selected)));
  header.classList.remove('is-open');
  menuToggle.setAttribute('aria-expanded', 'false');
  menuToggle.setAttribute('aria-label', 'Open menu');
  if (updateHash) history.replaceState(null, '', `#${selected}`);
  window.scrollTo({ top: 0, behavior: 'instant' });
}

function setTheme(theme) {
  const dark = theme === 'dark';
  root.dataset.theme = dark ? 'dark' : 'light';
  themeToggle.setAttribute('aria-pressed', String(dark));
  themeToggle.setAttribute('aria-label', dark ? 'Switch to light mode' : 'Switch to dark mode');
  themeMeta.setAttribute('content', dark ? '#111111' : '#ffffff');
  localStorage.setItem('nick-sykes-theme', dark ? 'dark' : 'light');
}

viewButtons.forEach((button) => button.addEventListener('click', () => selectView(button.dataset.view)));
document.querySelector('[data-home]').addEventListener('click', (event) => { event.preventDefault(); selectView('videos'); });
themeToggle.addEventListener('click', () => setTheme(root.dataset.theme === 'dark' ? 'light' : 'dark'));
menuToggle.addEventListener('click', () => {
  const open = header.classList.toggle('is-open');
  menuToggle.setAttribute('aria-expanded', String(open));
  menuToggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
});
backToTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
window.addEventListener('scroll', () => backToTop.classList.toggle('is-visible', window.scrollY > 500), { passive: true });

selectView(location.hash.slice(1), false);
setTheme(localStorage.getItem('nick-sykes-theme') || 'light');
