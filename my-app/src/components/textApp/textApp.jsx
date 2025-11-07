import { useState } from 'react';
import TextArea from "../textArea/textArea";
import Keyboard from "../keyboard/keyboard.jsx";
import ColorPicker from '../keyboard/colorPicker.jsx';

function TextApp() {

    const [text, setText] = useState("");
    const [font, setFont] = useState("Rubik");
    const [color, setColor] = useState("#111111");
    const [size, setSize] = useState(20);

    return (
        <div>
            <TextArea text={text} font={font} color={color} size={size} />
            <Keyboard text={text} setText={setText} font={font} setFont={setFont} color={color} setColor={setColor} size={size} setSize={setSize} />
            
        </div>
    );
}




export default TextApp;