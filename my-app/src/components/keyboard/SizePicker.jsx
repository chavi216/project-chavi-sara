import { useState } from "react";
import "../styles/SizePicker.css";

const SIZES = [
  { label: "קטן", size: 14 },
  { label: "בינוני", size: 20 },
  { label: "גדול", size: 28 },
];

function SizePicker({ value, onChange }) {
  const [open, setOpen] = useState(false);
  const current = SIZES.find(s => s.size === value) || SIZES[1];

  const handleSelect = (size) => {
    onChange?.(size);
    setOpen(false);
  };

  return (
    <div className="size-picker">
      <div className="size-picker-display" onClick={() => setOpen(o => !o)}>
        <span className="size-swatch" style={{ fontSize: `${current.size}px` }}>
          {current.label}
        </span>
        <span className="caret" aria-hidden>▾</span>
      </div>

      {open && (
        <ul className="size-picker-list">
          {SIZES.map(({ label, size }) => (
            <li
              key={label}
              className={`size-item ${value === size ? "selected" : ""}`}
              onClick={() => handleSelect(size)}
            >
              <span className="size-swatch" style={{ fontSize: `${size}px` }}>
                {label}
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default SizePicker;
