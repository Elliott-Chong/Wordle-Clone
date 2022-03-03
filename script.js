const sleep = async (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const rows = 6;
const keys = document.querySelectorAll(".key");
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

enterTile = (e) => {
  console.log(row, col);
  if (gameOver) return;
  if (e.code === "Backspace" || e.code === "Back") {
    if (col > 0 && col <= columns && row <= 5) {
      currentTile = document.getElementById(
        row.toString() + "-" + (col - 1).toString()
      );
      if (currentTile.innerText != "") {
        currentTile.innerText = "";
        currentTile.classList.remove("filled");
        col--;
      }
      return;
    }
  }
  if (col == columns && e.code == "Enter") {
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
      if (currentTile.innerText === "") currentTile.classList.add("filled");
      currentTile.innerText = e.key.toUpperCase();

      col++;
    }
  }
};

document.addEventListener("keyup", enterTile);

keys.forEach((key) =>
  key.addEventListener("click", (e) => {
    console.log(e.target.innerText);
    enterTile({ key: e.target.innerText.toLowerCase() });
  })
);

const specialKeys = document.querySelectorAll(".key2");
specialKeys.forEach((key) =>
  key.addEventListener("click", (e) => {
    enterTile({ code: e.target.innerText });
  })
);

const check = async (row) => {
  let animation_duration = 150;
  let correct = 0;
  for (let col = 0; col < columns; col++) {
    currentTile = document.getElementById(
      row.toString() + "-" + col.toString()
    );
    let correspondingKey = document.querySelector(
      `[data-letter=${currentTile.innerText.toUpperCase()}]`
    );
    let classL = correspondingKey.classList;
    let cont =
      !classL.contains("inPlace") ||
      !classL.contains("present") ||
      !classL.contains("wrong");
    currentTile.classList.add("flip");
    setTimeout(() => currentTile.classList.remove("flip"), animation_duration);
    await sleep(animation_duration);
    if (currentTile.innerText.toLowerCase() == word[col].toLowerCase()) {
      if (cont) correspondingKey.classList.add("inPlace");
      correct++;
      currentTile.classList.add("inPlace");
    } else if (
      word.toLowerCase().includes(currentTile.innerText.toLowerCase())
    ) {
      if (cont) correspondingKey.classList.add("present");
      currentTile.classList.add("present");
    } else {
      currentTile.classList.add("wrong");
      if (cont) correspondingKey.classList.add("wrong");
    }
    await sleep(100);
  }
  if (correct == word.length) {
    gameOver = true;
    dgameOver("win");
  } else if (row == 5) {
    dgameOver("lose");
  }
};

const dgameOver = async (condition) => {
  document.getElementById("answer").innerText = word.toUpperCase();
};
