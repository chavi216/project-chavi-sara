import Keyboard from "./keyboard";


function Deletchar({ setText}) {
    const cancelechar = () => {    

        setText(prevText => {
        const graphemes = [...prevText]; 
        if (graphemes.length === 0) return "";
        graphemes.pop();
        return graphemes.join("");
    });
    }

    
    return (
        <div>
            <button className="letter" onClick={cancelechar}>
                ⌫
            </button>
        </div>
    );
}
export default Deletchar;