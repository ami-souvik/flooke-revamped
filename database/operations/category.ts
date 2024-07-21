import { type SQLiteDatabase, SQLiteRunResult } from 'expo-sqlite';
import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';
import { Category, DBCategory } from '../schemas/category';

export async function findCategory(db: SQLiteDatabase): Promise<DBCategory[]> {
  return db.getAllAsync(`SELECT * FROM categories`);
}

export function saveCategory(db: SQLiteDatabase, data: Category): Promise<SQLiteRunResult> {
  return db.runAsync(
    `INSERT INTO categories (id, value) VALUES ("${data.id ? data.id : uuidv4()}", "${data.value}")
      ON CONFLICT(id) DO
      UPDATE
      SET value = excluded.value`,
  );
}

export function deleteCategory(db: SQLiteDatabase, id: string): Promise<SQLiteRunResult> {
  return db.runAsync(`DELETE FROM categories WHERE id = \'${id}\'`);
}

export function insertDefaultCategories(db: SQLiteDatabase) {
  db.runAsync(
    `INSERT INTO categories (id, value) VALUES ("${uuidv4()}", "${String.fromCodePoint(parseInt('1f355', 16))} Food")`,
  );
  db.runAsync(
    `INSERT INTO categories (id, value) VALUES ("${uuidv4()}", "${String.fromCodePoint(parseInt('1f46b', 16))} Social Life")`,
  );
  db.runAsync(
    `INSERT INTO categories (id, value) VALUES ("${uuidv4()}", "${String.fromCodePoint(parseInt('1f436', 16))} Pets")`,
  );
  db.runAsync(
    `INSERT INTO categories (id, value) VALUES ("${uuidv4()}", "${String.fromCodePoint(parseInt('1f68c', 16))} Transport")`,
  );
  db.runAsync(
    `INSERT INTO categories (id, value) VALUES ("${uuidv4()}", "${String.fromCodePoint(parseInt('1f3a8', 16))} Culture")`,
  );
  db.runAsync(
    `INSERT INTO categories (id, value) VALUES ("${uuidv4()}", "${String.fromCodePoint(parseInt('1f6bd', 16))} Household")`,
  );
  db.runAsync(
    `INSERT INTO categories (id, value) VALUES ("${uuidv4()}", "${String.fromCodePoint(parseInt('1f457', 16))} Apparel")`,
  );
  db.runAsync(
    `INSERT INTO categories (id, value) VALUES ("${uuidv4()}", "${String.fromCodePoint(parseInt('1f484', 16))} Beauty")`,
  );
  db.runAsync(
    `INSERT INTO categories (id, value) VALUES ("${uuidv4()}", "${String.fromCodePoint(parseInt('1f34e', 16))} Health")`,
  );
  db.runAsync(
    `INSERT INTO categories (id, value) VALUES ("${uuidv4()}", "${String.fromCodePoint(parseInt('1f4d3', 16))} Education")`,
  );
  db.runAsync(
    `INSERT INTO categories (id, value) VALUES ("${uuidv4()}", "${String.fromCodePoint(parseInt('1f381', 16))} Gift")`,
  );
  db.runAsync(
    `INSERT INTO categories (id, value) VALUES ("${uuidv4()}", "${String.fromCodePoint(parseInt('1f4ad', 16))} Other")`,
  );
}
