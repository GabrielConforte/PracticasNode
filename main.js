/* Realizar un proyecto de servidor basado en node.js y express que ofrezca una API RESTful de productos. En detalle, que incorpore las siguientes rutas:
GET '/api/productos' -> devuelve todos los productos.
GET '/api/productos/:id' -> devuelve un producto según su id.
POST '/api/productos' -> recibe y agrega un producto, y lo devuelve con su id asignado.
PUT '/api/productos/:id' -> recibe y actualiza un producto según su id.
DELETE '/api/productos/:id' -> elimina un producto según su id. */

const express = require('express');
const contenedor = require('./controladores/contenedor');
const app = express();
const PORT = 3001;
const server = app.listen(PORT, () => {
    console.log(`Server running on port http://localhost:${PORT}`);
});
const hbs = require('express-handlebars');
const pug = require('pug');
//app.use(express.static('public')); 
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set("views", "./views/pug");
app.set('view engine', 'pug');

app.get('/', (req, res, next) =>  {
    res.render('formulario');
});

app.get('/productos', async (req, res, next) =>  {
    let productos = await contenedor.getAll();
    productos = JSON.parse(productos);
    res.render('listado', {productos});
});


 app.use((err, req, res, next) => {
    res.status(500).json({ error: '500 - internal error' });
});
app.use((req, res, next) => {
    res.status(404).json({ error: '404 - not found' });
});
app.use((err, req, res, next) => {
    res.status(401).json({ error: '401 - not authorized' });
});
app.use((err, req, res, next) => {
    res.status(403).json({ error: '403 - forbidden' });
});


server.on("error", error => console.log(error));

