const playerFactory = (name, letter) => {
  return { name, letter };
};

const gameBoard = (() => {
  const main = document.querySelector("#main");
  const board = document.createElement("div");
  board.id = "game-board";

  const createGrid = (cells) => {
    for (let i = 0; i < cells; i++) {
      let cell = document.createElement("div");
      cell.className = "cell";
      board.appendChild(cell);
    }
    main.appendChild(board);
  };

  const getCells = () => {
    return document.querySelectorAll(".cell");
  };

  let cells = document.querySelectorAll(".cell");
  return { createGrid, board, cells, getCells };
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

  const claimCell = (cell) => {
    let value = cell.textContent;
    if (!value) {
      cell.textContent = game.getCurrentPlayer();
      game.checkWinner();
      game.togglePlayer();
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
      console.log(
        `First Col: ${startCol}\nSecond Col: ${
          startCol + colDiff
        }\nThird Col: ${startCol + colDiff * 2}`
      );
      return true;
    }
    return false;
  };

  const checkWinner = () => {
    let board = gameBoard.getCells();
    // Horizontal
    if (checkLine(board, 0, 1)) {
      console.log(`${currentPlayer.letter} wins!`);
    } else if (checkLine(board, 3, 1)) {
      console.log(`${currentPlayer.letter} wins!`);
    } else if (checkLine(board, 6, 1)) {
      console.log(`${currentPlayer.letter} wins!`);
    }
    // Vertical
    else if (checkLine(board, 0, 3)) {
      console.log(`${currentPlayer.letter} wins!`);
    } else if (checkLine(board, 1, 3)) {
      console.log(`${currentPlayer.letter} wins!`);
    } else if (checkLine(board, 2, 3)) {
      console.log(`${currentPlayer.letter} wins!`);
    }
    // Diagonal
    else if (checkLine(board, 0, 4)) {
      console.log(`${currentPlayer.letter} wins!`);
    } else if (checkLine(board, 2, 2)) {
      console.log(`${currentPlayer.letter} wins!`);
    }
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
    gameBoard.createGrid(9);
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
