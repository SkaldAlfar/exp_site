const puzzleId = 2;
const API_URL = `https://siteyiqu5i.execute-api.us-east-2.amazonaws.com/default/puzzle_db_access?puzzle_id=${puzzleId}`;

let correctAnswer = "";
let correctAnsText = "";
let closeAnswers = {};

function showGifDialog(gifUrl) {
  // Create overlay
  const overlay = document.createElement('div');
  overlay.style.position = 'fixed';
  overlay.style.top = 0;
  overlay.style.left = 0;
  overlay.style.width = '100vw';
  overlay.style.height = '100vh';
  overlay.style.backgroundColor = 'rgba(0, 0, 0, 0.6)';
  overlay.style.display = 'flex';
  overlay.style.alignItems = 'center';
  overlay.style.justifyContent = 'center';
  overlay.style.zIndex = 1000;

  // Create dialog box
  const dialog = document.createElement('div');
  dialog.style.backgroundColor = '#fff';
  dialog.style.padding = '20px';
  dialog.style.borderRadius = '10px';
  dialog.style.boxShadow = '0 0 10px rgba(0,0,0,0.5)';
  dialog.style.textAlign = 'center';
  dialog.style.maxWidth = '90%';
  dialog.style.maxHeight = '90%';

  // Add Text
  const text = document.createElement('h1');
  text.style.color = "white"
  text.style.padding = '20px';
  text.style.textAlign = 'center';

  // Add GIF image
  const gif = document.createElement('img');
  gif.src = gifUrl;
  gif.alt = 'GIF';
  gif.style.maxWidth = '100%';
  gif.style.maxHeight = '70vh';
  gif.style.borderRadius = '8px';

  // Close button
  const closeButton = document.createElement('button');
  closeButton.textContent = 'Close';
  closeButton.style.marginTop = '15px';
  closeButton.style.padding = '10px 20px';
  closeButton.style.border = 'none';
  closeButton.style.borderRadius = '5px';
  closeButton.style.backgroundColor = '#333';
  closeButton.style.color = '#fff';
  closeButton.style.cursor = 'pointer';

  closeButton.onclick = () => document.body.removeChild(overlay);

  // Assemble
  dialog.appendChild(gif);
  dialog.appendChild(closeButton);
  overlay.appendChild(dialog);
  document.body.appendChild(overlay);
}

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
    showGifDialog("https://media1.tenor.com/m/daYO8cpSlIgAAAAd/critical-role-crit-role.gif");
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

// Submit button styling
document.getElementById('submitBtn').style.background = 'black';
document.getElementById('submitBtn').style.color = 'white';
document.getElementById('submitBtn').style.borderColor = '#9E8FBC';
document.getElementById('submitBtn').style.borderRadius = '6px';
document.getElementById('submitBtn').style.padding = '0.5em 1.5em';
document.getElementById('submitBtn').style.cursor = 'pointer';
document.getElementById('submitBtn').style.boxShadow = '0px 0px 6px rgba(239, 239, 239, 0.67)';
document.getElementById('submitBtn').addEventListener('mouseover', function() {
  this.style.background = '#9E8FBC';
  this.style.color = 'black';
});
document.getElementById('submitBtn').addEventListener('mouseout', function() {
  this.style.background = 'black';
  this.style.color = 'white';
});