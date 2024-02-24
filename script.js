'use strict';

//Players name label elements
const player0LabelEl = document.getElementById('name--0');
const player1LabelEl = document.getElementById('name--1');

// Players total score elements
const score0El = document.getElementById('score--0');
const score1El = document.getElementById('score--1');

// Players current score elements
const currentScore0El = document.getElementById('current--0');
const currentScore1El = document.getElementById('current--1');

// Players section board element
const player0SectionEl = document.querySelector('.player--0');
const player1SectionEl = document.querySelector('.player--1');

// Dice element
const diceEl = document.querySelector('.dice');

// Roll dice button element
const rollDiceBtnEl = document.querySelector('.btn--roll');

// Hold button element
const holdBtnEl = document.querySelector('.btn--hold');

// New game button element
const newGameBtnEl = document.querySelector('.btn--new');

// Players turns
let player0Turn = true;
let player1Turn = false;

// Players scores
let firstPlayerCurrentScore = 0;
let secondPlayerCurrentScore = 0;
let firstPlayerTotalScore = 0;
let secondPlayerTotalScore = 0;

// Game finished
let gameFinished = false;

// New game reload function
const NewGame = () => {
  score0El.textContent = 0;
  score1El.textContent = 0;
  currentScore0El.textContent = 0;
  currentScore1El.textContent = 0;
  diceEl.classList.add('hidden');
  player0Turn = true;
  player1Turn = false;
  gameFinished = false;
  player0SectionEl.classList.remove('player--winner');
  player1SectionEl.classList.remove('player--winner');
};

// Rundom number generator function. This function generates a rundon number from 1 to {num}
const GenerateRundomNum = num => {
  return Math.trunc(Math.random() * num) + 1;
};

const ChangePlayersTurn = () => {
  player0Turn = !player0Turn;
  player1Turn = !player1Turn;
  if (player0SectionEl.classList.contains('player--active')) {
    player0SectionEl.classList.remove('player--active');
    player1SectionEl.classList.add('player--active');
  } else {
    player0SectionEl.classList.add('player--active');
    player1SectionEl.classList.remove('player--active');
  }
};

const CheckGameState = () => {
  if (firstPlayerTotalScore >= 100 || secondPlayerTotalScore >= 100) {
    gameFinished = true;
  }
};

const AnnounceWinner = () => {
  if (firstPlayerTotalScore >= 100) {
    player0SectionEl.classList.add('player--winner');
  } else if (secondPlayerTotalScore >= 100) {
    player1SectionEl.classList.add('player--winner');
  }
  diceEl.classList.add('hidden');
};

// Initializing the game
NewGame();

// Functioning new game button
newGameBtnEl.addEventListener('click', () => {
  NewGame();
});

// Roll a dice
rollDiceBtnEl.addEventListener('click', () => {
  if (!gameFinished) {
    const diceRollNumber = GenerateRundomNum(6);
    if (player0Turn) {
      if (diceRollNumber > 1) {
        firstPlayerCurrentScore += diceRollNumber;
      } else {
        firstPlayerCurrentScore = 0;
        ChangePlayersTurn();
      }
      currentScore0El.textContent = firstPlayerCurrentScore;
    } else {
      if (diceRollNumber > 1) {
        secondPlayerCurrentScore += diceRollNumber;
      } else {
        secondPlayerCurrentScore = 0;
        ChangePlayersTurn();
      }
      currentScore1El.textContent = secondPlayerCurrentScore;
    }
    diceEl.src = `dice-${diceRollNumber}.png`;
    diceEl.classList.remove('hidden');
  }
});

holdBtnEl.addEventListener('click', () => {
  if (!gameFinished) {
    if (player0Turn) {
      firstPlayerTotalScore += firstPlayerCurrentScore;
      score0El.textContent = firstPlayerTotalScore;
      firstPlayerCurrentScore = 0;
      currentScore0El.textContent = firstPlayerCurrentScore;
    } else {
      secondPlayerTotalScore += secondPlayerCurrentScore;
      score1El.textContent = secondPlayerTotalScore;
      secondPlayerCurrentScore = 0;
      currentScore1El.textContent = secondPlayerCurrentScore;
    }
    CheckGameState();
    if (!gameFinished) {
      ChangePlayersTurn();
    } else {
      AnnounceWinner();
    }
  }
});
