import { db } from '../drizzle/db';
import { BooksTable } from '../drizzle/schema'; 
import { eq } from 'drizzle-orm';

export const getBooks = async () => {
    return await db.select().from(BooksTable);
}

export const createBook = async (book: any) => {
    return await db.insert(BooksTable).values(book).returning();
}

export const updateBook = async (id: number, book: any) => {
    if (!book || Object.keys(book).length === 0) {
        throw new Error('No values to set');
    }

    return await db.update(BooksTable).set(book).where(eq(BooksTable.id, id)).returning();
}

export const deleteBook = async (id: number) => {
    return await db.delete(BooksTable).where(eq(BooksTable.id, id)).returning();
}
