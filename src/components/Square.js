import React from 'react';
import './Square.css'

const Square = ({ value, onClick, disabled, highlight }) => {
  return (
    <button
      className={`square ${highlight ? 'highlight' : ''}`} // Apply 'highlight' class if highlight is true
      onClick={onClick}
      disabled={disabled}
    >
      {value}
    </button>
  );
};

export default Square;
