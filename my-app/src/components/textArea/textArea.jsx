import TextApp from "../textApp/textApp";


function TextArea({ text , font , color, size}) {


    return (
        <div className="textArea">
            <textarea
                id="text-area"
                className="text-input"
                rows="10"
                cols="50"
                style={{ fontFamily: `'${font}', sans-serif`, color , fontSize: `${size}px` }}
                value={text}
                readOnly
            />
        </div>
    );


};

export default TextArea;