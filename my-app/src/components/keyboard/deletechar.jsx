import Keyboard from "./keyboard";


function Deletchar({ setContent }) {


    const cancelechar = () => {
        setContent(prevContent => {
            if (prevContent.length === 0) return [];

            const updated = [...prevContent];
            let lastPart = { ...updated[updated.length - 1] };
            const chars = Array.from(lastPart.text);

            if (chars.length === 1) {
                updated.pop();
            } else {
                chars.pop();
                lastPart.text = chars.join("");
                updated[updated.length - 1] = lastPart;
            }


            return updated;
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