// src/storage/ls.js

const NAMESPACE = "myTextEditorDocs"; // מפתח מרכזי ב-LS

function readAll() {
  try {
    const raw = localStorage.getItem(NAMESPACE);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function writeAll(docs) {
  localStorage.setItem(NAMESPACE, JSON.stringify(docs));
}

export function listDocs() {
  return readAll()
    .sort((a, b) => b.updatedAt - a.updatedAt)
    .map(d => ({ id: d.id, name: d.name, updatedAt: d.updatedAt }));
}

export function getDocByName(name) {
  return readAll().find(d => d.name === name) || null;
}

export function saveDoc({ id, name, content }) {
  const docs = readAll();
  const now = Date.now();

  if (id) {
    // עדכון קיים לפי id;
    const i = docs.findIndex(d => d.id === id);
    if (i !== -1) {
      docs[i] = { ...docs[i], name, content, updatedAt: now };
    } else {
      docs.push({ id, name, content, updatedAt: now });
    }
  } else {
    // חדש: בודקים התנגשות שמות
    if (docs.some(d => d.name === name)) {
      throw new Error("שם קובץ כבר קיים. השתמשי ב-'Save As' או בחרי שם אחר.");
    }
    const newId = String(now) + "-" + Math.random();
    docs.push({ id: newId, name, content, updatedAt: now });
  }

  writeAll(docs);
  return id; // מחזיר id לטובת המשך עבודה
}


