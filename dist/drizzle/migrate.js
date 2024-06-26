"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const db_1 = require("./db");
const drizzle_orm_1 = require("drizzle-orm");
// Migration function using raw SQL queries
async function migration() {
    console.log('======== Migrations started ========');
    try {
        // Create authors table
        await db_1.db.execute((0, drizzle_orm_1.sql) `
      CREATE TABLE IF NOT EXISTS authors (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        birthdate DATE
      );
    `);
        // Create books table
        await db_1.db.execute((0, drizzle_orm_1.sql) `
      CREATE TABLE IF NOT EXISTS books (
        id SERIAL PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        author_id INT REFERENCES authors(id) ON DELETE CASCADE,
        category_id INT REFERENCES categories(id) ON DELETE CASCADE,
        published_date DATE,
        isbn VARCHAR(13) UNIQUE NOT NULL,
        pages INT
      );
    `);
        // Create users table
        await db_1.db.execute((0, drizzle_orm_1.sql) `
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        full_name TEXT,
        email VARCHAR(100) NOT NULL,
        created_at DATE DEFAULT CURRENT_TIMESTAMP,
        updated_at DATE DEFAULT CURRENT_TIMESTAMP
      );
    `);
        // Create user_books table
        await db_1.db.execute((0, drizzle_orm_1.sql) `
      CREATE TABLE IF NOT EXISTS user_books (
        id SERIAL PRIMARY KEY,
        user_id INT REFERENCES users(id) ON DELETE CASCADE,
        book_id INT REFERENCES books(id) ON DELETE CASCADE,
        borrowed_date DATE NOT NULL,
        return_date DATE
      );
    `);
        console.log('======== Migrations completed ========');
    }
    catch (err) {
        const error = err; // Cast error to Error type
        console.error('Migration error:', error.message);
    }
    finally {
        process.exit(0);
    }
}
migration().catch((err) => {
    const error = err; // Cast error to Error type
    console.error('Migration error:', error.message);
    process.exit(1);
});
