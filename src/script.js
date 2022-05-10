/* eslint-disable import/extensions */
import en from '../modules_js/en.js';

const createKeyboard = () => {
  const keyboard = document.createElement('div');
  keyboard.classList.add('keyboard__container');
  en.forEach((el) => {
    const btn = document.createElement('button');
    btn.classList.add('keyboard__key', [el.code]);
    btn.setAttribute('data-key', [el.code]);
    btn.innerHTML = el.key;
    keyboard.appendChild(btn);
  });
  return keyboard;
};

const changeKeyboardShift = () => {
  const keyboard = document.createElement('div');
  keyboard.classList.add('keyboard__container');
  en.forEach((el) => {
    const btn = document.createElement('button');
    btn.classList.add('keyboard__key', [el.code]);
    btn.setAttribute('data-key', [el.code]);
    if (el.shift) {
      btn.innerHTML = el.shift;
    } else btn.innerHTML = el.key;
    keyboard.appendChild(btn);
  });
  return keyboard;
};

const changeKeyboardCaps = () => {
  const keyboard = document.createElement('div');
  keyboard.classList.add('keyboard__container');
  en.forEach((el) => {
    const btn = document.createElement('button');
    btn.classList.add('keyboard__key', [el.code]);
    btn.setAttribute('data-key', [el.code]);
    if (el.key.length === 1) {
      btn.innerHTML = el.key.toUpperCase();
    } else btn.innerHTML = el.key;
    keyboard.appendChild(btn);
  });
  return keyboard;
};

let keyboard = createKeyboard();

const createHTML = () => {
  const container = document.createElement('div');
  container.classList.add('container');
  const textarea = document.createElement('textarea');
  textarea.classList.add('textarea');
  const description = document.createElement('span');
  description.innerHTML = 'The keyboard was created on Windows.<br>For change language: Left Ctrl + Alt (i`m sorry, it doesn`t work now).';
  container.append(description, textarea, keyboard);
  document.body.appendChild(container);
};

createHTML();
const container = document.querySelector('.container');
const textarea = document.querySelector('textarea');

document.addEventListener('keydown', (event) => {
  event.preventDefault();
  const btn = document.querySelector(`[data-key=${event.code}]`);
  if (btn) {
    textarea.focus();
    btn.classList.add('active');
    if (event.key.length === 1
    || event.code === 'ArrowUp'
    || event.code === 'ArrowLeft'
    || event.code === 'ArrowDown'
    || event.code === 'ArrowRight') {
      textarea.value += btn.innerText;
    }
    if (event.code === 'ShiftLeft' || event.code === 'ShiftRight') {
      container.removeChild(keyboard);
      keyboard = changeKeyboardShift();
      container.append(keyboard);
    }
    if (event.code === 'CapsLock') {
      container.removeChild(keyboard);
      keyboard = changeKeyboardCaps();
      container.append(keyboard);
    }
    if (event.code === 'Enter') textarea.value += '\n';
    if (event.code === 'Tab') textarea.value += '\u0009';
  }
});

document.addEventListener('keyup', (event) => {
  event.preventDefault();
  const btn = document.querySelector(`[data-key=${event.code}]`);
  if (btn) btn.classList.remove('active');
  if (event.code === 'ShiftLeft' || event.code === 'ShiftRight') {
    container.removeChild(keyboard);
    keyboard = createKeyboard();
    container.append(keyboard);
  }
});

document.addEventListener('mousedown', (event) => {
  if (event.target.dataset.key) {
    event.target.classList.add('active');
    if (event.target.innerHTML.length === 1
    || event.target.dataset.key === 'ArrowUp'
    || event.target.dataset.key === 'ArrowLeft'
    || event.target.dataset.key === 'ArrowDown'
    || event.target.dataset.key === 'ArrowRight'
    || event.target.dataset.key === 'Space'
    || event.target.dataset.key === 'Digit7'
    || event.target.dataset.key === 'Comma'
    || event.target.dataset.key === 'Period') {
      textarea.value += event.target.innerText;
    }
    if (event.target.dataset.key === 'ShiftLeft' || event.target.dataset.key === 'ShiftRight') {
      container.removeChild(keyboard);
      keyboard = changeKeyboardShift();
      container.append(keyboard);
    }
    if (event.target.dataset.key === 'CapsLock') {
      container.removeChild(keyboard);
      keyboard = changeKeyboardCaps();
      container.append(keyboard);
    }
    if (event.target.dataset.key === 'Enter') textarea.value += '\n';
    if (event.target.dataset.key === 'Tab') textarea.value += '\u0009';
  }
});

document.addEventListener('mouseup', (event) => {
  textarea.focus();
  event.target.classList.remove('active');
  if (event.target.dataset.key === 'ShiftLeft' || event.target.dataset.key === 'ShiftRight') {
    container.removeChild(keyboard);
    keyboard = createKeyboard();
    container.append(keyboard);
  }
});

document.addEventListener('mouseout', (event) => {
  event.target.classList.remove('active');
});
