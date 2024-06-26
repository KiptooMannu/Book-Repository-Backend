import { db } from '../drizzle/db';
import { AuthorsTable } from '../drizzle/schema';
import { eq } from 'drizzle-orm';

export const getAuthors = async () => {
    return await db.select().from(AuthorsTable);
}

export const createAuthor = async (author: any) => {
    return await db.insert(AuthorsTable).values(author).returning();
}

export const updateAuthor = async (id: number, author: any) => {
    if (!author || Object.keys(author).length === 0) {
        throw new Error('No values to set');
    }

    return await db.update(AuthorsTable).set(author).where(eq(AuthorsTable.id, id)).returning();
}

export const deleteAuthor = async (id: number) => {
    return await db.delete(AuthorsTable).where(eq(AuthorsTable.id, id)).returning();
}
