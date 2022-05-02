let elems = document.querySelectorAll(".item");
let winaudio = document.createElement("audio");
let clickaudio = document.createElement("audio");
let resetaudio = document.createElement("audio");
winaudio.src = "assets/win.mp3";
clickaudio.src = "assets/add.wav";
resetaudio.src = "assets/reset.mp3";

winaudio.playbackRate = 2;
console.log(winaudio.playbackRate);

winaudio.load();
clickaudio.load();
resetaudio.load();

let turn = 0; // 0 for o and 1 for x
let winPosses = [
  [0, 1, 2],
  [0, 3, 6],
  [0, 4, 8],
  [6, 7, 8],
  [3, 4, 5],
  [1, 4, 7],
  [2, 5, 8],
  [2, 4, 6],
];
let hasChild = [];
let winState = false;
let currentClass;

let checkWin = () => {
  return winPosses.some((pose) => {
    return pose.every((index) => {
      return elems[index].classList.contains(currentClass);
    });
  });
};

let winned = () => {
  winaudio.currentTime = 0.03;
  winaudio.play();
  winState = true;
  document.querySelector(".winState").style.display = "flex";
  if (currentClass == "cross") {
    document.querySelector(".win-summary").textContent = `X won the game`;
  } else {
    document.querySelector(".win-summary").textContent = `O won the game`;
  }
};

let click = (e) => {
  if (
    !e.target.classList.contains("cross") &&
    !e.target.classList.contains("circle")
  ) {
    clickaudio.play();
    if (turn == 0) {
      e.target.classList.add("circle");
      turn = 1;
    } else {
      e.target.classList.add("cross");
      turn = 0;
    }

    if (turn != 0) {
      currentClass = "circle";
    } else {
      currentClass = "cross";
    }
    handleSubTitle();

    if (checkWin()) {
      winned();
    }
  }
};

elems.forEach((elem) => {
  elem.addEventListener("click", (e) => click(e));
});

let resetGame = () => {
  winaudio.load();
  resetaudio.play();
  elems.forEach((elem) => {
    if (elem.classList.contains("cross")) {
      elem.classList.remove("cross");
    }
    if (elem.classList.contains("circle")) {
      elem.classList.remove("circle");
    }
    winState = false;
    document.querySelector(".winState").style.display = "none";
  });
};

let handleSubTitle = () => {
  let turns;
  if (turn == 0) {
    turns = "O";
  } else {
    turns = "X";
  }
  document.querySelector(".subTitle").textContent = `${turns}'s Turn`;
};

handleSubTitle();
