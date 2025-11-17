import { useState } from 'react';
import TextArea from "../textArea/textArea";
import Keyboard from "../keyboard/keyboard.jsx";
import FileBar from "../storage/FileBar.jsx";
import { saveDoc } from "../storage/ls.js";

function TextApp() {

    const [docs, setDocs] = useState([
        { id: 1, name: "", content: [] }
    ]);
    const [activeDocId, setActiveDocId] = useState(1);

    const [font, setFont] = useState("Rubik");
    const [color, setColor] = useState("#111111");
    const [size, setSize] = useState(20);
    const [currentDocId, setCurrentDocId] = useState(null);
    const [fileName, setFileName] = useState("");
    const [activeUser, setActiveUser] = useState("user1");


    const activeContent = docs.find(d => d.id === activeDocId)?.content || [];

    const updateActiveDocContent = (updater) => {
        setDocs(prevDocs =>
            prevDocs.map(doc => {
                if (doc.id !== activeDocId) return doc;

                const prevContent = Array.isArray(doc.content) ? doc.content : [];
                const newContent =
                    typeof updater === "function"
                        ? updater(prevContent)
                        : updater;

                return { ...doc, content: newContent };
            })
        );
    };

    const onSaveAs = () => {
        const name = prompt("שם לקובץ (Save As):", fileName || "");
        if (!name || !name.trim()) return;
        try {
            const id = saveDoc({ id: undefined, name: name.trim(), content: activeContent, user: activeUser });
            setCurrentDocId(id);
            setFileName("");
            alert("נשמר כקובץ חדש.");
        } catch (e) {
            alert(e.message);
        }
    };

    const onSave = () => {
        if (!fileName || !fileName.trim()) {
            alert("אנא כתבי שם קובץ או השתמשי ב-'Save As'.");
            onSaveAs();
            return;
        }
        try {
            const id = saveDoc({ id: currentDocId, name: fileName.trim(), content: activeContent, user: activeUser });
            setCurrentDocId(id);
            setFileName("");
            alert("נשמר.");

        } catch (e) {
            alert(e.message);
        }
    };

    const addNewDoc = () => {

        const newId = Date.now();
        setDocs(prev => [...prev, { id: newId, name: "", content: [] }]);
        setActiveDocId(newId);
        setFileName("");
        setCurrentDocId(null);
    };

    const closeDoc = (id) => {
        const docToClose = docs.find(d => d.id === id);
        if (!docToClose) return;

        const shouldSave = window.confirm("לשמור לפני סגירה?");
        if (shouldSave) {
            onSave();
        }

        setDocs(prev => prev.filter(d => d.id !== id));

        if (id === activeDocId && docs.length > 1) {
            const remaining = docs.filter(d => d.id !== id);
            setActiveDocId(remaining[0].id);
        }
    };

    const handleOpenDocFromStorage = (loadedDoc) => {
        const safeContent = Array.isArray(loadedDoc.content) ? loadedDoc.content : [];

        setDocs(prev => {
            const exists = prev.some(d => d.id === loadedDoc.id);
            if (exists) {
                return prev.map(d =>
                    d.id === loadedDoc.id
                        ? { ...d, name: loadedDoc.name, content: safeContent }
                        : d
                );
            }
            return [...prev, { id: loadedDoc.id, name: loadedDoc.name, content: safeContent }];
        });

        setActiveDocId(loadedDoc.id);
        setCurrentDocId(loadedDoc.id);
        setFileName("");

    };

    const switchUser = (user) => {
        setActiveUser(user);
        setDocs([]);
        setActiveDocId(null);
        setCurrentDocId(null);
        setFileName("");
    };

    return (
        <div>
            <div className="user-switch">
                <button
                    onClick={() => switchUser("user1")}
                    className={`user-btn ${activeUser === "user1" ? "user-btn--active" : ""}`}
                >
                    משתמש 1
                </button>

                <button
                    onClick={() => switchUser("user2")}
                    className={`user-btn ${activeUser === "user2" ? "user-btn--active" : ""}`}
                >
                    משתמש 2
                </button>

                <button
                    onClick={() => switchUser("user3")}
                    className={`user-btn ${activeUser === "user3" ? "user-btn--active" : ""}`}
                >
                    משתמש 3
                </button>
            </div>



            <FileBar
                user={activeUser}
                currentDocId={currentDocId}
                setCurrentDocId={setCurrentDocId}
                fileName={fileName}
                setFileName={setFileName}
                onSave={onSave}
                onSaveAs={onSaveAs}
                onOpenDoc={handleOpenDocFromStorage}  // 👈 זה מה שמונע "דריסה"
            />

            <button
                onClick={addNewDoc}
                className="new-doc-btn"
            >
                מסמך חדש
            </button>

            <div className="textAreasContainer">
                {docs.map(doc => (
                    <div
                        key={doc.id}
                        className={`textAreaWrapper ${doc.id === activeDocId ? "active" : ""}`}
                        onClick={() => setActiveDocId(doc.id)}
                    >
                        <div className="docTitle">
                            {doc.name}
                        </div>
                        <button onClick={(e) => { e.stopPropagation(); closeDoc(doc.id); }}>
                            ✖
                        </button>

                        <TextArea
                            content={doc.content}
                            font={font}
                            color={color}
                            size={size}
                        />
                    </div>
                ))}
            </div>

            <Keyboard
                content={activeContent}
                setContent={updateActiveDocContent}
                font={font}
                setFont={setFont}
                color={color}
                setColor={setColor}
                size={size}
                setSize={setSize}
            />
        </div>
    );
}

export default TextApp;
