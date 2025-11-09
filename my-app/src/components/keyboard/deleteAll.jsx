function DeleteAll({ content, setContent, setHistory }) {
    const clearAll = () => {
        setHistory(prev => [...prev, content]); // <-- שומרים את המצב הנוכחי
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
