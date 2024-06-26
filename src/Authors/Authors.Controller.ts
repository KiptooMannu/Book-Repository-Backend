import { Context } from 'hono';
import { getAuthors, createAuthor, updateAuthor, deleteAuthor } from '../Authors/Authors.Service';

export const handleGetAuthors = async (c: Context) => {
    try {
        const authors = await getAuthors();
        return c.json(authors);
    } catch (error) {
        const message = error instanceof Error ? error.message : 'Unknown error';
        return c.json({ error: 'Failed to fetch authors', details: message }, 500);
    }
}

export const handleCreateAuthor = async (c: Context) => {
    try {
        const author = await c.req.json();
        const newAuthor = await createAuthor(author);
        return c.json(newAuthor);
    } catch (error) {
        const message = error instanceof Error ? error.message : 'Unknown error';
        return c.json({ error: 'Failed to create author', details: message }, 500);
    }
}

export const handleUpdateAuthor = async (c: Context) => {
    try {
        const { id } = c.req.param();
        const authorInfo = await c.req.json();

        if (!authorInfo || Object.keys(authorInfo).length === 0) {
            return c.json({ error: 'No values to update' }, 400);
        }

        const updatedAuthor = await updateAuthor(Number(id), authorInfo);
        return c.json(updatedAuthor);
    } catch (error) {
        const message = error instanceof Error ? error.message : 'Unknown error';
        return c.json({ error: 'Failed to update author', details: message }, 500);
    }
}

export const handleDeleteAuthor = async (c: Context) => {
    try {
        const { id } = c.req.param();
        const deletedAuthor = await deleteAuthor(Number(id));
        return c.json(deletedAuthor);
    } catch (error) {
        const message = error instanceof Error ? error.message : 'Unknown error';
        return c.json({ error: 'Failed to delete author', details: message }, 500);
    }
}
