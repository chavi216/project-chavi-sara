import Keyboard from "./keyboard";

function ChangeForward({ setApplyToAll, applyToAll }) {

    // const forwardWord = () => {
    //     const textArea = document.getElementById("text-area");
    //     const p = document.createElement("p");
    //     p.appendChild(document.createTextNode(""));
    //     p.style.fontSize = size;
    //     p.style.color = color;
    //     p.style.fontFamily = font;
    //     textArea.appendChild(p);
    // };

    return (
        <div>

            <button className="letter" onClick={() => setApplyToAll(a => !a)}>
                {/* ➡️ */}
                {applyToAll ? "🎨 שינוי כללי" : "🆕 מכאן והלאה"}

            </button>
        </div >
    );
}

export default ChangeForward;
