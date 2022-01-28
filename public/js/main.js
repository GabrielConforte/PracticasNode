/* Realizar un proyecto de servidor basado en node.js y express que ofrezca una API RESTful de productos. En detalle, que incorpore las siguientes rutas:
GET '/api/productos' -> devuelve todos los productos.
GET '/api/productos/:id' -> devuelve un producto según su id.
POST '/api/productos' -> recibe y agrega un producto, y lo devuelve con su id asignado.
PUT '/api/productos/:id' -> recibe y actualiza un producto según su id.
DELETE '/api/productos/:id' -> elimina un producto según su id. */

const express = require('express');
const contenedor = require('./contenedor');
const app = express();
const PORT = 3001;
const server = app.listen(PORT, () => {
    console.log(`Server running on port http://localhost:${PORT}`);
});

const {Router} = express
const routerApi = new Router()
console.log("dou")
//busca el index.html
app.use(express.static('public')); 
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//GET '/api/productos' -> devuelve todos los productos.
routerApi.get('/', (req, res, next) =>  {
    contenedor.getAll().then(data => {
        let productos = JSON.parse(data);
        res.send(`<h1>Productos</h1>
        <ul>
            ${productos.map(producto => `<li>${producto.title} $${producto.price}</li>`).join('')}
        </ul>
        <a href="/">Volver</a></button>`);

    });

});

//GET '/api/productos/:id' -> devuelve un producto según su id.
routerApi.get('/:id', (req, res, next) => {

    contenedor.getById(req.params.id).then(data => {
        if(data.id!=undefined){
        res.send(`<li>${data.title} $${data.price}</li>
        <a href="/">Volver</a></button>
        `);}
        else{
            res.json({ error : 'producto no encontrado' }
        `<a href="/">Volver</a></button>`);
        }
        
    });
});

routerApi.post('/', (req, res, next) => {
    let producto = req.body;
    contenedor.save(producto).then(data => {
        res.send(`<h1>Producto agregado</h1>
        <li>${producto.title} $${producto.price}</li>
        <a href="/">Volver</a></button>`);
    });
});


//put -> recibe y actualiza un producto según su id.
routerApi.put('/:id', (req, res, next) => {
    let producto = req.body;
    contenedor.update(req.params.id, producto).then(data => {
        res.send(`<h1>Producto actualizado</h1>
        <li>${producto.title} $${producto.price}</li>
        <a href="/">Volver</a></button>`);
    });
});

routerApi.delete('/:id', (req, res, next) => {
    contenedor.deleteById(req.params.id).then(data => {
        res.send(`<h1>Producto eliminado</h1>
        <a href="/">Volver</a></button>`);
    });
});
app.use('/api/productos', routerApi);

server.on("error", error => console.log(error));

