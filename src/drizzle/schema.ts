


import { pgTable, serial, varchar, integer, date } from 'drizzle-orm/pg-core';
import { sql } from 'drizzle-orm';

// Authors Table
export const AuthorsTable = pgTable('authors', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 255 }).notNull(),
  birthdate: date('birthdate')
});


// Books Table
export const BooksTable = pgTable('books', {
  id: serial('id').primaryKey(),
  title: varchar('title', { length: 255 }).notNull(),
  author: varchar('author', { length: 255 }).notNull(), // Changed 'author_id' to 'author'
  year: integer('year').notNull(), // Added 'year' column
 
});

// Define types for insertion and selection
export type TIAuthor = typeof AuthorsTable.$inferInsert;
export type TSAuthor = typeof AuthorsTable.$inferSelect;
export type TIBook = typeof BooksTable.$inferInsert;
export type TSBook = typeof BooksTable.$inferSelect;
