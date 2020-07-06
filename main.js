const playerFactory = (name, letter, score) => {
  return { name, letter, score };
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
  name1.contentEditable = true;
  name1.spellcheck = false;
  name1.id = "player1-name";
  name1.innerText = "Player 1";

  const score1 = document.createElement("div");
  score1.className = "score";
  score1.id = "player1-score";
  score1.innerText = "0";

  const name2 = document.createElement("div");
  name2.className = "player-name";
  name2.contentEditable = true;
  name2.spellcheck = false;
  name2.id = "player1-name";
  name2.innerText = "Player 2";

  const score2 = document.createElement("div");
  score2.className = "score";
  score2.id = "player2-score";
  score2.innerText = "0";

  name1.addEventListener("input", () => {
    game.player1.name = name1.innerText;
  });
  name2.addEventListener("input", () => {
    game.player2.name = name2.innerText;
  });

  scoreboard1.appendChild(name1);
  scoreboard1.appendChild(score1);
  scoreboard2.appendChild(name2);
  scoreboard2.appendChild(score2);

  const modal = document.createElement("div");
  modal.id = "modal";
  const winner = document.createElement("div");
  winner.id = "winner";
  const buttonContainer = document.createElement("div");
  buttonContainer.id = "button-container";
  const playAgain = document.createElement("button");
  playAgain.id = "play-again";
  playAgain.innerText = "Play Again";
  const reset = document.createElement("button");
  reset.id = "reset";
  reset.innerText = "Reset";

  playAgain.addEventListener("click", () => {
    displayController.clearGrid();
    modal.style.display = "none";
  });

  reset.addEventListener("click", () => {
    game.player1.score = 0;
    game.player2.score = 0;
    displayController.updateScoreboard();
    displayController.clearGrid();
    modal.style.display = "none";
  });
  buttonContainer.appendChild(playAgain);
  buttonContainer.appendChild(reset);

  const createBoard = (cells) => {
    for (let i = 0; i < cells; i++) {
      let cell = document.createElement("div");
      cell.className = "cell";
      board.appendChild(cell);
    }
    main.appendChild(scoreboard1);
    main.appendChild(board);
    main.appendChild(scoreboard2);
    main.appendChild(modal);
  };

  const getCells = () => {
    return document.querySelectorAll(".cell");
  };

  let cells = document.querySelectorAll(".cell");
  return {
    createBoard,
    board,
    cells,
    getCells,
    score1,
    score2,
    modal,
    winner,
    buttonContainer,
  };
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

  const clearGrid = () => {
    let cells = gameBoard.getCells();
    cells.forEach((cell) => {
      cell.innerText = "";
    });
  };

  const updateScoreboard = () => {
    gameBoard.score1.innerText = game.player1.score;
    gameBoard.score2.innerText = game.player2.score;
  };

  const showWinScreen = () => {
    gameBoard.winner.innerText = `${game.getCurrentPlayer()} wins!`;
    gameBoard.modal.appendChild(gameBoard.winner);
    gameBoard.modal.appendChild(gameBoard.buttonContainer);
    gameBoard.modal.style.display = "flex";
  };

  const claimCell = (cell) => {
    let value = cell.textContent;
    if (!value) {
      cell.textContent = game.getCurrentLetter();
      if (game.checkWinner()) {
        if (cell.textContent == "X") {
          game.player1.score++;
        } else game.player2.score++;
        updateScoreboard();
        showWinScreen();
      } else game.togglePlayer();
    }
  };

  return { enableButtons, clearGrid, updateScoreboard };
})();

const game = (() => {
  let player1 = playerFactory("Player 1", "X", 0);
  let player2 = playerFactory("Player 2", "O", 0);
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
      console.log("Toggle1");
      currentPlayer = player2;
    } else {
      console.log("Toggle2");
      currentPlayer = player1;
    }
  };

  const getCurrentLetter = () => {
    return currentPlayer.letter;
  };

  const getCurrentPlayer = () => {
    return currentPlayer.name;
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
    getCurrentLetter,
  };
})();

document.addEventListener("DOMContentLoaded", game.init);
