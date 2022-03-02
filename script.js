const rows = 6;
let word = "house";
const columns = word.length;
const board = document.getElementById("board");
for (let i = 0; i < rows; i++) {
  for (let j = 0; j < columns; j++) {
    document
      .querySelector("#board")
      .style.setProperty(
        "grid-template-columns",
        `repeat(${word.length}, 1fr)`
      );

    let tile = document.createElement("span");
    tile.setAttribute("id", i.toString() + "-" + j.toString());
    tile.classList.add("tile");
    board.appendChild(tile);
  }
}

let col = 0;
let row = 0;
let gameOver = false;
let currentTile;

document.addEventListener("keyup", (e) => {
  console.log(row, col);
  if (gameOver) return;
  if (e.code === "Backspace") {
    if (col > 0 && col <= columns && row <= 5) {
      currentTile = document.getElementById(
        row.toString() + "-" + (col - 1).toString()
      );
      if (currentTile.innerText != "") {
        currentTile.innerText = "";
        col--;
      }
      return;
    }
  }
  if (col == columns && e.key == "Enter") {
    check(row);
    col = 0;
    row++;
    return;
  }
  if (e.key >= "a" && e.key <= "z") {
    if (col >= 0 && col < columns && row <= 5) {
      currentTile = document.getElementById(
        row.toString() + "-" + col.toString()
      );
      if (currentTile.innerText === "")
        currentTile.innerText = e.key.toUpperCase();

      col++;
    }
  }
});

const check = (row) => {
  let correct = 0;
  for (let col = 0; col < columns; col++) {
    currentTile = document.getElementById(
      row.toString() + "-" + col.toString()
    );
    if (currentTile.innerText.toLowerCase() == word[col]) {
      correct++;
      currentTile.classList.add("inPlace");
    } else if (word.includes(currentTile.innerText.toLowerCase())) {
      currentTile.classList.add("present");
    } else currentTile.classList.add("wrong");
  }
  if (correct == word.length) {
    gameOver = true;
    dgameOver("win");
  } else if (row == 5) {
    dgameOver("lose");
  }
};
const sleep = async (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const dgameOver = async (condition) => {
  document.getElementById("answer").innerText = word;
};
