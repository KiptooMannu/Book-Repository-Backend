import { Hono } from 'hono';
import { handleGetBooks, handleCreateBook, handleUpdateBook, handleDeleteBook } from '../Book/Book.Controller';

const bookRouter = new Hono();

bookRouter.get('/books', handleGetBooks);
bookRouter.post('/books', handleCreateBook);
bookRouter.put('/books/:id', handleUpdateBook);
bookRouter.delete('/books/:id', handleDeleteBook);

export default bookRouter;
