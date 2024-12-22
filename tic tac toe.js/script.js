let turn = "X";
const boxes = document.querySelectorAll(".box");
const status = document.querySelector(".status");
const playAgain = document.getElementById("play-again");

// Win conditions
const winConditions = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
  [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
  [0, 4, 8], [2, 4, 6]             // Diagonals
];

// Change turn indicator
function changeTurn() {
  turn = turn === "X" ? "O" : "X";
  document.querySelector(".bg").style.left = turn === "X" ? "0" : "85px";
}

// Check for a win
function checkWin() {
  for (let condition of winConditions) {
    const [a, b, c] = condition;
    if (
      boxes[a].innerHTML === turn &&
      boxes[a].innerHTML === boxes[b].innerHTML &&
      boxes[a].innerHTML === boxes[c].innerHTML
    ) {
      status.innerHTML = `${turn} Wins!`;
      boxes.forEach(box => box.style.pointerEvents = "none"); // Disable clicks
      return true;
    }
  }
  return false;
}

// Check for a draw
function checkDraw() {
  return [...boxes].every(box => box.innerHTML !== "");
}

// Handle box clicks
boxes.forEach(box => {
  box.addEventListener("click", () => {
    if (box.innerHTML === "") {
      box.innerHTML = turn;

      if (checkWin()) return;

      if (checkDraw()) {
        status.innerHTML = "It's a Draw!";
        return;
      }

      changeTurn();
    }
  });
});

// Reset game
playAgain.addEventListener("click", () => {
  boxes.forEach(box => (box.innerHTML = ""));
  status.innerHTML = "";
  turn = "X";
  document.querySelector(".bg").style.left = "0";
  boxes.forEach(box => (box.style.pointerEvents = "auto")); // Enable clicks
});
