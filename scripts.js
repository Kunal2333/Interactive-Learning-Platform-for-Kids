// Utility Module
const Utils = {
  /**
   * Get a random element from an array
   * @param {Array} array - The array to pick from
   * @returns {*} Random element from the array
   */
  getRandomElement(array) {
      return array[Math.floor(Math.random() * array.length)];
  },

  /**
   * Set text content for an element
   * @param {string} selector - CSS selector for the element
   * @param {string} text - The text to set
   */
  setText(selector, text) {
      const element = document.querySelector(selector);
      if (element) element.textContent = text;
  },

  /**
   * Add event listener to multiple elements
   * @param {string} selector - CSS selector for the elements
   * @param {string} event - Event type
   * @param {Function} callback - Callback function
   */
  addEventToMultiple(selector, event, callback) {
      const elements = document.querySelectorAll(selector);
      elements.forEach((el) => el.addEventListener(event, callback));
  },

  /**
   * Toggle visibility of an element
   * @param {string} selector - CSS selector for the element
   */
  toggleVisibility(selector) {
      const element = document.querySelector(selector);
      if (element) {
          const isVisible = getComputedStyle(element).display !== 'none';
          element.style.display = isVisible ? 'none' : 'block';
      }
  }
};
// End of Utility Module



// Main Code
document.addEventListener('DOMContentLoaded', () => {

// Puzzle Logic
const puzzles = [
    { question: 'What is 10 + 5?', answer: 15 },
    { question: 'What is 12 x 2?', answer: 24 },
    { question: 'What is 20 - 7?', answer: 13 },
    { question: 'What is 30 / 10?', answer: 3 },
    { question: 'What is 22 x 2?', answer: 44 },
    { question: 'What is 15 / 3?', answer: 5 },
    { question: 'What is 5 x 6?', answer: 30 },
    { question: 'What is 12 - 7?', answer: 5 }
];
let currentPuzzle = 0;

const puzzleQuestion = document.getElementById('math-question');
const puzzleAnswer = document.getElementById('puzzle-answer');
const checkAnswer = document.getElementById('check-answer');
const puzzleResult = document.getElementById('puzzle-result');

const loadPuzzle = () => {
    puzzleQuestion.textContent = puzzles[currentPuzzle].question;
    puzzleAnswer.value = '';
    puzzleResult.textContent = '';
};

checkAnswer.addEventListener('click', () => {
    const answer = parseInt(puzzleAnswer.value);
    if (answer === puzzles[currentPuzzle].answer) {
        currentPuzzle = (currentPuzzle + 1) % puzzles.length;
        puzzleResult.textContent = 'Correct!';
        puzzleResult.style.color = 'green';
        setTimeout(loadPuzzle, 1000);
    } else {
        puzzleResult.textContent = 'Try Again!';
        puzzleResult.style.color = 'red';
    }
});

loadPuzzle();

// Memory Game
const memoryGame = document.getElementById("memory-game");
const emojis = ["🐶", "🐱", "🦊", "🐵", "🐼", "🦁", "🐶", "🐱", "🦊", "🐵", "🐼", "🦁","❤️","😎","❤️","😎","🤡","🤡"];
let selectedCards = [];
let matchedPairs = 0;

function createMemoryCards() {
    memoryGame.innerHTML = "";
    const shuffledEmojis = emojis.sort(() => Math.random() - 0.5);
    shuffledEmojis.forEach((emoji) => {
        const card = document.createElement("div");
        card.className = "card";
        card.textContent = "?";
        card.dataset.emoji = emoji;
        card.addEventListener("click", handleCardClick);
        memoryGame.appendChild(card);
    });
}

function handleCardClick() {
    if (selectedCards.length < 2 && !this.classList.contains("flipped")) {
        this.classList.add("flipped");
        this.textContent = this.dataset.emoji;
        selectedCards.push(this);
        if (selectedCards.length === 2) checkMatch();
    }
}

function checkMatch() {
    const [first, second] = selectedCards;
    if (first.dataset.emoji === second.dataset.emoji) {
        matchedPairs++;
        selectedCards = [];
        if (matchedPairs === emojis.length / 2) showModal("You matched all pairs! 🎉");
    } else {
        setTimeout(() => {
            first.textContent = "?";
            second.textContent = "?";
            first.classList.remove("flipped");
            second.classList.remove("flipped");
            selectedCards = [];
        }, 1000);
    }
}

createMemoryCards();


// Drawing Logic
const canvas = document.getElementById('art-canvas');
const ctx = canvas.getContext('2d');
const colorPicker = document.getElementById('color-picker');
const penThickness = document.getElementById('pen-thickness');
const eraserTool = document.getElementById('eraser-tool');
let drawing = false;
let isEraser = false;

const startDrawing = (e) => {
    drawing = true;
    ctx.beginPath();
    ctx.moveTo(e.offsetX, e.offsetY);
};

const draw = (e) => {
    if (!drawing) return;
    ctx.strokeStyle = isEraser ? '#fff' : colorPicker.value;
    ctx.lineWidth = penThickness.value;
    ctx.lineCap = 'round';
    ctx.lineTo(e.offsetX, e.offsetY);
    ctx.stroke();
};

const stopDrawing = () => {
    drawing = false;
    ctx.closePath();
};

canvas.addEventListener('mousedown', startDrawing);
canvas.addEventListener('mousemove', draw);
canvas.addEventListener('mouseup', stopDrawing);
canvas.addEventListener('mouseout', stopDrawing);

eraserTool.addEventListener('click', () => {
    isEraser = !isEraser;
    eraserTool.textContent = isEraser ? 'Pen' : 'Eraser';
});

  // Fun Facts
  const funFactButton = document.getElementById('reveal-fact');
  const funFactDisplay = document.getElementById('fun-fact');
  const facts = [
      "Did you know? Honey never spoils! Even ancient honey is still edible!",
      "A giraffe's neck is too short to reach the ground to drink water.",
      "Octopuses have three hearts!",
      "Flamingos can sleep on one leg!",
      "Bananas are berries, but strawberries are not!",
      "Butterflies taste with their feet!",
      "The Earth is about 93 million miles away from the Sun.",
      "A kangaroo can't walk backward.",
      "A jellyfish is 95% water!",
      "Giraffes have blue tongues to protect them from the sun.",
      "A cloud can weigh more than a million pounds.",
      "Elephants are the only animals that can't jump.",
    "A panda's diet is 99% bamboo, but they belong to the order Carnivora (meat-eating animals).",
    "Sharks have been around longer than trees – they’ve existed for over 400 million years!",
    "A hummingbird's heart beats up to 1,200 times per minute.",
    "The Eiffel Tower can grow by about 6 inches in the summer due to the heat expanding the metal.",
    "Cows have best friends and can become stressed when they’re separated.",
    "Sloths can hold their breath for up to 40 minutes underwater.",
    "Koalas sleep up to 22 hours a day!",
    "Bananas are berries, but strawberries are not!",
    "A crocodile can't stick its tongue out."
  ];

  funFactButton.addEventListener('click', () => {
      const randomFact = Utils.getRandomElement(facts);
      Utils.setText('#fun-fact', randomFact);
  });

  // Quiz Game
  const quizResult = document.getElementById('quiz-result');
  Utils.addEventToMultiple('.quiz-option', 'click', (e) => {
      const selectedAnswer = e.target.textContent;
      const resultText = selectedAnswer === 'Paris' ? 'Correct! 🎉' : 'Wrong Answer! 🙁';
      const resultColor = selectedAnswer === 'Paris' ? 'green' : 'red';
      Utils.setText('#quiz-result', resultText);
      quizResult.style.color = resultColor;
  });



//   // **Quiz Game**
//   const quizQuestions = [
//     { question: 'What is the capital of France?', options: ['Paris', 'London', 'Berlin', 'Madrid'], answer: 'Paris' },
//     { question: 'What is 2 + 2?', options: ['3', '4', '5', '6'], answer: '4' },
//     { question: 'What color is the sky?', options: ['Green', 'Blue', 'Red', 'Yellow'], answer: 'Blue' },
//   ];
//   let currentQuizIndex = 0;

//   const updateQuiz = () => {
//     const quiz = quizQuestions[currentQuizIndex];
//     setText('#quiz-question', quiz.question);
//     document.querySelectorAll('.quiz-option').forEach((button, index) => {
//       button.textContent = quiz.options[index];
//     });
//   };

//   document.querySelectorAll('.quiz-option').forEach((button) => {
//     button.addEventListener('click', (e) => {
//       if (e.target.textContent === quizQuestions[currentQuizIndex].answer) {
//         setText('#quiz-result', 'Correct! 🎉', 'green');
//         currentQuizIndex = (currentQuizIndex + 1) % quizQuestions.length;
//         setTimeout(updateQuiz, 1000);
//       } else {
//         setText('#quiz-result', 'Incorrect! 🙁', 'red');
//       }
//     });
//   });
//   updateQuiz();



//   // Music Maker
//   const notes = { C: 'C4', D: 'D4', E: 'E4', F: 'F4', G: 'G4' };
//   Utils.addEventToMultiple('.music-key', 'click', (e) => {
//       const note = e.target.dataset.note;
//       const audio = new Audio(`https://pianosounds.s3.amazonaws.com/${notes[note]}.mp3`);
//       audio.play();
//   });



  // Music Maker Logic
  const notes = {
    C: 'C_major_chord_piano.wav',
    D: 'sounds/D.mp3',
    E: 'sounds/E.mp3',
    F: 'sounds/F.mp3',
    G: 'sounds/G.mp3',
};
const musicKeys = document.querySelectorAll('.music-key');

musicKeys.forEach((key) => {
    key.addEventListener('click', () => {
        const note = key.dataset.note;
        if (notes[note]) {
            const audio = new Audio(notes[note]);
            audio.play();
        }
    });
});





    // **Typing Section**
    const typingSection = document.createElement('div');
    // typingSection.innerHTML = `
    //   <textarea id="typing-area" rows="5" cols="30" placeholder="Type something..."></textarea>
    //   <button id="clear-screen">Clear</button>
    // `;
    document.body.appendChild(typingSection);
  
    document.getElementById('clear-screen').addEventListener('click', () => {
      document.getElementById('typing-area').value = '';
    });
});

