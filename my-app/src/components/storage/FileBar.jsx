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
                        <button className="filebar__list-close" onClick={() => setIsOpenList(false)}>✖</button>
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
