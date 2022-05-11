/* eslint-disable import/extensions */
import en from './modules_js/en.js';
import ru from './modules_js/ru.js';

let flag;
let lang;
const language = JSON.parse(localStorage.getItem('language') || '"en"');

const createKeyboard = () => {
  lang = 'en';
  const keyboard = document.createElement('div');
  keyboard.classList.add('keyboard__container');
  en.forEach((el) => {
    const btn = document.createElement('button');
    btn.classList.add('keyboard__key', [el.code]);
    btn.setAttribute('data-key', [el.code]);
    btn.innerHTML = el.key;
    keyboard.appendChild(btn);
  });
  flag = false;
  localStorage.setItem('language', JSON.stringify('en'));
  return keyboard;
};

const createKeyboardRu = () => {
  lang = 'ru';
  const keyboard = document.createElement('div');
  keyboard.classList.add('keyboard__container');
  ru.forEach((el) => {
    const btn = document.createElement('button');
    btn.classList.add('keyboard__key', [el.code]);
    btn.setAttribute('data-key', [el.code]);
    btn.innerHTML = el.key;
    keyboard.appendChild(btn);
  });
  flag = false;
  localStorage.setItem('language', JSON.stringify('ru'));
  return keyboard;
};

const changeKeyboardShift = () => {
  const keyboard = document.createElement('div');
  keyboard.classList.add('keyboard__container');
  en.forEach((el) => {
    const btn = document.createElement('button');
    btn.classList.add('keyboard__key', [el.code]);
    if (el.code === 'ShiftLeft' || el.code === 'ShiftRight') btn.classList.add('active');
    btn.setAttribute('data-key', [el.code]);
    if (el.shift) {
      btn.innerHTML = el.shift;
    } else btn.innerHTML = el.key;
    keyboard.appendChild(btn);
  });
  return keyboard;
};

const changeKeyboardShiftRu = () => {
  const keyboard = document.createElement('div');
  keyboard.classList.add('keyboard__container');
  ru.forEach((el) => {
    const btn = document.createElement('button');
    btn.classList.add('keyboard__key', [el.code]);
    if (el.code === 'ShiftLeft' || el.code === 'ShiftRight') btn.classList.add('active');
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
    if (el.code === 'CapsLock') btn.classList.add('active');
    btn.setAttribute('data-key', [el.code]);
    if (el.key.length === 1) {
      btn.innerHTML = el.key.toUpperCase();
    } else btn.innerHTML = el.key;
    keyboard.appendChild(btn);
  });
  flag = true;
  return keyboard;
};

const changeKeyboardCapsRu = () => {
  const keyboard = document.createElement('div');
  keyboard.classList.add('keyboard__container');
  ru.forEach((el) => {
    const btn = document.createElement('button');
    btn.classList.add('keyboard__key', [el.code]);
    if (el.code === 'CapsLock') btn.classList.add('active');
    btn.setAttribute('data-key', [el.code]);
    if (el.key.length === 1) {
      btn.innerHTML = el.key.toUpperCase();
    } else btn.innerHTML = el.key;
    keyboard.appendChild(btn);
  });
  flag = true;
  return keyboard;
};

let keyboard;

if (language === 'en') {
  keyboard = createKeyboard();
} else {
  keyboard = createKeyboardRu();
}

const createHTML = () => {
  const container = document.createElement('div');
  container.classList.add('container');
  const textarea = document.createElement('textarea');
  textarea.classList.add('textarea');
  const description = document.createElement('span');
  description.innerHTML = 'The keyboard was created on Windows.<br>For change language: Left Ctrl.';
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
      if (lang === 'en') {
        container.removeChild(keyboard);
        keyboard = changeKeyboardShift();
        container.append(keyboard);
      } else {
        container.removeChild(keyboard);
        keyboard = changeKeyboardShiftRu();
        container.append(keyboard);
      }
    }
    if (event.code === 'CapsLock' && flag === false) {
      if (lang === 'en') {
        container.removeChild(keyboard);
        keyboard = changeKeyboardCaps();
        container.append(keyboard);
      } else {
        container.removeChild(keyboard);
        keyboard = changeKeyboardCapsRu();
        container.append(keyboard);
      }
    } else if (flag === true && event.code === 'CapsLock') {
      setTimeout(() => {
        if (lang === 'en') {
          container.removeChild(keyboard);
          keyboard = createKeyboard();
          container.append(keyboard);
        } else {
          container.removeChild(keyboard);
          keyboard = createKeyboardRu();
          container.append(keyboard);
        }
      }, 100);
    }
    if (event.code === 'Enter') textarea.value += '\n';
    if (event.code === 'Tab') textarea.value += '\u0009';
    if (event.code === 'Backspace' && textarea.value.length > 0) {
      textarea.value = textarea.value.slice(0, textarea.value.length - 1);
    }
    if (event.code === 'ControlLeft' && lang === 'en') {
      setTimeout(() => {
        container.removeChild(keyboard);
        keyboard = createKeyboardRu();
        container.append(keyboard);
      }, 100);
    } else if (lang === 'ru' && event.code === 'ControlLeft') {
      setTimeout(() => {
        container.removeChild(keyboard);
        keyboard = createKeyboard();
        container.append(keyboard);
      }, 100);
    }
  }
});

document.addEventListener('keyup', (event) => {
  event.preventDefault();
  const btn = document.querySelector(`[data-key=${event.code}]`);
  if (btn) btn.classList.remove('active');
  if (event.code === 'ShiftLeft' || event.code === 'ShiftRight') {
    if (lang === 'en') {
      container.removeChild(keyboard);
      keyboard = createKeyboard();
      container.append(keyboard);
    } else {
      container.removeChild(keyboard);
      keyboard = createKeyboardRu();
      container.append(keyboard);
    }
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
      if (lang === 'en') {
        container.removeChild(keyboard);
        keyboard = changeKeyboardShift();
        container.append(keyboard);
      } else {
        container.removeChild(keyboard);
        keyboard = changeKeyboardShiftRu();
        container.append(keyboard);
      }
    }
    if (event.target.dataset.key === 'CapsLock' && flag === false) {
      if (lang === 'en') {
        container.removeChild(keyboard);
        keyboard = changeKeyboardCaps();
        container.append(keyboard);
      } else {
        container.removeChild(keyboard);
        keyboard = changeKeyboardCapsRu();
        container.append(keyboard);
      }
    } else if (flag === true && event.target.dataset.key === 'CapsLock') {
      setTimeout(() => {
        if (lang === 'en') {
          container.removeChild(keyboard);
          keyboard = createKeyboard();
          container.append(keyboard);
        } else {
          container.removeChild(keyboard);
          keyboard = createKeyboardRu();
          container.append(keyboard);
        }
      }, 200);
    }
    if (event.target.dataset.key === 'Enter') textarea.value += '\n';
    if (event.target.dataset.key === 'Tab') textarea.value += '\u0009';
    if (event.target.dataset.key === 'Backspace' && textarea.value.length > 0) {
      textarea.value = textarea.value.slice(0, textarea.value.length - 1);
    }
    if (event.target.dataset.key === 'ControlLeft' && lang === 'en') {
      setTimeout(() => {
        container.removeChild(keyboard);
        keyboard = createKeyboardRu();
        container.append(keyboard);
      }, 200);
    } else if (lang === 'ru' && event.target.dataset.key === 'ControlLeft') {
      setTimeout(() => {
        container.removeChild(keyboard);
        keyboard = createKeyboard();
        container.append(keyboard);
      }, 200);
    }
  }
});

document.addEventListener('mouseup', (event) => {
  if (event.target.dataset.key) {
    textarea.focus();
    event.target.classList.remove('active');
    if (event.target.dataset.key === 'ShiftLeft' || event.target.dataset.key === 'ShiftRight') {
      if (lang === 'en') {
        container.removeChild(keyboard);
        keyboard = createKeyboard();
        container.append(keyboard);
      } else {
        container.removeChild(keyboard);
        keyboard = createKeyboardRu();
        container.append(keyboard);
      }
    }
  }
});

document.addEventListener('mouseout', (event) => {
  event.target.classList.remove('active');
});
