import { useState } from 'react';
import TextArea from "../textArea/textArea";
import Keyboard from "../keyboard/keyboard.jsx";

function TextApp() {

    const [content, setContent] = useState([]);
    const [font, setFont] = useState("Rubik");
    const [color, setColor] = useState("#111111");
    const [size, setSize] = useState(20);

    return (
        <div>
            <TextArea content={content} font={font} color={color} size={size} />
            <Keyboard content={content} setContent={setContent} font={font} setFont={setFont} color={color} setColor={setColor} size={size} setSize={setSize} />
        </div>
    );
}




export default TextApp;