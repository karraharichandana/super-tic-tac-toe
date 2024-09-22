// src/components/Reset.js
import React from 'react';

const Reset = ({ onReset }) => {
  return (
    <button className="reset-button" onClick={onReset}>
      Reset Game
    </button>
  );
};

export default Reset;
