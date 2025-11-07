import Keyboard from "./keyboard";


function Deletchar({ setText, setArrchar, arrchar }) {
    const canceleaction = () => {    
        setArrchar(prev => {
            if (prev.length === 0) return prev;
            return prev.slice(0, -1);
            
        });
        
        setText((prevText) => prevText.slice(0, -1));
    }
    return (
        <div>
            <button className="letter" onClick={canceleaction}>
                ❎
            </button>
        </div>
    );
}
export default Deletchar;