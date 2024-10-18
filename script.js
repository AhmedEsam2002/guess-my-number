'use strict';
// Constants
const NO_NUMBER_MESSAGE = 'No Number!🚫';
const NUMBER_RANGE_MESSAGE = 'Number must be between 1 and 20!🚫';
const CORRECT_NUMBER_MESSAGE = 'Correct Number!❤️ ';
const TOO_HIGH_MESSAGE = 'Too High!📈';
const TOO_LOW_MESSAGE = 'Too Low!📉';
const LOST_GAME_MESSAGE = 'You lost the game!😢';
const INITIAL_SCORE = 20;
//selecting elements
const messageElement = document.querySelector('.message');
const numberElement = document.querySelector('.number');
const scoreElement = document.querySelector('.score');
const guessElement = document.querySelector('.guess');
const bodyElement = document.querySelector('body');
const highScoreElement = document.querySelector('.highscore');
const checkButton = document.querySelector('.check');
const againButton = document.querySelector('.again');
const h1Element = document.querySelector('h1');
const winSound = document.querySelector('.win-sound');
const loseSound = document.querySelector('.lose-sound');
const clickSound = document.querySelector('.click-sound');
const video = document.getElementById('horrorVideo');
//variables
let guessedNumber = Math.floor(Math.random() * 20) + 1;
let highScore = 0;
let score = INITIAL_SCORE;
//Functions
function updateMessageAndScore(message) {
  messageElement.textContent = message;
  if (score >= 1) {
    score -= 1;
    scoreElement.textContent = score;
  }
}
function disableInput() {
  checkButton.disabled = true;
  guessElement.disabled = true;
}
function enableInput() {
  checkButton.disabled = false;
  guessElement.disabled = false;
}
function enableAnimation() {
  againButton.style.animation = 'rotate-scale 2s ease-in-out infinite';
}
function disableAnimation() {
  againButton.style.animation = '';
}
function CorrectGuess() {
  winSound.play();
  enableAnimation();
  disableInput();
  console.log('Correct Number');
  messageElement.textContent = CORRECT_NUMBER_MESSAGE;
  numberElement.textContent = guessedNumber;
  bodyElement.style.backgroundColor = '#60b347';
  if (score > highScore) {
    highScore = score;
    highScoreElement.textContent = highScore;
    //Can't change guess after winning and can/t check again
  }
}
function Reset() {
  disableAnimation(); // Disable the animation
  guessElement.focus();
  enableInput();
  score = INITIAL_SCORE; // Reset the score
  guessedNumber = Math.floor(Math.random() * 20) + 1; // Reset the guessed number
  guessElement.value = ''; // Reset the input field
  messageElement.textContent = 'Start guessing...'; // Reset the message
  numberElement.textContent = '?'; // Reset the number
  bodyElement.style.backgroundColor = '#222'; // Reset the background color
  scoreElement.textContent = score; // Reset the score
}
// Check button event listener
checkButton.addEventListener('click', () => {
  clickSound.play();
  const guess = Number(guessElement.value); // Getting the value of the input field
  if (!guess) messageElement.textContent = NO_NUMBER_MESSAGE;
  else if (guess > 20 || guess < 1)
    messageElement.textContent = NUMBER_RANGE_MESSAGE;
  else if (guess === guessedNumber) {
    CorrectGuess();
  } else if (guess !== guessedNumber) {
    if (score > 1)
      updateMessageAndScore(
        guess > guessedNumber ? TOO_HIGH_MESSAGE : TOO_LOW_MESSAGE
      );
    else {
      updateMessageAndScore(LOST_GAME_MESSAGE);
      loseSound.play();
      bodyElement.style.backgroundColor = 'red'; // Change the background color to red
      againButton.style.animation = 'rotate-scale 2s ease-in-out infinite'; // Shake the "Again" button

      disableInput(); // Disable the input field and the "Check" button
    }
  }
});

// Reset button event listener
againButton.addEventListener('click', Reset);

// Copy event listener
const contentElement = h1Element.textContent;
h1Element.addEventListener('copy', () => {
  // Change the text to 'Help Me Please!' and show it for 3 seconds
  h1Element.textContent = 'Help Me Please!🆘';

  // Restore the original text after 3 seconds
  setTimeout(() => {
    h1Element.textContent = contentElement; // Restore original text
  }, 3000); // Show for 3000 milliseconds (3 seconds)

  // Show video after the message is displayed

  // Play the video after a 3-second delay
  setTimeout(() => {
    video.style.display = 'block'; // Show video
    video.play();
  }, 3000); // Start playing after 3 seconds

  // Hide the video when it ends
  video.addEventListener('ended', () => {
    video.pause();
    video.style.display = 'none'; // Hide video again
  });
});
// Add event listener for the "Enter" key press on the guess input
document.addEventListener('keydown', event => {
  if (event.key === 'Enter') {
    checkButton.click();
  }
});
// Focus on the input field when the page loads
guessElement.focus();
