/* eslint-disable import/extensions */
import en from '../modules_js/en.js';

const createHTML = () => {
  const container = document.createElement('div');
  container.classList.add('container');
  const textarea = document.createElement('textarea');
  textarea.classList.add('textarea');
  const keyboard = document.createElement('div');
  keyboard.classList.add('keyboard__container');
  const description = document.createElement('span');
  description.innerHTML = 'The keyboard was created on Windows.<br>For change language: Left Ctrl + Alt (i`m sorry, it doesn`t work now).';
  en.forEach((el) => {
    const btn = document.createElement('button');
    btn.classList.add('keyboard__key', [el.code]);
    btn.setAttribute('data-key', [el.code]);
    btn.innerHTML = el.key;
    keyboard.appendChild(btn);
  });
  container.append(textarea, keyboard, description);
  document.body.appendChild(container);
};

document.addEventListener('keydown', (event) => {
  event.preventDefault();
  const btn = document.querySelector(`[data-key=${event.code}]`);
  const textarea = document.querySelector('textarea');
  if (btn) {
    textarea.focus();
    btn.classList.add('active');
    if (event.key.length === 1 || event.code === 'ArrowUp' || event.code === 'ArrowLeft'
    || event.code === 'ArrowDown' || event.code === 'ArrowRight') {
      textarea.value += btn.innerHTML;
    }
  }
});

document.addEventListener('keyup', (event) => {
  event.preventDefault();
  const btn = document.querySelector(`[data-key=${event.code}]`);
  if (btn) btn.classList.remove('active');
});

document.addEventListener('mousedown', (event) => {
  const textarea = document.querySelector('textarea');
  if (event.target.dataset.key) {
    event.target.classList.add('active');
    if (event.target.innerHTML.length === 1 || event.target.dataset.key === 'ArrowUp'
    || event.target.dataset.key === 'ArrowLeft'
    || event.target.dataset.key === 'ArrowDown'
    || event.target.dataset.key === 'ArrowRight') {
      textarea.value += event.target.innerHTML;
    }
  }
});

document.addEventListener('mouseup', (event) => {
  event.target.classList.remove('active');
});

document.addEventListener('mouseout', (event) => {
  event.target.classList.remove('active');
});

createHTML();
