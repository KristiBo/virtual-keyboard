/* eslint-disable import/extensions */
import en from '../modules_js/en.js';
import ru from '../modules_js/ru.js';

let capsKey;
let currentLanguage;
const language = JSON.parse(localStorage.getItem('language') || '"en"');

const createKeyboard = (lang, size) => {
  if (lang === en) {
    currentLanguage = 'en';
  } else {
    currentLanguage = 'ru';
  }
  const keyboard = document.createElement('div');
  keyboard.classList.add('keyboard__container');
  lang.forEach((el) => {
    const btn = document.createElement('button');
    btn.classList.add('keyboard__key', el.code);
    btn.setAttribute('data-key', el.code);
    if (size === 'caps' && el.key.length === 1) {
      btn.innerHTML = el.key.toUpperCase();
    } else if (size === 'shift') {
      if (el.code === 'ShiftLeft' || el.code === 'ShiftRight') btn.classList.add('active');
      btn.innerHTML = el.shift;
    } else {
      btn.innerHTML = el.key;
    }
    if (size === 'caps' && el.code === 'CapsLock') btn.classList.add('active');
    keyboard.appendChild(btn);
  });
  if (size === 'caps') {
    capsKey = true;
  } else {
    capsKey = false;
  }
  localStorage.setItem('language', JSON.stringify(currentLanguage));
  return keyboard;
};

let keyboard;

if (language === 'en') {
  keyboard = createKeyboard(en, 'little');
} else {
  keyboard = createKeyboard(ru, 'little');
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

function changeKeyboard(currentKeyboard) {
  container.removeChild(keyboard);
  keyboard = currentKeyboard;
  container.append(keyboard);
}

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
      if (currentLanguage === 'en') {
        changeKeyboard(createKeyboard(en, 'shift'));
      } else {
        changeKeyboard(createKeyboard(ru, 'shift'));
      }
    }
    if (event.code === 'CapsLock' && capsKey === false) {
      if (currentLanguage === 'en') {
        changeKeyboard(createKeyboard(en, 'caps'));
      } else {
        changeKeyboard(createKeyboard(ru, 'caps'));
      }
    } else if (capsKey === true && event.code === 'CapsLock') {
      setTimeout(() => {
        if (currentLanguage === 'en') {
          changeKeyboard(createKeyboard(en, 'little'));
        } else {
          changeKeyboard(createKeyboard(ru, 'little'));
        }
      }, 100);
    }
    if (event.code === 'Enter') textarea.value += '\n';
    if (event.code === 'Tab') textarea.value += '\u0009';
    if (event.code === 'Backspace' && textarea.value.length > 0) {
      textarea.value = textarea.value.slice(0, textarea.value.length - 1);
    }
    if (event.code === 'ControlLeft' && currentLanguage === 'en') {
      setTimeout(() => {
        changeKeyboard(createKeyboard(ru, 'little'));
      }, 100);
    } else if (currentLanguage === 'ru' && event.code === 'ControlLeft') {
      setTimeout(() => {
        changeKeyboard(createKeyboard(en, 'little'));
      }, 100);
    }
  }
});

document.addEventListener('keyup', (event) => {
  event.preventDefault();
  const btn = document.querySelector(`[data-key=${event.code}]`);
  if (btn) btn.classList.remove('active');
  if (event.code === 'ShiftLeft' || event.code === 'ShiftRight') {
    if (currentLanguage === 'en') {
      changeKeyboard(createKeyboard(en, 'little'));
    } else {
      changeKeyboard(createKeyboard(ru, 'little'));
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
      if (currentLanguage === 'en') {
        changeKeyboard(createKeyboard(en, 'shift'));
      } else {
        changeKeyboard(createKeyboard(ru, 'shift'));
      }
    }
    if (event.target.dataset.key === 'CapsLock' && capsKey === false) {
      if (currentLanguage === 'en') {
        changeKeyboard(createKeyboard(en, 'caps'));
      } else {
        changeKeyboard(createKeyboard(ru, 'caps'));
      }
    } else if (capsKey === true && event.target.dataset.key === 'CapsLock') {
      setTimeout(() => {
        if (currentLanguage === 'en') {
          changeKeyboard(createKeyboard(en, 'little'));
        } else {
          changeKeyboard(createKeyboard(ru, 'little'));
        }
      }, 200);
    }
    if (event.target.dataset.key === 'Enter') textarea.value += '\n';
    if (event.target.dataset.key === 'Tab') textarea.value += '\u0009';
    if (event.target.dataset.key === 'Backspace' && textarea.value.length > 0) {
      textarea.value = textarea.value.slice(0, textarea.value.length - 1);
    }
    if (event.target.dataset.key === 'ControlLeft' && currentLanguage === 'en') {
      setTimeout(() => {
        changeKeyboard(createKeyboard(ru, 'little'));
      }, 200);
    } else if (currentLanguage === 'ru' && event.target.dataset.key === 'ControlLeft') {
      setTimeout(() => {
        changeKeyboard(createKeyboard(en, 'little'));
      }, 200);
    }
  }
});

document.addEventListener('mouseup', (event) => {
  if (event.target.dataset.key) {
    textarea.focus();
    event.target.classList.remove('active');
    if (event.target.dataset.key === 'ShiftLeft' || event.target.dataset.key === 'ShiftRight') {
      if (currentLanguage === 'en') {
        changeKeyboard(createKeyboard(en, 'little'));
      } else {
        changeKeyboard(createKeyboard(ru, 'little'));
      }
    }
  }
});

document.addEventListener('mouseout', (event) => {
  event.target.classList.remove('active');
});
