/* eslint-disable import/extensions */
import en from '../modules_js/en.js';
// import ru from '../modules_js/ru.js';

const createHTML = () => {
  const container = document.createElement('div');
  container.classList.add('container');
  const textarea = document.createElement('textarea');
  textarea.classList.add('textarea');
  const keyboard = document.createElement('div');
  keyboard.classList.add('keyboard__container');
  const description = document.createElement('span');
  description.innerHTML = 'The keyboard was created on Windows.<br>For change language: Left Ctrl + Alt.';
  for (let i = 0; i < en.length; i += 1) {
    const btn = document.createElement('button');
    btn.classList.add('keyboard__key', [en[i].code]);
    btn.setAttribute('data-key', [en[i].code]);
    btn.innerHTML = en[i].key;
    keyboard.appendChild(btn);
  }
  container.append(textarea, keyboard, description);
  document.body.appendChild(container);
  textarea.focus();
};

document.addEventListener('keydown', (event) => {
  event.preventDefault();
  const btn = document.querySelector(`[data-key=${event.code}]`);
  if (btn) btn.classList.add('active');
});

document.addEventListener('keyup', (event) => {
  const btn = document.querySelector(`[data-key=${event.code}]`);
  btn.classList.remove('active');
});

document.addEventListener('mousedown', (event) => {
  if (event.target.dataset.key) event.target.classList.add('active');
});

document.addEventListener('mouseup', (event) => {
  event.target.classList.remove('active');
});

createHTML();
