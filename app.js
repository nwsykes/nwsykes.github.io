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

const heroTitle = document.querySelector('#hero-title');
const stackedHero = matchMedia('(max-width: 900px)');

function syncHeroPortrait() {
  if (!heroTitle || stackedHero.matches) {
    root.style.removeProperty('--hero-title-height');
    return;
  }

  root.style.setProperty('--hero-title-height', `${Math.ceil(heroTitle.getBoundingClientRect().height)}px`);
}

if (heroTitle && 'ResizeObserver' in window) {
  new ResizeObserver(syncHeroPortrait).observe(heroTitle);
}

stackedHero.addEventListener('change', syncHeroPortrait);
document.fonts?.ready.then(syncHeroPortrait);
syncHeroPortrait();

const sectionLinks = [...document.querySelectorAll('.site-header a[href^="#"], .mobile-section-nav a[href^="#"]')];
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

const portfolioListLimit = 10;

document.querySelectorAll('[data-collapsible-list]').forEach((list, listIndex) => {
  const items = [...list.querySelectorAll(':scope > [role="listitem"]')];

  if (items.length <= portfolioListLimit) return;

  const hiddenItems = items.slice(portfolioListLimit);
  const listId = list.id || `portfolio-list-${listIndex + 1}`;
  list.id = listId;

  hiddenItems.forEach((item) => {
    item.hidden = true;
  });

  const moreButton = document.createElement('button');
  moreButton.className = 'index-more';
  moreButton.type = 'button';
  moreButton.setAttribute('aria-controls', listId);
  moreButton.setAttribute('aria-expanded', 'false');
  moreButton.innerHTML = `<span>${list.dataset.moreLabel || 'More'}</span><i class="material-symbols-outlined" aria-hidden="true">keyboard_double_arrow_down</i>`;

  moreButton.addEventListener('click', () => {
    hiddenItems.forEach((item) => {
      item.hidden = false;
    });
    moreButton.setAttribute('aria-expanded', 'true');
    moreButton.remove();
  });

  list.insertAdjacentElement('afterend', moreButton);
});
