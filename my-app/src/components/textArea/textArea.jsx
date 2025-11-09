import TextApp from "../textApp/textApp";


function TextArea({ content, font, color, size }) {


    return (
        <div className="textArea" style={{rows: "10", cols: "50", border: "1px solid #000000ff"}}>
            {/* <textarea
                id="text-area"
                className="text-input"
                rows="10"
                cols="50"
                style={{ fontFamily: `'${font}', sans-serif`, color , fontSize: `${size}px` }}
                value={text}
                readOnly
            /> */}
            {content.map((part, i) => (
                <span key={i} style={part.style}>
                    {part.text}
                </span>
            ))}
        </div>


    );


};

export default TextArea;