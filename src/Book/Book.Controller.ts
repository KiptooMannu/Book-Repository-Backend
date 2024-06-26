import { Context } from 'hono';
import { getBooks, createBook, updateBook, deleteBook } from '../Book/Book.Service';

export const handleGetBooks = async (c: Context) => {
    try {
        const books = await getBooks();
        return c.json(books);
    } catch (error) {
        const message = error instanceof Error ? error.message : 'Unknown error';
        return c.json({ error: 'Failed to fetch books', details: message }, 500);
    }
}

export const handleCreateBook = async (c: Context) => {
    try {
        const book = await c.req.json();
        const newBook = await createBook(book);
        return c.json(newBook);
    } catch (error) {
        const message = error instanceof Error ? error.message : 'Unknown error';
        return c.json({ error: 'Failed to create book', details: message }, 500);
    }
}

export const handleUpdateBook = async (c: Context) => {
    try {
        const { id } = c.req.param();
        const bookInfo = await c.req.json();

        if (!bookInfo || Object.keys(bookInfo).length === 0) {
            return c.json({ error: 'No values to update' }, 400);
        }

        const updatedBook = await updateBook(Number(id), bookInfo);
        return c.json(updatedBook);
    } catch (error) {
        const message = error instanceof Error ? error.message : 'Unknown error';
        return c.json({ error: 'Failed to update book', details: message }, 500);
    }
}

export const handleDeleteBook = async (c: Context) => {
    try {
        const { id } = c.req.param();
        const deletedBook = await deleteBook(Number(id));
        return c.json(deletedBook);
    } catch (error) {
        const message = error instanceof Error ? error.message : 'Unknown error';
        return c.json({ error: 'Failed to delete book', details: message }, 500);
    }
}
