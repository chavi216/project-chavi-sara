function DeleteChar({ content, setContent, setHistory }) {
  const cancelChar = () => {

    setHistory(prev => [...prev, content]);

    if (content.length === 0) return;

    setContent(prev => prev.slice(0, -1));
  };

  return (
    <button className="letter" onClick={cancelChar}>
      ⌫
    </button>
  );
}

export default DeleteChar;