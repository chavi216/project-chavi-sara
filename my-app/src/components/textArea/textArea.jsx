function TextArea({ content=[], font, color, size }) {


    return (
        <div className="textArea" style={{rows: "3", cols: "5", border: "1px solid #000000ff"}}>
            {content.map((part, i) => (
                <span key={i} style={part.style}>
                    {part.text}
                </span>
            ))}
        </div>
    );
};

export default TextArea;