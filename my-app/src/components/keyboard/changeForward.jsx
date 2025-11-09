import Keyboard from "./keyboard";

function ChangeForward({ color, size, font }) {
    
    const forwardWord = () => {
        const textArea = document.getElementById("text-area");
        const p = document.createElement("p");
        p.appendChild(document.createTextNode(""));
        p.style.fontSize = size;
        p.style.color = color;
        p.style.fontFamily = font;
        textArea.appendChild(p);
    };

    return (
        <div>
            <button className="letter" onClick={forwardWord}>
                ➡️
            </button>
        </div>
    );
}

export default ChangeForward;
