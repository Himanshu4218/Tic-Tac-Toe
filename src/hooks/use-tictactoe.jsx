import { useState } from "react";

function useTicTacToe(size) {
  const [board, setBoard] = useState(Array(size * size).fill(null));
  const [gameOver, setGameOver] = useState(false);
  const [isX, setIsX] = useState(true);

  const getMessage = () => {
    if (gameOver) {
      return isX ? "Player X Wins" : "Player O Wins";
    }

    return isX ? "Player X turn" : "Player O turn";
  };

  function calculateWinner(board) {
    const n = Math.sqrt(board.length);

    // Check Rows
    for (let i = 0; i < n; i++) {
      const rowStart = i * n;
      const row = board.slice(rowStart, rowStart + n);
      if (row[0] !== null && row.every((cell) => cell === row[0])) {
        return row[0];
      }
    }

    // Check Columns
    for (let j = 0; j < n; j++) {
      let columnWinner = true;
      for (let i = 0; i < n; i++) {
        if (board[i * n + j] !== board[j]) {
          columnWinner = false;
          break;
        }
      }
      if (columnWinner && board[j] !== null) {
        return board[j];
      }
    }

    // Check Main Diagonal
    let mainDiagonalWinner = true;
    for (let i = 0; i < n; i++) {
      if (board[i * n + i] !== board[0]) {
        mainDiagonalWinner = false;
        break;
      }
    }
    if (mainDiagonalWinner && board[0] !== null) {
      return board[0];
    }

    // Check Anti-Diagonal
    let antiDiagonalWinner = true;
    for (let i = 0; i < n; i++) {
      if (board[i * n + (n - 1 - i)] !== board[n - 1]) {
        antiDiagonalWinner = false;
        break;
      }
    }
    if (antiDiagonalWinner && board[n - 1] !== null) {
      return board[n - 1];
    }

    // No Winner
    return null;
  }

  const handleClick = (index) => {
    if (board[index] !== null || gameOver) return;

    const updatedBoard = [...board];
    updatedBoard[index] = isX ? "X" : "O";
    setBoard(updatedBoard);

    const isWinner = calculateWinner(updatedBoard);
    if (isWinner) {
      setGameOver(true);
    } else {
      setIsX((prev) => !prev);
    }
  };

  const reset = () => {
    setIsX(true);
    setGameOver(false);
    setBoard(Array(size * size).fill(null));
  };

  return { handleClick, getMessage, reset, board, gameOver };
}

export default useTicTacToe;
