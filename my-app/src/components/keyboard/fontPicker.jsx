import { useState } from "react";
import "../styles/FontPicker.css";

function FontPicker({ value, onChange }) {
  const fonts = ["Rubik","Amatic SC","Playfair Display","Permanent Marker", "Courier Prime",];
  const [isOpen, setIsOpen] = useState(false);

  const handleSelect = (font) => {
    onChange(font);
    setIsOpen(false);
  };

  return (
    <div className="letter font-picker">
      <div
        className="font-picker-display"onClick={() => setIsOpen(!isOpen)}>
        {value || "בחר גופן"} ▼
      </div>

      {isOpen && (
        <ul className="font-picker-list">
          {fonts.map((font) => (
            <li
              key={font}
              onClick={() => handleSelect(font)}
              style={{ fontFamily: font }}
            >
              {font}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default FontPicker;
