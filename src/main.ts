import { Hono, Context } from 'hono';
import 'dotenv/config';
import { serve } from '@hono/node-server';

import bookRouter from './Book/Book.Router';
import authorRouter from './Authors/Authors.Router';

const app = new Hono().basePath('/api');

// Middleware to handle CORS headers
app.use(async (ctx: Context<any, any, {}>, next: () => Promise<void>) => {
  ctx.header('Access-Control-Allow-Origin', 'http://localhost:5173'); // Set CORS header
  ctx.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  ctx.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  await next(); // Call the next middleware or route handler
});

// Default route
app.get('/', async (ctx: Context<any, any, {}>) => {
  const htmlContent = `
    <!DOCTYPE html>
    <html lang="en">
    <!-- Your HTML content -->
    </html>
  `;
  return ctx.html(htmlContent);
});

// Status route
app.get('/ok', async (ctx: Context<any, any, {}>) => {
  return ctx.text('Server running');
});
   


// Registering routes
app.route('/', bookRouter);
app.route('/', authorRouter);


console.log('Routes registered:', app.routes); 
// Starting the server
serve({
  fetch: app.fetch,
  port: 8000,
});

console.log('Library Management System server is running at port 8000');
