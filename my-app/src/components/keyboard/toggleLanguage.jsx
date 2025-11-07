import Keyboard from "./keyboard";  
export default function ToggleLanguage({toggleLanguage}) {
  return (
    <div className="toggle-language">
     <button className="letter" onClick={toggleLanguage}>
      🌐
    </button>
    </div>
  );
}