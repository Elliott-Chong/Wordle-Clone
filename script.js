const sleep = async (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const rows = 6;
const keys = document.querySelectorAll(".key");
var myArray = ["APRON","PRIMO","ATONE","DONOR","FLOAT","GOOSE","PIETY","GIRTH","TRAIT","FLOOD","GLOOM","DEPTH","FROTH","PHASE","SHOWY","CREAK","MANOR","ATOLL","BAYOU","CREPT","TIARA","ASSET","VOUCH","ALBUM","HINGE","MONEY","SCRAP","GAMER","GLASS","SCOUR","BEING","DELVE","YIELD","METAL","TIPSY","SLUNG","FARCE","GECKO","SHINE","CANNY","MIDST","BADGE","HOMER","TRAIN","STORY","HAIRY","FORGO","LARVA","TRASH","ZESTY","SHOWN","HEIST","ASKEW","INERT","OLIVE","PLANT","OXIDE","CARGO","FOYER","FLAIR","AMPLE","CHEEK","SHAME","MINCE","CHUNK","ROYAL","SQUAD","BLACK","STAIR","SCARE","FORAY","COMMA","NATAL","SHAWL","FEWER","TROPE","SNOUT","LOWLY","STOVE","SHALL","FOUND","NYMPH","EPOXY","DEPOT","CHEST","PURGE","SLOSH","THEIR","RENEW","ALLOW","SAUTE","MOVIE","CATER","TEASE","SMELT","FOCUS","TODAY","WATCH","LAPSE","MONTH","SWEET","HOARD","CLOTH","BRINE","AHEAD","MOURN","NASTY","RUPEE","CHOKE","CHANT","SPILL","VIVID","BLOKE","TROVE","THORN","OTHER","TACIT","SWILL","DODGE","SHAKE","CAULK","AROMA","CYNIC","ROBIN","ULTRA","ULCER","PAUSE","HUMOR","FRAME","ELDER","SKILL","ALOFT","PLEAT","SHARD","MOIST","THOSE","LIGHT","WRUNG","COULD","PERKY","MOUNT","WHACK","SUGAR","KNOLL","CRIMP","WINCE","PRICK","ROBOT","POINT","PROXY","SHIRE","SOLAR","PANIC","TANGY","ABBEY","FAVOR","DRINK","QUERY","GORGE","CRANK","SLUMP","BANAL","TIGER","SIEGE","TRUSS","BOOST","REBUS","UNIFY","TROLL","TAPIR","ASIDE","FERRY","ACUTE","PICKY","WEARY","GRIPE","CRAZE","PLUCK","BRAKE","BATON","CHAMP","PEACH","USING","TRACE","VITAL","SONIC","MASSE","CONIC","VIRAL","RHINO","BREAK","TRIAD","EPOCH","USHER","EXULT","GRIME","CHEAT","SOLVE","BRING","PROVE","STORE","TILDE","CLOCK","WROTE","RETCH","PERCH","ROUGE","RADIO","SURER","FINER","VODKA","HERON","CHILL","GAUDY","PITHY","SMART","BADLY","ROGUE","GROUP","FIXER","GROIN","DUCHY","COAST","BLURT","PULPY","ALTAR","GREAT","BRIAR","CLICK","GOUGE","WORLD","ERODE","BOOZY","DOZEN","FLING","GROWL","ABYSS","STEED","ENEMA","JAUNT","COMET","TWEED","PILOT","DUTCH","BELCH","OUGHT","DOWRY","THUMB","HYPER","HATCH","ALONE","MOTOR","ABACK","GUILD","KEBAB","SPEND","FJORD","ESSAY","SPRAY","SPICY","AGATE","SALAD","BASIC","MOULT","CORNY","FORGE","CIVIC","ISLET","LABOR","GAMMA","LYING","AUDIT","ROUND","LOOPY","LUSTY","GOLEM","GONER","GREET","START","LAPEL","BIOME","PARRY","SHRUB","FRONT","WOOER","TOTEM","FLICK","DELTA","BLEED","ARGUE","SWIRL","ERROR","AGREE","OFFAL","FLUME","CRASS","PANEL","STOUT","BRIBE","DRAIN","YEARN","PRINT","SEEDY","IVORY","BELLY","STAND","FIRST","FORTH","BOOBY","FLESH","UNMET","LINEN","MAXIM","POUND","MIMIC","SPIKE","CLUCK","CRATE","DIGIT","REPAY","SOWER","CRAZY","ADOBE","OUTDO","TRAWL","WHELP","UNFED","PAPER","STAFF","CROAK","HELIX","FLOSS","PRIDE","BATTY","REACT","MARRY","ABASE","COLON","STOOL","CRUST","FRESH","DEATH","MAJOR","FEIGN","ABATE","BENCH","QUIET","GRADE","STINK","KARMA","MODEL","DWARF","HEATH","SERVE","NAVAL","EVADE","FOCAL","BLUSH","AWAKE","HUMPH","SISSY","REBUT","CIGAR"];
var word = myArray[Math.floor(Math.random()*myArray.length)];
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
