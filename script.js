const colorBox = document.querySelector('[data-testid="colorBox"]');
const colorOptions = document.querySelectorAll('[data-testid="colorOption"]');
const gameStatus = document.querySelector('[data-testid="gameStatus"]');
const scoreValue = document.getElementById('scoreValue');
const newGameButton = document.querySelector('[data-testid="newGameButton"]');
const colorOptionsContainer = document.querySelector('[data-testid="colorOptions"]');
const body = document.querySelector('body');

let score = 0;
let highScore = 0;
let targetColor;
let correctButtonIndex;

// Get the modal
const modal = document.getElementById("wrongModal");

// Get the <span> element that closes the modal
const span = document.getElementsByClassName("close")[0];

function getRandomHexColor() {
    const hex = Math.floor(Math.random() * 0xFFFFFF).toString(16).padStart(6, '0');
    return '#' + hex;
}

function setColors() {
    const hexColor = getRandomHexColor();
    colorBox.style.backgroundColor = hexColor;
    targetColor = window.getComputedStyle(colorBox).backgroundColor;

    if (correctButtonIndex !== undefined && colorOptions[correctButtonIndex]) {
        colorOptions[correctButtonIndex].classList.remove('correct');
    }

    colorOptions.forEach(button => {
        button.style.backgroundColor = getRandomHexColor();
        button.removeEventListener('click', checkGuess);
        button.addEventListener('click', checkGuess);
    });

    correctButtonIndex = Math.floor(Math.random() * colorOptions.length);
    colorOptions[correctButtonIndex].style.backgroundColor = targetColor;
}

function checkGuess(event) {
    const guessedColor = event.target.style.backgroundColor;

    if (guessedColor === targetColor) {
        gameStatus.textContent = "Correct Answer!";
        score++;
        scoreValue.textContent = score;
        event.target.classList.add('correct');
        body.classList.remove('incorrect');
        setTimeout(() => {
            resetGame();
        }, 1000);

        if (score > highScore) {
            highScore = score;
            document.querySelector('.highscore').textContent = highScore;
        }
    } else {
        modal.style.display = "block";
        modalOverlay.style.display = "block";
        body.classList.add('modal-open');
        gameStatus.textContent = "Wrong Answer!";
        scoreValue.textContent = 0;
        body.classList.add('incorrect');
        colorOptionsContainer.classList.add('fade-out');

        colorOptions.forEach(button => {
            button.removeEventListener('click', checkGuess);
        });

        setTimeout(() => {
            resetGame();
        }, 3000);
    }
}

function closeModal() {
    modal.style.display = "none";
    modalOverlay.style.display = "none";
    body.classList.remove('modal-open');
    body.classList.remove('incorrect');
    resetGame();
  }
  // When the user clicks on <span> (x), close the modal
  span.onclick = function() {
    closeModal()
  }

  // When the user clicks anywhere outside of the modal, close it
  window.onclick = function(event) {
    if (event.target == modal) {
      closeModal();
    }
  }

function resetGame() {
    colorOptionsContainer.classList.remove('fade-out');
    body.classList.remove('incorrect');
    gameStatus.textContent = "";
    setColors();
}

newGameButton.addEventListener('click', () => {
    score = 0;
    scoreValue.textContent = score;
    resetGame();
});

setColors();