import Keyboard from "./keyboard";

function DeleteWord({ setText, arrchar, setArrchar }) {
    const cancelword = () => { 

    if (!arrchar || arrchar.length === 0) return;
    const trimmed = arrchar.join("").trimEnd();
    const lastSpaceIndex = trimmed.lastIndexOf(" ");
    const newArr = lastSpaceIndex === -1 ? [] : arrchar.slice(0, lastSpaceIndex + 1);
    setArrchar(newArr);
    setText(newArr.join("")); 
  };
    
    
    return (
        <div>
            <button className="letter" onClick={cancelword}>
                ⬅️
            </button>
        </div>
    );
}
export default DeleteWord;