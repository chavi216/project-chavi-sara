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

export function listDocs(user) {
  return readAll()
    .filter(d => d.user === user) 
    .sort((a, b) => b.updatedAt - a.updatedAt);
}


export function getDocByName(name, user) {
  return readAll().find(d => d.name === name && d.user === user) || null;
}


export function saveDoc({ id, name, content, user }) {
  const docs = readAll();
  const now = Date.now();
  let finalId = id;

  if (id) {
    const i = docs.findIndex(d => d.id === id && d.user === user);  
    if (i !== -1) {
      docs[i] = { ...docs[i], name, content, updatedAt: now,user };
    } else {
      docs.push({ id, name, content, updatedAt: now, user });
    }
  } else {
    if (docs.some(d => d.name === name && d.user === user)) {
      throw new Error("שם קובץ כבר קיים. השתמשי ב-'Save As' או בחרי שם אחר.");
    }
    finalId = String(now) + "-" + Math.random();
    docs.push({ id: finalId, name, content, updatedAt: now, user });
  }
  writeAll(docs);
  return finalId; 
}



