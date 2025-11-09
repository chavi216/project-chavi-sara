import Keyboard from "./keyboard";

function DeleteAll({ setContent }) {
    const clearAll = () => {
        setContent([]);
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
