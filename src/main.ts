import { Hono } from 'hono';
import 'dotenv/config';
import { serve } from '@hono/node-server';


import bookRouter  from './Book/Book.Router';
import  authorRouter  from './Authors/Authors.Router';

const app = new Hono().basePath('/api');

// Default route
app.get('/', (c) => {
  const htmlContent = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Library Management System</title>
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
            <h1>Welcome to Library Management System</h1>
            <p>Your favorite place to manage library resources.</p>
            <a href="/api/ok" class="btn">Check Status</a>
        </div>
    </body>
    </html>
  `;
  return c.html(htmlContent);
});

// Status route
app.get('/ok', (c) => {
  return c.text('Server running');
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
