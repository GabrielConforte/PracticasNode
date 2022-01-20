/* 
Consigna:
Realizar un proyecto de servidor basado en node.js que utilice el middleware express e implemente los siguientes endpoints en el puerto 8080:
1) Ruta get '/productos' que devuelva un array con todos los productos disponibles en el servidor
2) Ruta get '/productoRandom' que devuelva un producto elegido al azar entre todos los productos disponibles
Incluir un archivo de texto 'productos.txt' y utilizar la clase Contenedor del desafío anterior para acceder a los datos persistidos del servidor. */

const express = require('express');
const contenedor = require('./contenedor');
const app = express();
const PORT = 8080;

app.get("/", (req, res, next) => {
    console.log(req)
    res.send("<h1 style='color:blue'> hola mundillo </h1>");
    });

const server = app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

app.get("/productos", (req, res, next) => {
    contenedor.getAll().then(data => {
        let productos = JSON.parse(data);
        res.send(`<h1>Productos</h1>
        <ul>
            ${productos.map(producto => `<li>${producto.title} $${producto.price}</li>`).join('')}
        </ul>`);

    });

});
            
app.get("/productosRandom", (req, res, next) => {
    contenedor.getAll().then(data => {
        let productos = JSON.parse(data);
        let random = Math.floor(Math.random() * productos.length);
        res.send(`<h1>Producto al azar</h1>
        <ul>
            <li>${productos[random].title} $${productos[random].price}</li>
        </ul>`);
    });
}); 

server.on("error", error => console.log(error));

