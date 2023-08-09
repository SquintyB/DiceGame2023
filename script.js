'use strict';

// Selecting elements
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const score0El = document.querySelector('#score--0');
const score1El = document.getElementById('score--1');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');
const diceEl = document.querySelector('.dice');
const newBtn = document.querySelector('.btn--new');
const rollDiceBtn = document.querySelector('.btn--roll');
const holdDiceBtn = document.querySelector('.btn--hold');

// starting conditions
score0El.textContent = 0;
score1El.textContent = 0;
diceEl.classList.add('hidden');

let scores = [0, 0];
let currentScore = 0;
let activePlayer = 0;
let playing = true;

const switchPlayer = function () {
  currentScore = 0;
  document.getElementById(`current--${activePlayer}`).textContent =
    currentScore;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};

// Dice Roll
rollDiceBtn.addEventListener('click', () => {
  if (playing) {
    // Generate random dice roll
    const roll = Math.floor(Math.random() * 6 + 1);
    // display dice
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${roll}.png`;
    // Check for one

    if (roll !== 1) {
      // add roll to current score
      currentScore += roll;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      // switch to next player
      switchPlayer();
    }
  }
});

// Hold the current score
holdDiceBtn.addEventListener('click', () => {
  if (playing) {
    // Add current score
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];
    // check if score is 100
    if (scores[activePlayer] >= 100) {
      playing = false;
      diceEl.classList.add('hidden');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('active--player');
    } else {
      switchPlayer();
    }
  }
});

// Reset the game

newBtn.addEventListener('click', () => {
  activePlayer = 0;
  playing = true;
  scores = [0, 0];
  document.getElementById('score--0').textContent = 0;
  document.getElementById('score--1').textContent = 0;
  document.getElementById('current--0').textContent = 0;
  document.getElementById('current--1').textContent = 0;
  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');
  player1El.classList.add('active--player');
  player1El.classList.add('active--player');
  currentScore = 0;
});
