function DeleteWord({ content, setContent, setHistory }) {
  const cancelWord = () => {
    if (content.length === 0) return;

    setHistory(prev => [...prev, JSON.parse(JSON.stringify(content))]);

    setContent(prev => {
      let updated = [...prev];
      let i = updated.length - 1;

      // מחפשים span שאינו רווח
      while (i >= 0 && updated[i].text === ' ') i--;

      if (i < 0) return updated; // אין מילה למחוק

      // נמחק כל אות עד שהגענו לרווח או להתחלה
      while (i >= 0 && updated[i].text !== ' ') {
        updated.pop();
        i--;
      }

      // אם נשאר span בודד שמכיל אות בלבד לפני רווח, נמחק גם אותו
      while (updated.length > 0 && updated[updated.length - 1].text === ' ') {
        updated.pop();
      }

      return updated;
    });
  };

  return (
    <div>
      <button className="letter" onClick={cancelWord}>
        🔙
      </button>
    </div>
  );
}

export default DeleteWord;