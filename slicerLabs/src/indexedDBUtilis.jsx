// indexedDBUtils.js

const DB_NAME = "3DFilesDB";
const STORE_NAME = "3DFilesStore";

// Function to open the IndexedDB database
const openDB = () => {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, 1);

    request.onerror = () => {
      console.error("Error opening database:", request.error);
      reject(request.error);
    };

    request.onsuccess = () => {
      const db = request.result;
      resolve(db);
    };

    request.onupgradeneeded = () => {
      const db = request.result;
      db.createObjectStore(STORE_NAME, { keyPath: "id" });
    };
  });
};

// Function to convert a File object to base64 string
export const fileToBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result.split(",")[1]);
    reader.onerror = (error) => reject(error);
  });
};

// Function to convert a base64 string back to a File object
export const base64ToFile = (base64String, fileName, mimeType) => {
  const byteString = atob(base64String);
  const ab = new ArrayBuffer(byteString.length);
  const ia = new Uint8Array(ab);
  for (let i = 0; i < byteString.length; i++) {
    ia[i] = byteString.charCodeAt(i);
  }
  const blob = new Blob([ab], { type: mimeType });
  return new File([blob], fileName, { type: mimeType });
};

// Function to store a 3D file in IndexedDB
// export const storeFileInDB = async (file, modelId) => {
//   const db = await openDB();
//   const transaction = db.transaction(STORE_NAME, "readwrite");
//   const store = transaction.objectStore(STORE_NAME);
//   console.log(file);
//   const fileWithModelId = {
//     id: modelId,
//     file,
//   };
//   return new Promise((resolve, reject) => {
//     // Make sure the modelId is present and set it as the key path
//     if (!modelId) {
//       reject(new Error("ModelId is required."));
//       return;
//     }

//     // Modify the file object to include the modelId

//     const request = store.add(fileWithModelId);

//     request.onsuccess = () => {
//       console.log("File stored in IndexedDB:", fileWithModelId);
//       resolve();
//     };

//     request.onerror = () => {
//       console.error("Error storing file in IndexedDB:", request.error);
//       reject(request.error);
//     };
//   });
// };
export const storeFileInDB = async (file, modelId) => {
  const db = await openDB();
  const transaction = db.transaction(STORE_NAME, "readwrite");
  const store = transaction.objectStore(STORE_NAME);

  // Make sure the modelId is present
  if (!modelId) {
    throw new Error("ModelId is required.");
  }

  const fileWithModelId = {
    id: modelId, // Use the model ID as the file ID
    modelId, // Include the model ID in the file entry
    file,
  };

  return new Promise((resolve, reject) => {
    const request = store.add(fileWithModelId);

    request.onsuccess = () => {
      // console.log("File stored in IndexedDB:", fileWithModelId);
      resolve();
    };

    request.onerror = () => {
      console.error("Error storing file in IndexedDB:", request.error);
      reject(request.error);
    };
  });
};

// Function to delete a 3D file from IndexedDB by its ID
export const deleteFileFromDB = async (fileId) => {
  const db = await openDB();

  return new Promise((resolve, reject) => {
    const transaction = db.transaction(STORE_NAME, "readwrite");
    const store = transaction.objectStore(STORE_NAME);

    const request = store.delete(fileId);

    request.onsuccess = () => {
      // console.log("File deleted from IndexedDB:", fileId);
      resolve();
    };

    request.onerror = (event) => {
      console.error("Error deleting file from IndexedDB:", event.target.error);
      reject(event.target.error);
    };
  });
};

export const countItemsInDB = async () => {
  const db = await openDB();
  const transaction = db.transaction(STORE_NAME, "readonly");
  const store = transaction.objectStore(STORE_NAME);

  const request = store.openCursor();
  let count = 0;

  return new Promise((resolve, reject) => {
    request.onsuccess = (event) => {
      const cursor = event.target.result;
      if (cursor) {
        count++;
        cursor.continue();
      } else {
        resolve(count);
      }
    };

    request.onerror = (event) => {
      console.error("Error counting items in IndexedDB:", event.target.error);
      reject(event.target.error);
    };
  });
};

// Function to delete all records from IndexedDB
export const deleteAllRecordsFromDB = async () => {
  const db = await openDB();
  const transaction = db.transaction(STORE_NAME, "readwrite");
  const store = transaction.objectStore(STORE_NAME);

  return new Promise((resolve, reject) => {
    const request = store.clear();

    request.onsuccess = () => {
      // console.log("All records deleted from IndexedDB.");
      resolve();
    };

    request.onerror = () => {
      console.error("Error deleting records from IndexedDB:", request.error);
      reject(request.error);
    };
  });
};

// Function to get all files from IndexedDB
export const getAllFilesFromDB = async () => {
  const db = await openDB();
  const transaction = db.transaction(STORE_NAME, "readonly");
  const store = transaction.objectStore(STORE_NAME);

  return new Promise((resolve, reject) => {
    const request = store.getAll();

    request.onsuccess = () => {
      const filesData = request.result;
      resolve(filesData);
    };

    request.onerror = () => {
      console.error("Error getting files from IndexedDB:", request.error);
      reject(request.error);
    };
  });
};

export const getFileById = async (id) => {
  try {
    const db = await openDB();
    const transaction = db.transaction(STORE_NAME, "readonly");
    const store = transaction.objectStore(STORE_NAME);
    const file = await store.get(id);
    console.log(`file with ID ${id} retrieved successfully`);
    return file;
  } catch (error) {
    console.error("Error retrieving file by ID:", error);
    return null;
  }
};