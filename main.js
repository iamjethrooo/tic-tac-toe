const playerFactory = (name, letter) => {
  return { name, letter };
};

const gameBoard = (() => {
  const main = document.querySelector("#main");
  const board = document.createElement("div");
  board.id = "game-board";

  const scoreboard1 = document.createElement("div");
  scoreboard1.className = "scoreboard";
  const scoreboard2 = document.createElement("div");
  scoreboard2.className = "scoreboard";

  // Scoreboard 1
  const name1 = document.createElement("div");
  name1.className = "player-name";
  name1.id = "player1-name";
  name1.innerText = "Player 1";

  const score1 = document.createElement("div");
  score1.className = "score";
  score1.id = "player1-score";
  score1.innerText = "0";

  scoreboard1.appendChild(name1);
  scoreboard1.appendChild(score1);

  const name2 = document.createElement("div");
  name2.className = "player-name";
  name2.id = "player1-name";
  name2.innerText = "Player 2";

  const score2 = document.createElement("div");
  score2.className = "score";
  score2.id = "player2-score";
  score2.innerText = "0";

  scoreboard2.appendChild(name2);
  scoreboard2.appendChild(score2);

  const createBoard = (cells) => {
    for (let i = 0; i < cells; i++) {
      let cell = document.createElement("div");
      cell.className = "cell";
      board.appendChild(cell);
    }
    main.appendChild(scoreboard1);
    main.appendChild(board);
    main.appendChild(scoreboard2);
  };

  const getCells = () => {
    return document.querySelectorAll(".cell");
  };

  let cells = document.querySelectorAll(".cell");
  return { createBoard, board, cells, getCells, score1 };
})();

const displayController = (() => {
  const enableButtons = () => {
    let cells = gameBoard.getCells();
    console.log(cells);
    cells.forEach((cell) => {
      cell.addEventListener("click", (e) => {
        claimCell(e.target);
      });
    });
  };

  const showWinScreen = () => {};

  const claimCell = (cell) => {
    let value = cell.textContent;
    if (!value) {
      cell.textContent = game.getCurrentPlayer();
      if (game.checkWinner()) {
        if (game.currentPlayer.letter == "X") {
          gameBoard.score1.innerText++;
        } else gameBoard.score2.innerText++;
      } else game.togglePlayer();
    }
  };

  return { enableButtons };
})();

const game = (() => {
  let player1 = playerFactory("Player 1", "X");
  let player2 = playerFactory("Player 2", "O");
  let currentPlayer = player1;

  const checkLine = (board, startCol, colDiff) => {
    if (
      board[startCol].innerText == "" &&
      board[startCol + colDiff].innerText == "" &&
      board[startCol + colDiff * 2].innerText == ""
    )
      return false;
    if (
      board[startCol].innerText == board[startCol + colDiff].innerText &&
      board[startCol + colDiff].innerText ==
        board[startCol + colDiff * 2].innerText
    ) {
      return true;
    }
    return false;
  };

  const checkWinner = () => {
    let board = gameBoard.getCells();
    if (
      checkLine(board, 0, 1) ||
      checkLine(board, 3, 1) ||
      checkLine(board, 6, 1) ||
      checkLine(board, 0, 3) ||
      checkLine(board, 1, 3) ||
      checkLine(board, 2, 3) ||
      checkLine(board, 0, 4) ||
      checkLine(board, 2, 2)
    ) {
      return true;
    }
    return false;
  };

  const checkTie = () => {
    let cells = gameBoard.getCells();
    let populatedCells = 0;
    for (let i = 0; i < cells.length; i++) {
      if (cells[i].textContent != "") {
        populatedCells++;
      }
    }
    return populatedCells == cells.length ? true : false;
  };

  const togglePlayer = () => {
    if (currentPlayer == player1) {
      currentPlayer = player2;
    } else {
      currentPlayer = player1;
    }
  };

  const getCurrentPlayer = () => {
    return currentPlayer.letter;
  };

  const init = () => {
    gameBoard.createBoard(9);
    displayController.enableButtons();
  };
  return {
    init,
    player1,
    player2,
    currentPlayer,
    checkWinner,
    togglePlayer,
    getCurrentPlayer,
  };
})();

document.addEventListener("DOMContentLoaded", game.init);
