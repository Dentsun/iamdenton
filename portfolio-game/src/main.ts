import "./style.css";
import Phaser from "phaser";
import { gameConfig } from "./config/gameConfig";

// Get DOM elements
const landingPage = document.getElementById("landing-page") as HTMLElement;
const gameContainer = document.getElementById("game-container") as HTMLElement;
const startButton = document.getElementById(
  "start-adventure"
) as HTMLButtonElement;
const typedText = document.getElementById("typed-text") as HTMLElement;
const matrixCanvas = document.getElementById("matrix-bg") as HTMLCanvasElement;

let game: Phaser.Game | null = null;

// Matrix rain effect
function initMatrixRain() {
  const ctx = matrixCanvas.getContext("2d")!;
  matrixCanvas.width = window.innerWidth;
  matrixCanvas.height = window.innerHeight;

  const fontSize = 16;
  const columns = Math.floor(matrixCanvas.width / fontSize);
  const drops: number[] = [];

  // Initialize drops
  for (let i = 0; i < columns; i++) {
    drops[i] = Math.random() * -100;
  }

  const matrixChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*()";

  function draw() {
    // Fade effect
    ctx.fillStyle = "rgba(21, 21, 21, 0.05)";
    ctx.fillRect(0, 0, matrixCanvas.width, matrixCanvas.height);

    ctx.fillStyle = "#0e510eff";
    ctx.font = `${fontSize}px Courier New`;

    for (let i = 0; i < drops.length; i++) {
      const text = matrixChars[Math.floor(Math.random() * matrixChars.length)];
      const x = i * fontSize;
      const y = drops[i] * fontSize;

      ctx.fillText(text, x, y);

      // Reset drop to top randomly
      if (y > matrixCanvas.height && Math.random() > 0.975) {
        drops[i] = 0;
      }

      drops[i]++;
    }
  }

  setInterval(draw, 50);
}

// Typing animation
const phrases = [
  "Denton",
  "a software engineer",
  "a nerd",
  "always open to chat",
  "burning tokens",
  "brewing coffee",
  "food motivated",
  "probably playing golf",
  "reducing my screen time",
  "glad you're here",
];

let currentPhraseIndex = 0;
let currentText = "";
let isDeleting = false;
let charIndex = 0;

function typeEffect() {
  const currentPhrase = phrases[currentPhraseIndex];

  if (isDeleting) {
    // Delete character
    currentText = currentPhrase.substring(0, charIndex - 1);
    charIndex--;
  } else {
    // Add character
    currentText = currentPhrase.substring(0, charIndex + 1);
    charIndex++;
  }

  typedText.textContent = currentText;

  let typeSpeed = isDeleting ? 50 : 100;

  if (!isDeleting && charIndex === currentPhrase.length) {
    // Pause at end of phrase
    typeSpeed = 2000;
    isDeleting = true;
  } else if (isDeleting && charIndex === 0) {
    // Move to next phrase
    isDeleting = false;
    currentPhraseIndex = (currentPhraseIndex + 1) % phrases.length;
    typeSpeed = 500;
  }

  setTimeout(typeEffect, typeSpeed);
}

// Handle "Start Adventure" button click
startButton.addEventListener("click", () => {
  // Hide landing page
  landingPage.style.display = "none";

  // Show game container
  gameContainer.style.display = "block";

  // Hide matrix background
  matrixCanvas.style.display = "none";

  // Initialize Phaser game
  if (!game) {
    game = new Phaser.Game(gameConfig);
  }
});

// Handle window resize for matrix effect
window.addEventListener("resize", () => {
  matrixCanvas.width = window.innerWidth;
  matrixCanvas.height = window.innerHeight;
});

// Initialize effects
initMatrixRain();
typeEffect();
