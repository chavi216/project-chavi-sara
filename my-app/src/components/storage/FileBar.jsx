import { useState } from "react";
import { listDocs, getDocByName } from "../storage/ls.js";

export default function FileBar({
    user,
  currentDocId,
  setCurrentDocId,
  fileName,
  setFileName,
  onSave,
  onSaveAs,
  onOpenDoc        
}) {

  const [isOpenList, setIsOpenList] = useState(false);
  const [docs, setDocs] = useState([]);

  const refreshList = () => setDocs(listDocs(user));

  const onOpenClick = () => {
    refreshList();
    setIsOpenList(true);
  };

  const onOpenByName = (name) => {
    const doc = getDocByName(name, user);
    if (!doc) return;
    onOpenDoc(doc);      // ⭐ במקום setContent
    setIsOpenList(false);
  };

  return (
    <div className="filebar">
      <input
        placeholder="שם קובץ…"
        value={fileName}
        onChange={(e) => setFileName(e.target.value)}
        className="filebar__name-input"
        dir="auto"
      />

      <button onClick={onSave} className="btn btn--primary">Save</button>
      <button onClick={onSaveAs} className="btn btn--ghost">Save As</button>
      <button onClick={onOpenClick} className="btn">Open</button>

      {isOpenList && (
        <div className="filebar__open-panel">
          <div className="filebar__open-header">
            <strong className="filebar__open-title">קבצים ב-LocalStorage</strong>
            <button className="filebar__list-close" onClick={() => setIsOpenList(false)}>
              ✖
            </button>
          </div>

          {docs.length === 0 && <div>אין קבצים שמורים.</div>}

          {docs.map(d => (
            <div key={d.id} className="filebar__doc">
              <button className="filebar__doc-name" onClick={() => onOpenByName(d.name)}>
                {d.name}
              </button>
              <small className="filebar__doc-time">
                {new Date(d.updatedAt).toLocaleString()}
              </small>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
