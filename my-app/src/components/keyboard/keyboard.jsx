import { useState } from 'react';
import Letter from './letter.jsx';
import ToggleLanguage from './toggleLanguage.jsx';
import TextApp from '../textApp/textApp.jsx';   
import DeleteWord from './deleteword.jsx';
import Deletchar from './deletechar.jsx';
import Undo from './undo.jsx';
import FontPicker from './fontPicker.jsx';
import ColorPicker from './colorPicker.jsx';
import SizePicker from './SizePicker.jsx';

const en = [
    'Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P',
    'A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L',
    'Z', 'X', 'C', 'V', 'B', 'N', 'M', ' '
];
const he = [
    'ק', 'ר', 'א', 'ט', 'ו', 'ן', 'ם', 'פ',
    'ש', 'ד', 'ג', 'כ', 'ע', 'י', 'ח', 'ל',
    'ז', 'ס', 'ב', 'ה', 'נ', 'מ', 'צ',' '
];

const sn = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '!', '@', '#', '%', '&', '*', '(', ')', '.', ',', '?', ':', '-', '=', '+', '/', ' '];
const emoji = [
    "😀", "😂", "🥰", "😎", "🤔", "😭", "😡",
    "👍", "👏", "🙏", "🔥", "🌟", "💡",
    "❤️", "💔", "💪", "🎉", "🌈", "☀️",
    "🍀", "🍎", "🍕", "🐶", "🐱", "🚗", "✈️",' '
];



function Keyboard({ text, setText, font, setFont ,color,setColor, size, setSize}) {

    const [history, setHistory] = useState([]);
    const handleChange = () => {
        setHistory((prev) => [...prev, { text, style }]);
    };

   const [arrchar, setArrchar] = useState([]);
   const handleletterclick = (char) => () => {
       setArrchar(prev => [...prev, char]);
        setText((prevText) => prevText + char);

        
    }

   const [language, setLanguage] = useState("en");
    const toggleLanguage = () => {
        setLanguage(prev => {
            if (prev === "en") return "he";
            if (prev === "he") return "emoji";
            if (prev === "emoji") return "sn";
            return "en";
        });
    };

     const [style, setStyle] = useState({});

    const currentLayout = language === "en" ? en :
        language === "he" ? he :
            language === "emoji" ? emoji :
                sn;


    return (
        <div className="keyboard">
            <ToggleLanguage toggleLanguage={toggleLanguage} />
            <Deletchar  setText={setText}  setArrchar={setArrchar} arrchar={arrchar}/>
            <DeleteWord  setText={setText}  arrchar={arrchar} setArrchar={setArrchar} />
            <Undo history={history} setHistory={setHistory} setText={setText} setStyle={setStyle} />
            <FontPicker value={font} onChange={setFont} />
            <ColorPicker value={color} onChange={setColor} />
            <SizePicker value={size} onChange={setSize} />
            {currentLayout.map(char => (
                <Letter key={char} char={char} handleletterclick={handleletterclick(char)} />
            ))}
        </div>
    );


};

export default Keyboard;