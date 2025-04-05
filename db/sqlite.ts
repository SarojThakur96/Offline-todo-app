import * as SQLite from "expo-sqlite";

export interface Todo {
  id: number;
  title: string;
  description: string;
}

// Adjusted to match SQLiteProvider's onInit signature
export const initDB = async (db: SQLite.SQLiteDatabase): Promise<void> => {
  await db.execAsync(`
    PRAGMA journal_mode = WAL;
    CREATE TABLE IF NOT EXISTS todos (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      description TEXT
    );
  `);

  console.log("Database initialized");
};

export const addTodo = async (
  db: SQLite.SQLiteDatabase,
  title: string,
  description: string
): Promise<number> => {
  const result = await db.runAsync(
    "INSERT INTO todos (title, description) VALUES (?, ?)",
    [title, description]
  );
  return result.lastInsertRowId;
};

export const getTodos = async (db: SQLite.SQLiteDatabase): Promise<Todo[]> => {
  const todos = await db.getAllAsync<Todo>("SELECT * FROM todos");
  return todos;
};

export const updateTodo = async (
  db: SQLite.SQLiteDatabase,
  id: number,
  title: string,
  description: string
): Promise<void> => {
  await db.runAsync(
    "UPDATE todos SET title = ?, description = ? WHERE id = ?",
    [title, description, id]
  );
};

export const deleteTodo = async (
  db: SQLite.SQLiteDatabase,
  id: number
): Promise<void> => {
  await db.runAsync("DELETE FROM todos WHERE id = ?", [id]);
};
