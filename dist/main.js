"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const hono_1 = require("hono");
const bookroutes_1 = require("./routes/bookroutes");
const node_server_1 = require("@hono/node-server");
const app = new hono_1.Hono();
app.post('/books', bookroutes_1.addBook);
app.get('/books', bookroutes_1.getBooks);
app.put('/books/:id', bookroutes_1.updateBook);
app.delete('/books/:id', bookroutes_1.deleteBook);
// Serve the app on port 3000
(0, node_server_1.serve)(app);
console.log('Server is running on http://localhost:3000');
