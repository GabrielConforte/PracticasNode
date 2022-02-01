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

const {Router} = express
const routerApi = new Router()

//busca el index.html
app.use(express.static('public')); 
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//GET '/api/productos' -> devuelve todos los productos.
routerApi.get('/', (req, res, next) =>  {
    contenedor.getAll().then(data => {
        let productos = JSON.parse(data);
        res.json(productos);
    });

});

//GET '/api/productos/:id' -> devuelve un producto según su id.
routerApi.get('/:id', async (req, res, next) => {
    const id = req.params.id;
    const producto = await contenedor.getById(id);
    if(producto.id!=undefined){
        res.json(producto);
    }else{
        res.json({error : "no existe el objeto"});
    }
    /* contenedor.getById(req.params.id).then(data => {
        if(data.id!=undefined){
            res.json(data);}
        else{
            res.json({ error : 'producto no encontrado' });
        }
    }); */
});

routerApi.post('/', (req, res, next) => {
    let producto = req.body;
    contenedor.save(producto).then(data => {
        res.json({atencion: "producto guardado"});
    });
});

//put -> recibe y actualiza un producto según su id.
routerApi.put('/:id', (req, res, next) => {
    let producto = req.body;
    contenedor.update(req.params.id, producto).then(data => {
        res.json(data);
    });
});

routerApi.delete('/:id', (req, res, next) => {
    contenedor.deleteById(req.params.id).then(data => {
        res.json({ atencion: 'producto eliminado' });
    });
});
app.use('/api/productos', routerApi);


//mensajes para errores del servidor
app.use((err, req, res, next) => {
    res.status(500).json({ error: err.message });
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

