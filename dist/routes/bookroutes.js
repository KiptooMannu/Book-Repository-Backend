"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteBook = exports.updateBook = exports.getBooks = exports.addBook = void 0;
const db_1 = require("../drizzle/db");
const schema_1 = require("../drizzle/schema");
const validator_1 = require("../validators/validator");
const addBook = async (c) => {
    try {
        const bookData = await c.req.json();
        await validator_1.bookSchema.validate(bookData);
        const [newBook] = await db_1.db.insert(schema_1.books).values(bookData).returning('*');
        return c.json(newBook, 201);
    }
    catch (error) {
        if (error instanceof Error) {
            return c.json({ error: error.message }, 400);
        }
        return c.json({ error: 'Unknown error occurred' }, 400);
    }
};
exports.addBook = addBook;
const getBooks = async (c) => {
    const bookList = await db_1.db.select().from(schema_1.books);
    return c.json(bookList);
};
exports.getBooks = getBooks;
const updateBook = async (c) => {
    try {
        const id = parseInt(c.req.param('id'), 10);
        const bookData = await c.req.json();
        await validator_1.bookSchema.validate(bookData);
        const [updatedBook] = await db_1.db.update(schema_1.books).set(bookData).where({ id }).returning('*');
        return c.json(updatedBook);
    }
    catch (error) {
        if (error instanceof Error) {
            return c.json({ error: error.message }, 400);
        }
        return c.json({ error: 'Unknown error occurred' }, 400);
    }
};
exports.updateBook = updateBook;
const deleteBook = async (c) => {
    const id = parseInt(c.req.param('id'), 10);
    await db_1.db.delete(schema_1.books).where({ id });
    return c.json({ message: 'Book deleted' });
};
exports.deleteBook = deleteBook;
