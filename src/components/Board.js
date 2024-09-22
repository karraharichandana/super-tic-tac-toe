import React from 'react';
import Square from './Square';
import './Board.css';

const Board = ({ squares, onClick, isNext, boardWinner, winningCombination, isFull, isPartOfBigWinningCombination, bigBoardWinningCombination, boardIndex }) => {
  const renderSquare = (i) => {
    const isWinningSquare = winningCombination && winningCombination.includes(i);

    return (
      <Square
        value={squares[i]}
        onClick={() => onClick(i)}
        disabled={!!squares[i] || !!boardWinner || isFull}
        highlight={isWinningSquare}
      />
    );
  };

  const renderWinningOverlay = () => {
    if (!winningCombination && !isPartOfBigWinningCombination) return null;

    let className = 'winning-line';
    let combinationToUse = winningCombination;

    if (isPartOfBigWinningCombination) {
      combinationToUse = bigBoardWinningCombination;
      className += ' big-board-winner';
    }

    const [a, b, c] = combinationToUse;

    if (a === 0 && b === 1 && c === 2) className += ' horizontal top';
    if (a === 3 && b === 4 && c === 5) className += ' horizontal middle';
    if (a === 6 && b === 7 && c === 8) className += ' horizontal bottom';
    if (a === 0 && b === 3 && c === 6) className += ' vertical left';
    if (a === 1 && b === 4 && c === 7) className += ' vertical middle';
    if (a === 2 && b === 5 && c === 8) className += ' vertical right';
    if (a === 0 && b === 4 && c === 8) className += ' diagonal1';
    if (a === 2 && b === 4 && c === 6) className += ' diagonal2';

    return <div className={className}></div>;
  };

  return (
    <div className={`board ${isNext ? 'next-board' : ''} ${boardWinner ? 'board-won' : ''} ${isFull ? 'board-full' : ''} ${isPartOfBigWinningCombination ? 'big-winner' : ''}`}>
      <div className="inner-board">
        <div className="board-row">
          {renderSquare(0)}
          {renderSquare(1)}
          {renderSquare(2)}
        </div>
        <div className="board-row">
          {renderSquare(3)}
          {renderSquare(4)}
          {renderSquare(5)}
        </div>
        <div className="board-row">
          {renderSquare(6)}
          {renderSquare(7)}
          {renderSquare(8)}
        </div>
        {renderWinningOverlay()}
      </div>
      {boardWinner && <div className="board-winner">{boardWinner}</div>}
    </div>
  );
};

export default Board;