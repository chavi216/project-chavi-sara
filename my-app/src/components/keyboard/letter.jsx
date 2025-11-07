import TextArea from "../textArea/textArea";

function Letter({ char, handleletterclick }) {
  return (
    <button className="letter" type="button" onClick={handleletterclick}>
      {char}
    </button>
  );
}

export default Letter;