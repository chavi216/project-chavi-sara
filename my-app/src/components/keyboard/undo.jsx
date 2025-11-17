import React, { useState } from "react";
import TextApp from "../textApp/textApp.jsx";

function Undo({ history, setHistory, setContent }) {
    const handleUndo = () => {
        setHistory(prev => {
            if (prev.length === 0) return prev; // אין מה למחוק
            const last = prev[prev.length - 1]; // השינוי האחרון

            // מחזירים את ה־content למצב הקודם
            setContent(last);

            // מסירים את השינוי האחרון מהיסטוריה
            return prev.slice(0, -1);
        });
    };

    return (
        <button className='letter' onClick={handleUndo}>↩️</button>
    );
}

export default Undo;