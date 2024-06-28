import { Hono, Context } from 'hono';
import 'dotenv/config';
import { serve } from '@hono/node-server';
import { cors } from 'hono/cors';

// Initialize Hono app with base path
const app = new Hono().basePath('/api');

// Configure CORS middleware to allow requests from the frontend origin
app.use('*', cors({
  origin: 'http://localhost:5173', // Adjust the origin to your frontend URL
  allowMethods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowHeaders: ['Content-Type', 'Authorization']
}));

// Default route
app.get('/', async (ctx: Context) => {
  const htmlContent = `
    <!DOCTYPE html>
    <html lang="en">
    <!-- Your HTML content -->
    </html>
  `;
  return ctx.html(htmlContent);
});

// Status route
app.get('/ok', async (ctx: Context) => {
  return ctx.text('Server running');
});

// Example API routes (replace with your actual routes)
app.get('/books', async (ctx: Context) => {
  // Your logic to fetch books
  return ctx.json({ books: [] });
});

app.post('/books', async (ctx: Context) => {
  // Your logic to add a book
  return ctx.json({ success: true });
});

app.put('/books/:id', async (ctx: Context) => {
  // Your logic to update a book
  return ctx.json({ success: true });
});

app.delete('/books/:id', async (ctx: Context) => {
  // Your logic to delete a book
  return ctx.json({ success: true });
});

// Start the server
serve({
  fetch: app.fetch,
  port: 8000,
});

console.log('Library Management System server is running at port 8000');
