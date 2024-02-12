// indexedDBUtils.js

const DB_NAME = "imageDB";
const STORE_NAME = "images";

// Open database
const openDatabase = () => {
  return new Promise((resolve, reject) => {
    const request = window.indexedDB.open(DB_NAME, 1);

    request.onerror = () => {
      console.error("Failed to open database.");
      reject("Failed to open database.");
    };

    request.onsuccess = () => {
      const db = request.result;
      resolve(db);
    };

    request.onupgradeneeded = (event) => {
      const db = event.target.result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        const store = db.createObjectStore(STORE_NAME, { keyPath: "id" });
        store.createIndex("id", "id", { unique: true });
      }
    };
  });
};

// Store image in IndexedDB
export const storeImage = async (id, imagefile) => {
  const db = await openDatabase();
  const transaction = db.transaction(STORE_NAME, "readwrite");
  const store = transaction.objectStore(STORE_NAME);

  // Make sure the modelId is present
  if (!id) {
    throw new Error("ModelId is required.");
  }

  const imageObject = { id, imagefile };

  return new Promise((resolve, reject) => {
    const request = store.add(imageObject);

    request.onsuccess = () => {
      // console.log("File stored in IndexedDB:", id, imageUrl);
      resolve();
    };

    request.onerror = () => {
      console.error("Error storing file in IndexedDB:", request.error);
      reject(request.error);
    };
  });
};

// Delete specific image from IndexedDB
export const deleteImageFromIndexDB = async (id) => {
  const db = await openDatabase();

  return new Promise((resolve, reject) => {
    const transaction = db.transaction(STORE_NAME, "readwrite");
    const store = transaction.objectStore(STORE_NAME);

    const request = store.delete(`image${id}`);

    request.onsuccess = () => {
      console.log("File deleted from IndexedDB:", `image${id}`);
      resolve();
    };

    request.onerror = (event) => {
      console.error("Error deleting file from IndexedDB:", event.target.error);
      reject(event.target.error);
    };
  });
};

// Delete all images from IndexedDB
export const deleteAllImages = async () => {
  const db = await openDatabase();
  const transaction = db.transaction(STORE_NAME, "readwrite");
  const store = transaction.objectStore(STORE_NAME);

  return new Promise((resolve, reject) => {
    const request = store.clear();

    request.onsuccess = () => {
      console.log("All image records deleted from IndexedDB.");
      resolve();
    };

    request.onerror = () => {
      console.error("Error deleting records from IndexedDB:", request.error);
      reject(request.error);
    };
  });
};

export const getImageById = async (id) => {
  try {
    const db = await openDatabase();
    const transaction = db.transaction(STORE_NAME, "readonly");
    const store = transaction.objectStore(STORE_NAME);
    const image = await store.get(id);
    console.log(`image with ID ${id} retrieved successfully`);
    return image;
  } catch (error) {
    console.error("Error retrieving image by ID:", error);
    return null;
  }
};

// Retrieve all images from IndexedDB
export const getAllImages = async () => {
  const db = await openDatabase();
  const transaction = db.transaction(STORE_NAME, "readonly");
  const store = transaction.objectStore(STORE_NAME);

  return new Promise((resolve, reject) => {
    const request = store.getAll();

    request.onsuccess = () => {
      const filesData = request.result;
      console.log(filesData)
      resolve(filesData);
    };

    request.onerror = () => {
      console.error("Error getting files from IndexedDB:", request.error);
      reject(request.error);
    };
  });
};
