import sqlite3 from 'sqlite3';
import { Database, open } from 'sqlite';

let db: Database | null = null;

const getDatabase = async () => {
  if (db) {
    return db;
  }

  db = await open({
    filename: 'test.db',
    driver: sqlite3.Database,
  });

  // Hook migrations to setup schema if is not exists
  await db.migrate();

  return db;
};

export default getDatabase;
