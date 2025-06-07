'use strict';

const Game = require('../modules/Game.class');
const game = new Game([
  [0, 0, 0, 0],
  [0, 0, 0, 0],
  [0, 0, 0, 0],
  [0, 0, 0, 0],
]);

const startButton = document.querySelector('.start');
const startGame = document.querySelector('.message-start');

startButton.addEventListener('click', () => {
  game.restart();

  startGame.classList.add('hidden');
  startButton.className = 'button restart';
  startButton.textContent = 'Restart';
});

document.addEventListener('keydown', (e) => {
  const score = document.querySelector('.game-score');

  if (game.getStatus() !== 'playing') {
    return;
  }

  if (e.key === 'ArrowUp') {
    game.moveUp();
  }

  if (e.key === 'ArrowDown') {
    game.moveDown();
  }

  if (e.key === 'ArrowLeft') {
    game.moveLeft();
  }

  if (e.key === 'ArrowRight') {
    game.moveRight();
  }

  if (game.getStatus() === 'win') {
    const winMess = document.querySelector('.message-win');

    winMess.classList.remove('hidden');

    const startMess = document.querySelector('.message-start');

    startMess.classList.add('hidden');
  }

  if (game.getStatus() === 'lose') {
    const loseMess = document.querySelector('.message-lose');
    const startMess = document.querySelector('.message-start');

    loseMess.classList.remove('hidden');
    startMess.classList.add('hidden');
  }

  score.textContent = game.score;
});
