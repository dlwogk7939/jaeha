const boardElement = document.getElementById("board");
const messageElement = document.getElementById("message");
let board = Array(9).fill(null);
let currentPlayer = "X"; // Player always starts as "X"

// Create the game board
function createBoard() {
    boardElement.innerHTML = "";
    board.forEach((cell, index) => {
        const cellElement = document.createElement("div");
        cellElement.classList.add("cell");
        if (cell) {
            cellElement.classList.add("taken");
            cellElement.textContent = cell;
        }
        cellElement.addEventListener("click", () => makeMove(index));
        boardElement.appendChild(cellElement);
    });
}

// Check for winner
function checkWinner(b) {
    const winningCombos = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];

    for (const combo of winningCombos) {
        const [a, b, c] = combo;
        if (b[a] && b[a] === b[b] && b[a] === b[c]) {
            return b[a];
        }
    }
    return b.includes(null) ? null : "Draw";
}

// Handle player's move
function makeMove(index) {
    if (board[index] || checkWinner(board)) return;
    board[index] = currentPlayer;
    currentPlayer = "O"; // Switch to AI
    createBoard();

    const result = checkWinner(board);
    if (result) {
        endGame(result);
        return;
    }

    setTimeout(() => aiMove(), 500);
}

// AI move using minimax
function aiMove() {
    const bestMove = minimax(board, true).index;
    board[bestMove] = "O";
    currentPlayer = "X"; // Switch back to player
    createBoard();

    const result = checkWinner(board);
    if (result) {
        endGame(result);
    }
}

// Minimax algorithm
function minimax(newBoard, isAI) {
    const winner = checkWinner(newBoard);
    if (winner === "X") return { score: -10 };
    if (winner === "O") return { score: 10 };
    if (winner === "Draw") return { score: 0 };

    const moves = [];
    newBoard.forEach((cell, index) => {
        if (!cell) {
            const move = { index };
            newBoard[index] = isAI ? "O" : "X";
            move.score = minimax(newBoard, !isAI).score;
            newBoard[index] = null; // Undo move
            moves.push(move);
        }
    });

    if (isAI) {
        return moves.reduce((best, move) => (move.score > best.score ? move : best));
    } else {
        return moves.reduce((best, move) => (move.score < best.score ? move : best));
    }
}

// End the game
function endGame(result) {
    if (result === "Draw") {
        messageElement.textContent = "It's a draw!";
    } else {
        messageElement.textContent = `${result} wins!`;
    }
    boardElement.querySelectorAll(".cell").forEach(cell => cell.classList.add("taken"));
}

// Restart the game
function restartGame() {
    board = Array(9).fill(null);
    currentPlayer = "X";
    messageElement.textContent = "";
    createBoard();
}

// Initialize the game
createBoard();
