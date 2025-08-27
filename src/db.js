import { openDB } from "idb"

export const initDB = async() => {
  return openDB('db1', 1, {
    upgrade(db){
      if (!db.objectStoreNames.contains('todos')) {
        db.createObjectStore("todos", { keyPath: 'id', autoIncrement: true })
      }

      if (!db.objectStoreNames.contains("pending")) {
        db.createObjectStore("pending", { keyPath: "id", autoIncrement: true });
      }
    }
  })
}

export const saveTodo = async (newTodo) => {
  const db = await initDB();
  await db.add("todos", { todo: newTodo });
};

export const getTodos = async () => {
  const db = await initDB();
  return db.getAll("todos");
};

export const savePending = async (action) => {
  const db = await initDB();
  await db.add("pending", {todo: action});
};

export const getPending = async () => {
  const db = await initDB();
  return db.getAll("pending");
};

export const clearPending = async (id) => {
  const db = await initDB();
  await db.delete("pending", id);
};