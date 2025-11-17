import { useState } from "react";

export default function FindChar({ content }) {
  const [query, setQuery] = useState("");

  const handleSearch = () => {
    const char = query.slice(0, 1);
    if (!char) {
      alert("אנא הזן תו לחיפוש");
      return;
    }

    // ✅ הופכים את התו המבוקש לאות קטנה
    const lowerChar = char.toLowerCase();

    let total = 0;

    content.forEach((item) => {
      const text = item.text || item.props?.children?.toString() || "";

      // ✅ עוברים על כל תו בטקסט ומשווים כשהכול באותיות קטנות
      for (const c of text) {
        if (c.toLowerCase() === lowerChar) total++;
      }
    });

    if (total > 0) {
      alert(`התו "${char}" הופיע ${total} פעמים (כולל גדולות וקטנות)`);
    } else {
      alert(`התו "${char}" לא מופיע`);
    }

    setQuery("");
  };

  return (
    <div className="find-bar">
      <input
        className="find-input find-input--tiny"
        type="text"
        dir="ltr"
        value={query}
        onChange={(e) => setQuery(e.target.value.slice(0, 1))}
        onKeyDown={(e) => e.key === "Enter" && handleSearch()}
        placeholder="letter"
        maxLength={1}
      />
      <button
        type="button"
        className="letter letter--action"
        onClick={handleSearch}
      >
        חפש
      </button>
    </div>
  );
}