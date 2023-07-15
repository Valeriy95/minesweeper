/* eslint-disable no-useless-return */
import deleteHtml from './functionDeleteHtml';
import {
  playAudioClick, playAudioWin, playAudioLose, playAudioFlag,
} from './functionplayAudio';

export default function start(w, h, mine) {
  const numberOfBtn = w * h;
  let counter = mine;
  let clicks = 0;
  let sec = 0;
  let timer;
  let isVolume = true;

  let lastResult = [];

  let isOverGame = false;
  let onTimer = 0;

  function isNull() {
    if (JSON.parse(localStorage.getItem('arrLastResult') !== null)) {
      lastResult.push(JSON.parse(localStorage.getItem('arrLastResult')));
      const result = lastResult;
      lastResult = result.flat(1);
    }
  }
  isNull();

  function checkArr(arr) {
    if (arr.length === 11) {
      localStorage.removeItem('arrLastResult');
      arr.shift();
    } else {
      return;
    }
  }
  checkArr(lastResult);

  function createHtml(n) {
    const body = document.querySelector('body');

    const settings = document.createElement('div');
    settings.className = 'settings';
    body.append(settings);

    const messageLastResults = document.createElement('div');
    messageLastResults.className = 'list-container';
    messageLastResults.classList.add('hidden');
    body.append(messageLastResults);

    const closeMessageLastResults = document.createElement('div');
    closeMessageLastResults.classList = 'close-last-results';
    messageLastResults.append(closeMessageLastResults);

    const list = document.createElement('ol');
    messageLastResults.append(list);

    for (let i = 1; i < 11; i += 1) {
      const itemi = document.createElement('li');
      itemi.className = `result-${i}`;
      list.append(itemi);
    }

    const messageWin = document.createElement('div');
    messageWin.className = 'message-win';
    messageWin.classList.add('hidden');
    body.append(messageWin);

    const textWin = document.createElement('p');
    textWin.className = 'text-win';
    messageWin.append(textWin);

    const btnWin = document.createElement('div');
    btnWin.className = 'btn-win';
    btnWin.innerHTML = 'OK';
    messageWin.append(btnWin);

    const messageLose = document.createElement('div');
    messageLose.className = 'message-lose';
    messageLose.classList.add('hidden');
    body.append(messageLose);

    const messageLoseText = document.createElement('p');
    messageLoseText.className = 'message-lose-text';
    messageLoseText.innerHTML = 'Игра окончена. Попробуйте еще раз';
    messageLose.append(messageLoseText);

    const messageLoseWrapper = document.createElement('div');
    messageLoseWrapper.className = 'message-lose-wrapper';
    messageLose.append(messageLoseWrapper);

    const messageLoseBtnOk = document.createElement('div');
    messageLoseBtnOk.className = 'message-lose-ok';
    messageLoseBtnOk.innerHTML = 'OK';
    messageLoseWrapper.append(messageLoseBtnOk);

    const messageLoseBtnCancel = document.createElement('div');
    messageLoseBtnCancel.className = 'message-lose-cancel';
    messageLoseBtnCancel.innerHTML = 'Отмена';
    messageLoseWrapper.append(messageLoseBtnCancel);

    const iconSettings = document.createElement('div');
    iconSettings.className = 'icon-settings';
    settings.append(iconSettings);

    const settingsContainer = document.createElement('div');
    settingsContainer.className = 'settingsContainer';
    settingsContainer.innerHTML = `<div class="close-settings"></div><div class="themes-container">Цветовая тема\n<form class="themes-wrapper">\n<label>\n<span class="themes-text"><input name="themes" type="radio" value="light">Светлая</span>\n</label>\n<label>\n<span class="themes-text"><input name="themes" type="radio" value="dark">Темная</span>\n</label>\n</form>\n</div>\n<div class="level-container">Уровень игры\n<form class="level-wrapper">\n<label>\n<span class="level-text"><input name="level" type="radio" value="easy">Легкий</span>\n</label>\n<label>\n<span class="level-text"><input name="level" type="radio" value="medium">Средний</span>\n</label>\n<label>\n<span class="level-text"><input name="level" type="radio" value="heavy">Тяжелый</span>\n</label>\n</form>\n</div>\n<form class="input-wrapper">Количество мин\n<input class="input-mines" type="number" name="input-mine" min="10" max="99" value=${mine}>\n</form>\n<div class="volume-container">Вкл/Выкл звук\n<form class="volume-wrapper">\n<label>\n<span class="volume-text"><input name="volume" type="radio" value="on">Вкл</span>\n</label>\n<label>\n<span class="volume-text"><input name="volume" type="radio" value="off">Выкл</span>\n</label>\n</form>\n</div>\n<div class="last-result">Последние 10 результатов</div>`;
    settings.append(settingsContainer);

    const newGame = document.createElement('div');
    newGame.className = 'new-game';
    newGame.innerHTML = '<p>Новая игра</p>';
    settings.append(newGame);

    const btnReset = document.createElement('div');
    btnReset.className = 'btn-reset';
    settings.append(btnReset);

    const container = document.createElement('div');
    container.className = 'container';
    if (w === 15) {
      container.classList.add('container-medium');
    }
    if (w === 25) {
      container.classList.add('container-heavy');
    }
    body.append(container);

    const menu = document.createElement('div');
    menu.className = 'menu';
    if (w === 15) {
      menu.classList.add('menu-medium');
    }
    if (w === 25) {
      menu.classList.add('menu-heavy');
    }
    container.append(menu);

    const step = document.createElement('div');
    step.className = 'step';
    if (w === 15) {
      step.classList.add('step-medium');
    }
    if (w === 25) {
      step.classList.add('step-heavy');
    }
    step.innerHTML = mine.toString().padStart(3, '0');
    menu.append(step);

    const reset = document.createElement('div');
    reset.className = 'reset';
    if (w === 15) {
      reset.classList.add('reset-medium');
    }
    if (w === 25) {
      reset.classList.add('reset-heavy');
    }
    reset.innerHTML = '000';
    menu.append(reset);

    const time = document.createElement('div');
    time.className = 'time';
    if (w === 15) {
      time.classList.add('time-medium');
    }
    if (w === 25) {
      time.classList.add('time-heavy');
    }
    time.innerHTML = '000';
    menu.append(time);

    const gameField = document.createElement('div');
    gameField.className = 'game-field';
    if (w === 15) {
      gameField.classList.add('game-field-medium');
    }
    if (w === 25) {
      gameField.classList.add('game-field-heavy');
    }
    container.append(gameField);
    gameField.innerHTML = '<button></button>'.repeat(n);
  }

  createHtml(numberOfBtn);

  function writeLastResult() {
    for (let i = 0; i < lastResult.length; i += 1) {
      const result = document.querySelector(`.result-${i + 1}`);
      result.innerHTML = `Р-тат: ${lastResult[i][0]}, Время: ${lastResult[i][1]}сек`;
    }
  }

  writeLastResult();

  const fieldGame = document.querySelector('.game-field');
  const numberOfCells = [...fieldGame.children];

  let mines = [...Array(numberOfBtn).keys()].sort(() => Math.random() - 0.5).slice(0, mine);

  window.addEventListener('load', () => {
    const localNumberOfCells = JSON.parse(localStorage.getItem('numberOfCells'));
    const localArrInnerText = JSON.parse(localStorage.getItem('arrinnerText'));
    const localArrDisabled = JSON.parse(localStorage.getItem('arrDisabled'));
    isOverGame = localStorage.getItem('isOverGame');
    for (let i = 0; i < numberOfCells.length; i += 1) {
      if (localNumberOfCells === null) {
        return;
      }
      fieldGame.children[i].className = `${localNumberOfCells[i]}`;
      fieldGame.children[i].innerText = `${localArrInnerText[i]}`;
      if (localArrDisabled[i] === true) {
        fieldGame.children[i].disabled = true;
      }
    }
    sec = +localStorage.getItem('seconds');
    const time = document.querySelector('.time');
    time.innerHTML = sec.toString().padStart(3, '0');
    counter = +localStorage.getItem('counter');
    const step = document.querySelector('.step');
    step.innerHTML = counter.toString().padStart(3, '0');
    clicks = +localStorage.getItem('click');
    const reset = document.querySelector('.reset');
    reset.innerHTML = clicks.toString().padStart(3, '0');
    mines = JSON.parse(localStorage.getItem('arrMines'));
    const inputMines = document.querySelector('.input-mines');
    inputMines.value = mines.length;
    const themes = localStorage.getItem('changethemes');
    const body = document.querySelector('body');
    const changethemes = document.querySelectorAll('input[type=radio][name="themes"]');
    if (themes === 'dark') {
      body.classList.add('themes-dark');
      changethemes[1].checked = true;
    } else {
      body.classList.remove('themes-dark');
      changethemes[0].checked = true;
    }
    const changeLevel = document.querySelectorAll('input[type=radio][name="level"]');
    const level = localStorage.getItem('changeLevel');
    if (level === 'medium') {
      changeLevel[1].checked = true;
    } else if (level === 'heavy') {
      changeLevel[2].checked = true;
    } else {
      changeLevel[0].checked = true;
    }
    const changeVolume = document.querySelectorAll('input[type=radio][name="volume"]');
    const volume = localStorage.getItem('changeVolume');
    if (volume === 'off') {
      isVolume = false;
      changeVolume[1].checked = true;
    } else {
      isVolume = true;
      changeVolume[0].checked = true;
    }
  });

  function checkForAvailability(r, c) {
    return r >= 0 && r < h && c >= 0 && c < w;
  }

  function isMine(r, c) {
    if (!checkForAvailability(r, c)) {
      return false;
    }
    const index = r * w + c;
    return mines.includes(index);
  }

  function getNumber(r, c) {
    let number = 0;
    for (let x = -1; x <= 1; x += 1) {
      for (let y = -1; y <= 1; y += 1) {
        if (isMine(r + y, c + x)) {
          number += 1;
        }
      }
    }
    return number;
  }

  function closeCells() {
    let sum = 0;
    for (let i = 0; i < numberOfCells.length; i += 1) {
      if (numberOfCells[i].classList.contains('no-active') === false) {
        sum += 1;
      }
    }
    return sum - 1;
  }

  function addAllMines() {
    for (let i = 0; i < mines.length; i += 1) {
      const index = mines[i];
      numberOfCells[index].classList.add('bomb');
    }
  }

  function addAllCellsDisabled() {
    for (let i = 0; i < numberOfCells.length; i += 1) {
      numberOfCells[i].disabled = true;
    }
  }

  function deleteAllFlags() {
    for (let i = 0; i < mines.length; i += 1) {
      const index = mines[i];
      numberOfCells[index].classList.remove('flag');
    }
  }

  function addAllFlags() {
    for (let i = 0; i < mines.length; i += 1) {
      const index = mines[i];
      numberOfCells[index].classList.add('flag');
      const step = document.querySelector('.step');
      step.innerHTML = mine.toString().padStart(3, '0');
    }
  }

  function showMessageWin() {
    const messageWin = document.querySelector('.message-win');
    messageWin.classList.remove('hidden');
    const textWin = document.querySelector('.text-win');
    textWin.innerHTML = `Ура! Вы нашли все мины за ${sec} секунд и ${clicks} ходов!`;
  }

  const messageLose = document.querySelector('.message-lose');

  function openCells(row, column) {
    const indexCell = row * w + column;
    const currentCell = numberOfCells[indexCell];
    const closeCell = closeCells();

    if (!checkForAvailability(row, column)) {
      return;
    }

    if (currentCell.classList.contains('flag') === true) {
      const step = document.querySelector('.step');
      if (isOverGame === true) {
        currentCell.disabled = true;
      } else {
        currentCell.disabled = false;
      }
      counter += 1;
      step.innerHTML = counter.toString().padStart(3, '0');
    }

    if (currentCell.disabled === true) {
      return;
    }

    if (isMine(row, column) === true) {
      playAudioLose(isVolume);
      currentCell.classList.add('bomb');
      deleteAllFlags();
      addAllMines();
      addAllCellsDisabled();
      currentCell.disabled = true;
      lastResult.push(['Проиграш', sec]);
      localStorage.setItem('arrLastResult', JSON.stringify(lastResult));
      localStorage.setItem('seconds', sec);
      clearInterval(timer);
      messageLose.classList.remove('hidden');
    } else {
      currentCell.classList.add('no-active');
      if (getNumber(row, column) === 0) {
        for (let x = -1; x <= 1; x += 1) {
          for (let y = -1; y <= 1; y += 1) {
            currentCell.classList.remove('flag');
            openCells(row + y, column + x);
            currentCell.innerHTML = '';
            currentCell.disabled = true;
          }
        }
      }
      if (getNumber(row, column) === 1) {
        currentCell.classList.remove('flag');
        currentCell.classList.add('one');
        currentCell.innerHTML = `${getNumber(row, column)}`;
        if (closeCell <= mine) {
          isOverGame = true;
          addAllFlags();
          clearInterval(timer);
          playAudioWin(isVolume);
          addAllCellsDisabled();
          lastResult.push(['Выиграш', sec]);
          localStorage.setItem('arrLastResult', JSON.stringify(lastResult));
          showMessageWin();
          localStorage.setItem('seconds', sec);
          counter = mine;
        }
      }
      if (getNumber(row, column) === 2) {
        currentCell.classList.remove('flag');
        currentCell.classList.add('two');
        currentCell.innerHTML = `${getNumber(row, column)}`;
        if (closeCell <= mine) {
          isOverGame = true;
          addAllFlags();
          clearInterval(timer);
          playAudioWin(isVolume);
          addAllCellsDisabled();
          lastResult.push(['Выиграш', sec]);
          localStorage.setItem('arrLastResult', JSON.stringify(lastResult));
          showMessageWin();
          localStorage.setItem('seconds', sec);
          counter = mine;
        }
      }
      if (getNumber(row, column) === 3) {
        currentCell.classList.remove('flag');
        currentCell.classList.add('three');
        currentCell.innerHTML = `${getNumber(row, column)}`;
        if (closeCell <= mine) {
          isOverGame = true;
          addAllFlags();
          clearInterval(timer);
          playAudioWin(isVolume);
          addAllCellsDisabled();
          lastResult.push(['Выиграш', sec]);
          localStorage.setItem('arrLastResult', JSON.stringify(lastResult));
          showMessageWin();
          localStorage.setItem('seconds', sec);
          counter = mine;
        }
      }
      if (getNumber(row, column) === 4) {
        currentCell.classList.remove('flag');
        currentCell.classList.add('four');
        currentCell.innerHTML = `${getNumber(row, column)}`;
        if (closeCell <= mine) {
          isOverGame = true;
          addAllFlags();
          clearInterval(timer);
          playAudioWin(isVolume);
          addAllCellsDisabled();
          lastResult.push(['Выиграш', sec]);
          localStorage.setItem('arrLastResult', JSON.stringify(lastResult));
          showMessageWin();
          localStorage.setItem('seconds', sec);
          counter = mine;
        }
      }
      if (getNumber(row, column) === 5) {
        currentCell.classList.remove('flag');
        currentCell.classList.add('five');
        currentCell.innerHTML = `${getNumber(row, column)}`;
        if (closeCell <= mine) {
          isOverGame = true;
          addAllFlags();
          clearInterval(timer);
          playAudioWin(isVolume);
          addAllCellsDisabled();
          lastResult.push(['Выиграш', sec]);
          localStorage.setItem('arrLastResult', JSON.stringify(lastResult));
          showMessageWin();
          localStorage.setItem('seconds', sec);
          counter = mine;
        }
      }
      if (getNumber(row, column) === 6) {
        currentCell.classList.remove('flag');
        currentCell.classList.add('six');
        currentCell.innerHTML = `${getNumber(row, column)}`;
        if (closeCell <= mine) {
          isOverGame = true;
          addAllFlags();
          clearInterval(timer);
          playAudioWin(isVolume);
          addAllCellsDisabled();
          lastResult.push(['Выиграш', sec]);
          localStorage.setItem('arrLastResult', JSON.stringify(lastResult));
          showMessageWin();
          localStorage.setItem('seconds', sec);
          counter = mine;
        }
      }
      if (getNumber(row, column) === 7) {
        currentCell.classList.remove('flag');
        currentCell.classList.add('seven');
        currentCell.innerHTML = `${getNumber(row, column)}`;
        if (closeCell <= mine) {
          isOverGame = true;
          addAllFlags();
          clearInterval(timer);
          playAudioWin(isVolume);
          addAllCellsDisabled();
          lastResult.push(['Выиграш', sec]);
          localStorage.setItem('arrLastResult', JSON.stringify(lastResult));
          showMessageWin();
          localStorage.setItem('seconds', sec);
          counter = mine;
        }
      }
      if (getNumber(row, column) === 8) {
        currentCell.classList.remove('flag');
        currentCell.classList.add('eight');
        currentCell.innerHTML = `${getNumber(row, column)}`;
        if (closeCell <= mine) {
          isOverGame = true;
          addAllFlags();
          clearInterval(timer);
          playAudioWin(isVolume);
          addAllCellsDisabled();
          lastResult.push(['Выиграш', sec]);
          localStorage.setItem('arrLastResult', JSON.stringify(lastResult));
          showMessageWin();
          localStorage.setItem('seconds', sec);
          counter = mine;
        }
      }
      currentCell.disabled = true;
    }
  }

  function firstClick(n) {
    if (JSON.parse(localStorage.getItem('arrMines')) !== null) {
      for (let i = 0; i < mines.length; i += 1) {
        if (n === mines[i]) {
          mines = [...Array(numberOfBtn).keys()].sort(() => Math.random() - 0.5).slice(0, mine);
          firstClick(n);
        }
      }
    }
  }

  fieldGame.addEventListener('click', (event) => {
    if (event.target.tagName === 'BUTTON') {
      playAudioClick(isVolume);
      onTimer += 1;
      clicks += 1;
      const displayClick = document.querySelector('.reset');
      displayClick.innerHTML = clicks.toString().padStart(3, '0');
      const indexCell = numberOfCells.indexOf(event.target);
      const column = indexCell % w;
      const row = Math.floor(indexCell / w);
      if (onTimer <= 1) {
        if (clicks <= 1) {
          firstClick(indexCell);
        }
        timer = setInterval(() => {
          sec += 1;
          document.querySelector('.time').innerText = sec.toString().padStart(3, '0');
        }, 1000);
      }
      openCells(row, column);
    } else {
      return;
    }
  });

  fieldGame.addEventListener('contextmenu', (event) => {
    const indexCell = numberOfCells.indexOf(event.target);
    const currentCell = numberOfCells[indexCell];
    if (currentCell.classList.contains('no-active') === true) {
      return;
    }
    playAudioFlag(isVolume);
    const step = document.querySelector('.step');
    step.innerHTML = counter.toString().padStart(3, '0');
    currentCell.classList.toggle('flag');
    if (currentCell.classList.contains('flag') === true) {
      currentCell.disabled = true;
      counter -= 1;
      step.innerHTML = counter.toString().padStart(3, '0');
    } else {
      currentCell.disabled = false;
      counter += 1;
      step.innerHTML = counter.toString().padStart(3, '0');
    }
  });

  const newGame = document.querySelector('.new-game');
  newGame.addEventListener('click', () => {
    localStorage.removeItem('numberOfCells');
    localStorage.removeItem('arrinnerText');
    localStorage.removeItem('arrDisabled');
    clearInterval(timer);
    sec = 0;
    localStorage.setItem('seconds', sec);
    isOverGame = false;
    localStorage.setItem('isOverGame', isOverGame);
    deleteHtml();
    start(w, h, mine);
  });

  const btnReset = document.querySelector('.btn-reset');
  btnReset.addEventListener('click', () => {
    localStorage.removeItem('numberOfCells');
    localStorage.removeItem('arrinnerText');
    localStorage.removeItem('arrDisabled');
    clearInterval(timer);
    sec = 0;
    localStorage.setItem('seconds', sec);
    isOverGame = false;
    localStorage.setItem('isOverGame', isOverGame);
    deleteHtml();
    start(w, h, mine);
  });

  const changethemes = document.querySelectorAll('input[type=radio][name="themes"]');
  changethemes.forEach((changethemes) => changethemes.addEventListener('change', () => {
    const body = document.querySelector('body');
    if (changethemes.value === 'light') {
      body.classList.remove('themes-dark');
      localStorage.setItem('changethemes', changethemes.value);
    } else if (changethemes.value === 'dark') {
      body.classList.add('themes-dark');
      localStorage.setItem('changethemes', changethemes.value);
    }
  }));

  const changeLevel = document.querySelectorAll('input[type=radio][name="level"]');
  changeLevel.forEach((changeLevel) => changeLevel.addEventListener('change', () => {
    if (changeLevel.value === 'easy') {
      clearInterval(timer);
      sec = 0;
      localStorage.setItem('seconds', sec);
      isOverGame = false;
      localStorage.setItem('isOverGame', isOverGame);
      deleteHtml();
      start(10, 10, 10);
      localStorage.setItem('changeLevel', changeLevel.value);
    } else if (changeLevel.value === 'medium') {
      clearInterval(timer);
      sec = 0;
      localStorage.setItem('seconds', sec);
      isOverGame = false;
      localStorage.setItem('isOverGame', isOverGame);
      deleteHtml();
      start(15, 15, 10);
      localStorage.setItem('changeLevel', changeLevel.value);
    } else if (changeLevel.value === 'heavy') {
      clearInterval(timer);
      sec = 0;
      localStorage.setItem('seconds', sec);
      isOverGame = false;
      localStorage.setItem('isOverGame', isOverGame);
      deleteHtml();
      start(25, 25, 10);
      localStorage.setItem('changeLevel', changeLevel.value);
    }
  }));

  const inputMines = document.querySelector('.input-mines');
  inputMines.addEventListener('change', () => {
    clearInterval(timer);
    sec = 0;
    localStorage.setItem('seconds', sec);
    isOverGame = false;
    localStorage.setItem('isOverGame', isOverGame);
    deleteHtml();
    if (inputMines.value > 99) {
      inputMines.value = 99;
    }
    if (inputMines.value < 10) {
      inputMines.value = 10;
    }
    start(w, h, inputMines.value);
  });

  const btnWin = document.querySelector('.btn-win');
  btnWin.addEventListener('click', () => {
    const messageWin = document.querySelector('.message-win');
    messageWin.classList.add('hidden');
  });

  const btnLoseOk = document.querySelector('.message-lose-ok');
  btnLoseOk.addEventListener('click', () => {
    messageLose.classList.add('hidden');
    clearInterval(timer);
    sec = 0;
    localStorage.setItem('seconds', sec);
    isOverGame = false;
    localStorage.setItem('isOverGame', isOverGame);
    deleteHtml();
    start(w, h, mine);
  });

  const btnLoseCancel = document.querySelector('.message-lose-cancel');
  btnLoseCancel.addEventListener('click', () => {
    messageLose.classList.add('hidden');
    clearInterval(timer);
  });

  const changeVolume = document.querySelectorAll('input[type=radio][name="volume"]');
  changeVolume.forEach((changeVolume) => changeVolume.addEventListener('change', () => {
    if (changeVolume.value === 'off') {
      isVolume = false;
      localStorage.setItem('changeVolume', changeVolume.value);
    } else {
      isVolume = true;
      localStorage.setItem('changeVolume', changeVolume.value);
    }
  }));

  const iconSettings = document.querySelector('.icon-settings');
  const settingsContainer = document.querySelector('.settingsContainer');
  iconSettings.addEventListener('click', () => {
    settingsContainer.classList.add('settingsContainer-active');
  });

  const closeSettings = document.querySelector('.close-settings');
  closeSettings.addEventListener('click', () => {
    settingsContainer.classList.remove('settingsContainer-active');
  });

  const lastResultBlock = document.querySelector('.last-result');
  lastResultBlock.addEventListener('click', () => {
    const listContainer = document.querySelector('.list-container');
    listContainer.classList.remove('hidden');
    settingsContainer.classList.remove('settingsContainer-active');
  });

  const btnCloseLastResults = document.querySelector('.close-last-results');
  btnCloseLastResults.addEventListener('click', () => {
    const listContainer = document.querySelector('.list-container');
    listContainer.classList.add('hidden');
  });

  window.addEventListener('unload', () => {
    clearInterval(timer);
    localStorage.removeItem('numberOfCells');
    localStorage.removeItem('arrinnerText');
    localStorage.removeItem('arrDisabled');
    localStorage.removeItem('click');
    const numberOfCells = [...fieldGame.children];
    const arrStyle = [];
    const arrinnerText = [];
    const arrDisabled = [];
    for (let i = 0; i < numberOfCells.length; i += 1) {
      arrStyle.push(numberOfCells[i].className);
      arrinnerText.push(numberOfCells[i].innerText);
      arrDisabled.push(numberOfCells[i].hasAttribute('disabled'));
    }
    localStorage.setItem('arrLastResult', JSON.stringify(lastResult));
    localStorage.setItem('isOverGame', isOverGame);
    localStorage.setItem('numberOfCells', JSON.stringify(arrStyle));
    localStorage.setItem('arrinnerText', JSON.stringify(arrinnerText));
    localStorage.setItem('arrDisabled', JSON.stringify(arrDisabled));
    localStorage.setItem('seconds', sec);
    localStorage.setItem('click', clicks);
    localStorage.setItem('counter', counter);
    localStorage.setItem('arrMines', JSON.stringify(mines));
  });
}
