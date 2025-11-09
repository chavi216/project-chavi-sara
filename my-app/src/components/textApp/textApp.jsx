import { useState } from 'react';
import TextArea from "../textArea/textArea";
import Keyboard from "../keyboard/keyboard.jsx";
import FileBar from "../storage/FileBar.jsx";

function TextApp() {

    const [content, setContent] = useState([]);
    const [font, setFont] = useState("Rubik");
    const [color, setColor] = useState("#111111");
    const [size, setSize] = useState(20);
    const [currentDocId, setCurrentDocId] = useState(null);
    const [fileName, setFileName] = useState(""); // שם קובץ LS

    return (
        <div>
                <FileBar
                    currentDocId={currentDocId}
                    setCurrentDocId={setCurrentDocId}
                    content={content}
                    setContent={setContent}
                    fileName={fileName}
                    setFileName={setFileName}
                />

                <TextArea content={content} font={font} color={color} size={size} />
                <Keyboard content={content} setContent={setContent} font={font} setFont={setFont} color={color} setColor={setColor} size={size} setSize={setSize} />
            </div>
            );
}


export default TextApp;