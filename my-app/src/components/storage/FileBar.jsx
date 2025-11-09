// src/components/FileBar.jsx
import { useState } from "react";
import { listDocs, saveDoc, getDocByName } from "../storage/ls.js";

export default function FileBar({ currentDocId, setCurrentDocId, content, setContent, fileName, setFileName }) {
  const [isOpenList, setIsOpenList] = useState(false);
  const [docs, setDocs] = useState([]);

  const refreshList = () => setDocs(listDocs());

  const onSave = () => {
    if (!fileName || !fileName.trim()) {
      alert("אנא כתבי שם קובץ או השתמשי ב-'Save As'.");
      return;
    }
    try {
      const id = saveDoc({ id: currentDocId, name: fileName.trim(), content });
      setCurrentDocId(id);
      alert("נשמר.");
    } catch (e) {
      alert(e.message);
    }
  };

  const onSaveAs = () => {
    const name = prompt("שם לקובץ (Save As):", fileName || "");
    if (!name || !name.trim()) return;
    try {
      const id = saveDoc({ id: undefined, name: name.trim(), content });
      setFileName(name.trim());
      setCurrentDocId(id);
      alert("נשמר כקובץ חדש.");
    } catch (e) {
      alert(e.message);
    }
  };

  const onOpenClick = () => {
    refreshList();
    setIsOpenList(true);
  };

  const onOpenByName = (name) => {
    const doc = getDocByName(name);
    if (!doc) return;
    setContent(doc.content);
    setFileName(doc.name);
    setCurrentDocId(doc.id);
    setIsOpenList(false);
  };

  return (
    <div className="flex items-center gap-2 p-2 border-b">
      <input
        placeholder="שם קובץ…"
        value={fileName}
        onChange={(e) => setFileName(e.target.value)}
        className="border px-2 py-1 rounded min-w-48"
        dir="auto"
      />
      <button onClick={onSave} className="px-3 py-1 border rounded">Save</button>
      <button onClick={onSaveAs} className="px-3 py-1 border rounded">Save As</button>
      <button onClick={onOpenClick} className="px-3 py-1 border rounded">Open</button>

      {isOpenList && (
        <div className="absolute mt-40 bg-white border rounded shadow p-2 max-h-64 overflow-auto">
          <div className="flex justify-between items-center mb-2">
            <strong>קבצים ב-LocalStorage</strong>
            <button onClick={() => setIsOpenList(false)}>✖</button>
          </div>
          {docs.length === 0 && <div>אין קבצים שמורים.</div>}
          {docs.map(d => (
            <div key={d.id} className="flex justify-between items-center gap-2 py-1">
              <button className="underline" onClick={() => onOpenByName(d.name)}>
                {d.name}
              </button>
              <small>{new Date(d.updatedAt).toLocaleString()}</small>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
