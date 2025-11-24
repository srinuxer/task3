const quizData = [
  {
    question: "Which HTML tag is used to include JavaScript code?",
    options: ["<js>", "<script>", "<javascript>", "<code>"],
    correct: 1
  },
  {
    question: "Which CSS feature enables responsive design?",
    options: ["Flexbox", "Media Queries", "Grid", "Bootstrap"],
    correct: 1
  },
  {
    question: "Which function fetches data from an API?",
    options: ["getData()", "fetch()", "callAPI()", "request()"],
    correct: 1
  },
  {
    question: "Which method adds an element to the DOM?",
    options: ["appendChild()", "createElement()", "push()", "addElement()"],
    correct: 0
  }
];

let current = 0;
let score = 0;

const questionEl = document.getElementById("question");
const optionsEl = document.getElementById("options");
const nextBtn = document.getElementById("next-btn");
const restartBtn = document.getElementById("restart-btn");
const resultEl = document.getElementById("result");
const progressEl = document.getElementById("progress");

function loadQuestion() {
  const q = quizData[current];
  questionEl.textContent = q.question;
  optionsEl.innerHTML = "";
  progressEl.textContent = `Question ${current + 1} of ${quizData.length}`;
  q.options.forEach((opt, i) => {
    const btn = document.createElement("button");
    btn.textContent = opt;
    btn.onclick = () => checkAnswer(i, btn);
    optionsEl.appendChild(btn);
  });
}

function checkAnswer(selected, button) {
  const correctAnswer = quizData[current].correct;
  const allButtons = document.querySelectorAll("#options button");
  allButtons.forEach(btn => btn.disabled = true);

  if (selected === correctAnswer) {
    score++;
    button.style.background = "#28a745";
  } else {
    button.style.background = "#dc3545";
    allButtons[correctAnswer].style.background = "#28a745";
  }

  nextBtn.style.display = "inline-block";
}

function nextQuestion() {
  current++;
  nextBtn.style.display = "none";
  if (current < quizData.length) {
    loadQuestion();
  } else {
    showResult();
  }
}

function showResult() {
  questionEl.textContent = "";
  optionsEl.innerHTML = "";
  progressEl.textContent = "";
  nextBtn.style.display = "none";
  restartBtn.style.display = "inline-block";
  resultEl.textContent = `🎉 You scored ${score} out of ${quizData.length}!`;
}

function restartQuiz() {
  current = 0;
  score = 0;
  resultEl.textContent = "";
  restartBtn.style.display = "none";
  loadQuestion();
}

nextBtn.addEventListener("click", nextQuestion);
restartBtn.addEventListener("click", restartQuiz);
loadQuestion();

const apiBtn = document.getElementById("load-joke");
const apiData = document.getElementById("api-data");

async function fetchJoke() {
  apiData.textContent = "Loading...";
  try {
    const response = await fetch("https://official-joke-api.appspot.com/random_joke");
    const data = await response.json();
    apiData.innerHTML = `<strong>${data.setup}</strong><br>${data.punchline}`;
  } catch (error) {
    apiData.textContent = "Error loading joke. Try again.";
  }
}

apiBtn.addEventListener("click", fetchJoke);
