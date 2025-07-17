const puzzleId = 1;
const API_URL = `https://siteyiqu5i.execute-api.us-east-2.amazonaws.com/default/puzzle_db_access?puzzle_id=${puzzleId}`;

let correctAnswer = "";
let correctAnsText = "";
let closeAnswers = {};

async function loadPuzzle() {
  try {
    const response = await fetch(API_URL);
    const result = await response.json();

    let items = result.body ? JSON.parse(result.body) : result;

    const item = items[0];
    if (!item) throw new Error("No puzzle found");

    const prompt = item.prompt.S;
    correctAnswer = item.answer.S.toLowerCase();
    correctAnsText = item.correct_ans_text.S;

    closeAnswers = {};
    for (const [key, val] of Object.entries(item.close_answers.M)) {
      closeAnswers[key.toLowerCase()] = val.S;
    }

    document.getElementById("prompt").textContent = prompt;
  } catch (err) {
    console.error("Error loading puzzle:", err);
    document.getElementById("prompt").textContent = "Failed to load puzzle.";
  }
}

function handleSubmission(event) {
  event.preventDefault(); // Prevent form submission from reloading the page

  const userInput = document.getElementById("answerInput").value.trim().toLowerCase();

  if (userInput === "") {
    alert("Please enter an answer.");
    return;
  }

  if (userInput in closeAnswers) {
    alert(closeAnswers[userInput]);
  } else if (userInput === correctAnswer) {
    alert(correctAnsText);
  } else {
    alert("INCORRECT");
  }
}

document.addEventListener("DOMContentLoaded", () => {
  loadPuzzle();

  // Handle Enter key (form submission)
  document.getElementById("answerForm").addEventListener("submit", handleSubmission);

  // Handle button click
  document.getElementById("submitBtn").addEventListener("click", handleSubmission);
});
