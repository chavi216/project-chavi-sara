
import { useState } from "react";
import "../styles/ColorPicker.css";


const COLORS = [
  { value: "#111111" },
  { value: "#ec3608ff" }, 
  { value: "#eeee2cff" }, 
  { value: "#2bb02dff" }, 
  { value: "#5170b7ff" }, 
];

function ColorPicker({ value, onChange }) {
  const [open, setOpen] = useState(false);
  const current = COLORS.find(c => c.value === value) || COLORS[0];

  const handleSelect = (hex) => {
    onChange?.(hex);
    setOpen(false);
  };

  return (
    <div className="color-picker">
      <div className="color-picker-display" onClick={() => setOpen(o => !o)} title="color">
        <span className="color-dot" style={{ backgroundColor: current.value }} />
        <span aria-hidden>▾</span>
      </div>

      {open && (
        <ul className="color-picker-list">
          {COLORS.map(({ label, value: hex }) => (
            <li
              key={hex}
              className={`color-item ${value === hex ? "selected" : ""}`}
              onClick={() => handleSelect(hex)}
              title={label}
            >
              <span className="color-dot" style={{ backgroundColor: hex }} />
              <span className="color-name">{label}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default ColorPicker;
