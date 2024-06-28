import { Hono, Context } from 'hono'; // Ensure Context is imported for types
import 'dotenv/config';
import { serve } from '@hono/node-server';
import { cors } from 'hono/cors'; // Import CORS middleware

// Importing book routers and controllers
import { handleGetBooks, handleCreateBook, handleUpdateBook, handleDeleteBook } from './Book/Book.Controller';
import bookRouter from './Book/Book.Router'; // Ensure the correct path to your router

const app = new Hono().basePath('/');

// CORS middleware setup
app.use('*', cors({
  origin: 'http://localhost:5173', // Adjust the origin to your frontend URL
  allowMethods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowHeaders: ['Content-Type', 'Authorization']
}));

// Default route
app.get('/', (c: Context) => {
    const htmlContent = `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Book Management System</title>
            <style>
                body {
                    font-family: Arial, sans-serif;
                    margin: 0;
                    padding: 0;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    height: 100vh;
                    background-color: #f0f0f0;
                }
                .container {
                    text-align: center;
                    padding: 50px;
                    background-color: #fff;
                    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
                    border-radius: 8px;
                }
                h1 {
                    color: #333;
                }
                p {
                    color: #666;
                }
                .btn {
                    display: inline-block;
                    padding: 10px 20px;
                    margin-top: 20px;
                    color: #fff;
                    background-color: #007bff;
                    border: none;
                    border-radius: 5px;
                    text-decoration: none;
                    font-size: 16px;
                    transition: background-color 0.3s;
                }
                .btn:hover {
                    background-color: #0056b3;
                }
            </style>
        </head>
        <body>
            <div class="container">
                <h1>Welcome to Book Management System</h1>
                <p>Manage your books efficiently.</p>
                <a href="/api/books" class="btn">View Books</a>
            </div>
        </body>
        </html>
    `;
    return c.html(htmlContent);
});

// Status route
app.get('/ok', (c: Context) => {
    return c.text('Server running');
});

// Registering book routes
app.route('/api', bookRouter);
app.get('/api/books', handleGetBooks); // Handle GET requests to fetch books
app.post('/api/books', handleCreateBook); // Handle POST requests to create a new book
app.put('/api/books/:id', handleUpdateBook); // Handle PUT requests to update a book by ID
app.delete('/api/books/:id', handleDeleteBook); // Handle DELETE requests to delete a book by ID

// Logging registered routes
console.log('Routes registered:', app.routes);

// Starting server
serve({
    fetch: app.fetch,
    port: 8000,
});

console.log('Book Management System server is running at port 8000');
