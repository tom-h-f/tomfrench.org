// Simple IndexedDB wrapper for storing and retrieving Blobs by id

const DB_NAME = "media-cache";
const STORE_NAME = "files";
const DB_VERSION = 1;

function openDB(): Promise<IDBDatabase> {
    return new Promise((resolve, reject) => {
        const req = indexedDB.open(DB_NAME, DB_VERSION);
        req.onupgradeneeded = () => {
            const db = req.result;
            if (!db.objectStoreNames.contains(STORE_NAME)) {
                db.createObjectStore(STORE_NAME);
            }
        };
        req.onsuccess = () => resolve(req.result);
        req.onerror = () => reject(req.error);
    });
}

export async function getCachedBlob(id: string): Promise<Blob | undefined> {
    const db = await openDB();
    return new Promise((resolve, reject) => {
        const tx = db.transaction(STORE_NAME, "readonly");
        const store = tx.objectStore(STORE_NAME);
        const req = store.get(id);
        req.onsuccess = () => {
            resolve(req.result as Blob | undefined);
        };
        req.onerror = () => reject(req.error);
    });
}

export async function cacheBlob(id: string, blob: Blob): Promise<void> {
    const db = await openDB();
    return new Promise((resolve, reject) => {
        const tx = db.transaction(STORE_NAME, "readwrite");
        const store = tx.objectStore(STORE_NAME);
        const req = store.put(blob, id);
        req.onsuccess = () => resolve();
        req.onerror = () => reject(req.error);
    });
}

export async function fetchWithProgress(url: string, onProgress: (loaded: number, total?: number) => void): Promise<Blob> {
    const res = await fetch(url);
    if (!res.ok || !res.body) throw new Error(`Failed to fetch ${url}`);
    const total = Number(res.headers.get("content-length") || undefined);
    const reader = res.body.getReader();
    const chunks: (Uint8Array | ArrayBuffer)[] = [];
    let loaded = 0;
    while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        if (value) {
            chunks.push(value);
            loaded += value.byteLength;
            onProgress(loaded, total || undefined);
        }
    }
    const blob = new Blob(chunks as BlobPart[], { type: res.headers.get("content-type") || "audio/mpeg" });
    return blob;
}
