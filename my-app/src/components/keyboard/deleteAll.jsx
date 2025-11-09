import Keyboard from "./keyboard";

function DeleteAll({ setText }) {
    const clearAll = () => {
        setText("");
    };

    return (
        <div>
            <button className="letter" onClick={clearAll}>
                🗑️
            </button>
        </div>
    );
}

export default DeleteAll;
