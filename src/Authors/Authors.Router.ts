import { Hono } from 'hono';
import { handleGetAuthors, handleCreateAuthor, handleUpdateAuthor, handleDeleteAuthor } from '../Authors/Authors.Controller';

const authorRouter = new Hono();

authorRouter.get('/authors', handleGetAuthors);
authorRouter.post('/authors', handleCreateAuthor);
authorRouter.put('/authors/:id', handleUpdateAuthor);
authorRouter.delete('/authors/:id', handleDeleteAuthor);

export default authorRouter;
