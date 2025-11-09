import React, { useState } from "react";
import TextApp from "../textApp/textApp.jsx";

function UndoButtons({ history, setHistory, setStyle }) {
  const handleUndo = () => {
    setHistory(prev => {
      if (prev.length === 0) return prev;
      const last = prev[prev.length - 1];
      setStyle(last.style);
      return prev.slice(0, -1);
    });
  };

  return (
    <button className='letter' onClick={handleUndo}>↩️</button>
  );
};

export default UndoButtons;