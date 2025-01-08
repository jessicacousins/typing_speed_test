const keyboardLayout = "ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890".split("");

const phrases = [
  "Hello World",
  "Practice makes perfect",
  "Speed is key",
  "JavaScript is fun",
  "Keep coding",
  "Aliens are real",
];

const startButton = document.getElementById("start-btn");
const phraseDisplay = document.getElementById("phrase");
const countdownDisplay = document.getElementById("countdown");
const userInputField = document.getElementById("user-input");
const resultDisplay = document.getElementById("result");
const keyboardContainer = document.getElementById("keyboard-container");

keyboardLayout.forEach((key) => {
  const keyElement = document.createElement("div");
  keyElement.classList.add("key");
  keyElement.innerText = key;
  keyElement.setAttribute("data-key", key.toUpperCase());
  keyboardContainer.appendChild(keyElement);
});

let countdown;
let currentPhrase = "";
let timeLeft = 10;

function highlightKey(event) {
  const keyPressed = event.key.toUpperCase();
  const keyElement = document.querySelector(`.key[data-key="${keyPressed}"]`);
  if (keyElement) {
    keyElement.classList.add("active");
    setTimeout(() => keyElement.classList.remove("active"), 200);
  }
}

function startTest() {
  userInputField.value = "";
  userInputField.disabled = false;
  userInputField.focus();
  resultDisplay.innerText = "";
  timeLeft = 10;
  currentPhrase = phrases[Math.floor(Math.random() * phrases.length)];
  phraseDisplay.innerText = currentPhrase;

  startButton.disabled = true;
  startButton.innerText = "Test in Progress...";

  countdownDisplay.innerText = `Time Left: ${timeLeft} seconds`;
  countdown = setInterval(() => {
    timeLeft -= 1;
    countdownDisplay.innerText = `Time Left: ${timeLeft} seconds`;
    if (timeLeft <= 0) {
      endTest();
    }
  }, 1000);
}

function endTest() {
  clearInterval(countdown);
  userInputField.disabled = true;
  startButton.disabled = false;
  startButton.innerText = "Start Test";

  const userText = userInputField.value.trim();
  if (userText === currentPhrase) {
    resultDisplay.innerText = "Success! You typed the phrase correctly!";
  } else {
    resultDisplay.innerText = `Oops! The correct phrase was: "${currentPhrase}". Try again!`;
  }
}

startButton.addEventListener("click", startTest);
document.addEventListener("keydown", highlightKey);
