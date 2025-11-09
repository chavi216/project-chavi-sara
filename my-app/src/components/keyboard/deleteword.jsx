function DeleteWord({ content, setContent }) {
  const cancelword = () => {
    setContent(prev => {
      if (prev.length === 0) return [];

      const updated = [...prev];
      let lastPart = { ...updated[updated.length - 1] };
      let text = lastPart.text.trimEnd();

      const lastSpaceIndex = text.lastIndexOf(' ');

      if (lastSpaceIndex === -1) {
        updated.pop();
      } else {
        text = text.slice(0, lastSpaceIndex);
        lastPart.text = text;
        updated[updated.length - 1] = lastPart;
      }

      return updated;
    });
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
