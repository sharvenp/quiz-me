import "./style.css";
import quizzesData from "../data/quizzes.json";

const state = {
  quizzes: [],
  activeQuiz: null,
  deck: [],
  cardIndex: 0,
  answered: false,
};

const quizList = document.querySelector("#quiz-list");
const intro = document.querySelector(".intro");
const picker = document.querySelector("#quiz-picker");
const studyPanel = document.querySelector("#study-panel");
const questionHeading = document.querySelector("#question-heading");
const choices = document.querySelector("#choices");
const feedback = document.querySelector("#feedback");
const feedbackTitle = document.querySelector("#feedback-title");
const feedbackCopy = document.querySelector("#feedback-copy");
const feedbackIcon = document.querySelector("#feedback-icon");
const nextButton = document.querySelector("#next-button");
const backButton = document.querySelector("#back-button");
const quizLabel = document.querySelector("#quiz-label");
const progressLabel = document.querySelector("#progress-label");
const progressBar = document.querySelector("#progress-bar");
const errorMessage = document.querySelector("#error-message");

function shuffle(items) {
  const shuffled = [...items];
  for (let index = shuffled.length - 1; index > 0; index -= 1) {
    const randomIndex = Math.floor(Math.random() * (index + 1));
    [shuffled[index], shuffled[randomIndex]] = [
      shuffled[randomIndex],
      shuffled[index],
    ];
  }
  return shuffled;
}

function createQuizCard(quiz, quizKey) {
  const card = document.createElement("button");
  card.className = "quiz-card";
  card.type = "button";
  card.innerHTML = `<span class="quiz-number">${quizKey}</span><span class="quiz-card-content"><strong>${quiz.title}</strong><small>${quiz.description}</small></span><span class="arrow" aria-hidden="true">↗</span>`;
  card.addEventListener("click", () => startQuiz(quizKey));
  return card;
}

function renderQuizList() {
  quizList.replaceChildren();
  for (const [quizKey, quiz] of Object.entries(state.quizzes)) {
    quizList.append(createQuizCard(quiz, quizKey));
  }
}

function startQuiz(quizKey) {
  state.activeQuiz = state.quizzes[quizKey];
  state.deck = shuffle(Object.entries(state.activeQuiz.questions));
  state.cardIndex = 0;
  intro.hidden = true;
  picker.hidden = true;
  studyPanel.hidden = false;
  renderQuestion();
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function renderQuestion() {
  const [questionId, question] = state.deck[state.cardIndex];
  const cardNumber = state.cardIndex + 1;
  state.answered = false;
  quizLabel.textContent = `${state.activeQuiz.title} / ${questionId}`;
  questionHeading.textContent = question.question;
  progressLabel.textContent = `CARD ${String(cardNumber).padStart(2, "0")} / ${String(state.deck.length).padStart(2, "0")}`;
  progressBar.style.width = `${(cardNumber / state.deck.length) * 100}%`;
  feedback.hidden = true;
  choices.replaceChildren();
  choices.setAttribute("aria-label", `Answer choices for card ${cardNumber}`);

  for (const [index, choice] of shuffle(question.choices).entries()) {
    const choiceButton = document.createElement("button");
    choiceButton.className = "choice-button";
    choiceButton.type = "button";
    choiceButton.dataset.answer = choice;
    choiceButton.innerHTML = `<span class="choice-key" aria-hidden="true">${String.fromCharCode(65 + index)}</span><span>${choice}</span>`;
    choiceButton.addEventListener("click", () => checkAnswer(choice, question));
    choices.append(choiceButton);
  }
  questionHeading.focus({ preventScroll: true });
}

function checkAnswer(selectedAnswer, question) {
  if (state.answered) return;
  state.answered = true;
  const isCorrect = selectedAnswer === question.answer;
  document.querySelectorAll(".choice-button").forEach((button) => {
    button.disabled = true;
    if (button.dataset.answer === question.answer)
      button.classList.add("is-correct");
    if (button.dataset.answer === selectedAnswer && !isCorrect)
      button.classList.add("is-wrong");
  });
  feedback.classList.toggle("is-correct", isCorrect);
  feedback.classList.toggle("is-wrong", !isCorrect);
  feedbackIcon.textContent = isCorrect ? "✓" : "!";
  feedbackTitle.textContent = isCorrect ? "Correct." : "Not quite.";
  feedbackCopy.textContent = isCorrect
    ? `You picked “${selectedAnswer}”. Nice recall.`
    : `The correct answer is “${question.answer}”. Use it as your anchor for the next pass.`;
  feedback.hidden = false;
  nextButton.focus();
}

function nextQuestion() {
  state.cardIndex += 1;
  if (state.cardIndex >= state.deck.length)
    state.deck = shuffle(Object.entries(state.activeQuiz.questions));
  state.cardIndex %= state.deck.length;
  renderQuestion();
}

function returnToPicker() {
  studyPanel.hidden = true;
  intro.hidden = false;
  picker.hidden = false;
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function loadQuizzes() {
  try {
    state.quizzes = quizzesData;
    renderQuizList();
  } catch (error) {
    errorMessage.textContent = error.message;
    errorMessage.hidden = false;
  }
}

nextButton.addEventListener("click", nextQuestion);
backButton.addEventListener("click", returnToPicker);
loadQuizzes();
