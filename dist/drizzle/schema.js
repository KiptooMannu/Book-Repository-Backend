"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserBooksTable = exports.UsersTable = exports.BooksTable = exports.CategoriesTable = exports.AuthorsTable = void 0;
const pg_core_1 = require("drizzle-orm/pg-core");
const drizzle_orm_1 = require("drizzle-orm");
// Authors Table
exports.AuthorsTable = (0, pg_core_1.pgTable)('authors', {
    id: (0, pg_core_1.serial)('id').primaryKey(),
    name: (0, pg_core_1.varchar)('name', { length: 255 }).notNull(),
    birthdate: (0, pg_core_1.date)('birthdate')
});
// Categories Table
exports.CategoriesTable = (0, pg_core_1.pgTable)('categories', {
    id: (0, pg_core_1.serial)('id').primaryKey(),
    name: (0, pg_core_1.varchar)('name', { length: 100 }).notNull()
});
// Books Table
exports.BooksTable = (0, pg_core_1.pgTable)('books', {
    id: (0, pg_core_1.serial)('id').primaryKey(),
    title: (0, pg_core_1.varchar)('title', { length: 255 }).notNull(),
    author: (0, pg_core_1.varchar)('author', { length: 255 }).notNull(), // Changed 'author_id' to 'author'
    year: (0, pg_core_1.integer)('year').notNull(), // Added 'year' column
    category_id: (0, pg_core_1.integer)('category_id').notNull().references(() => exports.CategoriesTable.id, { onDelete: 'cascade' }),
    published_date: (0, pg_core_1.date)('published_date'),
    isbn: (0, pg_core_1.varchar)('isbn', { length: 13 }).notNull().unique(),
    pages: (0, pg_core_1.integer)('pages')
});
// Users Table (if managing user accounts)
exports.UsersTable = (0, pg_core_1.pgTable)('users', {
    id: (0, pg_core_1.serial)('id').primaryKey(),
    fullname: (0, pg_core_1.varchar)('full_name', { length: 255 }),
    email: (0, pg_core_1.varchar)('email', { length: 100 }).notNull(),
    created_at: (0, pg_core_1.date)('created_at').default((0, drizzle_orm_1.sql) `CURRENT_TIMESTAMP`),
    updated_at: (0, pg_core_1.date)('updated_at').default((0, drizzle_orm_1.sql) `CURRENT_TIMESTAMP`)
});
// User and Book Relationship (example)
exports.UserBooksTable = (0, pg_core_1.pgTable)('user_books', {
    id: (0, pg_core_1.serial)('id').primaryKey(),
    user_id: (0, pg_core_1.integer)('user_id').notNull().references(() => exports.UsersTable.id, { onDelete: 'cascade' }),
    book_id: (0, pg_core_1.integer)('book_id').notNull().references(() => exports.BooksTable.id, { onDelete: 'cascade' }),
    borrowed_date: (0, pg_core_1.date)('borrowed_date').notNull(),
    return_date: (0, pg_core_1.date)('return_date')
});
