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
  return { createGrid };
})();

const displayController = (() => {
  let cells;

  const enableButtons = () => {
    cells = document.querySelectorAll(".cell");
    cells.forEach((cell) => {
      cell.addEventListener("click", () => {
        let value = cell.textContent;
        if (!value) {
          cell.textContent = game.currentPlayer.letter;
        }
        game.checkWinner();
      });
    });
  };

  return { enableButtons };
})();

const game = (() => {
  let player1 = playerFactory("Player 1", "X");
  let player2 = playerFactory("Player 2", "O");
  let currentPlayer = player1;

  const checkWinner = () => {
    console.log("CHECKING");
  };

  const init = () => {
    console.log("HELLO!");
    gameBoard.createGrid(9);
    displayController.enableButtons();
  };
  return { init, player1, player2, currentPlayer, checkWinner };
})();

window.addEventListener("DOMContentLoaded", game.init);
