const btnRules = document.querySelector(".rules-btn");
const btnClose = document.querySelector(".close-btn");
const modalRules = document.querySelector(".modal");
const resultWinner = document.querySelector(".results__winner");
const resultText = document.querySelector(".results__text");
const choiceBtns = document.querySelectorAll(".choice-btn");
const gameDiv = document.querySelector(".game");
const resultsDiv = document.querySelector(".results");
const resultDiv = document.querySelectorAll(".results__result");
const playAgain = document.querySelector(".play-again");
const scoreNumber = document.querySelector(".score__number");
const paper = document.querySelector("#paper");
const rock = document.querySelector("#rock");
const scissors = document.querySelector("#scissors");
let score = 0;
//show or hide rules
console.log(paper);
console.log(rock);

btnRules.addEventListener("click", () => {
  modalRules.classList.toggle("show-modal");
});

btnClose.addEventListener("click", function () {
  modalRules.classList.toggle("show-modal");
});

const CHOICES = [
  {
    name: "paper",
    beats: "rock",
  },
  {
    name: "scissors",
    beats: "paper",
  },
  {
    name: "rock",
    beats: "scissors",
  },
];

//game logic
choiceBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    const choiceName = btn.dataset.choice;
    const choice = CHOICES.find((choice) => choice.name === choiceName);
    choose(choice);
  });
});

const aiChoose = function () {
  const rand = Math.floor(Math.random() * CHOICES.length);
  return CHOICES[rand];
};

const choose = function (choice) {
  const aichoice = aiChoose();
  displayResults([choice, aichoice]);
  displayWinner([choice, aichoice]);
};

const displayResults = function (results) {
  resultDiv.forEach(function (resultDiv, i, html) {
    if (results[i].name === "rock") {
      html = `
      <div class= "choice ${rock.id}">
        <img src= ${rock.src} alt= "${rock.alt}"/>
      </div>
      `;
    } else if (results[i].name === "paper") {
      html = `
      <div class= "choice ${paper.id}">
        <img src= ${paper.src} alt= "${paper.alt}"/>
      </div>
      `;
    } else if (results[i].name === "scissors") {
      html = `
      <div class= "choice ${scissors.id}">
        <img src= ${scissors.src} alt= "${scissors.alt}"/>
      </div>
      `;
    }
    setTimeout(() => {
      resultDiv.insertAdjacentHTML("beforeend", html);
    }, i * 1000);
  });

  gameDiv.classList.toggle("hidden");
  resultsDiv.classList.toggle("hidden");
};

const displayWinner = function (results) {
  setTimeout(function () {
    const userwins = isWinner(results);
    const aiWins = isWinner(results.reverse());

    if (userwins) {
      resultText.innerHTML = "You Win";
      resultDiv[0].classList.toggle("winner");
      keepScore(1);
    } else if (aiWins) {
      resultText.innerHTML = "You Lose";
      resultDiv[1].classList.toggle("winner");
      scoreNumber.innerHTML = 0;
    } else {
      resultText.innerHTML = "Draw";
      scoreNumber.innerHTML = score;
    }
    resultWinner.classList.toggle("hidden");
    resultsDiv.classList.toggle("show-winner");
  }, 1000);
};

const isWinner = function (results) {
  return results[0].beats === results[1].name;
};

const keepScore = function (point) {
  score += point;
  scoreNumber.innerHTML = score;
};

//Play again
playAgain.addEventListener("click", () => {
  gameDiv.classList.toggle("hidden");
  resultsDiv.classList.toggle("hidden");

  resultDiv.forEach((result) => {
    result.innerHTML = "";
    result.classList.remove("winner");
  });

  resultText.innerText = "";
  resultWinner.classList.toggle("hidden");
  resultsDiv.classList.toggle("show-winner");
});
