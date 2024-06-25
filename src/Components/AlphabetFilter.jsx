import React from "react";
import './AlphabetFilter.css';

const AlphabetFilter = ({ onAlphabetChange }) => {
  const alphabets = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

  return (
    <div className="alphabet-filter">
      <button
        className="alphabet-button"
        onClick={() => onAlphabetChange("")}
      >
        All Stores
      </button>
      {alphabets.map((alphabet) => (
        <button
          key={alphabet}
          className="alphabet-button"
          onClick={() => onAlphabetChange(alphabet)}
        >
          {alphabet}
        </button>
      ))}
    </div>
  );
};

export default AlphabetFilter;
