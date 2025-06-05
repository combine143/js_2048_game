'use strict';

// Uncomment the next lines to use your game instance in the browser
// const Game = require('../modules/Game.class');
// const game = new Game();

const startButton = document.querySelector('.start');

function restart() {
  const cells = document.querySelectorAll('.field-cell');

  cells.forEach((cell) => {
    cell.className = 'field-cell';
    cell.textContent = '';
  });

  startButton.className = 'button restart';
  startButton.textContent = 'Restart';
}

function start() {
  startButton.addEventListener('click', () => {
    restart();

    const cells = document.querySelectorAll('.field-cell');

    const first = Math.floor(Math.random() * cells.length);
    let second;

    do {
      second = Math.floor(Math.random() * cells.length);
    } while (second === first);

    [first, second].forEach((index) => {
      const value = Math.random() < 0.9 ? 2 : 4;

      if (value === 2) {
        cells[index].classList.add(`field-cell--${value}`);
        cells[index].textContent = 2;
      } else {
        cells[index].classList.add(`field-cell--${value}`);
        cells[index].textContent = 4;
      }
    });
  });
}

start();

function makeRandom() {
  const cells = document.querySelectorAll('.field-cell');

  const emptyCells = [];

  cells.forEach((cell, index) => {
    if (cell.textContent === '') {
      emptyCells.push(index);
    }
  });

  const randomIndex = emptyCells[Math.floor(Math.random() * emptyCells.length)];

  const value = Math.random() < 0.9 ? 2 : 4;

  cells[randomIndex].className = 'field-cell';
  cells[randomIndex].classList.add(`field-cell--${value}`);
  cells[randomIndex].textContent = value;
}

function getScore(value) {
  const score = document.querySelector('.game-score');
  const current = parseInt(score.textContent);

  score.textContent = current + value;
}

function moveUp() {
  const size = 4;
  const cells = document.querySelectorAll('.field-cell');
  let sumScore = 0;
  let moved = false;

  for (let col = 0; col < size; col++) {
    let values = [];

    for (let row = 0; row < size; row++) {
      const index = row * size + col;
      const val = parseInt(cells[index].textContent);

      if (!isNaN(val)) {
        values.push(val);
      }
    }

    for (let i = 0; i < values.length - 1; i++) {
      if (values[i] === values[i + 1]) {
        values[i] = values[i] * 2;
        sumScore += values[i];
        values[i + 1] = '';
        i++;
      }
    }

    values = values.filter((val) => val !== '');

    while (values.length < size) {
      values.push('');
    }

    for (let row = 0; row < size; row++) {
      const index = row * size + col;
      const val = values[row];

      if (cells[index].textContent !== String(val)) {
        moved = true;
      }

      cells[index].textContent = val;
      cells[index].className = 'field-cell';

      if (val) {
        cells[index].classList.add(`field-cell--${val}`);
      }
    }
  }

  getScore(sumScore);

  if (moved) {
    makeRandom();

    const emptyCells = Array.from(cells).filter(
      (cell) => cell.textContent === '',
    );

    if (emptyCells.length === 0) {
      loseGame();
    }
  }
}

document.addEventListener('keydown', (e) => {
  if (e.key === 'ArrowUp') {
    moveUp();
  }

  if (e.key === 'ArrowDown') {
    moveDown();
  }

  if (e.key === 'ArrowLeft') {
    moveLeft();
  }

  if (e.key === 'ArrowRight') {
    moveRight();
  }
});

function loseGame() {
  const loseMess = document.querySelector('.message-lose');
  const startMess = document.querySelector('.message-start');

  loseMess.classList = 'message message-lose';
  startMess.classList.add('hidden');
}

function moveDown() {
  const size = 4;
  const cells = document.querySelectorAll('.field-cell');
  let sumScore = 0;
  let moved = false;

  for (let col = 0; col < size; col++) {
    let values = [];

    for (let row = size - 1; row >= 0; row--) {
      const index = row * size + col;
      const val = parseInt(cells[index].textContent);

      if (!isNaN(val)) {
        values.push(val);
      }
    }

    for (let i = 0; i < values.length - 1; i++) {
      if (values[i] === values[i + 1]) {
        values[i] = values[i] * 2;
        sumScore += values[i];
        values[i + 1] = '';
        i++;
      }
    }

    values = values.filter((val) => val !== '');

    while (values.length < size) {
      values.push('');
    }

    for (let row = size - 1, i = 0; row >= 0; row--, i++) {
      const index = row * size + col;
      const val = values[i];

      if (cells[index].textContent !== String(val)) {
        moved = true;
      }

      cells[index].textContent = val;
      cells[index].className = 'field-cell';

      if (val) {
        cells[index].classList.add(`field-cell--${val}`);
      }
    }
  }

  getScore(sumScore);

  if (moved) {
    makeRandom();

    const emptyCells = Array.from(cells).filter(
      (cell) => cell.textContent === '',
    );

    if (emptyCells.length === 0) {
      loseGame();
    }
  }
}

function moveLeft() {
  const size = 4;
  const cells = document.querySelectorAll('.field-cell');
  let sumScore = 0;
  let moved = false;

  for (let row = 0; row < size; row++) {
    let values = [];

    for (let col = 0; col < size; col++) {
      const index = row * size + col;
      const val = parseInt(cells[index].textContent);

      if (!isNaN(val)) {
        values.push(val);
      }
    }

    for (let i = 0; i < values.length - 1; i++) {
      if (values[i] === values[i + 1]) {
        values[i] = values[i] * 2;
        sumScore += values[i];
        values.splice(i + 1, 1);
        values[i + 1] = '';
        i++;
      }
    }

    values = values.filter((val) => val !== '');

    while (values.length < size) {
      values.push('');
    }

    for (let col = 0; col < size; col++) {
      const index = row * size + col;
      const val = values[col];

      if (cells[index].textContent !== String(val)) {
        moved = true;
      }

      cells[index].textContent = val;
      cells[index].className = 'field-cell';

      if (val) {
        cells[index].classList.add(`field-cell--${val}`);
      }
    }
  }

  getScore(sumScore);

  if (moved) {
    makeRandom();

    const emptyCells = Array.from(cells).filter(
      (cell) => cell.textContent === '',
    );

    if (emptyCells.length === 0) {
      loseGame();
    }
  }
}

function moveRight() {
  const size = 4;
  const cells = document.querySelectorAll('.field-cell');
  let sumScore = 0;
  let moved = false;

  for (let row = 0; row < size; row++) {
    let values = [];

    for (let col = size - 1; col >= 0; col--) {
      const index = row * size + col;
      const val = parseInt(cells[index].textContent);

      if (!isNaN(val)) {
        values.push(val);
      }
    }

    for (let i = 0; i < values.length - 1; i++) {
      if (values[i] === values[i + 1]) {
        values[i] = values[i] * 2;
        sumScore += values[i];
        values.splice(i + 1, 1);
        i++;
      }
    }

    values = values.filter((val) => val !== '');

    while (values.length < size) {
      values.push('');
    }

    for (let col = size - 1, i = 0; col >= 0; col--, i++) {
      const index = row * size + col;
      const val = values[i];

      if (cells[index].textContent !== String(val)) {
        moved = true;
      }

      cells[index].textContent = val;
      cells[index].className = 'field-cell';

      if (val) {
        cells[index].classList.add(`field-cell--${val}`);
      }
    }
  }

  getScore(sumScore);

  if (moved) {
    makeRandom();

    const emptyCells = Array.from(cells).filter(
      (cell) => cell.textContent === '',
    );

    if (emptyCells.length === 0) {
      loseGame();
    }
  }
}
