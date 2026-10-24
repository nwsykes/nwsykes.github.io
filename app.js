const root = document.documentElement;
const toggle = document.querySelector('.theme-toggle');
const themeMeta = document.querySelector('meta[name="theme-color"]');

function setTheme(theme) {
  root.dataset.theme = theme;
  const dark = theme === 'dark';
  toggle.setAttribute('aria-pressed', String(dark));
  toggle.setAttribute('aria-label', dark ? 'Switch to light mode' : 'Switch to dark mode');
  themeMeta.setAttribute('content', dark ? '#111317' : '#ffffff');
}

const savedTheme = localStorage.getItem('nick-sykes-theme');
const preferredTheme = matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
setTheme(savedTheme || preferredTheme);

toggle.addEventListener('click', () => {
  const next = root.dataset.theme === 'dark' ? 'light' : 'dark';
  setTheme(next);
  localStorage.setItem('nick-sykes-theme', next);
});

document.querySelectorAll('[data-year]').forEach((year) => {
  year.textContent = new Date().getFullYear();
});

const sectionLinks = [...document.querySelectorAll('.site-header a[href^="#"]')];
const sections = [...document.querySelectorAll('main > section[id]')];

function updateActiveSection() {
  const marker = window.scrollY + document.querySelector('.site-header').offsetHeight + Math.min(window.innerHeight * 0.22, 170);
  let activeSection = sections[0];

  sections.forEach((section) => {
    if (section.offsetTop <= marker) activeSection = section;
  });

  sectionLinks.forEach((link) => {
    const active = link.hash === `#${activeSection.id}`;
    link.classList.toggle('is-active', active);
    if (active) link.setAttribute('aria-current', 'location');
    else link.removeAttribute('aria-current');
  });
}

addEventListener('scroll', updateActiveSection, { passive: true });
addEventListener('resize', updateActiveSection);
updateActiveSection();
