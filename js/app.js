window.addEventListener("load", init);
//variables
const $seconds = document.querySelector("#mySelect");
const $word = document.querySelector(".typing-word");
const $input = document.querySelector(".typing");
const $WinOrLose = document.querySelector(".typingGame");
const $timeLeft = document.querySelector(".time");
const $score = document.querySelector(".score");
const $modal = document.querySelector(".modal");
const $backdrop = document.querySelector(".backdrop");
const $BtnModal = document.querySelector(".changeDificulty");
const $BtnModalCancel = document.querySelector(".btn-cancel");
const $BtnModalConfirm = document.querySelector(".btn-confirm");
const $secondsDif = document.querySelector(".seconds");
let dificulty;
const words = [
  "hat",
  "river",
  "lucky",
  "statue",
  "generate",
  "stubborn",
  "cocktail",
  "runaway",
  "joke",
  "developer",
  "establishment",
  "hero",
  "javascript"
];

let time = 6;
let score = 0;
let isPlaying;

//functons
function init() {
  //load word from array
  showWord(words);
  //start matching on word input
  $input.addEventListener("input", startMatch);
  //call count down every second
  setInterval(countDown, 1000);
  //check game status
  setInterval(checkStatus, 10);
}
const setTime = _ => {
  if (dificulty === "Easy") {
    time = 6;
    $secondsDif.innerHTML = time;
  } else if (dificulty === "Medium") {
    time = 4;
    $secondsDif.innerHTML = time;
  } else if (dificulty === "Hard") {
    time = 3;
    $secondsDif.innerHTML = time;
  }
};

const startMatch = _ => {
  if (matchWords()) {
    setTime();
    isPlaying = true;
    showWord(words);
    $input.value = "";
    score++;
  }
  if (score === -1) {
    $score.innerHTML = 0;
  } else {
    $score.innerHTML = score;
  }
};
const matchWords = _ => {
  if ($input.value === $word.innerHTML) {
    $WinOrLose.innerHTML = "Correct!!!";
    return true;
  } else {
    $WinOrLose.innerHTML = "";
    return false;
  }
};

const showWord = words => {
  const randIndex = Math.floor(Math.random() * words.length);
  $word.innerHTML = words[randIndex];
};

const countDown = _ => {
  //make sure time si not run out
  if (time > 0) {
    time--;
  } else if (time === 0) {
    isPlaying = false;
  }
  //show time
  $timeLeft.innerHTML = time;
};
const checkStatus = _ => {
  if (!isPlaying && time === 0) {
    $WinOrLose.innerHTML = "Game Over!!";
    score = -1;
  }
};
const showGameOver = _ => {
  $body = document.querySelector("body");
  $body.style.background = "red";
};
const openModal = _ => {
  $modal.style.display = "block";
  $backdrop.style.display = "block";
};
const closeModal = _ => {
  $modal.style.display = "none";
  $backdrop.style.display = "none";
};

const confirmModal = _ => {
  closeModal();
  const selectedValue = document.querySelector("#list").value;
  dificulty = selectedValue;
  setTime();
};
//listeners
$BtnModal.addEventListener("click", openModal);
$backdrop.addEventListener("click", closeModal);
$BtnModalCancel.addEventListener("click", closeModal);
$BtnModalConfirm.addEventListener("click", confirmModal);
