const buttons = [...document.querySelectorAll('[data-concept]')];
const panels = [...document.querySelectorAll('[data-panel]')];
const note = document.querySelector('#concept-note');

const descriptions = {
  rebuild: 'A faithful, refined modernization',
  reimagine: 'An editorial product-leadership statement',
};

function showConcept(name, updateHash = true) {
  const selected = panels.some((panel) => panel.dataset.panel === name) ? name : 'rebuild';

  panels.forEach((panel) => {
    const active = panel.dataset.panel === selected;
    panel.classList.toggle('is-visible', active);
    panel.setAttribute('aria-hidden', String(!active));
  });

  buttons.forEach((button) => {
    const active = button.dataset.concept === selected;
    button.classList.toggle('is-active', active);
    button.setAttribute('aria-pressed', String(active));
  });

  note.textContent = descriptions[selected];
  document.documentElement.style.backgroundColor = selected === 'reimagine' ? '#101b24' : '#f5f3ee';
  if (updateHash) history.replaceState(null, '', `#${selected}`);
  window.scrollTo({ top: 0, behavior: 'instant' });
}

buttons.forEach((button) => button.addEventListener('click', () => showConcept(button.dataset.concept)));
showConcept(location.hash.slice(1), false);
