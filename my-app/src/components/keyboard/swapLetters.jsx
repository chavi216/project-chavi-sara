import { useState } from "react";
import Keyboard from "./keyboard";

export default function SwapLetters({ content, setContent ,setHistory}) {
    const [fromChar, setFromChar] = useState("");
    const [toChar, setToChar] = useState("");

    const handleSwap = () => {
        if (!fromChar) {
            alert("אנא הזן את האות שברצונך להחליף");
            return;
        }
        setHistory(prev => [...prev, content]); // <-- שומרים את המצב הנוכחי

        const lowerFrom = fromChar.toLowerCase();
        const lowerTo = toChar; // נשאיר את האות החדשה כפי שהמשתמש הכניס

        setContent(prevContent => {
            return prevContent.map(part => ({
                ...part,
                text: part.text
                    .split("")
                    .map(c => c.toLowerCase() === lowerFrom ? lowerTo : c)
                    .join("")
            }));
        });

        setFromChar("");
        setToChar("");
    };

    return (
        <div className="find-bar">
            <input
                className="find-input find-input--tiny"
                type="text"
                dir="ltr"
                value={fromChar}
                onChange={(e) => setFromChar(e.target.value.slice(0, 1))}
                placeholder="להחלפה"
                maxLength={1}
            />
            <input
                className="find-input find-input--tiny"
                type="text"
                dir="ltr"
                value={toChar}
                onChange={(e) => setToChar(e.target.value.slice(0, 1))}
                placeholder="חדשה"
                maxLength={1}
            />
            <button
                type="button"
                className="letter letter--action"
                onClick={handleSwap}
            >
                החלף אות
            </button>
        </div>
    );
}