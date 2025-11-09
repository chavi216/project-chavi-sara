import { useState } from "react";
import Keyboard from "./keyboard";
// FindCharBar.jsx

/** מקבל מההורה:
 *  - query: התו שבקלט
 *  - setQuery: פונקציה לעדכון הקלט
 *  - onSearch: פונקציה שמבצעת חיפוש (מקבלת תו אופציונלי)
 */
export default function FindCharBar({ query, setQuery, onSearch }) {
  return (
    <div className="find-bar">
      <input
        className="find-input find-input--tiny"
        type="text"
        dir="ltr"
        value={query}
        onChange={(e) => setQuery(e.target.value.slice(0, 1))}
        onKeyDown={(e) => e.key === "Enter" && onSearch(query)}
        placeholder="ת"
        maxLength={1}
        aria-label="תו לחיפוש"
      />
      <button type="button" className="letter letter--action" onClick={() => onSearch(query)}>
        חפש
      </button>
    </div>
  );
}
