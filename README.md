

# Guess My Number Game



## Live Demo

You can play the game [here](https://ahmedesam2002.github.io/guess-my-number/).

## Table of Contents

- [Description](#description)
- [Features](#features)
- [How to Play](#how-to-play)
- [JavaScript Code Explanation](#javascript-code-explanation)
  - [Constants](#constants)
  - [Selecting DOM Elements](#selecting-dom-elements)
  - [Variables](#variables)
  - [Functions](#functions)
  - [Event Listeners](#event-listeners)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [How to Contribute](#how-to-contribute)
- [License](#license)

## Description

**Guess My Number** is an interactive web-based game where players attempt to guess a randomly generated number between 1 and 20. The game provides feedback on each guess and keeps track of the player's score and high score, making it a fun and engaging challenge.

## Features

- User-friendly interface with clear instructions.
- Random number generation for each game session.
- Input validation for guesses (ensuring a number between 1 and 20).
- Feedback on guesses (too high, too low, correct).
- Score tracking and high score display.
- Reset functionality to start a new game.
- Fun animations and sound effects to enhance the experience.

## How to Play

1. **Start the Game**: The game generates a random number between 1 and 20.
2. **Make a Guess**: Enter your guess in the input field and click the "Check!" button or press the "Enter" key.
3. **Receive Feedback**:
   - **Correct Guess**: If you guess the correct number, you will see a success message, the correct number will be displayed, and your high score will be updated if applicable.
   - **Incorrect Guess**: If your guess is incorrect, you will lose one point, and the game will inform you whether to guess higher or lower.
4. **Game Over**: If your score reaches 0, you lose the game, and you can click the "Play Again" button to restart.
5. **Enjoy the Game**: Keep guessing to beat your high score!

## JavaScript Code Explanation

### Constants

These constants store the messages displayed to the user at different stages of the game.

```javascript
const NO_NUMBER_MESSAGE = 'No Number!🚫';
const NUMBER_RANGE_MESSAGE = 'Number must be between 1 and 20!🚫';
const CORRECT_NUMBER_MESSAGE = 'Correct Number!❤️';
const TOO_HIGH_MESSAGE = 'Too High!📈';
const TOO_LOW_MESSAGE = 'Too Low!📉';
const LOST_GAME_MESSAGE = 'You lost the game!😢';
const INITIAL_SCORE = 20; // The initial score for the player
```

### Selecting DOM Elements

This section selects the elements from the HTML document that will be manipulated in the game, such as messages, scores, and buttons.

```javascript
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
```

### Variables

These variables keep track of the game's state, including the guessed number, the player's current score, and the high score.

```javascript
let guessedNumber = Math.floor(Math.random() * 20) + 1; // Generate a random number between 1 and 20
let highScore = 0; // High score starts at 0
let score = INITIAL_SCORE; // Player's current score
```

### Functions

1. **updateMessageAndScore(message)**: Updates the message displayed to the user and decreases the player's score by 1 if it's greater than or equal to 1.

   ```javascript
   function updateMessageAndScore(message) {
       messageElement.textContent = message; // Update the displayed message
       if (score >= 1) {
           score -= 1; // Decrease score by 1
           scoreElement.textContent = score; // Update displayed score
       }
   }
   ```

2. **disableInput()**: Disables the input fields and buttons when the game is over or the user wins.

   ```javascript
   function disableInput() {
       checkButton.disabled = true; // Disable the check button
       guessElement.disabled = true; // Disable the input field
   }
   ```

3. **enableInput()**: Enables the input fields and buttons when the game is in progress.

   ```javascript
   function enableInput() {
       checkButton.disabled = false; // Enable the check button
       guessElement.disabled = false; // Enable the input field
   }
   ```

4. **enableAnimation()**: Starts the rotation and scaling animation on the "Play Again" button when the player wins.

   ```javascript
   function enableAnimation() {
       againButton.style.animation = 'rotate-scale 2s ease-in-out infinite'; // Apply animation
   }
   ```

5. **disableAnimation()**: Stops the animation on the "Play Again" button.

   ```javascript
   function disableAnimation() {
       againButton.style.animation = ''; // Remove the animation
   }
   ```

6. **CorrectGuess()**: Executes the logic when the user guesses the correct number. It plays the win sound, enables the animation, displays the correct number, and updates the background color.

   ```javascript
   function CorrectGuess() {
       winSound.play(); // Play win sound
       enableAnimation(); // Start animation
       disableInput(); // Disable inputs upon winning
       console.log('Correct Number'); // Log correct guess
       messageElement.textContent = CORRECT_NUMBER_MESSAGE; // Update message
       numberElement.textContent = guessedNumber; // Display the correct number
       bodyElement.style.backgroundColor = '#60b347'; // Change background color
       if (score > highScore) {
           highScore = score; // Update high score
           highScoreElement.textContent = highScore; // Display new high score
       }
   }
   ```

7. **Reset()**: Resets the game state to its initial values, allowing the user to play again.

   ```javascript
   function Reset() {
       disableAnimation(); // Disable the animation
       guessElement.focus(); // Focus on the guess input
       enableInput(); // Enable inputs for a new game
       score = INITIAL_SCORE; // Reset score
       guessedNumber = Math.floor(Math.random() * 20) + 1; // Generate new random number
       guessElement.value = ''; // Clear input field
       messageElement.textContent = 'Start guessing...'; // Reset message
       numberElement.textContent = '?'; // Reset displayed number
       bodyElement.style.backgroundColor = '#222'; // Reset background color
       scoreElement.textContent = score; // Reset displayed score
   }
   ```

### Event Listeners

1. **Check Button Event Listener**: This listens for clicks on the "Check!" button, validates the user's guess, and provides feedback.

   ```javascript
   checkButton.addEventListener('click', () => {
       clickSound.play(); // Play click sound
       const guess = Number(guessElement.value); // Get user's guess
       if (!guess) {
           messageElement.textContent = NO_NUMBER_MESSAGE; // Handle no input
       } else if (guess > 20 || guess < 1) {
           messageElement.textContent = NUMBER_RANGE_MESSAGE; // Handle out-of-range guesses
       } else if (guess === guessedNumber) {
           CorrectGuess(); // Call function if the guess is correct
       } else {
           if (score > 1) {
               // Provide feedback on incorrect guesses
               updateMessageAndScore(
                   guess > guessedNumber ? TOO_HIGH_MESSAGE : TOO_LOW_MESSAGE
               );
           } else {
               updateMessageAndScore(LOST_GAME_MESSAGE); // Show lost message
               loseSound.play(); // Play lose sound
               bodyElement.style.backgroundColor = 'red'; // Change background color to red
               againButton.style.animation = 'rotate-scale 2s ease-in-out infinite'; // Start shaking animation on "Again" button
               disableInput(); // Disable inputs
           }
       }
   });
   ```

2. **Reset Button Event Listener**: This listens for clicks on the "Play Again" button to reset the game.

   ```javascript
   againButton.addEventListener('click', Reset);
   ```

3. **Copy Event Listener**: This changes the header text when copied and resets it after 1 second.

   ```javascript
   const contentElement = h1Element.textContent; // Store original header text
   h1Element.addEventListener('copy', () => {
       h1Element.textContent = 'You copied Me 😂'; // Change header text
       setTimeout(() => {
           h1Element.textContent = contentElement; // Reset text after 1 second
       }, 1000);
   });
   ```

4

. **Enter Key Event Listener**: This allows the user to submit their guess by pressing the "Enter" key.

   ```javascript
   document.addEventListener('keydown', event => {
       if (event.key === 'Enter') {
           checkButton.click(); // Trigger check button click
       }
   });
   ```

5. **Focus on Input on Load**: The input field is focused when the page loads.

   ```javascript
   guessElement.focus(); // Focus on guess input
   ```

## Technologies Used

- HTML
- CSS
- JavaScript

## Installation

To run this project locally, follow these steps:

1. Clone this repository.
2. Open the `index.html` file in your web browser.

## How to Contribute

If you want to contribute to this project, feel free to fork the repository and submit a pull request. For any questions, please reach out.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

Feel free to customize the README as necessary, especially the image link and live demo link. This should provide clear instructions and explanations for anyone who wants to understand or contribute to your project!
