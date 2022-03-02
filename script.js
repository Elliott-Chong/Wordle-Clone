const board = document.getElementById("board");
for (let i = 0; i < 6; i++) {
  for (let j = 0; j < 5; j++) {
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
let word = "spain";

document.addEventListener("keyup", (e) => {
  console.log(row, col);
  if (gameOver) return;
  if (e.code === "Backspace") {
    if (col > 0 && col <= 5 && row <= 5) {
      currentTile = document.getElementById(
        row.toString() + "-" + (col - 1).toString()
      );
      console.log(currentTile.innerText);
      if (currentTile.innerText != "") {
        currentTile.innerText = "";
        col--;
      }
      return;
    }
  }
  if (col == 5 && e.key == "Enter") {
    check(row);
    col = 0;
    row++;
    return;
  }
  if (e.key >= "a" && e.key <= "z") {
    if (col >= 0 && col < 5 && row <= 5) {
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
  for (let col = 0; col < 5; col++) {
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
  if (correct == 5) {
    gameOver = true;
    dgameOver("win");
  } else if (row == 5) {
    dgameOver("lose");
  }
};
const sleep = async (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const dgameOver = async (condition) => {
  document.getElementById("answer").innerText = word;
  await sleep(100);
  if (condition === "win") {
    window.alert("You won!");
  } else if (condition === "lose") {
    window.alert(`"You lost! The word was ${word}"`);
  }
};
