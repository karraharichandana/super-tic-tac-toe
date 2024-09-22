import React, { useState } from 'react';
import ReactConfetti from 'react-confetti';
import Board from './Board';
import Reset from './Reset';
import { calculateWinner } from './helper.js';
import './Reset.css';
import './Game.css';

const Game = () => {
  const initialBoards = Array(9).fill(Array(9).fill(null));
  const [boards, setBoards] = useState(initialBoards);
  const [boardWinners, setBoardWinners] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);
  const [nextBoard, setNextBoard] = useState(null);
  const [bigBoardWinner, setBigBoardWinner] = useState(null);
  const [winningCombinations, setWinningCombinations] = useState(Array(9).fill(null));
  const [bigBoardWinningCombination, setBigBoardWinningCombination] = useState(null);
  const [showCelebration, setShowCelebration] = useState(false);
  const [isDraw, setIsDraw] = useState(false);
  const [isModalMinimized, setIsModalMinimized] = useState(false);

  const isBoardFull = (board) => board.every(square => square !== null);
  
  const handleCloseModal = () => {
    setShowCelebration(false);
  };

  const handleMinimizeModal = () => {
    setIsModalMinimized(!isModalMinimized);
  };

  const handleClick = (boardIndex, squareIndex) => {
    if (bigBoardWinner || isDraw) return;

    const boardWinner = boardWinners[boardIndex];
    if (boardWinner) return;

    if (nextBoard !== null && nextBoard !== boardIndex && !isBoardFull(boards[nextBoard]) && boardWinners[nextBoard] === null) return;

    const newBoards = boards.map(board => [...board]);
    if (newBoards[boardIndex][squareIndex]) return;

    newBoards[boardIndex][squareIndex] = xIsNext ? 'X' : 'O';

    const winner = calculateWinner(newBoards[boardIndex]);
    const newBoardWinners = [...boardWinners];
    const newWinningCombinations = [...winningCombinations];

    if (winner) {
      newBoardWinners[boardIndex] = winner;
      newWinningCombinations[boardIndex] = calculateWinner(newBoards[boardIndex], true);
    }

    setBoards(newBoards);
    setBoardWinners(newBoardWinners);
    setWinningCombinations(newWinningCombinations);
    setXIsNext(!xIsNext);

    const bigWinner = calculateWinner(newBoardWinners);
    if (bigWinner) {
      setBigBoardWinner(bigWinner);
      setBigBoardWinningCombination(calculateWinner(newBoardWinners, true));
      setShowCelebration(true);
    } else if (newBoardWinners.every(winner => winner !== null || isBoardFull(newBoards[boardWinners.indexOf(winner)]))) {
      setIsDraw(true);
      setShowCelebration(true);
    }

    setNextBoard(
      calculateWinner(newBoards[squareIndex]) === null && !isBoardFull(newBoards[squareIndex])
        ? squareIndex
        : null
    );
  };

  const handleReset = () => {
    setBoards(initialBoards);
    setBoardWinners(Array(9).fill(null));
    setWinningCombinations(Array(9).fill(null));
    setXIsNext(true);
    setNextBoard(null);
    setBigBoardWinner(null);
    setBigBoardWinningCombination(null);
    setShowCelebration(false);
    setIsDraw(false);
  };

  const renderBoard = (i) => (
    <Board
      key={i}
      squares={boards[i]}
      onClick={(squareIndex) => handleClick(i, squareIndex)}
      isNext={nextBoard === null || nextBoard === i}
      boardWinner={boardWinners[i]}
      winningCombination={winningCombinations[i]}
      isFull={isBoardFull(boards[i])}
      isPartOfBigWinningCombination={bigBoardWinningCombination && bigBoardWinningCombination.includes(i)}
      bigBoardWinningCombination={bigBoardWinningCombination}
      boardIndex={i}
    />
  );
  return (
    <div className="game">
      <h1>Super Tic Tac Toe</h1>
      {bigBoardWinner ? (
        <h2>Winner: {bigBoardWinner}</h2>
      ) : isDraw ? (
        <h2>It's a Draw!</h2>
      ) : (
        <h2>Next Player: {xIsNext ? 'X' : 'O'}</h2>
      )}
      <div className="game-board">
        {[0, 1, 2].map(row => (
          <div key={row} className="row">
            {[0, 1, 2].map(col => renderBoard(row * 3 + col))}
          </div>
        ))}
      </div>
      <Reset onReset={handleReset} />
      {showCelebration && (
        <div className={`celebration-overlay ${isModalMinimized ? 'minimized' : ''}`}>
          <ReactConfetti />
          <div className={`celebration-modal ${isModalMinimized ? 'minimized' : ''}`}>
            <div className="modal-header">
              <h2>{isDraw ? "It's a Draw!" : `${bigBoardWinner} Wins!`}</h2>
              <div className="modal-buttons">
                <button onClick={handleMinimizeModal} className="minimize-button">
                  {isModalMinimized ? 'Maximize' : 'Minimize'}
                </button>
                <button onClick={handleCloseModal} className="close-button">
                  Close
                </button>
              </div>
            </div>
            {!isModalMinimized && (
              <>
                <p>Congratulations on a great game!</p>
                <button onClick={handleReset} className="new-game-button">Start New Game</button>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Game;