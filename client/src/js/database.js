import { openDB } from 'idb';

const initdb = async () => {
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jateStore', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });
};

export const putDb = async (content) => {
  console.log("PUT to the database");
  const jateDb = await openDB('jate', 1);
  const readWrite = jateDb.transaction('jate', 'readwrite');
  const jateStore = readWrite.objectStore('jateStore');
  const request = jateStore.add({ jate: content });
  const result = await request;
  console.log('Post to DB successful.', result);
  console.error('putDb not implemented')
};

export const getDb = async () => {
  console.log("GET all from the database");
  const jateDb = await openDB('jate', 1);
  const readWrite = jateDb.transaction('jate', 'readonly');
  const jateStore = readWrite.objectStore('jateStore');
  const request = jateStore.getAll();
  const result = await request;
  console.log('result.value', result);
  console.error('getDb not implemented');
  return result;
};

initdb();
