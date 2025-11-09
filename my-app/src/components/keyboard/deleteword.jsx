import Keyboard from "./keyboard";

function DeleteWord({ text, setText }) {

  const cancelword = () => {
        text = text.trimEnd();
        const lastSpaceIndex = text.lastIndexOf(' ');
        if (lastSpaceIndex === -1) {
            setText('');
        }
        else {
            setText(text.slice(0, lastSpaceIndex));
        }
    };
    
    return (
        <div>
            <button className="letter" onClick={cancelword}>
                🔙
            </button>
        </div>
    );
}
export default DeleteWord;