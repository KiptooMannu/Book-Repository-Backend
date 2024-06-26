import 'dotenv/config';
import { db } from './db';
import { sql } from 'drizzle-orm';

async function migrate() {
  console.log('======== Migrations started ========');

  try {
    // Create authors table if not exists
    await db.execute(sql`
      CREATE TABLE IF NOT EXISTS authors (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        birthdate DATE
      );
    `);

    // Create books table if not exists
    await db.execute(sql`
      CREATE TABLE IF NOT EXISTS books (
        id SERIAL PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        author_id INT REFERENCES authors(id) ON DELETE CASCADE,
        year INT NOT NULL
      );
    `);

    console.log('======== Migrations completed ========');
  } catch (err) {
    const error = err as Error; // Cast error to Error type
    console.error('Migration error:', error.message);
  } finally {
    process.exit(0);
  }
}

migrate().catch((err) => {
  const error = err as Error; // Cast error to Error type
  console.error('Migration error:', error.message);
  process.exit(1);
});
