import { useState } from 'react';
import Letter from './letter.jsx';
import ToggleLanguage from './toggleLanguage.jsx';
import TextApp from '../textApp/textApp.jsx';
import DeleteWord from './deleteword.jsx';
import Deletechar from './deletechar.jsx';
import Undo from './undo.jsx';
import FontPicker from './fontPicker.jsx';
import ColorPicker from './colorPicker.jsx';
import SizePicker from './SizePicker.jsx';
import DeleteAll from './deleteAll.jsx';
import ChangeForward from './changeForward.jsx';
import FindChar from './findChar.jsx';

const en = [
    'Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P',
    'A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L',
    'Z', 'X', 'C', 'V', 'B', 'N', 'M', ' '
];
const he = [
    'ק', 'ר', 'א', 'ט', 'ו', 'ן', 'ם', 'פ',
    'ש', 'ד', 'ג', 'כ', 'ע', 'י', 'ח', 'ל',
    'ז', 'ס', 'ב', 'ה', 'נ', 'מ', 'צ', ' '
];

const sn = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '!', '@', '#', '%', '&', '*', '(', ')', '.', ',', '?', ':', '-', '=', '+', '/', ' '];
const emoji = [
    "😀", "😂", "🥰", "😎", "🤔", "😭", "😡",
    "👍", "👏", "🙏", "🔥", "🌟", "💡",
    "❤️", "💔", "💪", "🎉", "🌈", "☀️",
    "🍀", "🍎", "🍕", "🐶", "🐱", "🚗", "✈️", ' '
];



function Keyboard({ content, setContent, font, setFont, color, setColor, size, setSize }) {

    const [history, setHistory] = useState([]);
    const handleChange = () => {
        setHistory((prev) => [...prev, { text, style }]);
    };

    // const handleletterclick = (char) => () => {
    //     setText((prevText) => prevText + char);
    // }
    const handleletterClick = (char) => () => {
        setContent(prev => {
            const newPart = { text: char, style: currentStyle };
            if (prev.length === 0 || JSON.stringify(prev[prev.length - 1].style) !== JSON.stringify(currentStyle)) {
                return [...prev, newPart];
            }
            const updated = [...prev];
            updated[updated.length - 1].text += char;
            return updated;
        });
    };

    const [language, setLanguage] = useState("en");
    const toggleLanguage = () => {
        setLanguage(prev => {
            if (prev === "en") return "he";
            if (prev === "he") return "emoji";
            if (prev === "emoji") return "sn";
            return "en";
        });
    };

    const [currentStyle, setCurrentStyle] = useState({
        fontFamily: "Rubik",
        color: "#111111",
        fontSize: 20
    });

    const handleStyleChange = (newStyle) => {
        if (applyToAll) {
            // משנה את כל הקטעים שכבר קיימים
            setContent(prev => prev.map(p => ({
                ...p,
                style: { ...p.style, ...newStyle }
            })));
        }
        // משנה את הסגנון הפעיל לטקסטים החדשים
        setCurrentStyle(prev => ({ ...prev, ...newStyle }));
    };

    const [applyToAll, setApplyToAll] = useState(true);

    const [style, setStyle] = useState({});//בשביל הUNDO 

    const currentLayout = language === "en" ? en :
        language === "he" ? he :
            language === "emoji" ? emoji :
                sn;


    return (
        <div className="keyboard">
            <ToggleLanguage toggleLanguage={toggleLanguage} />
            <DeleteAll setContent={setContent} />
            <Deletechar setContent={setContent} />
            <DeleteWord content={content} setContent={setContent} />
            <Undo history={history} setHistory={setHistory} setStyle={setStyle} />
            <FontPicker value={currentStyle.fontFamily} onChange={(font) => handleStyleChange({ fontFamily: font })} />
            <ColorPicker value={currentStyle.color} onChange={(color) => handleStyleChange({ color })} />
            <SizePicker value={currentStyle.fontSize} onChange={(size) => handleStyleChange({ fontSize: size })} />
            <ChangeForward setApplyToAll={setApplyToAll} applyToAll={applyToAll} />
            <FindChar content={content} />
            {currentLayout.map(char => (
                <Letter key={char} char={char} handleletterclick={handleletterClick(char)} />
            ))}
        </div>
    );


};

export default Keyboard;